import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com"></link>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						// crossorigin
					></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;700&family=Nunito:wght@300;500;700&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body>
					<CloudinaryContext cloudName="dcajl1s6a">
						<Image className={"dada"} publicId={"cld-sample" as string}>
							<Transformation width="570" crop="scale" />
						</Image>
					</CloudinaryContext>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
