import React from "react";
import {
	ContentComponentProps,
	IMLParsedNode,
	NODE_TYPES,
	NODE_LIST_TYPES,
} from "../../interfaces/models";
import { Link, Heading, ListItem, Paragraph, Section, Figure } from "./content-blocks";
import { ContentIterator } from "./content-iterator";
// import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
// import { cloudName } from "../../config/cloudinary/config";
import { classes } from "./content-component.st.css";

export const ContentComponent = (props: ContentComponentProps): JSX.Element => {
	const data = props.data;
	const node: IMLParsedNode = data.data;
	const { key, type } = node;

	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case NODE_TYPES.PARAGRAPH:
			return <Section key={key} data={data} />;
		case NODE_TYPES.LINE:
			return <Paragraph key={key} data={data} />;
		case NODE_TYPES.DEL:
		case NODE_TYPES.INS:
		case NODE_TYPES.STRONG:
		case NODE_TYPES.EM:
		case NODE_TYPES.CODE:
			return <ContentIterator key={key} data={{ tag: type, ...data }} />;
		case NODE_TYPES.BLOCKQUOTE:
			return (
				<ContentIterator
					key={key}
					data={{ tag: NODE_TYPES.BLOCKQUOTE, ...data }}
				/>
			);
		case NODE_TYPES.TEXT:
			const { text } = node;
			return <span key={key}>{text}</span>;
		case NODE_TYPES.LIST:
			const { ordered } = node;
			return (
				<ContentIterator
					key={key}
					data={{
						tag: ordered ? NODE_LIST_TYPES.ORDERED : NODE_LIST_TYPES.UNORDERED,
						...data,
					}}
				/>
			);
		case NODE_TYPES.LIST_ITEM:
			return <ListItem key={key} data={data} />;
		case NODE_TYPES.LINK:
			return <Link key={key} data={data} />;
		case NODE_TYPES.IMAGE:
			// const { target } = node;
			// const publicId = target.split("?")[0];
			// const imgParamsStr = target.split("?")[1];

			// let paramObj = JSON.parse(imgParamsStr);
			// let imgParams = {
			// 	width: 800,
			// 	height: 0,
			// 	title: publicId,
			// };

			// if (imgParamsStr) {
			// 	if (paramObj.width) {
			// 		imgParams.width = paramObj.width;
			// 	}
			// 	if (paramObj.height) {
			// 		imgParams.height = paramObj.height;
			// 	}
			// 	if (paramObj.title) {
			// 		imgParams.title = paramObj.title.replace("%20", " ");
			// 	}
			// }

			// const { width, height, title } = imgParams;

			return (
				// <CloudinaryContext cloudName={cloudName}>
				// 	<Image publicId={publicId} title={title} arial-label={title}>
				// 		{width && height && (
				// 			<Transformation width={width} height={height} crop="scale" />
				// 		)}
				// 		{width && !height && <Transformation width={width} crop="scale" />}
				// 		{!width && height && (
				// 			<Transformation height={height} crop="scale" />
				// 		)}
				// 		{!width && !height && <Transformation crop="scale" />}
				// 	</Image>
				// </CloudinaryContext>
			);
		default:
			if (/heading/i.test(type)) {
				return <Heading key={key} data={data} />;
			}
			return (
				<div className={classes.error} key={key}>
					<pre className={classes.error}>Type {data.data.type} not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
