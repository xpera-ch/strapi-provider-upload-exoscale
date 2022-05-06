# Strapi v4: Upload Provider for Exoscale

Strapi v4 Upload Provider for Exoscale Storage (S3 compatible)

_fork of: https://github.com/xpera-ch/strapi-provider-upload-exoscale_

## Installation

```bash
npm install strapi-provider-upload-exoscale
# or
yarn add strapi-provider-upload-exoscale

```

## Setup

### Strapi Provider Settings

`plugins.js`

```javascript
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-exo",
      providerOptions: {
        accessKeyId: env("EXOSCALE_ACCESS_KEY_ID"),
        secretAccessKey: env("EXOSCALE_ACCESS_SECRET"),
        region: env("EXOSCALE_REGION"),
        params: {
          Bucket: env("EXOSCALE_BUCKETNAME"),
        },
      },
    },
  },
  // ...
});
```

_Security Middleware Configuration_
Due to the default settings in the Strapi Security Middleware you will need to modify the contentSecurityPolicy settings to properly see thumbnail previews in the Media Library. You should replace strapi::security string with the object bellow instead as explained in the middleware configuration documentation.

`middlewares.js`

```javascript
module.exports = [
  // ...
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "yourBucketName.yourRegion.exo.io",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "yourBucketName.yourRegion.exo.io",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```

### Exoscale Storage (Bucket) CORS Settings

Cross-origin resource sharing (CORS) defines a way for client web applications that are loaded in one domain to interact with resources in a different domain.

_Set the rules_

```xml
<?xml version="1.0" ?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>HEAD</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <ExposeHeader>Access-Control-Allow-Origin</ExposeHeader>
  </CORSRule>
</CORSConfiguration>
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
- [Exoscale](https://www.exoscale.com/)
