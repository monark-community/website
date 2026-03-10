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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ]
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);