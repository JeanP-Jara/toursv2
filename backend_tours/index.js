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

const ruta = '/archivos';

app.use('/archivos', express.static(__dirname + ruta));

/****IMPORTACIONES DAL****/
const dbSeguridad = require('./dal/seguridad/usuario');//SEGURIDAD
const dbTour = require('./dal/tour/tour');//TOURSc
const dbUsuario = require('./dal/usuario/usuario');//USUARIO
const dbActividad = require('./dal/actividad/actividad');//ACTIVIDAD
const dbDepartamento = require('./dal/departamento/departamento');//DEPARTAMENTO
const dbLugar = require('./dal/lugar/lugar');//LUGAR
const dbTipoTour = require('./dal/tour/tipoTour');//TIPO_TOURS
const dbContenido = require('./dal/contenido/contenido');
const dbNoContenido = require('./dal/no_contenido/no_contenido');
const dbRecomedacion = require('./dal/recomendacion/recomendacion');


/****RUTAS****/
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
})

/****SEGURIDAD****/
app.post('/api/seguridad/login', dbSeguridad.login);

/****TOURS****/
app.post('/api/tours/tour', dbTour.getTours);
app.post('/api/tours/getToursAll', dbTour.getToursAll);
app.post('/api/tours/getDetalleTour', dbTour.getDetalleTour);
app.post('/api/tours/guardarFoto', dbTour.guardarFoto);
app.post('/api/tours/actualizar', dbTour.actualizar);
app.post('/api/tours/agregar', dbTour.agregar);
app.post('/api/tours/eliminar', dbTour.eliminar);


/****USUARIO****/
app.post('/api/usuario/listarUsuarios', dbUsuario.listarUsuarios);
app.post('/api/usuario/insertUsuario', dbUsuario.insertUsuario);
app.post('/api/usuario/deleteUsuario', dbUsuario.deleteUsuario);
app.post('/api/usuario/updateUsuario', dbUsuario.updateUsuario);

/****ACTIVIDAD****/
app.post('/api/actividad/getActividadAll', dbActividad.getActividadAll);
app.post('/api/actividad/actualizarActividad', dbActividad.actualizarActividad);
app.post('/api/actividad/agregarActividad', dbActividad.agregarActividad);
app.post('/api/actividad/eliminarActividad', dbActividad.eliminarActividad);

/****CONTENIDO****/
app.post('/api/contenido/getAll', dbContenido.getAll);
app.post('/api/contenido/actualizar', dbContenido.actualizar);
app.post('/api/contenido/agregar', dbContenido.agregar);
app.post('/api/contenido/eliminar', dbContenido.eliminar);

/****NO_CONTENIDO****/
app.post('/api/no_contenido/getAll', dbNoContenido.getAll);
app.post('/api/no_contenido/actualizar', dbNoContenido.actualizar);
app.post('/api/no_contenido/agregar', dbNoContenido.agregar);
app.post('/api/no_contenido/eliminar', dbNoContenido.eliminar);

/****RECOMENDACION****/
app.post('/api/recomendacion/getAll', dbRecomedacion.getAll);
app.post('/api/recomendacion/actualizar', dbRecomedacion.actualizar);
app.post('/api/recomendacion/agregar', dbRecomedacion.agregar);
app.post('/api/recomendacion/eliminar', dbRecomedacion.eliminar);


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