/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    webpack: (config, { isServer }) => {
        // Add raw-loader for Markdown files
        config.module.rules.push({
          test: /\.md$/,
          use: 'file-loader',
        });
    
        return config;
      },
};

export default nextConfig;
