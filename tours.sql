-- create database tours;
-- use tours;

CREATE TABLE departamento (
    n_id_departamento INT PRIMARY KEY,
    c_nombre VARCHAR(250)
);

CREATE TABLE lugar (
    n_id_lugar INT PRIMARY KEY,
    n_id_departamento INT,
    c_nombre VARCHAR(250),
    FOREIGN KEY (n_id_departamento) REFERENCES departamento(n_id_departamento)
);

-- select nombre, precio from tours;

CREATE TABLE tours (
    n_id_tours INT PRIMARY KEY,
    nombre VARCHAR(250),
    precio INT,
    n_id_departamento INT,
    n_id_lugar INT,
    c_disponibilidad VARCHAR(50),
    n_edad_min INT,
    n_person_max INT,
    c_detalle VARCHAR(1000),
    c_ubicacion VARCHAR(50),
    FOREIGN KEY (n_id_departamento) REFERENCES departamento(n_id_departamento),
    FOREIGN KEY (n_id_lugar) REFERENCES lugar(n_id_lugar)
);

CREATE TABLE actividad (
    n_id_actividad INT PRIMARY KEY,
    n_id_tours INT,
    c_detalle VARCHAR(1000),
    FOREIGN KEY (n_id_tours) REFERENCES tours(n_id_tours)
);

CREATE TABLE contenido (
    n_id_contenido INT PRIMARY KEY,
    n_id_tours INT,
    c_detalle VARCHAR(1000),
    FOREIGN KEY (n_id_tours) REFERENCES tours(n_id_tours)
);

CREATE TABLE no_contenido (
    n_idno_contenido INT PRIMARY KEY,
    n_id_tours INT,
    c_detalle VARCHAR(1000),
    FOREIGN KEY (n_id_tours) REFERENCES tours(n_id_tours)
);

CREATE TABLE recomendacion (
    n_id_recomendacion INT PRIMARY KEY,
    n_id_tours INT,
    c_detalle VARCHAR(1000),
    FOREIGN KEY (n_id_tours) REFERENCES tours(n_id_tours)
);

-- Inserciones para la tabla 'departamento'
INSERT INTO departamento (n_id_departamento, c_nombre) VALUES (1, 'Cusco');
INSERT INTO departamento (n_id_departamento, c_nombre) VALUES (2, 'Lima');
INSERT INTO departamento (n_id_departamento, c_nombre) VALUES (3, 'Arequipa');

-- Inserciones para la tabla 'lugar'
INSERT INTO lugar (n_id_lugar, n_id_departamento, c_nombre) VALUES (1, 1, 'Moray');
INSERT INTO lugar (n_id_lugar, n_id_departamento, c_nombre) VALUES (2, 1, 'Valle Sur de Cusco');
INSERT INTO lugar (n_id_lugar, n_id_departamento, c_nombre) VALUES (3, 1, 'Valle Sagrado');
INSERT INTO lugar (n_id_lugar, n_id_departamento, c_nombre) VALUES (4, 1, 'Machu Picchu');
INSERT INTO lugar (n_id_lugar, n_id_departamento, c_nombre) VALUES (5, 1, 'Cusco City Tour');

-- Inserciones para la tabla 'tours'
INSERT INTO tours (n_id_tours, nombre, precio, n_id_departamento, n_id_lugar, c_disponibilidad, n_edad_min, n_person_max, c_detalle, c_ubicacion) 
VALUES (1, 'Tour Moray Salineras', 16, 1, 1, 'Ene - Dic', 4, 16, 'Recorre, con nuestro tour Maras, Moray y Salineras, los tres importantes centros arqueologicos que, normalmente, no estan incluidos en los tours clasicos al Valle Sagrado de los Incas.', '');
INSERT INTO tours (n_id_tours, nombre, precio, n_id_departamento, n_id_lugar, c_disponibilidad, n_edad_min, n_person_max, c_detalle, c_ubicacion) 
VALUES (2, 'Tour Valle Sur Cusco: Tipon, Piquillacta y Andahuaylillas', 17, 1, 2, 'Ene - Dic', 4, 16, 'Nuestro tour Valle Sur Cusco te lleva a visitar los complejos arqueologicos mas importantes del Valle Sur Cusco, que se encuentran al sur este de la ciudad inca de Cusco.', '');
INSERT INTO tours (n_id_tours, nombre, precio, n_id_departamento, n_id_lugar, c_disponibilidad, n_edad_min, n_person_max, c_detalle, c_ubicacion) 
VALUES (3, 'Tour Valle Sagrado de los Incas: Pisac, Ollantaytambo y Chinchero', 38, 1, 3, 'Ene - Dic', 4, 16, 'Reserva nuestro Tour Valle Sagrado y recorre el maravilloso circuito turistico del Valle Sagrado de los Incas (en Cusco – Peru), donde observaras magnificos paisajes naturales y visitaras los impresionantes complejos arqueologicos de la region Cusco:', '');
INSERT INTO tours (n_id_tours, nombre, precio, n_id_departamento, n_id_lugar, c_disponibilidad, n_edad_min, n_person_max, c_detalle, c_ubicacion) 
VALUES (4, 'Tour Machu Picchu 1 Dia desde Cusco (Tour Privado – Todo Incluido)', 319, 1, 4, 'Ene - Dic', 4, 16, 'Tour Machu Picchu 1 dia; tu viaje a Machu Picchu no tiene por que convertirse en una odisea. Al contrario, tiene que ser la mejor experiencia de tu vida. Por eso, hemos diseñado para ti un tour exclusivo a Machu Picchu, en servicio privado y con lo mas destacado. Reserva nuestro Tour Machu Picchu 1 Dia y disfruta de una emocionante excursion por Machu Picchu.', '');
INSERT INTO tours (n_id_tours, nombre, precio, n_id_departamento, n_id_lugar, c_disponibilidad, n_edad_min, n_person_max, c_detalle, c_ubicacion) 
VALUES (5, 'City Tour Cusco: Catedral, Coricancha, Sacsayhuaman, Qenqo, Tambomachay y Puca Pucara', 10, 1, 5, 'Ene - Dic', 4, 16, 'El City Tour Cusco es un tour, de aproximadamente 5 horas de recorrido, que te lleva a visitar los 6 lugares turisticos mas importantes de la ciudad cosmopolita de Cusco', '');

-- Inserciones para la tabla 'actividad'
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (1, 1, 'El centro experimental agricola inca de Moray. Ubicado a 7 km al oeste del pueblo de Maras y a una altitud de 3500 msnm. Esta zona arqueologica destaca por su sistema de andenes circulares que, en la epoca inca, sirvieron como un centro de investigacion agricola para la adaptacion de las plantas a los diferentes pisos ecologicos.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (2, 1, 'El pueblo tradicional de Maras. Situado a 74 km de la ciudad de Cusco. Es un antiguo pueblo colonial que destaca por sus escudos nobiliarios, de nobles indios de la colonia, que todavia lucen en los dinteles de algunas puertas. Durante la colonia, por encontrarse muy cerca a las Minas de Sal de Salineras, fue un importante enclave politico-administrativo.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (3, 1, 'Las minas de sal de Salineras. Conformado por mas de 3000 pozos pequeños que estan excavados en la escarpada ladera de una quebrada. En estos pozos, siguiendo metodos ancestrales, se almacena y cristaliza el agua salada que emana el manantial de la montaña Qaqawiñay.');

INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (4, 2, 'El Centro Arqueologico de Tipon. Ubicado a 27 km de la ciudad de Cusco, en el distrito de Oropesa. Considerado, segun muchos estudiosos, un templo inca al agua. Ya que acoge una de las mas grandes obras de irrigacion y un complejo sistema de andenes.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (5, 2, 'La ciudad Pre-inca de Pikillacta. Ubicado en el distrito de Lucre, proximo a los humedales de Huacarpay. Es una de las ciudades pre-incas, mas conocidas y mejor conservadas de la cultura Wari.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (6, 2, 'La capilla de San Pedro Apostol de Andahuaylillas. Uno de los templos coloniales mas hermosos de America, mas conocido como la Capilla Sixtina de America. Acoge lo mejor del arte colonial de la Escuela Cusqueña.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (7, 2, 'Ademas, tendras la oportunidad de probar los deliciosos panes Chuta, que son tradicionales en la localidad de Oropesa.');

INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (8, 3, 'El Centro Arqueologico de Pisac.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (9, 3, 'El Mercado Tradicional de Pisac.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (10, 3, 'La Fortaleza de Ollantaytambo.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (11, 3, 'El Sitio Arqueologico de Chinchero.');

INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (12, 4, 'Esta magica aventura por Machu Picchu tiene una duracion de 16 horas. Y todo el viaje es en servicio bimodal donde combinaras la comodidad y seguridad de viajar en bus y tren turistico.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (13, 4, 'Empieza tu aventura en las magicas calles de Cusco abordando, desde la comodidad de tu hotel, nuestro moderno bus turistico. Y, en compañia de nuestro equipo de profesionales del turismo (conductor y transfer), viaja hasta la estacion de Ollantaytambo, en el Valle Sagrado de los Incas.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (14, 4, 'Luego continua con tu aventura en el exclusivo tren turistico VISTADOME o tren EXPEDITION de Perurail hasta la estacion de Aguas Calientes (Machu Picchu Pueblo) donde te estara esperando nuestro guia local para explorar contigo las zonas mas visitadas de Machu Picchu.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (15, 4, 'Finalmente, despues de un emocionante dia en Machu Picchu, retorna a la ciudad de Cusco, en la misma modalidad de servicio que te brindamos durante el viaje de ida.');

INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (16, 5, 'Basilica Catedral de la Virgen de la Asuncion, monumento religioso mas importante de la fe catolica en la ciudad de Cusco y America.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (17, 5, 'Qoricancha o Santo Domingo, fastuoso templo inca dedicado al dios inti (sol) y en la actualidad se encuentra el Templo de Santo Domingo.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (18, 5, 'Sacsayhuaman, fortaleza ceremonial que acoge impresionantes andenes y templos de piedra.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (19, 5, 'Qenqo, anfiteatro de enigmaticos promontorios rocosos y caminos laberinticos.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (20, 5, 'Puca Pucara, fortaleza militar de grandes terrazas, muros y escalinatas de piedra.');
INSERT INTO actividad (n_id_actividad, n_id_tours, c_detalle) VALUES (21, 5, 'Tambomachay, templo al agua y lugar de descanso durante la epoca Inca para la nobleza.');


-- Inserciones para la tabla 'contenido'
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (1, 1, 'Tour a Maras, Moray y Salineras, en servicio compartido.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (2, 1, 'Servicio de guiado en el idioma requerido: español o ingles.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (3, 1, 'Asistencia y recojo desde tu hotel, en el centro historico de la ciudad de Cusco.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (4, 1, 'Transporte turistico durante el tour.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (5, 1, 'Equipo de primeros auxilios.');

INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (6, 2, 'Guia profesional de acuerdo al idioma requerido: español o ingles.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (7, 2, 'Asistencia y recojo de su hotel, en el centro historico de Cusco.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (8, 2, 'Bus turistico para el tour.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (9, 2, 'Equipo de primeros auxilios + asistencia.');

INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (10, 3, 'Bus turistico Sprinter de 18 pasajeros (siendo 16 el numero maximo de pasajeros durante el tour al Valle Sagrado).');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (11, 3, 'Guia local profesional de acuerdo al idioma (español o ingles).');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (12, 3, '01 almuerzo buffet en Tunupa Restaurant, uno de los restaurantes mas exclusivos del Valle Sagrado de los Incas que esta ubicado en Urubamba.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (13, 3, 'Equipo de primeros auxilios + asistencia.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (14, 3, 'Asistencia y recojo desde su hotel (en el Centro Historico de la ciudad de Cusco).');

INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (15, 4, 'Asistencia y traslado en transporte turistico privado de ida y vuelta (VAN H1 o SPRINTER) entre Cusco y las respectivas estaciones de trenes. Cusco, Poroy u Ollantaytambo.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (16, 4, 'Servicio de transfer (ingles o español) durante los traslados desde la ciudad de Cusco hasta las respectivas estaciones.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (17, 4, 'Boleto de tren turistico Perurail o Incarail entre: Cusco, Poroy u Ollantaytambo a Aguas Calientes con retorno a las mismas estaciones.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (18, 4, 'Ticket de bus de Aguas Calientes a la ciudad inca de Machu Picchu (subida y bajada).');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (19, 4, 'Boleto de ingreso a la ciudadela inca de Machupicchu de acuerdo a los horarios de arribo a Aguas Calientes.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (20, 4, 'Guia local profesional en el idioma requerido (ingles o español).');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (21, 4, 'Tour guiado en Machu Picchu, en servicio privado por 3 horas y como maximo.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (22, 4, 'Tiempo libre en la ciudadela Inca de Machu Picchu.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (23, 4, 'Equipo de primeros auxilios + asistencia.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (24, 4, 'Equipo de primeros auxilios durante el viaje.');

INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (25, 5, 'Bus Sprinter turistico para el tour por la ciudad de Cusco y los 4 centros arqueologicos cercanos.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (26, 5, 'Asistencia y recojo desde su hotel, en el centro historico de la ciudad de Cusco. Si su hotel esta fuera del centro historico, le comunicaremos la manera de poder recogerlo o de lo contrario se unira al grupo en la Plaza Mayor de Cusco.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (27, 5, 'Guia profesional en idioma ingles y español.');
INSERT INTO contenido (n_id_contenido, n_id_tours, c_detalle) VALUES (28, 5, 'Botiquin de primeros auxilios.');

-- Inserciones para la tabla 'no_contenido'
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (1, 1, 'Boleto Turistico Cusco ni ticket de ingreso a las Salinas de Maras (Salineras).');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (2, 1, 'Bebidas ni snacks.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (3, 1, 'Gastos adicionales por problemas climatologicos.');

INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (4, 2, 'Boleto Turistico Cusco.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (5, 2, 'Traslados entre: aeropuerto – hotel – aeropuerto.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (6, 2, 'Gastos adicionales por problemas climatologicos.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (7, 2, 'Gratitudes (TIPS).');

INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (8, 3, 'Boleto turistico general Cusco o boleto parcial del Valle Sagrado de los Incas.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (9, 3, 'Bebidas (agua) ni snacks durante el tour.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (10, 3, 'Traslados desde el aeropuerto al centro de la ciudad de Cusco para iniciar el tour al Valle Sagrado.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (11, 3, 'Gastos adicionales por problemas climaticos y otros de ultimo momento.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (12, 3, 'Cancelaciones de ultimo momento por factores climatologicos o motivos de fuerza mayor.');

INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (13, 4, 'Gastos adicionales por problemas climatologicos o cancelacion de trenes de ultimo momento.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (14, 4, 'Cargos extras ocasionados durante tu visita a la ciudad inca de Machu Picchu.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (15, 4, 'Alimentacion y bebidas no indicados en el tour, como agua embotellada.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (16, 4, 'El almuerzo es a cuenta del pasajero, nos encargamos de recomendarte los mejores restaurantes de Aguas Calientes para que puedas probar lo mejor de la gastronomia local.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (17, 4, 'Entradas a las montañas de Huayna Picchu ni a la montaña Machu Picchu.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (18, 4, 'Gratitudes con los integrantes de nuestro equipo.');

INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (19, 5, 'Boleto turistico del Cusco para turistas extranjeros, tampoco el boleto Turistico Promocional para turistas nacionales.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (20, 5, 'Ticket de ingreso a la Catedral de Cusco.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (21, 5, 'Ticket de ingreso al Templo de Santo Domingo – Coricancha.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (22, 5, 'El almuerzo es a cuenta del pasajero, nos encargamos de recomendarte los mejores restaurantes de Aguas Calientes para que puedas probar lo mejor de la gastronomia local.');
INSERT INTO no_contenido (n_idno_contenido, n_id_tours, c_detalle) VALUES (23, 5, 'Gastos adicionales por problemas climatologicos.');


-- Inserciones para la tabla 'recomendacion'
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (1, 1, 'Pasaporte // Tarjeta ISIC // DNI, obligatorio.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (2, 1, 'Impermeables para la lluvia entre diciembre a abril.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (3, 1, 'Camara fotografica o camara filmadora con bateria extra.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (4, 1, 'Protector solar y sombrero de ala ancha.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (5, 1, 'Dinero extra para gastos personales adicionales y gratitudes.');

INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (6, 2, 'Pasaporte // Tarjeta ISIC // DNI, obligatorio.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (7, 2, 'Impermeables durante la temporada de lluvia.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (8, 2, 'Gorra, lentes de sol y bloqueador solar');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (9, 2, 'Camara fotografica con bateria extra.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (10, 2, 'Dinero extra para gastos personales adicionales y gratitudes.');

INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (11, 3, 'Pasaporte // Tarjeta ISIC // DNI, obligatorio.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (12, 3, 'Impermeables para la lluvia entre diciembre a abril.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (13, 3, 'Camara fotografica o camara filmadora con bateria extra.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (14, 3, 'Protector solar y sombrero de ala ancha.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (15, 3, 'Dinero extra para gastos personales adicionales y gratitudes.');

INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (16, 4, 'Pasaporte // Tarjeta ISIC // DNI, obligatorio.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (17, 4, 'Impermeables durante la temporada de lluvia.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (18, 4, 'Gorra, lentes de sol y bloqueador solar');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (19, 4, 'Camara fotografica con bateria extra.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (20, 4, 'Dinero extra para gastos personales adicionales y gratitudes.');

INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (21, 5, 'Pasaporte // Tarjeta ISIC // DNI, obligatorio.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (22, 5, 'Impermeables para la lluvia entre diciembre a abril.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (23, 5, 'Camara fotografica o camara filmadora con bateria extra.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (24, 5, 'Protector solar y sombrero de ala ancha.');
INSERT INTO recomendacion (n_id_recomendacion, n_id_tours, c_detalle) VALUES (25, 5, 'Dinero extra para gastos personales adicionales y gratitudes.');

CREATE TABLE foto(
	n_id_foto INT PRIMARY KEY,
    c_nombre varchar(250)
); 
INSERT INTO foto (n_id_foto, c_nombre) VALUES (1, 'tour-maras-moray-y-salineras-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (2, 'tour-valle-sur-cusco-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (3, 'tour-valle-sagrado-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (4, 'tour-machu-picchu-1-dia-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (5, 'City-tour-cusco-150x150.jpg');


ALTER TABLE tours ADD COLUMN n_id_foto int REFERENCES foto(n_id_foto);
 UPDATE tours SET n_id_foto = 1 WHERE n_id_tours = 1;
 UPDATE tours SET n_id_foto = 2 WHERE n_id_tours = 2;
 UPDATE tours SET n_id_foto = 3 WHERE n_id_tours = 3;
 UPDATE tours SET n_id_foto = 4 WHERE n_id_tours = 4;
 UPDATE tours SET n_id_foto = 5 WHERE n_id_tours = 5;


CREATE TABLE usuario(
    id_usuario INT PRIMARY KEY,
    c_codigo VARCHAR(8),
    c_contrasena VARCHAR(8)
);

INSERT INTO usuario (id_usuario, c_codigo, c_contrasena) VALUES (1, '12345678', '13245678');

CREATE TABLE tipo_tour(
	n_id_tipo_tour INT PRIMARY KEY,
    c_codigo VARCHAR(50),
    c_desripcion VARCHAR(250)
 );
 
 INSERT INTO tipo_tour (n_id_tipo_tour, c_codigo, c_desripcion) VALUES (1, 'PTTC', 'Paquetes turisticos de Turismo Cultural');
 INSERT INTO tipo_tour (n_id_tipo_tour, c_codigo, c_desripcion) VALUES (2, 'ETH', 'Excursiones de Trekking & Hiking');
 INSERT INTO tipo_tour (n_id_tipo_tour, c_codigo, c_desripcion) VALUES (3, 'PVPI', 'Paquetes de Viajes a Peru, con todo incluido');
 INSERT INTO tipo_tour (n_id_tipo_tour, c_codigo, c_desripcion) VALUES (4, 'PVE', 'Paquetes de Viaje de Ecoturismo');
 
 ALTER TABLE tours ADD COLUMN n_id_tipo_tour INT REFERENCES tipo_tour(n_id_tipo_tour);
 
UPDATE tours SET n_id_tipo_tour = 1 WHERE  n_id_tours = 1;
UPDATE tours SET n_id_tipo_tour = 1 WHERE  n_id_tours = 2;
UPDATE tours SET n_id_tipo_tour = 1 WHERE  n_id_tours = 3;
UPDATE tours SET n_id_tipo_tour = 1 WHERE  n_id_tours = 4;
UPDATE tours SET n_id_tipo_tour = 1 WHERE  n_id_tours = 5;


INSERT INTO tours (n_id_tours, nombre, precio, n_id_departamento, n_id_lugar, c_disponibilidad, n_edad_min, n_person_max, c_detalle, c_ubicacion, n_id_tipo_tour) 
    VALUES 
    (6, 'Tour a la Montaña de 7 Colores desde Cusco', 37, 1, 1, 'Ene - Dic', 4, 16, 'Reserva nuestro Tour Montaña 7 Colores desde Cusco y visita Vinicunca, la majestuosa Montaña de Colores, catalogada por la revista National Geographic como uno de los 100 lugares en el mundo que debes visitar antes de morir, y uno de los destinos turisticos mas visitados de Cusco.', '', 2),
    (7, 'Tour Camino Inca 2 Dias', 799, 1, 2, 'Ene - Dic', 4, 16, 'Viaja, con nuestro programa de trek Camino Inca 2 Dias y 1 Noche, por una de las rutas de trekking mas fascinantes en America del Sur (Peru) que es muy buscado y recomendado por todos los apasionados y aventureros que aman la aventura y la adrenalina.', '', 2),
    (8, 'Tour Choquequirao Machu Picchu 9 Dias y 8 Noches', 1399, 1, 3, 'Ene - Dic', 4, 16, 'El tour Choquequirao Machu Picchu es un viaje de aventuras tan desafiante como gratificante que esta hecho especialmente para todos aquellos aventureros que aman el vertigo y la adrenalina.', '', 2),
    (9, 'Tour Choquequirao Trek 4 Dias', 790, 1, 4, 'Ene - Dic', 4, 16, '¿Buscas alejarte del bullicio de la ciudad? ¿Deseas sentir la adrenalina y la aventura? Entonces, siente con nosotros la emocion y el vertigo que nuestro tour Choquequirao Trek 4 dias y 3 noches te ofrece.', '', 2),
    (11, 'Tour Inca Jungle Trail 4 Dias, Trek Privado a Machu Picchu', 599, 1, 5, 'Ene - Dic', 4, 16, 'Descubre el misterio y el encanto del Inca Jungle, una ruta de trekking extrema y exigente. Sumergete en la union de los Andes y la calidez de la ceja de Selva. Recorre un sendero inca que es muy transitado por los amantes del trekking. Y llega caminando a la ciudadela inca de Machu Picchu.', '', 2),
    (12, 'Tour Inca Trail 4 Dias', 1250, 1, 5, 'Ene - Dic', 4, 16, 'Con nuestro programa top de trekking, Tour Inca Trail: recorre la ruta de trek mas famosa del mundo que tiene como destino final a la ciudad inca de Machu Picchu, camina por caminos ancestrales por donde una vez caminaron los incas, visita enigmaticos sitios arqueologicos que encajan perfectamente con el entorno natural, descubre magicos paisajes de los Andes peruanos y aprecia la gran biodiversidad (orquideas, gallitos de las rocas, osos de anteojos, etc.) distribuido en distintos pisos ecologicos.', '', 2),
    (13, 'Tour Laguna Humantay 1 Dia', 39, 1, 5, 'Ene - Dic', 4, 16, 'Si estas buscando nuevas aventuras: respirar aire 100% puro, conectarte con la naturaleza, observar paisajes realmente espectaculares y caminar a traves de estrechos y ancestrales caminos; nuestro Tour a la Laguna Humantay desde Cusco es el viaje ideal para ti.', '', 2),
    (14, 'Tour Salkantay Trek a Machu Picchu', 810, 1, 5, 'Ene - Dic', 4, 16, 'Si estas cansado del bullicio de la ciudad y buscas experiencias fuera de lo comun. O eres un amante de la naturaleza y quieres sentir el mundo natural y la energia de los Apus. El tour Salkantay Trek a la impresionante ciudadela de Machu Picchu es el tour ideal para ti.', '', 2);

INSERT INTO foto (n_id_foto, c_nombre) VALUES (6, 'tour-montana-7-colores-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (7, 'camino-inca-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (8, 'Trek-choquequirao-machu-picchu-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (9, 'Tour-choquequirao-4-dias-3-noches-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (10, 'inca-jungle-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (11, 'inca-trail-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (12, 'laguna-de-humantay-tour-150x150.jpg');
INSERT INTO foto (n_id_foto, c_nombre) VALUES (13, 'Salkantay-trek-150x150.jpg');

UPDATE tours SET n_id_foto = 6 WHERE n_id_tours = 6;
UPDATE tours SET n_id_foto = 7 WHERE n_id_tours = 7;
UPDATE tours SET n_id_foto = 8 WHERE n_id_tours = 8;
UPDATE tours SET n_id_foto = 9 WHERE n_id_tours = 9;
UPDATE tours SET n_id_foto = 10 WHERE n_id_tours = 11;
UPDATE tours SET n_id_foto = 11 WHERE n_id_tours = 12;
UPDATE tours SET n_id_foto = 12 WHERE n_id_tours = 13;
UPDATE tours SET n_id_foto = 13 WHERE n_id_tours = 14;