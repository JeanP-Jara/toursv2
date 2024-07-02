const cnx = require('../../common/appsettings');
const encriptar = require('../../common/encriptar');
const jwt = require('jsonwebtoken');
let conn = cnx.connection;

const login = (request, response) => {

    let c_codigo = request.body.c_codigo;
    let c_contrasena = encriptar.encriptarText(request.body.c_contrasena);

    let query = `SELECT * from USUARIO WHERE c_codigo = '${c_codigo}' AND c_contrasena = '${c_contrasena}'`;

    conn.query(query, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error: usuario o contraseña inválidos!.", data: null })
        } else {
            if (results.length > 0) {
                var tokenData = {
                    username: c_codigo
                }
                var token = jwt.sign(tokenData, 'Secret Password', {
                    expiresIn: 60 * 60 * 4 // 4 horas
                    })
                response.status(200).json({ estado: true, mensaje: "", data: results[0], token: token})
            } else {
                response.status(200).json({ estado: false, mensaje: "DB:usuario o contraseña inválidos!.", data: null })
            }
        }
    })
}

module.exports = {
    login
}