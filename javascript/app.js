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


    



  jQuery(function($) {
   
  
    
    function translate(source, target, content, callback) {
      $.ajax({
        method:'GET',
        url: 'https://api-platform.systran.net/translation/text/translate?key=72ce7dc9-4e71-4c4a-ba39-e653e0f47f26',
        dataType: 'text',
        data: {
          source: source,
          target: target,
          input: content
        },
        success: function(data) {
          if (typeof data === 'string')
            try {
              data = JSON.parse(data);
            } catch (exp) {
  
            }
  
          var err;
  
          if (data && data.outputs && Array.isArray(data.outputs)) {
            data = data.outputs[0];
  
            if (data && data.output)
              data = data.output;
  
            if (data && data.error)
              err = data.error;
          }
  
          callback(err, data);
        },
       
      });
    }
  
    function getTextFromHtml(content) {
      content = content.replace(/<div>(?:<br>)?/gi, '\n').replace(/<\/div>/gi, '');
      content = content.replace(/<p>&nbsp;<\/p>/gi, '\n').replace(/<p>/gi, '').replace(/\n*<\/p>/gi, '\n');
      content = content.replace(/<br[ \/]*>/gi, '\n');
      content = content.replace(/&nbsp;/gi, ' ');
      content = content.replace(/<([^> ]*)[^>]*>/gi, '');  
      content = content.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">"); 
      return content;
    }
  
    var $inputTextEditor = $('#inputText');
    var $outputTextEditor = $('#outputText');
    var $translating = $('#translating');
    var $source = $('#source');
    var $target = $('#target');
  
    function launchTranslation() {
      $translating.removeClass('hidden');
    
      var toTranslate = getTextFromHtml($inputTextEditor.html());
      translate($source.val(), $target.val(), toTranslate, function(err, result) {
        $translating.addClass('hidden');
        if (!err) {
          $outputTextEditor.text(result);
        } else {
          if (console.log)
            console.log('Error while doing translation: ' + err);
        }
      });
    }
  
    $('#translateButton').click(launchTranslation);
    launchTranslation();
  });
