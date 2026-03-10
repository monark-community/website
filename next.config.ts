import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "tsx", "ts", "jsx", "js"],
  outputFileTracingIncludes: {
    "/[locale]/project/[id]": ["./content/**/*.mdx"],
  },
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com']
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
