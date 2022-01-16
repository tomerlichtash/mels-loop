import homeStyles from '../../styles/home.module.scss';
import ContentComponent from './contentComponent';
import { IContentComponentInitData, IMLParsedNode } from '../../interfaces/models';

export const ContentIterator = (props: { data: IContentComponentInitData}): JSX.Element => {
	const data = props.data,
		p = data.data;
	const elements: IMLParsedNode[]  = Array.isArray(p.children) ? p.children : [];
	const Tag = data.tag as keyof JSX.IntrinsicElements;
	if (Tag) {
		return (
			<Tag className={data.style || ""} key={p.key}>
				{
					elements.map(node => {
						return <ContentComponent key={node.key} data={(
							{
								data: node,
								locale: props.data.locale
							}
						)}/>
					})
				}
			</Tag>)
	}
	else {
		return (
			<>
				{
					elements.map(node => {
						return <ContentComponent key={node.key} data={(
							{
								data: node,
								locale: props.data.locale
							}
						)}/>
					})
				}
			</>)
	}
};

export default ContentIterator;
