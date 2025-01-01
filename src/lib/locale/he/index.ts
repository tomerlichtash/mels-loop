import * as common from "@locales/he/common.json";
import * as blog from "@locales/he/blog.json";
import * as authors from "@locales/he/authors.json";
import * as glossary from "@locales/he/glossary.json";
import * as contact from "@locales/he/contact.json";
import * as locale from "@locales/he/locale.json";
import * as nav from "@locales/he/nav.json";
import * as pages from "@locales/he/pages.json";

const HE_IL = { ...blog, ...authors, ...glossary, ...pages,
    ...contact, ...common, ...locale, ...nav };

export default HE_IL;
