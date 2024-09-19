import React from 'react';
import Head from 'next/head';
import { useLocale } from 'hooks/useLocale';
import { SITE_SUBTITLE, SITE_TITLE } from 'consts';

const CustomHead = () => {
	const { t } = useLocale();

	const siteTitle = t(SITE_TITLE);
	const siteSubtitle = t(SITE_SUBTITLE);
	const title = `${siteTitle} – ${siteSubtitle}`;

	return (
		<Head>
			<link
				rel="icon"
				type="image/png"
				href="/favicon-dark.png"
				media="(prefers-color-scheme: light)"
			/>
			<link
				rel="icon"
				type="image/png"
				href="/favicon-light.png"
				media="(prefers-color-scheme: dark)"
			/>
			<meta
				itemProp="name"
				content={siteTitle}
			/>
			<meta
				itemProp="description"
				content={siteSubtitle}
			/>
			<meta
				name="description"
				content={siteSubtitle}
			/>
			{/* <meta
				property="og:image"
				content={`https://og-image.vercel.app/${encodeURI(
					title
				)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
			/> */}
			<meta
				name="og:title"
				content={title}
			/>
			<meta
				name="twitter:card"
				content="summary_large_image"
			/>
		</Head>
	);
};

export default CustomHead;
