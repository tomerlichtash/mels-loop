import React, { useContext } from "react";
import { ReactLayoutContext } from "../../contexts/layout-context";
import { ComponentProps } from "../../interfaces/models";
import { IOption } from "../dropdown/option";
import { Button } from "../ui";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { st, classes } from "./locale-selector.st.css";

export interface LocaleSelectorProps extends ComponentProps {
	options: IOption[];
	onLocaleChange: (localeId: string) => Promise<boolean>;
}

export const LocaleSelector = ({
	options,
	onLocaleChange,
	className,
}: LocaleSelectorProps): JSX.Element => {
	const { locale } = useContext(ReactLayoutContext);
	return (
		<div
			className={st(classes.root, className)}
			title={"Select Language"}
			aria-label={"Select Language"}
		>
			<ToggleGroup.Root
				type="single"
				onValueChange={(localeId) => {
					onLocaleChange(localeId).catch(() =>
			// TODO replaec with logger call
					console.error("onLocaleChange Error")
					);
				}}
			>
				<ul className={classes.list}>
					{options.map((option) => {
						return (
							<ToggleGroup.Item
								key={option.id}
								tabIndex={1}
								asChild
								title={option.label}
								value={option.id}
							>
								<li
									className={st(classes.item, {
										locale: option.id,
										selected: locale === option.id,
									})}
								>
									<Button label={option.label} />
								</li>
							</ToggleGroup.Item>
						);
					})}
				</ul>
			</ToggleGroup.Root>
		</div>
	);
};

export default LocaleSelector;
