import React from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { PageProvider } from 'context/page/PageProvider';
import { THEME_NAMESPACE } from 'theme/consts';
import localeFonts from '../theme/fonts';
import classNames from 'classnames';
import 'normalize.css/normalize.css';
import styles from './app.module.css';
import type { AppProps } from 'next/app';
import type { IPageProps } from 'types';

const App = ({ Component, pageProps }: AppProps<IPageProps>) => {
	const { locale } = useRouter();
	const { className: localeFontClassname } = localeFonts[locale];

	return (
		<div className={classNames(styles.root, localeFontClassname)}>
			<ThemeProvider
				defaultTheme="light"
				storageKey="ml-theme"
				attribute={THEME_NAMESPACE}
			>
				<PageProvider documentPath={pageProps.documentPath}>
					<Component {...pageProps} />
				</PageProvider>
			</ThemeProvider>
		</div>
	);
};

export default App;
