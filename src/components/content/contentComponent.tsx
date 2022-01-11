import homeStyles from '../../styles/home.module.scss';

import Link from "./link";
import { IContentComponentInitData, IMLParsedNode } from "../../interfaces/models";
import List from "./list";
import ListItem from "./listItem";
import Paragraph from "./paragraph";
import Section from "./section";


export const ContentCompoent = (props: { data: IContentComponentInitData }): JSX.Element => {
	const data = props.data;
	const node: IMLParsedNode = data.data;
	if (!node.key) {
		console.warn("missing key on", node);
	}
	switch (node.type) {
		case "paragraph":
			return <Section key={node.key} data={data} />
		case "text":
			return <Paragraph key={node.key} data={data} />
		case "list":
			return <List key={node.key} data={data} ordered={Boolean(node.ordered)} />
		case "list-item":
			return <ListItem key={node.key} data={data} />
		case "link":
			return <Link key={node.key} data={data} />
		case "codeBlock":
			return <code key={node.key}>{node.text}</code>
		default:
			return <div className={homeStyles.error} key={node.key}>Type {data.data.type} not found</div>
	}
}

export default ContentCompoent;

