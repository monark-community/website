import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "tsx", "ts", "jsx", "js"],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com']
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
