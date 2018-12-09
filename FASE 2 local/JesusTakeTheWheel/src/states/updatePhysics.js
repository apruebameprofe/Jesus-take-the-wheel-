//Actualizacion de hacia donde va la gravedad 
function updatePhysics() {
    var subgravity = gravity[pos];
    game.physics.arcade.gravity.y = subgravity[1];
    game.physics.arcade.gravity.x = subgravity[0];
    pos++;
}