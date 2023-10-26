/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};
const webpack = require("webpack");
(module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
}),
  nextConfig;
