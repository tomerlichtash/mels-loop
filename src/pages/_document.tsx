import Document, { Html, Head, Main, NextScript } from "next/document";

import { classes as LightTheme } from "../theme/light/style.st.css";
// import { classes as DarkTheme } from "../theme/dark/style.st.css";
// import Cookies from "js-cookie";

// const storedTheme = Cookies.get("theme");

const themes = {
	light: [LightTheme.root],
	// dark: [DarkTheme.root],
	// base: [],
};

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="preload"
						href="/assets/fonts/roboto-slab/RobotoSlab-Regular.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/assets/fonts/roboto-slab/RobotoSlab-Medium.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/assets/fonts/roboto-slab/RobotoSlab-SemiBold.woff2"
						as="font"
						type="font/woff2"
					/>
					<link
						rel="preload"
						href="/assets/fonts/roboto-slab/RobotoSlab-Bold.woff2"
						as="font"
						type="font/woff2"
					/>
					{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700&family=Roboto+Slab:wght@400;500;600;700&display=swap"
						rel="stylesheet"
						crossOrigin="anonymous"
					/> */}
				</Head>
				<body className={themes.light[0]}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
