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


  clearLink();
}

function displayExistingLinks(){
  // make a call to DB to get all links (index) and render those to the page. Make an API endpoint and update route to that endpoint to do this.
  $.get("api/v1/links")
  .then(function(links){
    links.forEach(renderLink)
  })
}

function linkHTML(link) {

    return `<div class='link' data-id='${link.id}' id="link-${link.id}">
              <p class='link-title' contenteditable=true>${ link.title }</p>
              <p class='link-url' contenteditable=true>${ link.url }</p>

              <p class="link_read">
                ${ link.read }
              </p>
              <p class="link_buttons">
                <button class="upgrade-quality">+</button>
                <button class="downgrade-quality">-</button>
                <button class='delete-link'>Delete</button>
              </p>
            </div>`
}

function clearLink() {
  $newLinkTitle.val("");
  $newLinkUrl.val("");
}

function displayFailure(failureData){
  // changed from console.log to alert so user gets a popup
  alert ("FAILED attempt to create new Link: " + failureData.responseText);
}
