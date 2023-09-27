function getBaseURL() {
    let scheme = "http://";
    let host = "localhost:3000";
    if (["production", "preview"].includes(process.env.VERCEL_ENV)) {
        scheme = "https://";
        host = process.env.VERCEL_URL;
    }
    return [scheme, host].join("");
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env: {
        BASE_URL: getBaseURL(),
    },
};

module.exports = nextConfig;
