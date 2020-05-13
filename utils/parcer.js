const https = require("https");
const xml2js = require("xml2js");

const parser = new xml2js.Parser({
  mergeAttrs: true,
  explicitArray: false
});

exports.xmlToJson = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
          let xml = "";
          res.on("data", chunk => {
            xml += chunk;
          });
          res.on("error", err => {
            reject(err);
          });
          res.on("timeout", err => {
            reject(err);
          });
          res.on("end", () => {
            parser.parseString(xml, (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
        }).on('error', err => {
          reject(err);
        });
    });
  }