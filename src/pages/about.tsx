import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import useTranslation from 'next-translate/useTranslation';
// import { useRouter } from 'next/router';
// import { getSortedPostsData } from '../lib/content-drivers/posts';
// import Link from 'next/link';
// import Date from '../components/date';
// import { GetStaticProps } from 'next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <Layout home>
      <Head>
        <title>{siteTitle} - About</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1>{t('about:title')}</h1>
        About this site
      </section>
    </Layout>
  );
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   const allPostsData = getSortedPostsData(locale);
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// };
