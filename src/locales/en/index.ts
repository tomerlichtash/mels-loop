import * as site from "./site.json";
import * as authors from "./authors.json";
import * as glossary from "./glossary.json";

const EN_US = { ...site, ...authors, ...glossary };

export default EN_US;
