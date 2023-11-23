module.exports = {
    roots: [
        "<rootDir>/src"
    ],
    transform: {
        "\\.[jt]sx?$": ['babel-jest', {rootMode: 'upward'}]
     },
    testRegex: "(/*/.*.(test|spec)).(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    collectCoverage: true,
    coverageProvider: 'v8',
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
    coveragePathIgnorePatterns: [
        "(tests/.*.mock).(jsx?|tsx?)$"
    ],
    verbose: true
};