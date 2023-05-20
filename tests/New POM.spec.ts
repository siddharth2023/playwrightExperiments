import { test } from "@playwright/test";
import { LoginNew } from "@lib/loginNewMethod";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Verify instructor ability to filter exams in LTI @debug", () => {
  test.beforeEach(async ({ page }) => {
    const LMSLogin = LoginNew({ page });
    await LMSLogin.login();
    await LMSLogin.navigateToCourse();
  });

  test("Filter exams list to show all exams", async ({ page }) => {
    const LMSLogin = LoginNew({ page });
    await LMSLogin.logOut();
  });
});
