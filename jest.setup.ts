import '@testing-library/jest-dom';
import './tests/mocks/mockRouter';
import i18n from './i18n';

global.i18nConfig = i18n;

jest.mock('next/config', () => () => ({
	serverRuntimeConfig: {
		PROJECT_ROOT: '/',
	},
}));

global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};
