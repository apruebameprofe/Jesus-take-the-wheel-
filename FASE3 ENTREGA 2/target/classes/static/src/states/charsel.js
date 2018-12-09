Jesus.charselState = function(game) {};

//Este es el state mas complejo despues de level , aqui se selecciona el personaje tanto gráficamente como en stats

var hitsAvailable;
var speedAvailable;
var perSelect = 1;
var numOpciones = 3;
var clicked3 = false;
var opcionesp;
//IDS del spritesheet de los personajes
var selArray = [
  [],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
];
//IDS del spritesheet de los corazones
var helArray = [[], [0, 0, 1, 1], [0, 1, 1, 1], [0, 0, 0, 1]];
var velArray = [[], [0, 0, 1, 1], [0, 0, 0, 1], [0, 1, 1, 1]];
//Para poner el personaje que aparece en pantalla y las salud y velocidad

var currentChar;
var vel1;
var vel2;
var vel3;
var vel4;

var hel1;
var hel2;
var hel3;
var hel4;
function initPutStats() {
  //Iniciamos los sprites de salud y velocidad
  var subHel = helArray[perSelect];
  var subVel = velArray[perSelect];

  vel1 = game.add.sprite(
    game.world.centerX - 90,
    game.world.centerY + 100,
    "helind",
    subHel[0]
  );
  vel2 = game.add.sprite(
    game.world.centerX - 45,
    game.world.centerY + 100,
    "helind",
    subHel[1]
  );
  vel3 = game.add.sprite(
    game.world.centerX,
    game.world.centerY + 100,
    "helind",
    subHel[2]
  );
  vel4 = game.add.sprite(
    game.world.centerX + 45,
    game.world.centerY + 100,
    "helind",
    subHel[3]
  );

  hel1 = game.add.sprite(
    game.world.centerX - 90,
    game.world.centerY + 150,
    "velind",
    subVel[0]
  );
  hel2 = game.add.sprite(
    game.world.centerX - 45,
    game.world.centerY + 150,
    "velind",
    subVel[1]
  );
  hel3 = game.add.sprite(
    game.world.centerX,
    game.world.centerY + 150,
    "velind",
    subVel[2]
  );
  hel4 = game.add.sprite(
    game.world.centerX + 45,
    game.world.centerY + 150,
    "velind",
    subVel[3]
  );
}
function putStats() {
  //Actualizamos la salud y la velocidad segun perselect  , eliminando antes los sprites que ya estaban
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

  vel1 = game.add.sprite(
    game.world.centerX - 90,
    game.world.centerY + 100,
    "helind",
    subHel[0]
  );
  vel2 = game.add.sprite(
    game.world.centerX - 45,
    game.world.centerY + 100,
    "helind",
    subHel[1]
  );
  vel3 = game.add.sprite(
    game.world.centerX,
    game.world.centerY + 100,
    "helind",
    subHel[2]
  );
  vel4 = game.add.sprite(
    game.world.centerX + 45,
    game.world.centerY + 100,
    "helind",
    subHel[3]
  );

  hel1 = game.add.sprite(
    game.world.centerX - 90,
    game.world.centerY + 150,
    "velind",
    subVel[0]
  );
  hel2 = game.add.sprite(
    game.world.centerX - 45,
    game.world.centerY + 150,
    "velind",
    subVel[1]
  );
  hel3 = game.add.sprite(
    game.world.centerX,
    game.world.centerY + 150,
    "velind",
    subVel[2]
  );
  hel4 = game.add.sprite(
    game.world.centerX + 45,
    game.world.centerY + 150,
    "velind",
    subVel[3]
  );
}

function putSprite() {
  //Funcion que actualiza el sprite del personaje segun el que se ha seleccionado , matando al de antes
  currentChar.kill();
  var subsel = selArray[perSelect];
  currentChar = game.add.sprite(
    game.world.centerX,
    game.world.centerY + 50,
    "racersprite",
    subsel[0]
  ); //Le da un sprite en la posición 600,20 , con el tile 0 del tileset arrowsprite
  currentChar.anchor.set(0.5); //Pone el punto de referencia del sprite en el centro
  currentChar.animations.add("recto", [subsel[0], subsel[1]], 10, true);
  currentChar.animations.play("recto");
}
function setStats() {
  //Funcion que actualiza los stats en cada update
  if (perSelect == 1) {
    hitsAvailable = 4;
    speedAvailable = 900;
  }
  if (perSelect == 2) {
    hitsAvailable = 2;
    speedAvailable = 1100;
  }
  if (perSelect == 3) {
    hitsAvailable = 6;
    speedAvailable = 800;
  }
}
function checkAnim() {
  //Funcion que cambia el texto que muestra el nombre del personaje
  if (perSelect == 1) {
    opcionesp.animations.play("opcion1");
  }
  if (perSelect == 2) {
    opcionesp.animations.play("opcion2");
  }
  if (perSelect == 3) {
    opcionesp.animations.play("opcion3");
  }
}
function checkSelect() {
  //Funcion que se asegura de que no selecciones un numero mayor que el numero de personajes disponibles
  if (perSelect > 3) {
    perSelect = 3;
  }
  if (perSelect < 1) {
    perSelect = 1;
  }
}
function listenDerecha() {
  //Funcion del boton de flechita derecha

  perSelect++;
  checkSelect();
  putSprite();
}
function listenIzquierda() {
  //Lo mismo pero con la izquierda

  perSelect--;
  checkSelect();
  putSprite();
}
function listener3() {
  //Funcion que escucha al boton de play
  clicked3 = true;
}

Jesus.charselState.prototype = {
  init: function() {
    console.log("Estoy en personajeState");
  },

  preload: function() {},

  create: function() {
    game.world.setBounds(0, 0, 1000, 800);
    var fondo = game.add.image(
      game.world.centerX,
      game.world.centerY,
      "interfazPersonaje"
    );
    fondo.anchor.setTo(0.5);
    //Añadimos el sprite del texto
    opcionesp = game.add.sprite(
      game.world.centerX,
      game.world.centerY - 80,
      "opcionespersonaje",
      0
    );
    //Ponemos los stats del primer personaje
    initPutStats();
    //Damos las animaciones al texto
    opcionesp.anchor.setTo(0.5);
    opcionesp.animations.add("opcion1", [0, 0], 10, true);
    opcionesp.animations.add("opcion2", [1, 1], 10, true);
    opcionesp.animations.add("opcion3", [2, 2], 10, true);
    //Creamos el sprite del primer coche que se ve
    var subsel = selArray[perSelect];
    currentChar = game.add.sprite(
      game.world.centerX,
      game.world.centerY + 50,
      "racersprite",
      subsel[0]
    ); //Le da un sprite en la posición 600,20 , con el tile 0 del tileset arrowsprite
    currentChar.anchor.set(0.5); //Pone el punto de referencia del sprite en el centro
    currentChar.animations.add("recto", [subsel[0], subsel[1]], 10, true);
    currentChar.animations.play("recto");

    //Ponemos las flechas
    var derecha = game.add.sprite(
      game.world.centerX + 300,
      game.world.centerY - 80,
      "flecha"
    );
    derecha.anchor.setTo(0.5);
    derecha.anchor.setTo(0.5);

    derecha.inputEnabled = true;
    derecha.events.onInputDown.add(listenDerecha, this);
    var izquierda = game.add.sprite(
      game.world.centerX - 300,
      game.world.centerY - 80,
      "flecha"
    );
    izquierda.anchor.setTo(0.5);
    izquierda.anchor.setTo(0.5);
    izquierda.scale.x *= -1;
    izquierda.inputEnabled = true;
    izquierda.events.onInputDown.add(listenIzquierda, this);

    //Ponemos el boton de inicio

    var startbutton = game.add.sprite(
      game.world.centerX,
      game.world.centerY + 250,
      "next"
    );
    startbutton.anchor.setTo(0.5);
    startbutton.anchor.setTo(0.5);

    startbutton.inputEnabled = true;
    startbutton.events.onInputDown.add(listener3, this);

    //Creamos un jugador nuevo
    //this.newRacer();
    //kartID = this.newKart();
  },

  update: function() {
    setStats();
    checkAnim();
    putStats();

    if (clicked3 == true) {
      //Si se pulsa el boton se pasa al estado de matchmaking
      clicked3 = false;

      var text = "loading";
      var style = {
        font: "65px Arial",
        fill: "#ff0044",
        align: "center"
      };

      var t = game.add.text(game.world.centerX - 350, 0, text, style);

      game.player1.kart = perSelect;
      console.log('[PLAYER SELECT] Has seleccionado el personaje: ' + perSelect)
      this.playerReady()
    }
  },

  playerReady: function() {
    $.ajax({
      method: "POST",
      url: "/game/ready",
      data: JSON.stringify(game.player1),
      processData: false,
      headers: {
        "Content-Type": "application/json"
      }
    }).done(function(data) {
      console.log("[DEBUG] Player " + JSON.stringify(data) + " ready!");
      game.player1 = data;
      game.state.start("matchmaking2State");
    });
  }
};
