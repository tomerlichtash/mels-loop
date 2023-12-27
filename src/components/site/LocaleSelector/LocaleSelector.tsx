import React from "react";
import { mlUtils } from "../../../lib/ml-utils";
import { ToggleGroupRoot, ToggleGroupItem } from "@components/primitives";
import { LocaleId } from "locale/locale-context";
import styles from "./LocaleSelector.module.scss";
import type { LocaleSelectorProps } from "./types";

const LocaleSelector = ({
	value,
	options,
	onChange,
	className,
}: LocaleSelectorProps): JSX.Element => {
	return (
		<ToggleGroupRoot
			defaultValue={value}
			aria-label="Switch Site Language"
			className={styles.root}
			onValueChange={(id: LocaleId) => onChange(id)}
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
						<span
							data-state={value === id ? "selected" : ""}
							data-text-direction={textDirection}
							className={styles.button}
						>
							{symbol}
						</span>
					</ToggleGroupItem>
				);
			})}
		</ToggleGroupRoot>
	);
};

export default LocaleSelector;
