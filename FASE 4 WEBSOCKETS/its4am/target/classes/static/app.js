debug = {
    ws: 1
}

var ws = new WebSocket('ws://192.168.1.39:8080/jesus');


var numplayers; 
var ownid; 
var ourrandomserv;

 player2rand=0;
 player2kart=0; 
 player2posx=0;
 player2posy=0; 
 player2dead=true;
 player2winner=false;
 player2anim=0;
 player2angle = 0;
 player2ready = 0; 


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
            console.log('pos2: (' + msg.pos2X + ',' + msg.pos2Y + ')')
            console.log('kart: ' + msg.Kart)
            console.log('anim: ' + msg.Animation)
             console.log('anim2: ' + msg.Animation2)
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