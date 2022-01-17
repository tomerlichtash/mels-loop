import { classes } from './404.st.css';
import Layout from '../components/layout';

export default function Custom404() {
  return <Layout>
    <div className={classes.root}>
      <h1>404 - Page Not Found</h1>
    </div>
  </Layout>
}
