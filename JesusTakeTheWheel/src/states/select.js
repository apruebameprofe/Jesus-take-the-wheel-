JesusTakeTheWheel.selectState = function(game) {

}
var hitsAvailable;
var speedAvailable;
var perSelect= 1;
var numOpciones = 3;
var text;
var clicked3 = false; 

function setStats(){
    if(perSelect == 1){
    hitsAvailable = 4;
    speedAvailable = 900;
    }
    if(perSelect == 2){
    hitsAvailable = 6;
    speedAvailable = 800;
    }
    if(perSelect == 3){
    hitsAvailable = 2;
    speedAvailable = 1100;
    }
}

function checkSelect(){
    if(perSelect>3){
        perSelect = 3;
    }
    if(perSelect < 1 ){
        perSelect = 1; 
    }
}

function listenDerecha(){
    
        perSelect++;
        checkSelect();
    
}

function listenIzquierda(){
    
        perSelect--;
        checkSelect();
    
}

function updateText() {


    text.setText("Opción " + perSelect );

}

function listener3(){
    clicked3 = true; 
}

    
JesusTakeTheWheel.selectState.prototype = {

    init: function() {
        console.log("Estoy en selectState")
    },

    preload: function() {
        
    },

    create: function() {
        game.world.setBounds(0,0,800,600);
        var derecha = game.add.sprite( game.world.centerX+300 , game.world.centerY, 'flecha');
        derecha.anchor.setTo(0.5);
        derecha.anchor.setTo(0.5);
        
        
        derecha.inputEnabled = true;
        derecha.events.onInputDown.add(listenDerecha, this);

        var izquierda = game.add.sprite( game.world.centerX-300 , game.world.centerY , 'flecha');
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

        var startbutton = game.add.sprite( game.world.centerX , game.world.centerY+200, 'startbuttonsprite');
        startbutton.anchor.setTo(0.5);
        startbutton.anchor.setTo(0.5);
        
        startbutton.inputEnabled = true;
        startbutton.events.onInputDown.add(listener3, this);
    
        
  
    },

    update: function() {
        setStats();
        game.input.onDown.addOnce(updateText, this);
        console.log(perSelect);
        

        if(clicked3){
            clicked3 = false;
            var text = "loading" ;
            var style = {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(game.world.centerX - 300, 0, text, style);
            game.state.start('screenState');
        }
      
    }
}
