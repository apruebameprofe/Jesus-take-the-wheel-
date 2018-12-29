Jesus.matchmakingState = function(game) {

}
var timetostart = false;

function setstartgametrue(){
	timetostart = true; 
}

Jesus.matchmakingState.prototype = {
		
		init: function () {
		},
    
    preload: function() {
       
    },

    create: function() {
    	//añadimos el fondo
    	var fondo = game.add.sprite(game.world.centerX , game.world.centerY, 'buscandojugadores');
    	fondo.anchor.setTo(0.5); 
    	
     
    	//mensaje con valores por defecto
    	 var data = {
    			 "type" :  "UPDATE",
    	        	"subtype" : "UPDATE_STATE",
    	        	"ID": ownid,
    	        	"posX" : 500,
    	        	"posY" : 100,
    	        	"dead" : false,
    	        	"winner" : false,
    	        	"Kart" : perSelect,
    	        	"angulo" : 0,
    	        	"Animation" : 1,
    	        	"ready" : 0
    	        	
    	        }
    	    
    	    ws.send(JSON.stringify(data));
    	 
    	 
    	 game.time.events.add(Phaser.Timer.SECOND * 2, setstartgametrue, this);
       
    },

    update: function() {
    		//se comprueba si se ha elegido ya un kart y si el timer se ha acabado y si es así se pasa
    		// a level
    			if(yesselectedKart && timetostart){
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('levelState');
    			}
		
    	
    },
    
  
}