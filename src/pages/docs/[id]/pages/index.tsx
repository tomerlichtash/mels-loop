import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { GenericPage } from 'lib/dynamic-content';
import { mlNextUtils } from 'lib/next-utils/nextUtils';
import { contentUtils } from 'lib/content-utils/contentUtils';
import { LoadContentModes, LoadFolderModes } from 'types/parser';
import { IPageProps } from 'types/models';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	const paths = await mlNextUtils.getNestedStaticPaths({
		contentFolder: __filename,
		locales: context.locales,
	});

	return paths;
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const relativePath = await mlNextUtils.populateDynamicPath(
		__filename,
		context.params as { [key: string]: string }
	);

	return mlNextUtils.getFolderStaticProps(
		relativePath, //`${CONTENT_TYPES.DOCS}/${context.params.id as string}/resources`,
		context.locale,
		LoadFolderModes.Folder,
		{
			contentMode: LoadContentModes.Full,
			nodeProcessors: [contentUtils.createPopoverLinksMappingFilter()],
		}
	);
};
