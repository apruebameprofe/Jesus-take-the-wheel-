Jesus.levelState = function(game) {
	
};
var player2;
var heart1;
var heart2;
var heart3;
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
var press1;
var cursors2;
var totheend;
var alreadydead2 = false; 
var animstate = 1;
var desesperacion = 2; 
var animstate2 = 1; 
var raceStart = false;
var thekey;
var yesimready = 0; 
var yes2isready = 0; 
var alreadydead = false; 
var alreadyinit2 = false; 
var cursors; //Variable para los cursores de cntrol
var map; //Variable para el mapa de colisiones
var layer; //Variable para la capa del mapa
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
var pistaSelect;
var charArray = [
  [],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
];

var perSelect2;
var tacked = false;
var ID2;
var colisionPer = false; 

//Velocidad punta   y velocidad minima
var velpunta;
var velpunta2;
var velmin = 400;
//Lo máximo que puede rotar el jugador mientras gira
var maxangleright = -25;
var maxangleleft = 25;
var maxangleright2 = -25;
var maxangleleft2 = 25;

var wallHits = 0; //Numero de golpes recibidos
var maxHits; //Numero de hits maximos
var recorrido;
var timer; //Guarda el tiempo en milisegundos del jugador al morir o al llegar a la meta para saber cuanto ha tardado
var next = false;
var next2; //Variables de apoyo que sirve para que las colisiones no se vuelvan locas
var nextAcelerador = false;
var nextAcelerador2;
var timeDisplay; //Variable donde esta el timer
var total = 0; // Total en segundos del tiempo en milisegundos del timer
var minutos = 0; //Total en minutos del tiempo en milisegundos del timer
var countdown;
var countdownEvent;
var timeSpin;
var the3;
var the2;
var the1;
var go;
var auxX;
var auxY;

//La funcion que solo cambia de estado , lo separo de cualquier otra función porque cambiar de estado ganando no es lo mismo que perdiendo
function change() {
  game.state.start("endingState");
}
//Funcion para matar al jugador 2 , crea unas animaciones por tweens y destruye su sprite
function killPlayer2() {
  var subcharaux = charArray[desesperacion];

  var corpseaux;
  corpseaux = game.add.sprite(
    player2.position.y,
    player2.position.x,
    "caidita"
  );
  game.physics.arcade.enable(corpseaux);
  corpseaux.body.x = player2.position.x;
  corpseaux.body.y = player.position.y;
  corpseaux.body.moves = false;
  corpseaux.body.immovable = true;
  player2.kill();

  var deadcar = game.add.sprite(
    corpseaux.body.x,
    corpseaux.body.y,
    "racersprite",
    subcharaux[10]
  );
  var deadhead = game.add.sprite(
    corpseaux.body.x,
    corpseaux.body.y,
    "racersprite",
    subcharaux[9]
  );
  var deadwheel = game.add.sprite(
    corpseaux.body.x,
    corpseaux.body.y,
    "racersprite",
    subcharaux[11]
  );
  var deadbody = game.add.sprite(
    corpseaux.body.x,
    corpseaux.body.y,
    "racersprite",
    subcharaux[12]
  );
  
  


  var tweencar = game.add
    .tween(deadcar)
    .to({ x: 0, y: 0 }, 4000, "Quart.easeOut");
  var tweenhead = game.add
    .tween(deadhead)
    .to({ x: 2700, y: 21600 }, 4000, "Quart.easeOut");
  var tweenwheel = game.add
    .tween(deadwheel)
    .to({ x: 2700, y: 0 }, 4000, "Quart.easeOut");
  var tweenbody = game.add
    .tween(deadbody)
    .to({ x: 0, y: 21600 }, 4000, "Quart.easeOut");
  
  tweencar.onComplete.add(function() {
	    deadcar.kill();} );
	tweenhead.onComplete.add(function() {
	    deadhead.kill();} );
	tweenwheel.onComplete.add(function() {
	    deadwheel.kill();} );  
	tweenbody.onComplete.add(function() {
	    deadbody.kill();} );

  tweencar.start();
  tweenhead.start();
  tweenwheel.start();
  tweenbody.start();
}
//Funcion para matar al jugador local , guarda sus resultados , destruye su sprite y sus fisicas y crea y activa la animacion de muerte
//Cuando el tween de la animacion de muerte ha terminado llama a la funcion de cambio de estado
function isOver() {
  var subchar = charArray[charSelect];
  recorrido = player.body.position.y;
  timer = this.game.time.totalElapsedSeconds() - 3;
  var corpse;
  corpse = game.add.sprite(player.body.y, player.body.x, "caidita");
  game.physics.arcade.enable(corpse);
  corpse.body.x = player.body.x;
  corpse.body.y = player.body.y;
  corpse.body.moves = false;
  corpse.body.immovable = true;
  player.kill();

  var deadcar = game.add.sprite(
    corpse.body.x,
    corpse.body.y,
    "racersprite",
    subchar[10]
  );
  var deadhead = game.add.sprite(
    corpse.body.x,
    corpse.body.y,
    "racersprite",
    subchar[9]
  );
  var deadwheel = game.add.sprite(
    corpse.body.x,
    corpse.body.y,
    "racersprite",
    subchar[11]
  );
  var deadbody = game.add.sprite(
    corpse.body.x,
    corpse.body.y,
    "racersprite",
    subchar[12]
  );

  var tweencar = game.add
    .tween(deadcar)
    .to({ x: 0, y: 0 }, 4000, "Quart.easeOut");
  var tweenhead = game.add
    .tween(deadhead)
    .to({ x: 2700, y: 21600 }, 4000, "Quart.easeOut");
  var tweenwheel = game.add
    .tween(deadwheel)
    .to({ x: 2700, y: 0 }, 4000, "Quart.easeOut");
  var tweenbody = game.add
    .tween(deadbody)
    .to({ x: 0, y: 21600 }, 4000, "Quart.easeOut");
  
  tweencar.onComplete.add(function() {
	    deadcar.kill();} );
	tweenhead.onComplete.add(function() {
	    deadhead.kill();} );
	tweenwheel.onComplete.add(function() {
	    deadwheel.kill();} );  
	tweenbody.onComplete.add(function() {
	    deadbody.kill();} );

  tweencar.start();
  tweenhead.start();
  tweenwheel.start();
  tweenbody.start();
 



  var gameover = game.add.sprite(corpse.body.x, corpse.body.y, "gameover");
  gameover.anchor.setTo(0.5);
  var tweengameover = game.add
    .tween(gameover)
    .to({ x: corpse.body.y }, 4000, "Quart.easeOut");
  tweengameover.onComplete.add(change, this);
  tweengameover.start();
} //Actualiza la gravedad
function updateGravity(eny, enx) {
  //La gravedad depende del angulo del jugador , se la llama en los controles
  this.player.body.gravity.y = eny;
  this.player.body.gravity.x = enx;
}

//Estas 4 funciones son para el control de las animaciones que realiza el juador cuando choca con un objeto
function stopforme() {
  player.animations.play("recto");
  animstate = 0;
}

function spinforme() {
  player.animations.play("dizzy");
  animstate = 4;
  game.time.events.add(Phaser.Timer.SECOND * 2, stopforme, this);
}

//Funciones de hits contra cosas
//hitCharco da velocidad aleatoria al jugador en una direccion y llama a las funciones que hacen que gire y pare
function hitCharco() {
  console.log("charco");
  var velrand = game.rnd.integerInRange(-15, 15);
  console.log(velrand);
  player.body.velocity.x += velrand;
  spinforme(player);
}

//Esta funcion recibe siempre player (aunque no lo usa) como primer argumento y bomba como segundo
//Mata al jugador , elimina el sprite de la bomba y llama a la funcion de cambio de estado
//Otras funciones abajo funcionan de forma parecida
function hitBomba(player, bomba) {
  console.log("Bomba");
  if (bomba.frame == 0) {
    muertepor = "bomba";
    muerto = true;
    console.log("bomba");
    bomba.kill();
    

    isOver();
  }
}
//función para comprobar si dos jugadores colisionan
//Reciben ambos colisiones , toman la posicion de variables que se actualizan en el update (auxX , auxY)
function colisionJugadores(player1, player2) {
	
  if (player.body.position.x <= auxX +30 && player.body.position.x >= auxX -30) { //Bounding box clasico 
	 if(player.body.position.y >= auxY -30 && player.body.position.y <= auxY +30){ 
		 if ( !colisionPer){
    colisionPer = true;
    wallHits++;
    console.log("COLISION BB");
    console.log("auxX: " + auxX);
    console.log("auxY: " + auxY);
	 }}
  } else {
    console.log("NO CHOCAN ");
    console.log("auxX: " + auxX);
    console.log("auxY: " + auxY);
    colisionPer = false; 
  }
	 
  checkDaño();
} 
//Funciona parecido a hitbomba , solo que no mata al jugador y al matar a la vaya pone en su lugar un sprite sin colision
//que representa una valla rota
function hitVallaRecta(player, valla) {
  console.log(" ");
  if (valla.frame == 0) {
    console.log("Valla!");
    nextValla = true;
    wallHits++;
    var newValla = game.add.sprite(
      valla.body.position.x,
      valla.body.position.y,
      "vallaRecta",
      1
    );
    game.physics.arcade.enable(newValla);
    newValla.body.enable = true;
    newValla.body.immovable = true;
    newValla.body.moves = false;
    valla.kill();
    spinforme();
  }
}

function hitVallaDerecha(player, valla) {
  console.log(" ");
  if (valla.frame == 0) {
    console.log("Valla!");
    nextValla = true;
    wallHits++;
    var newValla = game.add.sprite(
      valla.body.position.x,
      valla.body.position.y,
      "vallaDerecha",
      1
    );
    game.physics.arcade.enable(newValla);
    newValla.body.enable = true;
    newValla.body.immovable = true;
    newValla.body.moves = false;
    valla.kill();
    spinforme();
  }
}

function hitVallaIzquierda(player, valla) {
  console.log(" ");
  if (valla.frame == 0) {
    console.log("Valla!");
    nextValla = true;
    wallHits++;
    var newValla = game.add.sprite(
      valla.body.position.x,
      valla.body.position.y,
      "vallaIzquierda",
      1
    );
    game.physics.arcade.enable(newValla);
    newValla.body.enable = true;
    newValla.body.immovable = true;
    newValla.body.moves = false;
    valla.kill();
    spinforme();
  }
}

//Funciona parecido a las anteriores , solo que da vida al jugador
function hitCorazon(player, corazon) {
  console.log(" ");
  if (corazon.frame == 0) {
    console.log("Corazon!");
    if (wallHits > 0) {
      wallHits--;
    }
    corazon.kill();
  }
}

function hitAcelerador() {
  if (!nextAcelerador) {
    nextAcelerador = true;
    console.log("Acelerador!");
    player.body.velocity.y = velpunta;
  }
}
//Funcion que guarda los resultados del jugador cuando toca la meta , quita sus fisicas y crea un tween para que su sprite frene
//Cuando termina el tween le manda a los resultados
function hitMeta() {
	ganado= true; 
  console.log("Meta!");
  recorrido = player.body.position.y;
  timer = this.game.time.totalElapsedSeconds() - 3;

  var posfinx = player.body.position.x;
  var posfiny = player.body.position.y;

  player.body.moves = false;

  var tweenMeta1 = game.add
    .tween(player)
    .to({ x: posfinx, y: posfiny + 300 }, 4000, "Quart.easeOut");

  tweenMeta1.onComplete.add(change);

  tweenMeta1.start();
}
//Controlan la posición del jugador y su rotación en caso de que se mueva a derecha o a izquierda
//Llaman a update gravedad segun el angulo del jugador
function movePlayerDown() {
  if (cursors.up.isDown && cursors.right.isDown) {
    player.body.position.x += 3;
    player.body.position.y -= 1.5;
    updateGravity(300, 300, player);
    if (player.angle > firstangle) {
      player.animations.play("recto");
      animstate = 1;
      player.angle = firstangle;
      updateGravity(400, 0, player);
    }
    if (player.angle > maxangleright) {
      player.animations.play("derecha");
      animstate = 2; 
      player.angle -= 1;
    }
  }
  if (cursors.up.isDown && cursors.left.isDown) {
    player.body.position.x -= 5;
    player.body.position.y -= 1.5;
    updateGravity(300, -300, player);

    if (player.angle < firstangle) {
      player.animations.play("recto");
      animstate = 1; 
      player.angle = firstangle;
      updateGravity(400, 0, player);
    }
    if (player.angle < maxangleleft) {
      player.animations.play("izquierda");
      animstate = 3; 
      player.angle += 1;
    }
  }

  if (cursors.up.isDown) {
    player.body.position.y -= 7;
  }
  if (cursors.left.isDown) {
    player.body.position.x -= 10;
    updateGravity(300, -300);
    if (player.angle < firstangle) {
      player.animations.play("recto");
      animstate = 1;
      player.angle = firstangle;
      updateGravity(400, 0, player);
    }
    if (player.angle < maxangleleft) {
      player.animations.play("izquierda");
      animstate = 3;
      player.angle += 1;
    }
  }
  if (cursors.right.isDown) {
    player.body.position.x += 10;
    updateGravity(300, 300, player);
    if (player.angle > firstangle) {
      player.animations.play("recto");
      animstate = 1;
      player.angle = firstangle;
      updateGravity(400, 0, player);
    }
    if (player.angle > maxangleright) {
      player.animations.play("derecha");
      animstate = 2; 
      player.angle -= 1;
    }
  }
  if (cursors.down.isDown) {
    player.angle = firstangle;
    player.animations.play("recto");
    animstate = 1; 
    player.body.velocity.y += 300;
  }
}

//Funcion para llevar las animaciones del jugador 2
function updatePlayer2General() {
  if (animstate2 = 1) {
    player2.animations.play("recto2");

  }
  if (animstate2 = 2) {
    player2.animations.play("derecha2");
   
  }
  
  if (animstate2 = 3) {
	    player2.animations.play("izquierda2");
	   
	  }
  if (animstate2 = 4) {
	    player2.animations.play("dizzy2");
	   
	  }
  

 
}
//checkSpeed se llama cuando el jugador está en una tile de salto , si su velocidad es demasiado baja lo tira
function checkSpeed(player) {
  if (player.body.velocity.y < velpunta - 50) {
    caida(player);
  }
}
//Se llama cuando el jugador toca una tile de barranco  y lo mata
function caida(player) {
  console.log("Vas lento");
  muerto = true;
  isOver();
}

//Inicia la gravedad
function initPhysics() {
  player.body.gravity.y = 400;
  player.body.gravity.x = 0;
}

//Pone el mapa de colisiones con la pista , utiliza un condicional para cargar cada pista , facilmente escalable porque solo hay que añadir un condicional si quieres otra pista nueva
function initStage() {
  if (pistaSelect == 1) {
    game.world.setBounds(0, 0, 10000, 360000); //Pone bounds gigantes al mundo para que la camara funcione

    caidamap = game.add.tilemap("caidas", 45, 45); //A cada variable de mapa le asigna un tilemap y el mismo tileset
    caidamap.addTilesetImage("tiletest");
    layer3 = caidamap.createLayer(0);

    cliffmap = game.add.tilemap("cliffs", 45, 45);
    cliffmap.addTilesetImage("tiletest");
    layer = cliffmap.createLayer(0);

    map = game.add.tilemap("mapatest", 45, 45); //Al mapa que contiene la carretera y las colisiones fijas le pone colisiones en las tiles con los ids que se ven en el array
    map.addTilesetImage("tiletest");
    layer = map.createLayer(0);
    map.setCollision(
      [
        58,
        63,
        66,
        69,
        75,
        78,
        83,
        84,
        86,
        87,
        88,
        89,
        91,
        92,
        93,
        94,
        99,
        100,
        102,
        105,
        108,
        109,
        115,
        116,
        118,
        121,
        124,
        125,
        142,
        143
      ],
      true
    );

    map2 = game.add.tilemap("mapabombas", 45, 45);
    map2.addTilesetImage("tiletest");
    layer2 = map2.createLayer(0);

    metamap = game.add.tilemap("mapameta", 45, 45);
    metamap.addTilesetImage("tiletest");
    layer2 = metamap.createLayer(0);
  }

  if (pistaSelect == 2) {
    game.world.setBounds(0, 0, 10000, 360000);

    caidamap = game.add.tilemap("caidas2", 45, 45);
    caidamap.addTilesetImage("tiletest");
    layer3 = caidamap.createLayer(0);

    cliffmap = game.add.tilemap("cliffs2", 45, 45);
    cliffmap.addTilesetImage("tiletest");
    layer = cliffmap.createLayer(0);

    map = game.add.tilemap("mapatest2", 45, 45);
    map.addTilesetImage("tiletest");
    layer = map.createLayer(0);
    map.setCollision(
      [
        58,
        63,
        66,
        69,
        75,
        78,
        83,
        84,
        86,
        87,
        88,
        89,
        91,
        92,
        93,
        94,
        99,
        100,
        102,
        105,
        108,
        109,
        115,
        116,
        118,
        121,
        124,
        125,
        142,
        143
      ],
      true
    );

    map2 = game.add.tilemap("mapabombas2", 45, 45);
    map2.addTilesetImage("tiletest");
    layer2 = map2.createLayer(0);

    metamap = game.add.tilemap("mapameta2", 45, 45);
    metamap.addTilesetImage("tiletest");
    layer2 = metamap.createLayer(0);
  }

  if (pistaSelect == 3) {
    game.world.setBounds(0, 0, 10000, 360000);

    caidamap = game.add.tilemap("caidas3", 45, 45);
    caidamap.addTilesetImage("tiletest");
    layer3 = caidamap.createLayer(0);

    cliffmap = game.add.tilemap("cliffs3", 45, 45);
    cliffmap.addTilesetImage("tiletest");
    layer = cliffmap.createLayer(0);

    map = game.add.tilemap("mapatest3", 45, 45);
    map.addTilesetImage("tiletest");
    layer = map.createLayer(0);
    map.setCollision(
      [
        58,
        63,
        66,
        69,
        75,
        78,
        83,
        84,
        86,
        87,
        88,
        89,
        91,
        92,
        93,
        94,
        99,
        100,
        102,
        105,
        108,
        109,
        115,
        116,
        118,
        121,
        124,
        125,
        142,
        143
      ],
      true
    );

    map2 = game.add.tilemap("mapabombas3", 45, 45);
    map2.addTilesetImage("tiletest");
    layer2 = map2.createLayer(0);

    metamap = game.add.tilemap("mapameta3", 45, 45);
    metamap.addTilesetImage("tiletest");
    layer2 = metamap.createLayer(0);
  }
}
//Mete los obstáculos y les da propiedades físicas
function initThings() {
  META = game.add.physicsGroup(); //Añade los grupos fisicos
  metamap.createFromTiles(19, -1, "metita", layer2, META); //Desde el mapa crearemos sprites por cada tile con id especificado y los pondremos en el grupo fisico
  META.setAll("enableBody", true);
  META.setAll("body.immovable", true);
  META.setAll("body.moves", false);

  CAIDAS = game.add.physicsGroup();
  caidamap.createFromTiles(152, -1, "caidita", layer3, CAIDAS);
  CAIDAS.setAll("enableBody", true);
  CAIDAS.setAll("body.immovable", true);
  CAIDAS.setAll("body.moves", false);

  ABISMOS = game.add.physicsGroup();
  caidamap.createFromTiles(145, -1, "caidita2", layer3, ABISMOS);
  ABISMOS.setAll("enableBody", true);
  ABISMOS.setAll("body.immovable", true);
  ABISMOS.setAll("body.moves", false);

  ACELERADORES = game.add.physicsGroup();
  map2.createFromTiles(1, -1, "aceleradorSprite", layer2, ACELERADORES);
  ACELERADORES.setAll("enableBody", true);
  ACELERADORES.setAll("body.immovable", true);
  ACELERADORES.setAll("body.moves", false);

  BOMBAS = game.add.physicsGroup();
  map2.createFromTiles(153, -1, "bombasprite", layer2, BOMBAS);
  BOMBAS.setAll("enableBody", true); //Añadiremos propiedades de body con las sentencias setAll y añadiremos animaciones con callAll a los objetos que las requieran
  BOMBAS.setAll("body.immovable", true);
  BOMBAS.setAll("body.moves", false);
  BOMBAS.callAll(
    "animations.add",
    "animations",
    "idle",
    [0, 1, 2, 3],
    10,
    true
  );
  BOMBAS.callAll("animations.play", "animations", "idle");

  VALLASRECTAS = game.add.physicsGroup();
  map2.createFromTiles(155, -1, "vallaRecta", layer2, VALLASRECTAS);
  VALLASRECTAS.setAll("enableBody", true);
  VALLASRECTAS.setAll("body.immovable", true);
  VALLASRECTAS.setAll("body.moves", false);

  VALLASDERECHA = game.add.physicsGroup();
  map2.createFromTiles(157, -1, "vallaDerecha", layer2, VALLASDERECHA);
  VALLASRECTAS.setAll("enableBody", true);
  VALLASDERECHA.setAll("body.immovable", true);
  VALLASDERECHA.setAll("body.moves", false);

  VALLASIZQUIERDA = game.add.physicsGroup();
  map2.createFromTiles(156, -1, "vallaIzquierda", layer2, VALLASIZQUIERDA);
  VALLASIZQUIERDA.setAll("enableBody", true);
  VALLASIZQUIERDA.setAll("body.immovable", true);
  VALLASIZQUIERDA.setAll("body.moves", false);

  CHARCOS = game.add.physicsGroup();
  map2.createFromTiles(158, -1, "aceite", layer2, CHARCOS);
  CHARCOS.setAll("enableBody", true);
  CHARCOS.setAll("body.immovable", true);
  CHARCOS.setAll("body.moves", false);

  CORAZONES = game.add.physicsGroup();
  map2.createFromTiles(154, -1, "corazonSprite", layer2, CORAZONES);
  CORAZONES.setAll("enableBody", true);
  CORAZONES.setAll("body.immovable", true);
  CORAZONES.setAll("body.moves", false);
  CORAZONES.callAll(
    "animations.add",
    "animations",
    "idlec",
    [0, 1, 2, 3],
    10,
    true
  );
  CORAZONES.callAll("animations.play", "animations", "idlec");
}
//Crea los controles
function initInput() {
  cursors = game.input.keyboard.createCursorKeys();
}
//Inicia toodo lo que tenga que ver con el jugador y tiene en cuenta su id
function initPlayer() {
  var subchar = charArray[charSelect];
  
  
if (ownid == 1 ){    player = game.add.sprite(570, 100, "racersprite", subchar[0]);}
else if (ownid == 2 ){ player = game.add.sprite(400, 100, "racersprite", subchar[0]);}
  player.anchor.set(0.5);
  game.physics.arcade.enable(player);
  player.body.bounce.set(0.001);
  player.body.tilePadding.set(32);
  player.body.drag = 25;
  player.body.allowRotation = true;
  player.body.moves = false; 
  firstangle = player.body.angle;

  player.animations.add("recto", [subchar[0], subchar[1]], 10, true);
  player.animations.add("derecha", [subchar[4], subchar[5]], 10, true);
  player.animations.add("izquierda", [subchar[2], subchar[3]], 10, true);
  player.animations.add(
    "dizzy",
    [subchar[1], subchar[2], subchar[6], subchar[8], subchar[4]],
    10,
    true
  );
  player.animations.play("recto");
  animstate = 0;

}
//Inicia al jugador 2
function initPlayer2() {
  subchar2 = charArray[desesperacion];

  //añade el sprite en la posición inicial en función de la id
if(ownid == 1){
  player2 = game.add.sprite(400, 100, "racersprite", subchar2[0]);
}else if(ownid == 2){
    player2 = game.add.sprite(570, 100, "racersprite", subchar2[0]);
}
  player2.anchor.set(0.5);
  firstangle2 = player2.angle;
  player2.animations.add("recto2", [subchar2[0], subchar2[1]], 10, true);
  player2.animations.add("derecha2", [subchar2[4], subchar2[5]], 10, true);
  player2.animations.add("izquierda2", [subchar2[2], subchar2[3]], 10, true);
  player2.animations.add("dizzy2",[subchar2[1], subchar2[2], subchar2[6], subchar2[8], subchar2[4]],10,true);
  player2.animations.play("recto2"); 

}
//Comprueba la velocad del coche para que no sobrepase su máxima ni se frene del todo
function checkVel() {
  if (player.body.velocity.y >= velpunta) {
    player.body.velocity.y = Math.min(velpunta, player.body.velocity.y);
  }
  if (player.body.velocity.y <= velmin) {
    player.body.velocity.y = velmin;
  }
}

//Se activa cuando te golpeas contra una colision fija
function hitWall() {
  if (player.body.velocity.y >= 200 && !next) {
    console.log("hitwall");
    wallHits++;
    next = true;
  }
}

//Comprueba si estas colisionando contra la pared para hacer posible una colision luego , si no estuviera esto
//Cualquier colision contra la pared contaria como varias y el jugador moriria enseguida
//Para colisionar otra vez es necesario que el jugador se separe de la pared
function checkColision() {
  if (!game.physics.arcade.collide(player, layer, hitWall, null, this)) {
    next = false;
  } else {
    game.physics.arcade.collide(player, layer, hitWall, null, this);
  }
}
//Mira cuanto daño te has hecho , si tienes  el maximo de golpes mueres
function checkDaño(player) {

  if (wallHits == maxHits) {
    muertepor = "golpes";
    muerto = true;
if(!alreadydead){
	 alreadydead = true; 
    isOver();
   
}
  }
}

//Funcion que lleva el timer
function updateCounter() {
  total++;
  if (total % 1000 == 0) {
    minutos++;
  }
}

//Funcion que permite al jugador moverse cuando empieza la partida
function allowMovement() {
  console.log("moving! ");
  player.body.moves = true;
  player.body.immovable = false;
//permitir que el segundo jugador se mueva
  player2.moves= true;
  player2.immovable =false;
  timeDisplay.start(); //Tambien activa el timer
}
function tweenAndStart() {
  //Funcion que lleva la animacion de salida , llama a la funcion que activa el movimiento cuando el tween de la animaci
  console.log("TweenAndSTart");
  //raceStart = true;


  var the3tween = game.add
    .tween(the3)
    .to({ x: player.body.x, y: player.body.y }, 1000, "Quart.easeOut");
  var the2tween = game.add
    .tween(the2)
    .to({ x: player.body.x, y: player.body.x }, 1000, "Quart.easeOut");
  var the1tween = game.add
    .tween(the1)
    .to({ x: player.body.x, y: player.body.y }, 1000, "Quart.easeOut");
  
 
  the3tween.onComplete.add(function() {
    the3.kill();
    the2.alpha = 1;
    the2tween.start();
  });
  the2tween.onComplete.add(function() {
    the2.kill();
    the1.alpha = 1;
    the1tween.start();
  });
  the1tween.onComplete.add(function() {
    the1.kill();
    go.alpha = 1;
    allowMovement();
  });
  the3.alpha = 1;
  the3tween.start();
}
function settoTrue(){
	yesimready = 1; 
}
//función que comprueba si se ha pulsado la tecla y hace que deje de verse el texto
function weready(){
	  if(yesimready == 1 && yes2isready == 1){
		  raceStart = true; 
	  }
}  
function pulsaUno(){
	  if(yesimready==1){
		  press1.visible=false;
	  }
}  
Jesus.levelState.prototype = {
  init: function() {
	 
 
	
    //Ponemos datos de seleccion de personaje
    charSelect = perSelect;
    maxHits = hitsAvailable;
    velpunta = speedAvailable;
    game.stage.backgroundColor = "#dbfff7";
    
    //Lo primero es crear la escena antes que el personaje (tema de capas)
    initStage();
    initPlayer();
    
    var auxid;
  },

  preload: function() {
	  
	  desesperacion = player2kart;
	  press1 = game.add.sprite(650, 50, 'press1Start');
	  
  },
  create: function() {
	initPlayer2();  
	
	thekey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	thekey.onDown.add(settoTrue, this);
	
	
	game.state.disableVisibilityChange = true;
    //Iniciamos fisicas , objetos y controles

    initPhysics();
    initThings();
    initInput();
    
    //añadimos los sprites de la cuenta atrás que aparecen al iniciar la partida
    the3 = game.add.sprite(-45, player.body.y, "the3");
    the2 = game.add.sprite(-45, player.body.y, "the2");
    the1 = game.add.sprite(-45, player.body.y, "the1");
    go = game.add.sprite(player.body.x, player.body.y, "thego");
    go.alpha = 0;
    the3.alpha = 0;
    the2.alpha = 0;
    the1.alpha = 0;

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON); //Indicamos a la camara que siga a player

    //Creamos el timer
    timeDisplay = game.time.create(false);
    timeDisplay.loop(1000, updateCounter, this); //Indicamos cada cuanto hace un loop y a que funcion tiene que llamar cuando lo haga
  
    //añade los sprites de los corazones dependiendo de la cantidad de vida que tiene el personaje
    console.log("maxHits es " + maxHits);
    if (maxHits == 6){
    	
    	heart1 = game.add.sprite(30,10,'corazonSprite');
    	heart1.fixedToCamera = true;
    	heart2 = game.add.sprite(65,10,'corazonSprite');
    	heart2.fixedToCamera = true;
    	heart3 = game.add.sprite(100,10,'corazonSprite');
    	heart3.fixedToCamera = true;
    	
    }
    if (maxHits == 4){    	
    	heart1 = game.add.sprite(30,10,'corazonSprite');
    	heart1.fixedToCamera = true;
    	heart2 = game.add.sprite(65,10,'corazonSprite');
    	heart2.fixedToCamera = true;
    }
    if (maxHits == 2){
    	heart1 = game.add.sprite(30,10,'corazonSprite');
    	heart1.fixedToCamera = true;
    	
    
    }
    
  },
  update: function() {
	  
	  /////////////////////cosas del player2/////////
	  
	  //actualiza la posición del jugador 2 con la información que le llega del servidor
	  //usando una variable que en app guarda el valor actualizado del jugador
	  player2.position.x=player2posx;
	  player2.position.y=player2posy;
	  console.log("msg.posX" + msg.posX);
	  console.log("player2posx" + player2posx);
	  //le damos el valor de x e y que recibimos a la variable que usamos
	  //para comprobar la colision
	  auxX=player2posx;
	  auxY=player2posy;
	  //se actualiza el valor de la animación con la variable que viene del servidor
	  animstate2 = player2anim; 
	  //llamada a la funciónque actualiza la animación
	  updatePlayer2General();
	  console.log("player2anim(viene del server)" + player2anim)
	  yes2isready = player2ready; 
	 
	  ////////////////////////////////////////////
	  //indica la cantidad de corazones que tenemos en función de los wallHits
	  if(maxHits == 6){
		  if(wallHits == 6){
			  	heart1.alpha = 0; 
				heart2.alpha = 0;
				heart3.alpha = 0;
		  }
		  if(wallHits == 4){
				heart1.alpha = 1; 
				heart2.alpha = 0;
				heart3.alpha = 0;
		  }
		  if(wallHits == 2){
				heart1.alpha = 1; 
				heart2.alpha = 1;
				heart3.alpha = 0;
		  }
		  if(wallHits == 0){
				heart1.alpha = 1; 
				heart2.alpha = 1;
				heart3.alpha = 1;
		  }
	  }
	  
	  if (maxHits == 4){    
		  if(wallHits == 2){
		heart1.alpha = 1; 
		heart2.alpha = 0;
		  }
		 if(wallHits == 4){
			 heart2.alpha = 0;
			 heart1.alpha = 0; 
		 }
		 if(wallHits == 0 ){
			 heart2.alpha = 1;
			 heart1.alpha = 1;
		 }
	    }
	  
	  if (maxHits == 2){    
		  if(wallHits == 0){
		heart1.alpha = 1;
		  }
		  if(wallHits==2){
			  heart1.alpha=0;
		  }
	    }

	  //game.debug.spriteInfo(player, 32, 32);
	  //game.debug.spriteInfo(player2, 32, 130);

    if (raceStart) {
      tweenAndStart();
    }

    movePlayerDown(); // llama a los controles

    checkVel(); //Comprueba la velocidad

    checkColision(); //Comprueba la colisión

    checkDaño(); //Comprueba el daño
    
    pulsaUno(); //comprueba si se ha pulsado 1
    
    weready();  //comprueba si los dos jugadores estan listos
    //Muestra el timer con la funcionalidad de debug
    //game.debug.text(":" + timeDisplay.duration.toFixed(0) / 10, 86, 32);
    //game.debug.text(":" + total, 64, 32);
    //game.debug.text(minutos, 32, 32);

    //TODAS LAS COLISIONES
    game.physics.arcade.overlap(player, CAIDAS, checkSpeed, null, this);
    game.physics.arcade.overlap(player, ABISMOS, caida, null, this);
    game.physics.arcade.overlap(player, BOMBAS, hitBomba, null, this);

    game.physics.arcade.overlap(
      player,
      VALLASRECTAS,
      hitVallaRecta,
      null,
      this
    );
    game.physics.arcade.overlap(
      player,
      VALLASDERECHA,
      hitVallaDerecha,
      null,
      this
    );
    game.physics.arcade.overlap(
      player,
      VALLASIZQUIERDA,
      hitVallaIzquierda,
      null,
      this
    );
    game.physics.arcade.overlap(player, CORAZONES, hitCorazon, null, this);
    game.physics.arcade.overlap(player, CHARCOS, hitCharco, null, this);
    game.physics.arcade.overlap(player, META, hitMeta, null, this);

    //comprobamos si los jugadores han colisionado
    colisionJugadores();
    //Por ultimo comprobamos si el jugador online ha muerto
    if (muerto2 && !alreadydead2) {
    alreadydead2 = true; 
      killPlayer2();
    }
   
   //muestra la posicion es x e y
   console.log("player position " + player.body.position);
   console.log("");
   console.log("EQUIS DE: "+ player.body.position.x);
   console.log("IGRIEGA: " + player.body.position.y);
   console.log("");
   console.log("a ver yesimready que haces: " + yesimready);
   
 //Aqui es donde subimos la info del jugador local y recuperamos la del jugador online para actualizarla
    var data = {
    	
        	"type" :  "UPDATE",
        	"subtype" : "UPDATE_STATE",
        	"ID": ownid,
        	"posX" : player.body.position.x,
        	"posY" : player.body.position.y,
        	"pos2X" : player2.position.X,
        	"pos2Y" : player2.position.Y,
        	"dead" : muerto,
        	"winner" : ganado,
        	"Kart" : charSelect,
        	"angulo" : player.angle,
        	"Animation" : animstate,
        	"Animation2" : animstate2,
        	"ready" : yesimready,
        	"ready2" : yes2isready,
        	"timer"  : timer
        	
        }
    
    ws.send(JSON.stringify(data));
    
    
    
  },
 

}
