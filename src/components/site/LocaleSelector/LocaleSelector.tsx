import React, { useContext, useMemo } from "react";
import { ToggleGroupRoot, ToggleGroupItem } from "@components/primitives";
import { LocaleId } from "locale/locale-context";
import { Button } from "@components/ui";
import { LocaleProvider } from "locale/context/locale-context";
import styles from "./LocaleSelector.module.scss";

const LocaleSelector = (): JSX.Element => {
	const {
		locale,
		locales,
		translate,
		getLocaleLabel,
		getLocaleSymbol,
		onLocaleChange,
	} = useContext(LocaleProvider);

	const options = useMemo(
		() =>
			locales.map((id) => ({
				id,
				symbol: getLocaleSymbol(id),
				title: translate(`${getLocaleLabel(id)}_LABEL`),
			})),
		[getLocaleLabel, getLocaleSymbol, locales, translate]
	);

	return (
		<ToggleGroupRoot
			defaultValue={locale}
			aria-label="Switch Site Language"
			className={styles.root}
			onValueChange={(id: LocaleId) => onLocaleChange(id)}
			type="single"
		>
			{options.map(({ id, symbol, title }) => {
				return (
					<ToggleGroupItem
						className={styles.item}
						key={`localeSelectorOption_${id}`}
						value={id}
						title={title}
						aria-label={title}
					>
						<Button className={styles.button} asChild>
							<span
								data-locale={id}
								data-state={locale === id ? "selected" : ""}
							>
								{symbol}
							</span>
						</Button>
					</ToggleGroupItem>
				);
			})}
		</ToggleGroupRoot>
	);
};

export default LocaleSelector;
