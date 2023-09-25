import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { mlUtils } from "../../lib/ml-utils";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const LocaleSelector = ({ className }): JSX.Element => {
	const {
		locale,
		locales,
		translate,
		getLocaleLabel,
		getLocaleSymbol,
		onLocaleChange,
	} = useContext(ReactLocaleContext);

	const [localeValue, setLocaleValue] = React.useState<string | null>(locale);

	const handleChange = (_: React.MouseEvent<HTMLElement>, val: string) =>
		setLocaleValue(val);

	return (
		<ToggleButtonGroup
			className={className}
			value={localeValue}
			exclusive
			onChange={handleChange}
			aria-label="Site Language"
		>
			{locales.map((id) => {
				const localeLabel = getLocaleSymbol(id);
				const localeTitle = translate(`${getLocaleLabel(id)}_LABEL`);
				return (
					<ToggleButton
						size="small"
						key={mlUtils.uniqueId()}
						value={id}
						selected={locale === id}
						aria-label={localeTitle}
						title={localeTitle}
						onClick={() => {
							onLocaleChange(id).catch(() =>
								console.error("onLocaleChange Error")
							);
						}}
					>
						{localeLabel}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};

// export default LocaleSelector;
