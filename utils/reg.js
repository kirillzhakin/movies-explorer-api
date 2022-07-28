const regUrl = /^(http:\/\/|https:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/.+)/;
const regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
module.exports = { regUrl, regEmail };
