import React, { useContext } from "react";
import { ReactLocaleContext } from "../../contexts/locale-context";
import { ComponentProps } from "../../interfaces/models";
import { Button } from "../ui";
import { ToggleGroupRoot, ToggleGroupItem } from "../radix-primitives";
import { LocaleId } from "../../interfaces/locale-context";
import { mlUtils } from "../../lib/ml-utils";

export const LocaleSelector = ({ className }: ComponentProps): JSX.Element => {
	const {
		locale,
		locales,
		translate,
		getLocaleLabel,
		getLocaleSymbol,
		onLocaleChange,
	} = useContext(ReactLocaleContext);
	return (
		<div className="locale-selector" data-locale={locale}>
			<ToggleGroupRoot
				type="single"
				onValueChange={(localeId: LocaleId) => {
					onLocaleChange(localeId).catch(() =>
						console.error("onLocaleChange Error")
					);
				}}
			>
				<div className="list">
					{locales.map((id) => {
						const localeLabel = getLocaleSymbol(id);
						const localTitle = translate(`${getLocaleLabel(id)}_LABEL`);
						return (
							<ToggleGroupItem
								key={mlUtils.uniqueId()}
								tabIndex={1}
								asChild
								title={localTitle}
								value={id}
							>
								<Button
									label={localeLabel}
									title={localTitle}
									className="item"
									data-locale={id}
									data-selecetd={locale === id}
								/>
							</ToggleGroupItem>
						);
					})}
				</div>
			</ToggleGroupRoot>
		</div>
	);
};

export default LocaleSelector;
