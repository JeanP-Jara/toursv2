const cnx = require('../../common/appsettings')
let conn = cnx.connection;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
var checksum = require('checksum');
const { result, forEach } = require('lodash');
const valida = require('../../common/token');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, req.query.c_ruta);
    },
    filename: (req, file, callback) => {
    callback(null, req.query.c_nombre);
    }
}); 

const upload = multer({ storage: storage }).single('DA');
const ruta = '/archivos';

const getTours = (request, response) => {
    //console.log("getTours");
    n_id_tipo_tour = request.body.n_id_tipo_tour;
    let cadena = `SELECT t.* FROM tours t 
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
    let cadena = `SELECT t.*, d.c_nombre as departamento, l.c_nombre as lugar, tp.c_desripcion  FROM tours t
        LEFT OUTER JOIN departamento d on d.n_id_departamento = t.n_id_departamento
        LEFT OUTER JOIN lugar l on l.n_id_lugar = t.n_id_lugar        
        LEFT OUTER JOIN tipo_tour tp on tp.n_id_tipo_tour = t.n_id_tipo_tour
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


const getDetalleTour = (request, response) => {

    let n_id_tours = request.body.n_id_tours;

    let data;

    let actividades = [];
    let contenido = [];
    let no_contenido = [];
    let recomendaciones = [];    

    let cadena1 = `SELECT t.n_id_tours, t.nombre, t.precio, t.c_disponibilidad, t.n_id_departamento, d.c_nombre as departamento, t.n_id_lugar, l.c_nombre as lugar, 
                        t.n_edad_min, t.n_person_max, t.c_detalle, t.c_latitud, t.c_longitud, t.c_nombre1, t.c_ruta1, t.c_nombre2, t.c_ruta2
                    FROM tours t
                    LEFT OUTER JOIN departamento d on d.n_id_departamento = t.n_id_departamento
                    LEFT OUTER JOIN lugar l on l.n_id_lugar = t.n_id_lugar
                    WHERE t.n_id_tours = ${n_id_tours}`
    conn.query(cadena1, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            data = results[0];
            let cadena2 = `SELECT * FROM contenido WHERE n_id_tours = ${n_id_tours}`
            conn.query(cadena2, (error, results2) => {
                if (error) {
                    console.log(error.message);
                    response.status(200).json({ estado: false, mensaje: "error", data: null })
                } else {
                    contenido = results2.length > 0 ? results2 : [];
                    let cadena3 = `SELECT * FROM no_contenido WHERE n_id_tours = ${n_id_tours}`
                    conn.query(cadena3, (error, results3) => {
                        if (error) {
                            console.log(error.message);
                            response.status(200).json({ estado: false, mensaje: "error", data: null })
                        } else {
                            no_contenido = results3.length > 0 ? results3 : [];
                            let cadena4 = `SELECT * FROM recomendacion WHERE n_id_tours = ${n_id_tours}`
                            conn.query(cadena4, (error, results4) => {
                                if (error) {
                                    console.log(error.message);
                                    response.status(200).json({ estado: false, mensaje: "error", data: null })
                                } else {
                                    recomendaciones = results4.length > 0 ? results4 : [];
                                    let cadena5 = `SELECT * FROM actividad WHERE n_id_tours = ${n_id_tours}`
                                    conn.query(cadena5, (error, results5) => {
                                        if (error) {
                                            console.log(error.message);
                                            response.status(200).json({ estado: false, mensaje: "error", data: null })
                                        } else {
                                            actividades = results5.length > 0 ? results5 : [];

                                            data.actividades = actividades;
                                            data.contenido = contenido;
                                            data.no_contenido = no_contenido;
                                            data.recomendaciones = recomendaciones;

                                            response.status(200).json({ estado: true, mensaje: "", data: data})
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

const actualizar = (request, response) => {
    var obj = valida.validaToken(request);

    if(obj.estado){
        console.log(request.body);

        let n_id_tours = request.body.n_id_tours;
        let nombre = request.body.nombre;
        let precio = request.body.precio;
        let n_id_departamento = request.body.n_id_departamento;
        let n_id_lugar = request.body.n_id_lugar;
        let c_disponibilidad = request.body.c_disponibilidad;
        let n_edad_min = request.body.n_edad_min;
        let n_person_max = request.body.n_person_max;
        let c_detalle = request.body.c_detalle;
        let c_latitud = request.body.c_latitud;
        let c_longitud = request.body.c_longitud;
        let c_nombre1 = request.body.c_nombre1;
        let c_ruta1 = request.body.c_ruta1;
        let c_nombre2 = request.body.c_nombre2;
        let c_ruta2 = request.body.c_ruta2;
        let n_id_tipo_tour = request.body.n_id_tipo_tour;

        let cadena = `UPDATE tours SET nombre = '${nombre}', precio = ${precio}, n_id_departamento = ${n_id_departamento}, n_id_lugar = ${n_id_lugar}, 
        c_disponibilidad = '${c_disponibilidad}', n_edad_min = ${n_edad_min}, n_person_max = ${n_person_max}, c_detalle = '${c_detalle}', 
        c_latitud = ${c_latitud == null || c_latitud == undefined ? null : `'${c_latitud}'`}, 
        c_longitud = ${c_longitud == null || c_longitud == undefined ? null : `'${c_longitud}'`},
        c_nombre1 = ${c_nombre1 == null || c_nombre1 == undefined ? null : `'${c_nombre1}'`}, 
        c_ruta1 = ${c_ruta1 == null || c_ruta1 == undefined ? null : `'${c_ruta1}'`}, 
        c_nombre2 = ${c_nombre2 == null || c_nombre2 == undefined ? null : `'${c_nombre2}'`}, 
        c_ruta2 = ${c_ruta2 == null || c_ruta2 == undefined ? null : `'${c_ruta2}'`}, 
        n_id_tipo_tour = ${n_id_tipo_tour}
        WHERE n_id_tours = ${n_id_tours};`;

        console.log(cadena);

        conn.query(cadena, (error, results) => {
            if (error) {
                console.log(error);
                console.log(error.message);
                response.status(200).json({ estado: false, mensaje: "error", data: null })
            } else {
                response.status(200).json({ estado: true, mensaje: "", data: results})
            }
        })
    }else{
        response.status(200).json(obj)
    }    
}

const agregar = (request, response) => {

    var obj = valida.validaToken(request);

    if(obj.estado){
        console.log(request.body);

        let nombre = request.body.nombre;
        let precio = request.body.precio;
        let n_id_departamento = request.body.n_id_departamento;
        let n_id_lugar = request.body.n_id_lugar;
        let c_disponibilidad = request.body.c_disponibilidad;
        let n_edad_min = request.body.n_edad_min;
        let n_person_max = request.body.n_person_max;
        let c_detalle = request.body.c_detalle;
        let c_latitud = request.body.c_latitud;
        let c_longitud = request.body.c_longitud;
        let c_nombre1 = request.body.c_nombre1;
        let c_ruta1 = request.body.c_ruta1;
        let c_nombre2 = request.body.c_nombre2;
        let c_ruta2 = request.body.c_ruta2;
        let n_id_tipo_tour = request.body.n_id_tipo_tour;

        let cadena = `INSERT INTO tours(nombre, precio, n_id_departamento, n_id_lugar, c_disponibilidad, n_edad_min, n_person_max, c_detalle, c_latitud, c_longitud, c_nombre1, c_ruta1, c_nombre2, c_ruta2, n_id_tipo_tour)
            VALUES ('${nombre}', ${precio}, ${n_id_departamento}, ${n_id_lugar}, '${c_disponibilidad}', ${n_edad_min}, ${n_person_max}, '${c_detalle}', '${c_latitud}',
            '${c_longitud}', '${c_nombre1}', '${c_ruta1}','${c_nombre2}', '${c_ruta2}', ${n_id_tipo_tour} )`;

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

const eliminar = (request, response) => {

    var obj = valida.validaToken(request);

    if(obj.estado){
        console.log(request.body);

        let n_id_tours = request.body.n_id_tours;

        let cadena = `DELETE FROM tours WHERE n_id_tours = ${n_id_tours}`;

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

const guardarFoto = (req, res) => {
    console.log("guardarFoto--------------");
    let rutaCorta = "/imgProyecto";
    let dir = __dirname.replace('\\dal\\tour', '') + ruta + rutaCorta;
    let c_nombre = req.query.extension;

    console.log("rutaCorta", rutaCorta)
    console.log("c_nombre", c_nombre)
    console.log("__dirname", dir)

    if (!fs.existsSync(__dirname.replace('\\dal\\tour', '') + ruta )) {
        fs.mkdirSync(__dirname.replace('\\dal\\tour', '') + ruta, 0o744);
        fs.mkdirSync(dir, 0o744);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 0o744);
    }

    req.query.c_ruta = dir;
    req.query.c_nombre = c_nombre;
    dir = dir + '/' + c_nombre;

    console.log("DIR--", dir);


    upload(req, res, (err) => {
        if (err) {
            res.status(200).json({ estado: false, mensaje: "No se pudo cargar el archivo: " + err.stack, data: null })
        } else {
            checksum.file(dir, (err, sum) => {
                console.log("SUM", sum)
                nuevoNombreArchivo = __dirname.replace('\\dal\\tour', '') + ruta + "/" + rutaCorta +"/" + sum + path.extname(c_nombre);
                console.log("nuevoNombreArchivo", nuevoNombreArchivo);
                console.log("path.extname(c_nombre)", path.extname(c_nombre))
                fs.rename(dir, nuevoNombreArchivo, (err) => {
                    if (err) console.log('ERROR: ' + err);
                });
                newRuta = rutaCorta+"/" + sum + path.extname(c_nombre);

                // Enviar la información requerida al frontend
                res.status(200).json({ 
                    estado: true, 
                    mensaje: "Archivo cargado", 
                    c_ruta: newRuta, 
                    c_nombre: c_nombre, 
                    c_checksum: sum + path.extname(c_nombre),
                    rutaCorta: rutaCorta,
                    dir: dir
                });
                console.log("Error", err);
            })
        }
    });
}

module.exports = {
    getTours,
    getToursAll,
    getDetalleTour,
    guardarFoto,
    actualizar,
    agregar,
    eliminar
}