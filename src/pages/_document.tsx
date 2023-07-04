import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";
import { fontFaceLinks } from "../site-fonts";
import { MLConfig, addConfigScript } from "../config";
import type { Themes } from "../config/themes";

type CustomDocumentProps = DocumentInitialProps & {
	mlConfig: MLConfig;
};

class CustomDocument extends Document<CustomDocumentProps> {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<CustomDocumentProps> {
		const mlConfig = new MLConfig({ theme: "light" });
		const props = await Document.getInitialProps(ctx);
		// const { cookies } = ctx.req;
		// cookies &&
		// 	cookies["theme"] &&
		// 	mlConfig.setTheme((cookies["theme"] || "light") as Themes);
		return { ...props, mlConfig };
	}

	render() {
		const { mlConfig } = this.props;
		return (
			<Html>
				<Head>{fontFaceLinks}</Head>
				<body>
					<div data-theme className={mlConfig.getThemeClassName()}>
						<Main />
						<NextScript />
						{addConfigScript(mlConfig.getConfig())}
					</div>
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
