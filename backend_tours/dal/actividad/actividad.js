const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const getActividadAll = (request, response) => {
    
    let cadena = `SELECT a.*, t.nombre as tour FROM actividad a 
     INNER JOIN tours t on t.n_id_tours = a.n_id_tours 
    `
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
    getActividadAll,
}