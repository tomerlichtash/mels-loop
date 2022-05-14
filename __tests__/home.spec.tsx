import React from "react";
import { ContentComponent } from "../src/components/content";
import { IContentComponentInitData } from "../src/interfaces/models";
import { render } from "@testing-library/react";

describe("ContentComponent", () => {
	it("should render sample line", () => {
		const compData = {
			node: {
				type: "line",
				key: "key",
				line: 1,
				children: [
					{
						type: "text",
						key: "line-1",
						line: 1,
						occurrenceIndex: 1,
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
});

export {};
