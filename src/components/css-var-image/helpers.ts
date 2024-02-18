export const getCustomStyle = (
	styles: Record<string, string>,
	varName: string
) => {
	const {
		'theme-prefix': themePrefix,
		'component-name': componentName,
		property,
	} = styles;
	const cssVarName = `--${themePrefix}-${componentName}-${property}`;
	const cssVarTarget = `var(--${themePrefix}-${varName})`;
	return `:root{ ${cssVarName}: ${cssVarTarget} }`;
};
