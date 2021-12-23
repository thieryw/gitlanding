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
  <a href="https://www.gitlanding.dev/">Landing page</a> - <a href="https://www.gitlanding.dev/storybook">Storybook</a> - <a href="https://docs.gitlanding.dev/">Docs</a>
</p>

Gitlanding helps you create a beautiful landing page for your GitHub projects.
Start from a blank CRA project, import some `gitlanding` components, publish on GitHub page, you are done.
`gitlanding` Components looks good out of the box and are also highly customizable.

Be mindfully though that `Gitlanding` is not a documentation website generator. For that purpose you
can use [GitBook](https://gitbook.com), they are free for open source projects.

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
-   [powerhooks.dev](https://www.powerhooks.dev/)
-   [tsafe.dev](https://www.tsafe.dev/)

# Quick start

```bash
yarn add gitlanding onyxia-ui @mui/material @emotion/react @emotion/styled tss-react powerhooks
# If you plan on using icons from: https://mui.com/components/material-icons/
yarn add @mui/icons-material
```

-   [Find out how to publish a Gitlanding page on Github pages](https://docs.gitlanding.dev/)

# Dev

```bash
git clone https://github.com/thieryw/gitlanding && cd gitlanding
yarn install
yarn build
yarn start_vanilla
```

Edit the file in `src/test/vanilla/src/index.tsx` to experiments with the components.

You can also browse the [Storybook](https://gitlanding.dev/storybook) website to see what components are available.
