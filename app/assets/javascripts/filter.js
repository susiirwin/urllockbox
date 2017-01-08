
$(document).ready(function(){

  $('#show-read').on('click', function(){

    $('.link').each(function(index, link){
      if (link.children[2].innerText === "Read? true") {
        $(link).show();
      } else {
        $(link).hide();
      }
    })
  })

  $('#show-unread').on('click', function(){

    $('.link').each(function(index, link){
      if (link.children[2].innerText === "Read? false") {
        $(link).show();
      } else {
        $(link).hide();
      }
    })
  })

  $('#show-all').on('click', function(){

    $('.link').each(function(index, link){
        $(link).show();
      })
    })
})
