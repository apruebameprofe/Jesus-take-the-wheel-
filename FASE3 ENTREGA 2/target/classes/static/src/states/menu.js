Jesus.menuState = function(game) {};
var clicked = false;
function listener() {
  console.log("click!");
  clicked = true;
}

Jesus.menuState.prototype = {
  //borra el jugador al llegar al menu , util cuando recargamos el juego
  init: function() {
	  
	
    if (game.player1 != null) {
      $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/game/" + game.player1.id,
        processData: false,
        headers: {
          "Content-Type": "application/json"
        }
      }).done(function(data) {
        console.log("Player removed: " + JSON.stringify(data));
      });
    }
  },
  preload: function() {},

  create: function() {

    //Pone los bounds , el fondo y el boton de play asociado a un listener
    game.world.setBounds(0, 0, 800, 600);
    var menubackground = game.add.sprite(game.world.X, game.world.Y, "A");
    var playbutton = game.add.sprite(
      game.world.centerX + 100,
      game.world.centerY + 100,
      "play2"
    );

    playbutton.anchor.setTo(0.5);

    playbutton.inputEnabled = true;
    playbutton.events.onInputDown.add(listener, this);
  },

  update: function() {
    if (clicked) {
      clicked = false;

      game.state.start("matchmakingState");
    }
  }
  
  
};
