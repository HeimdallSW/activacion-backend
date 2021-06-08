const { Router } = require ('express'); // Requerimos el METODO Router de Express
const router = Router (); // Ejecuto el método y lo guardo en una constante router que usare en mi código



router.get('/verificacion', (req, res) => {     
    res.redirect('http://heimdall.aira.mx/ac-rfc')
});


router.get('/activacion', (req, res) => {     
    // res.render('login.ejs');
    res.redirect('http://heimdall.aira.mx/ac-token')
});


module.exports =  router; // Exporto el módulo para usarlo en mi index.js principal