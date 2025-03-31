import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import createLogger, { Logger, LogLevels } from '../../index';

describe('Logger', () => {
  // Mock console methods
  const originalConsole = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug
  };

  let consoleCalls: { method: string; args: any[] }[] = [];
   
  // Setup before all tests
  beforeEach(() => {
    // Reset the console calls
    consoleCalls = [];
    
    // Mock all console methods
    console.error = (...args: any[]) => { 
      consoleCalls.push({ method: 'error', args }); 
    };
    console.warn = (...args: any[]) => { 
      consoleCalls.push({ method: 'warn', args }); 
    };
    console.info = (...args: any[]) => { 
      consoleCalls.push({ method: 'info', args }); 
    };
    console.debug = (...args: any[]) => { 
      consoleCalls.push({ method: 'debug', args }); 
    };
  });

  // Restore console methods after all tests
  afterEach(() => {
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
    console.debug = originalConsole.debug;
  });

  test('create a default logger', () => {
  const logger = createLogger();
  expect(logger).toBeInstanceOf(Logger);
});

test('log methods should call corresponding console methods', () => {
  const logger = createLogger();
  
  logger.error('Error message');
  logger.warn('Warning message');
  logger.info('Info message');
  logger.debug('Debug message');
  
  // Debug shouldn't be logged by default (info level)
  expect(consoleCalls.length).toBe(3);
  
  // Check each console method was called
  expect(consoleCalls[0].method).toBe('error');
  expect(consoleCalls[0].args[0]).toBe('Error message');
  
  expect(consoleCalls[1].method).toBe('warn');
  expect(consoleCalls[1].args[0]).toBe('Warning message');
  
  expect(consoleCalls[2].method).toBe('info');
  expect(consoleCalls[2].args[0]).toBe('Info message');
});

test('log level hierarchy should filter logs correctly', () => {
  // Create logger with warn level - should only show error and warn
  const logger = createLogger({ level: 'warn' });
  
  logger.error('Error message');
  logger.warn('Warning message');
  logger.info('Info message');
  logger.debug('Debug message');
  logger.trace('Trace message');
  
  // Only error and warn should be logged
  expect(consoleCalls.length).toBe(2);
  expect(consoleCalls[0].method).toBe('error');
  expect(consoleCalls[1].method).toBe('warn');
  
  // Now set to trace level, which should log everything
  consoleCalls = [];
  logger.configure({ level: 'trace' });
  
  logger.error('Error message');
  logger.warn('Warning message');
  logger.info('Info message');
  logger.debug('Debug message');
  logger.trace('Trace message');
  
  // All 5 logs should be included
  expect(consoleCalls.length).toBe(5);
});

test('namespaces should be added to log output', () => {
  const logger = createLogger({ namespace: 'test' });
  logger.info('Hello');
  
  expect(consoleCalls[0].args[0]).toBe('[test]');
  expect(consoleCalls[0].args[1]).toBe('Hello');
});

test('child loggers should inherit parent config', () => {
  const parent = createLogger({ 
    namespace: 'parent', 
    level: 'warn',
    prettyPrint: true
  });
  
  const child = parent.child('child');
  
  // Child should inherit level and prettyPrint
  expect(child.level).toBe('warn');
  expect(child.prettyPrint).toBe(true);
  
  // Namespaces should be combined
  child.warn('Test warning');
  expect(consoleCalls[0].args.join(' ')).toContain('[parent:child]');
});

test('transports should be called for all logs', () => {
  const transportLogs: any[] = [];
  
  const transport = (options: any) => {
    transportLogs.push(options);
  };
  
  const logger = createLogger({ 
    level: 'debug',
    transports: [transport]
  });
  
  logger.error('Transport test');
  logger.debug('Debug transport');
  
  // Both logs should be in the transport
  expect(transportLogs.length).toBe(2);
  
  // Transport should receive all details
  expect(transportLogs[0].level).toBe('error');
  expect(transportLogs[0].args[0]).toBe('Transport test');
  expect(transportLogs[0].levelValue).toBe(LogLevels.error);
  expect(transportLogs[0].timestamp).toBeInstanceOf(Date);
  
  expect(transportLogs[1].level).toBe('debug');
});

test('pretty print formatting should include styling', () => {
  const logger = createLogger({ 
    namespace: 'ui',
    prettyPrint: true
  });
  
  logger.info('Styled log');
  
  // Should have style information in arguments
  const firstArg = consoleCalls[0].args[0];
  expect(typeof firstArg).toBe('string');
  expect(firstArg).toContain('INFO');
  
  // Should have style arguments
  expect(consoleCalls[0].args.some(arg => arg.includes('color:'))).toBe(true);
});

test('configure should update logger settings', () => {
  const logger = createLogger({ level: 'info' });
  
  // Initially debug is not logged
  logger.debug('Debug 1');
  expect(consoleCalls.length).toBe(0);
  
  // Change level
  logger.configure({ level: 'debug' });
  logger.debug('Debug 2');
  expect(consoleCalls.length).toBe(1);
  
  // Add namespace
  logger.configure({ namespace: 'dynamic' });
  logger.info('With namespace');
  expect(consoleCalls[1].args[0]).toBe('[dynamic]');
});
});