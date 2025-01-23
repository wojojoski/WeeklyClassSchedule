const { test: setup } = require("@playwright/test");
const path = require("path");

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/public/user/signin");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.click('button[type="submit"]');

  // Wait for successful login
  await page.waitForURL("http://localhost:3000/");

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
