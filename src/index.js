/*
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
     _______. _______ .______     ____    ____  _______ .______      
    /       ||   ____||   _  \    \   \  /   / |   ____||   _  \     
   |   (----`|  |__   |  |_)  |    \   \/   /  |  |__   |  |_)  |    
    \   \    |   __|  |      /      \      /   |   __|  |      /     
.----)   |   |  |____ |  |\  \----.  \    /    |  |____ |  |\  \----.
|_______/    |_______|| _| `._____|   \__/     |_______|| _| `._____| 
                                                                                                                                                   
 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 */

/*

  En index.js se inicializan los parametros de donde estaremos escuchando el servidor
 
 */


/*
 |||||||||||||||||||||||||||||||||||||||||||||||
   STARTING THE SERVER
 |||||||||||||||||||||||||||||||||||||||||||||||
 */


 const app = require ('../src/config/app'); // Importo el objeto app del modulo express para utilizarlo en este archivo


 const server =  app.listen (app.get('port'), () => {  
     console.log('Servidor Conectado --> Puerto' , app.get('port'));
 });
 
