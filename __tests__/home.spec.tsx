import React from "react";
import ContentComponent from "../src/components/content/contentComponent";
import { IContentComponentInitData } from "../src/interfaces/models";
import { render } from "@testing-library/react";

describe("ContentComponent", () => {
	it("should render sample line", () => {
		const compData = {
			data: {
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
			locale: "en",
		} as IContentComponentInitData;

		const wrapper = render(<ContentComponent data={compData} />);

		expect(wrapper.container.querySelector("span").textContent).toEqual(
			`sample line`
		);
	});
});
