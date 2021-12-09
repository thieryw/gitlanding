# Custom fonts

You can change the default font to one of your choosing by hosting them your self or by importing them directly via google fonts. Link them in your `public/index.html` file and create a new theme provider with Onyxia-ui, then set the `ThemeProvider` property in the `GlTemplate` component to the new theme provider.

{% hint style="success" %}
[This commit is full example of how its done.](https://github.com/thieryw/crispy-octo-bassoon/commit/978544412d187aa1593715e0cc4b12678ba15ac2)
{% endhint %}

### Adding multiple fonts

Change one or more of the font variants in the theme provider by setting the `fontFamily` in the `variants` property to your chosen font.

{% hint style="success" %}
[This commit is an example where I change the `page heading` variant to `Playfair Display` and the `subtitle` variant to `Open Sans.`](https://github.com/thieryw/crispy-octo-bassoon/commit/7a2003d285d8f3a6b2d5391474af5cc691f03910)``
{% endhint %}

It is allsow possible to create your own custom variants.

{% hint style="success" %}
[In this commit I add a new title variant that uses Cinzel Decorative as font.](https://github.com/thieryw/crispy-octo-bassoon/commit/4d5866f7f7d61feab1e801551400765f7aa1276e)
{% endhint %}
