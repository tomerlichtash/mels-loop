import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IContentComponentData } from "../../interfaces/models";
import GenericPage from "../../components/content/genericPage";
import { CONTENT_TYPES } from "../../consts";
import { mlNextUtils } from "../../lib/next-utils";

export default function Doc(data: IContentComponentData) {
	return (
		<GenericPage data={data} />
	);
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.DOCS, ctx);
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
	return mlNextUtils.getFolderStaticProps( `${CONTENT_TYPES.DOCS}/${ctx.params.id as string}`, ctx, "folder");
};
