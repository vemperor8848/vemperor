/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "www.notion.so" },
			{ protocol: "https", hostname: "prod-files-secure.notion-static.com" },
			{ protocol: "https", hostname: "prod-files-secure-uswest-2.notion-static.com" },
			{ protocol: "https", hostname: "prod-files-secure.us-west-2.amazonaws.com" },
			{ protocol: "https", hostname: "s3-us-west-2.amazonaws.com" },
			{ protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
			{ protocol: "https", hostname: "i.ibb.co" },
			{ protocol: "https", hostname: "images.unsplash.com" },
			// Wildcards to catch other signed Notion/AWS file hosts
			{ protocol: "https", hostname: "**.notion-static.com" },
			{ protocol: "https", hostname: "**.amazonaws.com" },
		],
	},
	async rewrites() {
		return [];
	},
};

export default nextConfig;
