import Head from "next/head";
import Layout from "../components/layout";
import { IPageProps } from "../interfaces/models";
import IconComp from "./../assets/svg/source_icons_computer.svg";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import { cloudName } from "../config/cloudinary/config";
import Link from "next/link";
// import PopOver from "../components/popover";
import { style, classes } from "./index.st.css";
import * as Popover from "@radix-ui/react-popover";

export default function Home(props: IPageProps) {
	const { translate, compLocale } = props;
	const { siteTitle, pageName } = compLocale;
	return (
		<Layout {...{ translate }}>
			<Head>
				<title>
					{translate(siteTitle)} - {translate(pageName)}
				</title>
			</Head>
			<article className={style(classes.root)}>
				fdksjfk sdkf dsjkf dsjkf sdjkf dsjkf jdsk
				<Popover.Root>
					<Popover.Trigger className={classes.popOverTrigger}>
						dada
					</Popover.Trigger>
					<Popover.Content side="top" align="center">
						<div className={classes.popOverContent}>
							<h1>title</h1>
							<p>
								some text some text some text some text some text some text{" "}
							</p>
							<Popover.Close>Close</Popover.Close>
						</div>
						<Popover.Arrow />
					</Popover.Content>
				</Popover.Root>
				fdsjfksdjf sjkf dsjkf sjdkf jsdkf jdsk
				{/* <PopOver>
						<PopOver.Trigger>some text to pop</PopOver.Trigger>
						<PopOver.Popup>some text to pop</PopOver.Popup>
					</PopOver> */}
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
				<div>photos</div>
			</article>
		</Layout>
	);
}
