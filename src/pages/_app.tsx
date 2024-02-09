import React from 'react';
import css from 'styled-jsx/css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { LocaleProvider, PageProvider, ThemeProvider } from 'context';
import { languages } from 'locale';
import { fontFaceDecls } from '../siteFonts';
import 'normalize.css/normalize.css';
import 'styles/app.scss';
import type { IPageProps } from 'types/models';

const App = ({ Component, pageProps }: AppProps<IPageProps>) => {
	const router = useRouter();

	const fontStyles = css`
		${fontFaceDecls}
	`;

	return (
		<LocaleProvider router={router} langs={languages}>
			<ThemeProvider
				defaultTheme="light"
				storageKey="ml-theme"
				attribute="data-ml-theme"
			>
				<PageProvider documentPath={pageProps.documentPath}>
					<style jsx global>
						{fontStyles}
					</style>
					<Component {...pageProps} />
				</PageProvider>
			</ThemeProvider>
		</LocaleProvider>
	);
};

export default App;
