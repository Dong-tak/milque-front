/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
        hostname: "github.githubassets.com",
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
        hostname: "static.toss-internal.com",
      },
      {
        protocol: "https",
        hostname: "img1.daumcdn.net",
      },
      {
        protocol: "https",
        hostname: "techplay.blog",
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
