import Image from "next/image";
import styles from "./OptimizedImage.module.css";

interface OptimizedImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

export function OptimizedImage({
  src,
  alt = "",
  width,
  height,
  ...props
}: OptimizedImageProps) {
  if (!src) return null;

  if (src.startsWith("http") || src.endsWith(".svg")) {
    return <img src={src} alt={alt} {...props} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 720}
      height={height || 400}
      className={styles.responsive}
      {...props}
    />
  );
}
