var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', JesusTakeTheWheel.bootState)
game.state.add('preloadState', JesusTakeTheWheel.preloadState)
game.state.add('menuState', JesusTakeTheWheel.menuState)
game.state.add('levelState', JesusTakeTheWheel.levelState)
game.state.add('endingState', JesusTakeTheWheel.endingState)
  
game.state.start('bootState')
