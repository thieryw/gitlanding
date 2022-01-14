---
description: >-
  Setting up a landing page for a repo of your choosing using GitHub Pages and
  create-react-app.
---

# Getting started

### Overview

Let's start with an overview of what we are trying to achieve.

Let's check how [the landingpage of GitLangind itself](https://www.gitlanding.dev) is setup.

The code of the website lies on a [dedicated branch](https://github.com/thieryw/gitlanding/tree/4e5a33ed312227efcf7d26332ea87c19331f1eed) of the [GitLanding repo](https://github.com/thieryw/gitlanding/tree/2105d99c84b76f6c6b0647484171c5e09a61dbf5). The files that are actualy served by [GitHub Page](https://pages.github.com) lies on the [`gh_page`](https://github.com/thieryw/gitlanding/tree/b11d5dab0df08a84b7acc72a25d0c3fa7c78cc6b) branch and is put there using [this GitHub Action](https://github.com/thieryw/gitlanding/blob/eb85ca1fea7ce0ce21837d1e0ba7a6bb1a784b19/.github/workflows/deploy.yml#L21).

### Step by step guide

{% tabs %}
{% tab title="MacOs" %}
[Install Node](https://nodejs.org/en/).

```bash
brew install node
```

If you don't have it already, [install yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

```bash
# first cd in your project

git checkout --orphan landingpage && git rm -rf .
yarn create react-app . --template typescript
mkdir -p .github/workflows
wget gitlanding.dev/deploy.yaml -O .github/workflows/deploy.yaml
# This next command will set the homepage to 
# "https://USERNAME.github.io/REPO" in your package.json
node -e 'require("fs").writeFileSync("package.json",JSON.stringify({...require("./package.json"), "homepage": (()=>{ const [r, u]= `${require("child_process").execSync("git remote get-url origin")}`.replace(/\r?\n$/, "").split("/").reverse(); return `https://${u}.github.io/${r}`; })()},null,2))'
git add -A
git commit -m "Initial commit"
git push --set-upstream origin landingpage
```
{% endtab %}

{% tab title="Windows" %}
Install Node. [Download the installer and follow the instructions](https://nodejs.org/en/download/).

Install the [Yarn package manager](https://classic.yarnpkg.com/lang/en/docs/install/#windows-nightly).

If not done all ready, install [Git for Windows](https://git-scm.com/download/win).



```bash
# first cd in your project

powershell
git checkout --orphan landingpage
git rm -rf .
yarn create react-app . --template typescript
mkdir .github\workflows
curl gitlanding.dev/deploy.yaml -O .github/workflows/deploy.yaml
# This next command will set the homepage to 
# "https://USERNAME.github.io/REPO" in your package.json
node -e "require('fs').writeFileSync('package.json',JSON.stringify({...require('./package.json'), 'homepage': (()=>{ const [r, u]= require('child_process').execSync('git remote get-url origin').toString().replace(/\r?\n$/, '').split('/').reverse(); return 'https://' + u + '.github.io/' + r; })()},null,2))"
git add -A
git commit -m "Initial commit"
git push --set-upstream origin landingpage
```
{% endtab %}
{% endtabs %}

Next you'll have to enable GitHub page in your repo. Navigate to your repository on Github and go to `Setting > Pages`, then set the `gh-pages` branch as the branch from witch the site is to be built.

{% hint style="info" %}
You may need to wait a few minutes for the initial gh-pages branche to be created by your GitHub Action workflow `.github/workflows/deploy.yaml`
{% endhint %}

![https://github.com/USERNAME/REPO/settings/pages](.gitbook/assets/gh-page-screenshot.png)

If all went as expected you page should be up and running

![](.gitbook/assets/react-app-screen-shot.png)

You're now ready to start customizing this page with `Gitlanding`.
