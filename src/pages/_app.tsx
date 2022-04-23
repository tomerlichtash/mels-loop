import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AppContext } from "../contexts";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	return (
		<AppContext router={router}>
			<Component {...pageProps} />
		</AppContext>
	);
};

export default App;
