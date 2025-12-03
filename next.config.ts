import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hujjzxowxiiouvwggccj.supabase.co",
      },
    ],
  },
};

export default nextConfig;
