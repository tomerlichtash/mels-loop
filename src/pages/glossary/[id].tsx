import Layout from "../../components/layout";
import { getAllTermIds, getTermData } from "../../lib/content-drivers/glossary";
import Head from "next/head";
import Date from "../../components/date";
import { ComponentProps, ITermProps } from "../../interfaces/models";
import { GetStaticProps, GetStaticPaths } from "next";

export interface GlossaryProps extends ComponentProps {
	termData: ITermProps;
}

export default function Term(props: GlossaryProps) {
	const { translate, locale, termData } = props;
	const { title, date, contentHtml } = termData;
	return (
		<Layout {...{ locale, translate }}>
			<Head>
				<title>{title}</title>
			</Head>
			<article>
				<h1>{title}</h1>
				<div>
					<Date dateString={date} locale={locale} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
			</article>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const paths = getAllTermIds(locales);
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const termData = await getTermData(params.id as string, locale);
	return {
		props: {
			termData,
			locale,
		},
	};
};
