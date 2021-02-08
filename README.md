# Strapi : Upload Provider for Exoscale

Strapi Upload Provider for Exoscale Storage (S3 compatible)

## Installation

```bash
npm install strapi-provider-upload-exoscale
```

## Usage

```javascript
module.exports = ({ env }) => ({
  upload: {
    provider: "exoscale",
    providerOptions: {
      accessKeyId: env("EXOSCALE_ACCESS_KEY_ID"),
      secretAccessKey: env("EXOSCALE_ACCESS_SECRET"),
      region: env("EXOSCALE_REGION"),
      params: {
        Bucket: env("EXOSCALE_BUCKETNAME"),
      },
    },
  },
});
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
- [Exoscale](https://www.exoscale.com/)