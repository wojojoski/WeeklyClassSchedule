const { test, expect } = require("@playwright/test");

// Test for login link presence
test("has link to login page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.click("text=Log In");
  await page.waitForURL("http://localhost:3000/public/user/signin");
  await expect(page).toHaveURL("http://localhost:3000/public/user/signin");
  await expect(page.locator("h2")).toContainText("Sign In");
});

// Test for authentication and profile access
test("can access profile after login", async ({ page }) => {
  await page.goto("http://localhost:3000/public/user/signin");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.click('button[type="submit"]');
  await page.waitForURL("http://localhost:3000/");
  await page.goto("http://localhost:3000/protected/user/profile");
  await expect(page).toHaveURL("http://localhost:3000/protected/user/profile");
  await expect(page.locator("h2")).toContainText("Profile");
});

// Test for redirects when accessing protected routes without authentication
test("redirects to login when accessing protected routes without auth", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/protected/classschedule");
  await expect(page).toHaveURL(/http:\/\/localhost:3000\/public\/user\/signin/);
  await page.goto("http://localhost:3000/protected/user/profile");
  await expect(page).toHaveURL(/http:\/\/localhost:3000\/public\/user\/signin/);
  await expect(page.locator("h2")).toContainText("Sign In");
  await expect(page).toHaveURL(/returnUrl=/);
});
