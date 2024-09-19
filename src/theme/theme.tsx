import { createTheme } from '@melsloop/ml-components';
import { THEME_NAMESPACE } from './consts';
import { ThemeGlobals, DarkTheme, LightTheme } from 'theme';

const createStyleTag = (id: string, contents: string) => (
	<style
		id={id}
		dangerouslySetInnerHTML={{
			__html: contents
		}}
	/>
);

const variants = [
	{ name: 'light', theme: LightTheme },
	{ name: 'dark', theme: DarkTheme }
];

const variantThemes = variants.reduce((acc, { name, theme }) => {
	return {
		...acc,
		[`variant-${name}`]: createTheme({
			hostSelector: `[${THEME_NAMESPACE}="${name}"]`,
			theme
		})
	};
}, {});

export const styles: Record<string, string> = {
	globals: createTheme({
		hostSelector: ':root',
		theme: ThemeGlobals
	}),
	...variantThemes
};

export const siteTheme = Object.keys(styles).map((name: string) => {
	return createStyleTag(`ml-${name}`, styles[name]);
});
