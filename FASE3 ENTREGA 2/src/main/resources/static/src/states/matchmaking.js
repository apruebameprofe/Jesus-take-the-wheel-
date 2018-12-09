Jesus.matchmakingState = function(game) {};

var cont = 0;

Jesus.matchmakingState.prototype = {
  init: function() {
    this.getNumPlayers(function(numPlayers) {
      if (numPlayers.length == 2) {
        console.log("==========================================================");
        console.log("= El servidor está lleno. Vuelve a intentarlo más tarde. =");
        console.log("==========================================================");
        var fondo = game.add.sprite(
  		      game.world.centerX+100,
  		      game.world.centerY+100,
  		      "serverlleno"
  		    );
  		    fondo.anchor.setTo(0.5);
        game.state.start("menuState");
      } else {
        $.ajax({
          method: "POST",
          url: "/game",
          processData: false,
          headers: {
            "Content-Type": "application/json"
          }
        }).done(function(data) {
          console.log("Player created: " + JSON.stringify(data));
          game.player1 = data;
          cont = 1;
        });
      }
    });
  },

  preload: function() {},

  create: function() {
   
	  var fondo = game.add.sprite(
		      game.world.centerX+100,
		      game.world.centerY+100,
		      "comprobandoserver"
		    );
		    fondo.anchor.setTo(0.5);

  },

  update: function() {
      if (cont == 1) {
        console.log("[DEBUG] El valor de CONT es: " + cont);
        game.state.start("charselState");
      }
  },

  getNumPlayers: function(callback) {
    $.ajax({
      url: "/game"
    }).done(function(data) {
      callback(data);
    });
  },

  newRacer: function() {
    $.ajax({
      method: "POST",
      url: "/game",
      processData: false,
      headers: {
        "Content-Type": "application/json"
      }
    }).done(function(data) {
      console.log("Player created: " + JSON.stringify(data));
      game.player1 = data;
      console.log("Hola soy player  " + game.player1.id);
      cont = 1;
    });
  }
};
