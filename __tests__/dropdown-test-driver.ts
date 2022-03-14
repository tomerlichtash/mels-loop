import { DriverBase, Simulate } from "test-drive-react";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import style from "../src/components/dropdown/dropdown.st.css";

import DropDown from "../src/components/dropdown";

export class DropdownTestDriver extends DriverBase<Element> {
	private stylableDom: StylableDOMUtil;
	public static ComponentClass = DropDown;

	constructor(rootNodeEval: () => Element) {
		super(rootNodeEval);
		this.stylableDom = new StylableDOMUtil(style, rootNodeEval());
	}

	get dropdownRoot() {
		return this.stylableDom.select(".root");
	}

	get triggerContainer() {
		return this.stylableDom.select(".triggerContainer");
	}

	get isOpen() {
		return this.stylableDom.hasStyleState(
			this.triggerContainer,
			"optionListVisible"
		);
	}
}
