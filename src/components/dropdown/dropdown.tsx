import React, { useState } from "react";
import { Option, IOption } from "./option";
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
	const [optionListVisible, toggleOptionList] = useState(false);
	return (
		<div
			className={style(classes.root, className)}
			onMouseLeave={() => toggleOptionList(false)}
		>
			<div className={classes.optionListTrigger}>
				{!optionListVisible ? (
					<button
						className={classes.optionListOpen}
						onClick={() => toggleOptionList(true)}
					>
						{openLabel}
					</button>
				) : (
					<button
						className={classes.optionListHide}
						onClick={() => toggleOptionList(false)}
					>
						{closeLabel}
					</button>
				)}
			</div>
			{optionListVisible && (
				<div className={classes.container}>
					<ul className={classes.list}>
						{options.map((option) => (
							<li
								className={style(classes.option, {
									current: option.isCurrent,
								})}
								key={`option-${option.id}`}
							>
								<Option {...option} />
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropDown;
