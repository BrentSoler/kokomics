import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "readcomiconline.li",
        pathname: "/Uploads/**",
      },
    ],
  },
};

export default nextConfig;
