export const getCustomStyle = (
	styles: Record<string, string>,
	varName: string,
	size?: string
) => {
	const { 'theme-prefix': themePrefix, 'component-name': componentName, property } = styles;
	const cssVarName = `--${themePrefix}-${componentName}-${property}`;
	const cssVarNameSize = `--${themePrefix}-${componentName}-size`;

	const cssVarSize = size ? `${cssVarNameSize}: ${size};` : '';

	return `:root{
		${cssVarName}--${varName}: ${`var(--${themePrefix}-${varName})`};
		${cssVarSize};
	}`;
};
