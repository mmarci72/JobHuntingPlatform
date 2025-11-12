import { Page } from "@playwright/test";

export const uploadResume = async (page: Page) => {
  const fileChooserPromise = page.waitForEvent("filechooser");

  const uploadButton = await page.getByRole("button", {
    name: "Upload resume",
  });

  await uploadButton.click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("./e2e/fixtures/blank.pdf");
};

export const deleteResume = async (page: Page) => {
  const deleteButton = await page.getByRole("button", {
    name: "Delete resume",
  });

  await deleteButton.click();
};

export const downloadResume = async (page: Page): Promise<Page> => {
  const pagePromise = page.context().waitForEvent("page");
  const downloadButton = await page.getByRole("button", {
    name: "Download resume",
  });
  await downloadButton.click();
  return await pagePromise;
};
