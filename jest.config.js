module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transformIgnorePatterns": ["node_modules/(?!(prismic-richtext)/)"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}