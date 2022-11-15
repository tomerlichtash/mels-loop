import * as site from "./site.json";
import * as authors from "./authors.json";
import * as glossary from "./glossary.json";
import * as general from "./general.json";

const EN_US = { ...site, ...authors, ...glossary, ...general };

export default EN_US;
