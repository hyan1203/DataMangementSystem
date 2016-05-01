//record the username who logins to the system right now 
var welcome = null;

$(document).ready(function() {

	// When login button is clicked.
    $('#login').click(function() {
        var username = $('#username_login').val();
        var password = $('#password_login').val();
        if ($.trim(username).length > 0 && $.trim(password).length > 0) {
        	$.ajaxSetup({cache: false});
            var posting = $.post('php/login.php', $('#loginform').serialize());
            posting.always(function() {
              if(posting.responseText == 'true'){
              $(".navbar-nav li").filter(".active").removeClass("active");
    	        $(".navbar-nav li").filter('#Home').addClass("active");
              welcome = $('#username_login').val();
    					/*Clear Form*/
    					$('#username_login').val(null);
    					$('#password_login').val(null);
              $('#error_login').html(null);

    					$('section').hide().filter("#Homepage").show();
              $('#welcome span').filter('.myuser').html('Welcome '+welcome+"!!!");
              $('#logoff').show();
              }
              else {
                  $('#error_login').html('<span class="error">Error:</span> Please enter a username or password.');
              }
            });
          }
        return false;
    });
    $('#logoff').click(function(){
      welcome = null;
      $('#welcome span').html(null);
      $(this).hide();
      $(".navbar-nav li").filter(".active").removeClass("active");
      $(".navbar-nav li").filter('#Home').addClass("active");
      $('section').hide().filter("#Homepage").show();
      $('#table_manage').empty();
      $('#error_manage').empty();
    });
});
