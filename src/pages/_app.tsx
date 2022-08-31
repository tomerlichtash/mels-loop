import React from "react";
import css from "styled-jsx/css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AppContext } from "../contexts";
import { fontFaceDecls } from "../site-fonts";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const fontStyles = css`
		${fontFaceDecls}
	`;

	return (
		<AppContext router={router}>
			<style jsx global>
				{fontStyles}
			</style>
			<Component {...pageProps} />
		</AppContext>
	);
};

export default App;
