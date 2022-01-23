# 🎇 Restyling components

Each Gitlanding component has a `className` and `classes` prop that enable you to overwrite the current styles.

The prefered way to do this is with [TSS React](https://evt-garronej.gitbook.io/tss/), a replacement for [@material-ui v4 makeStyles](https://material-ui.com/styles/basics/#hook-api).

1. Create makeStyles from TSS React.
2. Create the useStyles function and apply new styles to the components.

