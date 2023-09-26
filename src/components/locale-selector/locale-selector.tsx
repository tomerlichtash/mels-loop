import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { mlUtils } from "../../lib/ml-utils";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import classNames from "classnames";
import styles from "./locale-selector.module.scss";

export const LocaleSelector = ({
	onClick,
	className,
}: {
	onClick?: () => void;
	className?: string;
}): JSX.Element => {
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
			dir="ltr"
			className={classNames([styles.root, className])}
			value={localeValue}
			exclusive
			onChange={handleChange}
			aria-label="Site Language"
			size="small"
		>
			{locales.map((id) => {
				const localeLabel = getLocaleSymbol(id);
				const localeTitle = translate(`${getLocaleLabel(id)}_LABEL`);
				return (
					<ToggleButton
						key={mlUtils.uniqueId()}
						value={id}
						selected={locale === id}
						aria-label={localeTitle}
						title={localeTitle}
						onClick={() => {
							onLocaleChange(id).catch(() =>
								console.error("onLocaleChange Error")
							);
							onClick && onClick();
						}}
						className={styles.button}
					>
						{localeLabel}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};

// export default LocaleSelector;
