var color = "red";

function switch_player() {
  color = (color == "red" ? "yellow" : "red");
};

function up_and_down(col_num, row_num){
  
  var count = 0;
  
  for(var i=row_num; i >= 1; i--){
    if($('tr.' + i + ' td.' + col_num).find('.'+color).length){
      count++;
    }else {
      break;
    }
  }
  for(var j=row_num+1; j < 7; j++){
    if($('tr.' + j + ' td.' + col_num).find('.'+color).length){
      count++;
    }else {
      break;
    }
  }

  return count >= 4;
}

function rup_and_ldown(col_num, row_num){
  
  var count = 0;
  var i = 0;
  var j = 0;

  for(i=row_num, j=col_num; i >= 1 && j < 8; i--, j++){
    if($('tr.' + i + ' td.' + j).find('.'+color).length){
      count++;
    }else{
      break;
    }
  }
  for(i=col_num-1, j=row_num+1; i>=1 && j < 7; i--, j++){
    if($('tr.' + j + ' td.' + i).find('.'+color).length){
      count++;
    }else{
      break;
    }
  }

  return count >= 4;
}

function right_and_left(col_num, row_num){
  
  var count = 0;
  
  for(var i=col_num; i < 8; i++){
    if($('tr.' + row_num + ' td.' + i).find('.'+color).length){
      count++;
    }else {
      break;
    }
  }
  for(var j=col_num-1; j >= 1; j--){
    if($('tr.' + row_num + ' td.' + j).find('.'+color).length){
      count++;
    }else {
      break;
    }
  }

  return count >= 4;
}

function rdown_and_lup(col_num, row_num){
  
  var count = 0;
  var i = 0;
  var j = 0;

  for(i=row_num, j=col_num; i < 7 && j < 8; i++, j++){
    if($('tr.' + i + ' td.' + j).find('.'+color).length){
      count++;
    }else{
      break;
    }
  }
  for(i=col_num-1, j=row_num-1; i>=1 && j >= 1; i--, j--){
    if($('tr.' + j + ' td.' + i).find('.'+color).length){
      count++;
    }else{
      break;
    }
  }

  return count >= 4;
}

function mouse_events() {
  $('table').on('mouseenter', 'th', function(){
    $(this).html("<div class='circle'></div>");
    $(this).find('.circle').addClass(color);
  });

  $('table').on('mouseleave', 'th', function(){
    $(this).empty();
  });
  
  $('table').on('click', 'th', function(event){
    // animation
    // unbind mouseenter & mouseleave events
    $(event.delegateTarget).off('mouseenter mouseleave click');
    var $my_circle = $(this).find('.circle');
    // check for available positions (ones that circle div do not exist)
    var chosen_column = $(this).attr('class');
    // animate down to the location
    $('tr').each(function(index){
      var $td = $(this).find('td.'+ chosen_column);
      if( $td.length ){
        var $circle = $td.find('.circle');
        if(! $circle.length ){
          $my_circle.prependTo($td);
        }else {
          return false;
        }
      } 
    });
    var $column = $my_circle.closest('td');
    var $row = $my_circle.closest('tr');
    // bind the mouse events back with another player
    if ($column.length && $row.length){
      var col_num = parseInt($column.attr('class'));
      var row_num = parseInt($row.attr('class'));
      if (up_and_down(col_num, row_num) || rup_and_ldown(col_num, row_num) || 
          right_and_left(col_num, row_num) || rdown_and_lup(col_num, row_num)){
        $('.who-won').text(color.toUpperCase() + " WON THE MATCH");
        $('.who-won').show();
        $('.replay').show();
        return;
      }
    }
    switch_player();
    mouse_events();
  });
}


$(function(){
  mouse_events();

  $('.replay').click(function(){
    $('.who-won').hide();
    $('.replay').hide();
    $('.circle').remove();
    mouse_events();
  });
});
