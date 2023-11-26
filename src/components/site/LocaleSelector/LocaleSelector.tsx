import React from "react";
import { mlUtils } from "../../../lib/ml-utils";
import classNames from "classnames";
import styles from "./LocaleSelector.module.scss";
import type { LocaleSelectorProps } from "./types";
import { ToggleGroupRoot, ToggleGroupItem } from "@components/primitives";

const LocaleSelector = ({
	value,
	options,
	onChange,
	className,
}: LocaleSelectorProps): JSX.Element => {
	return (
		<ToggleGroupRoot
			defaultValue={value}
			aria-label="View density"
			className={classNames(styles.root, className)}
			onValueChange={(id) => onChange(id)}
			dir="ltr"
			type="single"
		>
			{options.map(({ id, symbol, title }) => {
				return (
					<ToggleGroupItem
						className={styles.button}
						key={mlUtils.uniqueId()}
						value={id}
						title={title}
						aria-label={title}
						data-state={value === id ? "checked" : "unchceked"}
					>
						<label className={styles.label} htmlFor="r1">
							{symbol}
						</label>
					</ToggleGroupItem>
				);
			})}
		</ToggleGroupRoot>
	);
};

export default LocaleSelector;
