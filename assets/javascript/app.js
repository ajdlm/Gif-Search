$(document).ready(function () {
    var topics = ["Blade Runner", "The Matrix", "Timecrimes", "Dark City", "Planet of the Apes", "Twelve Monkeys", "Alien", "2001: A Space Odyssey", "District 9", "Snowpiercer", "Mad Max", "Children of Men", "Back to the Future", "Star Wars", "Star Trek", "Serenity", "E.T.", "Inception", "Metropolis", "The Fifth Element"];

    function createButtons() {
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.text(topics[i]).addClass("movie-button").attr("data-name", topics[i]).css("background", "rgba(184, 183, 183, 0.3)").css("color", "white").css("border", "solid .2vh").css("margin", ".5vw").css("border-radius", "10px");

            $("#buttons-here").append(newButton);
        };
    };

    createButtons();

    $("#submit-movie").on("click", function(event) {
        newMovie = $("#add-movie").val().trim();

        topics.push(newMovie);

        $("#buttons-here").empty();

        createButtons();
    });

    $("#buttons-here").on("click", ".movie-button", function(event) {
        alert("Wow, you click button of " + $(this).attr("data-name") + "!");

        
    });
});