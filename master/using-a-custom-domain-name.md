# 🌐 Custom domain name

Let's say you own the domain name: `yourdomain.com`.

* If you want poeple to hit your landing page when they query `https://yourdomain.com` or `https://www.yourdomain.com` ,follow the instruction of the `Apex domain` tab.
* if you want people to hit your landing page when they query `https://asubdomain.yourdomain.com,` follow the instructions of the `Subdomain` tab.

{% tabs %}
{% tab title="Apex domain" %}
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

Once your DNS records are available, update your `package.json` `homepage` field:

```diff
-"homepage": "https://yourUsername.github.io/yourRepoName",
+"homepage": "https://www.yourdomain.com",
```

[This line](https://github.com/thieryw/gitlanding/blob/8628d6bc47ba368b08903725e99e40c4eb640203/public/deploy.yaml#L17) of your CI workflow will make sure GitHub Pages understands the change.
{% endtab %}

{% tab title="Subdomain" %}
Create theses DNS records (don't forget to replace `yourUsername` by your GitHub username and `yourdomain.com` by your domain): &#x20;

```
asubdomain.yourdomain.com. CNAME yourUsername.github.io
```

Once your DNS records are available, update your `package.json` `homepage` field:

```diff
-"homepage": "https://yourUsername.github.io/yourRepoName",
+"homepage": "https://asubdomain.yourdomain.com",
```

[This line](https://github.com/thieryw/gitlanding/blob/8628d6bc47ba368b08903725e99e40c4eb640203/public/deploy.yaml#L17) of your CI workflow will make sure GitHub Pages understands the change.
{% endtab %}
{% endtabs %}

Commit and push your changes and your are good to go.

{% hint style="success" %}
You do not need to go to the GitHub Pages config and fill in your custom domain, it will be read from the CNAME file.
{% endhint %}
