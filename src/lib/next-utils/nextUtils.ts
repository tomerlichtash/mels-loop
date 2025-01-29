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
import { IFolderStaticProps } from 'types/folder';
import { LocaleId } from 'types/locale';
import type { IMLNextUtils, IStaticPathsParameters } from './types';
import { initYaspp } from '../app';

class MLNextUtils implements IMLNextUtils {
	/**
	 * Converts a path template, e.g. docs/[id] to docs/the-story-of-mel when `dict` has `{ id: "the-story-of-mel" }`
	 * @param path
	 * @param dict
	 * @returns
	 */
	public async populateDynamicPath(
		path: string,
		dict:  Record<string, string>
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

	public async getFolderStaticProps(
		folderPath: string,
		locale: LocaleId,
		loadMode: LoadFolderModes,
		mode?: Partial<IContentParseOptions>
	): Promise<GetStaticPropsResult<IFolderStaticProps>> {
		const app = await initYaspp();
		const docData = await loadContentFolder({
			relativePath: folderPath,
			loadMode,
			locale,
			mode,
			rootFolder: app.contentPath,
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

	public async getFolderStaticPaths(
		folderPath: string,
		locales: LocaleId[]
	): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
		const paths: ILocaleMap[] = [];
		const app = await initYaspp();
		for await (const locale of (locales || [])) {
			const folderData = await loadContentFolder({
				locale,
				relativePath: folderPath,
				loadMode: LoadFolderModes.Children,
				mode: {
					contentMode: LoadContentModes.None,
					parseMode: MLParseModes.NORMAL,
				},
				rootFolder: app.contentPath,
			});
			paths.push(...folderData.ids);
		}

		return {
			paths,
			fallback: false,
		};
	}

	public async getNestedStaticPaths(
		options: IStaticPathsParameters
	): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
		const app = await initYaspp();
		const paths: ILocaleMap[] = [];
		const allPaths = await collectPathsIn(app.contentPath, options.contentFolder);

		for (let rec of allPaths) {
			for (let locale of options.locales) {
				const folderData = await loadContentFolder({
					locale,
					relativePath: rec.path,
					loadMode: LoadFolderModes.Folder,
					mode: {
						contentMode: LoadContentModes.None,
						parseMode: MLParseModes.NORMAL,
					},
					rootFolder: app.contentPath
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
