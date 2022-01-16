import { IContentComponentInitData, IMLParsedNode } from '../../interfaces/models';
import ContentIterator from './contentIterator';

export const Link = (props: { data: IContentComponentInitData }): JSX.Element => {
	const p = props.data.data;
	return (
			<a href={p.target} target="_blank"> 
				<ContentIterator data={props.data} />
			</a>
	);
};

export default Link;
