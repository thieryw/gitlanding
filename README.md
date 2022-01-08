<p align="center">
    <img src="https://user-images.githubusercontent.com/39378411/135892116-24367dcb-e0b4-4e16-a1c0-952c7f5bef9a.png">  
</p>
<p align="center">
    <i>A library of React component for creating beautiful landing pages in minutes</i>
    <br>
    <br>
    <a href="https://github.com/garronej/gitlanding/actions">
      <img src="https://github.com/garronej/gitlanding/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://bundlephobia.com/package/gitlanding">
      <img src="https://img.shields.io/bundlephobia/minzip/gitlanding">
    </a>
    <a href="https://www.npmjs.com/package/gitlanding">
      <img src="https://img.shields.io/npm/dw/gitlanding">
    </a>
    <a href="https://github.com/garronej/gitlanding/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/gitlanding">
    </a>
</p>
<p align="center">
  <a href="https://www.gitlanding.dev/">Home</a> - 
  <a href="https://www.gitlanding.dev/storybook">Components index</a> - 
  <a href="https://docs.gitlanding.dev/">Documentation</a>
</p>

Gitlanding helps you create a beautiful landing page for your GitHub projects.
Start from a blank [CRA](https://create-react-app.dev/) project, import [some `gitlanding` components](https://www.gitlanding.dev/) and put it live using [GitHub page](https://pages.github.com/)!
`gitlanding` Components looks good out of the box and are also highly customizable.

Be mindfully though that `Gitlanding` is **not** a documentation website generator, it's a landing page generator.  
For creating documentation website you can use [GitBook](https://gitbook.com), it's for open source projects (you just need to [issue a request](https://user-images.githubusercontent.com/6702424/148654719-bf393721-4bf4-4814-a8ef-cf57a3318a7f.png)).

# Motivation

When it comes to creating landing pages there are hundreds of option to choose from.  
You could pick a theme you like from Jekyll. You could create a wordpress or again
create page using [GitPages](https://gitpages.app).

The problem with all these solutions is that if your project grow you will need to incorporate
features like internationalization, routing, and maybe some advanced logic that may end up
forcing you start over and create a React website from scratch.

The approach of `gitlanding` is to provide you with a way to to create a good looking page in
minutes and enable you to customize it and add feature along the way as your project grow.

# Showcase

Website using gitlanding.

-   [SSPCloud.fr](https://www.sspcloud.fr), [Source code](https://github.com/InseeFrLab/www.sspcloud.fr)
-   [tsafe.dev](https://www.tsafe.dev/)
-   [Gitlanding itself](https://www.gitlanding.dev/)
-   [powerhooks.dev](https://www.powerhooks.dev/)


# 🚀 Quick start

Heads over to [the documentation website 📙](https://docs.gitlanding.dev/)!

# Dev

```bash
git clone https://github.com/thieryw/gitlanding && cd gitlanding
yarn install
yarn build
# To strart the test project
yarn start_vanilla 
```

Edit the file in `src/test/vanilla/src/index.tsx` to experiments with the components.
