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
