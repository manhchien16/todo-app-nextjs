/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true, // Đảm bảo rằng appDir được bật nếu bạn sử dụng thư mục src
    },
}

module.exports = nextConfig
