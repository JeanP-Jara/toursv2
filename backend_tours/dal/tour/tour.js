const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const getTours = (request, response) => {
    //console.log("getTours");
    n_id_tipo_tour = request.body.n_id_tipo_tour;
    let cadena = `SELECT t.n_id_tours, t.nombre, t.precio, f.c_nombre, t.n_id_tipo_tour FROM tours t 
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
                        t.n_edad_min, t.n_person_max, t.c_detalle, f.n_id_foto, f.c_nombre as foto FROM tours t
                    INNER JOIN departamento d on d.n_id_departamento = t.n_id_departamento
                    INNER JOIN lugar l on l.n_id_lugar = t.n_id_lugar
                    INNER JOIN foto f on f.n_id_foto = t.n_id_foto
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
                    contenido = results2;
                    let cadena3 = `SELECT * FROM no_contenido WHERE n_id_tours = ${n_id_tours}`
                    conn.query(cadena3, (error, results3) => {
                        if (error) {
                            console.log(error.message);
                            response.status(200).json({ estado: false, mensaje: "error", data: null })
                        } else {
                            no_contenido = results3;
                            let cadena4 = `SELECT * FROM recomendacion WHERE n_id_tours = ${n_id_tours}`
                            conn.query(cadena4, (error, results4) => {
                                if (error) {
                                    console.log(error.message);
                                    response.status(200).json({ estado: false, mensaje: "error", data: null })
                                } else {
                                    recomendaciones = results4;
                                    let cadena5 = `SELECT * FROM actividad WHERE n_id_tours = ${n_id_tours}`
                                    conn.query(cadena5, (error, results5) => {
                                        if (error) {
                                            console.log(error.message);
                                            response.status(200).json({ estado: false, mensaje: "error", data: null })
                                        } else {
                                            actividades = results5;

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

module.exports = {
    getTours,
    getToursAll,
    getDetalleTour
}