import ContentCompoent from './contentComponent';
import { IContentComponentInitData, IMLParsedNode } from '../../interfaces/models';

export const List = (props: { data: IContentComponentInitData, ordered: boolean}): JSX.Element => {
	const p = props.data.data;
	const elements: IMLParsedNode[] = Array.isArray(p.children) ?  p.children : []
	return (
		props.ordered ? 
			<ol> {
				elements.map(node => {
					return <ContentCompoent key={node.key} data={(
						{
							data: node,
							locale: props.data.locale
						}
					)}/>
				})
			}
			</ol>
			: <ul> {
				elements.map(node => {
					return <ContentCompoent key={node.key} data={(
						{
							data: node,
							locale: props.data.locale
						}
					)}/>
				})
			}
			</ul>
	);
};

export default List;
