JesusTakeTheWheel.personajeState = function(game) {

}
var hitsAvailable;
var speedAvailable;
var perSelect= 1;

var numOpciones = 3;

var clicked3 = false; 
var opcionesp; 


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

function checkAnim(){
if(perSelect == 1){
    opcionesp.animations.play('opcion1');
}
if(perSelect == 2){
    opcionesp.animations.play('opcion2');
}
if(perSelect == 3){
    opcionesp.animations.play('opcion3');
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




function listener3(){
    clicked3 = true; 
}

    
JesusTakeTheWheel.personajeState.prototype = {

    init: function() {
        console.log("Estoy en personajeState");
    },

    preload: function() {
        
    },

    create: function() {
        var fondo= game.add.image(game.world.centerX, game.world.centerY, 'interfazPersonaje');
        fondo.anchor.setTo(0.5);
        game.world.setBounds(0,0,800,600);

        opcionesp = game.add.sprite(game.world.centerX,game.world.centerY-80,'opcionespersonaje2',0);
        opcionesp.anchor.setTo(0.5);
        opcionesp.animations.add('opcion1',[0,0],10,true);
        opcionesp.animations.add('opcion2',[1,1],10,true);
        opcionesp.animations.add('opcion3',[2,2],10,true);

    
      
        
        var derecha = game.add.sprite( game.world.centerX+200 , game.world.centerY-80, 'flecha');
        derecha.anchor.setTo(0.5);
        derecha.anchor.setTo(0.5);
        
        
        derecha.inputEnabled = true;
        derecha.events.onInputDown.add(listenDerecha, this);

        var izquierda = game.add.sprite( game.world.centerX-200 , game.world.centerY-80 , 'flecha');
        izquierda.anchor.setTo(0.5);
        izquierda.anchor.setTo(0.5);
        izquierda.scale.x *= -1;

        izquierda.inputEnabled = true;
        izquierda.events.onInputDown.add(listenIzquierda, this);

         
       

        

        var startbutton = game.add.sprite( game.world.centerX , game.world.centerY+250, 'next');
        startbutton.anchor.setTo(0.5);
        startbutton.anchor.setTo(0.5);
        
        startbutton.inputEnabled = true;
        startbutton.events.onInputDown.add(listener3, this);
    
        
  
    },

    update: function() {
        setStats();
        checkAnim();
        
        console.log(perSelect);
        

        if(clicked3 == true ){
            clicked3 = false;
                
        var text = "loading" ;
        var style = {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(game.world.centerX - 350, 0, text, style);
        game.state.start('pistaState');

            
     
        }
      
    }
}
