var opps = [{name: "Obi-Wan Kenobi", hp: "120", role: "", baseAttack: 3 , image: "assets/images/obiwankenobi.jpg"},
            {name: "Luke Skywalker", hp: "100", role: "", baseAttack: 4 , image: "assets/images/lukeskywalker.jpg"},
            {name: "Darth Sidious", hp: "150", role: "", baseAttack: 6 , image: "assets/images/darth.jpg"},
            {name: "Darth Maul", hp: "180", role: "", baseAttack: 5 , image: "assets/images/maul.jpg"}];

var hp;
var opponent;
var oppHP;

var player;


$(document).ready(function() {

    mkDivs();
    chooseChar();


});

function mkDivs() {
    $(".characters").append("<h3>Choose a character to play as!</h3>")

    for(var i = 0; i < opps.length; i++) {
        // Add all character to select from
        var chars = $("<div>");

        makeDiv(chars, opps[i],"availableChars");

        $(".characters").append(chars);
    }

}

function chooseChar(){
    $(".availableChars").on("click", function () {
        
        $(this).attr("data-role", "player");
              
        $(".characters").empty();

        var yourChar = $("<div>");
        
        $(".available").append("<h3>Choose an Opponent.</h3>");
        for(var i = 0; i < opps.length; i++) {
           
            var chars = $("<div>");

            if(opps[i].name !== $(this).attr("data-name")) {
                // Show opponents
                makeDiv(chars, opps[i], "opponents");
        
                $(".available").append(chars);
           }
  
           // else
           if(opps[i].name === $(this).attr("data-name")) {
                player = opps[i];
                var initCharAttack = player.baseAttack; 
                // Show your character
                $(".yourChar").append("<h3>Your Character</h3>");
                makeDiv(yourChar, player, "availableChars");

                $(".yourChar").append(yourChar);
            }
        }
        var opp = $("<div>");
        // to make divs
        chooseOpponent(opp);
        attack(opp, yourChar, player, initCharAttack);

    });
}

function chooseOpponent(opp) {

    $(".opponents").on("click", function() {
        console.log($(this).attr("data-name"));

        $(".available").empty();
        $(".available").append("<h3>Ememies Available to Attack</h3>");

        for(var i = 0; i < opps.length; i++) {

            var waiting = $("<div>");

            console.log(opps[i].name + " : " + $(this).attr("data-name"));

            if(opps[i].name === $(this).attr("data-name")) {
                
                opponent = "";
                opponent = opps[i];
                // Show opponent

                if(opps[i].hp > 0) {
                    opp.empty();
                    // $(".defender").empty();
                    console.log("hi"  + opps[i].hp);

                    makeDiv(opp, opps[i], "opponent");
                }
                
                $(".defender").append("<h3>Defender</h3>");
                $(".defender").append(opp);
            }

            else if(opps[i] !== player && opps[i].hp > 0){

                makeDiv(waiting, opps[i], "opponents");
                // Show rest
                $(".available").append(waiting);

            }
        }


    });
}

function attack(opp, yourChar, player, initCharAttack) {
    
    $(".attack").on("click", function() {
        console.log("atack");

        
        if(player.hp > 0 && opponent.hp > 0) {

            opp.empty();
            opponent.hp -= player.baseAttack;
            player.baseAttack += initCharAttack;
            makeDiv(opp, opponent, "opponent");
            $(".defender").append(opp);

            yourChar.empty();
            player.hp -= opponent.baseAttack;
            makeDiv(yourChar, player, "availableChars");
            $(".yourChar").append(yourChar);

            if(player.hp <= 0) {
                alert("GAME OVER");
            }
            else if (opponent.hp <= 0){
                // Choose another opponent
                $(".defender").empty();
    
                chooseOpponent(opp);
                attack(opp, yourChar, player, initCharAttack);

            }
        }
        
     });
}

function makeDiv(div, characterf, setClass) {
    console.log("mkdiv" + characterf.name);

    div.append($("<p>").text(characterf.name))
        .prepend($('<img>',{id:'theImg',src:characterf.image}))
        .append($("<p>").text(characterf.hp))
        .addClass(setClass)
        .attr("data-name", characterf.name)
        .attr("data-hp", characterf.hp)
        .attr("data-role", characterf.role)
        .css("float", "left");
}