const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const outputDir = 'test-results/screenshots';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = 'https://www.saucedemo.com/';
  await page.goto(url);
  await page.screenshot({ path: `${outputDir}/login.png`, fullPage: true });

  await page.fill('input[data-test="username"]', 'standard_user');
  await page.fill('input[data-test="password"]', 'secret_sauce');
  await page.click('input[data-test="login-button"]');
  await page.waitForURL(/inventory.html/);
  await page.screenshot({ path: `${outputDir}/inventory.png`, fullPage: true });

  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('a.shopping_cart_link');
  await page.waitForURL(/cart.html/);
  await page.screenshot({ path: `${outputDir}/cart.png`, fullPage: true });

  await page.click('button[data-test="checkout"]');
  await page.waitForURL(/checkout-step-one.html/);
  await page.screenshot({ path: `${outputDir}/checkout-info.png`, fullPage: true });

  await page.fill('input[data-test="firstName"]', 'Test');
  await page.fill('input[data-test="lastName"]', 'User');
  await page.fill('input[data-test="postalCode"]', '90210');
  await page.click('input[data-test="continue"]');
  await page.waitForURL(/checkout-step-two.html/);
  await page.screenshot({ path: `${outputDir}/checkout-overview.png`, fullPage: true });

  await page.click('button[data-test="finish"]');
  await page.waitForURL(/checkout-complete.html/);
  await page.screenshot({ path: `${outputDir}/checkout-complete.png`, fullPage: true });

  await browser.close();
  console.log('Screenshots captured in', outputDir);
})();