module.exports = {
  roots: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],

  transformIgnorePatterns: ['node_modules/(?!(prismic-richtext)/)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
};
