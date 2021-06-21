const pool = require("../config/dbConection.js");
var rfcStored1 = 0;
var rfcStored2 = 0;

var meses = new Array ('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
var dias = new Array ('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');

//verifica RFC
exports.verificaRFC = async (req, res) => {

  const {
    rfc
  } = req.body;

  await pool.query('SELECT COUNT(*) as resultado FROM cliente WHERE RFC = ?', [rfc], (err, result) => {
      if (err) {
        res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
        console.log(err);
      } else {
        res.status(200).send(result);
        console.log(result);
      }
      if(result[0].resultado > 0){
        rfcStored1=rfc;
        console.log(rfcStored1);
      } 
    }
  );
};


// Validación de Token
exports.validaToken = async (req, res) => {
  const {
    token
  } = req.body;
  
  await pool.query('SELECT COUNT(*) AS cuenta, RFC FROM cliente WHERE Token = ? ',  [token], async (err, result) => {
     
      if (err) { /// Si hubo un error en el Query 
        // Manda un Mensaje de error para probar la API
        res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
        console.log(err);

      } else if(result[0].cuenta == 0){ 
        // console.log(result);
        res.status(200).send({status: 'TNF'});// TNF : Token Not Found.    
        console.log('Token Not Found');  

    }
    
    else {
      rfcStored2 = result[0].RFC;

      if(rfcStored1==rfcStored2){
        // res.status(200).send('M'); // M:  Match.
        // console.log('pertenece');

        await pool.query(
          'SELECT StatusCliente, FechaActivacion FROM cliente WHERE  RFC= ?', [rfcStored1], async (err, result) =>{
            if (err) { /// Si hubo un error en el Query 
              // Manda un Mensaje de error para probar la API
              res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
              console.log(err);
            }else {
            //  res.status(200).send(result);
              console.log(result);
             

              if(result[0].StatusCliente == 0){

               const SoftwareAct = {
                 StatusCliente: ('1'),
                 FechaActivacion: new Date()
               }
             await pool.query(
                'UPDATE cliente SET ? WHERE RFC = ?', [SoftwareAct, rfcStored1], async (err, result) =>{
                  if (err) { /// Si hubo un error en el Query 
                    // Manda un Mensaje de error para probar la API
                    res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
                    console.log(err);
                  }else{
                    
                    console.log(result);
                    //res.status(200).send(result); //A: activado

                    await pool.query(
                      'SELECT FechaActivacion FROM cliente WHERE  RFC= ?', [rfcStored1], (err, fecha) =>{
                        if (err) { /// Si hubo un error en el Query 
                          // Manda un Mensaje de error para probar la API
                          res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
                          console.log(err);
                        }else {
                          console.log('SA', dias[fecha[0].FechaActivacion.getDay()]+' '+fecha[0].FechaActivacion.getDate()+' de '+meses[fecha[0].FechaActivacion.getMonth()]+' de '+fecha[0].FechaActivacion.getFullYear());//SA: Software Activated
                          res.status(200).send({ status: 'SA', fecha: dias[fecha[0].FechaActivacion.getDay()]+' '+fecha[0].FechaActivacion.getDate()+' de '+meses[fecha[0].FechaActivacion.getMonth()]+' del '+fecha[0].FechaActivacion.getFullYear()});
                    }      
                })     
            }

          })//activa cliente
            
          }else if(result[0].FechaActivacion != 'NULL'){

            console.log('SAA', dias[result[0].FechaActivacion.getDay()]+' '+result[0].FechaActivacion.getDate()+' de '+meses[result[0].FechaActivacion.getMonth()]+' del '+result[0].FechaActivacion.getFullYear());// SAA: Software activated already
            res.status(200).send({ status: 'SAA', fecha: dias[result[0].FechaActivacion.getDay()]+' '+result[0].FechaActivacion.getDate()+' de '+meses[result[0].FechaActivacion.getMonth()]+' del '+result[0].FechaActivacion.getFullYear()});
              
            
            
            }
        }
      })
      
      //  res.status(200).json({ exito: 'M' })
      }else{
        res.status(200).send({status: 'NM'});// NM: No Match.    
        console.log('El token NO coincide con el RFC');
      } 
    }
  }
  );


};
