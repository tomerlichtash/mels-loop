import { test, expect } from '@playwright/test';
import getT from 'next-translate/getT';
import { Translate } from 'next-translate';
import i18n from '../i18n';

global.i18nConfig = i18n;

test.describe('Locale', () => {
  let t: Translate;

  test.beforeEach(async () => {
    t = await getT('en', ['locale']);
  });

  test(`[en] should switch language to English`, async ({ page }) => {
    await page.goto('http://localhost:3000/he');
    await page.getByRole('radio', { name: t('locale:en:symbol') }).click();
    await expect(page).toHaveURL('http://localhost:3000');
    await expect(
      page.getByRole('heading', { name: 'The Story of Mel' })
    ).toBeInViewport();
  });

  test('[en] should not navigate to same language', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('radio', { name: t('locale:en:symbol') }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(
      page.getByRole('heading', { name: 'The Story of Mel' })
    ).toBeInViewport();
  });

  test('[he] should switch language to RTL', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('radio', { name: t('locale:he:symbol') }).click();
    await expect(page).toHaveURL('http://localhost:3000/he');
    await expect(
      page.getByRole('heading', { name: 'הסיפור על מל' })
    ).toBeInViewport();
  });

  test('[he] should not navigate to same language', async ({ page }) => {
    await page.goto('http://localhost:3000/he');
    await page.getByRole('radio', { name: t('locale:he:symbol') }).click();
    await expect(page).toHaveURL('http://localhost:3000/he');
    await page.pause();
    await expect(
      page.getByRole('heading', { name: 'הסיפור על מל' })
    ).toBeInViewport();
  });
});
