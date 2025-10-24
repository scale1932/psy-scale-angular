import { test, expect } from '@playwright/test';

test('should display home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PsyScaleAngular/);
});