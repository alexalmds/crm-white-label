/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Ignora erros de ESLint durante o build
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
  };
export default nextConfig;
