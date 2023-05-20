import { test, expect } from "@playwright/test";
import AddComputerPage from "./support/pageobjectmodel/pages/addComputer.page";
import ComputersPage from "./support/pageobjectmodel/pages/computers.page";

test.describe("Describe block", () => {
  let computersPage;
  let addComputerPage;

  // test("basic test with POM", async ({ page }) => {
  //   computersPage = new ComputersPage(page);
  //   addComputerPage = new AddComputerPage(page);
  //   await computersPage.goto();
  //   await computersPage.clickAddNewComputer();

  //   await addComputerPage.addNewComputer();

  //   await computersPage.assertNewComputerAdded();
  // });

  test("basic test with POM 2", async ({ page }) => {
    const computersPage2 = new ComputersPage(page);
    const addComputerPage2 = new AddComputerPage(page);
    await computersPage2.goto();
    await computersPage2.clickAddNewComputer();

    await addComputerPage2.addNewComputer();

    await computersPage.assertNewComputerAdded();
  });
});
