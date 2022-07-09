import Document, { Html, Head, Main, NextScript } from "next/document";
import { classes as LightTheme } from "../theme/light/style.st.css";

const themes = {
	light: [LightTheme.root],
};

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* <link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap"
						rel="stylesheet"
					/> */}
					<link
						rel="preload"
						href="./assets/fonts/roboto-slab/RobotoSlab-Regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="./assets/fonts/roboto-slab/RobotoSlab-Medium.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="./assets/fonts/roboto-slab/RobotoSlab-SemiBold.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="./assets/fonts/roboto-slab/RobotoSlab-Bold.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
				</Head>
				<body className={themes.light[0]} style={{ fontFamily: "Roboto Slab" }}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
