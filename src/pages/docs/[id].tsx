import { GetStaticProps, GetStaticPaths } from "next";
import { IContentComponentData, ILocaleMap } from "../../interfaces/models";
import GenericPage from "../../components/content/genericPage";
import { loadContentFolder } from "../../lib/markdown-driver";
import { CONTENT_TYPES } from "../../consts";

export default function Doc(data: IContentComponentData) {
	return (
		<GenericPage data={data} />
	);
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const paths: ILocaleMap[] = [];
	(locales || []).forEach((locale: string) => {
		const folderData = loadContentFolder({locale, relativePath: CONTENT_TYPES.DOCS, type: "children"});
		paths.push.apply(paths, folderData.ids);
	})
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const docData = loadContentFolder({relativePath: `${CONTENT_TYPES.DOCS}/${params.id}`, locale, type: "folder" });
	return {
		props: {
			content: JSON.stringify(docData.pages),
		},
	};
};
