/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    images: {
      unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
