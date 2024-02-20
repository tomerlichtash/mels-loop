import React from 'react';
import css from 'styled-jsx/css';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { PageProvider } from 'lib/dynamic-content-utils/context/pageContext';
import { fontFaceDecls } from '../siteFonts';
import 'normalize.css/normalize.css';
import 'styles/app.scss';
import type { IPageProps } from 'types/models';

const App = ({ Component, pageProps }: AppProps<IPageProps>) => {
	const fontStyles = css`
		${fontFaceDecls}
	`;

	return (
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
	);
};

export default App;
