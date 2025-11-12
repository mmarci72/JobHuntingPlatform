import { Page, expect } from "@playwright/test";

export const apply = async (page: Page) => {
  expect(page).toHaveURL(/\/details.*/);

  const applyButton = await page.getByRole("button", { name: "Apply" });
  const alreadyAppliedText = await page.getByText(
    "You have applied for this"
  );
  await expect(applyButton.or(alreadyAppliedText)).toBeVisible();

  if (await applyButton.isVisible()) {
    await applyButton.click();
  } else {

    await expect(alreadyAppliedText).toBeVisible();
  }
};
