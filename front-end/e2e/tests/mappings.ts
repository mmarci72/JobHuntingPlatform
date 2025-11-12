import { Locator, Page, expect } from "@playwright/test";
import {
  goToRegisterPage,
  login_recruiter,
  login_user,
  loginInvalid,
  logout,
  registerRecruiter,
  registerUser,
} from "./auth";
import {
  applyFilter,
  filterSalary,
  filterSeniority,
  openFilter,
  searchJobs,
} from "./home";
import { deleteResume, downloadResume, uploadResume } from "./settings";
import { apply } from "./jobDetail";

let downloadPage: Page | undefined = undefined;

export const pathMap: Record<string, (page: Page) => Locator> = {
  login_user: page => page.getByRole("button", { name: "Sign In" }),
};

export const actionMap: Record<string, (page: Page) => Promise<void>> = {
  login_user: async page => {
    await login_user(page);
  },
  login_recruiter: async page => {
    await login_recruiter(page);
  },
  login: async page => {
    await loginInvalid(page);
  },
  login_pressed: async page => {
    await loginInvalid(page);
  },
  logout_clicked: async page => {
    await logout(page);
  },
  register_pressed: async page => {
    await goToRegisterPage(page);
  },
  register_user: async page => {
    await registerUser(page);
  },
  register_recruiter: async page => {
    await registerRecruiter(page);
  },
  home_pressed: async page => {
    await navigateTo(page, "/home");
  },
  home_clicked: async page => {
    await navigateTo(page, "/home");
  },
  settings_pressed: async page => {
    await navigateTo(page, "/settings");
  },
  register_form_clicked: async page => {
    await navigateTo(page, "/newCompany");
  },
  job_clicked: async page => {
    await navigateTo(page, "/details;positionId=21");
  },
  search_jobs: async page => {
    await searchJobs(page);
  },
  open_filter: async page => {
    await openFilter(page);
  },
  filter_seniority: async page => {
    await filterSeniority(page);
  },
  filter_salary: async page => {
    await filterSalary(page);
  },
  apply_filter: async page => {
    await applyFilter(page);
  },
  resume_upload: async page => {
    await uploadResume(page);
  },
  download: async page => {
    downloadPage = await downloadResume(page);
  },
  delete_resume: async page => {
    await deleteResume(page);
  },
  apply: async page => {
    await apply(page);
  },
};

export const stateMap: Record<string, (page: Page) => Promise<void>> = {
  logged_in: async page => {
    await expect(page).toHaveURL("/home");
  },
  invalid_credentials: async page => {
    const error = await page.getByText("Invalid username or password.");
    await expect(error).toBeVisible();
  },
  logged_out: async page => {
    await expect(page).toHaveTitle("Sign in to Job Portal");
  },
  jobs_searched: async page => {
    await expect(page).toHaveURL("/home");
    const searchBox = page.getByRole("textbox", {
      name: "Enter your search term",
    });

    await expect(searchBox).not.toBeEmpty();
  },
  filter_popup: async page => {
    await expect(page).toHaveURL("/home");

    const filterHeading = page.getByRole("heading", { name: "Filters" });

    await expect(filterHeading).toBeVisible();
  },
  seniority_filter_applied: async page => {
    await expect(page).toHaveURL("/home");

    const seniorityPicker = page.getByRole("button", { name: "Seniority" });

    await expect(seniorityPicker).toBeVisible();

    const internCheckbox = page.locator('[id="0-input"]');
    await expect(internCheckbox).toBeChecked();
    await internCheckbox.click();
  },
  salary_filter_applied: async page => {
    await expect(page).toHaveURL("/home");

    const salaryFilter = page.getByRole("button", { name: "Salary" });

    await expect(salaryFilter).toBeVisible();

    const minButton = page.getByRole("spinbutton", { name: "min" });
    const maxButton = page.getByRole("spinbutton", { name: "max" });

    await expect(minButton).toHaveValue("300000");
    await expect(maxButton).toHaveValue("2000000");
  },
  filter_applied: async page => {
    await expect(page).toHaveURL("/home");

    const filterHeading = page.getByRole("heading", { name: "Filters" });

    await expect(filterHeading).not.toBeVisible();
  },
  uploaded: async page => {
    await expect(page).toHaveURL("/settings");
    const downloadButton = await page.getByRole("button", {
      name: "Download resume",
    });
    await expect(downloadButton).toBeVisible();
  },
  downloaded: async page => {
    await expect(page).toHaveURL("/settings");
    expect(downloadPage).toBeTruthy();
    if (downloadPage) {
      expect(downloadPage.url()).toMatch(/blob:.*/);
      downloadPage.close();
    }
  },
  deleted: async page => {
    await expect(page).toHaveURL("/settings");

    const downloadButton = await page.getByRole("button", {
      name: "Download resume",
    });

    await expect(downloadButton).not.toBeVisible();
  },
  applied: async page => {
    expect(page).toHaveURL(/\/details.*/);
    const alreadyAppliedText = await page.getByText(
      "You have applied for this"
    );

    await expect(alreadyAppliedText).toBeVisible();
  },
  registered: async page => {
    await expect(page).toHaveURL(/\/.*/);
    const welcomeText = await page.getByText("Welcome, ", { exact: false });

    await expect(welcomeText).toContainText("Welcome,");
    await expect(welcomeText).toBeVisible();
  },
  register_company_page: async page => {
    await expect(page).toHaveURL("/newCompany");
  },
  register_page: async page => {
    const registerLogo = await page.getByRole("heading", {
      name: "logo Register",
    });

    await expect(registerLogo).toBeVisible();
  },
  settings_page: async page => {
    await expect(page).toHaveURL("/settings");
  },
  job_details_page: async page => {
    await expect(page).toHaveURL(/\/details*/);
  },
  home_page: async page => {
    await expect(page).toHaveURL("/home");
  },
  login_page: async page => {
    const loginText = await page.getByRole("heading", {
      name: "logo Sign in to your account",
    });

    await expect(loginText).toBeVisible();
  },
};

const navigateTo = async (page: Page, url: string) => {
  await page.goto(url);
};
