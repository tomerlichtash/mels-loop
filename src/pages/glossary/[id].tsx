import Layout from '../../components/layout';
import { getAllTermIds, getTermData } from '../../lib/glossary';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';

export default function Term({
  termData,
}: {
  termData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  const { locale } = useRouter();
  return (
    <Layout>
      <Head>
        <title>{termData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{termData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={termData.date} locale={locale} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: termData.contentHtml }} />
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
    },
  };
};
