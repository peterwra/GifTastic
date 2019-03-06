// Array of topics to show to the user
var topics = ["Aragorn", "Legolas", "Gimli", "Boromir", "Gollum", "Sauron", "Galadriel", "Elrond",
    "Gandalf", "Arwen"];

// API key and URL
var apiKey = "KpPJw3jjPKVEEgE4GW45YvUaL6kvYMPf";
var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&offset=0&rating=PG-13&lang=en&q="

function generateButtons() {
    $("#lotrButtons").empty();
    console.log(topics);
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.attr("id", "btn" + i);
        btn.attr("type", "button");
        btn.addClass("btn btn-primary btn-search");
        btn.text(topics[i]);
        btn.css("margin", "10px");
        btn.appendTo("#lotrButtons");
    }
}

// If the user enters a new search term, add it to the array
$(document).on("click", "#btnAddSearchTerm", function () {
    event.preventDefault();
    var newTopic = $("#addSearch").val().trim();
    if (newTopic !== "") {
        topics.push(newTopic);
        generateButtons();
    }
    $("#addSearch").val("");
})

// When the user clicks an image, flip back and forth between animated and still
$(document).on("click", ".image-state-click", function () {
    var currentState = $(this).attr("image-state");

    if (currentState == "still") {
        $(this).attr("image-state", "animate");
        $(this).attr("src", $(this).attr("moving-image"));
    } else {
        $(this).attr("image-state", "still");
        $(this).attr("src", $(this).attr("still-image"));
    }
})

$(document).on("click", ".btn-search", function () {

    // Is the user deleting existing images or keeping?
    var userDeleteImageOption = $("input[name='keepimage']:checked").val();
    console.log(userDeleteImageOption);
    if (userDeleteImageOption === "delete") {
        $("#lotrGifs").empty();
    }

    var tmpUrl = queryUrl + $(this).text();
    console.log(tmpUrl);

    // Ajax
    $.ajax({
        url: tmpUrl,
        method: "GET"
    }).then(function (response) {
        var obj = response.data;

        // Console log our object to verify we get the correct data we want
        console.log(obj);

        // Loop through the results and display
        for (var i = 0; i < obj.length; i++) {
            // Generate a container for each image
            var containerDiv = $("<div>");
            containerDiv.addClass("container");
            containerDiv.css("margin", "20px 0");
            containerDiv.css("border", "1px solid black");
            containerDiv.css("overflow", "auto");

            // Add the necessary attributes to each image
            var displayImage = $("<img>");
            displayImage.attr("src", obj[i].images.fixed_height_still.url);
            displayImage.addClass("image-state-click");
            displayImage.attr("still-image", obj[i].images.fixed_height_still.url);
            displayImage.attr("moving-image", obj[i].images.fixed_height.url);
            displayImage.attr("image-state", "still");
            displayImage.css("float", "left");
            displayImage.css("padding", "0 5px");

            // Create a list of useful information to the user
            var listInformation = $("<ul>");
            listInformation.addClass("list-group");
            listInformation.css("margin", "1px 0 0 0");
            // Image title
            var listImageTitle = $("<li>");
            listImageTitle.addClass("list-group-item font-weight-light");
            listImageTitle.text("Title: " + (obj[i].title).toUpperCase());
            listImageTitle.appendTo(listInformation);
            // Image rating
            var listImageRating = $("<li>");
            listImageRating.addClass("list-group-item font-weight-light");
            listImageRating.text("Rating: " + (obj[i].rating).toUpperCase());
            listImageRating.appendTo(listInformation);
            // Import datetime
            var listImportDateTime = $("<li>");
            listImportDateTime.addClass("list-group-item font-weight-light");
            listImportDateTime.text("Import Datetime: " + obj[i].import_datetime);
            listImportDateTime.appendTo(listInformation);

            // Create new bootstrap row
            bootstrapRow = $("<div>");
            bootstrapRow.addClass("row");

            // Create new bootstrap col
            bootstrapCol = $("<div>");
            bootstrapCol.addClass("col-md-8");

            // Append the elemnts to the div and add it to the html div that contains the results
            containerDiv.append(displayImage);
            containerDiv.append(listInformation);
            bootstrapCol.append(containerDiv);
            bootstrapRow.append(bootstrapCol);
            $("#lotrGifs").prepend(bootstrapRow);
        }
    })
})

$(document).ready(function () {

    // Call the function to generate the buttons
    generateButtons();

    $(function () {
        $("#lotrGifs").sortable();
        $("#lotrGifs").disableSelection();
    });

})