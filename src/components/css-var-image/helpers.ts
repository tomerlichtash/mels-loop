export const getCustomStyle = (styles: Record<string, string>, varName: string) => {
	const { theme_prefix, component_name, property } = styles;
	const cssVarName = `--${theme_prefix}-${component_name}-${property}`;
	const cssVarTarget = `var(--${theme_prefix}-${varName})`;
	return `:root{ ${cssVarName}: ${cssVarTarget} }`;
};
