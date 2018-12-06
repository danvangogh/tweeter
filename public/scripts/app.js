$(() => {

  loadTweets();

  function renderTweets(tweets) {
    // $(".tweet-container").empty();
    tweets.forEach( tweet => {
      $(".tweet-container").prepend(createTweetElement(tweet));

    })
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


  function createTweetElement(tweet) {
    let user = tweet["user"];
    let content = tweet["content"];
    let timeStamp = tweet["created_at"];
    let date = new Date(timeStamp * 1000).toDateString();
    // let day = date.toDateString();

    return (
      `<article class="tweet">
        <header class="tweet-header">
          <img id="avatar" src="${escape(user["avatars"].small)}" />
            <h2>${escape(user["name"])}</h2>
          <span class="handle">${escape(user["handle"])}</span>
        </header>
        <p class="tweet-body">${escape(content["text"])}</p>
        <footer class="tweet-footer"><p class="date">${timeSince(timeStamp)} ago.</p>
          <footer class="emojis">⚐ ☞ ❤︎</div
        </footer>
      </article>`
    )
  }

    function handleNewTweet(event) {
      event.preventDefault();
      const data = $(this).serialize();
      let splitData = $('#textarea')[0].value.length;
      if ( (splitData) && (splitData <= 140) ) {
        $.ajax({
          method: 'POST',
          url: "/tweets",
          data: data,
        }).then((res) => {
          loadTweets();
        }, (err) => {
      })
    } else {
      errorAlert();
      };
      $('#new-tweet-form')[0].reset()
      $('.counter').text('140')
    }

  function errorHide() {
    $(".error-message").hide()
  };

  $('#new-tweet-form').on('submit', handleNewTweet);

  function loadTweets() {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: "/tweets",
      success: function(result){
        renderTweets(result);
      },
      error: function(err){
        console.log("there was an error calling API",err);
      }
    });
  }
});
