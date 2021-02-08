"use strict";

/**
 * Module dependencies
 */

const AWS = require("aws-sdk");

module.exports = {
  init(config) {
    // available exoscale regions
    const regions = [
      "de-fra-1",
      "de-muc-1",
      "at-vie-1",
      "ch-gva-2",
      "ch-dk-2",
      "bg-sof-1",
    ];

    // configure exoscale bucket connection
    const S3 = new AWS.S3({
      endpoint: "sos-".concat(config.region, ".exo.io"),
      ...config,
    });

    return {
      upload(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          if (!regions.includes(config.region.toLowerCase())) {
            return reject(
              config.region.concat(" is not a valid Exoscale Region.")
            );
          }

          // upload file(s) to the exoscale bucket
          const path = file.path ? `${file.path}/` : "";
          S3.upload(
            {
              Key: `${path}${file.hash}${file.ext}`,
              Body: Buffer.from(file.buffer, "binary"),
              ACL: "public-read",
              ContentType: file.mime,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              // set the bucket file url
              file.url = data.Location;

              resolve();
            }
          );
        });
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // delete the file on exoscale bucket
          const path = file.path ? `${file.path}/` : "";
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });
      },
    };
  },
};
