import { test as setup, expect, Page } from "@playwright/test";
import { login_user } from "./auth";

setup("authentication", async ({ page }) => {
  await login_user(page);
});
