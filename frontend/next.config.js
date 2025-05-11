module.exports = {
  reactStrictMode: true, // Enables React's strict mode for development (helps find issues early)
  images: {
    domains: ["yourdomain.com"], // Optional: Define allowed image domains for the Next.js image optimization
  },
  env: {
    // Optionally, define environment variables to be used in your application
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  },
  webpack(config, { isServer }) {
    // Modify webpack configuration if needed
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // This prevents "fs" module error when building for the browser
      };
    }
    return config;
  },
};
