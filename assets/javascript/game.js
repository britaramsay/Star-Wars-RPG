var opps = [{name: "Obi-Wan Kenobi", baseHP: 120, hp: 120, role: "", baseAttack: 8 , counterAttack: 10, image: "assets/images/obiwankenobi.jpg"},
            {name: "Luke Skywalker", baseHP: 100, hp: 100, role: "", baseAttack: 15 , counterAttack: 5, image: "assets/images/lukeskywalker.jpg"},
            {name: "Darth Sidious", baseHP: 160, hp: 150, role: "", baseAttack: 5 , counterAttack: 15, image: "assets/images/darth.jpg"},
            {name: "Darth Maul", baseHP: 180, hp: 180, role: "", baseAttack: 4 , counterAttack: 20, image: "assets/images/maul.jpg"}];

var hp;
var opponent;
var oppHP;
var oppsLeft;
var player;


$(document).ready(function() {
    newGame();
});

function newGame() {
    mkDivs();
    chooseChar();
}

function mkDivs() {
    $(".characters").append("<h3>Choose a character to play as.</h3>")

    for(var i = 0; i < opps.length; i++) {
        // Add all character to select from
        opps[i].hp = opps[i].baseHP;
        var chars = $("<div>");

        makeDiv(chars, opps[i],"availableChars");
        chars.append($("<p>").text("Attack: "+ opps[i].baseAttack));
        chars.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));

        $(".characters").append(chars);
    }

}

function chooseChar(){
    $(".availableChars").on("click", function () {
        
        $(this).attr("data-role", "player");
        
        $(".characters").empty();
        $(".yourChar").empty();
        var yourChar = $("<div>");
        
        $(".available").append("<h3>Choose an Opponent.</h3>");
        for(var i = 0; i < opps.length; i++) {
           
            var chars = $("<div>");

            if(opps[i].name !== $(this).attr("data-name")) {
                // Show opponents
                makeDiv(chars, opps[i], "opponents");
                chars.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));
                $(".available").append(chars);
           }
           // else
           if(opps[i].name === $(this).attr("data-name")) {
                player = opps[i];

                charAttack = player.baseAttack; 
                // Show your character
                $(".yourChar").append("<h3>Your Character</h3>");

                makeDiv(yourChar, player, "availableChars");
                yourChar.append($("<p>").text("Attack: "+ player.baseAttack));
                $(".yourChar").append(yourChar);
            }
        }
        var opp = $("<div>");
        // to make divs
        chooseOpponent(opp);
        attack(opp, yourChar, player, charAttack);
    });
}

function chooseOpponent(opp) {

    $(".opponents").on("click", function() {
        oppsLeft = false;

        $(".available").empty();

        for(var i = 0; i < opps.length; i++) {
            var waiting = $("<div>");

            if(opps[i].name === $(this).attr("data-name")) {
                
                opponent = opps[i];
                // Only show attack button now
                if(opps[i].hp > 0) {
                    opp.empty();
                    makeDiv(opp, opponent, "opponent");
                    opp.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));
                }
                
                $(".defender").append("<h3>Defender</h3>");
                $(".defender").append(opp);
            }

            else if(opps[i] !== player && opps[i].hp > 0){
                oppsLeft = true;
                makeDiv(waiting, opps[i], "opponents");
                waiting.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));
                // Show rest
                $(".available").append(waiting);

            }
            
        }
        if(oppsLeft)
            $(".available").prepend("<h3>Ememies Available to Attack</h3>");
   
    });
}

function attack(opp, yourChar, player, charAttack) {
    
    $(".attack").on("click", function() {
        
        if(player.hp > 0 && opponent.hp > 0) {
            $(".yourChar").empty();
            $(".yourChar").append("<h3>Your Character</h3>");
            $(".defender").empty();
            $(".defender").append("<h3>Defender</h3>");

            opp.empty();
            opponent.hp -= player.baseAttack;
            player.baseAttack += charAttack;
            makeDiv(opp, opponent, "opponent");
            opp.append($("<p>").text("Counter Attack: "+ opponent.counterAttack));
            $(".defender").append(opp);

            yourChar.empty();

            player.hp -= opponent.counterAttack;
            makeDiv(yourChar, player, "availableChars");
            yourChar.append($("<p>").text("Attack: "+ player.baseAttack));
            $(".yourChar").append(yourChar);

            if (opponent.hp <= 0){
                // Choose another opponent
                $(".defender").empty();
                if(oppsLeft)
                    chooseOpponent(opp);
                else {
                    alert("YOU WIN!");
                    player.baseAttack = charAttack;
                    player = "";
                    yourChar.empty();
                    $(".availableChars").empty();
                    $(".yourChar").empty();
                    $(".defender").empty();
                    newGame();
                }
            }


            if(player.hp <= 0) {
                alert("GAME OVER.");
                player.baseAttack = charAttack;
                player = "";
                $(".yourChar").empty();
                $(".defender").empty();
                $(".available").empty();

                newGame();
            }
            
        }
        
    });
}

function makeDiv(div, characterf, setClass) {
    div.append($("<p>").text(characterf.name))
        .prepend($('<img>',{id:'theImg',src:characterf.image}))
        .append($("<p>").text("HP: " + characterf.hp))
        .addClass(setClass)
        .attr("data-name", characterf.name)
        .attr("data-hp", characterf.hp)
        .attr("data-role", characterf.role)
        .css("float", "left");
}