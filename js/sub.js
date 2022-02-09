$(function() {
	var $win = $(window);
  
  //life
  $('.list').each(function() {
    var $lifeList = $(this),
        $listAll = $lifeList.find('li'),
        disp = $listAll.css('display'),
        $btnMore = $lifeList.find('.more-area'),
        $btn = $btnMore.find('a'),
        $allNum = $btnMore.find('.all'),
        i = $listAll.length;
    //총개수 넣기
    $allNum.text(i);
    $btn.on('click', function(e) {
      $listAll.css('display', 'block');
      e.preventDefault;
      $btnMore.hide();
    });
  });

  if ($win.width() > 640) {
    
  } else {
    
  }

});