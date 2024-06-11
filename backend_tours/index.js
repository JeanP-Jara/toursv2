const express = require('express');
var cors = require('cors');
const app = express();
const port = 3200;
const server = require('http').Server(app);
var bodyParser = require('body-parser');

//MIDDLEWARES
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/****IMPORTACIONES DAL****/
const dbSeguridad = require('./dal/seguridad/usuario');//SEGURIDAD
const dbTour = require('./dal/tour/tour');//TOURS
const dbUsuario = require('./dal/usuario/usuario');//USUARIO
const dbActividad = require('./dal/actividad/actividad');//ACTIVIDAD
const dbDepartamento = require('./dal/departamento/departamento');//DEPARTAMENTO
const dbLugar = require('./dal/lugar/lugar');//LUGAR
const dbTipoTour = require('./dal/tour/tipoTour');//TIPO_TOURS

/****RUTAS****/
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
})

/****SEGURIDAD****/
app.get('/api/seguridad/login', dbSeguridad.login);

/****TOURS****/
app.post('/api/tours/tour', dbTour.getTours);
app.post('/api/tours/getToursAll', dbTour.getToursAll);

/****USUARIO****/
app.post('/api/usuario/listarUsuarios', dbUsuario.listarUsuarios);

/****ACTIVIDAD****/
app.post('/api/actividad/getActividadAll', dbActividad.getActividadAll);
app.post('/api/actividad/actualizarActividad', dbActividad.actualizarActividad);
app.post('/api/actividad/agregarActividad', dbActividad.agregarActividad);
app.post('/api/actividad/eliminarActividad', dbActividad.eliminarActividad);

/****DEPARTAMENTO****/
app.post('/api/departamento/listar', dbDepartamento.listar);
app.post('/api/departamento/actualizar', dbDepartamento.actualizar);
app.post('/api/departamento/agregar', dbDepartamento.agregar);
app.post('/api/departamento/eliminar', dbDepartamento.eliminar);

/****LUGAR****/
app.post('/api/lugar/listar', dbLugar.listar);
app.post('/api/lugar/actualizar', dbLugar.actualizar);
app.post('/api/lugar/agregar', dbLugar.agregar);
app.post('/api/lugar/eliminar', dbLugar.eliminar);

/****TIPO_TOUR****/
app.post('/api/tipo_tours/listar', dbTipoTour.listar);
app.post('/api/tipo_tours/actualizar', dbTipoTour.actualizar);
app.post('/api/tipo_tours/agregar', dbTipoTour.agregar);
app.post('/api/tipo_tours/eliminar', dbTipoTour.eliminar);


server.listen(port, () => {
    console.log('\n')
    console.log(`App running on port ${port}.`)
});