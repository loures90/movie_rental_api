/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@data/(.*)': ['<rootDir>/src/data/$1'],
    '@domain/(.*)': ['<rootDir>/src/domain/$1'],
    '@infra/(.*)': ['<rootDir>/src/infra/$1'],
    '@main/(.*)': ['<rootDir>/src/main/$1'],
    '@presentation/(.*)': ['<rootDir>/src/presentation/$1']
  }
}
