import { test, expect } from "@playwright/test";
import { StylableDOMUtil } from "@stylable/dom-test-kit";
import stylableTransformer from "@stylable/jest";
import type { RuntimeStylesheet } from "@stylable/runtime";
import { readFileSync } from "fs";
import nodeEval from "node-eval";
import {
	StylableProjectRunner,
	browserFunctions,
} from "@stylable/e2e-test-kit";
import { LayoutTestDriver, ILayoutDriver } from "./drivers/layout-test-driver";
import {
	ILocaleSelectorTestDriver,
	LocaleSelectorTestDriver,
} from "./drivers/locale-selector-test-driver";
import { translateFunc } from "../src/locales/translate";
// import * as stylesheet from "../src/components/locale-selector/locale-selector.st.css";

const EN_ID = "en";
const HE_ID = "he";
const SITE_TITLE_EN = translateFunc(EN_ID)("SITE_TITLE");
const SITE_TITLE_HE = translateFunc(HE_ID)("SITE_TITLE");

let localeSelector: ILocaleSelectorTestDriver;
let layout: ILayoutDriver;
let container;

test.describe("LocaleSelector", () => {
	test.beforeEach(async ({ page }) => {
		localeSelector = new LocaleSelectorTestDriver(page);
		layout = new LayoutTestDriver(page);
	});

	test.only("should start in English locale", async ({ page }) => {
		await layout.gotoRootDir();

		const filename = require.resolve(
			"../src/components/dropdown/dropdown.st.css"
		);
		const content = readFileSync(filename, "utf8");
		const transformer = stylableTransformer.createTransformer();

		const module = nodeEval(
			transformer.process(content, filename),
			filename
		) as RuntimeStylesheet;

		const domUtil = new StylableDOMUtil(module, container);

		debugger;
		// const cmp = container.querySelector(
		// 	`.${domUtil.stylesheet.namespace}__root`
		// );

		// const triggerButton = container.querySelector(
		// 	`.${domUtil.stylesheet.classes.triggerButton}`
		// );

		debugger;

		expect(true).toEqual(false);
	});
});
