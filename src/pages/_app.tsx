import React from "react";
import css from "styled-jsx/css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AppContext } from "../contexts";
import { fontFaceDecls } from "../site-fonts";
import { IPageProps } from "../interfaces/models";

import "../styles/_app.scss";

export { reportWebVitals } from "next-axiom";

const App = ({ Component, pageProps }: AppProps<IPageProps>) => {
	const router = useRouter();
	const fontStyles = css`
		${fontFaceDecls}
	`;

	return (
		<AppContext router={router} documentPath={pageProps.documentPath}>
			<style jsx global>
				{fontStyles}
			</style>
			<Component {...pageProps} />
		</AppContext>
	);
};

export default App;
