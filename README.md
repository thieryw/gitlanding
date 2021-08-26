<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>A library of React component for creating beautiful landing pages in minutes</i>
    <br>
    <br>
    <img src="https://github.com/thieryw/gitlanding/workflows/ci/badge.svg?branch=main">
    <img src="https://img.shields.io/npm/dw/gitlanding">
    <img src="https://img.shields.io/npm/l/gitlanding">
</p>
<p align="center">
  <a href="https://sb.gitlanding.dev">Storybook</a>
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

# Documentation

At this point the project is mainly documented by a demo CRA project that you can find here.  
To experiment with run:

```bash
git clone https://github.com/thieryw/gitlanding && cd gitlanding
yarn install
yarn build
yarn start_vanilla
```

Then edit the file in `src/test/vanilla/src/index.tsx` to experiments with the components.

You can also browse the [Storybook](https://sb.gitlanding.dev) website to see what components are available.
