Jesus.fullServerState = function(game) {
//este estado solo muestra que el servidor esta lleno, para comprobar si sigue estandolo
	//se recarga la página y ya esta
}
Jesus.fullServerState.prototype = {

		init: function() {
			
		},
		preload: function() {
		       
	    },
	    create: function() {
	    	var servBack = game.add.image(game.world.X,game.world.Y,'fullServerBack');
	    },
	    update: function() {
	    	
	    }
}