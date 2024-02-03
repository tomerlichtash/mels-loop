import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { GenericPage } from 'lib/content';
import { mlNextUtils } from 'lib/next-utils';
import { CONTENT_TYPES } from 'consts';
import { IPageProps } from 'types/models';
import { LoadFolderModes } from 'types/parser';

export default function Doc(props: IPageProps) {
	return <GenericPage pageProps={props} />;
}

export const getStaticPaths: GetStaticPaths = async (context) => {
	return mlNextUtils.getFolderStaticPaths(
		CONTENT_TYPES.CONTACT,
		context.locales
	);
};

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	return mlNextUtils.getFolderStaticProps(
		`${CONTENT_TYPES.CONTACT}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.FOLDER
	);
};
