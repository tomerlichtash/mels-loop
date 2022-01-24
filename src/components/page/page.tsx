export type ILocale = "en" | "he";
import { ComponentProps } from "../../interfaces/models";
import { style, classes } from "./page.st.css";

export interface PageProps extends ComponentProps {
	nodes: React.ReactNode;
}

export const Page = (props: PageProps): JSX.Element => {
	const { nodes, className } = props;
	return <main className={style(classes.root, className)}>{nodes}</main>;
};

export default Page;
