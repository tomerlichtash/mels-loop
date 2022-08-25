import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import GenericPage from "../../components/content/generic-page";
import { mlNextUtils } from "../../lib/next-utils";
import { LoadFolderModes } from "../../interfaces/parser";
import { useEffect, useState } from "react";

export default function TestDoc(props: IPageProps) {
	const [now, setNow] = useState<string>("");
	useEffect(() => {
		setNow((new Date()).toString().replace(/(GMT|\().*/, ""));
	}, []);

	return <>
		<span style={{
			position: "absolute", bottom: "10px", right: "50px", zIndex: 10,
			backgroundColor: "#333", color: "white", borderRadius: "5px", overflow: "hidden",
			padding: "3px", fontSize: "9pt", fontFamily: "monospace", opacity: "0.7"
		}}>
			Rendered: {
				now
			}
		</span>
		<GenericPage pageProps={props} />;
	</>
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths("tests", context.locales);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`tests/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
