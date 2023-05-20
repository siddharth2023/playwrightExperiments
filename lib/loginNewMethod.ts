import * as dotenv from "dotenv";
dotenv.config();

export const LoginNew = ({ page }) => {
  const LoginObj = {
    locators: {
      email: "a",
      email2: "a",
      email3: "a",
      courseInDashboard: function (courseName) {
        return page.locator(
          '//div[contains(@class, "ic-DashboardCard__header_content")]//*[text()="' +
            courseName +
            '"]'
        );
      },
      quizzesLeftMenuItem: page.locator("a.quizzes"),
      searchForQuizSelector: "#searchTerm",
      LTILeftMenuItem: page.getByRole("link", {
        name: process.env.CANVAS_LTI_LINK_TEXT,
      }),
    },
    login: async () => {
      await page.pause();
      await page.goto("https://canvas.honorlock.com/login/canvas");
      // await page.waitForLoadState('networkidle');// qa-automation+instructor@honorlock.com // QAAutoPassword1!
      // const usr = process.env.CANVAS_INSTRUCTOR_USER;
      // const pwd = process.env.CANVAS_INSTRUCTOR_PASS;
      // await page.getByRole('textbox', { name: 'Email' }).fill('a');
      await page.getByRole("textbox", { name: "Email" }).fill("abc.com");
      // await page.getByLabel('Password').fill('b');
      await page.getByLabel("Password").fill("aaa!");
      await page.getByRole("button", { name: "Log In" }).click();
    },
    openLTI: async () => {
      await page.getByRole("link", { name: "asdf QA1.3" }).click();
      await page.getByRole("link", { name: "asdf" }).click();
    },
    logOut: async () => {
      await page.getByRole("button", { name: "Account" }).click();
      await page.getByRole("button", { name: "Logout" }).click();
      await page.getByRole("img", { name: "ure" }).click();
    },

    getLms: async () => {
      console.log(process.env.LMS_LIST);
      const lmsList = process.env.LMS_LIST.split(",");
      const lms = lmsList.filter((item) =>
        page.url().toLowerCase().includes(item.trim())
      )[0];
      return lms;
    },

    getInstructorUser: async () => {
      const lms = await LoginObj.getLms();
      switch (lms) {
        case "canvas":
          return process.env.CANVAS_INSTRUCTOR_USER;
        case "d2l":
          return process.env.D2L_INSTRUCTOR_USER;
      }
    },

    getInstructorName: async () => {
      const lms = await LoginObj.getLms();
      switch (lms) {
        case "canvas":
          return process.env.CANVAS_INSTRUCTOR_NAME;
        case "d2l":
          return process.env.D2L_INSTRUCTOR_NAME;
      }
    },

    getInstructorEmail: async () => {
      const lms = await LoginObj.getLms();
      switch (lms) {
        case "canvas":
          return process.env.CANVAS_INSTRUCTOR_EMAIL;
        case "d2l":
          return process.env.D2L_INSTRUCTOR_EMAIL;
      }
    },

    navigateToCourse: async (courseName = null) => {
      const lms = await LoginObj.getLms();
      switch (lms) {
        case "canvas":
          if (courseName) {
            await LoginObj.navigateToCanvasCourse(courseName);
          } else {
            await LoginObj.navigateToCanvasCourse(
              process.env.CANVAS_COURSE_NAME
            );
          }
          break;
        case "d2l":
          if (courseName) {
            // Change appropriately for D2L
            // await this.d2lInstructorActions.navigateToCourse(courseName);
          } else {
            // Change appropriately for D2L
            // await this.d2lInstructorActions.navigateToCourse(process.env.D2L_COURSE_NAME);
          }
          break;
      }
    },

    navigateToCanvasCourse: async (courseName) => {
      await LoginObj.locators.courseInDashboard(courseName).click();
      // console.log(a);
    },
  };
  return LoginObj;
};
