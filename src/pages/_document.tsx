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
