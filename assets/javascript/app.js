$(document).ready(function () {
    var topics = ["Blade Runner", "The Matrix", "Timecrimes", "Dark City", "Planet of the Apes", "Twelve Monkeys", "Alien", "2001: A Space Odyssey", "District 9", "Snowpiercer", "Mad Max", "Children of Men", "Back to the Future", "Star Wars"];

    console.log(topics.length);

    function createButtons() {
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.text(topics[i]).css("background", "teal").css("color", "white").css("border", "none").css("margin", ".5vw").css("border-radius", "10px");
            $("#buttons-here").append(newButton);
        };
    };

    createButtons();
});