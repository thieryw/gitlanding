---
description: Create your landing page with Gitlanding
---

# 📝 Customising your app

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
Host your assets by placing them [in a dedicated directory in your `src` folder](https://github.com/thieryw/gitlanding/tree/006bc0507cabe327e4b0d7df5613877caa146142/src/assets/img). An then [importing them as URLs directly in your code](https://github.com/thieryw/gitlanding/blob/006bc0507cabe327e4b0d7df5613877caa146142/src/index.tsx#L10).
{% endhint %}

{% hint style="info" %}
You can preview the components in [Storybook](https://www.gitlanding.dev/storybook)
{% endhint %}

####
