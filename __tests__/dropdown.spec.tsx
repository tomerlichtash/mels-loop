import React from "react";
import { ClientRenderer, Simulate, sinon } from "test-drive-react";
import { DropdownTestDriver } from "./dropdown-test-driver";
import DropDown from "../src/components/dropdown";

describe("DropDown", () => {
	let onSelectChange: sinon.SinonSpy;
	let triggerCallback: sinon.SinonSpy;

	const comp = (
		<DropDown
			options={[
				{
					id: "option1",
					label: "opt1",
					isCurrent: true,
					onSelectChange,
				},
				{
					id: "option2",
					label: "opt2",
					isCurrent: false,
					onSelectChange,
				},
			]}
			optionListVisible={false}
			triggerCallback={() => false}
			onSelectChange={onSelectChange}
		/>
	);

	const clientRenderer = new ClientRenderer();
	afterEach(() => clientRenderer.cleanup());

	const render = (
		element: React.ReactElement<any>,
		container?: HTMLDivElement
	): DropdownTestDriver =>
		clientRenderer.render(element, container).withDriver(DropdownTestDriver)
			.driver;

	it("should toggle option list on click", () => {
		let dropdown = render(comp);
		expect(dropdown.isOpen).toBeFalsy();
		Simulate.click(dropdown.triggerContainer);
		expect(dropdown.isOpen).toBeTruthy();
	});
});
