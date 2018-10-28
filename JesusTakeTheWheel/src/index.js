var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', JesusTakeTheWheel.bootState)
game.state.add('preloadState', JesusTakeTheWheel.preloadState)
game.state.add('menuState', JesusTakeTheWheel.menuState)
game.state.add('selectState',JesusTakeTheWheel.selectState)
game.state.add('screenState',JesusTakeTheWheel.selectState)
game.state.add('levelState', JesusTakeTheWheel.levelState)
game.state.add('level1State', JesusTakeTheWheel.levelState)
game.state.add('level2State', JesusTakeTheWheel.levelState)
game.state.add('level3State', JesusTakeTheWheel.levelState)
game.state.add('resultsState',JesusTakeTheWheel.resultsState)
game.state.add('endingState', JesusTakeTheWheel.endingState)
  
game.state.start('bootState')
