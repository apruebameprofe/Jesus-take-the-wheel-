JesusTakeTheWheel.preloadState = function(game) {

}

JesusTakeTheWheel.preloadState.prototype = {

    preload: function() {
        console.log("Estoy en preload");
        //////////////////////////
        var text = "loading" ;
        var style = {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(game.world.centerX - 350, 0, text, style);
        /////////////////////////
        game.load.spritesheet('racersprite','../assets/images/corredores.png',60,60);
        game.load.spritesheet('bombasprite','../assets/images/bombaSprite.png',45,45);
        game.load.spritesheet('corazonSprite','../assets/images/corazonSprite.png',45,45);
        game.load.spritesheet('caidita','../assets/images/caidita.png',45,45);
        game.load.spritesheet('caidita2','../assets/images/caidita.png',45,45);
        game.load.tilemap('mapameta','assets/Pista 1/Mapa1_meta.csv');
        game.load.spritesheet('metita','../assets/images/metita.png',45,45);
        game.load.image('menubg','../assets/images/menubg.jpg');
        game.load.image('gameover','../assets/images/gameover.png');
        game.load.image('playbuttonsprite','../assets/images/play.png');
        game.load.tilemap('mapatest','../assets/Pista 1/Mapa1_road.csv');
        game.load.tilemap('mapatest2','../assets/Pista 2/Mapa2_road.csv');
        game.load.tilemap('mapatest3','../assets/Pista 2/Mapa2_road.csv');
        game.load.tilemap('mapabombas','../assets/Pista 1/Mapa1_sustitucion.csv');
        game.load.tilemap('cliffs','../assets/Pista 1/Mapa1_cliffs.csv');
        game.load.tilemap('caidas','../assets/Pista 1/Mapa1_caida.csv');
        game.load.spritesheet('vallaRecta','../assets/images/valla1.png',45,45);
        game.load.spritesheet('vallaDerecha','../assets/images/vallaDerecha.png',45,45);
        game.load.spritesheet('vallaIzquierda','../assets/images/vallaIzquierda.png',45,45);
        game.load.spritesheet('aceite','../assets/images/aceite.png',45,45);
        game.load.image('tiletest','../assets/images/TilesetDefinitivo.png');
        game.load.image('tileaux','../assets/images/tilesAuxiliares.png');
        game.load.image('startbuttonsprite','../assets/images/start.png');
        game.load.image('flecha','../assets/images/flecha.png');
        game.load.spritesheet('opcionespersonaje','../assets/images/opcionespersonaje2.png',400,300);
        game.load.spritesheet('opcionespista','../assets/images/opcionespista.png',200,45);


        game.load.spritesheet('helind','../assets/images/helind.png',50,50);
        game.load.image('dosPuntos','../assets/images/dosPuntos.png');
        game.load.image('dragon','../assets/images/dragon.png');
        game.load.image('eggg','../assets/images/eggg.png');
        game.load.image('interfazPersonaje','../assets/images/interfazPersonaje.png');
        game.load.image('interfazPista','../assets/images/interfazPista.png');
        game.load.image('jesusTakeTheWheel','../assets/images/jesusTakeTheWheel.png');
        game.load.spritesheet('numeros','../assets/images/numeros.png');
        game.load.image('pista','../assets/images/pista.png');
        game.load.image('tronco','../assets/images/tronco.png');
        game.load.image('play3','../assets/images/play3.png');
        game.load.image('next','../assets/images/next.png');

       game.load.spritesheet('velind','../assets/images/velind.png',45,45);
       game.load.spritesheet('numeros','../assets/images/numeros.png',50,50); 

    },

    create: function() {

    },

    update: function() {
game.state.start('menuState');
    }
}