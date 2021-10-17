---
description: Create your landing page with Gitlanding
---

# Using Gitlanding

{% hint style="info" %}
You can preview the components in [Storybook](https://www.gitlanding.dev/storybook) 
{% endhint %}

{% hint style="info" %}
If you have bootstraped your page using `create-react-app` there is a[ lot of things](https://github.com/thieryw/crispy-octo-bassoon/commit/431679969c454772605d2d16ad69290559a43cba) you can delete. 
{% endhint %}

```
yarn add gitlanding onyxia-ui @mui/material @emotion/react @emotion/styled tss-react powerhooks
```

{% hint style="info" %}
If you want to use icons from [mui](https://mui.com/components/material-icons/)
{% endhint %}

```
yarn add @mui/icons-material
```

Copy paste the the following skeletton in `src/index.tsx`,  run `yarn start` and start hacking around🚀

```typescript
import { render } from "react-dom";
import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlArticle } from "gitlanding/GlArticle";
import { GlIllustration } from "gitlanding/GlIllustration";
import { GlFooter } from "gitlanding/GlFooter";
import {GlSectionDivider} from "gitlanding/GlSectionDivider";

function App() {
  return (
    <GlTemplate
      header={
        <GlHeader
          title="Header title"
          links={[
            {
              "label": "link 1",
              "link": { "href": "https://example.com" },
            },
            {
              "label": "link 2",
              "link": { "href": "https://example.com" },
            },
            {
              "label": "link 3",
              "link": { "href": "https://example.com" },
            },
          ]}
          enableDarkModeSwitch={true}
          githubRepoUrl="https://github.com/torvalds/linux"
          githubButtonSize="large"
        />
      }
      headerOptions={{
        "position": "fixed",
        "isRetracted": "smart",
      }}
      footer={
        <GlFooter 
          bottomDivContent="Licence M I T"
          email="email@email.com"
          phoneNumber="+33545345676"
          links={[
            {
              "href": "https://example.com",
              "title": "link 1"
            },
            {
              "href": "https://example.com",
              "title": "link 2"
            },
            {
              "href": "https://example.com",
              "title": "link 3"
            },
          ]}
        />
      }
    >
      <GlHero
        title="Hero title"
        subTitle={"Hero subtitle"}
        imageSrc="https://user-images.githubusercontent.com/39378411/135731749-4a723d4e-52ea-49b7-83c1-7da4db8f3f59.png"
        linkToSectionBelowId="firstSection"
      />

      <GlArticle
        id="firstSection"
        title="Article title"
        body="Article body"
        buttonLabel="Article Button label"
        buttonLink={{
          "href": "https://example.com",
        }}
        illustration={
          <GlIllustration type="image" url="https://user-images.githubusercontent.com/39378411/135731808-6cf3e4dd-1047-4a0a-95be-65fdd6947315.png" />
        }
        animationVariant="primary"
        illustrationPosition="left"
      />

      <GlSectionDivider />

      <GlArticle
        title="Article title"
        body="Article body"
        buttonLabel="Article Button label"
        buttonLink={{
          "href": "https://example.com",
        }}
        illustration={
          <GlIllustration type="image" url="https://user-images.githubusercontent.com/39378411/135731816-5ba39459-d95e-413d-b515-92a7b0dc5acf.png" />
        }
        animationVariant="secondary"
      />

    </GlTemplate>
  );
}

render(<App />, document.getElementById("root"));
```

{% hint style="success" %}
Host your assets by placing them [in a dedicated directory in your `src` folder](https://github.com/thieryw/gitlanding/tree/006bc0507cabe327e4b0d7df5613877caa146142/src/assets/img). An then [importing them as URLs directly in your code](https://github.com/thieryw/gitlanding/blob/006bc0507cabe327e4b0d7df5613877caa146142/src/index.tsx#L10).
{% endhint %}

####  
