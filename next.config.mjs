import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "mileque-bag.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "blogthumb.pstatic.net",
      },

      {
        protocol: "https",
        hostname: "velog.velcdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sstatic.net",
      },
      {
        protocol: "https",
        hostname: "static.toss.im",
      },
      {
        protocol: "https",
        hostname: "img1.daumcdn.net",
      },
      {
        protocol: "https",
        hostname: "techplay.blog",
      },
      {
        protocol: "https",
        hostname: "**.samsungfund.com",
      },
    ],
  },
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};
export default withNextIntl(nextConfig);
