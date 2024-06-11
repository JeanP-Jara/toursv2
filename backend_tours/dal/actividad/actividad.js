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

const actualizarActividad = (request, response) => {
    console.log(request.body);
    n_id_actividad = request.body.n_id_actividad;
    n_id_tours = request.body.n_id_tours;
    c_detalle = request.body.c_detalle;

    let cadena = `UPDATE actividad SET n_id_tours = ${n_id_tours}, c_detalle = '${c_detalle}' WHERE n_id_actividad = ${n_id_actividad}`;

    conn.query(cadena, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            response.status(200).json({ estado: true, mensaje: "", data: results})
        }
    })
}

const agregarActividad = (request, response) => {

    console.log(request.body);

    n_id_tours = request.body.n_id_tours;
    c_detalle = request.body.c_detalle;

    let cadena = `INSERT INTO actividad(n_id_tours, c_detalle)
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

const eliminarActividad = (request, response) => {

    console.log(request.body);

    n_id_actividad = request.body.n_id_actividad;

    let cadena = `DELETE FROM actividad WHERE n_id_actividad = ${n_id_actividad}`;

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
    actualizarActividad,
    agregarActividad,
    eliminarActividad
}