---
description: >-
  Setting up a landing page for a repo of your choosing using GitHub Pages and
  create-react-app.
---

# Getting started

{% hint style="success" %}
Before getting started you might want to checkout a repo whith a gitlanding page setup. For example [the landingpage of GitLangind itself](https://www.gitlanding.dev/).

The code of the website lies on a [dedicated branch](https://github.com/thieryw/gitlanding/tree/landingpage) of the [GitLanding repo](https://github.com/thieryw/gitlanding). The file that are actally served by [GitHub Page](https://pages.github.com/) lies on the [`gh_page`](https://github.com/thieryw/gitlanding/tree/gh-pages) branch and is put there using [this GitHub Action](https://github.com/thieryw/gitlanding/blob/eb85ca1fea7ce0ce21837d1e0ba7a6bb1a784b19/.github/workflows/deploy.yml#L21).
{% endhint %}

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

Next you'll have to enable GitHub page in your repo.  It's in your repo GitHub page &gt; _settings &gt; pages_ .

{% hint style="info" %}
You may need to wait a few minutes for the initial gh-pages branche to be created by your GitHub Action workflow `.github/workflows/deploy.yaml`
{% endhint %}

![https://github.com/USERNAME/REPO/settings/pages](.gitbook/assets/gh-page-screenshot.png)

If all went as expected you page should be up and running

![](.gitbook/assets/react-app-screen-shot.png)

{% hint style="info" %}
Later on you will probably want to use your own domain name. For that you'll have to.

1. [Configure the DNS](https://user-images.githubusercontent.com/39378411/135731113-660804da-060d-4c60-b4d5-8b944fe00a5d.png)
2. [Remove the `hostname` file from your `package.json`](https://github.com/thieryw/crispy-octo-bassoon/blob/431679969c454772605d2d16ad69290559a43cba/package.json#L39)\`\`
3. [Create a `CNAME` file in your `public/` directory](https://github.com/thieryw/gitlanding/blob/landingpage/public/CNAME)
4. [Update your GitHub Pages configuration](https://user-images.githubusercontent.com/39378411/135731497-b1f0bb1b-413d-4aae-bc8e-6d77174aae41.png)
{% endhint %}

Your now ready to start customizing this page with `Gitlanding.`

