### **0.19.1** (2022-06-17)  
  
- bump version  
- tests  
- update stories  
- add default border radius to illustrations  
- create new code block component  
- update dependencies    
  
## **0.19.0** (2022-06-15)  
  
- bump version  
- extend illustration zoom factor and illustration fixed width  
- test  
- GlHero: illustration zoom factor and fix illustration width acording to aspect ratio  
- GlImage & video: wrap in forwardRef  
- GlArticle: Remove illustration max width props  
- IllustrationProps: remove maxWidth props  
- useMediaAspectRatio function  
- use check icon customization    
  
## **0.18.0** (2022-06-13)  
  
- Enable changing check icon in checklist and update dependencies  
- Update powerhooks  
- Description can be optional as well    
  
### **0.17.6** (2022-06-06)  
  
- bump version  
- add illustration maxWidth options    
  
### **0.17.5** (2022-06-05)  
  
- bump version  
- update GlCards and GlMetricCard    
  
### **0.17.4** (2022-06-04)  
  
- bump version  
- update GlCards and GlMetricCard  
- update dependencys  
- update onyxia-ui powerhooks and evt    
  
### **0.17.3** (2022-05-26)  
  
- bump version  
- reduce header title margin and remove it on small devices    
  
### **0.17.2** (2022-05-26)  
  
- stop using mui link and correct classes atribution    
  
### **0.17.1** (2022-05-26)  
  
- remove old header and add customBreakpoint in new header  
- GlHeader breakpoint detection, better solution  
- GlHeaderLink handle active  
- GlHeader remove auto small device detection for the moment  
- GlHeader testing  
- GlHeader continue  
- GlTemplate add header padding option  
- GlHeader new version not finished yet    
  
## **0.17.0** (2022-05-20)  
  
- GlCodeBlock: use margins instead of gap and reset copied message time every time the user clicks to avoid flashes  
- update react-code-block  
- test GlHero  
- GlHero refactor  
- test Refactored components  
- migrate stories to IllustrationProps  
- use IllustrationProps in GlArticle and GlHero  
- create IllustrationProps  
- GlArticle test  
- correct GlArticle stories  
- useIntersectionObserver: add dependencyList  
- GlVideo: remove width and set onLoadedData  
- GlImage: refactor  
- delete GlIllustration  
- GlArticle: refactor    
  
### **0.16.3** (2022-05-17)  
  
- Update GlIllustration    
  
### **0.16.2** (2022-04-27)  
  
- GlHeader center links    
  
### **0.16.1** (2022-04-27)  
  
- GlHeader use proper link  
- Fix typos    
  
## **0.16.0** (2022-04-24)  
  
- GlHero custom component as illustration is in charge of setting it's id    
  
### **0.15.3** (2022-04-23)  
  
- Fix text align center in GlHero    
  
### **0.15.2** (2022-04-23)  
  
- Center in Hero for when it's not width 100%    
  
### **0.15.1** (2022-04-23)  
  
- GlHero add onLoad function to be called by the custom component    
  
## **0.15.0** (2022-04-23)  
  
- Enable to provide custom component to GlHero    
  
## **0.14.0** (2022-04-22)  
  
- Enable providing custom node for GlHero illustration    
  
## **0.13.0** (2022-04-19)  
  
- Remove the option of providing theme provider to GlTemplate, remove header position fixed  
- update onyxia-ui  
- update test app dependencies  
- Update peerDep compat    
  
### **0.12.3** (2022-04-16)  
  
- update powerhooks and use getScrollableParent from powerhooks  
- Delete test.ts    
  
### **0.12.2** (2022-04-14)  
  
- using getScrollableParent properly  
- getScrollableParent adaptation    
  
### **0.12.1** (2022-04-13)  
  
- remove overflow from root    
  
## **0.12.0** (2022-04-13)  
  
- update stories  
- update Source import  
- Media Source type  
- test new video component  
- GlTemplate remove padding from children wrapper and zIndex from header  
- GlIllustration add video type  
- GlVideo component  
- GlHero add video option and add padding  
- add padding on components  
- GlTemplate overflowX hidden and use getScrollableParent  
- GlLinkToTop correct scrollable parent usage  
- remove comments  
- GlTemplate use native scroll  
- temporary getScrollableParent function, did not manage to make powerhooks verison work in my case  
- GlHeader correct scrollableParent usage  
- update powerhooks  
- use new tss merged classes functionality for all components  
- add hasAnimation to dependency arrays  
- GlLinkToTop add classes prop    
  
### **0.11.6** (2022-04-09)  
  
- Fix use of palette    
  
### **0.11.5** (2022-04-09)  
  
- Fix regression  
- change margin to transform    
  
### **0.11.4** (2022-04-08)  
  
- GlHeader add active property on links    
  
### **0.11.3** (2022-04-08)  
  
- Fix spacing in header items    
  
### **0.11.2** (2022-04-08)  
  
- bumb version  
- GlSectionDivider story delete secondary vue  
- test  
- GlProjectCard correct footer bug    
  
### **0.11.1** (2022-04-08)  
  
- GlLogo cards remove number of icons  
- GlProjectCard calculate image aspect ratio  
- GlLogoCard use flex instead of grid for logos    
  
## **0.11.0** (2022-04-08)  
  
- Enable to customize header with start and end node    
  
### **0.10.2** (2022-04-07)  
  
- fix build  
- Fix bug GlHero  
- remove position relative  
- GlHero dont use useMemo uselessly & remove position relative  
- GlTemplate remove relative positioning and favor margin  
- GlSectionDivider remove secondary variant  
- GlHeader remove positioning when possible and correct toggle menu bug  
- GlCodeBlock remove absolute positioning    
  
### **0.10.1** (2022-04-07)  
  
- Update TSS-react    
  
## **0.10.0** (2022-04-07)  
  
- Enable fine grained configuration of GlHero  
- Name stylesheet  
- Name stylesheet GlHeader  
- GlArticle and GlHero stories turn off image shadow  
- fix storybook reload bug  
- fix storybook eslint warnings  
- Merge pull request #9 from bzg/main

README.md: Tiny wording fix  
- README.md: Tiny wording fix

When mentioning the operating system, "GNU/Linux" is better.    
  
### **0.9.3** (2022-03-28)  
  
- update GlLinkToTop  
- update readme    
  
### **0.9.2** (2022-03-20)  
  
- GlTemplate first-child css correction    
  
### **0.9.1** (2022-03-12)  
  
- correct hero animation probleme    
  
## **0.9.0** (2022-03-10)  
  
- merge sticky_header branch to main  
- header corrections  
- GlTemplate remove doDelegateScroll; GlHeader, GlHero and GlLinkToTop  refactor with useGetScrollableParent  
- GlLinkToTop remove un necessary zIndex and use getScrollableParrent  
- GlHero use getScrollabelParent  
- GlHeader correct useClickAway and using getScrollableParent  
- GlTemplate adding delegate scroll option and using getScrollableParent from powerhooks  
- update dependencys  
- tss-react and powerhooks are no longer modules that requires to be peer dependencies  
- sticky positioning header  
- Update ci.yaml    
  
### **0.8.5** (2022-02-25)  
  
- update so that footer stick to bottom and position sticky usable  
- test  
- correct Components to go with refactored GlTemplate  
- refactor GlTemplate to use native scroll  
- update GlHero story  
- update test/index  
- GlHeader better with sexy underline  
- Corrected animation bug width splash screen GlHero    
  
### **0.8.4** (2022-02-09)  
  
- apply new header  
- correct header number of element detection  
- GlHeader2 automaticaly go to collapsible if to many links    
  
### **0.8.3** (2022-02-07)  
  
- try new header  
- GlHero better image rendering on small screen  
- test diferente images in GlHero  
- GlHero image width calculated on image aspect ratio better vertion  
- gl hero take into account image aspect ratio    
  
### **0.8.2** (2022-01-27)  
  
- test review slide  
- GlreviewSlide signature margin corrections  
- remove underline on email GlFooter  
- test copy block  
- GlImage set shadow by default  
- GlIllustration set isCopyBlock and copiedToClipboard prop  
- GlArticle set button lable type to react node  
- GlCodeBlock set shadow by default and add copy button  
- correct line height probleme GlCheckList    
  
### **0.8.1** (2022-01-26)  
  
- disable emotion warnings when using first-child pseudo class    
  
## **0.8.0** (2022-01-26)  
  
- Allow react node in footer  
- Only export style utility from index    
  
## **0.6.0** (2022-01-18)  
  
- update footer and header links and there stories  
- Update README.md  
- Update README.md  
- adapt yarn_link script for windows  
- Remove legacy command    
  
### **0.5.17** (2022-01-10)  
  
- make github star button apear in a less dramaticaly awfull way  
- Put the website of gitlanding as the first showcase project  
- Add video recording to the README  
- Add large video demo    
  
### **0.5.16** (2022-01-09)  
  
- correct readme  
- weaken shadow  
- Do not confuse developpement and usage

Signed-off-by: garronej <joseph.garrone.gj@gmail.com>    
  
### **0.5.15** (2022-01-09)  
  
- refactor with useMergedClasses finish  
- Update README.md  
- Update README  
- Update README  
- [README] Rephrase  
- Refactor use of useMergedClasses  
- Update README.md  
- Update README.md  
- fmt  
- Update README.md  
- Update README  
- Inprove readme    
  
### **0.5.14** (2022-01-07)  
  
- use node v 16 in ci    
  
### **0.5.13** (2022-01-07)  
  
- update ci to run test on node v 16  
- remove root property from classes property in components  
- update typescript and @emotion/react  
- use new tss-react feature useMergedClasses in all components    
  
### **0.5.12** (2022-01-06)  
  
- fix content reflow on initial page load  
- a feable attempt to solve splash screen probleme    
  
### **0.5.11** (2021-12-22)  
  
- update onyxia and tss react and name property in all makeStyles calls    
  
### **0.5.10** (2021-12-21)  
  
- bump version  
- update video link  
- GlCheckList correct on small devices    
  
### **0.5.9** (2021-12-20)  
  
- bump version  
- speed up animation and safari fix  
- update ci  
- update storybook branding    
  
### **0.5.8** (2021-12-02)  
  
- bump version  
- added youtube ifram section component  
- unobserver if container or listItem undefined GlCheckList    
  
### **0.5.7** (2021-11-26)  
  
- bump version  
- GlLinkToTop, an option that activates a button that smoothly scrolls to the top of page when clicked    
  
### **0.5.6** (2021-11-23)  
  
- bumb version  
- GlHero correct animation bug    
  
### **0.5.5** (2021-11-23)  
  
- bump version  
- key in ChecklistElement    
  
### **0.5.4** (2021-11-22)  
  
- bump version  
- update test  
- animation for GlCheckList  
- refactor useIntersectionObserver  
- added width property on glSlider  
- make project card subtitle optional    
  
### **0.5.3** (2021-11-19)  
  
- added sources props for responsive images and bump version    
  
### **0.5.1** (2021-11-17)  
  
- bump version  
- created checklist component, tested in test project and demonstrated in storybook  
- remove 3d animation from GlArticle and applied in storybook and testProject    
  
## **0.5.0** (2021-11-16)  
  
- bump version  
- update tss-react and create a custom shadow in theme  
- adjust React markdown so that links render with the correct theme and applied it to the components that use markdown  
- added markdown for article titles  
- put the tss after the component    
  
### **0.4.14** (2021-11-08)  
  
- update version  
- added classes props on GlTemplate    
  
### **0.4.13** (2021-10-30)  
  
- bump version  
- put srollableDivId on the scrollableDiv    
  
### **0.4.12** (2021-10-30)  
  
- bump version  
- export scrollable div Id    
  
### **0.4.11** (2021-10-29)  
  
- bump version  
- applie corrections for safari    
  
### **0.4.10** (2021-10-17)  
  
- bump version  
- show github star count  
- update readme  
- clean test project  
- update readme    
  
### **0.4.9** (2021-10-16)  
  
- bump version  
- export dark Mode switch  
- update dependencys    
  
### **0.4.8** (2021-10-13)  
  
- bump version  
- update onyxia-ui, tss, powerhooks, tsafe and mui  
- GlTemplate make children prop mandatory  
- addapt header for responsive spacings    
  
### **0.4.7** (2021-10-13)  
  
- bump version  
- Corrections for GlTemplate    
  
### **0.4.6** (2021-10-12)  
  
- bump version  
- put padding on gltemplate children and reorganized footer and children layout so as to avoid scroll problemes    
  
### **0.4.5** (2021-10-11)  
  
- bump version  
- corrected autoplay bug onBlur    
  
### **0.4.4** (2021-10-10)  
  
- bump version  
- correct glHeader so that the hero is behind when position is fixed    
  
### **0.4.3** (2021-10-10)  
  
- bump version  
- modified GlSlider to autoplay only when it is in view port    
  
### **0.4.2** (2021-10-09)  
  
- bump version  
- improved animation on GlArticle with other variant  
- useIntersectionObserver hook, handy for triggering animations  
- deleted animatedOnscroll component    
  
### **0.4.1** (2021-10-09)  
  
- bump version  
- added classes property on section components    
  
## **0.4.0** (2021-10-06)  
  
- bump version  
- test slider  
- remove the padding from header wrapper in GlTemplate and put it in the component its self  
- GlSlider stop auto play while individual slide is beeing draged    
  
### **0.3.16** (2021-10-06)  
  
- update  
- handle unexpected behavior on window blur GlSlider    
  
### **0.3.15** (2021-10-05)  
  
- bump version  
- slider autoplay function    
  
### **0.3.14** (2021-10-05)  
  
- bump version  
- remove height from logo on logo card    
  
### **0.3.13** (2021-10-05)  
  
- bump version  
- remove padding right left on GlTemplate children wrapper and set it on the sections, addedpadding right left to the theme    
  
### **0.3.12** (2021-10-04)  
  
- bump version  
- test mp4  
- article with mp4 story  
- adjust layout for mp4  
- include the possibilty to give an mp4 as props, better than gifs by far  
- update readme picture    
  
### **0.3.11** (2021-10-04)  
  
- bump version  
- corect logo bug on safari    
  
### **0.3.10** (2021-10-04)  
  
- bump version  
- test header  
- correct layout GlHeader    
  
### **0.3.9** (2021-10-04)  
  
- bumb version  
- test GlLogo  
- GlLogo added width and height    
  
### **0.3.8** (2021-10-03)  
  
- bump version  
- test header title options  
- header title options for dark mode and screen width    
  
### **0.3.7** (2021-10-03)  
  
- bump version  
- modify section divider color  
- update readme    
  
### **0.3.6** (2021-10-03)  
  
- bump version  
- reduce section divider width    
  
### **0.3.5** (2021-10-03)  
  
- update    
  
### **0.3.4** (2021-10-02)  
  
- update    
  
### **0.3.3** (2021-10-02)  
  
- update    
  
### **0.3.2** (2021-10-02)  
  
- update  
- update    
  
### **0.3.1** (2021-10-02)  
  
- update  
- Update ci.yaml    
  
## **0.3.0** (2021-10-02)  
  
- update  
- Deploy storybook under a subdir    
  
## **0.2.0** (2021-10-02)  
  
- bump version  
- update storybook  
- change theme and make it look nicer  
- delete this useless component  
- omited children from props  
- correct api  
- correct logo layout  
- set href to non optional in link  
- api correction  
- layout adjustments    
  
### **0.1.2** (2021-09-29)  
  
- bump version  
- update  
- added custom shadow in theme  
- section divider  
- added shadow option  
- add link to section bellow button  
- readjust image width    
  
### **0.1.1** (2021-09-28)  
  
- bump version  
- making footer stick to the bottom if the page does not have much content  
- added footer  
- hero adjustments    
  
## **0.1.0** (2021-09-27)  
  
- bump version  
- update  
- update test project  
- corrected decorative vs code buttons  
- corrections for code blocks display  
- optimize to avoid content reflow  
- add id  
- add id plus better mobile layout by aligning text on the right  
- change height to minHeight for image to solve display bugs    
  
### **0.0.103** (2021-09-14)  
  
- Update onyxia-ui and tss-react    
  
### **0.0.102** (2021-09-13)  
  
- Update deps    
  
### **0.0.101** (2021-09-08)  
  
- Update onyxia-ui    
  
### **0.0.100** (2021-09-06)  
  
- Update onyxia-ui    
  
### **0.0.99** (2021-09-05)  
  
- update version  
- GlProjectCard using an img for the header and applying object fit to avoid having to set a minimum height on the hole component  
- GlProjectCard styled badge  
- fixed image scale on large screen    
  
### **0.0.98** (2021-09-05)  
  
- update gitlanding    
  
### **0.0.97** (2021-09-05)  
  
- Fix previous build    
  
### **0.0.96** (2021-09-05)  
  
- fix previous build    
  
### **0.0.95** (2021-09-04)  
  
- Fix previous build    
  
### **0.0.94** (2021-09-04)  
  
- Fix previous release    
  
### **0.0.93** (2021-09-04)  
  
- Remove header border    
  
### **0.0.92** (2021-09-04)  
  
- Leave a space when the header is retracted    
  
### **0.0.91** (2021-09-04)  
  
- Make header option optional    
  
### **0.0.90** (2021-09-03)  
  
- GlHeader: better header options    
  
### **0.0.89** (2021-09-03)  
  
- update version  
- GlMetricCard refactor  
- modified number animation to have an ease out effect    
  
### **0.0.88** (2021-09-02)  
  
- update version  
- GlArticle refactor  
- GlArticle change animation  
- GlTemplate fixed horizontal scroll bug  
- GlMetricCard , put the number title in its own component to avoid the entire card being re rendred during the number animation  
- externalized animate function in useNumberCountAnimation    
  
### **0.0.87** (2021-09-01)  
  
  
  
### **0.0.86** (2021-09-01)  
  
- update version  
- count up animation for metric card  
- remove evtScroll  
- GlTemplate: Enable to customize header position  
- Better zIndexes  
- GlTemplate: Better header and scroll behaviour  
- update version    
  
### **0.0.85** (2021-08-31)  
  
- Update tss-react onyxia-ui and powerhooks  
- update  
- atempt to correct content reflow    
  
### **0.0.84** (2021-08-28)  
  
- update version  
- update headerWrapper position to fixed instead of absolute  
- GlTemplate fixed horizontal scroll bug    
  
### **0.0.83** (2021-08-27)  
  
- Smart menu poc    
  
### **0.0.82** (2021-08-27)  
  
- update version  
- update version  
- GlCards corrected layout  
- update GlSlider  
- bump version  
- GlArticle correction for small screen  
- GlMetricCard remove lineHeight on number that was ausing bugs  
- GlArticle animation    
  
### **0.0.80** (2021-08-26)  
  
- Creating a test project    
  
### **0.0.79** (2021-08-26)  
  
- bump version  
- GlArticle correction for small screen  
- GlMetricCard remove lineHeight on number that was ausing bugs  
- GlArticle animation    
  
### **0.0.78** (2021-08-24)  
  
- bump version  
- update onyxia-ui    
  
### **0.0.77** (2021-08-19)  
  
- update    
  
### **0.0.76** (2021-08-19)  
  
- update  
- GlMetricCard added badge like background  
- GlCards layout corrections  
- update  
- update hero    
  
### **0.0.75** (2021-08-16)  
  
- bump version  
- update stories  
- GlFooter corrected margin top  
- GlReview Slider added top bottom margin  
- added index to GlSection folder  
- change GlCard spacing and added top bottom margin  
- change GlSection export  
- change GlSection architecture and corrected layout    
  
### **0.0.74** (2021-08-16)  
  
- bump version  
- remove animation props from cards  
- update animations    
  
### **0.0.73** (2021-08-05)  
  
- bump version  
- correct animation bug on GlHero    
  
### **0.0.72** (2021-08-03)  
  
- bump version  
- update  
- GlLogoCard added button and optional overlap icon effect  
- GlMetricCard responsive logo size  
- GlArrow modification of display plus responsiveness    
  
### **0.0.71** (2021-08-02)  
  
- bump version  
- GlHero refactor font size    
  
### **0.0.70** (2021-08-01)  
  
- Bump version  
- Refactor responsive styles  
- Emergency commit  
- GlSections padding and grid gap corrections  
- GlArticle font corrections  
- GlMetricCard remove fill from icon  
- GlLogo fill and dimentions corrections  
- Correct GlHero title size  
- GlHeader padding corrections  
- GlTemplate padding corrections  
- GlHero font size and layout corrections  
- Suggestion for wave  
- Custom text for hero    
  
### **0.0.69** (2021-07-26)  
  
- bump version  
- GlDarkModeSwitch wrap styles in useStyles  
- correct GlMetricCard title line height  
- implemented a wave background  
- bump version  
- GlReviewSlider remove padding  
- Gl header  modify padding and useClick away for unfolding menu  
- remove padding Glfooter  
- remove padding  
- added padding on children to isolate it in the code  
- remove padding  
- GlArrow corected centering probleme  
- rotating dark mode switch    
  
### **0.0.68** (2021-07-23)  
  
- Update onyxia-ui    
  
### **0.0.67** (2021-07-23)  
  
- bump version  
- create a component that animates on screen intersection based on framer-motion library  
- animation on hero text when splashscreen hidden  
- added framer-motion animation library  
- deleted my shity animation function    
  
### **0.0.66** (2021-07-23)  
  
- Update deps    
  
### **0.0.65** (2021-07-20)  
  
- bump version  
- put useAnimation validateEmail and validatePhonenumber in tools directory; corrected useAnimation Probleme with splash screen    
  
### **0.0.64** (2021-07-20)  
  
- Update    
  
### **0.0.63** (2021-07-19)  
  
  
  
### **0.0.62** (2021-07-19)  
  
- update deps    
  
### **0.0.61** (2021-07-19)  
  
- update  
- update  
- Update evt  
- Update powerhooks  
- Update tss-react  
- update  
- A seemingly functioning version of animation function  
- useAnimation function    
  
### **0.0.60** (2021-07-13)  
  
- bumb version  
- updated GlFooter stories  
- GlReviewSlider, deleted useless css rules and corrected display on mobile devices  
- GlfooterInfo added padding  
- update margin Top GlfooterBottomDiv  
- update api, added marginTop, background Color, added transition on icon hover and added flex wrap for iconslinks and links  
- update index for new footer  
- deleted old footer version    
  
### **0.0.59** (2021-07-11)  
  
- bumb version  
- GlFooter stories  
- GlFooterInfo style  
- phone number validation function  
- GlLogo if no fill on svg or in props then automaticaly set to theme values  
- GlFooter Bottom div  
- GlFooter layout and style  
- GlSlide remove fill from icon  
- new footer api with email validation  
- email vaidation function  
- added link to GlArrow  
- GlArrow update    
  
### **0.0.58** (2021-07-07)  
  
- bump version  
- update GlreviewSlider add stoybook examples  
- add jpeg as module  
- added index file in GlReviewSlider  
- inverted GlSlide and GlSlideTemplate    
  
   
  
### **0.0.55** (2021-07-04)  
  
- bump version  
- remove console log because i forgot, stupid stupid me, for goodness sake    
  
### **0.0.54** (2021-07-04)  
  
- bump version  
- remove comment and added className props and added decorative vs code button option for code block in GlAside and GlCode components  
- added vs code buttons for GlCode component  
- adjust text  
- added dark and light mode backgorund image option for GlHero  
- corrected code block display    
  
### **0.0.53** (2021-07-03)  
  
- bump version  
- added padding on hero    
  
### **0.0.52** (2021-07-03)  
  
- bump version  
- GlSection added children props and updated grid layout  
- update hero layour and added chilren for customization    
  
### **0.0.51** (2021-07-02)  
  
- bumb version  
- responsive for GlSection  
- added hacky css to correct the fact that  wrapLongLines props does not work  
- changed GlHero api and style  
- css corrections    
  
### **0.0.50** (2021-07-01)  
  
- bump version  
- Corrected Svg path  
- redefine Glsection Api and changed display flex to grid  
- corrected menu height  
- rename  
- update paths  
- GlSection Api redefinition. verry shitty awaiting better idea  
- wrapped GlArticle in memo  
- utils component  
- delete GlRoot and GlSection  
- GlTemplate with scroll handeling  
- articleSection  
- deleted GlSections component because it is useless  
- responsive menu with collapsible  
- added unfolding menu for small devices  
- update stories  
- change GlMetricCard Api  
- update  
- refactor header  
- Feat. tweak container width  
- fmt  
- Add header  
- Refactor star count  
- improved github star counter with dark mode  
- update  
- Refactor stories  
- The intex should export every components that are suceptible to be used.  
- refactor cards  
- update cards    
  
### **0.0.49** (2021-06-17)  
  
- Last minute hack    
  
### **0.0.48** (2021-06-17)  
  
- update    
  
### **0.0.47** (2021-06-17)  
  
- update    
  
### **0.0.46** (2021-06-17)  
  
- update    
  
### **0.0.45** (2021-06-17)  
  
- update  
- Fix default export  
- Hotfix pour GlSection  
- Rename section GlSection  
- Enable providing the href for scroll down    
  
### **0.0.44** (2021-06-16)  
  
- push version  
- update    
  
### **0.0.43** (2021-06-16)  
  
- Replace by href by link for router    
  
### **0.0.42** (2021-06-16)  
  
- Minor fix    
  
### **0.0.41** (2021-06-16)  
  
- fix scroll    
  
### **0.0.40** (2021-06-16)  
  
- Update onyxia-ui    
  
### **0.0.39** (2021-06-16)  
  
- Use theme usecase    
  
### **0.0.38** (2021-06-16)  
  
- Export namespace  
- Big refactor    
  
### **0.0.36** (2021-06-16)  
  
- update flex layout    
  
### **0.0.35** (2021-06-16)  
  
- New responsive api    
  
### **0.0.34** (2021-06-16)  
  
- Fix storybook  
- updat deps    
  
### **0.0.33** (2021-06-15)  
  
- Update deps  
- Do not import default font by default    
  
### **0.0.31** (2021-06-15)  
  
- corrected stupid mistakes    
  
### **0.0.30** (2021-06-15)  
  
- started Xl screen and correct cards  
- Do not use theme provider if overwritten    
  
### **0.0.29** (2021-06-15)  
  
- redone cards    
  
### **0.0.28** (2021-06-14)  
  
- integrated hidden thumbnails with reveal function    
  
### **0.0.27** (2021-06-13)  
  
- reactivate dark mode    
  
### **0.0.26** (2021-06-13)  
  
- responsive for medium screen width    
  
### **0.0.25** (2021-06-13)  
  
- bump version  
- getUseStyles in all components  
- Enable the theme to be customizable    
  
### **0.0.24** (2021-06-11)  
  
- thumbNail update and thumbNail section added  
- small and large thumbNail option    
  
### **0.0.23** (2021-06-10)  
  
- added background property to smallThumbNail    
  
### **0.0.22** (2021-06-10)  
  
- created SmallThumbNail component    
  
### **0.0.21** (2021-06-09)  
  
- corrections on thumbnail flexbox issues, horizontal scroll bar apearing unintentionaly    
  
### **0.0.20** (2021-06-08)  
  
- refactor and section update  
- applied garronej corrections    
  
### **0.0.19** (2021-06-07)  
  
- update    
  
### **0.0.18** (2021-06-07)  
  
- section with thumbnails    
  
### **0.0.17** (2021-06-05)  
  
- new header  
- update  
- update  
- update top bar but shitty result  
- update  
- update  
- delete test  
- delete test  
- install storybook and onyxia top bar    
  
### **0.0.16** (2021-06-02)  
  
- update with onyxia-ui theme provider    
  
### **0.0.15** (2021-05-30)  
  
- update image props for a less dum organisation for the image frame    
  
### **0.0.14** (2021-05-28)  
  
- rename footer and section  
- correct readme    
  
### **0.0.13** (2021-05-28)  
  
- update version  
- merge garronej refactor    
  
### **0.0.12** (2021-05-27)  
  
- update  
- update  
- Update index.ts  
- update  
- update  
- name change  
- introduce code blocks for mainSection    
  
### **0.0.11** (2021-05-21)  
  
- wrapped components with memo and tested render count of each component    
  
### **0.0.10** (2021-05-21)  
  
- image frame options and className prop    
  
### **0.0.9** (2021-05-19)  
  
- refactor and classNames    
  
### **0.0.8** (2021-05-19)  
  
- refactor plus svg assets and image and margin modifications  
- update main section and header plus images with vscode frame    
  
### **0.0.7** (2021-05-13)  
  
- update  
- update    
  
### **0.0.6** (2021-05-13)  
  
- update  
- update  
- corrected body font size and margin issues    
  
### **0.0.5** (2021-05-13)  
  
- update    
  
### **0.0.4** (2021-05-13)  
  
- update version  
- svg without fill have fill set at the default font color    
  
### **0.0.3** (2021-05-11)  
  
- update to version 0.0.3  
- image assets as urls instead of Svg components, reduced box shadow for main section images  
- Update README.md  
- Add topbar    
  
### **0.0.2** (2021-05-09)  
  
- Update README.md  
- update  
- update  
- update  
- update  
- update  
- update  
- added computed small device break point for menu and extra menu items option  
- added computed small device break point for menu and extra menu items option  
- shitty commit  
- ci downloads and license info in readme    
  
