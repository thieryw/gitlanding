# Using a custom domain name

1\) Add a file called `CNAME` in the `public` folder of your project.

![](<../.gitbook/assets/Screenshot 2022-01-13 at 11.00.31.png>)

Write your domain name to the CNAME folder.

![](<../.gitbook/assets/Screenshot 2022-01-13 at 11.03.40.png>)

{% hint style="warning" %}
Do not fill in the custom domain form in your Github pages settings. Adding the CNAME file in your public folder ensures that it is done automaticaly.
{% endhint %}

![](<../.gitbook/assets/Screenshot 2022-01-13 at 11.54.11 (1).png>)

2\) Configure your A records with your DNS provider. Navigate to your DNS provider and create A records that target the [IP addresses for Github pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

![](<../.gitbook/assets/Screenshot 2022-01-13 at 11.31.29.png>)

![](<../.gitbook/assets/Screenshot 2022-01-13 at 11.35.22.png>)

![](<../.gitbook/assets/Screenshot 2022-01-13 at 11.41.04.png>)

3\) When you have done all this, commit and push your changes and your done. Navigate to your website using your new domain name to glory in the success of this operation.
