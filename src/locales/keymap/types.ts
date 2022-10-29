export interface IComponentKeyProps {
	siteTitle: "siteTitle";
	siteSubtitle: "siteSubtitle";
	pageName: "pageName";
	sectionName: "sectionName";
}

export type ComponentKeyMap = Partial<
	Record<keyof IComponentKeyProps, string>
>;
