import { test, expect } from "@playwright/test";
import os from "os";

// test.use({ headless: false });

test("has title 2", async ({ page }) => {
  const type = os.type(); // "Windows_NT"
  const release = os.release(); // "10.0.14393"
  const platform = os.platform(); // "win32"
  const architecture = os.arch(); // "win32"

  console.log(`type: ${type}`);
  console.log(`release: ${release}`);
  console.log(`platform: ${platform}`);
  console.log(`architecture: ${architecture}`);

  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link 2", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
