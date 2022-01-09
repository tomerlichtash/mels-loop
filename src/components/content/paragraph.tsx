import homeStyles from '../../styles/home.module.scss';
import * as mdParser from "simple-markdown"
import ContentCompoent from './contentComponent';
import { IContentComponentInitData } from '../../interfaces/models';

export const Paragraph = (props: { data: IContentComponentInitData}): JSX.Element => {
	const p = props.data.data;
	
	return (
		<p key={p.key} className={homeStyles.paragraph} title={`Line ${p.line}`}>{p.text}</p>
	);
};

export default Paragraph;
