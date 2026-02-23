import { test, expect } from '@playwright/test';

/**
 * Search flow: home -> search page, optional Slow 4G.
 * Run with Slow 4G: use browser context with network throttling (CDP) in a beforeAll if needed.
 */
test.describe('Search flow', () => {
  test('homepage has search and links to search', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /mercado|imobiliário|cabo verde/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /ver imóveis|pesquisar/i })).toBeVisible();
  });

  test('search page loads and shows filters', async ({ page }) => {
    await page.goto('/search');
    await expect(page.getByRole('heading', { name: /imóveis| cabo verde/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /lista/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /mapa/i })).toBeVisible();
  });

  test('search with Slow 4G conditions', async ({ page, browserName }) => {
    if (browserName === 'chromium') {
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Network.emulateNetworkConditions', {
        offline: false,
        downloadThroughput: (1.6 * 1000 * 1000) / 8,
        uploadThroughput: (750 * 1000) / 8,
        latency: 150,
      });
    }
    await page.goto('/search');
    await expect(page.getByRole('heading', { name: /imóveis| cabo verde/i })).toBeVisible({ timeout: 15000 });
  });
});
