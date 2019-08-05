$(document).ready(function () {
    var topics = ["Blade Runner", "The Matrix", "Ghost in the Shell", "Dark City", "Planet of the Apes", "Twelve Monkeys", "Alien", "2001: A Space Odyssey", "District 9", "Snowpiercer", "Mad Max", "Children of Men", "Back to the Future", "Star Wars", "Star Trek", "Serenity", "E.T.", "Inception", "Metropolis", "The Fifth Element"];

    function createButtons() {
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.text(topics[i]).addClass("movie-button").attr("data-name", topics[i]).css("background", "rgba(184, 183, 183, 0.3)").css("color", "white").css("border", "solid 1px").css("margin", "7.5px").css("border-radius", "10px");

            $("#buttons-here").append(newButton);
        };
    };

    createButtons();

    $("#submit-movie").on("click", function (event) {
        event.preventDefault();

        newMovie = $("#add-movie").val().trim();

        if (newMovie.length > 0) {
            topics.push(newMovie);

            $("#buttons-here").empty();

            createButtons();
        };
    });

    $("#add-movie").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#submit-movie").click();
        };
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

                    gifDiv.append(nextImage, nextP).css("margin", "22.5px 30px").css("display", "inline-block").css("background", "rgba(184, 183, 183, 0.3)").css("border", "1px solid white");

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