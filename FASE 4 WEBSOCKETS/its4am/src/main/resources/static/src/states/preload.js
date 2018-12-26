Jesus.preloadState = function(game) {

}

Jesus.preloadState.prototype = {

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
       game.load.image('A','../assets/images/menutry.jpg');
       game.load.spritesheet('caidita','../assets/images/caidita.png',45,45);
       game.load.spritesheet('caidita2','../assets/images/caidita.png',45,45);
       game.load.tilemap('mapameta','assets/Pista 1/Mapa1_meta.csv');
       game.load.spritesheet('metita','../assets/images/metita.png',45,45);
       game.load.spritesheet('racersprite','../assets/images/corredores.png',60,60);

       game.load.image('gameover','../assets/images/gameover.png');
       game.load.tilemap('mapatest','../assets/Pista 1/Mapa1_road.csv');
       game.load.tilemap('mapabombas','../assets/Pista 1/Mapa1_sustitucion.csv');
       game.load.tilemap('cliffs','../assets/Pista 1/Mapa1_cliffs.csv');
       game.load.tilemap('caidas','../assets/Pista 1/Mapa1_caida.csv');
       game.load.spritesheet('vallaRecta','../assets/images/valla1.png',45,45);
       game.load.spritesheet('vallaDerecha','../assets/images/vallaDerecha.png',45,45);
       game.load.spritesheet('vallaIzquierda','../assets/images/vallaIzquierda.png',45,45);
       game.load.spritesheet('corazonSprite','../assets/images/corazonSprite.png',45,45);
       game.load.spritesheet('bombasprite','../assets/images/bombaSprite.png',45,45);
       game.load.image('youdead','../assets/images/youDead.png');
       game.load.image('youwin','../assets/images/youWin.png')
       game.load.image('replay','../assets/images/playagain.png');
       game.load.image('endback','../assets/images/backEndstate.png');
       game.load.image('the3','../assets/images/the3.png');
       game.load.image('the2','../assets/images/the2.png');
       game.load.image('the1','../assets/images/the1.png');
       game.load.image('thego','../assets/images/thego.png');
       game.load.image('press1Start','../assets/images/1Start.png');
     
       game.load.spritesheet('aceite','../assets/images/aceite.png',45,45);
       game.load.image('tiletest','../assets/images/TilesetDefinitivo.png');
       //game.load.image('tileaux','../assets/images/tilesAuxiliares.png');
       game.load.spritesheet('opcionespersonaje','../assets/images/opcionespersonaje2.png',200,100);
       game.load.spritesheet('opcionespista','../assets/images/opcionespista.png',200,45);
       game.load.image('flecha','../assets/images/flecha.png');


       game.load.spritesheet('helind','../assets/images/helind.png',50,50);
       game.load.image('dosPuntos','../assets/images/dosPuntos.png');
       game.load.image('interfazPersonaje','../assets/images/interfazpersonajes.png');
       game.load.image('interfazPista','../assets/images/interfazPista.png');

       game.load.spritesheet('numeros','../assets/images/numeros.png');
       game.load.image('pista','../assets/images/pista.png');
       game.load.image('tronco','../assets/images/tronco.png');
       game.load.image('play3','../assets/images/play3.png');
       game.load.image('next','../assets/images/next.png');
       game.load.image('play2','../assets/images/play2.png');

      game.load.spritesheet('velind','../assets/images/velind.png',45,45);
      game.load.spritesheet('numeros','../assets/images/numeros.png',50,50); 
      
      game.load.tilemap('mapatest2','../assets/Pista 2/Mapa2_road.csv');
      game.load.tilemap('mapabombas2','../assets/Pista 2/Mapa2_sustitucion.csv');
      game.load.tilemap('cliffs2','../assets/Pista 2/Mapa2_cliffs.csv');
      game.load.tilemap('caidas2','../assets/Pista 2/Mapa2_caida.csv');
      game.load.tilemap('mapameta2','../assets/Pista 2/Mapa2_meta.csv');
      game.load.image('buscandojugadores','../assets/images/buscandojugadores.png');

      
      
      game.load.tilemap('mapatest3','../assets/Pista 3/Mapa3_road.csv');
      game.load.tilemap('mapabombas3','../assets/Pista 3/Mapa3_sustitucion.csv');
      game.load.tilemap('cliffs3','../assets/Pista 3/Mapa3_cliffs.csv');
      game.load.tilemap('caidas3','../assets/Pista 3/Mapa3_caida.csv');
      game.load.tilemap('mapameta3','../assets/Pista 3/Mapa3_meta.csv');
    },

    create: function() {

    },

    update: function(){
game.state.start('menuState');
    }
}