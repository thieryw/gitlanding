---
description: Create your landing page with Gitlanding
---

# 📝 Customising pages

Now, if the previous steps went smoothly, you can start modifying and of adding to the template code as befits your needs ! 🚀

If you wish to import files sush as webm or mp4 files in your project you must declare them as modules. Copy and paste the following example in the `src/react-app-env.d.ts` file.

```
//Replace <webm> with the extension name of your choice
```

```typescript
declare module "*.webm" {
	const _default: string;
	export default _default;
}
```

{% hint style="success" %}
Host your assets by placing them [in a dedicated directory in your `src` folder](https://github.com/thieryw/test-gl-template/tree/b076e2e75d80da9dc832e1f2519636f6ebde450f/src/assets/img). An then [importing them as URLs directly in your code](https://github.com/thieryw/test-gl-template/blob/b076e2e75d80da9dc832e1f2519636f6ebde450f/src/pages/Home.tsx#L8-L14).
{% endhint %}

In this [example](https://github.com/thieryw/test-gl-template/commit/cf090220fecd352ba4f0eb083e385cafb167dac5) I create a new article in the `Home` page that has an mp4 video along side it. I also added a section devider to seperate it from the article above. You will notice that I do not hard code the text directly inside the component, but I use a translation function that enables me to switch between English and French. See [i18nifty](https://www.i18nifty.dev/) documentation to learn about the translation engine setup.

The components I used are:

* ``[`GlArticle`](https://www.gitlanding.dev/storybook/?path=/story/sandbox-main-glarticle--vue-with-image)``
* ``[`GlSectionDevider`](https://www.gitlanding.dev/storybook/?path=/story/sandbox-main-glsectiondivider--vue)``

{% hint style="info" %}
You can preview all the components in [Storybook](https://www.gitlanding.dev/storybook)
{% endhint %}
