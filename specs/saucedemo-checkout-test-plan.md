# Sauce Demo Checkout Test Plan

## User Story
As a customer, I want to complete my purchase through a checkout process so that I can order products online.

## Application URL
https://www.saucedemo.com/

## Test Credentials
- Username: `standard_user`
- Password: `secret_sauce`

## Scope
Validate the complete checkout workflow for Sauce Demo, including cart review, checkout information entry, order overview, order completion, and error handling.

## Acceptance Criteria Covered
- AC1: Cart Review
- AC2: Checkout Information Entry
- AC3: Order Overview
- AC4: Order Completion
- AC5: Error Handling

## Test Data
- Product 1: Sauce Labs Backpack
- Product 2: Sauce Labs Bike Light
- Valid customer information:
  - First Name: `Test`
  - Last Name: `User`
  - Postal Code: `90210`
- Invalid customer information:
  - Empty fields
  - Invalid postal code: `!@#`

## Test Scenarios

### Scenario 1: Verify cart review displays selected products and totals

Test Case: `TC01 - Cart review shows selected items and total price`

Steps:
1. Navigate to the login page.
2. Log in with valid credentials.
3. Add Sauce Labs Backpack and Sauce Labs Bike Light to the cart.
4. Open the cart page.
5. Verify both items are present with correct name, description, and price.
6. Verify the cart badge shows `2` items.
7. Verify the total product price is displayed.
8. Verify buttons for `Continue Shopping` and `Checkout` are visible.

Expected Results:
- Both selected items appear in the cart.
- Each item displays name, description, and price.
- Cart badge count is `2`.
- Total price is shown and is the sum of item prices.
- Checkout button is enabled.

### Scenario 2: Validate required fields on checkout information page

Test Case: `TC02 - Checkout information page requires all form fields`

Steps:
1. From the cart page, click `Checkout`.
2. On the checkout information page, leave the First Name field empty.
3. Click `Continue`.
4. Verify an error message indicates the First Name is required.
5. Repeat for Last Name and Postal Code.

Expected Results:
- The checkout form does not proceed when any required field is empty.
- A clear validation error message appears for the missing field.

### Scenario 3: Validate checkout overview and summary details

Test Case: `TC03 - Checkout overview displays order summary, payment, and shipping details`

Steps:
1. Enter valid checkout information.
2. Click `Continue` to open the checkout overview page.
3. Verify the order summary includes the selected products.
4. Verify payment information is shown.
5. Verify shipping information is shown.
6. Verify item subtotal, tax, and total amounts are displayed correctly.
7. Verify `Cancel` and `Finish` buttons are visible.

Expected Results:
- Overview page lists each product included in the order.
- Payment and shipping block details are displayed.
- Subtotal, tax, and total labels are visible.
- Cancel and Finish buttons are accessible.

### Scenario 4: Complete checkout and verify order confirmation

Test Case: `TC04 - Complete checkout and confirm order`

Steps:
1. From the overview page, click `Finish`.
2. Verify the confirmation page appears.
3. Verify the success message `THANK YOU FOR YOUR ORDER` is visible.
4. Verify the `Back Home` button is shown.
5. Click `Back Home` and verify the products page is displayed.

Expected Results:
- The order confirmation screen appears after finishing.
- Confirmation header and message appear.
- Back Home button returns to the product inventory page.

### Scenario 5: Validate cancel checkout behavior

Test Case: `TC05 - Cancel during checkout returns to cart page`

Steps:
1. From the checkout overview page, click `Cancel`.
2. Verify the user returns to the cart page.
3. Verify selected items remain in the cart.

Expected Results:
- Cancel returns to the cart page.
- Cart contents remain unchanged.

## Notes
- Run tests across Chromium, Firefox, and WebKit browsers.
- Use stable selectors such as `data-test` attributes and accessible roles.
- Capture screenshots for failure states if test automation identifies issues.
