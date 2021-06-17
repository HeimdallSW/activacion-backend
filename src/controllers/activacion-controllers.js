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
  
  await pool.query(
    'SELECT COUNT(*) AS cuenta, RFC FROM cliente WHERE Token = ? ',  [token],   (err, result) => {
     
      if (err) { /// Si hubo un error en el Query 
        // Manda un Mensaje de error para probar la API
        res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
        console.log(err);

      } else if(result[0].cuenta == 0){ 
          
        console.log(result);
       console.log('TNF');
      // res.status(200).send('TNF');// TNF : Token Not Found.
      res.status(200).json({ error: 'TNF' })
      
    }else {
      rfcStored2 = result[0].RFC;

      if(rfcStored1==rfcStored2){
        console.log('pertenece');
      //  res.status(200).send('M'); // NM: No Match.
        res.status(200).json({ exito: 'M' })
      }else{
        console.log('no pertenece');
     //   res.status(200).send('NM'); // NM: No Match.
        res.status(200).json({ exito: 'nM' })
      } 
    }
  }
  );
  


};
