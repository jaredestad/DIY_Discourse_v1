/*http://stackoverflow.com/questions/24750623/select-a-row-from-html-table-and-send-values-onclick-of-a-button*/
$(document).ready(function(){

$("#comments_table tr").click(function(){
       $(this).addClass('selected').siblings().removeClass('selected');    
          var value=$(this).find('td:first').html();
             alert(value);    
});

$('.ok').on('click', function(e){
        alert($("#comments_table tr.selected td:first").html());
});

});
