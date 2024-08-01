/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   ppr: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
      {
        protocol: "https",
        hostname: "i.mydramalist.com",
      },
    ],
  },
};

export default nextConfig;
