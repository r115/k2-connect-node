import type {Config} from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@kopokopo/k2/(.*)$': '<rootDir>/src/$1',
  },
  // pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};

export default config;