module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
};
