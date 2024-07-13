/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add raw-loader for Markdown files
        config.module.rules.push({
          test: /\.md$/,
          use: 'raw-loader',
        });
    
        return config;
      },
};

export default nextConfig;
