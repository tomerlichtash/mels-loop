import Document, { Html, Head, Main, NextScript } from "next/document";
import { fontFaceLinks } from "../site-fonts";
import { classes as LightTheme } from "../theme/light/style.st.css";
import { classes as DarkTheme } from "../theme/dark/style.st.css";

const themes = {
	light: [LightTheme.root][0],
	dark: [DarkTheme.root][0],
	none: [][0],
};

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head>{fontFaceLinks}</Head>
				<body className={themes.light}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
