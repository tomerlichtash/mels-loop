import { default as CustomHead } from "next/head";
import { useMemo } from "react";

export const Head = ({ siteTitle, siteSubtitle, title, pageName }) => {
	const pageTitle = useMemo(
		() =>
			[siteTitle, siteSubtitle, title || pageName]
				.map((s) => s && s.trim())
				.filter(Boolean)
				.join(" - "),
		[siteTitle, siteSubtitle, title, pageName]
	);

	return (
		<CustomHead>
			<title>{pageTitle}</title>
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
			<meta itemProp="name" content={siteTitle} />
			<meta itemProp="description" content={siteSubtitle} />
			<meta name="description" content={siteSubtitle} />
			{/* <meta
					property="og:image"
					content={`https://og-image.vercel.app/${encodeURI(
						title
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/> */}
			<meta name="og:title" content={`${siteTitle} - ${siteSubtitle}`} />
			<meta name="twitter:card" content="summary_large_image" />
		</CustomHead>
	);
};
