import path from "path";
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const apiProxy = process.env.API_PROXY_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
  async rewrites() {
    return [
        { source: "/auth/:path*", destination: `${apiProxy}/auth/:path*` },
        { source: "/pipelines/:path*", destination: `${apiProxy}/pipelines/:path*` },
        { source: "/campaigns/:path*", destination: `${apiProxy}/campaigns/:path*` },
        { source: "/leads/:path*", destination: `${apiProxy}/leads/:path*` },
        { source: "/properties/:path*", destination: `${apiProxy}/properties/:path*` },
        { source: "/interactions/:path*", destination: `${apiProxy}/interactions/:path*` },
        { source: "/folders/:path*", destination: `${apiProxy}/folders/:path*` },
        { source: "/documents/:path*", destination: `${apiProxy}/documents/:path*` },
        { source: "/users/:path*", destination: `${apiProxy}/users/:path*` },
        { source: "/tasks/:path*", destination: `${apiProxy}/tasks/:path*` },
        { source: "/meetings/:path*", destination: `${apiProxy}/meetings/:path*` },
        { source: "/integrations/:path*", destination: `${apiProxy}/integrations/:path*` },
        { source: "/health", destination: `${apiProxy}/health` },
    ];
  },
};

// @ts-expect-error - Next.js version mismatch in monorepo causes type conflicts with Serwist
export default withSerwist(nextConfig);
