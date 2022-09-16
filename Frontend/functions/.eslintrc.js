module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    // "google",
  ],
  rules: {
    quotes: ["error"],
    "no-misleading-character-class": ["off"],
    "indent": ["off"],
    "max-len": ["off"],
  },
};
