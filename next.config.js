/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { styledComponents: true },
  optimizeFonts: false,
  images: { unoptimized: true },
};

module.exports = nextConfig;
