import React from 'react';
import ReactDOM from 'react-dom';
import {HomepageTemplate} from "homepage-template";
import headerImg from "./assets/header/header-img-example.jpeg";
import type { Data } from "homepage-template";
import { ReactComponent as LogoSvg } from "./assets/header/Logo.svg";
import mainSectionImage from "./assets/main-section/section-image-example.jpeg";
import { ReactComponent as SliderLogo1 } from "./assets/review-slider/app-store.svg";
import { ReactComponent as SliderLogo2 } from "./assets/review-slider/photos.svg";
import { ReactComponent as SliderLogo3 } from "./assets/review-slider/twitter.svg";
import { ReactComponent as Reddit } from "./assets/svg/reddit.svg";
import { ReactComponent as Twitter } from "./assets/svg/twitter.svg";
import { ReactComponent as YouTube } from "./assets/svg/youTube.svg";


const data: Data = {
  "header": {
      "background": {
          "colorOrUrlDark": "black",
          "colorOrUrlLight": "unset",
          "type": "color"
      },
      "buttons": [
          {
              "url": "",
              "name": "learn more"
          },
          {
              "url": "",
              "name": "try it"
          }
      ],

      "imageUrl": headerImg,
      "paragraph": `
Dum apud Persas, ut supra **narravimus**, perfidia 
regis motus agitat insperatos, et in eois tractibus 
bella rediviva consurgunt, anno sexto decimo et eo 
diutius post **Nepotiani** exitium, saeviens per urbem 
aeternam urebat cuncta Bellona, ex primordiis minimis 
ad clades excita luctuosas, quas obliterasset utinam 
iuge silentium! ne forte paria quandoque temptentur, 
plus exemplis generalibus nocitura quam delictis.
      `,
      "title": "Main Title",
      "subTitle": "Sub Title",
      "topBarProps": {
          "logo": {
              LogoSvg,
              "logoFill": {
                  "dark": "white",
                  "light": "black"
              }
          },
          "githubRepoUrl": "https://github.com/thieryw/homepage-template",
          "menu": {
              "items": [
                  {
                      "name": "documentation",
                      "url": ""

                  },
                  {
                      "name": "github",
                      "url": ""
                  }
              ],
              "smallDeviceBreakPointPx": 530
          }
      }
  },
  "mainSection": [
      {
          "imageHasFrame": false,
          "imageUrl": mainSectionImage,
          "article": {
              "title": "Lorem Ipsum",
              "paragraph": `
Dum apud Persas, ut supra narravimus, perfidia 
regis motus agitat insperatos, et in eois tractibus 
bella rediviva consurgunt, anno sexto decimo et eo 
diutius post **Nepotiani exitium**, saeviens per urbem 
aeternam urebat cuncta Bellona, ex primordiis minimis 
ad clades excita luctuosas, quas obliterasset utinam 
iuge silentium! ne forte paria quandoque temptentur, 
plus exemplis generalibus nocitura quam delictis.

              `
          }
      },

      {
          "imageHasFrame": false,
          "imageUrl": mainSectionImage,
          "article": {
              "title": "Lorem Ipsum",
              "paragraph": `
Dum apud Persas, ut supra narravimus, perfidia 
regis motus agitat insperatos, et in eois tractibus 
bella rediviva consurgunt, anno sexto decimo et eo 
diutius post **Nepotiani exitium**, saeviens per urbem 
aeternam urebat cuncta Bellona, ex primordiis minimis 
ad clades excita luctuosas, quas obliterasset utinam 
iuge silentium! ne forte paria quandoque temptentur, 
plus exemplis generalibus nocitura quam delictis.

              `
          }
      },

      {
          "imageHasFrame": false,
          "imageUrl": mainSectionImage,
          "article": {
              "title": "Lorem Ipsum",
              "paragraph": `
Dum apud Persas, ut supra narravimus, perfidia 
regis motus agitat insperatos, et in eois tractibus 
bella rediviva consurgunt, anno sexto decimo et eo 
diutius post **Nepotiani exitium**, saeviens per urbem 
aeternam urebat cuncta Bellona, ex primordiis minimis 
ad clades excita luctuosas, quas obliterasset utinam 
iuge silentium! ne forte paria quandoque temptentur, 
plus exemplis generalibus nocitura quam delictis.

              `
          }
      },
  ],

  "reviewSlider": [
      {
          "Logo": SliderLogo1,
          "description": "Dum apud Persas, ut supra narravimus, perfidia regis motus agitat insperatos, et in eois tractibus bella rediviva consurgunt, anno sexto decimo et eo diutius post Nepotiani exitium, saeviens per urbem aeternam urebat cuncta Bellona, ex primordiis minimis ad clades excita luctuosas, quas obliterasset utinam iuge silentium! ne forte paria quandoque temptentur, plus exemplis generalibus nocitura quam delictis.",
          "signature": "Lorem Ipsum"

      },
      {
          "Logo": SliderLogo2,
          "description": "Dum apud Persas, ut supra narravimus, perfidia regis motus agitat insperatos, et in eois tractibus bella rediviva consurgunt, anno sexto decimo et eo diutius post Nepotiani exitium, saeviens per urbem aeternam urebat cuncta Bellona, ex primordiis minimis ad clades excita luctuosas, quas obliterasset utinam iuge silentium! ne forte paria quandoque temptentur, plus exemplis generalibus nocitura quam delictis.",
          "signature": "Lorem Ipsum"

      },
      {
          "Logo": SliderLogo3,
          "description": "Dum apud Persas, ut supra narravimus, perfidia regis motus agitat insperatos, et in eois tractibus bella rediviva consurgunt, anno sexto decimo et eo diutius post Nepotiani exitium, saeviens per urbem aeternam urebat cuncta Bellona, ex primordiis minimis ad clades excita luctuosas, quas obliterasset utinam iuge silentium! ne forte paria quandoque temptentur, plus exemplis generalibus nocitura quam delictis.",
          "signature": "Lorem Ipsum"

      },
  ],

  "footer": {
      "leftItems": [
          {
              "name": "Documentation",
              "url": ""
          },
          {
              "name": "Github",
              "url": ""
          }
      ],
      "rightItems": [
          {
              "logoSvgComponent": Twitter,
              "name": "Twitter",
              "url": ""
          },
          {
              "logoSvgComponent": Reddit,
              "name": "Reddit",
              "url": ""
          },
          {
              "logoSvgComponent": YouTube,
              "name": "Youtube",
              "url": ""

          }
      ],
      "licence": "M I T Licence",

  }

}

ReactDOM.render(
  <React.StrictMode>
    <HomepageTemplate {...data}/>
  </React.StrictMode>,
  document.getElementById('root')
);
