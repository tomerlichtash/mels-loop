import type { CaseInsensitiveSet } from 'lib/caseInsensitiveCollections';
import type { StringMap } from 'lib/types/models';

/** Provides utility functions for App Specific validating HTML content */
export interface IHTMLValidator {
	/**
	 * Is the attribute name valid for the provided tag?
	 * @param tag
	 * @param key
	 */
	isValidAttributeFor(tag: string, key: string): boolean;

	/**
	 * return a map of the attributes in the provided map, that are valid for the provided tag
	 * Guaranteed not null
	 * @param tag
	 * @param attributes
	 */
	filterAttributesFor(tag: string, attributes: StringMap): StringMap;
}

export interface IAttributeMap {
	valid: CaseInsensitiveSet;
}
