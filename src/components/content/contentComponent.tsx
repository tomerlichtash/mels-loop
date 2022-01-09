import Link from "./link";
import { IContentComponentInitData, IMLParsedNode } from "../../interfaces/models";
import List from "./list";
import ListItem from "./listItem";
import Paragraph from "./paragraph";
import Section from "./section";

export const ContentCompoent = (props: { data: IContentComponentInitData }): JSX.Element => {
	const data = props.data;
	const node: IMLParsedNode = data.data;
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
		default:
			return <div key={node.key}>Type {data.data.type} not found</div>
	}
}

export default ContentCompoent;

