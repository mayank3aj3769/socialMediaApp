/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true
  },
  experimental: { 
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/activity',
        destination: '/app/root/activity/page', 
      }
    ];
  }
};


// const rewrites = async()=> {
//     return [
//       {
//         source: '/activity',
//         destination: '/app/root/activity/page', // Adjust the destination to match your file structure
//       },
//       // Add more rewrites as needed
//     ];
// }

module.exports = nextConfig;