import React from "react";
import { ContentComponent } from "../src/components/content";
import { IContentComponentInitData } from "../src/interfaces/models";
import { render } from "@testing-library/react";

describe("ContentComponent", () => {
	it("should render sample line", () => {
		const compData = {
			node: {
				type: "paragraph",
				key: "key",
				children: [
					{
						type: "text",
						key: "line-1",
						line: 1,
						text: "sample line",
					},
				],
			},
		} as IContentComponentInitData;

		const wrapper = render(<ContentComponent componentData={compData} />);

		expect(wrapper.container.querySelector("p").textContent).toEqual(
			`sample line`
		);
	});
	// it("should render sample line", () => {
	// 	const compData = {
	// 		node: {
	// 			type: "image",
	// 			key: "key",
	// 			children: [
	// 				{
	// 					type: "image",
	// 					key: "line-1",
	// 					line: 1,
	// 					text: "sample line",
	// 				},
	// 			],
	// 		},
	// 	} as IContentComponentInitData;

	// 	const wrapper = render(<ContentComponent componentData={compData} />);

	// 	expect(wrapper.container.querySelector("figure").textContent).toEqual(
	// 		`sample line`
	// 	);
	// });
});
