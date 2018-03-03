var opps = [{name: "Obi-Wan Kenobi", hp: "120", role: "", image: "../images/obiwankenobi.jpg"},
            {name: "Luke Skywalker", hp: "100", role: "", image: "../images/lukeskywalker.jpg"},
            {name: "Darth Sidious", hp: "150", role: "", image: "../images/darth.jpg"},
            {name: "Darth Maul", hp: "180", role: "", image: "../images/maul.jpg"}];

var char;
var hp;
var opponent;
var oppHP;

$(document).ready(function() {


    mkDivs();

});

function mkDivs() {
    for(var i = 0; i < opps.length; i++) {
        var chars = $("<div>");

        chars.append($("<p>").text(opps[i].name))
            // .prepend($('<img>',{id:'theImg',src:'../images/darth.jpg'}))
            .append($("<p>").text(opps[i].hp))
            .addClass("availableChars")
            .attr("data-name", opps[i].name)
            .attr("data-hp", opps[i].hp)
            .attr("data-role", opps[i].role)
            .css("float", "left");

        $(".characters").append(chars);
    }

    $(".availableChars").on("click", function () {
        var player;
        
        $(this).attr("data-role", "player");
              
        $(".characters").empty();

        for(var i = 0; i < opps.length; i++) {
            var chars = $("<div>");
            var yourChar = $("<div>");
            var opp  =$("<div>");
    
            if(opps[i].name !== $(this).attr("data-name")) {
                chars.append($("<p>").text(opps[i].name))
                    // .prepend($('<img>',{id:'theImg',src:'../images/darth.jpg'}))
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

                $(".yourChar").append("<h3>Your Character</h3>");

                yourChar.append($("<p>").text(opps[i].name))
                    // .prepend($('<img>',{id:'theImg',src:'../images/darth.jpg'}))
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
                console.log(opps[i].role);

                var waiting = $("<div>");

                if(opps[i].name === $(this).attr("data-name")) {
    
                    opp.append($("<p>").text(opps[i].name))
                        // .prepend($('<img>',{id:'theImg',src:'../images/darth.jpg'}))
                        .append($("<p>").text(opps[i].hp))
                        .addClass("opponent")
                        .attr("data-name", opps[i].name)
                        .attr("data-hp", opps[i].hp)
                        .attr("data-role", opps[i].role)
                        .css("float", "left");
            
                    $(".defender").append(opp);
                }

                else if(opps[i] !== player){
                    waiting.append($("<p>").text(opps[i].name))
                        // .prepend($('<img>',{id:'theImg',src:'../images/darth.jpg'}))
                        .append($("<p>").text(opps[i].hp))
                        .addClass("opponents")
                        .attr("data-name", opps[i].name)
                        .attr("data-hp", opps[i].hp)
                        .attr("data-role", opps[i].role)
                        .css("float", "left");
            
                    
                    $(".available").append(waiting);
               }
            }
        });
    })

    
    
}

