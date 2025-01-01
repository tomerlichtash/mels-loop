// import { test, expect } from '@playwright/test';
// import * as LocaleSymbols from '../../src/locale/common/locales.json' assert { type: 'json' };
// import {
// 	getLocalePath,
// 	locales,
// 	getFrontMatter,
// 	translate,
// } from '../utils/test-utils';

// const { locale.en, locale.he } = LocaleSymbols;
// export const MOBILE_MENU_TRIGGER = `.bm-burger-button`;

// test.describe.skip('Mobile Menu', () => {
// 	test.describe('TopBar Navigation', () => {
// 		locales.map((locale) => {
// 			test(`[${locale}] should navigate to Homepage from Mobile Menu Site Name button`, async ({
// 				page,
// 			}) => {
// 				await page.goto(getLocalePath(locale, 'about'));
// 				await page.locator(MOBILE_MENU_TRIGGER).click();
// 				await page.locator(`.mobile-menu .site-title`).click();
// 				await expect(page).toHaveURL(getLocalePath(locale));
// 			});
// 		});
// 	});

// 	test.describe('Locale Selector', () => {
// 		// TODO: validate selected lang

// 		test('should switch language to LTR', async ({ page }) => {
// 			await page.goto('http://localhost:3000/he');
// 			await page.click(MOBILE_MENU_TRIGGER);
// 			await page
// 				.locator(`.localeSelector" [type="button"]`, {
// 					hasText: locale.en,
// 				})
// 				.click();
// 			await expect(page).toHaveURL('http://localhost:3000');
// 			await expect(page.locator('h1')).toHaveText('The Story of Mel');
// 		});

// 		test('[en] should not navigate to same language', async ({ page }) => {
// 			await page.goto('http://localhost:3000/');
// 			await page.click(MOBILE_MENU_TRIGGER);
// 			await page
// 				.locator(domUtil.scopeSelector('.localeSelector'), {
// 					hasText: locale.en,
// 				})
// 				.click();
// 			await expect(page).toHaveURL('http://localhost:3000/');
// 			await expect(page.locator('h1')).toHaveText('The Story of Mel');
// 		});

// 		test('should switch language to RTL', async ({ page }) => {
// 			await page.goto('http://localhost:3000/');
// 			await page.click(MOBILE_MENU_TRIGGER);
// 			await page
// 				.locator(`.mobile-menu .localeSelector [type="button"]`, {
// 					hasText: locale.he,
// 				})
// 				.click();
// 			await expect(page).toHaveURL('http://localhost:3000/he');
// 			await expect(page.locator('h1')).toHaveText('הסיפור על מל');
// 		});

// 		test('[he] should not navigate to same language', async ({ page }) => {
// 			await page.goto('http://localhost:3000/he');
// 			await page.click(MOBILE_MENU_TRIGGER);
// 			await page
// 				.locator(`.mobile-menu .localeSelector"`, {
// 					hasText: locale.he,
// 				})
// 				.click();
// 			await expect(page).toHaveURL('http://localhost:3000/he');
// 			await expect(page.locator('h1')).toHaveText('הסיפור על מל');
// 		});
// 	});

// 	test.describe('Static Pages', () => {
// 		locales.map((locale) => {
// 			test(`[${locale}] should navigate to Contact page`, async ({ page }) => {
// 				// const buttonTitle = translate(locale, "nav.items.pages.contact.label");
// 				const selector = `.menuItemButton:id(contact)`;

// 				await page.goto(getLocalePath(locale));
// 				await page.click(MOBILE_MENU_TRIGGER);

// 				await page.locator(selector).click();

// 				await expect(page).toHaveURL(getLocalePath(locale, 'contact'));
// 				// await expect(page.locator("h1")).toHaveText(buttonTitle);
// 			});

// 			test(`[${locale}] should navigate to Blog page`, async ({ page }) => {
// 				await page.goto(getLocalePath(locale));
// 				await page.click(MOBILE_MENU_TRIGGER);

// 				await page.click(`.mobile-menu .menuItemButton:id(blog)`);

// 				await expect(page).toHaveURL(getLocalePath(locale, 'posts'));
// 				await expect(page.locator('h1')).toHaveText(
// 					translate(locale, 'pages.blog.label')
// 				);
// 			});
// 		});
// 	});

// 	test.describe('Dynamic Pages', () => {
// 		locales.map((locale) => {
// 			test(`[${locale}] should navigate to the About page`, async ({
// 				page,
// 			}) => {
// 				const id = 'about';
// 				const filename = 'index';
// 				const { data } = getFrontMatter(
// 					'docs/the-story-of-mel',
// 					`${id}/${filename}`,
// 					locale
// 				);
// 				const localePath = getLocalePath(locale, id);

// 				await page.goto(localePath);
// 				await page.click(MOBILE_MENU_TRIGGER);

// 				await page.click(`.mobile-menu .menuItemButton:id(about-mobile)`);

// 				await expect(page).toHaveURL(localePath);
// 				await expect(page.locator('h1')).toHaveText(data.title as string);
// 			});

// 			// test(`[${locale}] should navigate to the Resources page`, async ({
// 			// 	page,
// 			// }) => {
// 			// 	const path = "docs/resources";
// 			// 	const filename = "index";
// 			// 	const { data } = getFrontMatter(
// 			// 		"docs/the-story-of-mel",
// 			// 		`${path}/${filename}`,
// 			// 		locale
// 			// 	);
// 			// 	const localePath = getLocalePath(locale);

// 			// 	await page.goto(localePath);
// 			// 	await page.click(MOBILE_MENU_TRIGGER);

// 			// 	await page.click(
// 			// 		domUtil.scopeSelector(`.menuItemButton:id(resources)`)
// 			// 	);

// 			// 	await expect(page).toHaveURL(getLocalePath(locale, path));
// 			// 	await expect(page.locator("h1")).toHaveText(data.title as string);
// 			// });
// 		});
// 	});
// });
