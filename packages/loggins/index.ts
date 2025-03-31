export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';

export const LogLevels: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
};

export type Transport = (options: {
  timestamp: Date;
  namespace: string;
  level: LogLevel;
  args: any[];
  levelValue: number;
}) => void;

export interface LoggerOptions {
  namespace?: string;
  level?: LogLevel;
  prettyPrint?: boolean;
  transports?: Transport[];
}

export class Logger {
  private namespace: string;
  private level: LogLevel;
  private levelValue: number;
  private prettyPrint: boolean;
  private transports: Transport[];

  constructor(options: LoggerOptions = {}) {
    this.namespace = options.namespace || '';
    this.level = options.level || 'info';
    this.levelValue = LogLevels[this.level];
    this.prettyPrint = options.prettyPrint ?? false;
    this.transports = options.transports || [];
  }

  private formatMessage(level: LogLevel, args: any[]): any[] {
    if (!this.prettyPrint) {
      return this.namespace ? [`[${this.namespace}]`, ...args] : args;
    }

    // Define styles for different log levels
    const styles: Record<LogLevel, string> = {
      error: 'color: #ff5252; font-weight: bold',
      warn: 'color: #fb8c00; font-weight: bold',
      info: 'color: #2196f3; font-weight: bold',
      debug: 'color: #4caf50; font-weight: bold',
      trace: 'color: #9e9e9e; font-weight: bold'
    };

    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const timeStyle = 'color: #888';
    const resetStyle = 'color: inherit; font-weight: normal';
    const levelStyle = styles[level];
    const namespaceStyle = 'color: #673ab7; font-weight: bold';
    
    const formattedArgs = [];
    
    // Build the format string with appropriate %c placeholders
    let formatString = '%c' + timestamp + '%c ' + level.toUpperCase();
    
    // Add the namespace if present
    if (this.namespace) {
      formatString += '%c [' + this.namespace + ']';
    }
    
    // Add colon and message placeholder
    formatString += ': ';
    
    // Add styles in the correct order
    formattedArgs.push(formatString);
    formattedArgs.push(timeStyle);    // style for timestamp
    formattedArgs.push(levelStyle);   // style for log level
    
    // Add namespace style if needed
    if (this.namespace) {
      formattedArgs.push(namespaceStyle);
    }
    
    // Add the original args
    return [...formattedArgs, ...args];
  }

  private log(level: LogLevel, ...args: any[]): void {
    const levelValue = LogLevels[level];
    
    // Only log if the level is less than or equal to the configured level
    if (levelValue <= this.levelValue) {
      const timestamp = new Date();
      
      // Call any registered transports
      this.transports.forEach(transport => {
        transport({
          timestamp,
          namespace: this.namespace,
          level,
          args,
          levelValue
        });
      });

      // Format and log to console
      const formattedArgs = this.formatMessage(level, args);
      
      switch (level) {
        case 'error':
          console.error(...formattedArgs);
          break;
        case 'warn':
          console.warn(...formattedArgs);
          break;
        case 'debug':
        case 'trace':
          console.debug(...formattedArgs);
          break;
        case 'info':
        default:
          console.info(...formattedArgs);
      }
    }
  }

  error(...args: any[]): void {
    this.log('error', ...args);
  }

  warn(...args: any[]): void {
    this.log('warn', ...args);
  }

  info(...args: any[]): void {
    this.log('info', ...args);
  }

  debug(...args: any[]): void {
    this.log('debug', ...args);
  }

  trace(...args: any[]): void {
    this.log('trace', ...args);
  }

  // Create a new logger with a child namespace
  child(namespace: string, options: Omit<LoggerOptions, 'namespace'> = {}): Logger {
    const childNamespace = this.namespace 
      ? `${this.namespace}:${namespace}` 
      : namespace;
    
    return new Logger({
      namespace: childNamespace,
      level: options.level || this.level,
      prettyPrint: options.prettyPrint ?? this.prettyPrint,
      transports: options.transports || this.transports
    });
  }

  // Allow changing configuration after initialization
  configure(options: LoggerOptions): void {
    if (options.namespace !== undefined) this.namespace = options.namespace;
    if (options.level !== undefined) {
      this.level = options.level;
      this.levelValue = LogLevels[this.level];
    }
    if (options.prettyPrint !== undefined) this.prettyPrint = options.prettyPrint;
    if (options.transports !== undefined) this.transports = options.transports;
  }
}

// Create a default export for convenience
export default function createLogger(options: LoggerOptions = {}): Logger {
  return new Logger(options);
}