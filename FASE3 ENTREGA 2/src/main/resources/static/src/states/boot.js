var Jesus = {};

Jesus.bootState = function(game) {};

Jesus.bootState.prototype = {
  preload: function() {},

  create: function() {},

  update: function() {
    game.state.start("preloadState");
  }
};
