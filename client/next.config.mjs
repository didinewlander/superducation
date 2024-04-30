/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ["utfs.io"]
    },
    webpack: (config) => {
		config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
		return config;
	}
}
export default nextConfig;
