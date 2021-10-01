import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useRouter } from 'next/router';
import { getSortedPostsData } from '../lib/content-drivers/posts';
import { getSortedCodexData } from '../lib/content-drivers/codex';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import homeStyles from '../styles/home.module.scss';
import Browser from '../components/browser';

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
	  <Browser content={getBrowserContent({locale: 'en'})}/>
      <section className={homeStyles.main}>
        {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}> */}
        <h1>{t('common:greeting')}</h1>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} locale={locale} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getBrowserContent = ({ locale }) => {
	const content = getSortedCodexData(locale) as Array<any>;
	return {
		content,
	};
};


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allPostsData = getSortedPostsData(locale);
  return {
    props: {
      allPostsData,
    },
  };
};
