import { test, expect } from '@playwright/test';

test.describe('Namespaces', () => {
  test('should create namespaced logs', async ({ page }) => {
    // Set up console log tracking
    const logs: { type: string; text: string }[] = [];
    page.on('console', (msg) => {
      logs.push({ type: msg.type(), text: msg.text() });
    });
    
    await page.goto('/');
    
    // Clear previous logs
    logs.length = 0;
    
    // Click info log button to trigger both main and child logger
    await page.click('#log-info');
    
    // Wait for any async logs
    await page.waitForTimeout(100);
    
    // Filter to only get the info logs
    const infoLogs = logs.filter(log => log.text.includes('info message') || log.text.includes('Info message'));
    
    // Should have 2 info logs (from main and child logger)
    expect(infoLogs.length).toBe(2);
    
    // Check for app namespace
    expect(infoLogs.some(log => log.text.includes('[app]'))).toBe(true);
    
    // Check for child namespace
    expect(infoLogs.some(log => log.text.includes('[app:ui]'))).toBe(true);
  });
  
  test('should create additional child loggers with proper namespacing', async ({ page }) => {
    await page.goto('/');
    
    // Create another level of child logger
    const logs: { type: string; text: string }[] = [];
    page.on('console', (msg) => {
      logs.push({ type: msg.type(), text: msg.text() });
    });
    
    // Create a new child logger from an existing child
    await page.evaluate(() => {
      const buttonLogger = (window as any).uiLogger.child('button');
      buttonLogger.info('Button child logger test');
    });
    
    // Wait for any async logs
    await page.waitForTimeout(100);
    
    // Check that the correct namespace hierarchy was used
    expect(logs.some(log => log.text.includes('[app:ui:button]'))).toBe(true);
  });
});
