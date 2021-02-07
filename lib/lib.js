'use strict';

/**
 * Module dependencies
 */

const AWS = require('aws-sdk');

module.exports = {
  init(config) {
    // configure exoscale bucket connection
    const S3 = new AWS.S3({
      ...config,
    });

    return {
      upload(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // upload file(s) to the exoscale bucket
          const path = file.path ? `${file.path}/` : '';
          S3.upload(
              {
                Key: `${path}${file.hash}${file.ext}`,
                Body: Buffer.from(file.buffer, 'binary'),
                ACL: 'public-read',
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
              },
          );
        });
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // delete the file on exoscale bucket
          const path = file.path ? `${file.path}/` : '';
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
              },
          );
        });
      },
    };
  },
};
