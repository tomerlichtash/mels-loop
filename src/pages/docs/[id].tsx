import Layout from "../../components/layout";
import { getAllDocIds, getDocData } from "../../lib/docs";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Doc({
  docData,
}: {
  docData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{docData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{docData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={docData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllDocIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const docData = await getDocData(params.id as string);
  return {
    props: {
      docData,
    },
  };
};
