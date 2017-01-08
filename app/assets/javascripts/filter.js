
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

  $('#search-box').on('keyup', function(){
    var currentSearch = $(this).val().toUpperCase();

    $('.link').each(function(index, link) {
      if (link.children[1].innerText.toUpperCase().indexOf(currentSearch) !== -1) {
        $(link).show();
      } else {
        $(link).hide();
      }
    })
  })
})
