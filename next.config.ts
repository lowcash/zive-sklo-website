import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Components use quality={80}, ={85}, ={90} — all must be listed here
    qualities: [75, 80, 85, 90],
  },
}

export default nextConfig
