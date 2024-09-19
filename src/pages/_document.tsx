import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document';
import { siteTheme } from 'theme/theme';

class CustomDocument extends Document<DocumentInitialProps> {
	render() {
		return (
			<Html>
				<Head />
				<body>
					{siteTheme}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
