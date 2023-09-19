/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "img2.ans-media.com",
            "127.0.0.1",
            "localhost",
            "a-store-api-production.up.railway.app"
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/category/1',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
