const pool = require("../config/dbConection.js");

rfcstored = rfc;


//verifica RFC
exports.verificaRFC = async (req, res) => {

  const {
    rfc
  } = req.body;
  
  console.log(req.body);
  console.log(rfcstored);

};
  /*await pool.query(
    "SELECT COUNT(*) as resultado FROM cliente WHERE RFC = ?", 
    [rfc],
    (err, result) => {
      if (err) {
        res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
        console.log(err);
      } else {
        res.status(200).send(result);
        // res.status(200).send({message: 'Exito en la petición'});
        console.log(result);
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
      'SELECT COUNT(*) AS token FROM cliente WHERE Token = ? ',  [token],   (err, result) => {
       
        if (err) { /// Si hubo un error en el Query 
          // Manda un Mensaje de error para probar la API
          res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
          console.log(err);
        } else if({         // Si no hubo error en la consulta, envia el resultado      
            res.status(200).send(result);
            console.log(result);

        }
      }
    );
  };*/