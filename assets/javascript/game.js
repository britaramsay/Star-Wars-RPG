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
    // playGame();
    // console.log(player);

});

function mkDivs() {
    for(var i = 0; i < opps.length; i++) {
        var chars = $("<div>");

        chars.append($("<p>").text(opps[i].name))
            .prepend($('<img>',{id:'theImg',src:opps[i].image}))
            .append($("<p>").text(opps[i].hp))
            .addClass("availableChars")
            .attr("data-name", opps[i].name)
            .attr("data-hp", opps[i].hp)
            .attr("data-role", opps[i].role)
            .css("float", "left");

        $(".characters").append(chars);
    }

    $(".availableChars").on("click", function () {
        
        $(this).attr("data-role", "player");
              
        $(".characters").empty();
        var chars = $("<div>");
        var yourChar = $("<div>");
        var opp  =$("<div>");
        for(var i = 0; i < opps.length; i++) {
           
    
            if(opps[i].name !== $(this).attr("data-name")) {
                chars.append($("<p>").text(opps[i].name))
                    .prepend($('<img>',{id:'theImg',src:opps[i].image}))
                    .append($("<p>").text(opps[i].hp))
                    .addClass("opponents")
                    .attr("data-name", opps[i].name)
                    .attr("data-hp", opps[i].hp)
                    .attr("data-role", opps[i].role)
                    .css("float", "left");
        
                $(".available").append(chars);
        
           }
  
           // else
           if(opps[i].name === $(this).attr("data-name")) {
                player = opps[i];
                // console.log(player);

                $(".yourChar").append("<h3>Your Character</h3>");

                yourChar.append($("<p>").text(opps[i].name))
                    .prepend($('<img>',{id:'theImg',src:opps[i].image}))
                    .append($("<p>").text(opps[i].hp))
                    .addClass("availableChars")
                    .attr("data-name", opps[i].name)
                    .attr("data-hp", opps[i].hp)
                    .attr("data-role", opps[i].role)
                    .css("float", "left");
        
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

                    opp.append($("<p>").text(opponent.name))
                        .prepend($('<img>',{id:'theImg',src:opps[i].image}))
                        .append($("<p>").text(opponent.hp))
                        .addClass("opponent")
                        .attr("data-name", opps[i].name)
                        .attr("data-hp", opponent.hp)
                        .attr("data-role", opps[i].role)
                        .css("float", "left");
            
                    $(".defender").append(opp);
                }

                else if(opps[i] !== player){
                    waiting.append($("<p>").text(opps[i].name))
                        .prepend($('<img>',{id:'theImg',src:opps[i].image}))
                        .append($("<p>").text(opps[i].hp))
                        .addClass("opponents")
                        .attr("data-name", opps[i].name)
                        .attr("data-hp", opps[i].hp)
                        .attr("data-role", opps[i].role)
                        .css("float", "left");
            
                    $(".available").append(waiting);
               }
            }
            $(".attack").on("click", function() {
                if(player.hp > 0 && opponent.hp > 0) {

                console.log(player, opponent);
                //  while neither has hp = 0
                //  counter increment each time
                //  if even player attack, if odd opponent attacks
    
                opp.empty();

                // player attacks
                opponent.hp -= player.baseAttack;
                player.baseAttack *= 2;

                opp.append($("<p>").text(opponent.name))
                    .prepend($('<img>',{id:'theImg',src:opponent.image}))
                    .append($("<p>").text(opponent.hp))
                    .addClass("opponent")
                    // .attr("data-name", opps[i].name)
                    // .attr("data-hp", opponent.hp)
                    // .attr("data-role", opps[i].role)
                    .css("float", "left");
        
                $(".defender").append(opp);
                    // opponent attacks

                yourChar.empty();

                player.hp -= opponent.baseAttack;

                yourChar.append($("<p>").text(player.name))
                    .prepend($('<img>',{id:'theImg',src:player.image}))
                    .append($("<p>").text(player.hp))
                    .addClass("availableChars")
                    // .attr("data-name", opps[i].name)
                    // .attr("data-hp", opps[i].hp)
                    // .attr("data-role", opps[i].role)
                    .css("float", "left");
        
                $(".yourChar").append(yourChar);
            
            
                }
    
             });

        });





    })
}


var counter = 0;

// function playGame(player, opponent) {
         
    

// }


