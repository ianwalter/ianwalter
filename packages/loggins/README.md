# @ianwalter/loggins

A lightweight, browser-focused logging library with support for log levels, namespaces, transports, and pretty-printing.

## Installation

```bash
npm install @ianwalter/loggins
# or
yarn add @ianwalter/loggins
# or
bun add @ianwalter/loggins
```

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/ianwalter/loggins.git
cd loggins
bun install
```

### Running tests

Run unit tests:

```bash
# Run unit tests only
bun test tests/unit/logger.test.ts
```

Run browser tests manually:

```bash
# Build and start the test server
bun serve

# Open http://localhost:3333 in your browser to see the test page
```

Run Playwright E2E tests:

```bash
# Build and start the test server in one terminal
bun serve

# Run the E2E tests in another terminal
bun test:e2e
```

Note: Unit tests and E2E tests are kept in separate directories to avoid conflicts between the Bun test runner and Playwright test runner.

### Building for production

```bash
# Build the library for browser environments
bun build
```

## Features

- **Log Levels**: Control which logs are displayed based on environment
- **Namespaces**: Organize logs by component or feature
- **Transports**: Hook into log events to send logs to third parties
- **Pretty Printing**: Format logs with colors and timestamps (optional)

## Usage

### Basic Usage

```js
import createLogger from '@ianwalter/loggins';

const logger = createLogger();

logger.info('Hello world!');
logger.error('Something went wrong', new Error('Oops'));
```

### Log Levels

```js
import createLogger from '@ianwalter/loggins';

// Only show errors and warnings in production
const logger = createLogger({ 
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug'
});

logger.error('This will always be logged');
logger.warn('This will always be logged');
logger.info('This will only be logged in development');
logger.debug('This will only be logged in development');
logger.trace('This will not be logged unless level is explicitly set to trace');
```

### Namespaces

```js
import createLogger from '@ianwalter/loggins';

// Create a base logger
const logger = createLogger({ namespace: 'app' });

// Create child loggers with their own namespaces
const authLogger = logger.child('auth');
const apiLogger = logger.child('api');

logger.info('Application starting'); // [app] Application starting
authLogger.info('User logged in');   // [app:auth] User logged in
apiLogger.error('API error');        // [app:api] API error
```

### Pretty Printing

```js
import createLogger from '@ianwalter/loggins';

// Enable pretty printing for development
const logger = createLogger({ 
  prettyPrint: true,
  namespace: 'ui'
});

logger.info('Button clicked');
logger.error('Failed to load data');
```

### Transports

```js
import createLogger from '@ianwalter/loggins';

// Create a transport for sending errors to a monitoring service
const errorMonitoringTransport = ({ level, args, timestamp }) => {
  if (level === 'error') {
    const [message, error] = args;
    
    // Send to your monitoring service
    monitoringService.captureException({
      message,
      error,
      timestamp
    });
  }
};

const logger = createLogger({
  transports: [errorMonitoringTransport]
});

logger.error('Failed to process payment', new Error('Payment declined'));
```

## API

### `createLogger(options)`

Creates a new logger instance.

#### Options

- `namespace` (string): Optional namespace for the logger
- `level` (string): Log level (`'error'`, `'warn'`, `'info'`, `'debug'`, or `'trace'`). Default: `'info'`
- `prettyPrint` (boolean): Whether to use colors and formatting. Default: `false`
- `transports` (array): Array of transport functions

### Logger Methods

- `logger.error(...args)`: Log at error level
- `logger.warn(...args)`: Log at warn level
- `logger.info(...args)`: Log at info level
- `logger.debug(...args)`: Log at debug level
- `logger.trace(...args)`: Log at trace level
- `logger.child(namespace, options)`: Create a child logger with a nested namespace
- `logger.configure(options)`: Update logger configuration

## License

MIT