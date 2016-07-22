module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "babel"
  ],
  "rules": {
    // "no-param-reassign": ["error", { "props": false }],
    "no-undef": "error",
  },
  "globals": {
    "$": true,
    "_": true,
  }
};
