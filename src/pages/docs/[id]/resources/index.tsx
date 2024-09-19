// import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
// import { mlNextUtils } from 'lib/next-utils/nextUtils';
// import { createPopoverLinksNodeProcessor } from 'lib/markdown-utils/next-utils/processors/createPopoverLinksNodeProcessor';
import GenericPage from 'components/GenericPage';
// import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';
import type { IPageProps } from 'types';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

// export const getStaticPaths: GetStaticPaths = async (context) => {
// 	const paths = await mlNextUtils.getNestedStaticPaths({
// 		contentFolder: __filename,
// 		locales: context.locales
// 	});

// 	return paths;
// };

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
// 	const relativePath = await mlNextUtils.populateDynamicPath(
// 		__filename,
// 		context.params as { [key: string]: string }
// 	);

// 	return mlNextUtils.getFolderStaticProps(
// 		relativePath, //`${CONTENT_TYPES.DOCS}/${context.params.id as string}/resources`,
// 		context.locale,
// 		LoadFolderModes.Folder,
// 		{
// 			contentMode: LoadContentModes.Full,
// 			nodeProcessors: [createPopoverLinksNodeProcessor()]
// 		}
// 	);
// };
