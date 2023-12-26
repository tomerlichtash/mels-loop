import React from "react";
import styles from "./Card.module.scss";

const Card = ({ children }): JSX.Element => {
	return <div className={styles.root}>{children}</div>;
};

export default Card;
