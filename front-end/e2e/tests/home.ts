import { Page, expect } from "@playwright/test";

export const searchJobs = async (page: Page) => {
  expect(page).toHaveURL("/home");

  const searchBox = page.getByRole("textbox", {
    name: "Enter your search term",
  });

  await searchBox.fill("Junior Frontend Developer");
};

export const openFilter = async (page: Page) => {
  expect(page).toHaveURL("/home");

  const filterButton = page.getByRole("button", { name: "Filters" });

  await filterButton.click();
};

export const filterSeniority = async (page: Page) => {
  expect(page).toHaveURL("/home");
  const filterHeading = page.getByRole("heading", { name: "Filters" });
  await expect(filterHeading).toBeVisible();

  const seniorityPicker = page.getByRole("button", { name: "Seniority" });
  const internCheckbox = page.locator('[id="0-input"]');

  if (!(await internCheckbox.isVisible())) {
    await seniorityPicker.click();
  }

  await internCheckbox.click();
};

export const filterSalary = async (page: Page) => {
  expect(page).toHaveURL("/home");

  const salaryFilter = page.getByRole("button", { name: "Salary" });
  const minButton = page.getByRole("spinbutton", { name: "min" });
  const maxButton = page.getByRole("spinbutton", { name: "max" });

  if (!(await minButton.isVisible())) {
    await salaryFilter.click();
  }

  await minButton.fill("300000");
  await maxButton.fill("2000000");
};

export const applyFilter = async (page: Page) => {
  expect(page).toHaveURL("/home");

  const applyButton = page.getByRole("button", { name: "Filter" });

  await applyButton.click();
};
