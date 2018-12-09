JesusTakeTheWheel.selectState = function(game) {

}
var hitsAvailable;
var speedAvailable;
var perSelect= 1;
var pistaSelect = 1; 
var numOpciones = 3;

var clicked3 = false; 
var opcionesp; 
var opcionesl; 

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

function checkSelect(){
    if(perSelect>3){
        perSelect = 3;
    }
    if(perSelect < 1 ){
        perSelect = 1; 
    }
}

function checkSelect2(){
    if(pistaSelect>3){
        pistaSelect = 3;
    }
    if(perSelect < 1 ){
        pistaSelect = 1; 
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

    
JesusTakeTheWheel.selectState.prototype = {

    init: function() {
        console.log("Estoy en selectState");
    },

    preload: function() {
        
    },

    create: function() {

        game.world.setBounds(0,0,800,600);

        opcionesp = game.add.sprite(game.world.centerX,game.world.centerY,'opcionespersonaje',0);
        opcionesp.anchor.setTo(0.5);
        opcionesp.animations.add('opcion1',[0,0],10,true);
        opcionesp.animations.add('opcion2',[1,1],10,true);
        opcionesp.animations.add('opcion3',[2,2],10,true);

        opcionesl = game.add.sprite(game.world.centerX,game.world.centerY-200,'opcionespista',0);
        opcionesl.anchor.setTo(0.5);
        opcionesl.animations.add('opcion1',[0,0],10,true);
        opcionesl.animations.add('opcion2',[1,1],10,true);
        opcionesl.animations.add('opcion3',[2,2],10,true);


    
      
        
        var derecha = game.add.sprite( game.world.centerX+200 , game.world.centerY, 'flecha');
        derecha.anchor.setTo(0.5);
        derecha.anchor.setTo(0.5);
        
        
        derecha.inputEnabled = true;
        derecha.events.onInputDown.add(listenDerecha, this);

        var izquierda = game.add.sprite( game.world.centerX-200 , game.world.centerY , 'flecha');
        izquierda.anchor.setTo(0.5);
        izquierda.anchor.setTo(0.5);
        izquierda.scale.x *= -1;

        izquierda.inputEnabled = true;
        izquierda.events.onInputDown.add(listenIzquierda, this);

         
        var derecha2 = game.add.sprite( game.world.centerX+200 , game.world.centerY-200, 'flecha');
        derecha2.anchor.setTo(0.5);
        derecha2.anchor.setTo(0.5);
        
        
        derecha2.inputEnabled = true;
        derecha2.events.onInputDown.add(listenDerecha2, this);

        var izquierda2 = game.add.sprite( game.world.centerX-200 , game.world.centerY-200 , 'flecha');
        izquierda2.anchor.setTo(0.5);
        izquierda2.anchor.setTo(0.5);
        izquierda2.scale.x *= -1;

        izquierda2.inputEnabled = true;
        izquierda2.events.onInputDown.add(listenIzquierda2, this);

        

        var startbutton = game.add.sprite( game.world.centerX , game.world.centerY+200, 'startbuttonsprite');
        startbutton.anchor.setTo(0.5);
        startbutton.anchor.setTo(0.5);
        
        startbutton.inputEnabled = true;
        startbutton.events.onInputDown.add(listener3, this);
    
        
  
    },

    update: function() {
        setStats();
        checkAnim();
        checkAnim2();
        console.log(perSelect);
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
