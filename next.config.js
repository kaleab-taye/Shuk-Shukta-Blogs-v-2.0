/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://shuk-shukta-blogs.vercel.app/api/:path*',
  //     },
  //   ]
  // },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  env: {
    url: 'https://shuk-shukta-blogs.vercel.app',
    mongoDb_url:
      'mongodb+srv://shuk_shukta_blogger:X3909BYp366Q1lph@cluster0.tjsznqp.mongodb.net/?retryWrites=true&w=majority',
  },
};

module.exports = nextConfig;

/*
https://shuk-shukta-blogs.vercel.app
http://localhost:3000

async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://shuk-shukta-blogs.vercel.app/api/:path*',
      },
    ]
  },
  
*/
