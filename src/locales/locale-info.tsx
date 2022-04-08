import type { IconProps } from "@radix-ui/react-icons/dist/types.d";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export type TextDirection = "rtl" | "ltr";
export type Direction = "right" | "left";
export interface ILocaleInfo {
	readonly direction: TextDirection;
	readonly right: Direction;
	readonly left: Direction;
	readonly arrowLeft: (props: Partial<IconProps>) => JSX.Element;
	readonly arrowRight: (props: Partial<IconProps>) => JSX.Element;
}

const arrowRight = (props: Partial<IconProps>) => <ArrowRightIcon {...props} />;
const arrowLeft = (props: Partial<IconProps>) => <ArrowLeftIcon {...props} />;

export const HE_LOCALE_INFO: ILocaleInfo = {
	direction: "rtl",
	right: "left",
	left: "right",
	arrowLeft,
	arrowRight,
};

export const EN_LOCALE_INFO: ILocaleInfo = {
	direction: "ltr",
	right: "right",
	left: "left",
	arrowLeft,
	arrowRight,
};

export const LOCALE_INFO = {
	en: EN_LOCALE_INFO,
	he: HE_LOCALE_INFO,
};

export const getLocaleInfo = (localeId: string) => LOCALE_INFO[localeId];