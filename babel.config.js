module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel"
    ],
    plugins: [
      ["react-native-reanimated/plugin", {
      "microphonePermission": "CUSTOM: Allow $(PRODUCT_NAME) to access the microphone",
      "speechRecognitionPermission": "CUSTOM: Allow $(PRODUCT_NAME) to securely recognize user speech"
    }]
    ]
  };
};