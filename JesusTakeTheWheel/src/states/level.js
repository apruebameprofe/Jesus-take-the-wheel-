JesusTakeTheWheel.levelState = function(game) {
}
//Variables globales
var BOMBAS; //Colisión de grupo para los objetos del nivel 
var VALLAS; 
var ACELERADORES;
var CORAZONES;
var BLANCAS;
var cursors;//Variable para los cursores de cntrol
var map;//Variable para el mapa de colisiones
var layer;//Variable para la capa del mapa de colisiones del mapa (el implementado arriba)
var map2;
var layer2; 
var player; //Variable jugador
var firstangle; //Variable que detecta el angulo inicial del jugador
var muerto;
var ganado;
var muertepor = "nada";

var gravity = [ //Array multidimensional para guardar la aceleración de la gravedad en las distintas partes del circuito
[0,400],
[(400/9.68),(400/1.51)], 
[0,400],
[-(400/4.12),(400/8.85)],
[0,400],
[(400/2.98),(400/9.33)],
[0,400],
[(400/7.30),(400/6.53)],
[0,0]
];

//Variable puntero para ir seleccionando los distintos subarrays en gravity
var pos = 0;

//Template y subtemplate funcionan parecido a gravedad , template contiene las posiciones de los objetos de la escena
//Subtemplate es una variable de apoyo para recorrer template 

var templateBombas = [
[550,300],
[570,300],
[590,300],
[610,300],
[300,800],
[100,1000],
];

var templateVallas = [
    [590,500],
    [610,500],
    [630,500],
    [650,500],
    [300,800],
    [100,1000],
    ];

var templateAceleradores = [
    [990,800],
    [1010,800],
    [1030,800],
    [1050,800],

];

//Velocidad punta ( o maxima , porque en fin la vida)  y velocidad minima para que el drag no me frene del todo 
var velpunta = 900;
var velmin = 400;
//Lo máximo que puede rotar el jugador mientras gira 
var maxangleright = -25;
var maxangleleft = 25;
//Checks para los cambios de gravedad y de sprite (de momento) porque que puede salir mal si te saltas un check?
var check0 = false;
var check1 = false;
var check2 = false;
var check3 = false;
var check4 = false;
var check5 = false;
var check6 = false;
var check7 = false;


var wallHits = 0 ;//Numero de golpes que se ha pegado el jugador
var daño = 0 ; //Daño acumulado del jugador 
var porcentajedaño = 25; //Cuantos puntos de daño recibe el jugador en cada golpe 

var recorrido; //Guarda la posicion en el eje y del jugador al morir para saber cuanto ha recorrido
var timer; //Guarda el tiempo en milisegundos del jugador al morir o al llegar a la meta para saber cuanto ha tardado
var next = false; //Variable de apoyo que sirve para que las colisiones no se vuelvan locas 
var nextAcelerador = false;



var timeDisplay; //Variable donde esta el timer 
var total = 0; // Total en segundos del tiempo en milisegundos del timer 
var minutos = 0; //Total en minutos del tiempo en milisegundos del timer 

function isOver(){ //Termina el juego y pasa al siguiente estado 
    recorrido = player.body.position.y; 
    timer = this.game.time.totalElapsedSeconds();
    game.state.start('resultsState');
}

function hitBomba(player,bomba){
    if(bomba.frame == 0 ){
        muertepor = "bomba";
        muerto = true; 
        
        bomba.kill();
       
        isOver();
        
        
    }
    
    
}
function hitValla(player,valla){
    if(valla.frame == 0 ){
        console.log("Valla!");
        nextValla = true; 
        wallHits++;
        valla.kill();
    }
   
}

function hitCorazon(player,corazon){
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
    timer = this.game.time.totalElapsedSeconds();
    setTimeout( isOver(), 5000);
}


//Los controles que me han costado la vida 
//Controlan la posición del jugador y su rotación en caso de que se mueva a derecha o a izquierda 
 function movePlayerDown(){
   
   
   if (cursors.up.isDown && cursors.right.isDown){
       player.body.position.x +=5;
       player.body.position.y -= 1.5;
        if(player.angle > firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
       }
       if(player.angle > maxangleright){
        player.animations.play('derecha');
       player.angle -=1
       }
   }
    if (cursors.up.isDown && cursors.left.isDown){
       player.body.position.x -=5;
       player.body.position.y -= 1.5;
       
       if(player.angle < firstangle){
        player.animations.play('recto');
           player.angle = firstangle;
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
       player.body.position.x -=5;
        if(player.angle < firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
       }
        if(player.angle < maxangleleft){
            player.animations.play('izquierda');
           player.angle +=1;
           }
   }
   if (cursors.right.isDown)
   {
       player.body.position.x +=5;
        if(player.angle > firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
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

 function checkSpeed(){
     if(player.body.velocity.y < 800 ){
         caida();
     }
 
    }
 function caida(){
    muerto = true; 
    muertepor = "caida";
  
    isOver();
 }

//Inicia la gravedad y pone el mapa de colisiones con la pista 
function initPhysics () {

   //Gravedad
   var subgravity = gravity[pos]; //elige la posicion definida en pos que es 0 
   game.physics.arcade.gravity.y = subgravity[1]; //Activa la primera gravedad 
   game.physics.arcade.gravity.x = subgravity[0];
   pos++; //Pone a pos en 1 para que en updateGravity empiece por la segunda gravedad 

   game.world.setBounds(0,0,10000,360000); //Pone bordes al mundo para que sea mas grande que la ventana de vista 

   //Mapa de colisiones
   map = game.add.tilemap('mapatest',20,20); //Añade a map (declarado en global) un tilemap que ya hemos cargado
   map.addTilesetImage('tiletest'); //Añade el tileset 
   layer = map.createLayer(0); //Mete en layer una capa creada en el mapa (capa 0)
   map.setCollisionBetween(3,3); //Pone la colisión entre 3 y 3 , es decir , en el tile numero 3 del tileset que son
   //los cuadraditos rosa 

   map.setTileIndexCallback(6, isOver, this);
   map.setTileIndexCallback(4,checkSpeed,this);
   map.setTileIndexCallback(8,hitMeta,this);
   
   

   map2 = game.add.tilemap('mapabombas',20,20);
   map2.addTilesetImage('tiletest');
   layer2 = map2.createLayer(0);
   
   
   
    ACELERADORES = game.add.physicsGroup();
    map2.createFromTiles(1,-1,'aceleradorSprite',layer2,ACELERADORES);
    ACELERADORES.setAll('enableBody' , true); 
    ACELERADORES.setAll('body.immovable',true);
    ACELERADORES.setAll('body.moves',false);

   BOMBAS = game.add.physicsGroup();
   map2.createFromTiles(0,-1,'bombasprite',layer2,BOMBAS);
   BOMBAS.setAll('enableBody' , true); 
   BOMBAS.setAll('body.immovable',true);
   BOMBAS.setAll('body.moves',false);
    
    VALLAS = game.add.physicsGroup();
    map2.createFromTiles(10,-1,'vallaIzquierdaSprite',layer2,VALLAS);
    map2.createFromTiles(11,-1,'vallaMitadSprite',layer2,VALLAS);
    map2.createFromTiles(13,-1,'vallaDerechaSprite',layer2,VALLAS);
    VALLAS.setAll('enableBody' , true); 
    VALLAS.setAll('body.immovable',true);
    VALLAS.setAll('body.moves',false);

    CORAZONES = game.add.physicsGroup();
    map2.createFromTiles(7,-1,'corazonSprite',layer2,CORAZONES);
    CORAZONES.setAll('enableBody' , true); 
    CORAZONES.setAll('body.immovable',true);
    CORAZONES.setAll('body.moves',false);



}
//Crea los controles
function initInput(){
cursors = game.input.keyboard.createCursorKeys();
}
//Inicia toodo lo que tenga que ver con el jugador 
function initPlayer(){

   player = game.add.sprite(600, 20, 'racersprite',0); //Le da un sprite en la posición 600,20 , con el tile 0 del tileset arrowsprite 
   player.anchor.set(0.5);//Pone el punto de referencia del sprite en el centro 
   game.physics.arcade.enable(player); //Activa las fisicas para el jugador
   player.body.bounce.set(0.001); //Le da bounce al cuerpo , no se si se va a quedar asi 
   player.body.tilePadding.set(32); //Ni zorra de que es esto 
   player.body.drag = (25); //Añade rozamiento al cuerpo 
   player.body.allowRotation = true; //Permite la rotación de body 
   firstangle = player.body.angle; //Toma el primer ángulo con el que aparece el jugador y lo guarda para futura referencia
   player.animations.add('recto',[0,8],10,true);
   player.animations.add('derecha',[2,10],10,true);
   player.animations.add('izquierda',[1,9],10,true);
   player.animations.play('recto');
  
}
function initOBstaculos(){

}

//Actualizacion de hacia donde va la gravedad 
function updateGravity(){
   var subgravity = gravity[pos]; //Hace lo mismo que en initPhysics , podria llamarlo desde alli y ahorrarme el codigo
   game.physics.arcade.gravity.y = subgravity[1];
   game.physics.arcade.gravity.x = subgravity[0];
   pos++;
}

//Checkeamos en que altura va el coche 
function checkY(y){ //Cada vez que detecta que has llegado a cierto punto de y actualiza la gravedad 
if (y >= 500 && check0 == false){
   updateGravity();
   check0 = true;
}
if (y >= 880 && check1 == false){
   updateGravity();
   
   check1 = true;
}
if (y>= 1160 && check2 == false){
   updateGravity();
   
   check2 = true;
}
if (y>= 1800 && check3 == false){
   updateGravity();
   
   check3 = true;
}
if (y>= 1980 && check4 == false){
   updateGravity();
   
   check4 = true;
}
if(y>= 2540 && check5 == false){
   
   updateGravity();
   check5 = true;
}
if(y>= 4520 && check6 == false){
   updateGravity();
   check6 = true;
}
if(y>= 4860 && check7 == false){ //Si has llegado al final te guarda tu tiempo y llama a isOver después de 15 segundos (se supone , no funciona demasiado bien)
   player.body.mass = 0;
   timer = this.game.time.totalElapsedSeconds();
   setTimeout( isOver(), 5000);
   check7 = true;
}
}
function checkVel(){ //Comprueba la velocidad del coche para que no sobrepase su máxima ni se frene del todo 
   if(player.body.velocity.y >= velpunta){
       player.body.velocity.y = (Math.min(velpunta, player.body.velocity.y));
       }
        if(player.body.velocity.y <= velmin){
           player.body.velocity.y = velmin;
           }
}
function hitWall(){//Se activa cuando te la pegas contra la pared para añadirte un golpe y te pone next a true para indicar que te has colisionado recientmente 
   
    if( player.body.velocity.y >= 200 && !next){
   
       wallHits++;
       next = true;
   }
   
}
function checkColision(){ //Comprueba si te la has pegado , si no te la has pegado te pone next a false para que te la puedas pegar 
   
   if(!(game.physics.arcade.collide(player,layer,this.hitWall,null,this))){
       next = false;
   }
   else{
       //Si te la has pegado llama a hitWall para que te apunte un golpe 
       game.physics.arcade.collide(player,layer,this.hitWall,null,this); 
   }
    
   
}
function checkDaño(){ //Mira cuanto daño te has hecho , si tienes 4 golpes mueres 
if (wallHits ==4){
    muertepor = "golpes";
    muerto = true; 
   
   isOver();
}
}


function updateCounter(){ //Función que se llama cada vez que displayTimer llega a 1000 milisegundos 
    total++;
    if(total % 1000 == 0  ){ //Si el total de segundos no tiene resto al dividirlo entre 1000 es un minuto y lo añade 
        minutos++;
    }
}




JesusTakeTheWheel.levelState.prototype = {
  
    preload: function() {
       
   },
    create: function() {  
        initPhysics();
       initInput();
       initPlayer();
       //initObstaculos();
       game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON); //Indicamos a la camara que siga a player 

       //Creamos el timer 
       timeDisplay = game.time.create(false);
       timeDisplay.loop(1000, updateCounter, this); //Indicamos cada cuanto hace un loop y a que funcion tiene que llamar cuando lo haga 
       timeDisplay.start();//Inicializamos el timer 
    
     
   },
    update: function() { 
       
      game.debug.spriteInfo(player,32,32);
       
       movePlayerDown(); // llama a los controles
       checkVel(); //Comprueba la velocidad 
       //checkY(player.position.y); //Comprueba la posición
       checkColision(); //Comprueba la colisión 
       checkDaño(); //Comprueba el daño

       //Muestra el timer con la funcionalidad de debug porque no quiero buscarme sprites de numeritos
       game.debug.text( ':'+(timeDisplay.duration.toFixed(0))/10, 86, 32);
       game.debug.text(':'+total, 64, 32 );
       game.debug.text(minutos, 32,32 );

      game.physics.arcade.overlap(player,BOMBAS,hitBomba,null,this);
       game.physics.arcade.overlap(player,VALLAS,hitValla,null,this);
       game.physics.arcade.overlap(player,CORAZONES,hitCorazon,null,this);
    if(!(game.physics.arcade.overlap(player,ACELERADORES))){
        nextAcelerador = false; 
    }
     game.physics.arcade.overlap(player,ACELERADORES,hitAcelerador,null,this);
       
  
       
   },
};
    
    
