import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { getFolderStaticPaths, getFolderStaticProps } from 'lib/next-utils';
import { ContentTypes, type IPageProps } from 'types';
import { createPopoverLinksNodeProcessor } from 'lib/next-utils/processors/createPopoverLinksNodeProcessor';
import GenericPage from 'components/GenericPage';
import { LoadContentModes, LoadFolderModes } from 'lib/types/modes';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) =>
	getFolderStaticPaths(ContentTypes.Docs, context.locales);

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) =>
	getFolderStaticProps(
		`${ContentTypes.Docs}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder,
		{
			contentMode: LoadContentModes.Full,
			nodeProcessors: [createPopoverLinksNodeProcessor()]
		}
	);
