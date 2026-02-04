
// next.config.js
const path = require('path');
console.log(__dirname)
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer,  }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
      '@app': path.resolve(__dirname, './app'),
    }
    return config;
  }
};

module.exports = nextConfig;
