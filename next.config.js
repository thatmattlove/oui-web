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
    },
    env: {
        NEXT_PUBLIC_BASE_URL: getBaseURL(),
    },
};

module.exports = withBundleAnalyzer(nextConfig);
