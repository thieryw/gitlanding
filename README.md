<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/149700453-81e535ba-7196-4765-88bd-ab2b30e6875b.png">  
</p>
<p align="center">
    <i>✒️ A set of components for creating landing pages with onyxia-ui ✒️</i>
    <br>
    <br>
    <a href="https://github.com/thieryw/gitlanding/actions">
      <img src="https://github.com/thieryw/gitlanding/workflows/ci/badge.svg?branch=main">
    </a>
    <a href="https://github.com/garronej/gitlanding/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/gitlanding">
    </a>
</p>

Gitlanding is an extension for [onyxia-ui](https://github.com/InseeFrLab/onyxia-ui) that features a set of
component for creating landing pages.

Example of gitlanding landing page:

-   https://www.sspcloud.fr
-   https://www.onyxia.sh
-   https://www.keycloakify.dev
-   https://www.tss-react.dev
-   https://www.i18nifty.dev

https://user-images.githubusercontent.com/6702424/148715912-64485db0-ae26-474f-a6ce-b9a142a419e0.mp4

https://user-images.githubusercontent.com/6702424/148716227-4a699c07-ba17-4860-b4bb-9feeed8b7662.mp4

# 🚀 Quick start

Try the demo project:

```bash
git clone https://github.com/garrone/gitlanding-demo
cd gitlanding-demo
yarn
yarn dev
```

> [!WARNING]: There are bugs when you use `<React.StrictMode />`...

> [!NOTE]  
> This project is an extension of [onyxia-ui](https://github.com/InseeFrLab/onyxia-ui) the
> gitlanding components needs be inside the `<OnyxiaUI>` provider.  
> Besides the required dependencies of onyxia-ui you only need to install `gitlanding`.

# Contributing

To link your local copy of gitlanding in the demo project:

```bash
cd ~/github
git clone https://github.com/thieryw/gitlanding
git clone https://github.com/garronej/gitlanding-demo
cd gitlanding
yarn link-in-demo
```

In another terminal:

```bash
cd ~/github/gitlanding-demo
yarn dev
```
