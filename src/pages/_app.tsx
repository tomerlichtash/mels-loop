import { AppProps } from "next/app";
import { translate } from "../locales/translate";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { locale } = router;
	return <Component translate={translate(locale)} {...pageProps} />;
}

export default App;
