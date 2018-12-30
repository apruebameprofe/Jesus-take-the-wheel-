Jesus.menuState = function(game) {

}
var clicked = false;
var music2;
function listener (){
    console.log("click!");
 clicked = true;
    
}

Jesus.menuState.prototype = {

		init: function() {
			
			music2 = game.add.audio('inicio');
			music2.play();
			music2.loopFull(0.6);
		},
    preload: function() {
       
    },

    create: function() {
    
    	
    	//Pone los bounds , el fondo y el boton de play asociado a un listener
        game.world.setBounds(0,0,800,600); 
        var menubackground = game.add.sprite(game.world.X,game.world.Y,'A');
        var playbutton = game.add.sprite( game.world.centerX+100 , game.world.centerY+100, 'play2');
        playbutton.anchor.setTo(0.5);
        playbutton.inputEnabled = true;
        playbutton.events.onInputDown.add(listener, this);
        
     

    },

    update: function() {
    	//si clickamos el boton y el servidor esta lleno nos lleva al estado de servidor lleno
    	//y si no nos lleva a la selección de personaje
    if(clicked){
    	clicked = false; 
    	if (isFull){
        	game.state.start('fullServerState');
        	console.log("esta lleno?: "+ isFull);
    	} else{
    		 game.state.start('charselState');
    	}
 
    }
    }
}