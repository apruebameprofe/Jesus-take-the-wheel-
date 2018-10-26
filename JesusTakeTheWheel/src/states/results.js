JesusTakeTheWheel.resultsState = function(game) {

}

var clicked2 = false;

function listener2 (){
 clicked2 = true;
    
}
    
var hitsReceived;

JesusTakeTheWheel.resultsState.prototype = {

    init: function(){
        console.log("Estoy en resultState")
    },

    preload: function() {
        
    },

    create: function() {
        hitsReceived = wallHits; 
        var text = "Has Recibido " + hitsReceived + " hostias";
        var text2 = "Has durado/tarddo " + timer + " milisegundos";
        var style = {
            font: "14px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(100 , 0, text, style);
        var t2 = game.add.text(100,100 , text2 , style);

        var playbutton2 = game.add.sprite( 0 , 500, 'playbuttonsprite');
        playbutton2.anchor.setTo(0.5);
        playbutton2.anchor.setTo(0.5);
        
        playbutton2.inputEnabled = true;
        playbutton2.events.onInputDown.add(listener2, this);

    },

    update: function() {
        if(clicked2){
            game.state.start('endingState')
            }
    }
}
