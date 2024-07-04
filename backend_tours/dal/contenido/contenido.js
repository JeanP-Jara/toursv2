const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const getAll = (request, response) => {
    
    let cadena = `SELECT a.*, t.nombre as tour FROM contenido a 
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

const actualizar = (request, response) => {
    console.log(request.body);
    n_id_contenido = request.body.n_id_contenido;
    n_id_tours = request.body.n_id_tours;
    c_detalle = request.body.c_detalle;

    let cadena = `UPDATE contenido SET n_id_tours = ${n_id_tours}, c_detalle = '${c_detalle}' WHERE n_id_contenido = ${n_id_contenido}`;

    conn.query(cadena, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            response.status(200).json({ estado: true, mensaje: "", data: results})
        }
    })
}

const agregar = (request, response) => {

    console.log(request.body);

    n_id_tours = request.body.n_id_tours;
    c_detalle = request.body.c_detalle;

    let cadena = `INSERT INTO contenido(n_id_tours, c_detalle)
        VALUES (${n_id_tours}, '${c_detalle}')`;

    conn.query(cadena, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            response.status(200).json({ estado: true, mensaje: "", data: results})
        }
    })
}

const eliminar = (request, response) => {

    console.log(request.body);

    n_id_contenido = request.body.n_id_contenido;

    let cadena = `DELETE FROM contenido WHERE n_id_contenido = ${n_id_contenido}`;

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
    getAll,
    actualizar,
    agregar,
    eliminar
}