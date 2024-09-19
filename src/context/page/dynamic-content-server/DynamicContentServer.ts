import type { DynamicContentTypes, IDynamicContentServer } from '../../types';
import type { IParsedPage } from 'lib/types/models';
import type { IDynamicContentRequest } from './types';

interface LocalizedContentMap {
	[id: string]: IParsedPage;
}

interface ContentMap {
	[locale: string]: LocalizedContentMap;
}

const normalizeId = (id: string) => (id || '').trim().toLowerCase();

export class DynamicContentServer implements IDynamicContentServer {
	private readonly contentMap: {
		[type: string]: ContentMap;
	};

	constructor() {
		this.contentMap = {};
	}

	public async getItems({
		type,
		locale,
		ids,
		document
	}: IDynamicContentRequest): Promise<IParsedPage[]> {
		if (!type) {
			// covers None, which is ""
			return [];
		}
		const map = await this.ensureMap(type, locale, document);
		return ids.map((id) => map[normalizeId(id)]);
	}

	private async ensureMap(
		type: DynamicContentTypes,
		locale: string,
		docPath?: string
	): Promise<LocalizedContentMap> {
		const itemsMap = this.contentMap[type],
			localizedMap = itemsMap && itemsMap[locale];

		if (localizedMap) {
			return localizedMap;
		}

		try {
			const path = this.dynamicContentTypeToURL(type);
			// const path: DynamicContentTypes = type;
			const docParam = (docPath && `&document=${encodeURIComponent(docPath)}`) || '';
			const url = `/api/content?type=${path}&locale=${locale}${docParam}`;
			const response = await fetch(url, {
				method: 'GET'
			});
			const responseData = await response.json();
			const data = responseData?.data;

			if (!data || data.locale !== locale) {
				// TODO replace with logger call
				console.warn(`null or wrong data for ${type}, ${locale}`, data);
				return {};
			}

			this.contentMap[type] = this.contentMap[type] || {};

			return (this.contentMap[type][locale] = data.items || {});
		} catch (e) {
			console.error(`Error fetching data for ${type}, ${locale}\n${String(e)}`);
			return {};
		}
	}

	private dynamicContentTypeToURL(type: DynamicContentTypes): string {
		return String(type);
	}
}
