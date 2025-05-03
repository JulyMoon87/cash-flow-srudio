import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add webpack configuration to handle 'async_hooks'
  webpack: (config, { isServer }) => {
    // Exclude 'async_hooks' from client-side bundles
    // This is needed because @opentelemetry/context-async-hooks, a dependency potentially
    // pulled in by Genkit, tries to import the Node.js 'async_hooks' module.
    if (!isServer) {
      config.externals = [...(config.externals || []), 'async_hooks'];
    }

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
