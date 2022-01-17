import homeStyles from '../../styles/home.module.scss';
import { IContentComponentInitData } from '../../interfaces/models';
import ContentComponent from './contentComponent';

export const Paragraph = (props: { data: IContentComponentInitData }): JSX.Element => {
	const p = props.data.data;

	return (
		<p key={p.key} className={homeStyles.paragraph} title={`Line ${p.line}`}>
			{
				(p.children || []).map(node => {
					return <ContentComponent key={node.key} data={(
						{
							data: node,
							locale: props.data.locale
						}
					)} />
				})
			}

		</p>
	);
};

export default Paragraph;
