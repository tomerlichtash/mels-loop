import { CaseInsensitiveMap, CaseInsensitiveSet } from 'lib/caseInsensitiveCollections';
import { ALLOWED_HTML_ATTRIBUTES } from './consts';
import type { IAttributeMap, IHTMLValidator } from './types';
import type { StringMap } from 'lib/types/models';

class HTMLValidatorClass implements IHTMLValidator {
	private readonly attributeMap: CaseInsensitiveMap<IAttributeMap>;

	constructor() {
		this.attributeMap = new CaseInsensitiveMap();

		Object.keys(ALLOWED_HTML_ATTRIBUTES).forEach((key) => {
			const rec = ALLOWED_HTML_ATTRIBUTES[key];
			this.attributeMap.set(key, {
				valid: new CaseInsensitiveSet(rec.valid as string[])
			});
		});

		if (!this.attributeMap.has('*')) {
			this.attributeMap.set('*', {
				valid: new CaseInsensitiveSet()
			});
		}
	}

	isValidAttributeFor(tag: string, key: string): boolean {
		if (!tag) {
			return false;
		}
		return (
			this.attributeMap.get('*').valid.has(key) || this.attributeMap.get(tag)?.valid.has(key)
		);
	}

	filterAttributesFor(tag: string, attributes: StringMap): StringMap {
		if (!tag || !attributes) {
			return {};
		}
		return Object.keys(attributes).reduce((acc, name) => {
			if (this.isValidAttributeFor(tag, name)) {
				acc[name] = attributes[name];
			}
			return acc;
		}, {});
	}
}

export const htmlValidator: IHTMLValidator = new HTMLValidatorClass();
