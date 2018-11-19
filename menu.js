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
        game.world.setBounds(0,0,800,600); 
        var menubackground = game.add.sprite(game.world.X,game.world.Y,'menubg');
        var playbutton = game.add.sprite( game.world.centerX+100 , game.world.centerY+100, 'play3');
        playbutton.anchor.setTo(0.5);
        
        
        playbutton.inputEnabled = true;
        playbutton.events.onInputDown.add(listener, this);

    },

    update: function() {
    if(clicked){
        
        clicked = false; 
        
    game.state.start('charselState');
    }
    }

}
