import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";
import { fontFaceLinks } from "../site-fonts";
import { setTheme, addConfigScript, getThemeId } from "../config";
import type { Themes } from "../config/themes";

class CustomDocument extends Document<DocumentInitialProps> {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const props = await Document.getInitialProps(ctx);
		// @ts-expect-error Weird NextJS issue doesn't declare `cookies` in request
		const { cookies } = ctx.req;
		setTheme((cookies && (cookies["theme"] as Themes)) || "light");
		return { ...props };
	}

	render() {
		return (
			<Html>
				<Head>{fontFaceLinks}</Head>
				<body>
					<div data-theme className={getThemeId()}>
						<Main />
						<NextScript />
						{addConfigScript()}
					</div>
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
