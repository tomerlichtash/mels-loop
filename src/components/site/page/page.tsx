import React from "react";
import { ComponentProps } from "../../../interfaces/models";
import classNames from "classnames";
import styles from "./page.module.scss";

export interface PageProps extends ComponentProps {
	nodes: React.ReactNode;
	className?: string;
}

const Page = ({ nodes, className }: PageProps) => {
	return <main className={classNames([styles.root, className])}>{nodes}</main>;
};

export default Page;
