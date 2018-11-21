Jesus.levelState = function(game) {

}
var BOMBAS; //Colisión de grupo para los objetos del nivel 
var VALLASRECTAS; 
var VALLASDERECHA;
var VALLASIZQUIERDA;
var ACELERADORES;
var CORAZONES;
var BLANCAS;
var CHARCOS; 
var CAIDAS; 
var ABISMOS; 
var META; 
var cursors2; 
var totheend;

var raceStart = false ; 

var cursors;//Variable para los cursores de cntrol
var map;//Variable para el mapa de colisiones
var layer;//Variable para la capa del mapa de colisiones del mapa (el implementado arriba)
var map2;
var layer2; 
var layer3; 
var caidamap; 
var cliffmap; 
var metamap; 
var subchar;
var subchar2;
var player; //Variable jugador
var firstangle; //Variable que detecta el angulo inicial del jugador
var firstangle2;
var muerto = false; 
var muerto2;
var ganado = false;
var ganado2;
var muertepor = "nada";
var muertepor2 = "nada";
var charSelect; 
var charSelect2;
var charArray = [
    [],
    [0,1,2,3,4,5,6,7,8,9,10,11,12],
    [16,17,18,19,20,21,22,23,24,25,26,27,28],
    [32,33,34,35,36,37,38,39,40,41,42,43,44],
];

var histAvailable2 = 4;

var speedAvailable2 = 900;

var perSelect2 = 2;

var tacked = false;


//Variable puntero para ir seleccionando los distintos subarrays en gravity


//Template y subtemplate funcionan parecido a gravedad , template contiene las posiciones de los objetos de la escena
//Subtemplate es una variable de apoyo para recorrer template 



//Velocidad punta ( o maxima , porque en fin la vida)  y velocidad minima para que el drag no me frene del todo 
var velpunta ;
var velpunta2 ;
var velmin = 400;
//Lo máximo que puede rotar el jugador mientras gira 
var maxangleright = -25;
var maxangleleft = 25;

var maxangleright2 = -25;
var maxangleleft2 = 25;
//Checks para los cambios de gravedad y de sprite (de momento) porque que puede salir mal si te saltas un check?



var wallHits = 0 ;//Numero de golpes que se ha pegado el jugador
var wallHits2 = 0;

var maxHits;  
var maxHits2;

var recorrido;
var recorrido2; //Guarda la posicion en el eje y del jugador al morir para saber cuanto ha recorrido
var timer; //Guarda el tiempo en milisegundos del jugador al morir o al llegar a la meta para saber cuanto ha tardado
var next = false;
var next2; //Variable de apoyo que sirve para que las colisiones no se vuelvan locas 
var nextAcelerador = false;
var nextAcelerador2;



var timeDisplay; //Variable donde esta el timer 
var total = 0; // Total en segundos del tiempo en milisegundos del timer 
var minutos = 0; //Total en minutos del tiempo en milisegundos del timer

var countdown;
var countdownEvent; 

var timeSpin; 

var player2;

var the3;
var the2;
var the1;
var go;



//La funcion que solo cambia de estado , lo separo de cualquier otra función porque cambiar de estado ganando no es lo mismo que perdiendo
function change(){
    game.state.start('endingState');
}

function isOver(){ //Termina el juego cuando mueres , mueren los dos jugadores en esta version , genera una animación de muerte por tweens
    var subchar = charArray[charSelect];
    recorrido = player.body.position.y; 
    timer = this.game.time.totalElapsedSeconds()-3;
    var corpse;
    corpse = game.add.sprite(player.body.y, player.body.x,'caidita');
    game.physics.arcade.enable(corpse);
    corpse.body.x = player.body.x;
    corpse.body.y = player.body.y; 
    corpse.body.moves = false;
    corpse.body.immovable = true; 
    player.kill();


   
    
    var deadcar = game.add.sprite(corpse.body.x , corpse.body.y , 'racersprite',subchar[10]);
    var deadhead = game.add.sprite(corpse.body.x, corpse.body.y , 'racersprite', subchar[9]);
    var deadwheel = game.add.sprite(corpse.body.x,corpse.body.y, 'racersprite',subchar[11]);
    var deadbody = game.add.sprite(corpse.body.x,corpse.body.y, 'racersprite',subchar[12]);

  
    var tweencar = game.add.tween(deadcar).to({x:0,y:0},4000,"Quart.easeOut");
    var tweenhead =  game.add.tween(deadhead).to({x:2700,y:21600},4000,"Quart.easeOut");
    var tweenwheel =  game.add.tween(deadwheel).to({x:2700,y:0},4000,"Quart.easeOut");
    var tweenbody =  game.add.tween(deadbody).to({x:0,y:21600},4000,"Quart.easeOut");

   

    tweencar.start();
    tweenhead.start();
    tweenwheel.start();
    tweenbody.start();

    
    var gameover = game.add.sprite(corpse.body.x , corpse.body.y, 'gameover');
    gameover.anchor.setTo(0.5);
    var tweengameover = game.add.tween(gameover).to({x:corpse.body.y},4000,"Quart.easeOut");
   // tweengameover.onComplete.add(change,this);
    tweengameover.start();
        
}//Actualiza la gravedad según el jugador pero no funciona bien 
function updateGravity(eny,enx){
   
    //Hace lo mismo que en initPhysics , podria llamarlo desde alli y ahorrarme el codigo
    
  this.player.body.gravity.y =eny;
  this.player.body.gravity.x = enx;
   
}

//Estas 4 funciones son para el control de las animaciones que realiza el juador cuando choca con un objeto
function stopforme(){
    player.animations.play('recto');
}
function stopforme2(){
    player2.animations.play('recto');
}

function spinforme(){
    player.animations.play('dizzy');
    game.time.events.add(Phaser.Timer.SECOND * 2, stopforme , this);
}


//Funciones de hits contra cosas 
function hitCharco(){
    console.log("charco");
    var velrand = game.rnd.integerInRange(-15,15);  
    console.log(velrand);
    player.body.velocity.x += velrand;
    spinforme(player); 
}



function hitBomba (player,bomba){
    console.log("Bomba fuera")
    if(bomba.frame == 0 ){
        muertepor = "bomba";
        muerto = true; 
        console.log("bomba");
        bomba.kill();
       
        isOver();
        
        
    }
}

function hitVallaRecta(player, valla){
    console.log(" ");
   if (valla.frame == 0 ){
        console.log("Valla!");
        nextValla = true; 
        wallHits++;
        var newValla = game.add.sprite(valla.body.position.x , valla.body.position.y,'vallaRecta',1);
        game.physics.arcade.enable(newValla);
        newValla.body.enable = true;
        newValla.body.immovable = true;
        newValla.body.moves = false; 
        valla.kill();
        spinforme();
   }
}


function hitVallaDerecha(player, valla){
   console.log(" ");
    if(valla.frame == 0 ){
        console.log("Valla!");
        nextValla = true; 
        wallHits++;
        var newValla = game.add.sprite(valla.body.position.x , valla.body.position.y,'vallaDerecha',1);
        game.physics.arcade.enable(newValla);
        newValla.body.enable = true;
        newValla.body.immovable = true;
        newValla.body.moves = false; 
        valla.kill();
        spinforme();
    }
}

   


function hitVallaIzquierda(player ,valla){
   console.log (" ");
    if(valla.frame == 0 ){
        console.log("Valla!");
        nextValla = true; 
        wallHits++;
        var newValla = game.add.sprite(valla.body.position.x , valla.body.position.y,'vallaIzquierda',1);
        game.physics.arcade.enable(newValla);
        newValla.body.enable = true;
        newValla.body.immovable = true;
        newValla.body.moves = false; 
        valla.kill();
        spinforme();
    }
}



function hitCorazon(player , corazon){
   console.log(" ");
    if(corazon.frame == 0 ){
        console.log("Corazon!");
        if(wallHits > 0){
            wallHits--;
        }
        corazon.kill();
    
}
}






function hitAcelerador(){
    if(!nextAcelerador){
    nextAcelerador = true; 
    console.log("Acelerador!");
    player.body.velocity.y = velpunta;
    }
}

function hitMeta(){
    console.log("Meta!");
    recorrido = player.body.position.y;
    timer = this.game.time.totalElapsedSeconds()-3;

    var posfinx = player.body.position.x;
    var posfiny = player.body.position.y;

  

    player.body.moves = false;
   
   
    var tweenMeta1 = game.add.tween(player).to({x: posfinx ,y:posfiny +300},4000,"Quart.easeOut");
   
    tweenMeta1.onComplete.add(change);


    tweenMeta1.start(); 


   
}


//Los controles que me han costado la vida 
//Controlan la posición del jugador y su rotación en caso de que se mueva a derecha o a izquierda 
//Llaman a update gravedad 
 function movePlayerDown(){
   
   
   if (cursors.up.isDown && cursors.right.isDown){
       
       player.body.position.x +=3;
       player.body.position.y -= 1.5;
       updateGravity(300,300,player);
        if(player.angle > firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
           updateGravity(400,0,player);
       }
       if(player.angle > maxangleright){
        player.animations.play('derecha');
       player.angle -=1
       
       }
   }
    if (cursors.up.isDown && cursors.left.isDown){
       player.body.position.x -=5;
       player.body.position.y -= 1.5;
       updateGravity(300,-300,player);
       
       if(player.angle < firstangle){
        player.animations.play('recto');
           player.angle = firstangle;
           updateGravity(400,0,player);
       }
        if(player.angle < maxangleleft){
            player.animations.play('izquierda');
           player.angle +=1;
          
           }
   }
   
   if (cursors.up.isDown){
       player.body.position.y -= 7;
      
   }
    if (cursors.left.isDown)
   {
       player.body.position.x -=10;
       updateGravity(300,-300);
        if(player.angle < firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
           updateGravity(400,0,player);
       }
        if(player.angle < maxangleleft){
            player.animations.play('izquierda');
           player.angle +=1;
          
           }
   }
   if (cursors.right.isDown)
   {
       player.body.position.x +=10;
       updateGravity(300,300,player);
        if(player.angle > firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
           updateGravity(400,0,player);
       }
       if(player.angle > maxangleright){
        player.animations.play('derecha');
       player.angle -=1
       
       }
   } 
   if(cursors.down.isDown)
   {
    player.angle = firstangle;
    player.animations.play('recto');
     player.body.velocity.y += 300;
   }
  
 }

//Controles del jugador 2 , van con wasd 
 function updatePlayer2General(){
	 
	
         if(player2.angle > firstangle2){
             player2.animations.play('recto');
            player2.angle = firstangle2;
         
        }
        if(player2.angle > maxangleright2){
         player2.animations.play('derecha');
        player2.angle -=1
        
        }
  
        
        if(player2.angle < firstangle2){
         player2.animations.play('recto');
            player2.angle = firstangle2;
     
        }
         if(player2.angle < maxangleleft2){
             player2.animations.play('izquierda');
            player2.angle +=1;
           
            }

         if(player2.angle < firstangle2){
             player2.animations.play('recto');
            player2.angle = firstangle2;
            
        }
         if(player2.angle < maxangleleft2){
             player2.animations.play('izquierda');
            player2.angle +=1;
           
            }
    
         if(player2.angle > firstangle2){
             player2.animations.play('recto');
            player2.angle = firstangle2;
         
        }
        if(player2.angle > maxangleright2){
         player2.animations.play('derecha');
        player2.angle -=1
        
        }
   
  }


  //checkSpeed se llama cuando el jugador está en una tile de salto , si su velocidad es demasiado baja lo tira 
 function checkSpeed(player){
  
     if(player.body.velocity.y < velpunta-50 ){
         caida(player);
     }
  
 
    }
//Se llama cuando el jugador toca una tile de barranco  y lo mata 
 function caida(player){
     console.log("Vas lento");
     muerto = true; 
    isOver();
 }

//Inicia la gravedad
function initPhysics () {

   //Gravedad
   
   player.body.gravity.y = 400;
   player.body.gravity.x = 0; 

}

//Pone el mapa de colisiones con la pista 
function initStage(){
   
   
if (pistaSelect == 1){
   game.world.setBounds(0,0,10000,360000); //Pone bordes al mundo para que sea mas grande que la ventana de vista 

   
   
   caidamap = game.add.tilemap('caidas',45,45);
   caidamap.addTilesetImage('tiletest');
   layer3 = caidamap.createLayer(0);
  

    cliffmap = game.add.tilemap('cliffs',45,45);
    cliffmap.addTilesetImage('tiletest');
    layer = cliffmap.createLayer(0);

  
   map = game.add.tilemap('mapatest',45,45); //Añade a map (declarado en global) un tilemap que ya hemos cargado
   map.addTilesetImage('tiletest'); //Añade el tileset 
   layer = map.createLayer(0); //Mete en layer una capa creada en el mapa (capa 0)
   map.setCollision([58,63,66,69,75,78,83,84,86,87,88,89,91,92,93,94,99,100,102,105,108,109,115,116,118,121,124,125,142,143],true); //Pone la colisión entre 3 y 3 , es decir , en el tile numero 3 del tileset que son
 
  
   

   map2 = game.add.tilemap('mapabombas',45,45);
   map2.addTilesetImage('tiletest');
   layer2 = map2.createLayer(0);

   metamap = game.add.tilemap('mapameta',45,45);
   metamap.addTilesetImage('tilestest');
   layer2 = metamap.createLayer(0);



  
}

if (pistaSelect == 2){
    game.world.setBounds(0,0,10000,360000); //Pone bordes al mundo para que sea mas grande que la ventana de vista 
 
    
    caidamap = game.add.tilemap('caidas',45,45);
    caidamap.addTilesetImage('tiletest');
    layer3 = caidamap.createLayer(0);
   
 
     cliffmap = game.add.tilemap('cliffs',45,45);
     cliffmap.addTilesetImage('tiletest');
     layer = cliffmap.createLayer(0);
 
   
    map = game.add.tilemap('mapatest2',45,45); //Añade a map (declarado en global) un tilemap que ya hemos cargado
    map.addTilesetImage('tiletest'); //Añade el tileset 
    layer = map.createLayer(0); //Mete en layer una capa creada en el mapa (capa 0)
    map.setCollision([58,63,66,69,75,78,83,84,86,87,88,89,91,92,93,94,99,100,102,105,108,109,115,116,118,121,124,125,142,143],true); //Pone la colisión entre 3 y 3 , es decir , en el tile numero 3 del tileset que son
  
   
    
 
    map2 = game.add.tilemap('mapabombas',45,45);
    map2.addTilesetImage('tiletest');
    layer2 = map2.createLayer(0);
 
    metamap = game.add.tilemap('mapameta',45,45);
    metamap.addTilesetImage('tilestest');
    layer2 = metamap.createLayer(0);
 
 
 
   
 }

 if (pistaSelect == 3){
    game.world.setBounds(0,0,10000,360000); //Pone bordes al mundo para que sea mas grande que la ventana de vista 
 
    
    caidamap = game.add.tilemap('caidas',45,45);
    caidamap.addTilesetImage('tiletest');
    layer3 = caidamap.createLayer(0);
   
 
     cliffmap = game.add.tilemap('cliffs',45,45);
     cliffmap.addTilesetImage('tiletest');
     layer = cliffmap.createLayer(0);
 
   
    map = game.add.tilemap('mapatest',45,45); //Añade a map (declarado en global) un tilemap que ya hemos cargado
    map.addTilesetImage('tiletest'); //Añade el tileset 
    layer = map.createLayer(0); //Mete en layer una capa creada en el mapa (capa 0)
    map.setCollision([58,63,66,69,75,78,83,84,86,87,88,89,91,92,93,94,99,100,102,105,108,109,115,116,118,121,124,125,142,143],true); //Pone la colisión entre 3 y 3 , es decir , en el tile numero 3 del tileset que son
  
   
    
 
    map2 = game.add.tilemap('mapabombas',45,45);
    map2.addTilesetImage('tiletest');
    layer2 = map2.createLayer(0);
 
    metamap = game.add.tilemap('mapameta',45,45);
    metamap.addTilesetImage('tilestest');
    layer2 = metamap.createLayer(0);
 
 
 
   
 }
}
//Mete los obstáculos y les da propiedades físicas 
function initThings(){
   META = game.add.physicsGroup();
   metamap.createFromTiles(19,-1,'metita',layer2,META);
   META.setAll('enableBody',true);
   META.setAll('body.immovable',true);
   META.setAll('body.moves',false);

   CAIDAS = game.add.physicsGroup();
   caidamap.createFromTiles(152,-1,'caidita',layer3,CAIDAS);
   CAIDAS.setAll('enableBody' , true); 
   CAIDAS.setAll('body.immovable',true);
   CAIDAS.setAll('body.moves',false);

   ABISMOS = game.add.physicsGroup();
   caidamap.createFromTiles(145,-1,'caidita2',layer3,ABISMOS);
   ABISMOS.setAll('enableBody', true); 
   ABISMOS.setAll('body.immovable',true);
   ABISMOS.setAll('body.moves',false);
   
    ACELERADORES = game.add.physicsGroup();
    map2.createFromTiles(1,-1,'aceleradorSprite',layer2,ACELERADORES);
    ACELERADORES.setAll('enableBody' , true); 
    ACELERADORES.setAll('body.immovable',true);
    ACELERADORES.setAll('body.moves',false);

   BOMBAS = game.add.physicsGroup();
   map2.createFromTiles(153,-1,'bombasprite',layer2,BOMBAS);
   BOMBAS.setAll('enableBody' , true); 
   BOMBAS.setAll('body.immovable',true);
   BOMBAS.setAll('body.moves',false);
   BOMBAS.callAll('animations.add','animations','idle',[0,1,2,3],10,true);
   BOMBAS.callAll('animations.play','animations','idle');
    
    VALLASRECTAS = game.add.physicsGroup();
    map2.createFromTiles(155,-1,'vallaRecta',layer2,VALLASRECTAS);
    VALLASRECTAS.setAll('enableBody' , true); 
    VALLASRECTAS.setAll('body.immovable',true);
    VALLASRECTAS.setAll('body.moves',false);
    
    VALLASDERECHA = game.add.physicsGroup();
    map2.createFromTiles(157,-1,'vallaDerecha',layer2,VALLASDERECHA);
    VALLASRECTAS.setAll('enableBody',true);
    VALLASDERECHA.setAll('body.immovable',true);
    VALLASDERECHA.setAll('body.moves',false);

    VALLASIZQUIERDA = game.add.physicsGroup();
    map2.createFromTiles(156,-1,'vallaIzquierda',layer2,VALLASIZQUIERDA);
    VALLASIZQUIERDA.setAll('enableBody',true);
    VALLASIZQUIERDA.setAll('body.immovable',true);
    VALLASIZQUIERDA.setAll('body.moves',false);
    
    CHARCOS = game.add.physicsGroup();
    map2.createFromTiles(158,-1,'aceite',layer2,CHARCOS);
    CHARCOS.setAll('enableBody',true);
    CHARCOS.setAll('body.immovable',true);
    CHARCOS.setAll('body.moves',false);
   

    CORAZONES = game.add.physicsGroup();
    map2.createFromTiles(154,-1,'corazonSprite',layer2,CORAZONES);
    CORAZONES.setAll('enableBody' , true); 
    CORAZONES.setAll('body.immovable',true);
    CORAZONES.setAll('body.moves',false);
    CORAZONES.callAll('animations.add','animations','idlec',[0,1,2,3],10,true);
    CORAZONES.callAll('animations.play','animations','idlec');



}
//Crea los controles
function initInput(){
cursors = game.input.keyboard.createCursorKeys();



}
//Inicia toodo lo que tenga que ver con el jugador 
function initPlayer(){
    var subchar = charArray[charSelect];
   player = game.add.sprite(600, 20, 'racersprite',subchar[0]); //Le da un sprite en la posición 600,20 , con el tile 0 del tileset arrowsprite 
   player.anchor.set(0.5);//Pone el punto de referencia del sprite en el centro 
   game.physics.arcade.enable(player); //Activa las fisicas para el jugador
   player.body.bounce.set(0.001); //Le da bounce al cuerpo , no se si se va a quedar asi 
   player.body.tilePadding.set(32); 
   player.body.drag = (25); //Añade rozamiento al cuerpo 
   player.body.allowRotation = true; //Permite la rotación de body 
   firstangle = player.body.angle; //Toma el primer ángulo con el que aparece el jugador y lo guarda para futura referencia
   player.animations.add('recto',[subchar[0],subchar[1]],10,true);
   player.animations.add('derecha',[subchar[4],subchar[5]],10,true);
   player.animations.add('izquierda',[subchar[2],subchar[3]],10,true);
   player.animations.add('dizzy',[subchar[1],subchar[2],subchar[6],subchar[8],subchar[4]],10,true);
   player.animations.play('recto');
   player.body.moves = false;
   player.body.immovable = true;
   
  

   var subchar2 = charArray[charSelect2];
   player2 = game.add.sprite(450, 20, 'racersprite',subchar2[0]); //Le da un sprite en la posición 600,20 , con el tile 0 del tileset arrowsprite 
   player2.anchor.set(0.5);//Pone el punto de referencia del sprite en el centro  
   firstangle2 = player2.angle; //Toma el primer ángulo con el que aparece el jugador y lo guarda para futura referencia
   player2.animations.add('recto',[subchar2[0],subchar2[1]],10,true);
   player2.animations.add('derecha',[subchar2[4],subchar2[5]],10,true);
   player2.animations.add('izquierda',[subchar2[2],subchar2[3]],10,true);
   player2.animations.add('dizzy',[subchar2[1],subchar2[2],subchar2[6],subchar2[8],subchar2[4]],10,true);
   player2.animations.play('recto');

  
}





//Comprueba la velocidad del coche para que no sobrepase su máxima ni se frene del todo 
function checkVel(){

   if(player.body.velocity.y >= velpunta){
       player.body.velocity.y = (Math.min(velpunta, player.body.velocity.y));
       }
        if(player.body.velocity.y <= velmin){
           player.body.velocity.y = velmin;
           }
        
          
                 
        }

    
//Se activa cuando te la pegas contra la pared para añadirte un golpe y te pone next a true para indicar que te has colisionado recientmente 
function hitWall(){
   
    if( player.body.velocity.y >= 200 && !next){
   console.log("hitwall");
       wallHits++;
       next = true;
   }
}

   
//Comprueba si te la has pegado , si no te la has pegado te pone next a false para que te la puedas pegar 
//Llama a hitwall y a hitTackle 
function checkColision(){ 
   
    
   if(!(game.physics.arcade.collide(player,layer,hitWall,null,this))){
       next = false;
   }
   else{
       //Si te la has pegado llama a hitWall para que te apunte un golpe 
       game.physics.arcade.collide(player,layer,hitWall,null,this); 
   }



    
   
}
//Mira cuanto daño te has hecho , si tienes  el maximo de golpes mueres 
function checkDaño(player){ 

if (wallHits == maxHits){
    muertepor = "golpes";
    muerto = true; 
   
   isOver();
}

}


//Esto es del timer 
function updateCounter(){ //Función que se llama cada vez que displayTimer llega a 1000 milisegundos 
    total++;
    if(total % 1000 == 0  ){ //Si el total de segundos no tiene resto al dividirlo entre 1000 es un minuto y lo añade 
        minutos++;
    }
}
function allowMovement(){
    console.log("moving! ");
    player.body.moves = true;
    player.body.immovable = false;

 
    timeDisplay.start();
}
function tweenAndStart(){
    console.log("TweenAndSTart");
    raceStart = true; 
   var the3tween = game.add.tween(the3).to({x:player.body.x ,y:player.body.y},1000,"Quart.easeOut");
   var the2tween = game.add.tween(the2).to({x:player.body.x,y:player.body.x},1000,"Quart.easeOut");
   var the1tween = game.add.tween(the1).to({x:player.body.x,y:player.body.y},1000,"Quart.easeOut");

 
   the3tween.onComplete.add(function() {the3.kill(); the2tween.start();});
   the2tween.onComplete.add(function() {the2.kill(); the1tween.start();});
   the1tween.onComplete.add(function() {the1.kill();go.alpha = 1; ; allowMovement(); });
    
   the3tween.start();

}


Jesus.levelState.prototype = {

    preload: function() {
      
    },
     create: function() {  
 
        
        
         charSelect = perSelect;
          maxHits = hitsAvailable;
          velpunta = speedAvailable;
          charSelect2 = perSelect2;
         maxHits2 = histAvailable2;
         velpunta2 = speedAvailable2; 
 
         game.stage.backgroundColor = "#dbfff7";
     
         initStage();
     
         initPlayer();
 
         initPhysics();
         initThings();
        initInput();
        
        the3 = game.add.sprite(-45 , player.body.y,'numeros',2);
        the2 = game.add.sprite(-45 , player.body.y,'numeros',1);
        the1 = game.add.sprite(-45 , player.body.y,'numeros',0);
        go = game.add.sprite(player.body.x, player.body.y,'numeros',9);
        go.alpha = 0;  
 
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON); //Indicamos a la camara que siga a player 
 
        //Creamos el timer 
        timeDisplay = game.time.create(false);
        timeDisplay.loop(1000, updateCounter, this);//Indicamos cada cuanto hace un loop y a que funcion tiene que llamar cuando lo haga 
        
        
        //Inicializamos el timer 
 
 
        //var startCountdown = game.add.sprite(player.body.position.x,player.body.position.y,'gameover');
        //startCountdown.anchor.setTo(0.5);
       
     
      
    },
     update: function() { 
         
         if(!raceStart){tweenAndStart()}
      
        
        movePlayerDown(); // llama a los controles
     
        checkVel(); //Comprueba la velocidad 
      
      
        checkColision(); //Comprueba la colisión 
       
        checkDaño(); //Comprueba el daño
    
 
        //Muestra el timer con la funcionalidad de debug porque no quiero buscarme sprites de numeritos
        game.debug.text( ':'+(timeDisplay.duration.toFixed(0))/10, 86, 32);
        game.debug.text(':'+total, 64, 32 );
        game.debug.text(minutos, 32,32 );
        game.debug.text("Hits : " + wallHits, 32,64);
        game.debug.text("Hits 2 :" + wallHits, 32,86);
        
        //TODAS LAS COLISIONES , ABSOLUTAMENTE TODAS 
        game.physics.arcade.overlap(player,CAIDAS,checkSpeed,null,this);
        game.physics.arcade.overlap(player,ABISMOS,caida,null,this);
        game.physics.arcade.overlap(player,BOMBAS,hitBomba,null,this);
        
        game.physics.arcade.overlap(player,VALLASRECTAS,hitVallaRecta,null,this);
        game.physics.arcade.overlap(player,VALLASDERECHA,hitVallaDerecha,null,this);
        game.physics.arcade.overlap(player,VALLASIZQUIERDA,hitVallaIzquierda,null,this);
        game.physics.arcade.overlap(player,CORAZONES,hitCorazon,null,this);
     
        game.physics.arcade.overlap(player,CHARCOS,hitCharco,null,this);
        //game.physics.arcade.overlap(player,META,hitMeta,null,this);
 
      

        this.putRacer();
        
    },
    ///GET ON WITH IT 
  

   
    
    putRacer() {
    	game.player1.posX = player.body.position.x;
    	game.player1.posY = player.body.position.y;
    	game.player1.dead = muerto;
    	game.player1.winner = ganado;
    	
    	
    	
    	
    	
        $.ajax({
            method: "PUT",
            url: 'http://localhost:8080/game/' + game.player1.id,
            data: JSON.stringify(game.player1),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (data) {
        	console.log("Actualizada posicion de player 1: " + JSON.stringify(data))
        })
    },
    
    
}