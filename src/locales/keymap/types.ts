import { ILanguageKeys } from "../languages/types/locale";

export interface IComponentKeyProps {
	siteTitle: "siteTitle";
	siteSubtitle: "siteSubtitle";
	siteLicense: "siteLicense";
	pageName: "pageName";
	postsList: "postsList";
}

export type ComponentKeyMap = Partial<
	Record<keyof IComponentKeyProps, keyof ILanguageKeys>
>;
