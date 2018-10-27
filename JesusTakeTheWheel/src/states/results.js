JesusTakeTheWheel.resultsState = function(game) {

}



var clicked2 = false;

function listener2 (){
 clicked2 = true;
    
}
    

JesusTakeTheWheel.resultsState.prototype = {

    init: function(){
        console.log("Estoy en resultState")
    },

    preload: function() {
        
    },

    create: function() {
        
        var hitsReceived = wallHits;
        var finaltime = timer;
        var deathcause = muertepor;
        var dead = muerto; 
        var madeitto = recorrido;
        var tardadodurado = "Has tardado ";
        var hasmuertoono = "No has muerto por ";
        var haslogradoono = " y has llegado con éxito a la meta :D"
        var hasrecorrido = "Has recorrido todo el circuito"

        if (dead == true){
            tardadodurado = "Has durado "
            hasmuertoono = "Has muerto por "
            haslogradoono = " y no has podido llegar a la meta"
            var hasrecorrido = "Has recorrido " + madeitto +  " metros";

        }
        
   
       var text = "Has Recibido " + hitsReceived + " golpes";
     
        var text2 = tardadodurado + finaltime + " milisegundos";
        var text3 = hasmuertoono + deathcause + haslogradoono; 
        var text4 = hasrecorrido; 
       
        var style = {
            font: "14px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(32 , 0, text, style);
        var t2 = game.add.text(32,100 , text2 , style);
        var t3 = game.add.text(32,200,text3,style);
        var t4 = game.add.text(32,300,text4,style);
    

        var puntuación;
        var puntosporgolpes = hitsReceived*100;;
        var puntosporrecorrido= madeitto; 
        var puntosportiempo = timer/10;
        

        if(muerto){
            puntuacion = puntosporgolpes+puntosporrecorrido;
        }
        else{
            puntuacion = puntosporgolpes+puntosporrecorrido+puntosportiempo; 
        }

        var text5 = "Tu puntuación es de: " + puntuacion + " puntos"
        var t5 = game.add.text(400,0, text5 , style);
    
    

        var playbutton2 = game.add.sprite( 400 , 500, 'backtomenubuttonsprite');
        playbutton2.anchor.setTo(0.5);
        playbutton2.anchor.setTo(0.5);
        
        playbutton2.inputEnabled = true;
        playbutton2.events.onInputDown.add(listener2, this);

    },

    

    update: function() {
        if(clicked2){
            clicked2 = false; 
            game.state.start('menuState')
            }
    }
}
