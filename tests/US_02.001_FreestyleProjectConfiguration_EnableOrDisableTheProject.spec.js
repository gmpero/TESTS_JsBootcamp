import { expect } from "@playwright/test";
import { test } from "../base.js";
import { ProjectData, DropdownData } from "./testData/US_02.001.testData.js";

test.describe("US_02.001 | Freestyle Project Configuration > Enable or Disable the Project", () => {
    
    test.beforeEach(async ({page}) => {
        await page.locator(".task-link-text").first().click();
        await page.locator("#name").fill(ProjectData.freestyleProject.name);
        await page.locator(".hudson_model_FreeStyleProject").click();
        await page.locator("#ok-button").click();
        await page.locator("#jenkins-head-icon").click();
        await page.waitForLoadState("load");
    });

    test("TC_02.001.01 | Verify number of items in project configuration dropdown", async ({ page }) => {
        await page.getByRole('link', { name: `${ProjectData.freestyleProject.name}`, exact: true }).hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();

        const countElItemsOnDropdown = await page.locator(".jenkins-dropdown__item").count();
        expect(countElItemsOnDropdown).toEqual(DropdownData.expectedItemCount);
    });

    test("TC_02.001.02 | Verify item names in project configuration dropdown", async ({ page }) => {
        await page.getByRole('link', { name: `${ProjectData.freestyleProject.name}`, exact: true }).hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();

        const nameElItemsOnDropdown = await page.locator(".jenkins-dropdown__item").allInnerTexts();
        expect(nameElItemsOnDropdown).toEqual(DropdownData.menuItems);
    });

    test("TC_02.001.03 | Verify configuration access by clicking project name", async ({page}) => {
        await page.getByRole("link", { name: `${ProjectData.freestyleProject.name}`, exact: true }).click();
        const configureButton = page.getByRole("link", {name: `${DropdownData.menuItems[3]}`});
        expect(configureButton).toBeVisible();
    });

    test("TC_02.001.04 | Verify configuration access via project dropdown menu", async ({ page }) => {
        await page.getByRole('link', { name: `${ProjectData.freestyleProject.name}`, exact: true }).hover();
        await page.locator(".jenkins-menu-dropdown-chevron").click();
        await page.getByRole("link", {name: `${DropdownData.menuItems[3]}`}).click();

        expect(page).toHaveURL(`/job/${ProjectData.freestyleProject.name}/configure`);
    });

    test("TC_02.001.05 | Verify configuration access via project name click", async ({ page }) => {
        await page.getByRole('link', { name: `${ProjectData.freestyleProject.name}`, exact: true }).focus();
        await page.keyboard.press('Enter');
        await page.waitForURL(`/job/${ProjectData.freestyleProject.name}/`)
        await page.getByRole("link", {name: `${DropdownData.menuItems[3]}`}).click();

        expect(page).toHaveURL(`/job/${ProjectData.freestyleProject.name}/configure`);
    });
});