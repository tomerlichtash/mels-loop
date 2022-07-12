import Document, { Html, Head, Main, NextScript } from "next/document";
import { fontFacesLinks } from "../site-fonts";
import { classes as LightTheme } from "../theme/light/style.st.css";

const themes = {
	light: [LightTheme.root],
};

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>{fontFacesLinks}</Head>
				<body className={themes.light[0]}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
