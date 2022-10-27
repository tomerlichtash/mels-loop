import * as COMMON from "./common.json";
import * as EN_US from "./en.json";
import * as HE_IL from "./he.json";

export const Languages = {
	en: Object.assign({}, COMMON, EN_US),
	he: Object.assign({}, COMMON, HE_IL),
};

export default Languages;
