const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const listar = (request, response) => {
    
    let cadena = `SELECT * FROM departamento`
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
    n_id_departamento = request.body.n_id_departamento;
    c_nombre = request.body.c_nombre;

    let cadena = `UPDATE departamento SET c_nombre = '${c_nombre}' WHERE n_id_departamento = ${n_id_departamento}`;

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

    c_nombre = request.body.c_nombre;

    let cadena = `INSERT INTO departamento(c_nombre)
        VALUES ('${c_nombre}')`;

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

    n_id_departamento = request.body.n_id_departamento;

    let cadena = `DELETE FROM departamento WHERE n_id_departamento = ${n_id_departamento}`;

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