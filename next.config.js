/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  output: 'export',
  basePath: isProd ? '/portfolio' : '',
  assetPrefix: isProd ? '/portfolio/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   distDir: "dist",
//   images: {
//     formats: ["image/avif", "image/webp"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "www.notion.so",
//         port: "",
//         pathname: "/images/**",
//       },
//       {
//         protocol: "https",
//         hostname: "i.ytimg.com",
//         port: "",
//         pathname: "/vi/**",
//       },
//       {
//         protocol: "https",
//         hostname: "ig5zxx05md6to3zc.public.blob.vercel-storage.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

//module.exports = withBundleAnalyzer(nextConfig);
