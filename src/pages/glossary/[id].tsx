import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { IContentComponentData } from "../../interfaces/models";
import { CONTENT_TYPES } from "../../consts";
import GenericPage from "../../components/content/generic-page";
import { mlNextUtils } from "../../lib/next-utils";

export default function Doc(props: IContentComponentData) {
	return <GenericPage translate={props.translate} data={props} />;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.GLOSSARY, ctx);
};

export const getStaticProps: GetStaticProps = async (
	ctx: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.GLOSSARY}/${ctx.params.id as string}`,
		ctx,
		"folder"
	);
};

// <<<<<<< HEAD
// import Layout from "../../components/layout";
// import { getAllTermIds, getTermData } from "../../lib/content-drivers/glossary";
// import Head from "next/head";
// import Date from "../../components/date";
// import { ComponentProps, ITermProps } from "../../interfaces/models";
// import { GetStaticProps, GetStaticPaths } from "next";

// export interface GlossaryProps extends ComponentProps {
// 	termData: ITermProps;
// }

// export default function Term(props: GlossaryProps) {
// 	const { translate, locale, termData } = props;
// 	const { title, date, contentHtml } = termData;
// 	return (
// 		<Layout {...{ locale, translate }}>
// 			<Head>
// 				<title>{title}</title>
// 			</Head>
// 			<article>
// 				<h1>{title}</h1>
// 				<div>
// 					<Date dateString={date} locale={locale} />
// 				</div>
// 				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
// 			</article>
// 		</Layout>
// =======
// import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
// import { IContentComponentData } from "../../interfaces/models";
// import { CONTENT_TYPES } from "../../consts";
// import GenericPage from "../../components/content/genericPage";
// import { mlNextUtils } from "../../lib/next-utils";

// export default function Glossary(data: IContentComponentData) {
// 	return (
// 		<GenericPage data={data} />
// >>>>>>> master
// 	);
// }

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
// 	return mlNextUtils.getFolderStaticPaths(CONTENT_TYPES.GLOSSARY, ctx);
// };

// <<<<<<< HEAD
// export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
// 	const termData = await getTermData(params.id as string, locale);
// 	return {
// 		props: {
// 			termData,
// 			locale,
// 		},
// 	};
// =======
// export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
// 	return mlNextUtils.getFolderStaticProps( `${CONTENT_TYPES.GLOSSARY}/${ctx.params.id as string}`, ctx, "folder");
// >>>>>>> master
// };
