var actors = ["Kate Winslet", "Leonardo DiCaprio", "Ryan Reynolds", "Jason Momoa ", "Steve Carell", "Maya Rudolph", "Kristen Wiig", "Matthew McConaughey", "Channing Tatum", "Jonah Hill"];

function displayGifs() {
    var actor = $(this).attr("data-actor");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=fF9pjS0YlgPYwkEgVHzT5Pi9tZAUKLcK&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        $("#gif-view").empty();
        
        var results = response.data

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var actorImage = $("<img>");

            actorImage.attr("src", results[i].images.fixed_height_still.url);
            actorImage.attr("data-still", results[i].images.fixed_height_still.url);
            actorImage.attr("data-animate", results[i].images.fixed_height.url);
            actorImage.attr("data-state", "still");
            actorImage.addClass("gif");

            $(".gif").click(function() {
                var state = $(this).attr("data-state");
                
                  if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

            gifDiv.append(p);
            gifDiv.append(actorImage);

            $("#gif-view").append(gifDiv);

            $(".gif").click(function() {
              var state = $(this).attr("data-state");
              
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                  }
              });
        }
    });
    
}

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < actors.length; i++) {
        var a = $("<button>");

        a.addClass("actor");
        a.attr("data-actor", actors[i]);
        a.text(actors[i]);

        $("#buttons-view").append(a);
    }
}


$(document).on("click", ".actor", displayGifs);

renderButtons();