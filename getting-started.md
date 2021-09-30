---
description: >-
  In this guide I will show you how to set up a new branch on your project with
  a React app and gitlanding installed, and host it for free on github pages.
---

# Getting started

### Procedure

**1\) Create a new empty branch on the repository you want to showcase.**

Open a terminal and cd to your repository, then enter the following command:

```bash
git checkout --orphan homepage && git rm -rf .
```

**2\) Create a React app in your new branch.**

```bash
yarn create react-app . --template typescript
```

**3\) Use github action to automate the publishing of your react app to github pages.**

At the root of your new branch, create the following files: `.github/workflows/deploy.yaml` ; by pasting the following command:

```bash
mkdir -p .github/workflows && touch $_/deploy.yaml
```

Now you must paste the following **ci** in the `deploy.yaml` file:

```yaml
on:
  push:
    branches:
      - homepage #the name of the branch from witch you want to deploy

jobs:

  deploy_on_gh_pages:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2.1.3
      with:
        node-version: '15'
    - run: |
        yarn install --frozen-lockfile
        yarn build
    - run: git remote set-url origin https://git:${GITHUB_TOKEN}@github.com/${{github.repository}}.git
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    - run: npx -y -p gh-pages@3.1.0 gh-pages -d build -u "github-actions-bot <support+actions@github.com>"

```

**4\) Add a homepage property at the top of your package.json file:**

```javascript
"homepage": "https://YOUR-GITHUB-USER-NAME.github.io/YOUR-REPOSITORY-NAME/"
```

**5\) Commit and push your changes.**

```bash
git add .
```

```bash
git commit -am "deploy to github pages"
```

```bash
git push --set-upstream origin homepage
```

You can check that the github actions have been completed by going to the actions tab in your github repository: `https://github.com/YOUR-USER-NAME/YOUR-REPO-NAME/actions/.`

This is what you should see:

![](.gitbook/assets/gh-action.png)

**Finally for the deployment to be complete**

Go to the pages tab in the settings of your repository: `https://github.com/YOUR-GITHUB-USER-NAME/YOUR-REPO-NAME/settings/pages` and under `source`, set the branch to `gh-pages`

![](.gitbook/assets/ghpages.png)



