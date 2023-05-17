/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'images.adsttc.com'
    ]
  },
}

module.exports = nextConfig
