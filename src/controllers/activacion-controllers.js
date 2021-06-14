const pool = require("../config/dbConection.js");


//verifica RFC
exports.verificaRFC = async (req, res) => {

  const {
    Clienterfc
  } = req.body;
  
  console.log(req.body);


  const RFCingresado = {
    Clienterfc
  };

  await pool.query(
    "SELECT RFC FROM cliente WHERE RFC = ?",
    [RFCingresado],
    (err, result) => {
      if (err) {
        res.status(500).send({message: 'Error'});
        console.log(err);
        //res.redirect ('./errorU');
      } else {
        res.status(200).send({message: 'RFC existe'});
        console.log(result);
        //res.redirect ('./exitoU');
      }
    }
  );
};

// Validación de Token
/*exports.validaToken = async (req, res) => {
    const {
      token
    } = req.body;

    await pool.query(
      'SELECT * FROM administrador WHERE Correo = ? AND Contrasena = ?',  [token],   (err, result) => {
       
        if (err) { /// Si hubo un error en el Query 
          // Manda un Mensaje de error para probar la API
          res.status(500).send( {mensaje: 'Error en la consulta', code: err.code,  sqlMessage: err.sqlMessage, sql: err.sql } ); 
          console.log(err);
        } else {         // Si no hubo error en la consulta, envia el resultado      
            res.status(200).send(result);
            console.log(result);

        }
      }
    );
  };*/