import COMMON from "./common";
import EN_US from "./en";
import HE_IL from "./he";

export const Languages = {
	en: Object.assign({}, COMMON, EN_US),
	he: Object.assign({}, COMMON, HE_IL),
};

export * from "./locale-context";

export default Languages;
