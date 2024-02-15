import React from 'react';
import Script from 'next/script';

export const Analytics = () => {
	const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

	return (
		<>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-XLWMW4QLVE"
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){window.dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${analyticsId}');
				`}
			</Script>
		</>
	);
};

// gtag('config', 'G-XLWMW4QLVE');
