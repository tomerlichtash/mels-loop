import ContentCompoent from './contentComponent';
import { IContentComponentInitData, IMLParsedNode } from '../../interfaces/models';

export const Link = (props: { data: IContentComponentInitData }): JSX.Element => {
	const p = props.data.data;
	const elements: IMLParsedNode[] = Array.isArray(p.children) ?  p.children : []
	return (
			<a> {
				elements.map(node => {
					return <ContentCompoent key={node.key} data={(
						{
							data: node,
							locale: props.data.locale
						}
					)}/>
				})
			}
			</a>
	);
};

export default Link;
