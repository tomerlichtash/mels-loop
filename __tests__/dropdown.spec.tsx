import React from "react";
import { spy } from "sinon";
import { expect } from "chai";
import { render } from "./client-renderer";
import DropDown from "./../src/components/dropdown";
import { DropdownTestDriver } from "./dropdown-test-driver";

describe("DropDown", () => {
	let onSelectChange = spy();
	let triggerCallback = spy();

	const sample = (
		<DropDown
			options={[
				{
					id: "opt1",
					label: "Option 1",
					isCurrent: true,
					onSelectChange,
				},
				{
					id: "opt2",
					label: "Option 2",
					isCurrent: false,
					onSelectChange,
				},
			]}
			optionListVisible={false}
			triggerCallback={() => triggerCallback()}
			onSelectChange={onSelectChange}
		/>
	);

	it("should render in a collapsed state", () => {
		const dropdown = render(sample, DropdownTestDriver);
		expect(dropdown.driver.isOpen()).to.equal(false);
	});

	it("should render selected option in a collapsed dropdown", () => {
		const dropdown = render(sample, DropdownTestDriver);
		expect(dropdown.component.getByText("Option 1")).to.exist;
	});

	xit("should toggle option list on click", () => {
		const dropdown = render(sample, DropdownTestDriver);
		dropdown.event.click(dropdown.driver.getTriggerContainer() as Element);
		expect(triggerCallback).to.have.been.calledOnce;
	});
});

export {};
