JesusTakeTheWheel.charselState = function(game) {
}
var hitsAvailable;
var speedAvailable;
var perSelect= 1;
var numOpciones = 3;
var clicked3 = false; 
var opcionesp; 

var selArray = [
    [],
    [0,1,2,3,4,5,6,7,8,9,10,11,12],
    [16,17,18,19,20,21,22,23,24,25,26,27,28],
    [32,33,34,35,36,37,38,39,40,41,42,43,44],
];
var helArray = [
   [],
   [0,0,1,1],
   [0,1,1,1],
   [0,0,0,1]

];
var velArray = [
   [],
   [0,0,1,1],
   [0,0,0,1],
   [0,1,1,1]
   
];


var currentChar;
var vel1;
var vel2;
var vel3;
var vel4;

var hel1;
var hel2;
var hel3;
var hel4; 
function initPutStats(){
 
   var subHel = helArray[perSelect];
   var subVel = velArray[perSelect];
   
   vel1 = game.add.sprite(game.world.centerX-90 , game.world.centerY+100, 'helind',subHel[0]);
   vel2 = game.add.sprite(game.world.centerX-45 , game.world.centerY+100, 'helind',subHel[1]);
   vel3 = game.add.sprite(game.world.centerX , game.world.centerY+100, 'helind',subHel[2]);
   vel4 = game.add.sprite(game.world.centerX+45 , game.world.centerY+100, 'helind',subHel[3]);
   
   hel1 =  game.add.sprite(game.world.centerX-90 , game.world.centerY+150, 'velind',subVel[0]);
   hel2 =  game.add.sprite(game.world.centerX-45 , game.world.centerY+150, 'velind',subVel[1]);
   hel3 =  game.add.sprite(game.world.centerX , game.world.centerY+150, 'velind',subVel[2]);
   hel4 =  game.add.sprite(game.world.centerX+45 , game.world.centerY+150, 'velind',subVel[3]);
   
   }
function putStats(){
vel1.kill();
vel2.kill();
vel3.kill();
vel4.kill();

hel1.kill();
hel2.kill();
hel3.kill();
hel4.kill();

var subHel = helArray[perSelect];
var subVel = velArray[perSelect];

vel1 = game.add.sprite(game.world.centerX-90 , game.world.centerY+100, 'helind',subHel[0]);
vel2 = game.add.sprite(game.world.centerX-45 , game.world.centerY+100, 'helind',subHel[1]);
vel3 = game.add.sprite(game.world.centerX , game.world.centerY+100, 'helind',subHel[2]);
vel4 = game.add.sprite(game.world.centerX+45 , game.world.centerY+100, 'helind',subHel[3]);

hel1 =  game.add.sprite(game.world.centerX-90 , game.world.centerY+150, 'velind',subVel[0]);
hel2 =  game.add.sprite(game.world.centerX-45 , game.world.centerY+150, 'velind',subVel[1]);
hel3 =  game.add.sprite(game.world.centerX , game.world.centerY+150, 'velind',subVel[2]);
hel4 =  game.add.sprite(game.world.centerX+45 , game.world.centerY+150, 'velind',subVel[3]);

}

function putSprite(){

    currentChar.kill();
    var subsel = selArray[perSelect];
    currentChar = game.add.sprite(game.world.centerX , game.world.centerY+50, 'racersprite',subsel[0]); //Le da un sprite en la posición 600,20 , con el tile 0 del tileset arrowsprite 
    currentChar.anchor.set(0.5);//Pone el punto de referencia del sprite en el centro 
    currentChar.animations.add('recto',[subsel[0],subsel[1]],10,true);
    currentChar.animations.play('recto'); 


}
function setStats(){
   if(perSelect == 1){
   hitsAvailable = 4;
   speedAvailable = 900;
   }
   if(perSelect == 2){
   hitsAvailable = 2;
   speedAvailable = 1100;
   }
   if(perSelect == 3){
   hitsAvailable = 6;
   speedAvailable = 800;
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
       putSprite();
   
}
function listenIzquierda(){
   
       perSelect--;
       checkSelect();
       putSprite(); 
   
}
function listener3(){
   clicked3 = true; 
}
    
JesusTakeTheWheel.charselState.prototype = {
    init: function() {
       console.log("Estoy en personajeState");
   },
    preload: function() {
       
   },
    create: function() {

        

       var fondo= game.add.image(game.world.centerX+100, game.world.centerY+100, 'interfazPersonaje');
       fondo.anchor.setTo(0.5);
       game.world.setBounds(0,0,1000,800);
       opcionesp = game.add.sprite(game.world.centerX,game.world.centerY-80,'opcionespersonaje',0);
       
       initPutStats();

       opcionesp.anchor.setTo(0.5);
       opcionesp.animations.add('opcion1',[0,0],10,true);
       opcionesp.animations.add('opcion2',[1,1],10,true);
       opcionesp.animations.add('opcion3',[2,2],10,true);

       var subsel = selArray[perSelect];
        currentChar = game.add.sprite(game.world.centerX , game.world.centerY+50,  'racersprite',subsel[0]); //Le da un sprite en la posición 600,20 , con el tile 0 del tileset arrowsprite 
        currentChar.anchor.set(0.5);//Pone el punto de referencia del sprite en el centro 
        currentChar.animations.add('recto',[subsel[0],subsel[1]],10,true);
        currentChar.animations.play('recto'); 
    

       
       var derecha = game.add.sprite( game.world.centerX+300 , game.world.centerY-80, 'flecha');
       derecha.anchor.setTo(0.5);
       derecha.anchor.setTo(0.5);
       
       
       derecha.inputEnabled = true;
       derecha.events.onInputDown.add(listenDerecha, this);
        var izquierda = game.add.sprite( game.world.centerX-300 , game.world.centerY-80 , 'flecha');
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
       putStats(); 
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
       game.state.start('staselState');
            
    
       }
     
   }
}