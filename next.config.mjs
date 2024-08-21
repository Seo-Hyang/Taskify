// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "ui-avatars.com",
    ],
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "zustand",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
  ],
};

export default nextConfig;
