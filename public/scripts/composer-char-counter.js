$(() => {

  $('.error-message').hide()

  function errorAlert() {
  $(".error-message").show()
}

  $('#new-tweet-form').on("input", function(event) {

    const target = $(event.currentTarget);
    const characterCounter = target.find('.counter');
    const maxLength = 140;
    const count = maxLength - event.target.textLength;

    characterCounter.html(count);

    if ( (count < 0) || (count > 140) ){
      characterCounter.css("color", "red");
    } else {
      characterCounter.css("color", "#334853")
    }
    if (count <= 0) {
      $('.tweet-button').attr('disabled', 'disabled');
      errorAlert();
    } else if (count >= 140) {
      $('.tweet-button').attr('disabled', 'disabled');
      errorAlert();
    } else {
      $('.tweet-button').removeAttr("disabled");
      $('.error-message').hide()
    }
  })
});
