import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ToggleGroupRoot, ToggleGroupItem } from "../radix-primitives";
import { LocaleId } from "../../interfaces/locale-context";
import { st, classes } from "./locale-selector.st.css";

export const LocaleSelector = ({ className }: ComponentProps): JSX.Element => {
	const { locale, locales, getLocaleSymbol, onLocaleChange } =
		useContext(ReactLocaleContext);
	return (
		<div className={st(classes.root, className)}>
			<ToggleGroupRoot
				type="single"
				onValueChange={(localeId: LocaleId) => {
					onLocaleChange(localeId).catch(() =>
						console.error("onLocaleChange Error")
					);
				}}
			>
				<div className={classes.list}>
					{locales.map((id) => {
						const localeLabel = getLocaleSymbol(id);
						return (
							<ToggleGroupItem
								key={id}
								tabIndex={1}
								asChild
								title={localeLabel}
								value={id}
							>
								<div className={classes.item}>
									<Button
										label={localeLabel}
										className={st(classes.button, {
											locale: id,
											selected: locale === id,
										})}
									/>
								</div>
							</ToggleGroupItem>
						);
					})}
				</div>
			</ToggleGroupRoot>
		</div>
	);
};

export default LocaleSelector;
