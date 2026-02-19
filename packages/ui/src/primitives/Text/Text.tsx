import type { ReactNode, HTMLAttributes, ElementType } from "react";
import styles from "./Text.module.css";

type TextSize = "xs" | "sm" | "md" | "lg";
type TextWeight = 400 | 500 | 600 | 700;

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: TextSize;
  color?: "dimmed" | "error";
  weight?: TextWeight;
  italic?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  component?: ElementType;
}

export function Text({
  children,
  size = "md",
  color,
  weight,
  italic,
  uppercase,
  capitalize,
  component: Component = "p",
  className,
  ...props
}: TextProps) {
  const classes = [
    styles.text,
    styles[`size-${size}`],
    color === "dimmed" ? styles.dimmed : "",
    color === "error" ? styles.error : "",
    italic ? styles.italic : "",
    uppercase ? styles.uppercase : "",
    capitalize ? styles.capitalize : "",
    weight ? styles[`weight-${weight}`] : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
