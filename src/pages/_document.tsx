import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentInitialProps,
} from "next/document";
import { fontFaceLinks } from "../site-fonts";

class CustomDocument extends Document<DocumentInitialProps> {
	render() {
		return (
			<Html suppressHydrationWarning>
				<Head>{fontFaceLinks}</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
