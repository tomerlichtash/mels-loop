// import Link from 'next/link';
export type ILocale = 'en-US' | 'he-IL';
import { classes } from './page.st.css'

export const Page = ({ nodes }: { nodes: React.ReactNode }): JSX.Element => {
  return (
    <main className={classes.root}>
      {nodes}
    </main>
  );
};

export default Page;
