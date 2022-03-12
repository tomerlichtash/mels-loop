import React, { useContext } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import IconComp from "./../assets/svg/source_icons_computer.svg";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { cloudName } from "../config/cloudinary/config";
import { ReactLayoutContext } from "../contexts/layout-context";
import { style, classes } from "./index.st.css";
import { ReactPageContext } from "../components/page/page-context";
import { DynamicContentTypes } from "../interfaces/dynamic-content";
import { IParsedPageData } from "../interfaces/models";


export default function Home() {
	const layoutContext = useContext(ReactLayoutContext);
	const { translate, compLocale } = layoutContext;
	const { siteTitle, pageName } = compLocale;
	const pageContext = useContext(ReactPageContext);

	const testIt = () => {
		pageContext.dynamicContentServer
		.getItems(DynamicContentTypes.Annotation, "en", ["fortran"])
		.then((items: IParsedPageData[]) => {
			console.log(items);
		})
		.catch(e => {
			console.warn(e);
		});
	}
	
	return (
		<Layout>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={style(classes.root)}>
				<IconComp />
				<CloudinaryContext cloudName={cloudName}>
					<Image publicId={"cld-sample" as string}>
						<Transformation width="570" crop="scale" />
					</Image>
				</CloudinaryContext>
				<div>the story</div>
				<div>
					<Link href="/glossary">glossary</Link>
				</div>
				<div>
					<h2>Bios</h2>
					<div>about ed nather</div>
					<div>about mel kaye</div>
					<button onClick={testIt}>Test</button>
				</div>
			</article>
		</Layout>
	);
}
