/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  
  images: {
    remotePatterns: [],
  },

  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;