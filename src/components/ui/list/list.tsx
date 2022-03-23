import React from "react";
// import Link from "next/link";
import { ComponentProps } from "../../../interfaces/models";
import { v4 as uuidv4 } from "uuid";
import { IOption } from "../../dropdown/option";
import { st, classes } from "./list.st.css";
import Button from "../button/button";

export interface ListProps extends ComponentProps {
	items?: IOption[];
	callback?: (id: string) => void;
}

export const List = ({ items, className }: ListProps): JSX.Element => {
	return (
		<div className={st(classes.root, className)}>
			<ul className={classes.list}>
				{items.map((item) => {
					// const { id } = page;
					// const isCurrent = isCurrentPage(id);
					// if (!isPageVisible(id)) return;
					const { label } = item;
					return (
						<li className={st(classes.item, { isCurrent })} key={uuidv4()}>
							<Button
								label={label}
								link={getPagePath(id)}
								selected={isCurrent}
								className={classes.button}
							/>
							<div className={st(classes.marker, { isCurrent })}></div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default List;
