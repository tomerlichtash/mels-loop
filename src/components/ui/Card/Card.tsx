import React from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";

const Card = ({ children, className }): JSX.Element => {
	return <div className={classNames(styles.root, className)}>{children}</div>;
};

export default Card;
