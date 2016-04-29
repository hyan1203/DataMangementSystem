var test;
$(document).ready(function() {
  $('#search').click(function() {
    
    //console.log("user="+welcome);
    //var posting = $.post('php/search.php', {'user':welcome, $('#managementform').serialize()});
    console.log($('#managementform').serialize() + '&user='+welcome);
    $.ajax({
      url: 'php/search.php',
      type: 'GET',
      complete: function(data) {
        test = JSON.parse(data.responseText);
        $('#table_manage').empty();
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
          rows = rows + row + '</tr>';
        }
        rows = rows + '</tbody>';
        table.append(rows);
        $('#table_manage').append(table);
        //test[0].name
      }     
    })
    //After click Search button, it's gonna post to search.php, the parameters are form items and the current user
    // var posting = $.post('php/search.php', $('#managementform').serialize()  + '&user='+welcome);
    // posting.always(function(){
    //   test = posting.responseText;
    //   alert(posting.responseText);
    //  });
    
     return false;
  });
});