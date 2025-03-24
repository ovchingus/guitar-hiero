import NextImage, { ImageProps } from "next/image";
import nextConfig from "../../../next.config";

const BASE_PATH = nextConfig.basePath || "";

export function Image({ src, ...props }: ImageProps) {
  return <NextImage src={BASE_PATH + src} {...props} />;
}
