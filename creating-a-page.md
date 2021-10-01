---
description: 'In this guide, I will show you how to create a simple page with Gitlanding'
---

# Creating a page

**For detailed view of all our components go to our** [**storybook**](https://sb.gitlanding.dev/)**.**

First of all, if you haven**'**t done it all ready;

```text
yarn add gitlanding
```

If you have used create-react-app, you can delete all the files in the src folder except `index.tsx` and `react-app-env.d.ts`.

The following command should make it quick and easy, but use it carefully:

```text
find ./src/ -type f -not \( -name "index.tsx" -or -name "react-app-env.d.ts" \) -delete
```

Now paste the following code to your `index.tsx` file, replacing what is already there ;

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

####  Important!

All the Gitlanding components that you use must be wrapped inside the `GlTemplate` component. This is important because it provides a default **theme provider**  that you can update or overwrite as befits your needs. 

For more details on customising the theme, follow the link below:

{% page-ref page="using-your-own-theme.md" %}

#### Setting up the header

The `GlTemplate` component takes a `header` prop whose type is a `ReactNode`. Just import the `GlHeader` component from Gitlanding and put it in the header prop:

```jsx
import {GlHeader} from "gitlanding";
```

You can specify your title, an array of links, your github repo url and if you want a dark mode switch.

In the following example, the header options are set so that it folds or unfolds according to the user's scroll direction.

```jsx
    <GlTemplate
      headerOptions={{
        "position": "fixed",
        "isRetracted": "smart"
      }}
      header={
        <GlHeader 
          title="your title"
          links={[
            {
              "label": "link 1",
              "link": {
                "href": "https://example1.com"
              }
            },
            {
              "label": "link 2",
              "link": {
                "href": "https://example2.com"
              }
            },
            {
              "label": "link 3",
              "link": {
                "href": "https://example3.com"
              }
            },
          ]}
          enableDarkModeSwitch={true}
          githubRepoUrl="https://github.com/your-user-name/your-repo-name"
        />
      }
    >

    </GlTemplate>
```

#### Adding the footer

The footer is set in the same way as the header. Fill in the `GlTemplate` footer prop as illustrated below.

```jsx
import {GlFooter} from "gitlanding";
```

```jsx
    <GlTemplate
      footer={<GlFooter 
        bottomDivContent="M.I.T Licence"
        email="your-email@email.com"
        phoneNumber="+33644532377"
        links={[
          {
            "title": "Link 1",
            "href": "https://example1.com"
          },
          {
            "title": "Link 1",
            "href": "https://example1.com"
          },
          {
            "title": "Link 1",
            "href": "https://example1.com"
          }
        ]}

      />}
      >
      
```

#### Creating your page content

All you have to do now is inject your page content  as `GlTemplate` children. You can choose components from our library \(See our [storybook](https://sb.gitlanding.dev) for a comprehensive list of components\) and you can even inject some of your own if you are willing, then make a pull request. Contributions are most welcome.

