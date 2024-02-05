interface ICaptchaProps {
	onChange: (value: string) => void;
	setCaptchaError: (err: string) => void;
	onExpired: () => void;
	locale: string;
	theme: string;
	tabIndex: number;
	highlight: boolean;
	className?: string;
	siteKey?: string;
}

export type { ICaptchaProps };
