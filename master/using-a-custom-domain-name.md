# Using a custom domain name

Let's say you own the domain name: `yourdomain.com`.

* If you want poeple to hit your landing page when they query `https://yourdomain.com` or `https://www.yourdomain.com` ,follow the instruction of the `Apex domain` tab.
* if you want people to hit your landing page when they query `https://asubdomain.yourdomain.com,` follow the instructions of the `Subdomain` tab.

{% tabs %}
{% tab title="Apex domain" %}
Create a `CNAME` file in the public folder:&#x20;

```bash
echo "www.example.com" > public/CNAME
```

{% hint style="warning" %}
You may think:

_« I would prefer yourdomain.com to be the default and www.yourdomain.com to redirect to example.com »_

It's **not** possible with GitHub pages.
{% endhint %}

Remove the hostname field in your `package.json`

```diff
- "homepage": "https://yourUsername.github.io/yourRepoName"
```

Create theses DNS records (don't forget to replace `yourUsername` by your GitHub username and `yourdomain.com` by your domain): &#x20;

```
www.yourdomain.com. CNAME yourUsername.github.com
yourdomain.com.     ALIAS yourUsername.github.com
```

If, and ony if, your DNS service provider do not support `ALIAS` records:

```diff
 www.yourdomain.com. CNAME yourUsername.github.com
-yourdomain.com.     ALIAS yourUsername.github.com
+yourdomain.com.    A     185.199.108.153
+yourdomain.com.    A     185.199.109.153
+yourdomain.com.    A     185.199.110.153
+yourdomain.com.    A     185.199.111.153
```

{% hint style="info" %}
You do not need to go to the GitHub Pages config and fill in your custom domain, it will be read from the CNAME file.
{% endhint %}

Comit and push your changes and your are good to go.
{% endtab %}

{% tab title="Subdomain" %}
Create a `CNAME` file in the public folder:&#x20;

```bash
echo "asubdomain.example.com" > public/CNAME
```

Remove the hostname field in your `package.json`

```diff
- "homepage": "https://yourUsername.github.io/yourRepoName"
```

Create theses DNS records (don't forget to replace `yourUsername` by your GitHub username and `yourdomain.com` by your domain): &#x20;

```
asubdomain.yourdomain.com. CNAME yourUsername.github.com
```

{% hint style="info" %}
You do not need to go to the GitHub Pages config and fill in your custom domain, it will be read from the `CNAME` file.
{% endhint %}

Comit and push your changes and your are good to go.
{% endtab %}
{% endtabs %}

