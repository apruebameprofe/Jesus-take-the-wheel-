debug = {
    ws: 1
}
//variables globales
var ws = new WebSocket('ws://192.168.1.38:8080/jesus');
var msg; 
var numplayers; 
var ownid; 
var ourrandomserv;
var isFull=false;
 player2rand=0;
 player2kart=0; 
 player2posx=400;
 player2posy=100; 
 player2dead=false;
 player2winner=false;
 player2anim=0;
 player2angle = 0;
 player2ready = 0;
 player2Timer=0;
var yesselectedKart = false;

//cuando se abre la conexión se utiliza esta función
ws.onopen = function (event) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha establecido conexion con el servidor.')
    }
    data = {
     type : 'JOIN'
    }
    this.send(JSON.stringify(data))

}
//cuando se da un error se utiliza esta función
ws.onerror = function (error) {
    console.log('[DEBUG-WS] Ha ocurrido un error: ' + error)
}
//cuando se cierra la conexión se utiliza esta función
ws.onclose = function (event) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha cerrado la conexion.')
        close();
    	
    
        
    }
}
//cuando recibimos un mensaje utilizamos esta función
ws.onmessage = function (message) {
    if (debug.ws) {
        console.log('[DEBUG-WS] Se ha recibido un mensaje de jugador : ' +  message.data)
    }
 
   msg = JSON.parse(message.data);
   

    console.log('INFO RECIBIDA ' + msg.type)

    switch (msg.type) {
    
        case "PLAYER_CREATED":
        	//si la id que recibimos es diferente a dos(ocurre cuando un jugador previo se ha desconectado
        	//se sustituye por una que no este en uso por otro jugador
        	ownid = msg.player.ID;
        	if(ownid!=2 && ownid!=1){
        		if(msg.ID==1){
        			ownid=2;
        		}else{
        			ownid=1;
        		}
        	}
        	//recibimos el mensaje de que el jugador se ha creado correctamente y su información inicial
            console.log('@@@@@@ PLAYER CREATED @@@@@')
            console.log('id: ' + ownid)
            console.log('pos: (' + msg.player.posX + ',' + msg.player.posY + ')')
            console.log('kart: ' + msg.player.Kart)
            console.log('anim: ' + msg.player.Animation)
            console.log('rand: ' + msg.player.ourrandom)
            console.log('ang: ' + msg.player.angulo)
            console.log('dead: ' + msg.player.dead)
            console.log('winner: ' + msg.player.winner)
            console.log('auxJugadores: ' + msg.auxJugadores)
            ourrandomserv = msg.player.ourrandom;  	
            
            break
            
        case "GAME_COMPLETE":
        	//si el servidor esta lleno entramos en este caso. IsFull es una variable que se usa para
        	//pasar a la pantalla que indica al jugador de que el servidor esta lleno
            console.log('##### GAME IS COMPLETE #####')
            isFull=true;
            console.log('auxJugadores: ' + msg.auxJugadores)
            break
    }
    switch(msg.subtype){
    	
    //update de la información del jugador
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
            console.log('');
            console.log('MI ID ES: '+ ownid)
            console.log('LA ID QUE ENVIO ES:'+msg.ID)
            console.log('');
            
            //recibimos el mensaje con la información del jugador contra el que jugamos
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
            		player2Timer = msg.timer;
            		console.log("is it asigned ?? " + player2posx + " " + player2posy)
            		console.log("EL READY " + msg.ready);
            		console.log("a ver yesimready2 que haces: " + msg.ready);
            		player2ready = msg.ready;
          
            		//comprobamos si kart ha sido elegido para poder pasar del matchmaking
            			if(msg.Kart == 1 || msg.Kart == 2 || msg.Kart ==3){
            				yesselectedKart = true; 
            			}
            }
          
            break
    }
}