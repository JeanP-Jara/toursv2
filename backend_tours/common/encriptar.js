const md5 = require('md5');
function encriptarText( pass) {
    return md5(pass);
}

module.exports={
    encriptarText
}