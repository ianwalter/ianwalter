import { test, expect } from '@playwright/test';

test.describe('Pretty Print', () => {
  test('should toggle pretty print mode', async ({ page }) => {
    await page.goto('/');
    
    // Start with pretty print disabled
    await page.evaluate(() => {
      (window as any).logger.configure({ prettyPrint: false });
    });
    
    // Set up console log tracking
    const normalLogs: { type: string; args: string[] }[] = [];
    const prettyLogs: { type: string; args: string[] }[] = [];
    
    // We need to access console.args rather than just text for pretty printing
    page.on('console', (msg) => {
      // Store logs based on current pretty print state
      const isPretty = page.evaluate(() => (window as any).logger.prettyPrint);
      const args = [];
      for (let i = 0; i < msg.args().length; i++) {
        args.push(msg.args()[i].toString());
      }
      
      // Store based on current logger state when the log occurred
      if (isPretty) {
        prettyLogs.push({ type: msg.type(), args });
      } else {
        normalLogs.push({ type: msg.type(), args });
      }
    });
    
    // Log something in normal mode
    await page.click('#log-info');
    
    // Enable pretty print
    await page.click('#toggle-pretty');
    
    // Log something in pretty print mode
    await page.click('#log-info');
    
    // Wait for any async logs
    await page.waitForTimeout(100);
    
    // Normal logs should have fewer arguments (just the message)
    const infoNormalLogs = normalLogs.filter(log => 
      log.type === 'info' && 
      log.args.some(arg => arg.includes('info message')));
    
    // Pretty logs should have color codes and more arguments
    const infoPrettyLogs = prettyLogs.filter(log => 
      log.type === 'info' && 
      log.args.some(arg => arg.includes('INFO')));
    
    // Check normal logs (should be just text with namespace)
    expect(infoNormalLogs.length).toBeGreaterThan(0);
    expect(infoNormalLogs[0].args.length).toBeLessThan(infoPrettyLogs[0].args.length);
    
    // Check pretty logs (should have multiple args with style info)
    expect(infoPrettyLogs.length).toBeGreaterThan(0);
    expect(infoPrettyLogs[0].args.length).toBeGreaterThan(infoNormalLogs[0].args.length);
    
    // Pretty logs should include the color styles
    expect(infoPrettyLogs[0].args.some(arg => arg.includes('color:'))).toBe(true);
  });
});
