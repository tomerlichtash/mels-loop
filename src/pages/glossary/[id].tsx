import Layout from "../../components/layout";
import { getAllTermIds, getTermData } from "../../lib/glossary";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Term({
  termData,
}: {
  termData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{termData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{termData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={termData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: termData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTermIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const termData = await getTermData(params.id as string);
  return {
    props: {
      termData,
    },
  };
};
