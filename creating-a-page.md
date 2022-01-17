---
description: Create your landing page with Gitlanding
---

# Using Gitlanding

```
yarn add gitlanding onyxia-ui @mui/material @emotion/react @emotion/styled tss-react powerhooks
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
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { GlCards } from "gitlanding/GlCards";
import { GlLogoCard } from "gitlanding/GlCards/GlLogoCard";
import { GlProjectCard } from "gitlanding/GlCards/GlProjectCard";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlSlider } from "gitlanding/GlSlider";
import { GlReviewSlide } from "gitlanding/GlReviewSlide";

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
        body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.`}
        buttonLabel="Article Button label"
        buttonLink={{
          "href": "https://example.com",
        }}
        illustration={
          <GlIllustration type="image" url="https://user-images.githubusercontent.com/39378411/135731808-6cf3e4dd-1047-4a0a-95be-65fdd6947315.png" />
        }
        hasAnimation={true}
        illustrationPosition="left"
      />

      <GlCards>
        {
          <>
            <GlLogoCard
              title="Card title"
              paragraph={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
                nisl nec hendrerit rutrum, 
                mi enim semper arcu, ut imperdiet urna libero non metus.`
              }
              buttonLabel="Button Label"
              iconUrls={[
                "https://user-images.githubusercontent.com/39378411/135731999-a2d8f901-3d7d-40a9-b59f-102ee1facc45.png",
                "https://user-images.githubusercontent.com/39378411/135731995-136d4baf-58a6-4cb3-a72c-b8ddce835b3c.png"
              ]}
            />
            <GlLogoCard
              title="Card title"
              paragraph={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
                nisl nec hendrerit rutrum, 
                mi enim semper arcu, ut imperdiet urna libero non metus.`
              }
              buttonLabel="Button Label"
              iconUrls={[
                "https://user-images.githubusercontent.com/39378411/135731998-e01a7970-a7c4-4041-b07c-341e075207d2.png"
              ]}
            />

            <GlLogoCard
              title="Card title"
              paragraph={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
                nisl nec hendrerit rutrum, 
                mi enim semper arcu, ut imperdiet urna libero non metus.`
              }
              buttonLabel="Button Label"
              iconUrls={[
                "https://user-images.githubusercontent.com/39378411/135731991-3da13e97-c2f7-42b2-88ab-055aff0d6ae9.png",
                "https://user-images.githubusercontent.com/39378411/135731994-29a3c46a-0d92-4ec8-954e-39bfeeb06534.png",
                "https://user-images.githubusercontent.com/39378411/135731998-e01a7970-a7c4-4041-b07c-341e075207d2.png",
                "https://user-images.githubusercontent.com/39378411/135731990-8f64ce8e-d655-4ded-9561-3d7f6893d06e.png"
              ]}
              overlapIcons={true}

            />
          </>
        }

      </GlCards>

      <GlSectionDivider />

      <GlArticle
        title="Article title"
        body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.`}
        buttonLabel="Article Button label"
        buttonLink={{
          "href": "https://example.com",
        }}
        illustration={
          <GlIllustration type="image" url="https://user-images.githubusercontent.com/39378411/135731816-5ba39459-d95e-413d-b515-92a7b0dc5acf.png" />
        }
        hasAnimation={true}
      />

      <GlCards>
        <>
          <GlProjectCard
            title="Project Card Title"
            subtitle="Project Card Subtitle"
            projectImageUrl="https://user-images.githubusercontent.com/39378411/135731821-0f1c7165-fada-418f-896a-c36a0e55171b.png"
          />
          <GlProjectCard
            title="Project Card Title"
            subtitle="Project Card Subtitle"
            projectImageUrl="https://user-images.githubusercontent.com/39378411/135731810-93193eba-ada5-460a-96ad-948215278850.png"
          />
          <GlProjectCard
            title="Project Card Title"
            subtitle="Project Card Subtitle"
            projectImageUrl="https://user-images.githubusercontent.com/39378411/135731819-1cf18697-e946-449f-ad6e-be414e341c40.png"
          />
          <GlProjectCard
            title="Project Card Title"
            subtitle="Project Card Subtitle"
            projectImageUrl="https://user-images.githubusercontent.com/39378411/135731914-0265b77e-3338-4747-b014-e845f16332a7.png"
          />
        </>
      </GlCards>

      <GlSectionDivider />

      <GlCheckList
        heading="Check List Heading"
        hasAnimation={true}
        elements={[
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
          {
            "title": "List element title",
            "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `
          },
        ]}
      />

      <GlSectionDivider />

      <GlSlider
        title="Review slider title"
        autoPlayTimeInterval={4}
        slides={[
          <GlReviewSlide
            logoUrl="https://user-images.githubusercontent.com/39378411/135731994-29a3c46a-0d92-4ec8-954e-39bfeeb06534.png"
            descriptionMd={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.
            `}
            signature="Signature"
          />,
          <GlReviewSlide
            logoUrl="https://user-images.githubusercontent.com/39378411/135731995-136d4baf-58a6-4cb3-a72c-b8ddce835b3c.png"
            descriptionMd={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.
            `}
            signature="Signature"
          />,
          <GlReviewSlide
            logoUrl="https://user-images.githubusercontent.com/39378411/135731999-a2d8f901-3d7d-40a9-b59f-102ee1facc45.png"
            descriptionMd={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.
            `}
            signature="Signature"
          />
        ]}
      />




    </GlTemplate>
  );
}

render(<App />, document.getElementById("root"));
```

{% hint style="success" %}
Host your assets by placing them [in a dedicated directory in your `src` folder](https://github.com/thieryw/gitlanding/tree/006bc0507cabe327e4b0d7df5613877caa146142/src/assets/img). An then [importing them as URLs directly in your code](https://github.com/thieryw/gitlanding/blob/006bc0507cabe327e4b0d7df5613877caa146142/src/index.tsx#L10).
{% endhint %}

{% hint style="info" %}
You can preview the components in [Storybook](https://www.gitlanding.dev/storybook)&#x20;
{% endhint %}

{% hint style="info" %}
If you have bootstraped your page using `create-react-app` there is a[ lot of things](https://github.com/thieryw/crispy-octo-bassoon/commit/431679969c454772605d2d16ad69290559a43cba) you can delete.&#x20;
{% endhint %}

#### &#x20;
