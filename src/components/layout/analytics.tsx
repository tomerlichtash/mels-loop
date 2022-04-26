import React from "react";
import Script from "next/script";

export default function Analytics() {
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
					gtag('config', 'G-XLWMW4QLVE');
        `}
			</Script>
		</>
	);
}
