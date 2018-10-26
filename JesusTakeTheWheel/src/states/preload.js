JesusTakeTheWheel.preloadState = function (game) {

}

JesusTakeTheWheel.preloadState.prototype = {

    preload: function () {

        var prueba = 2;
        var text = "loading" + prueba;
        var style = {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(game.world.centerX - 300, 0, text, style);

       
        game.load.spritesheet('arrowsprite','../assets/images/testarrow.png',20,20);
        game.load.spritesheet('tilesetextract','../assets/images/firstprops.png',20,20);
        game.load.image('menubackgroundsprite','../assets/images/menugb.png');
        game.load.image('playbuttonsprite','../assets/images/play.png');
        game.load.image('endbuttonsprite','../assets/images/FIN.png');
        game.load.tilemap('mapatest','../assets/images/test3.csv');
        game.load.image('tiletest','../assets/images/firstprops.png');
        game.load.tilemap('obstaculos','../assets/images/obstaculos.csv');
        game.load.image('flecha','../assets/images/flecha.png');

        
    },

    create: function () {
       
        
     
    },

    update: function () {
        game.state.start('menuState')
    }
}
