debug = {
    ws: 1
}

var ws = new WebSocket('ws://127.0.0.1:8080/jesus')

/*var game.global = {
}*/

var numplayers; 
var ownid; 
var ourrandomserv;

var player2kart; 
var player2posx;
var player2posy;
var player2dead;
var player2winner;
var player2anim;
var player2angle; 


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
        console.log('[DEBUG-WS] Se ha recibido un mensaje: ' + message.data)
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
            
            
            if(msg.ID != ownid){
            	
            	  console.log("MESSAGE CAME FROM PLAYER 2 , UPDATING")
                  
                  player2kart = msg.kart;
                  player2posx = msg.posX;
                  player2posy = msg.posY;
                  player2dead = msg.dead;
                  player2winner = msg.winner;
                  player2anim = msg.Animation;
                  player2angle = msg.angulo; 
            }
        
   
            
            break
  
    }
}