Jesus.endingState = function(game) {

}

function ganaMuere(){
	var clickedend; 
	var imgGana;
	var imgMuere;
	if(muerto){
		//Aparece un texto segun el jugador local haya perdido o no 
		console.log("has perdido");
		imgMuere = game.add.sprite( game.world.centerX-350 , game.world.centerY-200, 'youdead');
		
	} else if(ganado){
		console.log("has ganado");
		
		imgGana = game.add.sprite( game.world.centerX-350 , game.world.centerY-200, 'youwin');
	}
	
}
//Borra a los personajes y vuelta al menu 
Jesus.endingState.prototype = {
	init: function() {
		console.log("estoy en endingState");
		if (game.player != null) {
				$.ajax({
			            method: "DELETE",
			            url: 'http://localhost:8080/game/' + game.player.id,
			            processData: false,
			            headers: {
			                "Content-Type": "application/json"
			            },
			        }).done(function (data) {
			            //console.log("Player removed: " + JSON.stringify(data));
			        })
				}
			},			
    preload: function() {
    	
    },

    create: function() {
    	 game.world.setBounds(0,0,1000,800); 
    	 //añadimos el sprite de jugar otra vez
    	 //añadir sprite del fondo
    	var endingbackground = game.add.sprite(game.world.X,game.world.Y,'endback'); 
    	var replaybutton = game.add.sprite( game.world.centerX , game.world.centerY+250, 'replay');
    	replaybutton.anchor.setTo(0.5);
        replaybutton.inputEnabled = true;
        replaybutton.events.onInputDown.add(listener, this);
      
    },

    update: function() {
    	ganaMuere();
    	if(clickedend){
            
            clickedend = false; 
            
        game.state.start('menuState');
        }
     
     }

    }