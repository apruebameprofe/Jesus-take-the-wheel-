JesusTakeTheWheel.sreenState = function(game) {

}

var stageSelect= 1;
var stageOpciones = 3;
var text;
var clicked4 = false; 


function checkstageSelect(){
    if(stageSelect>3){
        stageSelect = 3;
    }
    if(stageSelect < 1 ){
        stageSelect = 1; 
    }
}

function listenstageDerecha(){
    
        stageSelect++;
        checkstageSelect();
    
}

function listenstageIzquierda(){
    
        stageSelect--;
        checkstageSelect();
    
}

function updatestageText() {


    text.setText("Opción " + stageSelect );

}

function listener4(){
    clicked4 = true; 
}

    
JesusTakeTheWheel.selectState.prototype = {

    init: function() {
        console.log("Estoy en selectState")
    },

    preload: function() {
        
    },

    create: function() {
        game.world.setBounds(0,0,800,600);
        var stagederecha = game.add.sprite( game.world.centerX+300 , game.world.centerY, 'flecha');
        stagederecha.anchor.setTo(0.5);
        stagederecha.anchor.setTo(0.5);
        
        
        stagederecha.inputEnabled = true;
        stagederecha.events.onInputDown.add(listenDerecha, this);

        var stageizquierda = game.add.sprite( game.world.centerX-300 , game.world.centerY , 'flecha');
        stageizquierda.anchor.setTo(0.5);
        stageizquierda.anchor.setTo(0.5);
        stageizquierda.scale.x *= -1;

        stageizquierda.inputEnabled = true;
        stageizquierda.events.onInputDown.add(listenstageIzquierda, this);

        
        text = game.add.text(game.world.centerX, game.world.centerY, "Opción " + stageSelect, {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        });
    
        text.anchor.setTo(0.5, 0.5);

        var startstagebutton = game.add.sprite( game.world.centerX , game.world.centerY+200, 'startbuttonsprite');
        startstagebutton.anchor.setTo(0.5);
        startstagebutton.anchor.setTo(0.5);
        
        startstagebutton.inputEnabled = true;
        startstagebutton.events.onInputDown.add(listener4, this);
    
        
  
    },

    update: function() {
        setStats();
        game.input.onDown.addOnce(updatestageText, this);
        console.log(stageSelect);
        

        if(clicked4){
            clicked4 = false;
            var text = "loading" ;
            var style = {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        };
        var t = game.add.text(game.world.centerX - 300, 0, text, style);
        if (stageSelect == 1){
            game.state.start('levelState');
        }
        }
      
    }
}
