import { test, expect } from '@playwright/test';
import { t } from '@mels-loop/test-utils/i18n';
import { locales, getLocalePath } from '@mels-loop/test-utils/locale';

for (const locale of locales) {
	test.describe(`Contact Form (${locale})`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(getLocalePath(locale, '/contact'));
		});

		test('page displays contact title', async ({ page }) => {
			const title = t(locale, 'contact.pageTitle');
			await expect(page.getByRole('heading', { name: title })).toBeVisible();
		});

		test('submitting empty form shows all validation errors', async ({
			page,
		}) => {
			const sendLabel = t(locale, 'contact.send');
			await page.getByRole('button', { name: sendLabel }).click();

			await expect(
				page.getByText(t(locale, 'contact.invalidName')),
			).toBeVisible();
			await expect(
				page.getByText(t(locale, 'contact.invalidEmail')),
			).toBeVisible();
			await expect(
				page.getByText(t(locale, 'contact.invalidMessage')),
			).toBeVisible();
		});

		test('filling name and email still shows message error', async ({
			page,
		}) => {
			const nameLabel = t(locale, 'contact.labelName');
			const emailLabel = t(locale, 'contact.labelEmail');
			const sendLabel = t(locale, 'contact.send');

			await page.getByLabel(nameLabel).fill('Test User');
			await page.getByLabel(emailLabel).fill('test@example.com');
			await page.getByRole('button', { name: sendLabel }).click();

			await expect(
				page.getByText(t(locale, 'contact.invalidName')),
			).not.toBeVisible();
			await expect(
				page.getByText(t(locale, 'contact.invalidEmail')),
			).not.toBeVisible();
			await expect(
				page.getByText(t(locale, 'contact.invalidMessage')),
			).toBeVisible();
		});

		test('email validation on blur', async ({ page }) => {
			const emailLabel = t(locale, 'contact.labelEmail');
			const emailInput = page.getByLabel(emailLabel);
			const invalidEmailMsg = t(locale, 'contact.invalidEmail');

			await emailInput.fill('not-an-email');
			await emailInput.blur();
			await expect(page.getByText(invalidEmailMsg)).toBeVisible();

			await emailInput.fill('valid@example.com');
			await emailInput.blur();
			await expect(page.getByText(invalidEmailMsg)).not.toBeVisible();
		});
	});
}
