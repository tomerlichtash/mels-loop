import { render } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import PageProvider from 'lib/dynamic-content-utils/context/pageContext';
import I18nProvider from 'next-translate/I18nProvider';
import commonEN from '../locales/en/common.json';
import localeEN from '../locales/en/locale.json';
import navEN from '../locales/en/nav.json';
import authorsEN from '../locales/en/authors.json';
import { NextPage } from 'next';
import { IPageProps } from 'types/models';

const locale = 'en';
const translateEN = {
	common: commonEN,
	nav: navEN,
	locale: localeEN,
	authors: authorsEN,
};

const Providers = ({ children: Component, ...props }) => (
	<I18nProvider lang={locale} namespaces={translateEN}>
		<ThemeProvider
			defaultTheme="light"
			storageKey="ml-theme"
			attribute="data-ml-theme"
		>
			<PageProvider documentPath={props.pageProps.documentPath}>
				<Component {...props} />
			</PageProvider>
		</ThemeProvider>
	</I18nProvider>
);

const customRender = (
	ui: React.ReactNode | NextPage<IPageProps>,
	options = {}
) =>
	render(ui as React.ReactNode, {
		wrapper: ({ children, ...wrapperProps }) => {
			return (
				<Providers {...wrapperProps} {...options}>
					{children}
				</Providers>
			);
		},
		...options,
	});

export * from '@testing-library/react';

export { customRender as render };
