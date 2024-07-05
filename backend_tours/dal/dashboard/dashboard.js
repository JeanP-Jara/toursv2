const cnx = require('../../common/appsettings')
let conn = cnx.connection;


const getDataDashboard = (request, response) => {

    let cantTipoTour = [];
    let cantTipoTourMes = [];
    let cantTourMes = [];
    let cantTour = [];

    //CANTIDAD POR TIPO TOUR
    let cadena1 = `
        SELECT c_desripcion, c_codigo, COUNT(v.id) AS cantidad FROM ventatour v
            INNER JOIN tours t ON v.n_id_tours = t.n_id_tours
            INNER JOIN tipo_tour tt ON t.n_id_tipo_tour = tt.n_id_tipo_tour
        GROUP BY c_desripcion, c_codigo;
    `;
    conn.query(cadena1, (error, results) => {
        if (error) {
            console.log(error.message);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            if (results.length > 0) {
                cantTipoTour = results;
            }
            //CANTIDAD POR TIPO DE TOUR X MES
            let cadena2 = `
                SELECT MONTH(v.fecha) AS mes, c_desripcion, c_codigo, COUNT(v.id) AS cantidad FROM ventatour v
                    INNER JOIN tours t ON v.n_id_tours = t.n_id_tours
                    INNER JOIN tipo_tour tt ON t.n_id_tipo_tour = tt.n_id_tipo_tour
                GROUP BY MONTH(v.fecha), c_desripcion, c_codigo;
            `;
            conn.query(cadena2, (error, results2) => {
                if (error) {
                    console.log(error.message);
                    response.status(200).json({ estado: false, mensaje: "error", data: null })
                } else {
                    if (results2.length > 0) {
                        cantTipoTourMes = results2;
                    }
                    //CANTIDAD DE TOURS X MES
                    let cadena3 = `
                        SELECT MONTH(v.fecha) AS mes, COUNT(v.id) AS cantidad FROM ventatour v
                            INNER JOIN tours t ON v.n_id_tours = t.n_id_tours
                        GROUP BY MONTH(v.fecha);
                    `;
                    conn.query(cadena3, (error, results3) => {
                        if (error) {
                            console.log(error.message);
                            response.status(200).json({ estado: false, mensaje: "error", data: null })
                        } else {
                            if (results3.length > 0) {
                                cantTourMes = results3;
                            }
                            //CANTIDAD x TOURS
                            let cadena4 = `
                                SELECT t.nombre, COUNT(v.id) as cantidad FROM ventatour v
                                    INNER JOIN tours t ON v.n_id_tours = t.n_id_tours
                                GROUP BY t.nombre;
                            `;
                            conn.query(cadena4, (error, results4) => {
                                if (error) {
                                    console.log(error.message);
                                    response.status(200).json({ estado: false, mensaje: "error", data: null })
                                } else {
                                    if (results4.length > 0) {
                                        cantTour = results4;
                                    }
                                    data = {
                                        cantTour: cantTour,
                                        cantTourMes: cantTourMes,
                                        cantTipoTourMes: cantTipoTourMes,
                                        cantTipoTour: cantTipoTour
                                    }
                                    response.status(200).json({ estado: true, mensaje: "", data: data})
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

module.exports = {
    getDataDashboard
}