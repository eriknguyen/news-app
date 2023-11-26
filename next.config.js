/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_KEY: process.env.API_KEY,
  },
}

module.exports = nextConfig
