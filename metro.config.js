const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// In v5, simply wrap the config
module.exports = withNativewind(config, { input: "./src/global.css" });
