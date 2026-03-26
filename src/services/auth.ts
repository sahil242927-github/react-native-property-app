import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { User } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";
import supabase from "@/lib/db";

WebBrowser.maybeCompleteAuthSession();

/**
 * Executes the Google OAuth flow via Supabase and Expo Auth Session.
 * @returns {Promise<boolean>} - Returns true if authentication is successful, false if cancelled or failed.
 */
export const loginWithGoogle = async (): Promise<boolean> => {
  try {
    console.log("--- Auth Started ---");
    const redirectTo = makeRedirectUri({ scheme: "realestate" });
    console.log("Redirect URI generated:", redirectTo);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, skipBrowserRedirect: false },
    });

    if (error) {
      console.error("Supabase OAuth Error:", error.message);
      throw error;
    }

    console.log("Supabase URL received. Opening browser...");
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    console.log("Browser closed with result type:", result.type);

    if (result.type === "success") {
      let { url } = result;

      // FIX: Supabase returns tokens after '#' (fragment) instead of '?' (query)
      // We replace the first '#' with '?' so Linking.parse can read it.
      if (url.includes("#") && !url.includes("?")) {
        url = url.replace("#", "?");
      }

      const parsed = Linking.parse(url);

      const accessToken = parsed.queryParams?.access_token;
      const refreshToken = parsed.queryParams?.refresh_token;

      if (accessToken && refreshToken) {
        console.log("Tokens found! Setting session...");
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken as string,
          refresh_token: refreshToken as string,
        });

        if (sessionError) throw sessionError;
        return true;
      } else {
        console.warn("No tokens found. Parsed params:", parsed.queryParams);
      }
    } else {
      console.log("Login was cancelled or failed in the browser.");
    }

    return false;
  } catch (error) {
    console.error("Critical Auth Error:", error);
    throw error;
  }
};

/**
 * Retrieves the currently authenticated user's profile and metadata.
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;
    if (!session) return null;

    // We return the user object which contains email, id, and user_metadata
    return session.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

/**
 * Signs the user out of the current session and clears local storage.
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // WebBrowser cleanup (optional but professional)
    await WebBrowser.coolDownAsync();

    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
};
