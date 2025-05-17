export default {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "node",
  coverageDirectory: ".coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,ts}'
  ],
  coverageReporters: ["json", "lcov", "text", "html"],
  detectOpenHandles: true,
  forceExit: true,
  verbose: true,
};
