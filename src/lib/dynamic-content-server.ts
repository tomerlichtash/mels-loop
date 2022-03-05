import { DynamicContentTypes, IDynamicContentRecord, IDynamicContentServer } from "../interfaces/dynamic-content";
import { IParsedPageData } from "../interfaces/models";


interface LocalizedContentMap {
	[id: string]: IParsedPageData
}

interface ContentMap {
	[locale: string]: LocalizedContentMap
}

const normalizeId = (id: string) => (id || "").trim().toLowerCase();

const ANNOTATION_RE = /annotation\//i;
const GLOSSARY_RE = /glossary\//i;

const urlToContentType = (url: string) => {
	if (!url) {
		return null;
	}
	if (ANNOTATION_RE.test(url)) {
		return DynamicContentTypes.Annotation;
	}
	if (GLOSSARY_RE.test(url)) {
		return DynamicContentTypes.Glossary;
	}
	return null;
};

const urlToContentId = (url: string) => {
	if (!url) {
		return "";
	}
	const parts = url.split('/');
	const id = parts[parts.length - 1];
	return (id && id.replace('#', "")) || "";
};

export class DynamicContentServer implements IDynamicContentServer {
	private readonly contentMap: { [type: string]: ContentMap }

	constructor() {
		this.contentMap = {};
	}

	public urlToContentData(url: string, defaultType?: DynamicContentTypes): IDynamicContentRecord {
		const contentData = {
			type: urlToContentType(url) || defaultType,
			id: urlToContentId(url)
		}
		return contentData;
	}

	public async getItems(type: DynamicContentTypes, locale: string, ids: string[]): Promise<IParsedPageData[]> {
		const map = await this.ensureMap(type, locale);
		return ids
			.map(id => map[normalizeId(id)]);

	}

	private async ensureMap(type: DynamicContentTypes, locale: string): Promise<LocalizedContentMap> {
		const itemsMap = this.contentMap[type],
			localizedMap = itemsMap && itemsMap[locale];
		if (localizedMap) {
			return localizedMap;
		}
		try {
			const path = this.dynamicContentTypeToURL(type);
			const url = `/api/${path}?locale=${locale}`;
			const response = await fetch(url, {
				method: "GET"
			});
			const responseData = await response.json();
			const data = responseData?.data;
			if (!data || data.locale !== locale) {
				console.warn(`null or wrong data for ${type}, ${locale}`, data);
				return {};
			}
			this.contentMap[type] = this.contentMap[type] || {};
			return this.contentMap[type][locale] = data.items || {};
		}
		catch (e) {
			console.error(`Error fetching data for ${type}, ${locale}\n${e}`);
			return {};
		}
	}

	private dynamicContentTypeToURL(type: DynamicContentTypes): string {
		return String(type);
	}
}