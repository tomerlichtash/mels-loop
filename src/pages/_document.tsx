import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";
import { fontFaceLinks } from "../site-fonts";
import { themes } from "../themes";

let theme = "";

class CustomDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const props = await Document.getInitialProps(ctx);
		// @ts-expect-error Unknown: Property 'req' does not exist on type 'DocumentContext'.
		theme = ctx.req.cookies.theme || themes[0];
		return { ...props };
	}
	render() {
		return (
			<Html>
				<Head>{fontFaceLinks}</Head>
				<body>
					<div data-theme={true} className={themes[theme][0]}>
						<Main />
						<NextScript />
					</div>
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
