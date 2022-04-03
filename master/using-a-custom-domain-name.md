# 🌐 Custom domain name

Let's say you own the domain name: `yourdomain.com`.

* If you want poeple to hit your landing page when they query `https://yourdomain.com` or `https://www.yourdomain.com` ,follow the instruction of the `Apex domain` tab.
* if you want people to hit your landing page when they query `https://asubdomain.yourdomain.com,` follow the instructions of the `Subdomain` tab.

{% tabs %}
{% tab title="Apex domain" %}
Remove the hostname field in your `package.json`

```diff
- "homepage": "https://yourUsername.github.io/yourRepoName"
```

Create theses DNS records (don't forget to replace `yourUsername` by your GitHub username and `yourdomain.com` by your domain): &#x20;

```
www.yourdomain.com. CNAME yourUsername.github.io
yourdomain.com.     ALIAS yourUsername.github.io
```

If, and only if, your DNS service provider do not support `ALIAS` records:

```diff
 www.yourdomain.com. CNAME yourUsername.github.io
-yourdomain.com.     ALIAS yourUsername.github.com
+yourdomain.com.    A     185.199.108.153
+yourdomain.com.    A     185.199.109.153
+yourdomain.com.    A     185.199.110.153
+yourdomain.com.    A     185.199.111.153
```

Once your DNS records are available, create a `CNAME` file in the public folder:&#x20;

```bash
echo "www.yourdomain.com" > public/CNAME
```
{% endtab %}

{% tab title="Subdomain" %}
Remove the hostname field in your `package.json`

```diff
- "homepage": "https://yourUsername.github.io/yourRepoName"
```

Create theses DNS records (don't forget to replace `yourUsername` by your GitHub username and `yourdomain.com` by your domain): &#x20;

```
asubdomain.yourdomain.com. CNAME yourUsername.github.io
```

Once your DNS records are available, create a `CNAME` file in the public folder:&#x20;

```bash
echo "asubdomain.yourdomain.com" > public/CNAME
```
{% endtab %}
{% endtabs %}

Commit and push your changes and your are good to go.

{% hint style="success" %}
You do not need to go to the GitHub Pages config and fill in your custom domain, it will be read from the CNAME file.
{% endhint %}
