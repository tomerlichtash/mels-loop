import React, { useState } from "react";
import { useRouter } from "next/router";
import { Option } from "./option";
import { IOption } from "../../interfaces/models";
import { t } from "../../locales/translate";
import { style, classes } from "./dropdown.st.css";

export const DropDown = ({
	openLabel,
	closeLabel,
	options,
	className,
}: {
	openLabel: string;
	closeLabel: string;
	options: IOption[];
	className?: string;
}): JSX.Element => {
	const router = useRouter();
	const { locale } = router;
	const [optionListVisible, toggleOptionList] = useState(false);
	return (
		<div
			className={style(classes.root, className)}
			onMouseLeave={() => toggleOptionList(false)}
		>
			<div className={classes.optionListTrigger}>
				{!optionListVisible ? (
					<div
						className={classes.optionListOpen}
						onClick={() => toggleOptionList(true)}
					>
						{t(openLabel, locale)}
					</div>
				) : (
					<div
						className={classes.optionListClose}
						onClick={() => toggleOptionList(false)}
					>
						{t(closeLabel, locale)}
					</div>
				)}
			</div>
			{optionListVisible && (
				<div className={classes.optionListContainer}>
					<ul className={classes.optionList}>
						{options.map((option) => (
							<Option
								closeDropDown={() => toggleOptionList(false)}
								{...option}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropDown;
