import React from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AppContext } from "../contexts";

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	return (
		<AppContext router={router}>
			<style jsx global>
				{`
					@font-face {
						font-family: "Roboto Slab";
						src: url("./assets/fonts/roboto-slab/RobotoSlab-Regular.woff2")
							format("woff2");
						font-style: normal;
						font-weight: 400;
						font-display: swap;
					}
					@font-face {
						font-family: "Roboto Slab";
						src: url("/assets/fonts/roboto-slab/RobotoSlab-Medium.woff2")
							format("woff2");
						font-style: normal;
						font-weight: 500;
						font-display: swap;
					}
					@font-face {
						font-family: "Roboto Slab";
						src: url("/assets/fonts/roboto-slab/RobotoSlab-Bold.woff2")
							format("woff2");
						font-style: normal;
						font-weight: 700;
						font-display: swap;
					}
				`}
			</style>
			<Component {...pageProps} />
		</AppContext>
	);
};

export default App;
