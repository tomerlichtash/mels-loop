import * as site from "./site.json";
import * as authors from "./authors.json";
import * as glossary from "./glossary.json";
import * as content from "./content.json";

const EN_US = { ...site, ...authors, ...glossary, ...content };

export default EN_US;
