import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        //   pathname: '/my-bucket/**',
      },
    ],
  },
};

export default nextConfig;
