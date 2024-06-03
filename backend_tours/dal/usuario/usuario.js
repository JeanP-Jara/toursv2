const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const listarUsuarios = (request, response) => {
    let cadena = `SELECT * FROM usuario`
    conn.query(cadena, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            response.status(200).json({ estado: true, mensaje: "", data: results})
        }
    })
}

module.exports = {
    listarUsuarios
}