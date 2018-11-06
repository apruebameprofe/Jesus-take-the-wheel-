JesusTakeTheWheel.pistaState = function(game) {

}
var hitsAvailable;
var speedAvailable;
var pistaSelect = 1; 
var numOpciones = 3;

var clicked3 = false; 
var opcionesl; 




function checkAnim2(){
    if(pistaSelect == 1){
        opcionesl.animations.play('opcion1');
    }
    if(pistaSelect == 2){
        opcionesl.animations.play('opcion2');
    }
    if(pistaSelect == 3){
        opcionesl.animations.play('opcion3');
    }
    }


function checkSelect2(){
    if(pistaSelect>3){
        pistaSelect = 3;
    }
}

function listenDerecha2(){
    
    pistaSelect++;
    checkSelect2();

}

function listenIzquierda2(){

    pistaSelect--;
    checkSelect2();

}




function listener3(){
    clicked3 = true; 
}

    
JesusTakeTheWheel.pistaState.prototype = {

    init: function() {
        console.log("Estoy en pistaState");
    },

    preload: function() {
        
    },

    create: function() {
        var fondo= game.add.image(game.world.centerX, game.world.centerY, 'interfazPista');
        fondo.anchor.setTo(0.5);
        game.world.setBounds(0,0,1000,800);
        

        opcionesl = game.add.sprite(game.world.centerX-60,game.world.centerY-200,'opcionespista',0);
        opcionesl.anchor.setTo(0.5);
        opcionesl.animations.add('opcion1',[0,0],10,true);
        opcionesl.animations.add('opcion2',[1,1],10,true);
        opcionesl.animations.add('opcion3',[2,2],10,true);

         
        var derecha2 = game.add.sprite( game.world.centerX+120 , game.world.centerY-200, 'flecha');
        derecha2.anchor.setTo(0.5);
        derecha2.anchor.setTo(0.5);
        
        
        derecha2.inputEnabled = true;
        derecha2.events.onInputDown.add(listenDerecha2, this);

        var izquierda2 = game.add.sprite( game.world.centerX-220 , game.world.centerY-200 , 'flecha');
        izquierda2.anchor.setTo(0.5);
        izquierda2.anchor.setTo(0.5);
        izquierda2.scale.x *= -1;

        izquierda2.inputEnabled = true;
        izquierda2.events.onInputDown.add(listenIzquierda2, this);

        

        var startbutton = game.add.sprite( game.world.centerX-70 , game.world.centerY+110, 'play3');
        startbutton.anchor.setTo(0.5);
        startbutton.anchor.setTo(0.5);
        
        startbutton.inputEnabled = true;
        startbutton.events.onInputDown.add(listener3, this);
    
        
  
    },

    update: function() {
        setStats();
        checkAnim();
        checkAnim2();
        console.log(pistaSelect);
        

        if(clicked3 == true ){
            clicked3 = false;
                
        var text = "loading" ;
        var style = {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(game.world.centerX - 350, 0, text, style);


            
          if(pistaSelect == 1){
            game.state.start('levelState');
          }
          if(pistaSelect == 2){
            game.state.start('level1State');
          }
          if(pistaSelect == 3){
            game.state.start('level2State');
          }
        }
      
    }
}
