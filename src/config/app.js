/*

  En app.js se configuran los parametros generales de la aplicación
 
 */
 
 
 /*
 |||||||||||||||||||||||||||||||||||||||||||||||
  MODULOS INSTALADOS
 |||||||||||||||||||||||||||||||||||||||||||||||
 */


 const express = require ('express'); // Módulo express para configuración y manejo del servidor
 const morgan = require('morgan');   // Módulo morgan para visualizar las peticiones http del servidor en la terminal
 const path = require ('path');      // Módulo path  para manejo y seteo de rutas de directorio
 const bodyParser = require ('body-parser'); // No se esta utilizando este módulo
 const session = require ('express-session');
 const MySQLStore = require ('express-mysql-session')
 const cors = require("cors");

 var corsOptions = {
  origin: "http://heimdall.aira.mx"
};

 /*
  |||||||||||||||||||||||||||||||||||||||||||||||
   INITIALIZATIONS
  |||||||||||||||||||||||||||||||||||||||||||||||
 
  */ // express
 
  const app = express(); 


  /*
  |||||||||||||||||||||||||||||||||||||||||||||||
    SETTINGS
  |||||||||||||||||||||||||||||||||||||||||||||||
  */


 // Configuro el puerto: process.env.PORT es para cuando se sube al server en la Nube (Heroku) || 3000 para servidor local
 app.set('port', process.env.PORT || 8082);
 // Configuro el acceso a la carperta views, en la cual estare gestionando el FrontEnd 
 // app.set ('views', path.join(__dirname, 'views'));
 //

 
 // const helpers = require ('./lib/libraries'); // Importo el objeto app del modulo express para utilizarlo en este archivo
 const { database } = require ('../config/keys');
 
 
   /*
  |||||||||||||||||||||||||||||||||||||||||||||||
    MIDDLEWARES
  |||||||||||||||||||||||||||||||||||||||||||||||
  */

 app.use(cors(corsOptions));


//middleware propio CORS
app.use((req,res, next) =>{
  res.header('Access-Control-Allow-Origin','*');       //cualquiera puede hacer peticiones a la api
  res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With, Content-Tipe, Accept, Access-Control-Request-Method'); //los header que va a permitir la api
  res.header('Access-Control-AlLow-Methods','POST, GET, PUT, DELETE, OPTIONS'); // metodos thhp que acepta
  res.header('LAlLow','POST, GET, PUT, DELETE, OPTIONS');
  next();// para salir de estos headers
});


 app.use(bodyParser.urlencoded({extended:false}));//configurar body parser para que convierta en objeto
 app.use(bodyParser.json());//configurar body-parser para convertir ls datos que llegan a objetos Js

 
  app.use (session ({ 
     secret: 'misesion',
     resave: false,
     saveUninitialized: false,
     store: new MySQLStore ( database )
  }));
 
 /// Morgan - Uso este módulo para ver el status las peticiones http que se ejecutan en la terminal
  app.use(morgan('dev')); // Formato corto para ver peticiones 
  // app.use(morgan('combined')); // Formato extendido para ver peticiones
 
  // Soporte para el servidor - Manejo de archivos JSON 
  //app.use(express.json());
 
  // Soporte para datos que envien los clientes por medio de los inputs de los formularios
  //app.use(express.urlencoded({extended: false})); 

 
  /*
  |||||||||||||||||||||||||||||||||||||||||||||||
    GLOBAL VARIABLES
  |||||||||||||||||||||||||||||||||||||||||||||||
  */ // En esta sección se establece las variables globales del sistema
  app.use ((req, res, next) => {
    next();
  });
  /*
  |||||||||||||||||||||||||||||||||||||||||||||||
    ROUTES
  |||||||||||||||||||||||||||||||||||||||||||||||
  */ // En esta sección se establece las direcciones de los archivos que manejaran las rutas manejo las rutas 
 
 app.use (require('../routes/activacion')); // Importo lo que requiero de mi carpeta Routes / index.js
 //app.use (require('./routes/index')); // Importo lo que requiero de mi carpeta Routes / index.js
 
 // REST API 
 var api = require('../routes/activacion-routes');
 app.use('/api',api);
  //app.use ('/api/clientes',require('./routes/clientes')); // Implemento mi API e importo lo que requiero de mi carpeta Routes / clientes.js
  //app.use ('/api/usuarios',require('./routes/usuarios')); // Implemento mi API e importo lo que requiero de mi carpeta Routes / usuarios.js
  //app.use ('/api/credenciales',require('./routes/credenciales')); // Implemento mi API e importo lo que requiero de mi carpeta Routes /credenciales.js
  //app.use ('/api/monitoreo',require('./routes/monitoreo')); // Implemento mi API e importo lo que requiero de mi carpeta Routes /monitoreo.js
  //app.use ('/api/lectura',require('./routes/lectura')); // Implemento mi API e importo lo que requiero de mi carpeta Routes /lectura.js
  //app.use ('/api/pruebas',require('./routes/pruebas')); // Implemento mi API e importo lo que requiero de mi carpeta Routes /pruebas.js
 /*
   /*
  |||||||||||||||||||||||||||||||||||||||||||||||
   STATIC FILES
  |||||||||||||||||||||||||||||||||||||||||||||||
  */ // Esta sección es para dar de alta la ruta de directorio de los archivos staticos relacionados con el FrontEnd
// app.use (express.static(path.join(__dirname, 'public')));
 
 // Exporto el objeto app para utilizarlo en index.js 
 module.exports = app; 
 
 
 
 