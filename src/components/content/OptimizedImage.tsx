import Image from "next/image";

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

  // For external images or SVGs, use regular img tag
  if (src.startsWith("http") || src.endsWith(".svg")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 720}
      height={height || 400}
      style={{ maxWidth: "100%", height: "auto" }}
      {...props}
    />
  );
}
