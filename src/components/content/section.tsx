import homeStyles from '../../styles/home.module.scss';
import ContentCompoent from './contentComponent';
import * as mdParser from "simple-markdown"
import { IContentComponentInitData, IMLParsedNode, IParsedPageData } from '../../interfaces/models';

export const Section = (props: { data: IContentComponentInitData}): JSX.Element => {
	const p = props.data.data;
	const elements: IMLParsedNode[]  = Array.isArray(p.children) ? p.children : [];
	
	return (
		<section className={homeStyles.verse} key={p.key}>
			{
				elements.map(node => {
					return <ContentCompoent key={node.key} data={(
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
