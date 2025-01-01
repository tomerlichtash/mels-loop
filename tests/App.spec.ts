import { expect, jest, test } from '@jest/globals';
import { render, screen, within } from './wrapper';
import getT from 'next-translate/getT';
import { Translate } from 'next-translate';
import Page from '../src/pages/about';
import mockAboutPageData from './mocks/pages/mockAboutPageData';
import mockContent from './mocks/mockContent';
import { watchMediaMock } from './mocks/watchMediaMock';

describe('App', () => {
	let t: Translate;
	let usePageDataMock;

	beforeEach(async () => {
		t = await getT('en', ['common', 'pages']);

		watchMediaMock();

		usePageDataMock = jest.fn().mockReturnValue({
			pageData: mockAboutPageData,
			metaData: [],
		});
	});

	afterEach(() => {
		usePageDataMock.mockRestore();
	});

	test('should render the app', async () => {
		render(Page, {
			pageProps: {
				documentPath: 'about/index.en.md',
			},
			content: JSON.stringify(mockContent),
		});

		const siteTitle = within(screen.getByTestId('topbar')).getByText(
			t('common:site:title')
		);

		expect(siteTitle).toBeTruthy();
		expect(siteTitle.textContent).toEqual(`Mel's Loop`);
	});
});
