import ContentCompoent from './contentComponent';
import { IContentComponentInitData, IParsedNode } from '../../interfaces/models';

export const ListItem = (props: { data: IContentComponentInitData }): JSX.Element => {
	const p = props.data.data;
	const elements: IParsedNode[] = Array.isArray(p.children) ?  p.children : []
	return (
			<li> {
				elements.map(node => {
					return <ContentCompoent key={node.key} data={(
						{
							data: node,
							locale: props.data.locale
						}
					)}/>
				})
			}
			</li>
	);
};

export default ListItem;
