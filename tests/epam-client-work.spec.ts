import { test, expect } from '@playwright/test';

test.describe('EPAM Services client work navigation', () => {
  test('opens Client Work from the Services menu', async ({ page }) => {
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/EPAM/i);

    const consentButton = page.getByRole('button', {
      name: /accept|agree|allow all|close/i,
    }).first();

    if (await consentButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await consentButton.click();
      await expect(consentButton).not.toBeVisible();
    }

    await expect(page.locator('body')).toBeVisible();

    const servicesLink = page
      .locator('header')
      .getByRole('link', { name: /^Services$/i })
      .first();

    await expect(servicesLink).toBeVisible();
    await servicesLink.hover();
    await servicesLink.click();
    await expect(page).toHaveURL(/\/services\/?$/i);
    await expect(
      page.getByRole('heading', { name: /services/i }).first(),
    ).toBeVisible();
    await expect(page.locator('body')).toBeVisible();

    const clientWorkLink = page.getByRole('link', {
      name: /Explore Our Client Work/i,
    });

    await expect(clientWorkLink).toBeVisible();
    await clientWorkLink.click();
    await expect(page).toHaveURL(/\/services\/client-work\/?$/i);
    await expect(
      page.getByText('Client Work', { exact: true }).first(),
    ).toBeVisible();
  });
});
