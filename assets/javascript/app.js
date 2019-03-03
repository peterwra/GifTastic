// Array of topics to show to the user
var topics = ["Aragorn", "Legolas", "Gimli", "Balrog", "Boromir", "Gollum", "Sauron", "Galadriel", "Elrond",
    "Gandalf", "Arwen", "Nazgul", "Saruman", "Faramir", "Theoden", "Frodo Baggins", "Bilbo Baggins",
    "Eowyn", "Samwise Gamgee", "Treebeard", "Gondor", "Misty Mountains", "Mount Doom", "Rivendell",
    "Rohan", "The Shire"];

var apiKey = "KpPJw3jjPKVEEgE4GW45YvUaL6kvYMPf";
var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&offset=0&rating=PG-13&lang=en&q="

$(document).ready(function () {
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.attr("id", "btn" + i);
        btn.attr("type", "button");
        btn.addClass("btn btn-primary");
        btn.text(topics[i]);
        btn.appendTo("#lotrButtons");
    }

    $(".btn").on("click", function () {
        $("#lotrGifs").empty();
        var tmpUrl = queryUrl + $(this).text();
        console.log(tmpUrl);

        // Ajax
        $.ajax({
            url: tmpUrl,
            method: "GET"
        }).then(function (response) {
            var obj = response.data;
            console.log(obj);

            // Loop through the results and display
            for (var i = 0; i < obj.length; i++) {
                // console.log(i);
                console.log(obj[i].images.original_still.url);
                var displayImage = $("<img>");
                displayImage.attr("src", obj[i].images.fixed_height_still.url);
                displayImage.addClass("image-state-click");
                displayImage.attr("still-image", obj[i].images.fixed_height_still.url);
                displayImage.attr("moving-image", obj[i].images.fixed_height.url);
                displayImage.attr("image-state", "still");
                displayImage.appendTo("#lotrGifs");
            }

            $(".image-state-click").on("click", function (event) {
                event.preventDefault();

                console.log("animate/still");
                var currentState = $(this).attr("image-state");

                if (currentState == "still") {
                    $(this).attr("image-state", "animate");
                    $(this).attr("src", $(this).attr("moving-image"));
                } else {
                    $(this).attr("image-state", "still");
                    $(this).attr("src", $(this).attr("still-image"));
                }
            });
        })
    })


})