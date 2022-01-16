<p align="center">
    <img src="https://user-images.githubusercontent.com/39378411/135892116-24367dcb-e0b4-4e16-a1c0-952c7f5bef9a.png">  
</p>
<p align="center">
    <i>✒️ Showcase your open source project with a good-looking webpage ✒️</i>
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
  <a href="https://www.gitlanding.dev/storybook">Components</a> - 
  <a href="https://docs.gitlanding.dev/">Documentation</a>
</p>

Gitlanding helps you create a beautiful landing page for your GitHub projects in three simple steps:

-   Start from a blank [React App](https://create-react-app.dev/) on a branch of your repository.
-   Import some [`gitlanding` components](https://www.gitlanding.dev/storybook/).
-   Auto deploy with [GitHub Actions](https://github.com/features/actions), host it using [GitHub page](https://pages.github.com/)!

Don't worry, you will be guided every step of the way with specific instruction for **MacOS**, **Widows** and **Linux**.  
Setting up a GitLanding page is a great practical introduction to [GitHub Actions](https://github.com/features/actions) and [GitHub page](https://pages.github.com/).

# Motivation

There is no shortage of website generators that enable the creation of decent-looking landing pages.
The problem, however, is that if your project grows you will eventually need to incorporate
features like internationalisation, routing, and other functionalities that your website generator
mat not be able to accommodate.

The approach of `gitlanding` is to provide a library of customisable React component
designed to be fitting budding blocks for a landing page.  
This way your little landing page is a react project capable of growing into a more mature project if need be.

> You can have both a landing page (e.g.: `www.your-project.dev`) and a documentation website (e.g.: `docs.your-project.dev`).  
> For creating documentation website [GitBook](https://gitbook.com) is better fit than Gitlanding. GitBook is free for open source
> projects (you just need to [issue a request](https://user-images.githubusercontent.com/6702424/148654719-bf393721-4bf4-4814-a8ef-cf57a3318a7f.png)).

# Showcase

Websites using gitlanding.

-   [Gitlanding.dev itself](https://www.gitlanding.dev/)
-   [SSPCloud.fr](https://www.sspcloud.fr)
-   [tsafe.dev](https://www.tsafe.dev/)
-   [powerhooks.dev](https://www.powerhooks.dev/)

https://user-images.githubusercontent.com/6702424/148715912-64485db0-ae26-474f-a6ce-b9a142a419e0.mp4

https://user-images.githubusercontent.com/6702424/148716227-4a699c07-ba17-4860-b4bb-9feeed8b7662.mp4

# 🚀 Quick start

Heads over to [the documentation website 📙](https://docs.gitlanding.dev/)!

[![kickstart_video](https://user-images.githubusercontent.com/6702424/148655634-bcc2ef69-9720-4224-9da5-0af88eb9d906.png)](https://youtu.be/taDGhL0z7wc)

# Dev

> NOTE: These are the commands for **contributing**.
> If you just want to start **using** GitLanding it's [here](https://docs.gitlanding.dev/)

```bash
git clone https://github.com/thieryw/gitlanding && cd gitlanding
yarn install
yarn build
# To start the test project
yarn start_vanilla
```

Edit the file in `src/test/vanilla/src/index.tsx` to experiments with the components.
