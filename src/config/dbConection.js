/*
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 _______       ___   .___________.    ___      .______        ___           _______. _______ 
|       \     /   \  |           |   /   \     |   _  \      /   \         /       ||   ____|
|  .--.  |   /  ^  \ `---|  |----`  /  ^  \    |  |_)  |    /  ^  \       |   (----`|  |__   
|  |  |  |  /  /_\  \    |  |      /  /_\  \   |   _  <    /  /_\  \       \   \    |   __|  
|  '--'  | /  _____  \   |  |     /  _____  \  |  |_)  |  /  _____  \  .----)   |   |  |____ 
|_______/ /__/     \__\  |__|    /__/     \__\ |______/  /__/     \__\ |_______/    |_______|
                                                                                                                                                                                                                
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 */
 const mysql = require ('mysql');
 const { promisify } = require ('util'); // Módulo para utilizar callbacks ya que mysql pool no soporta las promesas (Asyn Await)
 const { database } = require ('./keys');
 
 
 const pool = mysql.createPool (database);
 
 pool.getConnection ((err, connection) => { 
     if (err) {
         if (err.code === 'PROTOCOL_CONNECTION_LOST'){
             console.error ('Error: PROTOCOL_CONNECTION_LOST: Se cerró la conexión');
         } 
         if (err.code === 'ER_CON_COUNT_ERROR') {
             console.error ('Error: ER_CON_COUNT_ERROR: Saturación de conexiones');
         }
         if (err.code === 'ECONNREFUSED'){
             console.error('Error: ECONNREFUSED: Se rechazó la conexión.');
         }
         if (err.code === 'ER_BAD_DB_ERROR'){
             console.error('Error: ER_BAD_DB_ERROR: Base de Datos desconocida -> [verifique el nombre de la BD]');
         }
         if (err.code === 'ER_ACCESS_DENIED_ERROR'){
             console.error('Error: ER_ACCESS_DENIED_ERROR: Acceso denegado -> [verifique el nombre de user y password]');
         }
         if (err.code === 'ENOTFOUND'){
             console.error('Error: EENOTFOUND: No se puede encontrar la ruta o host -> [verifique la ruta/host]');
         }
         if (err.code === 'ER_NO_SUCH_TABLE'){
             console.error('Error: ER_NO_SUCH_TABLE: No se puede encontrar una tabla -> [verifique la base de datos]');
         }
       } else if (connection){
         connection.release ();
         console.log ('Base de Datos Conectada -->',  database.database);
         return;
       }       
   });
 
   // Promisify Pool Querys
   promisify (pool.query); // Convierto a promesas cada que haga una consulta
 
   module.exports = pool;
 
 