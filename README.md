<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>Leverage the more advanced features of TypeScript</i>
    <br>
    <br>
    <img src="https://github.com/thieryw/gitlanding/workflows/ci/badge.svg?branch=main">
    <img src="https://img.shields.io/npm/dw/gitlanding">
    <img src="https://img.shields.io/npm/l/gitlanding">
</p>
<p align="center">
  <a href="https://www.gitlanding.org">Landing page</a>
  -
  <a href="https://docs.gitlanding.org">Documentation</a>
</p>

# gitlanding

## A module that generates a homepage for your projects

# Install / Import

```bash
$ npm install --save gitlanding
```

```typescript
import { Gitlanding } from "gitlanding";
import type { GitlandingProps } from "gitlanding";
```

Specific imports:

```typescript
import { GitLandingHeader } from "gitlanding/lib/GitLandingHeader";
import type { GitLandingHeaderProps } from "gitlanding/lib/GitLandingHeader";
import twitterLogoUrl from "gitlanding/assets/twitter.svg";
```

## Contribute

```bash
npm install
npm run build
npm test
```
