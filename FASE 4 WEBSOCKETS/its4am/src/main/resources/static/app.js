debug = {
    ws: 1
}

var ws = new WebSocket('ws://127.0.0.1:8080/jesus');


var numplayers; 
var ownid; 
var ourrandomserv;

var player2rand;
var player2kart; 
var player2posx;
var player2posy; 
var player2dead;
var player2winner;
var player2anim;
var player2angle = 0;
var player2ready = 0; 


var yesselectedKart = false; 

ws.onopen = function (event) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.')
    }
    data = {
     type : 'JOIN'
    }
    this.send(JSON.stringify(data))

}

ws.onerror = function (error) {
    console.log('[DEBUG-WS] Ha ocurrido un error: ' + error)
}

ws.onclose = function (event) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha cerrado la conexion.')
    }
}

ws.onmessage = function (message) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha recibido un mensaje de jugador : ' +  message.data)
    }
 

    var msg = JSON.parse(message.data)

    console.log('INFO RECIBIDA ' + msg.type)

    switch (msg.type) {
    
        case "PLAYER_CREATED":
            console.log('@@@@@@ PLAYER CREATED @@@@@')
            console.log('id: ' + msg.player.ID)
            console.log('pos: (' + msg.player.posX + ',' + msg.player.posY + ')')
            console.log('kart: ' + msg.player.Kart)
            console.log('anim: ' + msg.player.Animation)
            console.log('rand: ' + msg.player.ourrandom)
            console.log('ang: ' + msg.player.angulo)
            console.log('dead: ' + msg.player.dead)
            console.log('winner: ' + msg.player.winner)
        
            ourrandomserv = msg.player.ourrandom;  	
            ownid = msg.player.ID;
            
           
            
            break
            
        
    
        case "GAME_COMPLETE":
            console.log('##### GAME IS COMPLETE #####')
            break
    }
    switch(msg.subtype){
  
    //no entra en esta condición
   
          
        case "UPDATE_STATE":
            console.log('!!!!! GAME SENDS UPDATE !!!!!')
          
            console.log('id: ' + msg.ID)
            console.log('pos: (' + msg.posX + ',' + msg.posY + ')')
            console.log('kart: ' + msg.Kart)
            console.log('anim: ' + msg.Animation)
            console.log('rand: ' + msg.ourrandom)
            console.log('ang: ' + msg.angulo)
            console.log('dead: ' + msg.dead)
            console.log('winner: ' + msg.winner)
            console.log('ready?:' +  msg.ready)
           
            //prueba de si las variables tienen bien los valores
            console.log('');
            console.log('MI ID ES: '+ ownid)
            console.log('LA ID QUE ENVIO ES:'+msg.ID)
             console.log('');
            console.log('POSICION MIA EN X E Y:'+ msg.posX + msg.posY);
          if(msg.ID != ownid){
            	 
    	  console.log("MESSAGE CAME FROM PLAYER 2 , UPDATING")
    	  console.log("La x2 :" + msg.posX);
    	  console.log("La y2 :" + msg.posY);
    	  console.log('kart2:' + msg.Kart);
    	  console.log('dead:' + player2dead);
          player2kart = msg.Kart;
          player2posx = msg.posX;
          player2posy = msg.posY;
          player2dead = msg.dead;
          player2winner = msg.winner;
          player2rand = msg.ourrandom;
          player2anim = msg.Animation;
          player2angle = msg.angulo; 
      	console.log("is it asigned ?? " + player2posx + " " + player2posy)
          
          console.log("EL READY " + msg.ready);
          player2ready = msg.ready;
          
          if(msg.Kart == 1 || msg.Kart == 2 || msg.Kart ==3){
          	yesselectedKart = true; 
          	
          
          }
         
            
            } //level js quitar get state
        
   
            
            break
  
    }
}