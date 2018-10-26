JesusTakeTheWheel.selectState = function(game) {

}
var perSelect=1;
var numOpciones = 3;
var text;

function listenDerecha(){
    if(perSelect < numOpciones){
        perSelect++;
    }
}

function listenIzquierda(){
    if(perSelect > 1 ){
        perSelect--;
    }
}

function updateText() {


    text.setText("Opción " + perSelect );

}

    
JesusTakeTheWheel.selectState.prototype = {

    init: function() {
        console.log("Estoy en selectState")
    },

    preload: function() {
        
    },

    create: function() {
        var derecha = game.add.sprite( 300 , 20, 'flecha');
        derecha.anchor.setTo(0.5);
        derecha.anchor.setTo(0.5);
        
        
        derecha.inputEnabled = true;
        derecha.events.onInputDown.add(listenDerecha, this);

        var izquierda = game.add.sprite( 20 , 20 , 'flecha');
        izquierda.anchor.setTo(0.5);
        izquierda.anchor.setTo(0.5);
        izquierda.scale.x *= -1;

        izquierda.inputEnabled = true;
        izquierda.events.onInputDown.add(listenIzquierda, this);

        
        text = game.add.text(game.world.centerX, game.world.centerY, "Opción " + perSelect, {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        });
    
        text.anchor.setTo(0.5, 0.5);
    
        
  
    },

    update: function() {

        game.input.onDown.addOnce(updateText, this);
      
    }
}
