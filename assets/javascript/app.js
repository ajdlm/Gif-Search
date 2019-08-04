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

    $("#submit-movie").on("click", function (event) {
        newMovie = $("#add-movie").val().trim();

        topics.push(newMovie);

        $("#buttons-here").empty();

        createButtons();
    });

    $("#buttons-here").on("click", ".movie-button", function (event) {
        var movieName = $(this).attr("data-name");

        movieName = movieName.replace(/ /g, "+");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieName + "&api_key=IiDTkAfuzEbi8l4ceRkr2Zg8bdqcnUm4&limit=10";

        $("#image-area").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                console.log(results);

                for (var j = 0; j < results.length; j++) {
                    var gifDiv = $("<div>");
                    
                    var nextImage = $("<img>");

                    nextImage.attr("src", results[j].images.fixed_height_still.url).attr("data-still", results[j].images.fixed_height_still.url).attr("data-moving", results[j].images.fixed_height.url).attr("data-state", "still").addClass("movie-gif").css("cursor", "pointer");

                    var nextRating = results[j].rating;

                    var nextP = $("<p>").text("Rating: " + nextRating.toUpperCase()).css("font-family", "ethnocentric, serif").css("color", "white").css("margin", "10px");

                    gifDiv.append(nextImage, nextP).css("margin", "2vw").css("display", "inline-block").css("background", "rgba(184, 183, 183, 0.3)").css("border", ".2vh solid white");

                    $("#image-area").prepend(gifDiv);
                };
            });
    });

    $("#image-area").on("click", ".movie-gif", function (event) {
        var currentState = $(this).attr("data-state");

        if (currentState === "still") {
            $(this).attr("src", $(this).attr("data-moving")).attr("data-state", "moving");
        }

        else if (currentState === "moving") {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        };
    });
});