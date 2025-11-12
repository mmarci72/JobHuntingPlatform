import { expect, Page } from "@playwright/test";
import { pathMap } from "./mappings";

export const login_user = async (page: Page) => {
  await login(page, "test", "test");
};

export const login_recruiter = async (page: Page) => {
  await login(page, "user", "test");
};

export const loginInvalid = async (page: Page) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Sign in to Job Portal");

  const userNameTextBox = await page.getByRole("textbox", { name: "Username" });
  const passwordTextBox = await page.getByRole("textbox", { name: "Password" });

  const signInButton = page.getByRole("button", { name: "Sign In" });

  await userNameTextBox.fill("invalid");
  await passwordTextBox.fill("invalid");

  await signInButton?.click();
};

export const logout = async (page: Page) => {
  const logoutButton = await page.locator("#logout");
  await logoutButton.click();
};

const login = async (page: Page, password: string, username: string) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Sign in to Job Portal");

  const userNameTextBox = await page.getByRole("textbox", { name: "Username" });
  const passwordTextBox = await page.getByRole("textbox", { name: "Password" });

  await userNameTextBox.fill(password);
  await passwordTextBox.fill(username);

  const signInButton = page.getByRole("button", { name: "Sign In" });

  await signInButton?.click();

  await page.waitForURL("/home");

  await page.context().storageState({ path: "playwright/.auth.json" });
};

export const goToRegisterPage = async (page: Page) => {
  const registerButton = await page.getByRole("link", { name: "Register" });

  await registerButton.click();
};

export const goToLoginPage = async (page: Page) => {
  const loginButton = await page.getByRole("link", { name: "« Back to Login" });

  await loginButton.click();
};

export const registerUser = async (page: Page) => {
  await page.getByRole("textbox", { name: "First name" }).fill("test");
  await page.getByRole("textbox", { name: "Last name" }).fill("test");
  const number = Math.floor(Math.random() * 1000000);
  await page.getByRole("textbox", { name: "Username" }).fill("test" + number);
  await page.getByRole("textbox", { name: "Phone number" }).fill("1234567890");
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("test" + number + "@gmail.com");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("test");
  await page
    .getByRole("textbox", { name: "Confirm password", exact: true })
    .fill("test");

  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForURL(/\/.*/);
};

export const registerRecruiter = async (page: Page) => {
  await page.getByRole("textbox", { name: "First name" }).fill("test");
  await page.getByRole("textbox", { name: "Last name" }).fill("test");
  const number = Math.floor(Math.random() * 1000000);
  await page.getByRole("textbox", { name: "Username" }).fill("test" + number);
  await page.getByRole("textbox", { name: "Phone number" }).fill("1234567890");
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("test" + number + "@gmail.com");
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill("test");
  await page
    .getByRole("textbox", { name: "Confirm password", exact: true })
    .fill("test");

  await page.getByRole("button", { name: "Register" }).click();
  await page.waitForURL(/\/.*/);
};
