import React from "react";
import { ComponentProps } from "../../interfaces/models";
import styles from "./page.module.scss";
import classNames from "classnames";

export interface PageProps extends ComponentProps {
	nodes: React.ReactNode;
	className?: string;
}

export const Page = ({ nodes, className }: PageProps): JSX.Element => {
	return <main className={classNames([styles.root, className])}>{nodes}</main>;
};

export default Page;
