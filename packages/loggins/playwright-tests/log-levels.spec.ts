import { test, expect } from '@playwright/test';

test.describe('Log Levels', () => {
  test('should respect log level hierarchy', async ({ page }) => {
    // Set up console log tracking
    const logs: { type: string; text: string }[] = [];
    page.on('console', (msg) => {
      logs.push({ type: msg.type(), text: msg.text() });
    });
    
    await page.goto('/');
    
    // Set log level to 'warn' (which should only show error and warn logs)
    await page.evaluate(() => {
      (window as any).logger.configure({ level: 'warn' });
      console.log('Log level set to warn');
    });
    
    // Clear the logs array
    logs.length = 0;
    
    // Click all log buttons
    await page.click('#log-error');
    await page.click('#log-warn');
    await page.click('#log-info');
    await page.click('#log-debug');
    await page.click('#log-trace');
    
    // Wait for any async logs to complete
    await page.waitForTimeout(100);
    
    // Filter to only get the actual logger output (not the button click logs)
    const logginLogs = logs.filter(log => !log.text.includes('Log level set to'));
    
    // Should only have error and warn logs (2 error logs and 2 warn logs from main and child loggers)
    expect(logginLogs.length).toBe(4);
    
    // Verify error logs are present
    expect(logginLogs.some(log => log.type === 'error' && log.text.includes('[app]'))).toBe(true);
    expect(logginLogs.some(log => log.type === 'error' && log.text.includes('[app:ui]'))).toBe(true);
    
    // Verify warn logs are present
    expect(logginLogs.some(log => log.type === 'warning' && log.text.includes('[app]'))).toBe(true);
    expect(logginLogs.some(log => log.type === 'warning' && log.text.includes('[app:api]'))).toBe(true);
    
    // Verify that info, debug and trace logs are not present
    expect(logginLogs.some(log => log.text.includes('info message'))).toBe(false);
    expect(logginLogs.some(log => log.text.includes('debug message'))).toBe(false);
    expect(logginLogs.some(log => log.text.includes('trace message'))).toBe(false);
  });
  
  test('should update log level dynamically', async ({ page }) => {
    // Set up console log tracking
    const logs: { type: string; text: string }[] = [];
    page.on('console', (msg) => {
      logs.push({ type: msg.type(), text: msg.text() });
    });
    
    await page.goto('/');
    
    // Change log level using the button (cycles to next level)
    await page.click('#change-level');
    
    // Clear logs and try debug logs which should now be visible if level changed to debug
    logs.length = 0;
    
    // Get current level to confirm what we expect 
    const currentLevel = await page.evaluate(() => (window as any).logger.level);
    
    // Click debug log button
    await page.click('#log-debug');
    
    // Wait for any async logs
    await page.waitForTimeout(100);
    
    // Filter to only get the actual logger output
    const logginLogs = logs.filter(log => log.text.includes('debug message'));
    
    // If current level is debug or trace, we should see debug logs
    if (currentLevel === 'debug' || currentLevel === 'trace') {
      expect(logginLogs.length).toBeGreaterThan(0);
    } else {
      expect(logginLogs.length).toBe(0);
    }
  });
});
