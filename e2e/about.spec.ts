import { test, expect } from '@playwright/test';

test('should navigate to about page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL(/.*about/);
});