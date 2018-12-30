Jesus.endingState = function(game) {

}
var clickedend; 
var imgGana;
var imgMuere;
var music3;
function listener2 (){
    console.log("click!");
    clickedend = true;
}
//funcion para determinar el ganador de la partida
function ganaMuere(){
	//si ambos han muerto se verá quien ha llegado más lejos, y ese será el ganador
	if(muerto==true && player2dead==true){
		if(recorrido>player2posy){
			console.log("has ganado");
			imgGana = game.add.sprite( game.world.centerX-350 , game.world.centerY-200, 'youwin');
		}else{
			console.log("has perdido");
			imgMuere = game.add.sprite( game.world.centerX-350 , game.world.centerY-200, 'youdead');
		}	
	} 
	//si el jugador ha muerto pero el contrario ha llegado a la meta entonces pierde
	else if(muerto==true && player2dead==false){
		console.log("has perdido");
		imgMuere = game.add.sprite( game.world.centerX-350 , game.world.centerY-200, 'youdead');
	}
	//si ambos han llegado a la meta se compara el timer de los dos y el que haya llegado en menos tiempo
	//a la meta será el ganador
	else if(muerto==false && player2dead==false){
		if(timer<player2Timer){
			console.log("has ganado");
			imgGana = game.add.sprite( game.world.centerX-350 , game.world.centerY-200, 'youwin');
		}else{
			console.log("has perdido");
			imgMuere = game.add.sprite( game.world.centerX-350 , game.world.centerY-200, 'youdead');
		}
	}
	
	
}
Jesus.endingState.prototype = {
	init: function() {
		console.log("estoy en endingState");
		music.destroy();
		music3 = game.add.audio('fin');
		music3.play();
		music3.loopFull(0.6);
			},			
    preload: function() {
    	
    },

    create: function() {
    	 game.world.setBounds(0,0,1000,800); 
    	 //añadimos el boton de jugar otra vez
    	 //añadir sprite del fondo
    	var endingbackground = game.add.sprite(game.world.X,game.world.Y,'endback'); 
    	var replaybutton = game.add.sprite( game.world.centerX , game.world.centerY+250, 'replay');
    	replaybutton.anchor.setTo(0.5);
    	
        replaybutton.inputEnabled = true;
        replaybutton.events.onInputDown.add(listener2, this);
      
    },

    update: function() {
    	ganaMuere();
    	if(clickedend){
    	  	 
    		//ponemos los datos del jugador con sus valores iniciales si
    		//queremos volver a jugar y ponemos con valores iniciales las variables que determinan
    		//que puede empezar la partida
    		yesimready=0;
    		alreadydead= false;
    		ganado= false;
    		wallHits = 0;
    		animstate=1;
    		yesselectedKart=false;
    		//datos del jugador dos en valores inicicales 
            player2dead = false;
            player2winner = false;
            player2anim = 1;
            player2ready = 0;
            yes2isready=0;
            raceStart= false;
            clickedend = false; 
            music3.destroy();
            game.state.start('menuState');

        }
     
     }
}