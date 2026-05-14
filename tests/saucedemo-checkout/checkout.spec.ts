import { test, expect } from '@playwright/test';

const APP_URL = 'https://www.saucedemo.com/';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const FIRST_NAME = 'Test';
const LAST_NAME = 'User';
const POSTAL_CODE = '90210';

async function login(page) {
  await page.goto(APP_URL);
  await expect(page).toHaveURL(APP_URL);
  await page.waitForSelector('input[data-test="username"]', { state: 'visible' });
  await page.waitForSelector('input[data-test="password"]', { state: 'visible' });
  await page.fill('input[data-test="username"]', USERNAME);
  await page.fill('input[data-test="password"]', PASSWORD);
  await page.click('input[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);
  await page.waitForSelector('.inventory_list', { state: 'visible' });
}

async function addProductsToCart(page) {
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
}

async function proceedToCheckout(page) {
  await page.click('a.shopping_cart_link');
  await page.waitForURL(/cart.html/);
  await page.waitForSelector('.cart_list', { state: 'visible' });
  await page.click('button[data-test="checkout"]');
  await page.waitForURL(/checkout-step-one.html/);
  await page.waitForSelector('input[data-test="firstName"]', { state: 'visible' });
}

test.describe('Sauce Demo checkout workflow', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC01 - Cart review shows selected items and total price', async ({ page }) => {
    await addProductsToCart(page);

    await page.click('a.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);

    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0).locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(cartItems.nth(1).locator('.inventory_item_name')).toHaveText('Sauce Labs Bike Light');

    await expect(page.locator('.inventory_item_price')).toHaveCount(2);
    await expect(page.locator('button[data-test="checkout"]')).toBeVisible();
  });

  test('TC02 - Checkout information page requires all form fields', async ({ page }) => {
    await addProductsToCart(page);
    await proceedToCheckout(page);

    await page.click('input[data-test="continue"]');
    await expect(page.locator('h3[data-test="error"]')).toContainText('First Name is required');

    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.click('input[data-test="continue"]');
    await expect(page.locator('h3[data-test="error"]')).toContainText('Last Name is required');

    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.click('input[data-test="continue"]');
    await expect(page.locator('h3[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('TC03 - Checkout overview displays order summary, payment, and shipping details', async ({ page }) => {
    await addProductsToCart(page);
    await proceedToCheckout(page);

    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.fill('input[data-test="postalCode"]', POSTAL_CODE);
    await page.click('input[data-test="continue"]');

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total:');
    await expect(page.locator('.summary_tax_label')).toContainText('Tax:');
    await expect(page.locator('.summary_total_label')).toContainText('Total:');
    await expect(page.locator('button[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('button[data-test="finish"]')).toBeVisible();
  });

  test('TC04 - Complete checkout and confirm order', async ({ page }) => {
    await addProductsToCart(page);
    await proceedToCheckout(page);

    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.fill('input[data-test="postalCode"]', POSTAL_CODE);
    await page.click('input[data-test="continue"]');

    await page.click('button[data-test="finish"]');
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('button[data-test="back-to-products"]')).toBeVisible();

    await page.click('button[data-test="back-to-products"]');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC05 - Cancel during checkout returns to inventory page', async ({ page }) => {
    await addProductsToCart(page);
    await proceedToCheckout(page);

    await page.fill('input[data-test="firstName"]', FIRST_NAME);
    await page.fill('input[data-test="lastName"]', LAST_NAME);
    await page.fill('input[data-test="postalCode"]', POSTAL_CODE);
    await page.click('input[data-test="continue"]');

    await page.click('button[data-test="cancel"]');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
});
