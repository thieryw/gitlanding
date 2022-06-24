module.exports = {
  "stories": ["../src/stories/**/*.stories.mdx", "../src/stories/**/*.stories.@(ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "storybook-dark-mode", "@storybook/preset-create-react-app"],
  "core": {
    "builder": "webpack5"
  },
};
