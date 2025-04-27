/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const nextConfig = {
  experimental: {},
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias['@recruitpro/lib'] = path.resolve(__dirname, '../../lib');
    config.resolve.alias['@recruitpro/components'] = path.resolve(__dirname, '../../components');
    return config;
  },
};

module.exports = nextConfig;