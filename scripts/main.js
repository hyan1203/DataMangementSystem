

function clear() {
  // body...
  $('#username').val(null);
  $('#password').val(null);
  $('#passconfirm').val(null);
  $('#error').html(null);
  $('#regsubmit').prop('disabled', true);

  $('#username_login').val(null);
  $('#password_login').val(null);
  $('#error_login').html(null);
}
$(document).ready(function() {
  $('#logoff').hide();
  $('section').hide().filter(':first').show();
  $('.navbar-nav li').click(function() {
        clear();
        $(".navbar-nav li").filter(".active").removeClass("active");
        $(this).addClass("active");
        id = "#"+$(this).attr('id')+"page";
        $('section').hide().filter(id).show();
    })
});
