/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
      unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};



export default nextConfig;
