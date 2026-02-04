import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-expo',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    '!**/node_modules/**',
    '!**/jest.config.ts/**',
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**"
  ],
  watchman: false,
  setupFilesAfterEnv: ['./tests/unit/jest.setup.ts'],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|react-redux|immer|@reduxjs/toolkit)"
  ],
  clearMocks: true,
};

export default config;