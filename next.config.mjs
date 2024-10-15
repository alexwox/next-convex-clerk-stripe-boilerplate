/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "https://upbeat-narwhal-999.convex.cloud",
            }
        ]
    }
};

export default nextConfig;
