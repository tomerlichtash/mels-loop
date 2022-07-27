import { test, expect } from "@playwright/test";
import {
	CONTACT_FORM_INPUT_FULLNAME_SELECTOR,
	CONTACT_FORM_INPUT_EMAIL_SELECTOR,
	CONTACT_FORM_INPUT_MESSAGE_SELECTOR,
	CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR,
	CONTACT_FORM_INPUT_FULLNAME_ERROR_SELECTOR,
	CONTACT_FORM_INPUT_MESSAGE_ERROR_SELECTOR,
} from "./utils/locators";
import { getLocalePath, locales, translate } from "./utils/test-utils";

test.describe("Contact Page", () => {
	locales.map((locale) => {
		test(`${locale} > should navigate to the contact page`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale));
			await page.hover(
				`text=${translate(locale, "MENU_ITEM_LABEL_ID_CONTACT")}`
			);
			await page.click(
				`text=${translate(locale, "MENU_ITEM_DESC_ID_CONTACT")}`
			);

			await expect(page).toHaveURL(getLocalePath(locale, "contact"));
			await expect(page.locator("h1")).toHaveText(
				translate(locale, "CONTACT_PAGE_TITLE")
			);
		});
	});
});

test.describe("Contact Form", () => {
	locales.map((locale) => {
		test(`${locale} > should yield errors for empty fields on form submission`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, "contact"));

			await page
				.locator(`text=${translate(locale, "CONTACT_FORM_LABEL_SEND")}`)
				.click();

			await expect(
				page.locator(CONTACT_FORM_INPUT_FULLNAME_ERROR_SELECTOR)
			).toHaveCount(1);

			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR)
			).toHaveCount(1);

			await expect(
				page.locator(CONTACT_FORM_INPUT_MESSAGE_ERROR_SELECTOR)
			).toHaveCount(1);

			await expect(
				page.locator(CONTACT_FORM_INPUT_FULLNAME_ERROR_SELECTOR),
				"should display warning for Name Input"
			).toHaveText(translate(locale, "CONTACT_FORM_INVALID_NAME"));

			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR),
				"should display warning for Email Input"
			).toHaveText(translate(locale, "CONTACT_FORM_INVALID_EMAIL"));

			await expect(
				page.locator(CONTACT_FORM_INPUT_MESSAGE_ERROR_SELECTOR),
				"should display warning for Message Input"
			).toHaveText(translate(locale, "CONTACT_FORM_INVALID_MESSAGE"));
		});

		test(`${locale} > should yield individual error messages for missing content`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, "contact"));

			await page
				.locator(CONTACT_FORM_INPUT_FULLNAME_SELECTOR)
				.fill("Ed Nather");
			await page
				.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR)
				.fill("nather@astro.as.utexas.edu");

			await page
				.locator(`text=${translate(locale, "CONTACT_FORM_LABEL_SEND")}`)
				.click();

			await expect(
				page.locator(CONTACT_FORM_INPUT_FULLNAME_ERROR_SELECTOR)
			).toHaveCount(0);

			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR)
			).toHaveCount(0);

			await expect(
				page.locator(CONTACT_FORM_INPUT_MESSAGE_ERROR_SELECTOR)
			).toHaveCount(1);

			await expect(
				page.locator(CONTACT_FORM_INPUT_MESSAGE_ERROR_SELECTOR),
				"should display warning for Message Input"
			).toHaveText(translate(locale, "CONTACT_FORM_INVALID_MESSAGE"));
		});

		test(`${locale} > should show error for populated input on blur`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, "contact"));

			// valid population
			await page.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR).focus();
			await page
				.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR)
				.fill("lorem@ipsum.com");
			await page.locator(CONTACT_FORM_INPUT_MESSAGE_SELECTOR).focus();
			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR)
			).toHaveCount(0);

			// invalid population
			await page.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR).focus();
			await page
				.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR)
				.fill("invalid email address");
			await page.locator(CONTACT_FORM_INPUT_MESSAGE_SELECTOR).focus();
			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR)
			).toHaveCount(1);

			// valid re-population
			await page.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR).focus();
			await page
				.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR)
				.fill("valid@mail.address");
			await page.locator(CONTACT_FORM_INPUT_MESSAGE_SELECTOR).focus();
			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR)
			).toHaveCount(0);
		});

		test(`${locale} > should accept only valid e-mails`, async ({ page }) => {
			await page.goto(getLocalePath(locale, "contact"));

			await page
				.locator(CONTACT_FORM_INPUT_FULLNAME_SELECTOR)
				.fill("Ed Nather");

			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR)
			).toHaveCount(0);

			await page.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR).focus();

			await page
				.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR)
				.fill("@astro.as.utexas.edu");

			await page.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR).fill("");

			await page.locator(CONTACT_FORM_INPUT_MESSAGE_SELECTOR).focus();

			await expect(
				page.locator(CONTACT_FORM_INPUT_EMAIL_ERROR_SELECTOR)
			).toHaveCount(0);
		});

		test.fixme(
			`${locale} > should yield errors on no-captcha submission`,
			async ({ page }) => {
				await page.goto(getLocalePath(locale, "contact"));

				await page
					.locator(CONTACT_FORM_INPUT_FULLNAME_SELECTOR)
					.fill("Ed Nather");
				await page
					.locator(CONTACT_FORM_INPUT_EMAIL_SELECTOR)
					.fill("nather@astro.as.utexas.edu");
				await page
					.locator(CONTACT_FORM_INPUT_MESSAGE_SELECTOR)
					.fill("Real Programmers write in FORTRAN");

				await page
					.locator(`text=${translate(locale, "CONTACT_FORM_LABEL_SEND")}`)
					.click();

				await expect(
					page.locator(CONTACT_FORM_INPUT_MESSAGE_ERROR_SELECTOR),
					"should display warning for Message Input"
				).toHaveText(translate(locale, "CONTACT_FORM_INVALID_MESSAGE"));
			}
		);
	});
});
