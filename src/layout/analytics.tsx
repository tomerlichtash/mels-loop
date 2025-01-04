import React from 'react';
import Script from 'next/script';

export const Analytics = () => {
	const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
	const gtagId = process.env.NEXT_PUBLIC_GTAG_ID; // G-XLWMW4QLVE
	return (
		<>
			{gtagId && (
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
					strategy="afterInteractive"
				/>
			)}
			{analyticsId && (
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){window.dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${analyticsId}');
				`}
			</Script>)}
		</>
	);
};

// gtag('config', 'G-XLWMW4QLVE');
