var $newLinkTitle, $newLinkUrl;

$(document).ready(function(){

  $newLinkTitle = $("#link_title");
  $newLinkUrl  = $("#link_url");

  $("#submit_link").on('click', createLink);

  displayExistingLinks();
})

function createLink (event){
  event.preventDefault();

  // console.log("win")

  var link = getLinkData();

  $.post("/api/v1/links", link)
   .then( renderLink )
   .fail( displayFailure )
 }

function getLinkData() {
 return {
   title: $newLinkTitle.val(),
   url: $newLinkUrl.val()
 }
}

function renderLink(link){
  $("#links_list").prepend( linkHTML(link) )
  if (link.read === false) {
    attachReadEvent(link.id)
  } else {
    attachUnreadEvent(link.id)
  }
  clearLink();
}

function displayExistingLinks(){
  // make a call to DB to get all links (index) and render those to the page. Make an API endpoint and update route to that endpoint to do this.
  $.get("api/v1/links")
  .then(function(links){
    links.forEach(renderLink)
  })
}

function attachReadEvent(id){
  $(`#link-${id} .Read-Button`).on('click', markRead)
}

function linkHTML(link) {if (link.read === false){

    return `<div class='link' data-id='${link.id}' id="link-${link.id}">
              <p class='link-title' contenteditable=true>${ link.title }</p>
              <p class='link-url' contenteditable=true>${ link.url }</p>

              <p class="link_read">
                Read? ${ link.read }
              </p>
              <button class="Read-Button" data-id='${link.id}' data-url='${link.url}' >Mark as Read</button>
            </div>`
          } else {
              return `<div class='link' data-id='${link.id}' id="link-${link.id}">
              <p class='link-title' contenteditable=true>${ link.title }</p>
              <p class='link-url' contenteditable=true>${ link.url }</p>

              <p class="link_read">
                Read? ${ link.read }
              </p>
              <button class="Read-Button" data-id='${link.id}' data-url='${link.url}' >Mark as Unread</button>
            </div>`
            }
}

function markRead(){
  var readLink = $(this).data("url")
  var id = $(this).data("id")
  // send the link to HotReads
  $.ajax( {
    method: 'PUT',
    data: {read: true},
    url: `api/v1/links/${id}`
  })
  // then change button text to Mark as Unread and create a new function (markUnread) to send a new status - set to false
  .then($(`#link-${id} .Read-Button`).text('Mark as Unread'))
  .then($(`#link-${id} .link_read`).text('Read? true'))
  .then(attachUnreadEvent(id))
}

function attachUnreadEvent(id){
  $(`#link-${id} .Read-Button`).on('click', markUnread)
}

function markUnread(){
  var readLink = $(this).data("url")
  var id = $(this).data("id")
  // send the link to HotReads
  $.ajax( {
    method: 'PUT',
    data: {read: false},
    url: `api/v1/links/${id}`
  })
  // then change button text to Mark as Unread and create a new function (markUnread) to send a new status - set to false
  .then($(`#link-${id} .Read-Button`).text('Mark as Read'))
  .then($(`#link-${id} .link_read`).text('Read? false'))
  .then(attachReadEvent(id))
}


function clearLink() {
  $newLinkTitle.val("");
  $newLinkUrl.val("");
}

function displayFailure(failureData){
  // changed from console.log to alert so user gets a popup
  alert ("FAILED attempt to create new Link: " + failureData.responseText);
}
