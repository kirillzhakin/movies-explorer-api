const regRU = /^[?!,.а-яА-ЯёЁ0-9\s]+$/;
const regEN = /^[?!,.a-zA-Z0-9\s]+$/;
const regUrl = /^(http:\/\/|https:\/\/w*\w)/;
const regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
module.exports = {
  regRU, regEN, regUrl, regEmail,
};
