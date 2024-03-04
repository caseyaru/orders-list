const CryptoJS = require("crypto-js");

export function generateHash(data) {
    return CryptoJS.MD5(data).toString();
}