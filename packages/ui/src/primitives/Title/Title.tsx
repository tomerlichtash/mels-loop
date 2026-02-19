import type { ReactNode, HTMLAttributes } from "react";
import styles from "./Title.module.css";

type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  order?: TitleOrder;
}

export function Title({
  children,
  order = 1,
  className,
  ...props
}: TitleProps) {
  const Tag = `h${order}` as const;
  const classes = [styles.title, styles[`order-${order}`], className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
