import * as site from "./site.json";
import * as authors from "./authors.json";
import * as glossary from "./glossary.json";

const HE_IL = { ...site, ...authors, ...glossary };

export default HE_IL;
