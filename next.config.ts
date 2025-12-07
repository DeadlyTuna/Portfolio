import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/photo",
        search: "?name=*",
      },
      {
        pathname: "/photos/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
