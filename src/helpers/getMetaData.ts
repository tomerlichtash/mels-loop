import { IParsedPage } from 'lib/types/models';

export const getMetadata = (keys: string[], pageData: IParsedPage[]) => {
	// const { metaData } = pageData[0];
	return keys.map((k: string) => pageData?.[0]?.metaData?.[k]);
};
