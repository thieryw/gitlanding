# 📣 Favicon and Meta Tags

### For changing the favicon (the little logo in your browser tab)

1. Navigate to [realfavicongenerator.net](https://realfavicongenerator.net/) and upload your image.
2. In the options set a [custom path](https://user-images.githubusercontent.com/6702424/137597391-1d0d5b26-0f5b-4d8d-8d29-46d874c4f4e0.png): `%PUBLIC_URL%/favicon`
3. insert [the code generated for you](https://user-images.githubusercontent.com/6702424/137597436-4f85641e-16a3-4cb9-8c4f-5fd4baf8effc.png) in the `<head>` of your `public/index.html` file
4. Create the `public/favicon` directory and extract the zip from there.

### Adding Meta Tags

1. Create the public/preview.(png | jpg) image from [this template](https://user-images.githubusercontent.com/6702424/80216211-00ef5280-863e-11ea-81de-59f3a3d4b8e4.png).
2. Consult [this commit ](https://github.com/thieryw/crispy-octo-bassoon/commit/02c52f0477e0348339ac6d4d2b434a6bde2711cc)to view the code to add in the `<head>` of your `public/index.html` file.

{% hint style="info" %}
You can use [metatags.io](https://metatags.io/) to generate your metatags but you must change the default url they provide to `%PUBLIC_URL%`.
{% endhint %}

![Here is an example when I send my example project link via Whatsapp](<.gitbook/assets/Screenshot 2021-10-17 at 21.05.07.png>)
