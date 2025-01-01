import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { collectPathsIn, pathToRelativePath } from './pathHelpers';
import { loadContentFolder } from 'lib/loadFolderContent';
import { ILocaleMap } from 'types/models';
import type { IContentParseOptions } from 'types/parser/parser';
import {
	LoadContentModes,
	LoadFolderModes,
	MLParseModes,
} from 'types/parser/modes';
import { FolderStaticProps } from 'types/folder';
import { LocaleId } from 'types/locale';
import type { IMLNextUtils, IStaticPathsParameters } from './types';

class MLNextUtils implements IMLNextUtils {
	/**
	 * Converts a path template, e.g. docs/[id] to docs/the-story-of-mel when `dict` has `{ id: "the-story-of-mel" }`
	 * @param path
	 * @param dict
	 * @returns
	 */
	public async populateDynamicPath(
		path: string,
		dict: { [key: string]: string }
	): Promise<string> {
		let relative = await pathToRelativePath(path);

		if (!relative) {
			return '';
		}

		Object.entries(dict).forEach(([key, value]) => {
			const re = new RegExp(`\\[${key}\\]`, 'g');
			relative = relative.replace(re, value);
		});

		return relative;
	}

	public getFolderStaticProps(
		folderPath: string,
		locale: LocaleId,
		loadMode: LoadFolderModes,
		mode?: Partial<IContentParseOptions>
	): GetStaticPropsResult<FolderStaticProps> {
		const docData = loadContentFolder({
			relativePath: folderPath,
			loadMode,
			locale,
			mode,
		});

		const page = docData.pages[0];

		return {
			props: {
				// Stringify the result, instead of leaving the job to Next, because
				// Next's serializer is picky about objects, won't take class instances, Dates and more
				content: JSON.stringify(docData.pages),
				documentPath: (page && page.path) || '',
			},
		};
	}

	public getFolderStaticPaths(
		folderPath: string,
		locales: LocaleId[]
	): GetStaticPathsResult<ParsedUrlQuery> {
		const paths: ILocaleMap[] = [];

		(locales || []).forEach((locale) => {
			const folderData = loadContentFolder({
				locale,
				relativePath: folderPath,
				loadMode: LoadFolderModes.Children,
				mode: {
					contentMode: LoadContentModes.None,
					parseMode: MLParseModes.NORMAL,
				},
			});
			paths.push(...folderData.ids);
		});

		return {
			paths,
			fallback: false,
		};
	}

	public async getNestedStaticPaths(
		options: IStaticPathsParameters
	): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
		const paths: ILocaleMap[] = [];
		const allPaths = await collectPathsIn(options.contentFolder);

		for (let rec of allPaths) {
			for (let locale of options.locales) {
				const folderData = loadContentFolder({
					locale,
					relativePath: rec.path,
					loadMode: LoadFolderModes.Folder,
					mode: {
						contentMode: LoadContentModes.None,
						parseMode: MLParseModes.NORMAL,
					},
				});

				if (folderData.ids.length) {
					paths.push({
						params: rec.idMap,
						locale,
					});
				}
			}
		}

		return Promise.resolve({
			paths,
			fallback: false,
		});
	}
}

export const mlNextUtils: IMLNextUtils = new MLNextUtils();
