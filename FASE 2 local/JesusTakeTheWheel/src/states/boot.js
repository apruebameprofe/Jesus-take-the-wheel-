var JesusTakeTheWheel = {}

JesusTakeTheWheel.bootState = function (game) {

}

JesusTakeTheWheel.bootState.prototype = {

    preload: function () {

    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
    },

    update: function () {
        game.state.start('preloadState')
    }
}
