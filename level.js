CatCatcher.levelState = function(game) {
}
//Variables globales
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

var totheend;

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
var player; //Variable jugador
var firstangle; //Variable que detecta el angulo inicial del jugador
var muerto;
var ganado;
var muertepor = "nada";
var charSelect; 
var charArray = [
    [],
    [0,1,2,3,4,5,6,7,8,9,10,11,12],
    [16,17,18,19,20,21,22,23,24,25,26,27,28],
    [32,33,34,35,36,37,38,39,40,41,42,43,44],
];
var hitsAvailable = 4;
var speedAvailable = 900; 
var perSelect = 3; 
var pistaSelect = 1; 


//Variable puntero para ir seleccionando los distintos subarrays en gravity


//Template y subtemplate funcionan parecido a gravedad , template contiene las posiciones de los objetos de la escena
//Subtemplate es una variable de apoyo para recorrer template 



//Velocidad punta ( o maxima , porque en fin la vida)  y velocidad minima para que el drag no me frene del todo 
var velpunta ;
var velmin = 400;
//Lo máximo que puede rotar el jugador mientras gira 
var maxangleright = -25;
var maxangleleft = 25;
//Checks para los cambios de gravedad y de sprite (de momento) porque que puede salir mal si te saltas un check?



var wallHits = 0 ;//Numero de golpes que se ha pegado el jugador
var daño = 0 ; //Daño acumulado del jugador 
var maxHits;  

var recorrido; //Guarda la posicion en el eje y del jugador al morir para saber cuanto ha recorrido
var timer; //Guarda el tiempo en milisegundos del jugador al morir o al llegar a la meta para saber cuanto ha tardado
var next = false; //Variable de apoyo que sirve para que las colisiones no se vuelvan locas 
var nextAcelerador = false;



var timeDisplay; //Variable donde esta el timer 
var total = 0; // Total en segundos del tiempo en milisegundos del timer 
var minutos = 0; //Total en minutos del tiempo en milisegundos del timer

var countdown;
var countdownEvent; 

var timeSpin; 

var player2;

function change(){
    game.state.start('resultsState');
}

function isOver(){ //Termina el juego y pasa al siguiente estado 
    var subchar = charArray[charSelect];
    recorrido = player.body.position.y; 
    timer = this.game.time.totalElapsedSeconds()-3;
    var deadcar = game.add.sprite(player.body.x , player.body.y , 'racersprite',subchar[10]);
    var deadhead = game.add.sprite(player.body.x, player.body.y , 'racersprite', subchar[9]);
    var deadwheel = game.add.sprite(player.body.x,player.body.y, 'racersprite',subchar[11]);
    var deadbody = game.add.sprite(player.body.x,player.body.y, 'racersprite',subchar[12]);

  
    var tweencar = game.add.tween(deadcar).to({x:-100,y:-100},4000,"Quart.easeOut");
    var tweenhead =  game.add.tween(deadhead).to({x:1100,y:-100},4000,"Quart.easeOut");
    var tweenwheel =  game.add.tween(deadwheel).to({x:-100,y:900},4000,"Quart.easeOut");
    var tweenbody =  game.add.tween(deadbody).to({x:1100,y:900},4000,"Quart.easeOut");


    tweencar.start();
    tweenhead.start();
    tweenwheel.start();
    tweenbody.start();

    var gameover = game.add.sprite(player.body.x , player.body.y, 'gameover');
    gameover.anchor.setTo(0.5);
    //var tweengameover = game.add.tween(gameover).to({x:player.body.y},4000,"Quart.easeOut");
    //tweengameover.onComplete.add(change,this);
    //tweengameover.start();
     player.kill();

     


    
}

function stopforme(){
    player.animations.play('recto');
}

function spinforme(){
    player.animations.play('dizzy');
    game.time.events.add(Phaser.Timer.SECOND * 2, stopforme , this);
}

function hitCharco(){
    console.log("charco");
    var velrand = game.rnd.integerInRange(-15,15);  
    console.log(velrand);
    player.body.velocity.x += velrand;
    spinforme(); 
}

function hitBomba(player,bomba){
    if(bomba.frame == 0 ){
        muertepor = "bomba";
        muerto = true; 
        console.log("bomba");
        bomba.kill();
       
        isOver();
        
        
    }
    
    
}
function hitVallaRecta(player,valla){
    if(valla.frame == 0 ){
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
function hitVallaDerecha(player,valla){
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

function hitVallaIzquierda(player,valla){
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
    timer = this.game.time.totalElapsedSeconds()-3;

    change();
}


//Los controles que me han costado la vida 
//Controlan la posición del jugador y su rotación en caso de que se mueva a derecha o a izquierda 
 function movePlayerDown(){
   
   
   if (cursors.up.isDown && cursors.right.isDown){
       
       player.body.position.x +=3;
       player.body.position.y -= 1.5;
       updateGravity(300,300);
        if(player.angle > firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
           updateGravity(400,0);
       }
       if(player.angle > maxangleright){
        player.animations.play('derecha');
       player.angle -=1
       
       }
   }
    if (cursors.up.isDown && cursors.left.isDown){
       player.body.position.x -=5;
       player.body.position.y -= 1.5;
       updateGravity(300,-300);
       
       if(player.angle < firstangle){
        player.animations.play('recto');
           player.angle = firstangle;
           updateGravity(400,0);
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
           updateGravity(400,0);
       }
        if(player.angle < maxangleleft){
            player.animations.play('izquierda');
           player.angle +=1;
          
           }
   }
   if (cursors.right.isDown)
   {
       player.body.position.x +=10;
       updateGravity(300,300);
        if(player.angle > firstangle){
            player.animations.play('recto');
           player.angle = firstangle;
           updateGravity(400,0);
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
     if(player.body.velocity.y < velpunta-50 ){
         caida();
     }
 
    }
 function caida(){
     console.log("Vas lento");
    muerto = true; 
    muertepor = "caida";
  
    isOver();
 }

//Inicia la gravedad y pone el mapa de colisiones con la pista 
function initPhysics () {

   //Gravedad
   
   game.physics.arcade.gravity.y = 400;  //Activa la primera gravedad 
   game.physics.arcade.gravity.x = 0;
   
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
   player.body.tilePadding.set(32); //Ni zorra de que es esto 
   player.body.drag = (25); //Añade rozamiento al cuerpo 
   player.body.allowRotation = true; //Permite la rotación de body 
   firstangle = player.body.angle; //Toma el primer ángulo con el que aparece el jugador y lo guarda para futura referencia
   player.animations.add('recto',[subchar[0],subchar[1]],10,true);
   player.animations.add('derecha',[subchar[4],subchar[5]],10,true);
   player.animations.add('izquierda',[subchar[2],subchar[3]],10,true);
   player.animations.add('dizzy',[subchar[1],subchar[2],subchar[6],subchar[8],subchar[4]],10,true);
   player.animations.play('recto');
   player.body.moves = true;
   
  
}
function initOBstaculos(){

}

//Actualizacion de hacia donde va la gravedad 
function updateGravity(eny,enx){
   
     //Hace lo mismo que en initPhysics , podria llamarlo desde alli y ahorrarme el codigo
     
   game.physics.arcade.gravity.y =eny;
   game.physics.arcade.gravity.x = enx;
    
}

//Checkeamos en que altura va el coche 


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
if (wallHits == maxHits){
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




CatCatcher.levelState.prototype = {
  
    preload: function() {
      
   },
    create: function() {  
       
        charSelect = perSelect;
         maxHits = hitsAvailable;
         velpunta = speedAvailable;
        console.log(charSelect);
        console.log(maxHits);
        console.log(velpunta);
        initPhysics();
       initInput();
       initPlayer();

       //initObstaculos();
       game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON); //Indicamos a la camara que siga a player 

       //Creamos el timer 
       timeDisplay = game.time.create(false);
       timeDisplay.loop(1000, updateCounter, this);//Indicamos cada cuanto hace un loop y a que funcion tiene que llamar cuando lo haga 
       
       timeDisplay.start();
       //Inicializamos el timer 


       //var startCountdown = game.add.sprite(player.body.position.x,player.body.position.y,'gameover');
       //startCountdown.anchor.setTo(0.5);
      
    
     
   },
    update: function() { 
        
     
       
       movePlayerDown(); // llama a los controles
       checkVel(); //Comprueba la velocidad 
     
       checkColision(); //Comprueba la colisión 
       checkDaño(); //Comprueba el daño

       //Muestra el timer con la funcionalidad de debug porque no quiero buscarme sprites de numeritos
       game.debug.text( ':'+(timeDisplay.duration.toFixed(0))/10, 86, 32);
       game.debug.text(':'+total, 64, 32 );
       game.debug.text(minutos, 32,32 );
       game.debug.text("Hits : " + wallHits, 32,64);
       
       game.physics.arcade.overlap(player,CAIDAS,checkSpeed,null,this);
       game.physics.arcade.overlap(player,ABISMOS,caida,null,this);
      game.physics.arcade.overlap(player,BOMBAS,hitBomba,null,this);
       game.physics.arcade.overlap(player,VALLASRECTAS,hitVallaRecta,null,this);
       game.physics.arcade.overlap(player,VALLASDERECHA,hitVallaDerecha,null,this);
       game.physics.arcade.overlap(player,VALLASIZQUIERDA,hitVallaIzquierda,null,this);
       game.physics.arcade.overlap(player,CORAZONES,hitCorazon,null,this);
       game.physics.arcade.overlap(player,CHARCOS,hitCharco,null,this);
       game.physics.arcade.overlap(player,META,hitMeta,null,this);
    if(!(game.physics.arcade.overlap(player,ACELERADORES))){
        nextAcelerador = false; 
    }
     game.physics.arcade.overlap(player,ACELERADORES,hitAcelerador,null,this);
       
  
       
   },
};