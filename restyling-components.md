# 🎇 Restyling components

Each Gitlanding component has a `className` and `classes` prop that enable you to overwrite the current styles.

The prefered way to do this is with [TSS React](https://evt-garronej.gitbook.io/tss/).

```typescript
import { css } from "tss-react/@emotion/css";
```

[Overwritting header style example](https://github.com/thieryw/crispy-octo-bassoon/commit/e754cc9c2158be996da3ff4262b65a9b82d3546e).

[Overwritting footer style example](https://github.com/thieryw/crispy-octo-bassoon/commit/7be79eb8bffff34e5f70a69dd42d48ee631a48af).
