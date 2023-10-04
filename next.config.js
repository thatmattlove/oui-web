const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

function getBaseURL() {
    switch (process.env.VERCEL_ENV) {
        case "production":
            return "https://oui.is";
        case "preview":
            return `https://${process.env.VERCEL_URL}`;
        default:
            return "http://localhost:3000";
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        optimizePackageImports: ["@ark-ui/react"],
    },
    env: {
        NEXT_PUBLIC_BASE_URL: getBaseURL(),
    },
    headers: async () => [
        {
            source: "/",
            headers: [
                { key: "cache-control", value: "max-age=9, s-maxage=1, stale-while-revalidate=59" },
                { key: "cdn-cache-control", value: "s-maxage=60" },
                { key: "vercel-cdn-cache-control", value: "s-maxage=3600" },
            ],
        },
    ],
};

module.exports = withBundleAnalyzer(nextConfig);
