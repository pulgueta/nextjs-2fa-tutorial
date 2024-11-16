import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
  webpack: (config) => {
    config.externals = [...config.externals, "@node-rs/argon2"];

    return config;
  },
};

export default nextConfig;
