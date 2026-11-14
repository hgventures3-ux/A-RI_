import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
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
      {
        source: "/journal/makhana-export-certifications",
        destination: "/journal/makhana-export-certifications-guide",
        permanent: true,
      },
      {
        source: "/admin/products/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/categories/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/orders/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/customers/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/leads/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/inventory/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/coupons/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/reviews/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/settings/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/users/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/content/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
      {
        source: "/admin/analytics/:path*",
        destination: "/admin/journal",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
