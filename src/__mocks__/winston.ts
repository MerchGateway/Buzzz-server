export const logger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

export const createLogger = jest.fn();

createLogger.mockImplementation(() => logger);

export const format = {
  combine: jest.fn(),
  timestamp: jest.fn(),
  label: jest.fn(),
  json: jest.fn(),
};

class Console {}

export const transports = {
  Console,
};
