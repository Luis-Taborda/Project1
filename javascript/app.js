function getData() {
    var artist = $("#artist").val();
    var song = $("#song").val();
    var queryURL = "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + song + "?apikey=PSFk1kty0bN0pgOS4UksXgcBIGFTBMpGmHnvaHqV61idMR5TwGYYtO067TKCJLso"

    
    



$.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function (response) {
        console.log("success got data", response);
        console.log("Text Track: " + response.result.track.text);
        var lyrics = response.result
        $(".lyrics").append(lyrics.track.text)

    });

}
function reset() {
    $("#reset-btn").click(function () {
        $(".lyrics").empty();
      
    })
    console.log("Reset")
};


    


