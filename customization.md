---
description: Changing the look and feel of your landingpage.
---

# Advanced customization

A proper documentation is comming but in the meantime you can checkout how the website [sspcloud.fr](https://www.sspcloud.fr) have extended GitLanding by:

* [Defining it's custome style](https://github.com/InseeFrLab/www.sspcloud.fr/blob/main/src/app/theme.ts)
* [Defining a React router](https://github.com/InseeFrLab/www.sspcloud.fr/blob/main/src/app/router.ts). Using [`type-route`](https://github.com/typehero/type-route)
* [Adding internationalization](https://github.com/InseeFrLab/www.sspcloud.fr/blob/main/src/app/i18n/translations.ts)

You can also checkout [`onyxai-ui`](https://github.com/garronej/onyxia-ui), the design toolkit onto which it built Gitlanding.

Note also that you can import any [Material-ui v5](https://mui.com) component in your GitLanding project. They will fit in nicely and blend in with your theme. 

### Using a custom font

{% hint style="success" %}
[This commit on the example project will show you how it is done](https://github.com/thieryw/crispy-octo-bassoon/commit/978544412d187aa1593715e0cc4b12678ba15ac2).
{% endhint %}

