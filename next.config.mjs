import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  webpack: (config, { isServer }) => {
    // Add raw-loader for Markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    // 'ol' external
    config.externals = [...(config.externals || []), 'ol'];

    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });

    // Define aliases with absolute paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@base': path.resolve(__dirname, 'src/components/base'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    };

    return config;
  },
};

export default nextConfig;
