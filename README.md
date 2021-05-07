<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>Leverage the more advanced features of TypeScript</i>
    <br>
    <br>
    <img src="https://github.com/thieryw/homepage-template/workflows/ci/badge.svg?branch=main">
    <img src="https://img.shields.io/npm/dw/homepage-template">
    <img src="https://img.shields.io/npm/l/homepage-template">
</p>
<p align="center">
  <a href="https://github.com/thieryw/homepage-template">Home</a>
  -
  <a href="https://github.com/garronej/homepage-template">Documentation</a>
</p>

# Homepage Template

## A module that generates a homepage for your projects

# Install / Import

```bash
$ npm install --save homepage-template
```

```typescript
import { HomepageTemplate } from "homepage-template";
import type { TemplateData } from "homepage-template";
```

Specific imports:

```typescript
import { Header } from "homepage-template/src/components/App/Header";
import type { Props } from "homepage-template/src/components/App/Header";
```

# Basic usage

### This module is to be used in a React project.

here is a very basic way to use it:

```typescript
import React from "react";
import ReactDOM from "react-dom";
import { HomepageTemplate } from "homepage-template";
import type { TemplateData } from "homepage-template";

const data: TemplateData = {};

ReactDOM.render(
    <React.StrictMode>
        <div>
            <HomepageTemplate {...data} />
        </div>
    </React.StrictMode>,
    document.getElementById("root"),
);
```

Here is an example of how your data and assets can be fed to the module:

```typescript
const data: TemplateData = {

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

        "headerImageUrl": headerImg,
        "paragraph": `
			your paragraph; You can use Markdown
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
            "githubRepoUrl": "",
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
            "text": {
                "title": "Lorem Ipsum",
                "paragraphMd": ``
            }
        },
    ],

    "reviewSliderData": [
        {
            "Logo": SliderLogo1,
            "description": "A review",
            "signature": "Lorem Ipsum"
    ],

    "footerData": {
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
                "logoSvgComponent": TwitterSvg,
                "name": "Twitter",
                "url": ""
            },
            {
                "logoSvgComponent": RedditSvg,
                "name": "Reddit",
                "url": ""
            },
            {
                "logoSvgComponent": YouTubeSvg,
                "name": "Youtube",
                "url": ""

            }
        ],
        "licence": "M I T Licence",

    }


}
```

## Contribute

```bash
npm install
npm run build
npm test
```
