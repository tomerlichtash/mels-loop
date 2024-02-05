import React from 'react';
import css from 'styled-jsx/css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { fontFaceDecls } from '../site-fonts';
import { IPageProps } from 'types/models';
import { LocaleContextProvider } from '../locale/context/locale-context';
import { PageContextProvider } from '../context/pageContext';
import { ThemeProvider } from 'next-themes';
import 'normalize.css/normalize.css';
import 'styles/app.scss';

const App = ({ Component, pageProps }: AppProps<IPageProps>) => {
	const router = useRouter();
	const fontStyles = css`
		${fontFaceDecls}
	`;
	return (
		<LocaleContextProvider router={router}>
			<PageContextProvider documentPath={pageProps.documentPath}>
				<ThemeProvider
					defaultTheme="light"
					storageKey="ml-theme"
					attribute="data-ml-theme"
				>
					<style jsx global>
						{fontStyles}
					</style>
					<Component {...pageProps} />
				</ThemeProvider>
			</PageContextProvider>
		</LocaleContextProvider>
	);
};

export default App;
