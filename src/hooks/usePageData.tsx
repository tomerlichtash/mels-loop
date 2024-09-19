import { useEffect, useState } from 'react';
import type { IParsedPage } from 'lib/types/models';

export interface IComponentContentData {
	content: string | object | null;
	metaData?: string | object | null;
}

export interface IParsedComponentData {
	pageData: IParsedPage[];
	metaData: IParsedPage[];
}

const getParsedPagedData = (pageData: string | object | null): IParsedPage[] => {
	if (!pageData) {
		return [];
	}
	const parsedData = typeof pageData === 'string' ? JSON.parse(pageData) : pageData;

	return Array.isArray(parsedData) ? parsedData : [];
};

/**
 * Returns an object with (possibly cached) parsed page data and parsed metaData (embedded in pages)
 *
 * Guaranteed not null
 * @param props
 * @returns
 */
export const usePageData = (props: IComponentContentData): IParsedComponentData => {
	const [pageData, setPageData] = useState<IParsedPage[]>(getParsedPagedData(props.content));

	const [metaData, setMetaData] = useState<IParsedPage[]>(getParsedPagedData(props.metaData));

	// If the props changed, due to locale change, reparse the content
	useEffect(() => {
		setPageData(getParsedPagedData(props.content));
		setMetaData(getParsedPagedData(props.metaData));
	}, [props]);

	return {
		pageData,
		metaData
	};
};

export default usePageData;
