const path = require('path')

module.exports = {
  rootDir: path.resolve('./'),
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  setupFiles: ['<rootDir>/test/unit/setup'],
  mapCoverage: true,
  testMatch: [
    '<rootDir>/(test/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/assets/**',
    '!src/main.js',
    '!src/router.js',
    '!src/**/routes.js',
    '!**/node_modules/**'
  ]
}
