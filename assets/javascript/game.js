var opps = [{name: "Obi-Wan Kenobi", hp: "120", role: "", baseAttack: 9 , image: "assets/images/obiwankenobi.jpg"},
            {name: "Luke Skywalker", hp: "100", role: "", baseAttack: 7 , image: "assets/images/lukeskywalker.jpg"},
            {name: "Darth Sidious", hp: "150", role: "", baseAttack: 8 , image: "assets/images/darth.jpg"},
            {name: "Darth Maul", hp: "180", role: "", baseAttack: 5 , image: "assets/images/maul.jpg"}];

var hp;
var opponent;
var oppHP;

var player;


$(document).ready(function() {

    mkDivs();

});

function mkDivs() {
    for(var i = 0; i < opps.length; i++) {

        var chars = $("<div>");

        makeDiv(chars, opps[i],"availableChars");

        $(".characters").append(chars);
    }

    $(".availableChars").on("click", function () {
        
        $(this).attr("data-role", "player");
              
        $(".characters").empty();

        var yourChar = $("<div>");
        var opp  =$("<div>");
        
        for(var i = 0; i < opps.length; i++) {
           
            var chars = $("<div>");

            if(opps[i].name !== $(this).attr("data-name")) {

                makeDiv(chars, opps[i], "opponents");
        
                $(".available").append(chars);
           }
  
           // else
           if(opps[i].name === $(this).attr("data-name")) {
                player = opps[i];

                $(".yourChar").append("<h3>Your Character</h3>");
                makeDiv(yourChar, player, "availableChars");

                $(".yourChar").append(yourChar);
            }
        }
        $(".opponents").on("click", function() {
            
            $(".available").empty();
            $(".available").append("<h3>Ememies Available to Attack</h3>");
            $(".available").append("<h3>Fight Selection</h3>");

            for(var i = 0; i < opps.length; i++) {
                // console.log(opps[i].role);

                var waiting = $("<div>");

                if(opps[i].name === $(this).attr("data-name")) {
                    
                    opponent = opps[i];

                    makeDiv(opp, opponent, "opponent");
            
                    $(".defender").append(opp);
                }

                else if(opps[i] !== player){

                    makeDiv(waiting, opps[i], "opponents");
            
                    $(".available").append(waiting);
               }
            }
            $(".attack").on("click", function() {
                if(player.hp > 0 && opponent.hp > 0) {
        
                    opp.empty();
                    opponent.hp -= player.baseAttack;
                    player.baseAttack *= 2;
                    makeDiv(opp, opponent, "opponent");
                    $(".defender").append(opp);

                    yourChar.empty();
                    player.hp -= opponent.baseAttack;
                    makeDiv(yourChar, player, "availableChars");
                    $(".yourChar").append(yourChar);
            
                }
    
             });

        });





    })
}

function makeDiv(div, characterf, setClass) {
    div.append($("<p>").text(characterf.name))
        .prepend($('<img>',{id:'theImg',src:characterf.image}))
        .append($("<p>").text(characterf.hp))
        .addClass(setClass)
        .attr("data-name", characterf.name)
        .attr("data-hp", characterf.hp)
        .attr("data-role", characterf.role)
        .css("float", "left");
}