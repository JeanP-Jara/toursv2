const cnx = require('../../common/appsettings');
let conn = cnx.connection;
const encriptar = require('../../common/encriptar');
const valida = require('../../common/token');

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

const insertUsuario = (request, response) => {

    let c_codigo = request.body.c_codigo;
    let c_contrasena = encriptar.encriptarText(request.body.c_contrasena);
    console.log(c_codigo, c_contrasena);
    let cadena = `INSERT INTO usuario (c_codigo, c_contrasena) VALUES ('${c_codigo}', '${c_contrasena}')`;
    conn.query(cadena, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            response.status(200).json({ estado: true, mensaje: "", data: results})
        }
    });
}

const deleteUsuario = (request, response) => {
    var obj = valida.validaToken(request);

    if(obj.estado){
        let id_usuario = request.body.id_usuario;
        let cadena = `DELETE FROM usuario WHERE id_usuario = ${id_usuario}`;
        conn.query(cadena, (error, results) => {
            if (error) {
                console.log(error.message);
                response.status(200).json({ estado: false, mensaje: "error", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results})
            }
        });
    }else{
        response.status(200).json(obj)
    } 

    
}

const updateUsuario = (request, response) => {

    let id_usuario = request.body.id_usuario;
    let c_codigo = request.body.c_codigo;
    let c_contrasena = encriptar.encriptarText(request.body.c_contrasena);    

    var obj = valida.validaToken(request);

    if(obj.estado){
        let cadena = `UPDATE usuario SET c_codigo = '${c_codigo}', c_contrasena = '${c_contrasena}' WHERE id_usuario = ${id_usuario}`;
        conn.query(cadena, (error, results) => {
            if (error) {
                console.log(error.message);
                response.status(200).json({ estado: false, mensaje: "error", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results})
            }
        });
    }else{
        response.status(200).json(obj)
    }
}

module.exports = {
    listarUsuarios,
    insertUsuario,
    deleteUsuario,
    updateUsuario
}