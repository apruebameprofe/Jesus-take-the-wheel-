JesusTakeTheWheel.levelState = function(game) {

}

//Variables globales


var group; //Colisión de grupo para los objetos en movimiento del nivel , aun sin implementar
var cursors;//Variable para los cursores de cntrol
var map;//Variable para el mapa de colisiones
var layer;//Variable para la capa del mapa de colisiones (el implementado arriba)
var player;
var firstangle;

//Array de la gravedad según la pendiente 
var gravity = [
[0,400],//recto
[(400/9.68),(400/1.51)], //angulo 
[0,400],//recto
[-(400/4.12),(400/8.85)],//angulo 
[0,400],
[(400/2.98),(400/9.33)],//angulo
[0,400],
[(400/7.30),(400/6.53)],
[0,0]
];

//Temporal , sprite según la pendiente probablemente rote segun la velocidad en x y en y 
var sprites = [2,0,1,0,2,0];

//Variables punteros para los arrays de sprites y de gravedad
var pos = 0;
var spr = 0;
//No creo que use esto , variable para la velocidad en x actual 
var xact;

//Velocidad punta ( o maxima , porque en fin la vida)  y velocidad minima para que el drag no me frene del todo 
var velpunta = 900;
var velmin = 400;
var maxangleright = -25;
var maxangleleft = 25;

//Checks para los cambios de gravedad y de sprite (de momento) porque que puede salir mal si te saltas un check?
var check0 = false;
var check1 = false;
var check2 = false;
var check3 = false;
var check4 = false;
var check5 = false;
var check6 = false;
var check7 = false;

var wallHits = 0 ;

var daño = 0 ; 
var porcentajedaño = 25;
var recorrido;

var timer; 
var prevHits; 

var next = false;




//Los controles que me han costado la vida 
  function movePlayerDown(){
    
    //Curvas
    if (cursors.up.isDown && cursors.right.isDown){
        player.body.position.x +=5;
        player.body.position.y -= 1.5;

        if(player.angle > firstangle){
            player.angle = firstangle;
        }
        if(player.angle > maxangleright){
        player.angle -=1
        }
    }

    if (cursors.up.isDown && cursors.left.isDown){
        player.body.position.x -=5;
        player.body.position.y -= 1.5;
        
        if(player.angle < firstangle){
            player.angle = firstangle;
        }

        if(player.angle < maxangleleft){
            player.angle +=1;
            }
    }
    //Recto
    if (cursors.up.isDown){
        player.body.position.y -= 7;
    }

    if (cursors.left.isDown)
    {
        player.body.position.x -=5;

        if(player.angle < firstangle){
            player.angle = firstangle;
        }

        if(player.angle < maxangleleft){
            player.angle +=1;
            }
    }
    if (cursors.right.isDown)
    {
        player.body.position.x +=5;

        if(player.angle > firstangle){
            player.angle = firstangle;
        }
        if(player.angle > maxangleright){
        player.angle -=1
        }
    } 
    if(cursors.down.isDown)
    {
      player.body.velocity.y += 300;
    }

  
  }


function render() {
    game.debug.cameraInfo(game.camera, 0, 0);
}

//Inicia la gravedad y pone bounds al mundo , por que esta esto aqui ? no fucking clue , añado lo del mapa porque en fin
function initPhysics () {
    //Gravedad
    var subgravity = gravity[pos];
    game.physics.arcade.gravity.y = subgravity[1];
    game.physics.arcade.gravity.x = subgravity[0];
    pos++;

    //Bounds
    game.world.setBounds(0, 0, 10000, 10000);

    //Mapa de colisiones
    map = game.add.tilemap('mapatest',20,20);
    map.addTilesetImage('tiletest');
    layer = map.createLayer(0);
    map.setCollisionBetween(3,3);



}

//Crea los controles
function initInput(){
    cursors = game.input.keyboard.createCursorKeys();
}

//Inicia toodo lo que tenga que ver con el jugador 
function initPlayer(){
    player = game.add.sprite(600, 20, 'arrowsprite',0);
    spr++;
    player.anchor.set(0.5);
    game.physics.arcade.enable(player);
    player.body.allowRotation = false;
    player.body.bounce.set(0.0001);
    player.body.tilePadding.set(32);
    player.body.drag = (25);
    player.body.allowRotation = true; 
    firstangle = player.body.angle;
    
   
}

//Actualizacion de hacia donde va la gravedad 
function updateGravity(){
    var subgravity = gravity[pos];
    game.physics.arcade.gravity.y = subgravity[1];
    game.physics.arcade.gravity.x = subgravity[0];
    pos++;
}


function isOver(){

    game.state.start('endingState');
}

//Checkeamos en que altura va el coche 
function checkY(y){
 if (y >= 500 && check0 == false){
    updateGravity();
    
    check0 = true;
}
if (y >= 880 && check1 == false){
    updateGravity();
    
    check1 = true;
}
if (y>= 1160 && check2 == false){
    updateGravity();
    
    check2 = true;
}
if (y>= 1800 && check3 == false){
    updateGravity();
    
    check3 = true;
}
if (y>= 1980 && check4 == false){
    updateGravity();
    
    check4 = true;
}
if(y>= 2540 && check5 == false){
    
    updateGravity();
    check5 = true;
}
if(y>= 4520 && check6 == false){
    updateGravity();
    check6 = true;
}
if(y>= 4860 && check7 == false){
    player.body.mass = 0;
    timer = this.game.time.totalElapsedSeconds();
    setTimeout( isOver(), 150000);
    check7 = true;
}


}

function checkVel(){
    if(player.body.velocity.y >= velpunta){
        player.body.velocity.y = (Math.min(velpunta, player.body.velocity.y));
        }

        if(player.body.velocity.y <= velmin){
            player.body.velocity.y = velmin;
            }
}

function hitWall(){
    

    if( player.body.velocity.y == velpunta && !next){
    
        wallHits++;
        next = true;
    }
    
}

function checkColision(){
    
    if(!(game.physics.arcade.collide(player,layer,this.hitWall,null,this))){
        next = false;
    }
    else{
        game.physics.arcade.collide(player,layer,this.hitWall,null,this);
    }

    
    
}


function checkDaño(){
if (wallHits ==4){
    isOver();
}
}

function checkHits(){
    if (prevHits !== wallHits){
        daño+= porcentajedaño;
    }
}


JesusTakeTheWheel.levelState.prototype = {

  

    preload: function() {
        
    },

    create: function() {  

        initPhysics();
        initInput();
        initPlayer();
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
      
    },

    update: function() { 
        
       
        
        movePlayerDown();
        checkVel();
        checkY(player.position.y);
        checkColision();
        checkDaño();
        checkHits();

    
        
    },
};

    

    

