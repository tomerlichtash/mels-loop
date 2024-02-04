import { default as COMMON } from './locales/common.json' assert { type: 'json' };
import { default as EN_US } from './locales/en.json' assert { type: 'json' };
import { default as HE_IL } from './locales/he.json' assert { type: 'json' };

export const Languages = {
	en: Object.assign({}, COMMON, EN_US),
	he: Object.assign({}, COMMON, HE_IL),
};

export * from './locale-context';
