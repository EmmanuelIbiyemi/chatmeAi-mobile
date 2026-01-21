module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      GEMINI_APIKEY: process.env.GEMINI_APIKEY ?? "",
    },
  }
}