import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document';
import { fontFaceLinks } from '../siteFonts';

class CustomDocument extends Document<DocumentInitialProps> {
	render() {
		return (
			<Html>
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
