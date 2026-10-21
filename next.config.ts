import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/manufacturing-network",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/export-shipping",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/espace-pro",
        destination: "/",
        permanent: true,
      },
      {
        source: "/request-a-quote",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/journal/:slug*",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/journal",
        permanent: true,
      },
      {
        source: "/products/raw-bulk-kernels",
        destination: "/raw-phool-makhana",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
