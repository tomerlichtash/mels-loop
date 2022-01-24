import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IPageProps } from "../../interfaces/models";
import GenericPage from "../../components/content/generic-page";
import { CONTENT_TYPES } from "../../consts";
import { mlNextUtils } from "../../lib/next-utils";

export default function Doc(props: IPageProps) {
	return <GenericPage translate={props.translate} data={props} />;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.DOCS, ctx);
};

export const getStaticProps: GetStaticProps = async (
	ctx: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.DOCS}/${ctx.params.id as string}`,
		ctx,
		"folder"
	);
};
