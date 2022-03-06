import React from "react";
import { ContentComponent } from "../src/components/content";
import { IContentComponentInitData } from "../src/interfaces/models";
import { render } from "@testing-library/react";
import {
	style,
	classes,
} from "../src/components/content/content-component.st.css";

describe("ContentComponent", () => {
	it("should render sample line", () => {
		// jest.mock("style", () => ({ style: jest.fn(() => "foo") }));

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
});
