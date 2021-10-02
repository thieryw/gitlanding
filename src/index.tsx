import React from 'react';
import ReactDOM from 'react-dom';
import {GlTemplate} from "gitlanding/GlTemplate";
import {Header} from "./Header";
import {GlHero} from "gitlanding/GlHero";
import heroImageUrl from "./assets/img/hero-image.png";
import {GlArticle} from "gitlanding/GlArticle"
import {GlIllustration} from "gitlanding/GlIllustration"
import {GlFooter} from "gitlanding/GlFooter";
import exampleGif from "./assets/img/example.gif";
import {GlSectionDivider} from "gitlanding/GlSectionDivider";
import {GlCards} from "gitlanding/GlCards"
import {GlLogoCard} from "gitlanding/GlCards/GlLogoCard";
import onyxiaLogoSrc from "./assets/svg/OnyxiaLogo.svg";
import tsafePngSrc from "./assets/img/tsafe.png";
import exampleRouteGif from "./assets/img/with-route-example.gif";
import onyxiaPng from "./assets/img/onyxia-ui.png";



ReactDOM.render(
  <React.StrictMode>
    <GlTemplate

      headerOptions={{
        "position": "fixed",
        "isRetracted": "smart"

      }}
      header={<Header />}
      footer={

        <GlFooter
          links={
            [
              {
                "title": "Github",
                "href": "https://github.com/thieryw/gitlanding"
              },
              {
                "title": "Documentation",
                "href": "https://docs.gitlanding.dev/"
              },
              {
                "title": "Storybook",
                "href": "https://sb.gitlanding.dev"
              }
            ]
          }
          bottomDivContent="M.I.T Licence"
        />
      }
    >
      <GlHero
        title="A stylish landing page for your github repo"
        subTitle="It's all MIT, no paid plan, no hosting fees, it will go on Github Pages"
        imageSrc={heroImageUrl}
        linkToSectionBelowId="sectionBellow"
        hasImageShadow={true}
      />

      <GlArticle 
        id="sectionBellow"
        title="You are looking at a page created with Gitlanding"
        illustrationPosition="left"
        body={`Get started in but a few minutes by creating a **React App** and publishing it for free on **Github Pages**. 

See the documentation for a quick setup guide.
`}
        illustration={
          <GlIllustration 
            type="image"
            url={exampleGif}
            hasShadow={true}
          />
        }
        hasAnimation={true}
        buttonLabel="Documentation"
        buttonLink={{
          "href": "https://docs.gitlanding.dev/getting-started"
        }}
      />
      <GlSectionDivider />

      <GlArticle
        title="Build as your project grows"
        body={`**Gitlanding** is imported in react projects witch means that you can start with a simple landing page and evolve towards a more complex website.
For example you might want to have a routing system put in place. And you can even throw in an translation engine if this is your requirement. Each Gitlanding component can be imported and used individually for a specific need.
        `}
        hasAnimation={true}
        illustration={
          <GlIllustration 
            type="image"
            url={exampleRouteGif}
            hasShadow={true}
          />
        }
        buttonLabel="See Example Project"
        buttonLink={{
          "href": "https://www.sspcloud.fr/"
        }}

      />

      <GlSectionDivider />

      <GlArticle 
        title="Highly Customizable"
        body={`Gitlanding uses a fully customizable ui toolkit
that gives you the possibility of easily changing or adding to the theme.
For example you may want to use your own color set or typography.

To find out more about **Onyxia-ui** follow the link bellow.

        `}
        buttonLabel="Onyxia-ui"
        buttonLink={{
          "href": "https://github.com/garronej/onyxia-ui"
        }}
        illustration={
          <GlIllustration
            type="image"
            url={onyxiaPng}
          />
        }
        illustrationPosition="left"
        hasAnimation={true}
      />



      <GlCards
        title="Projects that use Gitlanding"
      >
        <GlLogoCard
          title="SSP Cloud"
          paragraph="Community space for the French's public service for the statistics."
          iconUrls={[onyxiaLogoSrc]}
          buttonLabel="View project"
          link={{
            "href": "https://www.sspcloud.fr/"
          }}
        />

        <GlLogoCard
          title="Tsafe"
          paragraph="A collection of utilities to step up your TypeScript game"
          iconUrls={[tsafePngSrc]}
          buttonLabel="View project"
          link={{
            "href": "https://github.com/garronej/tsafe"
          }}
        />
      </GlCards>


    </GlTemplate>
  </React.StrictMode>,
  document.getElementById('root')
);

