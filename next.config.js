const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const isProduction = process.env.NODE_ENV === "production";
const outsideVercel = isProduction && process.env.VERCEL !== "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Força o Next.js a usar a versão CJS do fast-json-patch
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push({
        "fast-json-patch": "fast-json-patch",
      });
    }

    config.resolve.alias["fast-json-patch"] =
      require.resolve("fast-json-patch");

    return config;
  },
  transpilePackages: ["lucide-react", "next-mdx-remote"],
  env: {
    TYPESENSE_PORT: process.env.TYPESENSE_PORT,
    TYPESENSE_HOST: process.env.TYPESENSE_HOST,
    TYPESENSE_SEARCH_ONLY_API_KEY: process.env.TYPESENSE_SEARCH_ONLY_API_KEY,
    TYPESENSE_PROTOCOL: process.env.TYPESENSE_PROTOCOL,
    REDIS_URL: process.env.REDIS_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
  },
  experimental: {
    serverComponentsExternalPackages: ["langchain", "@langchain/core"],
    esmExternals: true,
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "app.localhost:3000",
        "*.localhost:3000",
        "lilibox.localhost:3000",
        "sandbox.asaas.com",
        "asaas.com",
      ],
    },
  },
  images: {
    path: outsideVercel ? "" : "_next/image",
    disableStaticImages: false,
    minimumCacheTTL: 60,
    unoptimized: true,
    domains: [
      "public.blob.vercel-storage.com",
      "res.cloudinary.com",
      "abs.twimg.com",
      "pbs.twimg.com",
      "avatar.vercel.sh",
      "avatars.githubusercontent.com",
      "www.google.com",
      "flag.vercel.app",
      "illustrations.popsy.co",
      "amazonaws.com",
    ],
  },
  reactStrictMode: false,
  compress: true,
};

module.exports = withBundleAnalyzer(nextConfig);
