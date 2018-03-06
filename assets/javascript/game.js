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
                // Show your character
                $(".yourChar").append("<h3>Your Character</h3>");
                makeDiv(yourChar, player, "availableChars");

                $(".yourChar").append(yourChar);
            }
        }
        console.log(player);

        var opp = $("<div>");

        // to make divs
        chooseOpponent(opp);
        attack(opp, yourChar, player);

    });
}

function chooseOpponent(opp) {

    console.log("chooseOpp");

        // need to repeat this
        $(".opponents").on("click", function() {
            
            $(".available").empty();
            $(".available").append("<h3>Ememies Available to Attack</h3>");
            $(".available").append("<h3>Fight Selection</h3>");

            for(var i = 0; i < opps.length; i++) {
                // console.log(opps[i].role);

                var waiting = $("<div>");

                if(opps[i].name === $(this).attr("data-name")) {
                    
                    opponent = "";
                    console.log("hi");
                    opponent = opps[i];
                    // Show opponent
                    makeDiv(opp, opponent, "opponent");
            
                    $(".defender").append(opp);
                }

                else if(opps[i] !== player && opps[i].hp > 0){

                    makeDiv(waiting, opps[i], "opponents");
                    // Show rest
                    $(".available").append(waiting);

               }
            }
       
        });// end
}

function attack(opp, yourChar, player) {
    
    $(".attack").on("click", function() {
        console.log("atack");

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
        else if(player.hp <= 0) {
            alert("GAME OVER");
        }
        else {
            // Choose another opponent
            $(".defender").empty();

            chooseOpponent(opp);

            // $(".available").on("click", function () {
            //     console.log( "\n"+ "clicked: " + $(this).attr("data-name"));

            //     $(".available").empty();
            //     $(".available").append("<h3>Ememies Available to Attack</h3>");
            //     $(".available").append("<h3>Fight Selection</h3>");

            //     for(var i = 0; i < opps.length; i++) {
            //         var waiting = $("<div>");
            //         var opp  =$("<div>");


            //         if(opps[i].hp > 0){

            //             if(opps[i].name === $(this).attr("data-name")) {
            //                 console.log("byeee");

            //                 opponent = opps[i];
        
            //                 makeDiv(opp, opponent, "opponent");
                    
            //                 $(".defender").append(opp);
            //             }
        
            //             else if(opps[i] !== player){
            //                 console.log("bye");

            //                 makeDiv(waiting, opps[i], "opponents");
                    
            //                 $(".available").append(waiting);
            //             }
            //         }
            //     }

            // });

        }

     });
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