import React, { useContext, useMemo } from "react";
import { mlUtils } from "../../../lib/ml-utils";
import { ToggleGroupRoot, ToggleGroupItem } from "@components/primitives";
import { LocaleId, TextDirection } from "locale/locale-context";
import styles from "./LocaleSelector.module.scss";
import { Button } from "@components/ui";
import { LocaleProvider } from "locale/context/locale-context";

// type LocaleOption = {
// 	id: LocaleId;
// 	symbol: string;
// 	title: string;
// 	textDirection: TextDirection;
// };

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
				textDirection: "ltr" as TextDirection,
			})),
		[getLocaleLabel, getLocaleSymbol, locales, translate]
	);

	return (
		<ToggleGroupRoot
			defaultValue={locale}
			aria-label="Switch Site Language"
			className={styles.root}
			onValueChange={(id: LocaleId) => onLocaleChange(id)}
			dir="ltr"
			type="single"
		>
			{options.map(({ id, symbol, title, textDirection }) => {
				return (
					<ToggleGroupItem
						className={styles.item}
						key={mlUtils.uniqueId()}
						value={id}
						title={title}
						aria-label={title}
					>
						<Button className={styles.button} asChild>
							<span
								data-state={locale === id ? "selected" : ""}
								data-text-direction={textDirection}
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
