const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const getTours = (request, response) => {
    //console.log("getTours");
    n_id_tipo_tour = request.body.n_id_tipo_tour;
    let cadena = `SELECT t.nombre, t.precio, f.c_nombre, t.n_id_tipo_tour FROM tours t 
     INNER JOIN foto f on f.n_id_foto = t.n_id_foto 
     WHERE t.n_id_tipo_tour = ${n_id_tipo_tour}
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

const getToursAll = (request, response) => {
    //console.log("getTours");
    let cadena = `SELECT t.*, d.c_nombre as departamento, l.c_nombre as lugar  FROM tours t
        LEFT OUTER JOIN departamento d on d.n_id_departamento = t.n_id_departamento
        LEFT OUTER JOIN lugar l on l.n_id_lugar = t.n_id_lugar
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
    getTours,
    getToursAll
}