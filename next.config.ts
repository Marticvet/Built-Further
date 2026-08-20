import type { NextConfig } from "next";

const posthogProxyPath = "/bfx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: `${posthogProxyPath}/static/:path*`,
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: `${posthogProxyPath}/array/:path*`,
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: `${posthogProxyPath}/:path*`,
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
