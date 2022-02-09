$(function() {
	var $win = $(window);
	
//swiper
	var mySwiper = new Swiper ('.swiper-container', {
		loop:true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});
  
//utill메뉴 보여질때 스크롤 막기
  $('.util a').on('click', function() {
    $("html, body").css({"overflow":"hidden", "height":"100%"});
    $("#wrap").on("scroll touchmove mousewheel", function(e) {
      e.preventDefault();
    });
    $(".pop-base").on("scroll touchmove mousewheel", function(e) {
      e.stopPropagation();
    });
  });
  $('.pop-base .btn-close').on('click', function() {
    $("html, body").css({"overflow":"auto", "height":"auto"});
    $("#wrap").off("scroll touchmove mousewheel");
    $(".pop-base").off("scroll touchmove mousewheel"); 
  });
	
//main-gourmet 마우스 올리면 이미지 사이즈 변경
  var $mainGourmet = $('#main-gourmet');
  $mainGourmet.each(function() {
    var $allA = $mainGourmet.find('a');
    $allA.on('mouseover', function() {
      $(this).addClass('on');
      $(this).siblings().removeClass('on');
    });
  });
  
  //life / archive
  $('.list').each(function() {
    var $lifeList = $(this),
        $listAll = $lifeList.find('li'),
        disp = $listAll.css('display'),
        $btnMore = $lifeList.find('.more-area'),
        $btn = $btnMore.find('a'),
        $count = $lifeList.find('.count-area'),
        $allNum = $count.find('.all'),
        i = $listAll.length;
    //총개수 넣기
    $allNum.text(i);
    $btn.on('click', function(e) {
      $listAll.css('display', 'block');
      e.preventDefault;
      $btnMore.hide();
    });
  });
  
  if ($win.width() > 1200) {
    // 스크롤에 따른 header 변경
    $win.scroll( function() {
      var $header = $('header');
      $header.each(function() {
          var logo = $header.find('.logo'),
              Menu = $header.find('.btn-menu'),
              login = $header.find('.btn-login'),
              search = $header.find('.btn-search'),
              my = $header.find('.btn-my');
        if ($win.scrollTop() > 0) {
          $header.add(logo).add(Menu).add(search).add(my).addClass('scroll');
          login.addClass('on');
          
        } else {
          $header.add(logo).add(Menu).add(search).add(my).removeClass('scroll');
          login.removeClass('on');
        }
      });
    });
		
    //web market
		var $mainMarket = $('#main-market'),
				$btn = $mainMarket.find('button'),
				$btnClose = $mainMarket.find('a.btn-close'),
				$dimmed = $('.market-dimmed'),
				sp = 800;
		//클릭하면 마켓 열고 마켓버튼 바꾸기
		$btn.on('click', function() {
			$mainMarket.toggleClass('on');
			if ($mainMarket.hasClass('on')) {
				$mainMarket.stop().animate({right: 0}, sp);
				$btn.css({background: 'url(img/tab-market.png) no-repeat'});
				$dimmed.fadeIn();
				$("html, body").css({"overflow":"hidden", "height":"100%"});
        $("#market").on("scroll touchmove mousewheel", function(e) {
          e.preventDefault();
        });
        $("#main-market").on("scroll touchmove mousewheel", function(e) {
          e.stopPropagation();
        }); 
			} else {
				$mainMarket.stop().animate({right: '-800px'}, sp);
				$btn.css({background: 'url(img/tab-market-closed.png) no-repeat'});
        $dimmed.fadeOut();
				$("html, body").css({"overflow":"auto", "height":"auto"});
        $("#market").off("scroll touchmove mousewheel");
        $("#main-market").off("scroll touchmove mousewheel"); 
			}
		});
		//마켓 닫는 함수 정의
		function closeOut() {
			$mainMarket.removeClass('on').stop().animate({right: '-800px'}, sp);
			$btn.css({background: 'url(img/tab-market-closed.png) no-repeat'});
			$dimmed.fadeOut();
			$('#wrap').off('scroll touchmove mousewheel');
		}
		//닫기 함수 실행
		$btnClose.add($dimmed).on('click',function() {
			closeOut();
      $("html, body").css({"overflow":"auto", "height":"auto"});
      $("#market").off("scroll touchmove mousewheel");
      $("#main-market").off("scroll touchmove mousewheel"); 
		});
    
    //레이어팝업
		$('.gnb, .gnb-layer').each(function() {
			var $gnb = $('.gnb'),
					$allMenu = $gnb.find('.gnb-pop'),
					$gnbLayer = $('.gnb-layer'),
					btnClose = $gnbLayer.find('.btn-close-w'),
					$bg = $gnbLayer.find('.layer-bg'),
					$layerMenu = $gnbLayer.find('.layer-menu'),
					$mainList = $layerMenu.find('li'),
					$liatAlla = $mainList.find('a'),
					$menuList = $gnbLayer.find('.menu-list'),
					$btnArea = $menuList.find('.btn-area'),
					btnBack = $btnArea.find('a'),
					$sub = $gnbLayer.find('.sub-list'),
					$subList = $sub.find('li'),
					subListID = $subList.attr('id'),
					$gourmetInfo = $('.gourmet-info'),
					$gourmetDiv = $gourmetInfo.children('div');
			//gnb 클릭하면
			$allMenu.on('click', function(e) {
				e.preventDefault();
				//레이어팝업 열기
				var currentMenu = $(this),
						layerID = $(currentMenu.attr('href'));
				$gnbLayer.add(layerID).fadeIn();
				//배경바꾸기
				//레이어팝업이 처음 떴을 때 배경이미지 값 주기
				if (layerID.attr('id') == 'layer-dining') {
					$bg.css({'background-image': 'url(img/img-gnb-bg_korean.jpg)'});
				} else if (layerID.attr('id') == 'layer-cafe') {
					$bg.css({'background-image': 'url(img/img-gnb-bg_sweet.jpg)'});
				} else if (layerID.attr('id') == 'layer-cupboard') {
					$bg.css({'background-image': 'url(img/img-gnb-bg_cereal.jpg)'});
				} else if (layerID.attr('id') == 'layer-gourmet') {
					$bg.css({'background-image': 'url(img/img-gnb-bg_choma.jpg)'});
				}
				//각 하위 메뉴를 hover했을 때 배경 이미지 바꿔주기
				$mainList.on('mouseover', function() {
					if ($(this).attr('id') != null) {
							var inText = $(this).attr('id');
							$bg.css({'background-image': 'url(img/img-gnb-bg_' + inText + '.jpg)'});
						}
				});
			});
			//하위 메뉴 클릭했을때 음식 리스트 보여주기
			$liatAlla.on('click', function(e) {
				e.preventDefault();
				var currentMenu = $(this),
						menuID = $(this).parent('li').attr('id'),
						menuListID = $(currentMenu.attr('href'));
				$layerMenu.addClass('change');//메뉴명전체 가로값 줄이기
				$mainList.removeClass('on');//전체 메뉴명 글씨색 연하고 선 없애기
				$(this).parent('li').addClass('on');//클릭한 메뉴만 글씨색 진하고 선 보이게
				$menuList.add($btnArea).stop().animate({width: '960px', opacity: 1}).scrollTop(0);//food보이게
				menuListID.siblings().removeClass('on');//클릭 안 한것들 음식list 안보이게
				menuListID.addClass('on');//클릭한 것의 음식list 보이기
				$('#' + menuID + '-info').siblings().fadeOut();
				$('#' + menuID + '-info').fadeIn();//클릭한 것의 info-list 보이기
			});
			//back버튼 -> 음식리스트 닫기
			btnBack.on('click', function() {
				$layerMenu.removeClass('change');
				$mainList.removeClass('on');
				$menuList.add($btnArea).stop().animate({width: 0, opacity: 0});
				$gourmetDiv.fadeOut();
			});
			//레이어팝업 닫기
			btnClose.on('click', function() {
				$gnbLayer.add($layerMenu).fadeOut();
			});
		});//레이어팝업 관련 끝
    
    //brand 배경 움직임
    function simpleParallax() {
      //스크롤 된 거리
      var $brand = $('#brand'),
          scrolled = $win.scrollTop() + 1,
          winHeight = $win.height(),
          brandHeight = $brand.height(),
          brandOutTop = $brand.outerHeight();//1950
      $brand.css({'background-position': '0 ' + (brandOutTop/1.5+winHeight+brandHeight-(scrolled * 1.35)) + 'px'});
    };
    $win.scroll(function(e) {
      simpleParallax();
    });
  } else if ($win.width() > 767 && $win.width() <= 1200) {
    //brand 배경 움직임
    function simpleParallax() {
      //스크롤 된 거리
      var $brand = $('#brand'),
          scrolled = $win.scrollTop() + 1,
          winHeight = $win.height(),
          brandHeight = $brand.height(),
          brandOutTop = $brand.outerHeight();//1950
      $brand.css({'background-position': '0 ' + (brandOutTop/1.5+winHeight+brandHeight-(scrolled * 1.3)) + 'px'});
    };
    $win.scroll(function(e) {
      simpleParallax();
    });
    
    // 스크롤에 따른 header 변경
    $win.scroll( function() {
      var $header = $('header');
      $header.each(function() {
          var logo = $header.find('.logo'),
              Menu = $header.find('.btn-menu'),
              login = $header.find('.btn-login'),
              search = $header.find('.btn-search'),
              my = $header.find('.btn-my');
        if ($win.scrollTop() > 0) {
					$header.addClass('m-scroll');
          login.addClass('on');
          //add(logo).add(Menu).add(search).add(my)
        } else {
					$header.removeClass('m-scroll');
          login.removeClass('on');
        }
      });
    });

		//gnb 모바일버전 잡기

		//gnb 부분 보이기 & util메뉴 보여질때 스크롤 막기
		$('.btn-menu').on('click', function(e) {
			e.preventDefault();
			$('.gnb-bg').fadeIn();
			$('.gnb').addClass('on');
			$("html, body").css({overflow:"hidden", height:"100%"});
			/*$("#wrap").on("scroll touchmove mousewheel", function(e) {
				e.preventDefault();
			});*/
		});
		$('.gnb .btn-close').on('click', function(e) {
			e.preventDefault();
			$('.gnb-bg').add('.layer-menu').hide();
			$('.gnb').css({width: '240px'});
			$('.gnb .btn-back').hide();
			$('.gnb > ul').css({transform: 'none'});
			$('.gnb').removeClass('on');
			$("html, body").css({overflow:"auto", height:"auto"});
			/*$("#wrap").off("scroll touchmove mousewheel");*/
		});

//clone
		//gnb-popUp clone
		$('#gnb-popUp').each(function() {
				var $gnbPop = $(this),
						$clone = $gnbPop.contents().clone(),
						$cloneHTML = $("<div class='gnbPop_clone'></div>");
			
				$cloneHTML.append($clone);
				
				//지정한 영역에 삽입 - gnb태그 제일 아래
				$cloneHTML.prependTo('.gnb');
			});
		//util clone
		$('.util').each(function() {
				var $login = $('.util p'),
						$clone = $login.contents().clone(),
						$cloneHTML = $("<div class='login_clone'></div>");
			
				$cloneHTML.append($clone);
				
				//지정한 영역에 삽입 - gnb태그 제일 아래
				$cloneHTML.appendTo('.gnb');
			});
		
		//레이어팝업
		$('.gnb-bg').each(function() {
			var $gnbBG = $(this),
					$gnb = $gnbBG.find('.gnb'),
					$login = $gnbBG.find('.login_clone'),
					$gnbList = $gnb.children('ul'),
					$allMenu = $gnb.find('.gnb-pop'),
					btnCloseGnb = $gnb.children('.btn-close'),
					btnbackGnb = $gnb.children('.btn-back'),
					$gnbLayer = $gnb.find('.gnbPop_clone'),
					btnClose = $gnbLayer.find('.btn-close-w'),
					$layerMenu = $gnbLayer.find('.layer-menu'),
					$mainList = $layerMenu.find('li'),
					$liatAlla = $mainList.find('a'),
					$menuList = $gnbLayer.find('.menu-list'),
					$btnArea = $menuList.children('.btn-area'),
					btnBack = $btnArea.find('.btn-back'),
					btnClose = $btnArea.find('.btn-close'),
					$sub = $gnbLayer.find('.sub-list'),
					$subList = $sub.find('li'),
					subListID = $subList.attr('id'),
					$gourmetInfo = $('.gourmet-info'),
					$gourmetDiv = $gourmetInfo.children('div');
			//gnb 클릭하면
			$allMenu.on('click', function(e) {
				e.preventDefault();
				//레이어팝업 열기
				var currentMenu = $(this),
						layerID = $(currentMenu.attr('href'));
				$gnb.add($login).css({width: '100%'});
				btnCloseGnb.show();
				btnbackGnb.show();
				layerID.fadeIn();
				$gnbList.css({transform: 'translateX(-100%)'});
			});
			//popup 1차로 열렸을 때 back버튼
			btnbackGnb.on('click', function(e) {
				e.preventDefault();
				$gnb.add($login).css({width: '240px'});
				btnbackGnb.hide();
				$layerMenu.hide();
				$gnbList.css({transform: 'none'});
			});
			//하위 메뉴 클릭했을때 음식 리스트 보여주기
			$liatAlla.on('click', function(e) {
				e.preventDefault();
				var currentMenu = $(this),
						menuID = $(this).parent('li').attr('id'),
						menuListID = $(currentMenu.attr('href'));
				$layerMenu.css({left: '-100%'});
				btnCloseGnb.add(btnbackGnb).fadeOut();
				btnBack.show();
				$btnArea.css({opacity: 1});
				$menuList.stop().animate({width: '100%', opacity: 1}).scrollTop(0);//food보이게
				menuListID.siblings().removeClass('on');//클릭 안 한것들 음식list 안보이게
				menuListID.addClass('on');//클릭한 것의 음식list 보이기
				$('#' + menuID + '-info').siblings().fadeOut();
				$('#' + menuID + '-info').fadeIn();//클릭한 것의 info-list 보이기
			});
			//back버튼 -> 음식리스트 닫기
			btnBack.on('click', function() {
				$layerMenu.css({left: 0});
				btnCloseGnb.add(btnbackGnb).show();
				$btnArea.css({opacity: 0});
				$menuList.stop().animate({width: 0, opacity: 0});
				$gourmetDiv.fadeOut();
			});
			//레이어팝업 닫기
			btnClose.on('click', function() {
				$layerMenu.css({left: 0});
				$layerMenu.fadeOut();
				$gnbBG.add($layerMenu).hide();
				$gnb.css({width: '240px'});
				btnbackGnb.hide();
				$gnbList.css({transform: 'none'});
				$gnb.removeClass('on');
				$layerMenu.css({left: 0});
				$btnArea.css({opacity: 0});
				$menuList.stop().animate({width: 0, opacity: 0});
				$gourmetDiv.hide();
				$("html, body").css({overflow:"auto", height:"auto"});
			});
      
		});//레이어팝업 관련 끝

    //모바일 market
    var $mainMarket = $('#main-market'),
				$btn = $mainMarket.find('button'),
				$btnClose = $mainMarket.find('a.btn-close'),
				$btnBack = $mainMarket.find('a.btn-back'),
				$dimmed = $('.market-dimmed'),
				sp = 800;
    var $gnbBG = $('.gnb-bg'),
        $gnb = $('.gnb'),
        $login = $('.login_clone'),
        $gnbList = $gnb.children('ul');
    $('.gnb-market').on('click', function() {
			$mainMarket.addClass('on');
      $gnb.add($login).css({width: '100%'});
      $gnbList.css({transform: 'translateX(-100%)'});
      $("html, body").css({"overflow":"hidden", "height":"100%"});
      $("#market").on("scroll touchmove mousewheel", function(e) {
        e.preventDefault();
      });
      $("#main-market").on("scroll touchmove mousewheel", function(e) {
        e.stopPropagation();
      });
		});
    //뒤로
    $btnBack.on('click',function() {
			$mainMarket.removeClass('on');
      $gnb.add($login).css({width: '240px'});
      $gnbList.css({transform: 'none'});
		});
		//닫기
		$btnClose.on('click',function() {
			$mainMarket.removeClass('on');
      $gnb.add($login).css({width: '240px'});
      $gnbList.css({transform: 'none'});
      $gnbBG.hide();
			$gnb.removeClass('on');
      $("html, body").css({"overflow":"auto", "height":"auto"});
      $("#market").off("scroll touchmove mousewheel");
      $("#main-market").off("scroll touchmove mousewheel"); 
		});
  } else {
		// 스크롤에 따른 header 변경
    $win.scroll( function() {
      var $header = $('header');
      $header.each(function() {
          var logo = $header.find('.logo'),
              Menu = $header.find('.btn-menu'),
              login = $header.find('.btn-login'),
              search = $header.find('.btn-search'),
              my = $header.find('.btn-my');
        if ($win.scrollTop() > 0) {
					$header.addClass('m-scroll');
          login.addClass('on');
          //add(logo).add(Menu).add(search).add(my)
        } else {
					$header.removeClass('m-scroll');
          login.removeClass('on');
        }
      });
    });

		//gnb 모바일버전 잡기

		//gnb 부분 보이기 & util메뉴 보여질때 스크롤 막기
		$('.btn-menu').on('click', function(e) {
			e.preventDefault();
			$('.gnb-bg').fadeIn();
			$('.gnb').addClass('on');
			$("html, body").css({overflow:"hidden", height:"100%"});
			/*$("#wrap").on("scroll touchmove mousewheel", function(e) {
				e.preventDefault();
			});*/
		});
		$('.gnb .btn-close').on('click', function(e) {
			e.preventDefault();
			$('.gnb-bg').add('.layer-menu').hide();
			$('.gnb').css({width: '240px'});
			$('.gnb .btn-back').hide();
			$('.gnb > ul').css({transform: 'none'});
			$('.gnb').removeClass('on');
			$("html, body").css({overflow:"auto", height:"auto"});
			/*$("#wrap").off("scroll touchmove mousewheel");*/
		});

//clone
		//gnb-popUp clone
		$('#gnb-popUp').each(function() {
				var $gnbPop = $(this),
						$clone = $gnbPop.contents().clone(),
						$cloneHTML = $("<div class='gnbPop_clone'></div>");
			
				$cloneHTML.append($clone);
				
				//지정한 영역에 삽입 - gnb태그 제일 아래
				$cloneHTML.prependTo('.gnb');
			});
		//util clone
		$('.util').each(function() {
				var $login = $('.util p'),
						$clone = $login.contents().clone(),
						$cloneHTML = $("<div class='login_clone'></div>");
			
				$cloneHTML.append($clone);
				
				//지정한 영역에 삽입 - gnb태그 제일 아래
				$cloneHTML.appendTo('.gnb');
			});
		
		//레이어팝업
		$('.gnb-bg').each(function() {
			var $gnbBG = $(this),
					$gnb = $gnbBG.find('.gnb'),
					$login = $gnbBG.find('.login_clone'),
					$gnbList = $gnb.children('ul'),
					$allMenu = $gnb.find('.gnb-pop'),
					btnCloseGnb = $gnb.children('.btn-close'),
					btnbackGnb = $gnb.children('.btn-back'),
					$gnbLayer = $gnb.find('.gnbPop_clone'),
					btnClose = $gnbLayer.find('.btn-close-w'),
					$layerMenu = $gnbLayer.find('.layer-menu'),
					$mainList = $layerMenu.find('li'),
					$liatAlla = $mainList.find('a'),
					$menuList = $gnbLayer.find('.menu-list'),
					$btnArea = $menuList.children('.btn-area'),
					btnBack = $btnArea.find('.btn-back'),
					btnClose = $btnArea.find('.btn-close'),
					$sub = $gnbLayer.find('.sub-list'),
					$subList = $sub.find('li'),
					subListID = $subList.attr('id'),
					$gourmetInfo = $('.gourmet-info'),
					$gourmetDiv = $gourmetInfo.children('div');
			//gnb 클릭하면
			$allMenu.on('click', function(e) {
				e.preventDefault();
				//레이어팝업 열기
				var currentMenu = $(this),
						layerID = $(currentMenu.attr('href'));
				$gnb.add($login).css({width: '100%'});
				btnCloseGnb.show();
				btnbackGnb.show();
				layerID.fadeIn();
				$gnbList.css({transform: 'translateX(-100%)'});
			});
			//popup 1차로 열렸을 때 back버튼
			btnbackGnb.on('click', function(e) {
				e.preventDefault();
				$gnb.add($login).css({width: '240px'});
				btnbackGnb.hide();
				$layerMenu.hide();
				$gnbList.css({transform: 'none'});
			});
			//하위 메뉴 클릭했을때 음식 리스트 보여주기
			$liatAlla.on('click', function(e) {
				e.preventDefault();
				var currentMenu = $(this),
						menuID = $(this).parent('li').attr('id'),
						menuListID = $(currentMenu.attr('href'));
				$layerMenu.css({left: '-100%'});
				btnCloseGnb.add(btnbackGnb).fadeOut();
				btnBack.show();
				$btnArea.css({opacity: 1});
				$menuList.stop().animate({width: '100%', opacity: 1}).scrollTop(0);//food보이게
				menuListID.siblings().removeClass('on');//클릭 안 한것들 음식list 안보이게
				menuListID.addClass('on');//클릭한 것의 음식list 보이기
				$('#' + menuID + '-info').siblings().fadeOut();
				$('#' + menuID + '-info').fadeIn();//클릭한 것의 info-list 보이기
			});
			//back버튼 -> 음식리스트 닫기
			btnBack.on('click', function() {
				$layerMenu.css({left: 0});
				btnCloseGnb.add(btnbackGnb).show();
				$btnArea.css({opacity: 0});
				$menuList.stop().animate({width: 0, opacity: 0});
				$gourmetDiv.fadeOut();
			});
			//레이어팝업 닫기
			btnClose.on('click', function() {
				$layerMenu.css({left: 0});
				$layerMenu.fadeOut();
				$gnbBG.add($layerMenu).hide();
				$gnb.css({width: '240px'});
				btnbackGnb.hide();
				$gnbList.css({transform: 'none'});
				$gnb.removeClass('on');
				$layerMenu.css({left: 0});
				$btnArea.css({opacity: 0});
				$menuList.stop().animate({width: 0, opacity: 0});
				$gourmetDiv.hide();
				$("html, body").css({overflow:"auto", height:"auto"});
			});
      
		});//레이어팝업 관련 끝

    //모바일 market
    var $mainMarket = $('#main-market'),
				$btn = $mainMarket.find('button'),
				$btnClose = $mainMarket.find('a.btn-close'),
				$btnBack = $mainMarket.find('a.btn-back'),
				$dimmed = $('.market-dimmed'),
				sp = 800;
    var $gnbBG = $('.gnb-bg'),
        $gnb = $('.gnb'),
        $login = $('.login_clone'),
        $gnbList = $gnb.children('ul');
    $('.gnb-market').on('click', function() {
			$mainMarket.addClass('on');
      $gnb.add($login).css({width: '100%'});
      $gnbList.css({transform: 'translateX(-100%)'});
      $("html, body").css({"overflow":"hidden", "height":"100%"});
      $("#market").on("scroll touchmove mousewheel", function(e) {
        e.preventDefault();
      });
      $("#main-market").on("scroll touchmove mousewheel", function(e) {
        e.stopPropagation();
      });
		});
    //뒤로
    $btnBack.on('click',function() {
			$mainMarket.removeClass('on');
      $gnb.add($login).css({width: '240px'});
      $gnbList.css({transform: 'none'});
		});
		//닫기
		$btnClose.on('click',function() {
			$mainMarket.removeClass('on');
      $gnb.add($login).css({width: '240px'});
      $gnbList.css({transform: 'none'});
      $gnbBG.hide();
			$gnb.removeClass('on');
      $("html, body").css({"overflow":"auto", "height":"auto"});
      $("#market").off("scroll touchmove mousewheel");
      $("#main-market").off("scroll touchmove mousewheel"); 
		});

  }

});