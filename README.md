<p align="center">
    <img src="https://user-images.githubusercontent.com/39378411/135892116-24367dcb-e0b4-4e16-a1c0-952c7f5bef9a.png">  
</p>
<p align="center">
    <i>Showcase your open source project with a good-looking webpage</i>
    <br>
    <br>
    <a href="https://github.com/thieryw/gitlanding/actions">
      <img src="https://github.com/thieryw/gitlanding/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://github.com/thieryw/gitlanding/blob/cfa7b01db162602fa6622160377f4d4e3485d4fc/tsconfig.json#L14">
        <img src="https://camo.githubusercontent.com/0f9fcc0ac1b8617ad4989364f60f78b2d6b32985ad6a508f215f14d8f897b8d3/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565">
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

Gitlanding helps you create a beautiful landing page for your GitHub projects in three simple steps:

-   Start from a blank [CRA](https://create-react-app.dev/) project
-   Import [some `gitlanding` components](https://www.gitlanding.dev/)
-   Put it live using [GitHub page](https://pages.github.com/)!

# Motivation

When it comes to creating landing pages there are hundreds of option to choose from.  
You could pick a theme you like from Jekyll. You could create a wordpress or again
create page using [GitPages](https://gitpages.app).

The problem with all these solutions is that if your project grow you will need to incorporate
features like internationalization, routing, and maybe some advanced logic that may end up
forcing you start over and create a React website from scratch.

The approach of `gitlanding` is to provide you with a way to to create a good looking page in
minutes and enable you to customize it and add feature along the way as your project grow.

> Be mindfully though that `Gitlanding` is **not** a documentation website generator, it's a landing page generator.  
> For creating documentation website you can use [GitBook](https://gitbook.com), it's free for open source projects (you just need to [issue a request](https://user-images.githubusercontent.com/6702424/148654719-bf393721-4bf4-4814-a8ef-cf57a3318a7f.png)).

# Showcase

Website using gitlanding.

-   [SSPCloud.fr](https://www.sspcloud.fr)
-   [tsafe.dev](https://www.tsafe.dev/)
-   [Gitlanding itself](https://www.gitlanding.dev/)
-   [powerhooks.dev](https://www.powerhooks.dev/)

# 🚀 Quick start

Heads over to [the documentation website 📙](https://docs.gitlanding.dev/)!

[![kickstart_video](https://user-images.githubusercontent.com/6702424/148655634-bcc2ef69-9720-4224-9da5-0af88eb9d906.png)](https://youtu.be/taDGhL0z7wc)

# Dev

```bash
git clone https://github.com/thieryw/gitlanding && cd gitlanding
yarn install
yarn build
# To strart the test project
yarn start_vanilla
```

Edit the file in `src/test/vanilla/src/index.tsx` to experiments with the components.
