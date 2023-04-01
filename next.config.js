/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'www.bing.com',
      'www.google.com',
      'images.adsttc.com'
    ]
  },
}

module.exports = nextConfig
