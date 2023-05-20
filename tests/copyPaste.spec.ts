import { LoginNew } from "@lib/loginNewMethod";
import { test, expect } from "./fixtures/fixture";

test("Copy Paste", async ({ page, extensionId }) => {
  const LMSLogin = LoginNew({ page });
  await LMSLogin.login();
  await LMSLogin.navigateToCourse();

  // await page.goto(`chrome-extension://${extensionId}/popup.html`);
  // await expect(page.locator("body")).toHaveText("HL Support");
  // await page.pause();

  // No await here and before the new page is open in a new tab
  const pagePromise = page.context().waitForEvent("page");
  await page
    .frameLocator('iframe[name="tool_content"]')
    .getByRole("link", { name: "Launch exam, Automation Copy Paste" })
    .click();
  // Now switch to the page
  const page2 = await pagePromise;
  await page2.waitForLoadState();
  console.log(await page2.title());
  await page2.locator("#take_quiz_link").click();
  await page2
    .frameLocator('iframe[title="Launch HL proctored exam"]')
    .locator("span")
    .filter({ hasText: "I authorize the collection of this data" })
    .locator("i")
    .click();
  await page2.pause();
  await page2
    .frameLocator('iframe[title="Launch HL proctored exam"]')
    .locator("i")
    .nth(2)
    .click();
  await page2
    .getByRole("heading", { name: "This test is proctored by HL" })
    .selectText();
  await page2.keyboard.press("Meta+C");
  await page2
    .frameLocator('iframe[title="Launch HL proctored exam"]')
    .getByRole("button", { name: "Continue to Exam Guidelines" })
    .click();
  await page2
    .frameLocator('iframe[title="Launch HL proctored exam"]')
    .getByRole("heading", { name: "Review Your Exam Guidelines" })
    .click();
  // await page.pause();
  // Before launching a new window
  const pagePromise2 = page.context().waitForEvent("page");
  await page2
    .frameLocator('iframe[title="Launch HL proctored exam"]')
    .getByRole("button", { name: "Launch proctoring, opens a new window" })
    .click();

  const page3 = await pagePromise2;
  await page3.waitForLoadState();
  console.log(await page3.title());

  await page3.getByRole("button", { name: "I understand" }).click();

  await page3.getByRole("button", { name: "Focus Test Window" });
  // await page3.pause();

  await page2.getByRole("heading", { name: "Start Exam" }).click();
  await page2.getByRole("button", { name: "Start HL proctored exam." }).click();
  await page2.getByRole("heading", { name: "Automation Copy Paste" }).click();
  await page2.getByRole("heading", { name: "Quiz Instructions" }).click();
  await page2.pause();
  await page2.getByRole("heading", { name: "Question 1" }).click();
  await page2.getByText("Description of question 1", { exact: true }).click();
  await page2.getByLabel("1").check();
  await page2.getByRole("button", { name: "Next Question" }).click();
  await page2.getByRole("heading", { name: "Question 2" }).click();
  await page2.getByText("Description of question 2", { exact: true }).click();
  await page2.getByLabel("aa").check();
  await page2.getByRole("button", { name: "Next Question" }).click();
  await page2.getByRole("heading", { name: "Question 3" }).click();
  await page2.getByText("Description of question 3", { exact: true }).click();
  await page2
    .frameLocator(
      'iframe[title="Rich Text Area\\. Press ALT\\+F8 for Rich Content Editor shortcuts\\."]'
    )
    .getByRole("paragraph")
    .click();
  await page2
    .frameLocator(
      'iframe[title="Rich Text Area\\. Press ALT\\+F8 for Rich Content Editor shortcuts\\."]'
    )
    .locator("#tinymce")
    .fill("Hello there!");
  await page2.getByRole("button", { name: "Submit Quiz" }).click();

  console.log("1");
});
