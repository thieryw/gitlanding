export function disableEmotionWarnings() {
    if (process.env.NODE_ENV !== "development") {
        return;
    }
    /* eslint-disable no-console */
    const log = console.error.bind(console);
    console.error = (...args) => {
        /* eslint-enable no-console */
        if (
            args.indexOf("The pseudo class") &&
            args.indexOf(
                "is potentially unsafe when doing server-side rendering. Try changing it to",
            )
        ) {
            return;
        }
        log(...args);
    };
}
