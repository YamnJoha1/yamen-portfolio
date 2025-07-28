import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
      };
    }
    
    return config;
  },
  
  // Configure experimental features
  experimental: {
    // Optimize server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Configure compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withNextIntl(nextConfig);