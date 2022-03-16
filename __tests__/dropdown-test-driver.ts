import { StylableDOMUtil } from "@stylable/dom-test-kit";
import * as stylesheet from "../src/components/dropdown/dropdown.st.css";

export function DropdownTestDriver(element: Element) {
	const stylableDom = new StylableDOMUtil(stylesheet, element);

	function dropdownRoot() {
		return stylableDom.select(".root");
	}

	function getTriggerContainer(): Element {
		return stylableDom.select(".triggerContainer");
	}

	function isOpen() {
		return stylableDom.hasStyleState(
			getTriggerContainer(),
			"optionListVisible"
		);
	}

	return {
		isOpen,
		getTriggerContainer,
		dropdownRoot,
	};
}
