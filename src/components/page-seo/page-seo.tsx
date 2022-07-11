import Head from "next/head";
import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";

export interface IPageTitleProps {
	title?: string;
}

export const PageSEO = ({ title }: IPageTitleProps): JSX.Element => {
	const { siteTitle, siteSubtitle, pageName } = useContext(ReactLocaleContext);
	const pageTitle = `${siteTitle} - ${siteSubtitle} - ${title || pageName}`;
	return (
		<Head>
			<title>{pageTitle}</title>
		</Head>
	);
};

export default PageSEO;
