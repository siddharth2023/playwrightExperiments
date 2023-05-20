// fixtures.ts
import { test as base, chromium, type BrowserContext } from "@playwright/test";
import path from "path";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    let pathToExtension = path.join(
      __dirname,
      // "/extensions/HL-qa1-ext-man-6.5.0.0"
      "/extensions/HL-qa1-ext-man-6.8.0.0"
    );

    pathToExtension = path.join(
      __dirname,
      // "/extensions/HL-qa1-ext-man-6.5.0.0"
      "../../extensions/HL-qa1-ext-man-6.8.0.0"
    );
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        `--auto-accept-camera-and-microphone-capture`,
        `-use-fake-device-for-media-stream`, // Also use this
      ],
    });
    await context.grantPermissions(["camera", "microphone"]);
    await use(context);
    // await context.close();
  },
  extensionId: async ({ context }, use) => {
    /*
    // for manifest v2:
    let [background] = context.backgroundPages()
    if (!background)
      background = await context.waitForEvent('backgroundpage')
    */

    // for manifest v3:
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});
export const expect = test.expect;
