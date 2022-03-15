import { DriverBase } from "test-drive-react";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import DropDown from "../src/components/dropdown";
import * as stylesheet from "../src/components/dropdown/dropdown.st.css";

export class DropdownTestDriver extends DriverBase<Element> {
	public static ComponentClass = DropDown;
	private stylableDom: StylableDOMUtil;

	constructor(rootNodeEval: () => Element) {
		super(rootNodeEval);
		this.stylableDom = new StylableDOMUtil(stylesheet, rootNodeEval());
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
