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
import { ReactComponent as OnyxiaLogo } from "./assets/svg/OnyxiaLogo.svg";


ReactDOM.render(
  <React.StrictMode>
    <GlTemplate
      SplashScreenLogo={OnyxiaLogo}
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
            "label": "COMPONENTS",
            "link": {
              "href": "https://www.gitlanding.dev/storybook"
            }
          }
        ]}
        title={<GlLogo logoUrl={logoPng} width={200} />}
        titleSmallScreen={<GlLogo logoUrl={logoSmallPng} width={80} />}
        enableDarkModeSwitch={true}
        githubRepoUrl="https://github.com/thieryw/gitlanding"
        showGithubStarCount={true}
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
          bottomDivContent="M.I.T License"
        />
      }
    >
      <GlHero
        title="Showcase your GitHub repo with a good looking webpage"
        subTitle="It's 100% free and open source software and it only takes a few minutes to setup."
        imageSrc={heroImageUrl}
        linkToSectionBelowId="sectionBellow"
        hasImageShadow={false}
      />

      <GlArticle
        id="sectionBellow"
        title="Everything you see has been created using `<GitLanding/>`"
        illustrationPosition="left"
        body={`
It works in 3 steps:

- Start from a blank [React App](https://create-react-app.dev/) on a new branch.
- Compose your page using [gitlanding components](https://www.gitlanding.dev/storybook/)
- Auto deploy with [GitHub Actions](https://github.com/features/actions), host it using [GitHub pages](https://pages.github.com)!  

Don't worry, you will be guided every step of the way!
`}
        illustration={
          <GlIllustration
            type="image"
            url={sspcloudMp4}
            hasShadow={true}
          />
        }
        hasAnimation={true}
        buttonLabel="Get started  🚀"
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
        title="MUI integration"
        body={`You can use components from [\`@mui/material\`](https://mui.com/), they will automatically adjust to your GitLanding theme and blend in perfectly.`}
        hasAnimation={true}
      />

      <GlSectionDivider />

      <GlArticle
        title="Build as your project grows"
        body={`
There is no shortage of website generators that enable the creation of decent looking landing pages. The problem, however, is that if your project grows, you will eventually need to incorporate features like internationalization, routing, and other functionalities that your website generator may not be able to accommodate.

The approach of gitlanding is to provide a library of customizable React component designed to be fitting building blocks for a landing page.
This way your little landing page is a react project capable of growing into a more mature project if need be.
`}
        hasAnimation={true}
        illustration={
          <GlIllustration
            type="image"
            url={sspcloudRouteMp4}
            hasShadow={true}
          />
        }
        buttonLabel="Documentation 📙"
        buttonLink={{
          "href": "https://docs.gitlanding.dev"
        }}
        illustrationPosition="left"

      />

      <GlSectionDivider />

      <GlArticle
        title="Highly Customizable"
        body={`Gitlanding is built with customizable ui toolkit based on MUI that gives you the possibility of easily changing or adding to the theme. It enables you for example to use your own color set or typography.`}
        buttonLabel="Learn more 💅"
        buttonLink={{
          "href": "https://github.com/InseeFrLab/onyxia-ui"
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
            "href": "https://www.tsafe.dev/"
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
        buttonLabel="Documentation 📙"
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
            "title": "It's a passion project",
            "description": " It doesn't need to make money, it's **Free and open source** and will stay that way."
          },
          {
            "title": "Markdown support",
            "description": `
Every block of text is rendered as \`Markdown\`. 
You can **easily** apply *formatting* just like you are used to in your [READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
            `
          },
          {
            "title": "Scalable",
            "description": `
A GitLanding project is a React project! 
You can go from a simple landing page assembled in a few minutes to a fully-fledged website with advanced features.
`
          },
          {
            "title": "Performance",
            "description": "Each generated page scores over **90/100** in [Google lighthouse](https://developers.google.com/web/tools/lighthouse)."
          },
          {
            "title": "Customizable",
            "description": "[Change fonts](https://docs.gitlanding.dev/master/custom-fonts), color schemes or restyle components to your liking with ease thanks to [`tss-react`](https://github.com/garronej/tss-react) and [`onyxia-ui`](https://github.com/InseeFrLab/onyxia-ui)."
          },
          {
            "title": "MUI compatibility",
            "description": "You can use [any MUI component](https://mui.com/components/autocomplete/) within a Gitlanding project"
          }
        ]}
      />


    </GlTemplate>
  </React.StrictMode>,
  document.getElementById('root')
);

