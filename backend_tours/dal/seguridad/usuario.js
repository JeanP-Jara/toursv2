const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const login = (request, response) => {

    conn.query('Select * from usuario', (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error: usuario o contraseña inválidos!.", data: null })
        } else {
            if (results.length > 0) {
                response.status(200).json({ estado: true, mensaje: "", data: results[0]})
            } else {
                response.status(200).json({ estado: false, mensaje: "DB:usuario o contraseña inválidos!.", data: null })
            }
        }
    })
}

module.exports = {
    login
}