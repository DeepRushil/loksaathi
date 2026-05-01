import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Strict mode for catching potential issues early
  reactStrictMode: true,
  
  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://www.gstatic.com https://www.google.com https://www.youtube.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://i.ytimg.com",
              "frame-src https://www.google.com https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com",
              "connect-src 'self' https://generativelanguage.googleapis.com https://firebase.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.googleapis.com",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['@google/generative-ai', 'firebase'],
  },
  
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
