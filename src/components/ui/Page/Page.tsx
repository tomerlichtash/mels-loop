import React, { PropsWithChildren } from "react";
import styles from "./Page.module.scss";

export type PageProps = PropsWithChildren;

const Page = ({ children }: PageProps) => {
	return <main className={styles.root}>{children}</main>;
};

export default Page;
