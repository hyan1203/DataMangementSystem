var test;
function checkBeforeSearch(){
  $('#error_manage').empty();
  var canSearch = true;
  var user = welcome;
  var startingdate = $('#startingdate_manage').val();
  var endingdate = $('#endingdate_manage').val();
  if (user == null) {
    $('#error_manage').append('<span class="error">Error:</span> Please try to login first! <br>');
    canSearch = false;
  }
  if (startingdate == null){
    $('#error_manage').append('<span class="error">Error:</span> Please enter the startingdate for the data you want to search! <br>');
    canSearch = false;
  }
  if(endingdate == null){
    $('#error_manage').append('<span class="error">Error:</span> Please enter the endingdate for the data you want to search! <br>');
    canSearch = false;
  }
  if(startingdate > endingdate){
    $('#error_manage').append('<span class="error">Error:</span> Please make the startingdate ealier than endingdate! <br>');
    canSearch = false;
  }
  if(!$('#temperature_manage').is(':checked')&&!$('#humidity_manage').is(':checked')&&!$('#gas_manage').is(':checked')){
    $('#error_manage').append('<span class="error">Error:</span> Please at least choose one type of the data! <br>');
    canSearch = false;
  }
  return canSearch;
}
$(document).ready(function() {
  $('#search').click(function() {
    $('#table_manage').empty();
    //console.log("user="+welcome);
    //var posting = $.post('php/search.php', {'user':welcome, $('#managementform').serialize()});
    console.log($('#managementform').serialize() + '&user='+welcome);
    
    if(checkBeforeSearch()){
      $.ajax({
        url: 'php/search.php?user=' + welcome + '&' + $('#managementform').serialize(),
        type: 'GET',
        complete: function(data) {
        test = JSON.parse(data.responseText);
        var table = $('<table></table>').addClass('table table-hover');
        table.append('<thead><tr><th>name</th><th>date</th><th>gas</th><th>temperature</th><th>humidity</th></tr></thead>');
        var rows = '<tbody>';
        var row;
        for(var i=0; i<test.length; i++){
          rows= rows + '<tr>';
          //Get length of key/value pairs, use Object.keys(yourobject).length
          row = null;
          for(var obj in test[i]){
            row = row + '<td>'+ test[i][obj]+'</td>';
          }
          row = row + '<td>'+'<button id="delete_manage" class="btn btn-default">Delete</button>';
          rows = rows + row + '</tr>';
        }
        rows = rows + '</tbody>';
        table.append(rows);
        $('#table_manage').append(table);
        //test[0].name
      }     
    })
  }
    //After click Search button, it's gonna post to search.php, the parameters are form items and the current user
    // var posting = $.post('php/search.php', $('#managementform').serialize()  + '&user='+welcome);
    // posting.always(function(){
    //   test = posting.responseText;
    //   alert(posting.responseText);
    //  });
    
     return false;
  });
});