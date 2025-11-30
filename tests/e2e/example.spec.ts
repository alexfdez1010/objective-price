import { test, expect } from '@playwright/test';

test.describe('Price Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the calculator title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Objective Price Calculator' }),
    ).toBeVisible();
  });

  test('should have all required input fields', async ({ page }) => {
    await expect(page.getByLabel('Asset Symbol')).toBeVisible();
    await expect(page.getByLabel('Quantity')).toBeVisible();
    await expect(page.getByLabel('Target Price')).toBeVisible();
    await expect(page.getByText('Display Currency')).toBeVisible();
  });

  test('should show error when fetching invalid symbol', async ({ page }) => {
    await page.getByLabel('Asset Symbol').fill('INVALIDSYMBOL123456');
    await page.getByRole('button', { name: 'Fetch Price' }).click();

    await expect(
      page.getByText(/Unable to fetch quote|Failed to fetch/),
    ).toBeVisible({ timeout: 10000 });
  });

  test('should fetch current price for valid symbol', async ({ page }) => {
    await page.getByLabel('Asset Symbol').fill('AAPL');
    await page.getByRole('button', { name: 'Fetch Price' }).click();

    await expect(page.getByText('Current Price')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator('text=/\\$[0-9]+\\.[0-9]{2}/')).toBeVisible();
  });

  test('should calculate gain when target price is higher', async ({
    page,
  }) => {
    await page.getByLabel('Asset Symbol').fill('AAPL');
    await page.getByRole('button', { name: 'Fetch Price' }).click();

    await expect(page.getByText('Current Price')).toBeVisible({
      timeout: 10000,
    });

    // Get the current price to calculate a realistic target
    const priceText = await page
      .locator('text=/\\$[0-9]+\\.[0-9]{2}/')
      .first()
      .textContent();
    const currentPrice = parseFloat(priceText?.replace('$', '') || '0');
    const targetPrice = (currentPrice + 10).toFixed(2);

    await page.getByLabel('Quantity').fill('10');
    await page.getByLabel('Target Price').fill(targetPrice);

    await expect(page.getByText('Potential Gain/Loss')).toBeVisible();
    await expect(page.locator('text=/\\+\\$/')).toBeVisible();
  });

  test('should calculate loss when target price is lower', async ({ page }) => {
    await page.getByLabel('Asset Symbol').fill('AAPL');
    await page.getByRole('button', { name: 'Fetch Price' }).click();

    await expect(page.getByText('Current Price')).toBeVisible({
      timeout: 10000,
    });

    // Get the current price to calculate a realistic target
    const priceText = await page
      .locator('text=/\\$[0-9]+\\.[0-9]{2}/')
      .first()
      .textContent();
    const currentPrice = parseFloat(priceText?.replace('$', '') || '0');
    const targetPrice = (currentPrice - 10).toFixed(2);

    await page.getByLabel('Quantity').fill('10');
    await page.getByLabel('Target Price').fill(targetPrice);

    await expect(page.getByText('Potential Gain/Loss')).toBeVisible();
    await expect(page.locator('text=/-\\$/')).toBeVisible();
  });

  test('should switch between USD and EUR display', async ({ page }) => {
    await page.getByLabel('Asset Symbol').fill('AAPL');
    await page.getByRole('button', { name: 'Fetch Price' }).click();

    await expect(page.getByText('Current Price')).toBeVisible({
      timeout: 10000,
    });

    // Get the current price to calculate a realistic target
    const priceText = await page
      .locator('text=/\\$[0-9]+\\.[0-9]{2}/')
      .first()
      .textContent();
    const currentPrice = parseFloat(priceText?.replace('$', '') || '0');
    const targetPrice = (currentPrice + 5).toFixed(2);

    await page.getByLabel('Quantity').fill('10');
    await page.getByLabel('Target Price').fill(targetPrice);

    // Check USD display shows gain
    await expect(page.locator('text=/\\+\\$/')).toBeVisible();

    // Switch to EUR
    await page.getByRole('button', { name: 'EUR (€)' }).click();

    // Should show converted amount in EUR
    await expect(page.locator('text=/\\+€/')).toBeVisible();
  });

  test('should disable fetch button when symbol is empty', async ({ page }) => {
    const fetchButton = page.getByRole('button', { name: 'Fetch Price' });
    await expect(fetchButton).toBeDisabled();

    await page.getByLabel('Asset Symbol').fill('AAPL');
    await expect(fetchButton).toBeEnabled();
  });

  test('should handle decimal quantities and prices', async ({ page }) => {
    await page.getByLabel('Asset Symbol').fill('AAPL');
    await page.getByRole('button', { name: 'Fetch Price' }).click();

    await expect(page.getByText('Current Price')).toBeVisible({
      timeout: 10000,
    });

    await page.getByLabel('Quantity').fill('2.5');

    // Get current price and set a decimal target
    const priceText = await page
      .locator('text=/\\$[0-9]+\\.[0-9]{2}/')
      .first()
      .textContent();
    const currentPrice = parseFloat(priceText?.replace('$', '') || '0');
    const targetPrice = (currentPrice + 3.75).toFixed(2);

    await page.getByLabel('Target Price').fill(targetPrice);

    await expect(page.getByText('Potential Gain/Loss')).toBeVisible();
    // Should show a gain with decimal calculation
    await expect(page.locator('text=/\\+\\$/')).toBeVisible();
  });
});
