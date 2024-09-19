import { render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import I18nProvider from 'next-translate/I18nProvider';
import PageProvider from 'context/page/PageProvider';
import commonEN from '../locales/en/common.json';
import localeEN from '../locales/en/locale.json';
import navEN from '../locales/en/nav.json';
import pagesEN from '../locales/en/pages.json';
import authorsEN from '../locales/en/authors.json';
import { NextPage } from 'next';
import { THEME_NAMESPACE } from 'theme/consts';
import type { IPageProps } from 'types';

const locale = 'en';
const translateEN = {
	common: commonEN,
	nav: navEN,
	pages: pagesEN,
	locale: localeEN,
	authors: authorsEN
};

const Providers = ({ children: Component, ...props }) => (
	<I18nProvider
		lang={locale}
		namespaces={translateEN}
	>
		<ThemeProvider
			defaultTheme="light"
			storageKey="ml-theme"
			attribute={THEME_NAMESPACE}
		>
			<PageProvider documentPath={props.pageProps.documentPath}>
				<Component {...props} />
			</PageProvider>
		</ThemeProvider>
	</I18nProvider>
);

const customRender = (ui: React.ReactNode | NextPage<IPageProps>, options = {}) =>
	render(ui as React.ReactNode, {
		wrapper: ({ children, ...wrapperProps }) => {
			return (
				<Providers
					{...wrapperProps}
					{...options}
				>
					{children}
				</Providers>
			);
		},
		...options
	});

export * from '@testing-library/react';

export { customRender as render };
