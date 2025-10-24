import { test, expect } from '@playwright/test';

test('should display not found page for invalid routes', async ({ page }) => {
  await page.goto('/invalid-route');
  await expect(page.locator('h1')).toHaveText('404');
});