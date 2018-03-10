// Object for characters
var opps = [{name: "Obi-Wan Kenobi", baseHP: 120, hp: 120, role: "", baseAttack: 8 , counterAttack: 10, image: "assets/images/obiwankenobi.jpg"},
            {name: "Luke Skywalker", baseHP: 100, hp: 100, role: "", baseAttack: 15 , counterAttack: 5, image: "assets/images/lukeskywalker.jpg"},
            {name: "Darth Sidious", baseHP: 160, hp: 150, role: "", baseAttack: 5 , counterAttack: 15, image: "assets/images/darth.jpg"},
            {name: "Darth Maul", baseHP: 180, hp: 180, role: "", baseAttack: 4 , counterAttack: 20, image: "assets/images/maul.jpg"}];
// Initial varials
var hp;
var opponent;
var oppHP;
var oppsLeft;
var player;

// Call new game function immediatly
$(document).ready(function() {
    newGame();
});
// Call fucntions to set up and play game
function newGame() {
    mkDivs();
    chooseChar();
}
// Sets up elements for characters to choose form
function mkDivs() {
    $(".characters").append("<h3>Choose a character to play as.</h3>")

    for(var i = 0; i < opps.length; i++) {
        // Add all character to select from
        opps[i].hp = opps[i].baseHP;
        var chars = $("<div>");
        // Call makeDiv function for each character
        makeDiv(chars, opps[i],"availableChars");
        // Append attack values for each character
        chars.append($("<p>").text("Attack: "+ opps[i].baseAttack));
        chars.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));

        $(".characters").append(chars);
    }

}
// Function for the rest of gameplay
function chooseChar(){
    // When a user clicks on a character to play as
    $(".availableChars").on("click", function () {
        // Set attribute as player
        $(this).attr("data-role", "player");
        // Empty characters div
        $(".characters").empty();
        // Empty div for when game resets
        $(".yourChar").empty();
        var yourChar = $("<div>");
        
        $(".available").append("<h3>Choose an Opponent.</h3>");
        // Loop through all characters
        for(var i = 0; i < opps.length; i++) {
           
            var chars = $("<div>");
            // If current array entry is not the character clicked on
            if(opps[i].name !== $(this).attr("data-name")) {
                // Make opponents div
                makeDiv(chars, opps[i], "opponents");
                // Only display counter attack
                chars.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));
                $(".available").append(chars);
           }
           // If current is the character that was clicked on
           if(opps[i].name === $(this).attr("data-name")) {
                // Set player to current entry
                player = opps[i];
                // Set charAttack to base attack
                charAttack = player.baseAttack; 

                $(".yourChar").append("<h3>Your Character</h3>");
                // Make div for the user's character
                makeDiv(yourChar, player, "availableChars");
                // Only display attack
                yourChar.append($("<p>").text("Attack: "+ player.baseAttack));
                $(".yourChar").append(yourChar);
            }
        }
        var opp = $("<div>");
        // Call chooseOpponent 
        chooseOpponent(opp);
        // Call attack
        attack(opp, yourChar, player, charAttack);
    });
}
// Fucntion to display the opponent the user chooses
function chooseOpponent(opp) {
    // When a user clicks on a character to attack
    $(".opponents").on("click", function() {
        // Set oppsLeft to false
        oppsLeft = false;
        // Empty div of possible opponents
        $(".available").empty();
        // Loop through characters
        for(var i = 0; i < opps.length; i++) {
            // Make div for opponents left
            var waiting = $("<div>");   
            // If entry is the one the user clicked on
            if(opps[i].name === $(this).attr("data-name")) {
                // Set opponent to current character
                opponent = opps[i];
                // If opponent has not already been defeated
                if(opps[i].hp > 0) {
                    // Empty opp div
                    opp.empty();
                    // Make opp div with selected opponent
                    makeDiv(opp, opponent, "opponent");
                    opp.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));
                }
                // Append to defender class
                $(".defender").append("<h3>Defender</h3>");
                $(".defender").append(opp);
            }
            // If entry is not the opponent selected and they have
            // not already been defeated
            else if(opps[i] !== player && opps[i].hp > 0){
                // Set oppsLeft to true
                oppsLeft = true;
                // Make div for remaining opponent
                makeDiv(waiting, opps[i], "opponents");
                waiting.append($("<p>").text("Counter Attack: "+ opps[i].counterAttack));
                // Append to available class
                $(".available").append(waiting);

            }
            
        }
        if(oppsLeft)
            // Append if enemies are remaining
            $(".available").prepend("<h3>Ememies Available to Attack</h3>");
    });
}
// Function when user attacks
function attack(opp, yourChar, player, charAttack) {
    // When attack button is clicked
    $(".attack").on("click", function() {
        // If neither fighter has died yet
        if(player.hp > 0 && opponent.hp > 0) {
            // Empty previous content of divs
            $(".yourChar").empty();
            $(".yourChar").append("<h3>Your Character</h3>");
            $(".defender").empty();
            $(".defender").append("<h3>Defender</h3>");

            // Clear opp div
            opp.empty();
            // Reduce opponent hp by player attack
            opponent.hp -= player.baseAttack;
            // Increase player attack by their initial base attack value
            player.baseAttack += charAttack;
            // Remake opponent div with new hp value
            makeDiv(opp, opponent, "opponent");
            opp.append($("<p>").text("Counter Attack: "+ opponent.counterAttack));
            // Append to defender class
            $(".defender").append(opp);

            // Clear yourChar div
            yourChar.empty();
            // Reduce player hp by opponent counter attack value
            player.hp -= opponent.counterAttack;
            // Remake div with new player hp
            makeDiv(yourChar, player, "availableChars");
            yourChar.append($("<p>").text("Attack: "+ player.baseAttack));
            // Append to yourChar class
            $(".yourChar").append(yourChar);

            // If opponent hp is 0 or below
            if (opponent.hp <= 0){
                // Clear defender element
                $(".defender").empty();
                // If there are opponents remaining
                if(oppsLeft)
                    // User can choose another opponent
                    chooseOpponent(opp);
                // If user has defeated all opponents
                else {
                    // Alert you win
                    alert("YOU WIN!");
                    // Reset player base attack
                    player.baseAttack = charAttack;
                    // Reset player variable
                    player = "";
                    // Empty divs
                    yourChar.empty();
                    $(".availableChars").empty();
                    $(".yourChar").empty();
                    $(".defender").empty();
                    // Start new game
                    newGame();
                }
            }
            // If player's hp is 0 or below
            if(player.hp <= 0) {
                // Alert game over
                alert("GAME OVER.");
                // Reset player base attack
                player.baseAttack = charAttack;
                // Reset player variable
                player = "";
                // Empty divs
                $(".yourChar").empty();
                $(".defender").empty();
                $(".available").empty();
                // Start new game
                newGame();
            }
        }
    });
}
// Function to make a new element
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