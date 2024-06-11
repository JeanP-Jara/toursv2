const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const listar = (request, response) => {
    
    let cadena = `SELECT l.*, d.c_nombre as departamento FROM lugar l
                INNER JOIN departamento d ON d.n_id_departamento = l.n_id_departamento `
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

    let n_id_lugar = request.body.n_id_lugar;
    let n_id_departamento = request.body.n_id_departamento;
    let c_nombre = request.body.c_nombre;

    let cadena = `UPDATE lugar SET c_nombre = '${c_nombre}', n_id_departamento = ${n_id_departamento} WHERE n_id_lugar = ${n_id_lugar}`;

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

    let n_id_departamento = request.body.n_id_departamento;
    let c_nombre = request.body.c_nombre;

    let cadena = `INSERT INTO lugar(c_nombre, n_id_departamento)
        VALUES ('${c_nombre}', ${n_id_departamento})`;

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

    let n_id_lugar = request.body.n_id_lugar;

    let cadena = `DELETE FROM lugar WHERE n_id_lugar = ${n_id_lugar}`;

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