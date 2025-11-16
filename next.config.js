/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: false, // !> Turning this ON will break manual game testing
};

module.exports = nextConfig;
