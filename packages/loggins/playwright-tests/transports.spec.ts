import { test, expect } from '@playwright/test';

test.describe('Transports', () => {
  test('should add and use custom transport', async ({ page }) => {
    await page.goto('/');
    
    // Check initial state - no transport entries
    let transportEntries = await page.$$('.transport-entry');
    expect(transportEntries.length).toBe(0);
    
    // Enable the test transport
    await page.click('#add-transport');
    
    // Log various levels
    await page.click('#log-error');
    await page.click('#log-info');
    
    // Wait for DOM updates
    await page.waitForTimeout(100);
    
    // Should now have transport entries
    transportEntries = await page.$$('.transport-entry');
    expect(transportEntries.length).toBeGreaterThan(0);
    
    // Check that we have both error and info entries
    const errorEntries = await page.$$('.transport-entry.level-error');
    const infoEntries = await page.$$('.transport-entry.level-info');
    
    expect(errorEntries.length).toBeGreaterThan(0);
    expect(infoEntries.length).toBeGreaterThan(0);
    
    // Verify transport entry content
    const errorText = await errorEntries[0].textContent();
    expect(errorText).toContain('[ERROR]');
    expect(errorText).toContain('[app]');
    
    // Disable transport
    await page.click('#add-transport');
    
    // Clear the transport log
    await page.evaluate(() => {
      const transportLog = document.getElementById('transport-log');
      if (transportLog) {
        // Keep the heading, remove all entries
        const heading = transportLog.querySelector('h3');
        transportLog.innerHTML = '';
        if (heading) transportLog.appendChild(heading);
      }
    });
    
    // Log something new
    await page.click('#log-warn');
    
    // Check that no new entries were added
    const entriesAfterDisable = await page.$$('.transport-entry');
    expect(entriesAfterDisable.length).toBe(0);
  });
});
