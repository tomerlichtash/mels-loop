export type ILocale = "en" | "he";
import { classes } from "./page.st.css";

export interface PageProps {
	nodes: React.ReactNode;
}

export const Page = (props: PageProps): JSX.Element => {
	const { nodes } = props;
	return <main className={classes.root}>{nodes}</main>;
};

export default Page;
