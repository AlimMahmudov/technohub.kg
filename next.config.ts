import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "technohub-media-bucket.s3.amazonaws.com",
      "api.technohub.com.kg",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
