JesusTakeTheWheel.preloadState = function (game) {

}

JesusTakeTheWheel.preloadState.prototype = {

    preload: function () {

        
        var text = "loading" ;
        var style = {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(game.world.centerX - 300, 0, text, style);

       
        game.load.spritesheet('racersprite','../assets/images/Racer.png',40,40);
        game.load.spritesheet('bombasprite','../assets/images/bombaSprite.png',20,20);
        game.load.spritesheet('vallaMitadSprite','../assets/images/vallaMitadSprite.png',20,20);
        game.load.spritesheet('vallaDerechaSprite','../assets/images/vallaDerechaSprite.png',20,20);
        game.load.spritesheet('vallaIzquierdaSprite','../assets/images/vallaIzquierdaSprite.png',20,20);
        game.load.spritesheet('corazonSprite','../assets/images/corazonSprite.png',20,20);
        game.load.spritesheet('aceleradorSprite','../assets/images/aceleradorSprite.png',20,20);
        game.load.spritesheet('tilesetextract','../assets/images/firstprops.png',20,20);
        game.load.image('menubackgroundsprite','../assets/images/menugb.png');
        game.load.image('playbuttonsprite','../assets/images/play.png');
        game.load.image('backtomenubuttonsprite','../assets/images/backtomenu.png');
        game.load.tilemap('mapatest','../assets/Pista 1/Mapa1_Bumper.csv');
        game.load.tilemap('mapabombas','../assets/Pista 1/Mapa1_Bombas.csv');
        game.load.image('tiletest','../assets/images/firstprops.png');
        
       
       

        
    },

    create: function () {
       
        
     
    },

    update: function () {
        game.state.start('menuState')
    }
}
