import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: { unoptimized: true },
};
const withMDX = createMDX({ extension: /\.mdx?$/ });
export default withNextIntl(withMDX(nextConfig));
