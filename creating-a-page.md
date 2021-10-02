---
description: Create your landingpage with GitLanding
---

# Using GitLanding

{% hint style="info" %}
You can preview the components in [Storybook](https://www.gitlanding.dev/storybook)
{% endhint %}

{% hint style="info" %}
If you have bootstraped your page using `create-react-app` there is a[ lot of things](https://github.com/thieryw/crispy-octo-bassoon/commit/431679969c454772605d2d16ad69290559a43cba) you can delete. 
{% endhint %}

```text
yarn add gitlanding
```

Copy paste the the following skeletton in `src/index.tsx`,  run `yarn start` and start hacking around 🚀

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {GlTemplate} from "gitlanding";


ReactDOM.render(
  <React.StrictMode>
    <GlTemplate>

    </GlTemplate>
  </React.StrictMode>,
  document.getElementById('root')
);
```

{% hint style="success" %}
Host your assets by placing them [in a dedicated directory in your `src` folder](https://github.com/thieryw/gitlanding/tree/006bc0507cabe327e4b0d7df5613877caa146142/src/assets/img). An then [importing them as URLs directly in your code](https://github.com/thieryw/gitlanding/blob/006bc0507cabe327e4b0d7df5613877caa146142/src/index.tsx#L10).
{% endhint %}

####  

