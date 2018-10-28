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
        var t = game.add.text(game.world.centerX - 350, 0, text, style);

       
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
        game.load.image('startbuttonsprite','../assets/images/start.png');
        game.load.image('flecha','../assets/images/flecha.png');
        game.load.spritesheet('opcionespersonaje','../assets/images/opcionespersonaje.png',200,100);
        game.load.spritesheet('opcionespista','../assets/images/opcionespista.png',200,100);

        game.load.tilemap('mapatest1','../assets/Pista 2/Mapa2._Bumper.csv');
        game.load.tilemap('mapabombas1','../assets/Pista 2/Mapa2._Bombas.csv');

        game.load.tilemap('mapatest2','../assets/Pista3/Mapa3._bumper.csv');
        game.load.tilemap('mapabombas2','../assets/Pista3/Mapa3._bombas.csv');
        
       
       

        
    },

    create: function () {
       
        
     
    },

    update: function () {
        game.state.start('menuState')
    }
}
