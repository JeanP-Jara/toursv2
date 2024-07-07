const cnx = require('../../common/appsettings')
let conn = cnx.connection;

const registrarVenta = (request, response) => {

    console.log(request.body);

    n_id_tours = request.body.n_id_tours;
    n_cant_personas = request.body.n_cant_personas;
    n_precio = request.body.n_precio;
    fecha = request.body.fecha;

    let cadena = `INSERT INTO ventatour(n_id_tours, n_cant_personas, n_precio, fecha)
        VALUES (${n_id_tours}, ${n_cant_personas}, ${n_precio}, '${fecha}')`;

    conn.query(cadena, (error, results) => {
        if (error) {
            console.log(error);
            response.status(200).json({ estado: false, mensaje: "error", data: null })
        } else {
            response.status(200).json({ estado: true, mensaje: "", data: results})
        }
    })
}

module.exports = {
    registrarVenta,
}