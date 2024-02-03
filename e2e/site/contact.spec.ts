import { test, expect } from '@playwright/test';
import { getLocalePath, locales, translate } from '../utils/test-utils';
// import { IFormSubmitAPI } from "../../src/config/public-api-params";

// const MOCK_SEND_GRID: IFormSubmitAPI = {
// 	path: "/api/mock/sendgrid",
// 	headers: { "Content-Type": "application/json" },
// 	method: "POST",
// };

const nameErrSelector = (locale: string) =>
	`text=${translate(locale, 'CONTACT_FORM_INVALID_NAME')}`;
const emailErrSelector = (locale: string) =>
	`text=${translate(locale, 'CONTACT_FORM_INVALID_EMAIL')}`;
const messageErrSelector = (locale: string) =>
	`text=${translate(locale, 'CONTACT_FORM_INVALID_MESSAGE')}`;

test.describe.fixme('Contact Page', () => {
	locales.map((locale) => {
		test.fixme(
			`${locale} > should navigate to the contact page`,
			async ({ page }) => {
				await page.goto(getLocalePath(locale));
				await page.hover(
					`text=${translate(locale, 'MENU_ITEM_LABEL_ID_CONTACT')}`
				);
				await page.click(
					`text=${translate(locale, 'MENU_ITEM_DESC_ID_CONTACT')}`
				);

				await expect(page).toHaveURL(getLocalePath(locale, 'contact'));
				await expect(page.locator('h1')).toHaveText(
					translate(locale, 'CONTACT_PAGE_TITLE')
				);
			}
		);
	});
});

test.describe.fixme('Contact Form', () => {
	locales.map((locale) => {
		test(`${locale} > should yield errors for empty fields on form submission`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, 'contact'));

			await page
				.locator(`text=${translate(locale, 'CONTACT_FORM_LABEL_SEND')}`)
				.click();

			await expect(
				page.locator(`text=${translate(locale, 'CONTACT_FORM_INVALID_NAME')}`)
			).toHaveCount(1);

			await expect(
				page.locator(`text=${translate(locale, 'CONTACT_FORM_INVALID_EMAIL')}`)
			).toHaveCount(1);

			await expect(
				page.locator(
					`text=${translate(locale, 'CONTACT_FORM_INVALID_MESSAGE')}`
				)
			).toHaveCount(1);
		});

		test(`${locale} > should yield individual error messages for missing content`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, 'contact'));

			await page.locator(`#fullname`).fill('Ed Nather');
			await page.locator(`#email`).fill('nather@astro.as.utexas.edu');

			await page
				.locator(`text=${translate(locale, 'CONTACT_FORM_LABEL_SEND')}`)
				.click();

			await expect(page.locator(nameErrSelector(locale))).toHaveCount(0);
			await expect(page.locator(emailErrSelector(locale))).toHaveCount(0);
			await expect(page.locator(messageErrSelector(locale))).toHaveCount(1);
			await expect(
				page.locator(messageErrSelector(locale)),
				'should display warning for Message Input'
			).toHaveText(translate(locale, 'CONTACT_FORM_INVALID_MESSAGE'));
		});

		test(`${locale} > should show error for populated input on blur`, async ({
			page,
		}) => {
			await page.goto(getLocalePath(locale, 'contact'));

			// valid population
			await page.locator(`#email`).focus();
			await page.locator(`#email`).fill('lorem@ipsum.com');
			await page.locator(`#message`).focus();
			await expect(page.locator(emailErrSelector(locale))).toHaveCount(0);

			// invalid population
			await page.locator(`#email`).focus();
			await page.locator(`#email`).fill('invalid email address');
			await page.locator(`#message`).focus();
			await expect(page.locator(emailErrSelector(locale))).toHaveCount(1);

			// valid re-population
			await page.locator(`#email`).focus();
			await page.locator(`#email`).fill('valid@mail.address');
			await page.locator(`#message`).focus();
			await expect(page.locator(emailErrSelector(locale))).toHaveCount(0);
		});

		test(`${locale} > should accept only valid e-mails`, async ({ page }) => {
			await page.goto(getLocalePath(locale, 'contact'));

			await page.locator(`#fullname`).fill('Ed Nather');

			await expect(page.locator(emailErrSelector(locale))).toHaveCount(0);

			await page.locator(`#email`).focus();
			await page.locator(`#email`).fill('@astro.as.utexas.edu');
			await page.locator(`#email`).fill('');
			await page.locator(`#message`).focus();

			await expect(page.locator(emailErrSelector(locale))).toHaveCount(0);
		});

		test.fixme(
			`${locale} > should yield errors on no-captcha submission`,
			async ({ page }) => {
				await page.goto(getLocalePath(locale, 'contact'));

				await page.locator(`#fullname`).fill('Ed Nather');
				await page.locator(`#email`).fill('nather@astro.as.utexas.edu');
				await page
					.locator(`#message`)
					.fill('Real Programmers write in FORTRAN');

				await page
					.locator(`text=${translate(locale, 'CONTACT_FORM_LABEL_SEND')}`)
					.click();

				await expect(
					page.locator(messageErrSelector(locale)),
					'should display warning for Message Input'
				).toHaveText(translate(locale, 'CONTACT_FORM_INVALID_MESSAGE'));
			}
		);
	});
});
