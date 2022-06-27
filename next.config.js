/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'accountabilitylab.org'],
  },
  experimental: {
    images: {
        layoutRaw: true
    }
  },
}

module.exports = nextConfig
