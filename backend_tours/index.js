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
const dbActividad = require('./dal/actividad/actividad');//USUARIO

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



server.listen(port, () => {
    console.log('\n')
    console.log(`App running on port ${port}.`)
});