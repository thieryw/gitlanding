---
description: Changing the look and feel of your landingpage.
---

# Advanced customization

A proper documentation is coming but in the meantime you can checkout how the website [sspcloud.fr](https://www.sspcloud.fr) have extended GitLanding by:

* [Defining it's custom style](https://github.com/InseeFrLab/www.sspcloud.fr/blob/main/src/app/theme.ts)
* Using [`type-route`](https://typehero.org/type-route/), you can [defining a React router](https://github.com/InseeFrLab/www.sspcloud.fr/blob/4c52c36de4216d6f3121601587b93a0cd0876daa/src/app/router.ts) and enable your website to features multiple pages (example: [this website](https://www.sspcloud.fr)), you will also need [this plugin](https://github.com/garronej/github-pages-plugin-for-type-route) to make it work with GitHub pages.&#x20;
* [Adding internationalisation](https://github.com/InseeFrLab/www.sspcloud.fr/blob/main/src/app/i18n/translations.ts)

You can also checkout [`onyxai-ui`](https://github.com/garronej/onyxia-ui), the design toolkit onto which Gitlanding is built.

Note also that you can import any [mui v5](https://mui.com) component in your GitLanding project. They will fit in nicely and blend in with your theme.&#x20;

