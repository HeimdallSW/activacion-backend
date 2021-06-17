const pool = require("../config/dbConection.js");
var rfcStored1 = 0;
var rfcStored2 = 0;

//verifica RFC
exports.verificaRFC = async (req, res) => {

  const {
    rfc
  } = req.body;

  await pool.query(
    "SELECT COUNT(*) as resultado FROM cliente WHERE RFC = ?", [rfc], (err, result) => {
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
  
  await pool.query('SELECT COUNT(*) AS cuenta, RFC FROM cliente WHERE Token = ? ',  [token], async   (err, result) => {
     
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
                          // console.log('SA', fecha[0].FechaActivacion.toISOString().slice(0,10));//SA: Software Activated
                          res.status(200).send({ status: 'SA', fecha: fecha[0].FechaActivacion.toISOString().slice(0,10) });
                    }      
                })     
            }

          })//activa cliente
            
          }else if(result[0].FechaActivacion != 'NULL'){

            res.status(200).send({status: 'SAA', fecha: result[0].FechaActivacion.toISOString().slice(0,10)});// NM: No Match.  
            console.log('Software activated already');// SAA: Software activated already
            
            
            }
        }
      })
      
      //  res.status(200).json({ exito: 'M' })
      }else{
        res.status(200).send({status: 'NM'});// NM: No Match.    
        console.log('El token coincide con el RFC');
      } 
    }
  }
  );


};
