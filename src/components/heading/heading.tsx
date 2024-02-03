import React from "react";
import styles from "./heading.module.scss";

export const Heading = ({ level, children, ...rest }): JSX.Element => {
	const Tag = `h${level}` as keyof JSX.IntrinsicElements;

	return (
		<Tag className={styles.root} {...rest}>
			{children}
		</Tag>
	);
};

export default Heading;
