import { GetStaticPropsContext } from 'next';
import { getFolderStaticProps } from '../functions/getFolderStaticProps';
import { LoadFolderModes } from '../../types/modes';

export const mlFolderStaticProps = (id: string) => async (context: GetStaticPropsContext) =>
	getFolderStaticProps(
		`${id}/${context.params.id as string}`,
		context.locale,
		LoadFolderModes.Folder
	);
