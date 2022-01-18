# Defining routes

In this part we will be using [type-route](https://github.com/typehero/type-route) to define a React router and [github-pages-plugin-for-type-route](https://github.com/garronej/github-pages-plugin-for-type-route) so that it will work on Github pages. This will enable you to have multiple pages on a single page application hosted by Github pages.

```bash
yarn add type-route
yarn add github-pages-plugin-for-type-route
```

{% hint style="success" %}
[Create the `router.ts` file at the root of your `src` folder and and define a Reate router with `type-route`.](https://github.com/thieryw/crispy-octo-bassoon/commit/2cf3534596ba7a41fadc8c959b21aa3084eeeef0)
{% endhint %}

{% hint style="success" %}
[Create a `pages` folder at the root of your `src` folder in whitch you will place the components you wish to be pages.](https://github.com/thieryw/crispy-octo-bassoon/commit/08998714b9b2871dc0194b428dfad28f04dbf853)
{% endhint %}

{% hint style="success" %}
[Update your `header` and `footer` so that the links point to your newly create routes, Insert the page components you have created and wrap your `App` in the RouteProvider that is imported from the router.ts file.](https://github.com/thieryw/crispy-octo-bassoon/commit/d81a6598c68f06dd5fa27b9fa02589637b3b8f52)
{% endhint %}
