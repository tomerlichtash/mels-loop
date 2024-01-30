import React from "react";
import { ToggleGroupRoot, ToggleGroupItem } from "@components/primitives";
import { Button } from "@components/ui";
import { mlUtils } from "lib/ml-utils";
import styles from "./LocaleSelector.module.scss";

type ToggleGroupItemProps = {
	id: string;
	label: string;
	title: string;
};

type ToggleGroupProps = {
	options: ToggleGroupItemProps[];
	value: string;
	type: "single" | "multiple";
	onSelect: (id: string) => void;
};

const LocaleSelector = ({
	value,
	options,
	type,
	onSelect,
}: ToggleGroupProps): JSX.Element => {
	return (
		<ToggleGroupRoot
			type={type}
			defaultValue={value}
			onValueChange={onSelect}
			className={styles.root}
		>
			{options.map(({ id, label, title }) => {
				return (
					<Button
						asChild
						title={title}
						aria-label={title}
						key={mlUtils.uniqueId("toggleGroupItem")}
						className={styles.item}
					>
						<ToggleGroupItem value={id} data-locale={id}>
							{label}
						</ToggleGroupItem>
					</Button>
				);
			})}
		</ToggleGroupRoot>
	);
};

export default LocaleSelector;
