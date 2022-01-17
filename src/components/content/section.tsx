// import homeStyles from '../../styles/home.module.scss';
import ContentComponent from './contentComponent';
import { IContentComponentInitData, IMLParsedNode } from '../../interfaces/models';

export const Section = (props: { data: IContentComponentInitData}): JSX.Element => {
	const p = props.data.data;
	const elements: IMLParsedNode[]  = Array.isArray(p.children) ? p.children : [];
	
	return (
		<section className={'verse'} key={p.key}>
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
		</section>
	);
};

export default Section;
