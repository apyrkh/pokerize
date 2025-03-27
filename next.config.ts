import NextBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

var nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
};

var withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
