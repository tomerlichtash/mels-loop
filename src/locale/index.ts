import { default as COMMON } from './common';
// import { default as EN_US } from './en';
// import { default as HE_IL } from './he';
import { default as EN_US } from './en/site.json' assert { type: 'json' };
import { default as HE_IL } from './he/site.json' assert { type: 'json' };

export const Languages = {
	en: Object.assign({}, COMMON, EN_US),
	he: Object.assign({}, COMMON, HE_IL),
};

export * from './locale-context';
