const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const listar = (request, response) => {
    
    let cadena = `SELECT * FROM tipo_tour`
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
    n_id_tipo_tour = request.body.n_id_tipo_tour;
    c_codigo = request.body.c_codigo;
    c_desripcion = request.body.c_desripcion;

    let cadena = `UPDATE tipo_tour SET c_codigo = '${c_codigo}', c_desripcion = '${c_desripcion}' WHERE n_id_tipo_tour = ${n_id_tipo_tour}`;

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

    c_codigo = request.body.c_codigo;
    c_desripcion = request.body.c_desripcion;

    let cadena = `INSERT INTO tipo_tour(c_codigo, c_desripcion)
        VALUES ('${c_codigo}', '${c_desripcion}')`;

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

    n_id_tipo_tour = request.body.n_id_tipo_tour;

    let cadena = `DELETE FROM tipo_tour WHERE n_id_tipo_tour = ${n_id_tipo_tour}`;

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
    listar,
    actualizar,
    agregar,
    eliminar
}