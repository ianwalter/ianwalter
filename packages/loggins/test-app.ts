import createLogger, { Transport, LogLevel } from './index';

let currentLevel: LogLevel = 'info';
let isPretty = false;
let transportEnabled = false;

const transportLogElement = document.getElementById('transport-log');

// Create a transport that will log to the DOM for testing purposes
const testTransport: Transport = ({ timestamp, namespace, level, args }) => {
  const entry = document.createElement('div');
  entry.className = `transport-entry level-${level}`;
  entry.textContent = `[${timestamp.toISOString()}] [${level.toUpperCase()}] ${namespace ? `[${namespace}]` : ''} ${args.map(arg => {
    if (arg instanceof Error) {
      return `${arg.message} (${arg.name})`;
    }
    return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
  }).join(' ')}`;
  
  if (transportLogElement) {
    transportLogElement.appendChild(entry);
  }
};

// Create the main logger
const logger = createLogger({
  level: currentLevel,
  namespace: 'app',
  prettyPrint: isPretty,
  transports: []
});

// Create namespaced child loggers
const uiLogger = logger.child('ui');
const apiLogger = logger.child('api');

// Setup button event listeners
document.getElementById('log-error')?.addEventListener('click', () => {
  logger.error('This is an error message', new Error('Sample Error'));
  uiLogger.error('UI Error occurred');
});

document.getElementById('log-warn')?.addEventListener('click', () => {
  logger.warn('This is a warning message');
  apiLogger.warn('API Warning occurred');
});

document.getElementById('log-info')?.addEventListener('click', () => {
  logger.info('This is an info message');
  uiLogger.info('UI Info message');
});

document.getElementById('log-debug')?.addEventListener('click', () => {
  logger.debug('This is a debug message', { context: 'Debug object' });
  apiLogger.debug('API Debug message');
});

document.getElementById('log-trace')?.addEventListener('click', () => {
  logger.trace('This is a trace message');
  uiLogger.trace('UI Trace message');
});

document.getElementById('toggle-pretty')?.addEventListener('click', () => {
  isPretty = !isPretty;
  logger.configure({ prettyPrint: isPretty });
  console.log(`Pretty print ${isPretty ? 'enabled' : 'disabled'}`);
});

document.getElementById('change-level')?.addEventListener('click', () => {
  // Cycle through log levels
  const levels: LogLevel[] = ['error', 'warn', 'info', 'debug', 'trace'];
  const currentIndex = levels.indexOf(currentLevel);
  const nextIndex = (currentIndex + 1) % levels.length;
  currentLevel = levels[nextIndex];
  
  // Update the logger configuration
  logger.configure({ level: currentLevel });
  console.log(`Log level set to ${currentLevel}`);
});

document.getElementById('add-transport')?.addEventListener('click', () => {
  transportEnabled = !transportEnabled;
  
  if (transportEnabled) {
    logger.configure({ transports: [testTransport] });
    console.log('Test transport enabled');
  } else {
    logger.configure({ transports: [] });
    console.log('Test transport disabled');
  }
});

// Make logger available in global scope for debugging
(window as any).logger = logger;
(window as any).uiLogger = uiLogger;
(window as any).apiLogger = apiLogger;

console.log('Loggins test application initialized');
