$(function () {
  // 일반팝업
  if ($('[data-popup]').length) {
    var $popup_con = $('[data-popup-content]');
    var $popup = $('[data-popup]');

    $popup.on('click', function () {
      var $popup_txt = $(this).attr('data-popup');

      $popup_con.each(function () {
        var $txt = $(this).attr('data-popup-content');
        if ($txt == $popup_txt) {
          $(this).fadeIn(300);
          dim_open();
        }
      });
    });
  }

  function pop_close() {
    $(this).parents('.popup').fadeOut(300);
    dim_close();
  }
  $('.btn-close').on('click', function () {
    pop_close();
  });

  function dim_open() {
    $('body').append('<div class="dimmed"></div>');
  }
  function dim_close() {
    $('.dimmed').remove();
  }

  // 바닥클릭시 닫기
  $(document).mouseup(function (e) {
    var popup = $('.layer_popup, .location .only-mobile ul');
    if (popup.has(e.target).length === 0) {
      popup.fadeOut(200);
    }
  });

  // select
  $('.select button').on('click', function () {
    var $ul = $(this).next('ul').attr('style');
    var txt = $(this).text();

    if ($ul == 'display: none;' || $ul == undefined) {
      $(this).addClass('active');
    }
    $(this).next('ul').toggle();
    $(this)
      .parents('.select__list')
      .hide()
      .prev('button')
      .text(txt)
      .removeClass('active');
  });

  // 탭메뉴
  $('.tabs nav li').on('click', function () {
    var txt = $(this).parents('nav').attr('class');
    var idx = $(this).index();

    $(this)
      .addClass(txt + '--active')
      .siblings()
      .removeClass();
    $(this)
      .parents('nav')
      .siblings('article')
      .eq(idx)
      .addClass('active')
      .siblings('article')
      .removeClass('active');
  });

  // 스크롤
  $(window).on('scroll', function () {
    $scr = $(this).scrollTop();

    if ($scr > 100) {
      $('body').addClass('fix');
    } else {
      $('body').removeClass('fix');
    }
  });

  // top버튼
  function scrTop() {
    $('body, html').animate(
      {
        scrollTop: 0,
      },
      300
    );
  }
  $('.btn-top').on('click', function () {
    scrTop();
  });

  // 반응형 테이블
  function table_wrap() {
    $('.table-wrap').on('click', function () {
      $(this).addClass('active');
    });
  }

  // FAQ
  $('.board-faq__question').on('click', function () {
    $(this)
      .parent()
      .addClass('board-faq--active')
      .siblings()
      .removeClass()
      .children('.board-faq__answer')
      .slideUp();
    $(this).next().slideDown();
  });

  // 갤러리
  if ($('.gallery-box').length) {
    $('.gallery-box__list').each(function () {
      let img = $(this).children('li').eq(0).find('img').attr('src');

      $(this).prev('.gallery-box__big').children('img').attr('src', img);
    });
    $('.gallery-box__list li').each(function () {
      let alt = $(this).parents('.gallery-box').prev('.h4').text();
      let idx = $(this).index() + 1;

      $(this)
        .find('img')
        .attr('alt', alt + ' 이미지' + idx);
    });

    $('.gallery-box__list button').on('click', function () {
      let img = $(this).children('img').attr('src');
      $(this)
        .parents('.gallery-box')
        .find('.gallery-box__big img')
        .attr('src', img);
    });
  }

  // 댓글
  $('.btn-comment').on('click', function () {
    $(this).next().toggle();
    $(this).toggleClass('active');
  });

  // 브래드크럼스
  $('.location .only-mobile button').click(function () {
    $(this).parent().siblings('div').children('ul').slideUp();
    $(this).next().stop().slideToggle();
  });

  // resize
  var resizeTimer;
  $(window).on('resize load', function () {
    var $wid = $(window).innerWidth();

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var $wid = $(this).width();
      if ($wid < 1024) {
        // 표 반응형
        if ($('.table-wrap').length != true) {
          $('.table-type2, table.wrap').wrap('<div class="table-wrap"></div>');
          table_wrap();
        }
      } else {
        // 표 반응형
        if ($('.table-wrap').length != false) {
          $('.table-type2, table.wrap').unwrap();
        }
      }
    }, 250);
  });
});
