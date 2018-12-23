Jesus.matchmakingState = function(game) {

}
var timetostart = false;

function setstartgametrue(){
	timetostart = true; 
}

Jesus.matchmakingState.prototype = {
		
		init: function () {
		/*
			
					console.log ('==========================================================');
					console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
					console.log ('==========================================================');
					game.state.start('menuState');
				*/
		},
    
    preload: function() {
       
    },

    create: function() {
    	
    	var fondo = game.add.sprite(game.world.centerX , game.world.centerY, 'buscandojugadores');
    	fondo.anchor.setTo(0.5); 
    	
     
    	
    	 var data = {
    			 "type" :  "UPDATE",
    	        	"subtype" : "UPDATE_STATE",
    	        	"ID": ownid,
    	        	"posX" : 500,
    	        	"posY" : 500,
    	        	"dead" : false,
    	        	"winner" : ganado,
    	        	"Kart" : perSelect,
    	        	"angulo" : 0,
    	        	"Animation" : 1,
    	        	"ready" : 0
    	        	
    	        }
    	    
    	    ws.send(JSON.stringify(data));
    	 
    	 
    	 game.time.events.add(Phaser.Timer.SECOND * 4, setstartgametrue, this);
       
    },

    update: function() {
    	
    			if(yesselectedKart && timetostart){
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('levelState');
    			}
		
    	
    },
    
  
}