const njwt = require('njwt');
const fs = require('fs');

const privateKey = 
`-----BEGIN PRIVATE KEY-----
TBD
-----END PRIVATE KEY-----`
const clientId = "0oab2vn9ik2C77jLi5d7"; // Or load from configuration
const now = Math.floor( new Date().getTime() / 1000 ); // seconds since epoch
const plus5Minutes = new Date( ( now + (5*60) ) * 1000); // Date object
const alg = 'RS256'; // one of RSA or ECDSA algorithms: RS256, RS384, RS512, ES256, ES384, ES512

const claims = {
  aud: "https://dev-56782738.okta.com/oauth2/v1/token",
};

const jwt = njwt.create(claims, privateKey, alg)
  .setIssuedAt(now)
  .setExpiration(plus5Minutes)
  .setIssuer(clientId)
  .setSubject(clientId)
  .compact();

fs.writeFile('./result.txt', jwt, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});