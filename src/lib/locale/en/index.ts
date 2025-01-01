import * as common from "@locales/en/common.json";
import * as blog from "@locales/en/blog.json";
import * as authors from "@locales/en/authors.json";
import * as glossary from "@locales/en/glossary.json";
import * as contact from "@locales/en/contact.json";
import * as locale from "@locales/en/locale.json";
import * as nav from "@locales/en/nav.json";
import * as pages from "@locales/en/pages.json";

const EN_US = { ...blog, ...authors, ...glossary, ...pages,
    ...contact, ...common, ...locale, ...nav };

export default EN_US;
