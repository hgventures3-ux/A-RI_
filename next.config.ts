import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/raw-bulk-kernels",
        destination: "/raw-phool-makhana",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
