$(document).ready(function(){
  $('.Read-Button').on('click', submitReadLink)
});

function submitReadLink(){
  var readLink = $(this).data("url")

  // send the link to HotReads
  $.ajax( {
    method: 'POST',
    data: {url: readLink},
    url: "http://hotreads.herokuapp.com/links"
  })
}
