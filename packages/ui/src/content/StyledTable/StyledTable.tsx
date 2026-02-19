import type { ReactNode } from "react";
import styles from "./StyledTable.module.css";

interface StyledTableProps {
  children?: ReactNode;
  [key: string]: unknown;
}

export function StyledTable({ children, ...props }: StyledTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table} {...props}>
        {children}
      </table>
    </div>
  );
}
