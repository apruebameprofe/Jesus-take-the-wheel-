Jesus.matchmakingState = function(game) {

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
       
    },

    update: function() {
    	
    			
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('levelState');
			
		
    	
    },
    
  
}