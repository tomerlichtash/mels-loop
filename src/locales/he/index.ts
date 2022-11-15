import * as site from "./site.json";
import * as authors from "./authors.json";
import * as glossary from "./glossary.json";
import * as general from "./general.json";

const HE_IL = { ...site, ...authors, ...glossary, ... general };

export default HE_IL;
