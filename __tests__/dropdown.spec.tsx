import React from "react";
import { render } from "@testing-library/react";
import type { RuntimeStylesheet } from "@stylable/runtime";
import { readFileSync } from "fs";
import nodeEval from "node-eval";
import { Simulate } from "react-dom/test-utils";
import stylableTransformer from "@stylable/jest";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import DropDown from "../src/components/dropdown";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";

let container;

describe("DropDown", () => {
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		document.body.removeChild(container);
		container = null;
	});

	it.only("should render a dropdown component", () => {
		const filename = require.resolve(
			"../src/components/dropdown/dropdown.st.css"
		);
		const content = readFileSync(filename, "utf8");
		const transformer = stylableTransformer.createTransformer();

		const module = nodeEval(
			transformer.process(content, filename),
			filename
		) as RuntimeStylesheet;

		// const partElement = domUtil.getStateValueFromClassName();
		// const xxx = domUtil.hasStyleState(partElement, "optionListVisible");

		const comp = (
			<DropDown
				// className={module.classes.root}
				options={[
					{
						id: "option1",
						label: "opt1",
						isCurrent: true,
						onSelectChange: () => false,
					},
					{
						id: "option2",
						label: "opt2",
						isCurrent: false,
						onSelectChange: () => false,
					},
				]}
				// compKeys={compKeys}
				optionListVisible={false}
				triggerCallback={() => false}
				onSelectChange={() => false}
			/>
		);

		// const wrapper = render(comp);

		act(() => {
			ReactDOM.render(comp, container);
		});

		const domUtil = new StylableDOMUtil(module, container);

		const cmp = container.querySelector(
			`.${domUtil.stylesheet.namespace}__root`
		);

		const triggerButton = container.querySelector(
			`.${domUtil.stylesheet.classes.triggerButton}`
		);

		debugger;
		act(() => {
			// Simulate.click(triggerButton);
			cmp.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		});

		debugger;
		// awawitwrapper.container.click();
		// Simulate.click(wrapper.container);
		debugger;

		// expect(wrapper.container.querySelector("p").textContent).toEqual(
		// 	`sample line`
		// );
	});
});
