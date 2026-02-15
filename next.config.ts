import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["technohub-media-bucket.s3.amazonaws.com", 'api.technohub.com.kg'],
  },
};

export default nextConfig;
