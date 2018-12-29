
game = new Phaser.Game(1000, 800, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', Jesus.bootState)
game.state.add('preloadState', Jesus.preloadState)
game.state.add('fullServerState', Jesus.fullServerState)
game.state.add('menuState', Jesus.menuState)
game.state.add('charselState', Jesus.charselState)
game.state.add('matchmakingState', Jesus.matchmakingState)
game.state.add('staselState', Jesus.staselState)
game.state.add('levelState', Jesus.levelState)
game.state.add('endingState', Jesus.endingState)


game.state.start('bootState')
