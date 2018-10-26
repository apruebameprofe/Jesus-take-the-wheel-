JesusTakeTheWheel.menuState = function(game) {

}
var clicked = false;
function listener (){
 clicked = true;
    
}
JesusTakeTheWheel.menuState.prototype = {

    preload: function() {
       
    },

    create: function() {
        game.background = game.add.sprite(game.world.X,game.world.Y,'menubackgroundsprite');
        var playbutton = game.add.sprite( game.world.centerX , game.world.centerY, 'playbuttonsprite');
        playbutton.anchor.setTo(0.5);
        playbutton.anchor.setTo(0.5);
        
        playbutton.inputEnabled = true;
        playbutton.events.onInputDown.add(listener, this);

    },

    update: function() {
    if(clicked){
    game.state.start('levelState');
    }
    }

}

