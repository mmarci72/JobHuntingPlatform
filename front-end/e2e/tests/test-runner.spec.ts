import test from "@playwright/test";
import path from "path";
import * as fs from "fs";
import { actionMap, stateMap } from "./mappings";

const PLAN_DIRECTORY = "./e2e/test-plans";

let allTestPlanFiles: string[] = [];

try {
  if (fs.existsSync(PLAN_DIRECTORY)) {
    allTestPlanFiles = fs
      .readdirSync(PLAN_DIRECTORY)
      .filter(file => path.extname(file).toLowerCase() === ".json")
      .sort(); // .sort() ensures a consistent execution order
  } else {
    console.warn(`MBT plans directory not found: ${PLAN_DIRECTORY}. Skipping.`);
  }
} catch (error) {
  console.error(`Error reading test plans directory: ${error}`);
}

test.describe("Mode based test execution", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.setTimeout(5 * 60 * 1000000);
  if (allTestPlanFiles.length === 0) {
    test("No test plans found", () => {
      console.log(`No .json files found in ${PLAN_DIRECTORY}.`);
      test.skip(true, "No test plans found in directory.");
    });
    return;
  }

  for (const planFilename of allTestPlanFiles) {
    test(`execute plan: ${planFilename}`, async ({ page }) => {

      const filePath = path.join(PLAN_DIRECTORY, planFilename);
      const testPlanRaw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const { input_list, output_list } = testPlanRaw.test_suite;

      await page.goto("/");

      for (let i = 0; i < input_list.length; i++) {
        const actionName = input_list[i];
        const expectedStateName = output_list[i];

        await test.step(`Step ${i + 1}: [${actionName}] -> Expect [${expectedStateName}]`, async () => {
          console.log("INPUT: " + actionName);
          await actionMap[actionName](page);
          console.log("OUTPUT: " + expectedStateName);
          await stateMap[expectedStateName](page);
        });
      }
    });
  }
});
