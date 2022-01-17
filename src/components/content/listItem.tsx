import { IContentComponentInitData } from '../../interfaces/models';
import ContentIterator from './contentIterator';
import React from 'react';

export const ListItem = (props: { data: IContentComponentInitData }): JSX.Element => {
	return (
		<li>
			<ContentIterator data={(
				{
					...props.data
				})
			} />
		</li>
	);
};

export default ListItem;
