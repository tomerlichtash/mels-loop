import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import {
	getFolderStaticProps,
	getNestedStaticPaths,
	populateDynamicPath
} from 'lib/next-utils';
import GenericPage from 'components/GenericPage';
import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';
import { createPopoverLinksNodeProcessor } from 'lib/next-utils/processors/createPopoverLinksNodeProcessor';
import type { IPageProps } from 'types';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	const paths = await getNestedStaticPaths({
		contentFolder: __filename,
		locales: context.locales
	});

	return paths;
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
	const params = context.params || {};

	const relativePath = await populateDynamicPath(
		__filename,
		params as { [key: string]: string }
	);

	return getFolderStaticProps(relativePath, context.locale, LoadFolderModes.Folder, {
		contentMode: LoadContentModes.Full,
		nodeProcessors: [createPopoverLinksNodeProcessor()]
	});
};
