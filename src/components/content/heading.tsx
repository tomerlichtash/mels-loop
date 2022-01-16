import { IContentComponentInitData } from '../../interfaces/models';
import ContentIterator from './contentIterator';

export const Heading = (props: { data: IContentComponentInitData}): JSX.Element => {
	const data = props.data,
		p = data.data,
		level = p.level || 1;
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;
		return (
			<Tag className={data.style || ""} key={p.key}>
				{
					<ContentIterator data={data} />
				}
			</Tag>)
	}


export default Heading;
