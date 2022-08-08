import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";
import { fontFaceLinks } from "../site-fonts";
import { Themes, themes } from "../config/themes";
import { PUBLIC_ML_CONFIG } from "../consts";

let themeName: Themes = "light";
let themeSelector = "";

const setPublicConfig = (
	themeName: Themes = "light",
	themeSelector: string
) => {
	return `${PUBLIC_ML_CONFIG} = ${JSON.stringify({
		themeName,
		themeSelector,
	})}`;
};

class CustomDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const props = await Document.getInitialProps(ctx);
		// @ts-expect-error Weird NextJS issue doesn't declare `cookies` in request
		const { cookies } = ctx.req;
		themeName = (cookies && cookies["theme"]) || themeName;
		themeSelector = themes[themeName][0];
		return { ...props };
	}

	render() {
		return (
			<Html>
				<Head>{fontFaceLinks}</Head>
				<body>
					<div data-theme="" className={themeSelector}>
						<Main />
						<NextScript />
						<script
							dangerouslySetInnerHTML={{
								__html: setPublicConfig(themeName, themeSelector),
							}}
						/>
					</div>
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
