import type { NextPage } from 'next'
import { useRouter } from "next/router";
import Layout from '../components/layout/layout';
import { style, classes } from "./index.st.css";

const Home: NextPage = () => {
  const { locale } = useRouter();
  return (
    <Layout isHome>
      <div className={style(classes.root, { locale })}>
        test home app
      </div>
    </Layout>
  )
};

export default Home
