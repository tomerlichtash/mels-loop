const fs = require("fs");
const matter = require("gray-matter");

const invalidTerms = ["index.en.md", "index.he.md", ".DS_Store"];
const isValidTerm = (term) => invalidTerms.indexOf(term) === -1;

const annotations = fs.readdirSync("./public/content/annotations", {
	withFileTypes: false,
});

const annotationsData = annotations
	.map((term) => {
		if (!isValidTerm(term)) {
			return;
		}
		return {
			type: "annotation",
			key: term,
		};
	})
	.filter(Boolean);

fs.writeFileSync(
	"./e2e/mock/terms-annotations.json",
	JSON.stringify(annotationsData)
);

console.log(
	`Created "e2e/mock/terms-annotations.json" mock file with ${annotationsData.length} terms`
);

const glossary = fs.readdirSync("./public/content/glossary", {
	withFileTypes: false,
});

const glossaryData = glossary
	.map((term) => {
		if (!isValidTerm(term)) {
			return;
		}

		const fileContents = fs.readFileSync(
			`./public/content/glossary/${term}/index.he.md`,
			"utf-8"
		);

		const { data } = matter(fileContents);

		return {
			type: "glossary",
			key: term,
			term_key: data.glossary_key,
		};
	})
	.filter(Boolean);

fs.writeFileSync(
	"./e2e/mock/terms-glossary.json",
	JSON.stringify(glossaryData)
);

console.log(
	`Created "e2e/mock/terms-glossary.json" mock file with ${glossary.length} terms`
);
