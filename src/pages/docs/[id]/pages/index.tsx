import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import {
	getFolderStaticProps,
	getNestedStaticPaths,
	populateDynamicPath
} from 'lib/next-utils';
import { createPopoverLinksNodeProcessor } from 'lib/next-utils/processors/createPopoverLinksNodeProcessor';
import GenericPage from 'components/GenericPage';
import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';
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
	const relativePath = await populateDynamicPath(
		__filename,
		context.params as { [key: string]: string }
	);

	return getFolderStaticProps(
		relativePath, //`${CONTENT_TYPES.DOCS}/${context.params.id as string}/resources`,
		context.locale,
		LoadFolderModes.Folder,
		{
			contentMode: LoadContentModes.Full,
			nodeProcessors: [createPopoverLinksNodeProcessor()]
		}
	);
};
