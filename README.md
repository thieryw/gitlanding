<p align="center">
    <img src="https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png">  
</p>
<p align="center">
    <i>A module that generates a homepage for your projects</i>
    <br>
    <br>
    <img src="https://github.com/garronej/homepage-template/workflows/ci/badge.svg?branch=main">
    <img src="https://img.shields.io/bundlephobia/minzip/homepage-template">
    <img src="https://img.shields.io/npm/dw/homepage-template">
    <img src="https://img.shields.io/npm/l/homepage-template">
</p>
<p align="center">
  <a href="https://github.com/thieryw/homepage-template">Home</a>
  -
  <a href="https://github.com/thieryw/homepage-template">Documentation</a>
</p>

# Install / Import

```bash
$ npm install --save homepage-template
```

```typescript
import { myFunction, myObject } from "homepage-template";
```

Specific imports:

```typescript
import { myFunction } from "homepage-template/myFunction";
import { myObject } from "homepage-template/myObject";
```

## Import from HTML, with CDN

Import it via a bundle that creates a global ( wider browser support ):

```html
<script src="//unpkg.com/homepage-template/bundle.min.js"></script>
<script>
    const { myFunction, myObject } = homepage_template;
</script>
```

Or import it as an ES module:

```html
<script type="module">
    import { myFunction, myObject } from "//unpkg.com/homepage-template/zz_esm/index.js";
</script>
```

_You can specify the version you wish to import:_ [unpkg.com](https://unpkg.com)

## Contribute

```bash
npm install
npm run build
npm test
```
