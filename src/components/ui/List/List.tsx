import React from "react";
import { mlUtils } from "../../../lib/ml-utils";
import Link from "../Link";
import classNames from "classnames";
import styles from "./List.module.scss";

import type { IList } from "./types";

const List = ({ items, label, className }: IList): JSX.Element => (
	<div className={classNames([styles.root, className])}>
		<div className={styles.label}>{label}</div>
		<ul className={styles.list}>
			{items.map(({ label, target, url }) => {
				return (
					<li key={mlUtils.uniqueId()} className={styles.item}>
						{url ? (
							<Link href={url} target={target} className={styles.link}>
								{label}
							</Link>
						) : (
							label
						)}
					</li>
				);
			})}
		</ul>
	</div>
);

export default List;
