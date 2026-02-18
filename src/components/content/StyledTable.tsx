import type { ReactNode } from "react";
import { ScrollArea } from "@mantine/core";
import styles from "./StyledTable.module.css";

interface StyledTableProps {
  children?: ReactNode;
  [key: string]: unknown;
}

export function StyledTable({ children, ...props }: StyledTableProps) {
  return (
    <ScrollArea>
      <table className={styles.table} {...props}>
        {children}
      </table>
    </ScrollArea>
  );
}
