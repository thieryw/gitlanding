import React from 'react';
import ReactDOM from 'react-dom';
import {GlTemplate} from "gitlanding/GlTemplate";
import {GlHeader} from "gitlanding/GlHeader";
import {GlLogo} from "gitlanding/utils/GlLogo";
import {GlHero} from "gitlanding/GlHero";
import heroImageUrl from "./assets/img/hero-image.png";
import {GlArticle} from "gitlanding/GlArticle"
import {GlIllustration} from "gitlanding/GlIllustration"
import {GlFooter} from "gitlanding/GlFooter";
import {GlSectionDivider} from "gitlanding/GlSectionDivider";
import {GlCards} from "gitlanding/GlCards"
import {GlLogoCard} from "gitlanding/GlCards/GlLogoCard";
import onyxiaLogoSrc from "./assets/svg/OnyxiaLogo.svg";
import tsafePngSrc from "./assets/img/tsafe.png";
import onyxiaPng from "./assets/img/onyxia-ui.png";
import logoPng from "./assets/img/logo.png";
import logoSmallPng from "./assets/img/logo-small.png";
import materialUiPngUrl from "./assets/img/material-ui.png";
import powerhooksLogoSrc from "./assets/svg/powerhooksLogo.svg";
import sspcloudMp4 from "./assets/videos/sspcloud.mp4";
import sspcloudRouteMp4 from "./assets/videos/sspcloud-route.mp4";
import { ThemeProvider } from "./theme";
import { GlYoutubeVideoSection } from "gitlanding/GlYoutubeVideoSection";
import { GlCheckList } from "gitlanding/GlCheckList";


ReactDOM.render(
  <React.StrictMode>
    <GlTemplate
      ThemeProvider={ThemeProvider}
      hasTopOfPageLinkButton={true}
      headerOptions={{
        "position": "fixed",
        "isRetracted": "smart"

      }}
      header={<GlHeader
        links={[
          {
            "label": "GITHUB",
            "link": { "href": "https://github.com/thieryw/gitlanding" },
          },
          {
            "label": "DOCUMENTATION",
            "link": { "href": "https://docs.gitlanding.dev/" },
          },
          {
            "label": "STORYBOOK",
            "link": {
              "href": "https://www.gitlanding.dev/storybook"
            }
          }
        ]}
        title={<GlLogo logoUrl={logoPng} width={200} />}
        titleSmallScreen={<GlLogo logoUrl={logoSmallPng} width={80} />}
        enableDarkModeSwitch={true}
        githubRepoUrl="https://github.com/thieryw/gitlanding"
        githubButtonSize="large"
        isCollapsible={true}
      />}
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
                "href": "https://www.gitlanding.dev/storybook"
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
            url={sspcloudMp4}
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
        illustration={<GlIllustration
          type="image"
          hasShadow={true}
          url={materialUiPngUrl}
        />}
        title="Material UI integration"
        body={`Gitlanding uses a custom version of the **Material UI** theme, so you can use any of MUI's components within a Gitlanding page.`}
        buttonLabel="Learn more"
        buttonLink={{
          "href": "https://docs.gitlanding.dev/customization"
        }}
        hasAnimation={true}
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
            url={sspcloudRouteMp4}
            hasShadow={true}
          />
        }
        buttonLabel="See Example Project"
        buttonLink={{
          "href": "https://www.sspcloud.fr/"
        }}
        illustrationPosition="left"

      />

      <GlSectionDivider />

      <GlArticle
        title="Highly Customizable"
        body={`Gitlanding uses a fully customizable ui toolkit based on Material Ui that gives you the possibility of easily changing or adding to the theme. For example you may want to use your own color set or typography.`}
        buttonLabel="Learn more"
        buttonLink={{
          "href": "https://docs.gitlanding.dev/customization"
        }}
        illustration={
          <GlIllustration
            type="image"
            url={onyxiaPng}
          />
        }
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
          paragraph="A collection of utilities to step up your TypeScript game."
          iconUrls={[tsafePngSrc]}
          buttonLabel="View project"
          link={{
            "href": "https://github.com/garronej/tsafe"
          }}
        />

        <GlLogoCard
          title="Powerhooks"
          paragraph="A collection of essential React hooks."
          buttonLabel="View project"
          link={{
            "href": "https://www.powerhooks.dev/"
          }}
          iconUrls={[powerhooksLogoSrc]}
        />
      </GlCards>

      <GlYoutubeVideoSection
        buttonLabel="Documentation"
        title="A short video to get you started"
        src="https://www.youtube.com/embed/taDGhL0z7wc"
        hasAnimation={true}
        link={{
          "href": "https://docs.gitlanding.dev/"
        }}
      />

      <GlSectionDivider />

      <GlCheckList 
        hasAnimation={true}
        heading="Why Gitlanding"
        elements={[
          {
            "title": "Open source",
            "description": "gitlanding is 100% free with no paid plans or branding."
          },
          {
            "title": "Easy to use",
            "description": "Just add blocks to your index file and every thing neatly slides into place."
          },
          {
            "title": "Scalable",
            "description": "You can easily go from a simple landing page to a more complex website."
          },
          {
            "title": "Performance",
            "description": "Each generated page scores over 90 in google lighthouse."
          },
          {
            "title": "Customizable",
            "description": "Change fonts, color schemes or restyle components to your liking with ease thanks to TSS-React and Onyxia-ui."
          },
          {
            "title": "Material Ui",
            "description": "You can use any Material Ui component within a Gitlanding project"
          }
        ]}
      />


    </GlTemplate>
  </React.StrictMode>,
  document.getElementById('root')
);

