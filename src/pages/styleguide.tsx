import React from "react";
import Layout from "../components/site/Layout";
import { NextPage } from "next";
import { IPageProps } from "../interfaces/models";
import StyleGuideComponents from "./style-guide-components";

const StyleGuide: NextPage<IPageProps> = () => {
	return (
		<Layout>
			<StyleGuideComponents theme="light" />
			<StyleGuideComponents theme="dark" />
		</Layout>
	);
};

export default StyleGuide;
