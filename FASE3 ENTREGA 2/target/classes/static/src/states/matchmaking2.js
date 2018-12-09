Jesus.matchmaking2State = function(game) {};

Jesus.matchmaking2State.prototype = {
  preload: function() {},

  create: function() {
	  var fondo = game.add.sprite(
		      game.world.centerX,
		      game.world.centerY,
		      "buscandojugadores"
		    );
		    fondo.anchor.setTo(0.5);

  },

  update: function() {
    this.gameReady()
  },

  gameReady: function() {
    $.ajax({
      method: "GET",
      url: "/game/ready/" + game.player1.id,
      processData: false,
      headers: {
        "Content-Type": "application/json"
      }
    }).done(function(data) {
      if (data != '') {
        game.player2 = data;
        console.log("[DEBUG] Game ready !!: " + data);
        console.log("[DEBUG] player 2  es !!: " + game.player2.id);
        desesperacion = game.player2.kart; 
        console.log("kart 2 es " + game.player2.kart ); 
        game.state.start("levelState");
      } else {
        console.log('[DEBUG] Faltan jugadores por estar listos')
      }
    });
  }
};
