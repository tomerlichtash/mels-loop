import Head from "next/head";
import Layout from "../components/layout";
import { GetStaticProps } from "next";
import { ComponentProps } from "../interfaces/models";
import { classes } from "./404.st.css";

export default function Custom404(props: ComponentProps) {
	// const { locale } = useRouter();
	const { translate, locale } = props;
	return (
		<Layout locale={locale} translate={translate}>
			<Head>
				<title>
					{translate("ERROR_FILE_NOT_FOUND")} - $
					{translate("ERROR_404_FILE_NOT_FOUND")}
				</title>
			</Head>
			<div className={classes.root}>
				<h1>404 - Page Not Found</h1>
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			locale,
		},
	};
};
