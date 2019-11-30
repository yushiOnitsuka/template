// ---------------------------------------------
//カーソル追従
// ---------------------------------------------

$(function(){
    var ua = navigator.userAgent;
      if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        $(".c-cursor").hide();
        $(".c-cursor--follower").hide();
      } else {
      var
      cursor = $(".c-cursor"),
      follower = $(".c-cursor--follower"),
      cWidth = 24, //カーソルの大きさ
      fWidth = 80, //フォロワーの大きさ
      delay = 10, //数字を大きくするとフォロワーがより遅れて来る
      mouseX = 0, //マウスのX座標
      mouseY = 0, //マウスのY座標
      posX = 0, //フォロワーのX座標
      posY = 0; //フォロワーのX座標
      
      TweenMax.to({}, .001, {
        repeat: -1,
        onRepeat: function() {
          posX += (mouseX - posX) / delay;
          posY += (mouseY - posY) / delay;
          
          TweenMax.set(follower, {
              css: {    
                left: posX - (fWidth / 2),
                top: posY - (fWidth / 2)
              }
          });
          TweenMax.set(cursor, {
              css: {    
                left: mouseX - (cWidth / 2),
                top: mouseY - (cWidth / 2)
              }
          });
        }
      });
      
      $(document).on("mousemove", function(e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
      });
      
      $(".js-cursor").on({
        "mouseenter": function() {
          cursor.addClass("is-active");
          follower.addClass("is-active--follower");
        },
        "mouseleave": function() {
          cursor.removeClass("is-active");
          follower.removeClass("is-active--follower");
        }
      }); 
      }
  });



// ---------------------------------------------
//ローダー
// ---------------------------------------------

var loader = document.getElementById('js-loader');
window.addEventListener('load', function(){
setTimeout(function(){ 
    loader.style.display = "none"; 
    }, 1000);
});

//初回アクセスだけローダー
var loader = document.getElementById('js-loader');
if(sessionStorage.getItem("access") == null){
    window.addEventListener('load', function(){
        setTimeout(function(){ 
            loader.style.display = "none"; 
            }, 3000);
        });
    sessionStorage.setItem("access","on");
    }else{
        loader.classList.remove('c-loader--01'); //2回目以降の挙動
    }


// ---------------------------------------------
// スムーススクロール
// ---------------------------------------------
if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
	$(function(){
	   $('a[href^="#"]').on('click', function(){
		  var speed = 400;
		  var href= $(this).attr('href');
		  var target = $(href == '#' || href == '' ? 'html' : href);
		  var position = target.offset().top;
		  var headerHight = 120;
		  $('body,html').animate({scrollTop:position - headerHight}, speed, 'swing');
		  return false;
	   });
	});
}
if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
	$(function(){
	   $('a[href^="#"]').on('click', function(){
		  var speed = 400;
		  var href= $(this).attr('href');
		  var target = $(href == '#' || href == '' ? 'html' : href);
		  var position = target.offset().top;
		  $('body,html').animate({scrollTop:position}, speed, 'swing');
		  return false;
	   });
	});
}

// ※備考 -----------------------------------
//※1
// ☆ = ○ ? △ : □
//○ が true であれば☆ に △ の値を代入，
//○ が true でなければ☆ に □ の値を代入。
//以下と同じ構文
//if(href == "#" || href == ""){
//   var target = $('html');
//}else{
//   var target = $(href);
//}
//hrefの中身が空の場合でもtopにスムーズスクロールさせるための記述
// ------------------------------------------


// ---------------------------------------------
// pc_header固定
// ---------------------------------------------
$(function() {
    var header = $('.l-header');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            header.addClass('l-header--scroll');
        } else {
            header.removeClass('l-header--scroll');
        }
    });
});

// active
$('.l-header__toggle').click(function(){
	$('.l-header__pc__li').toggleClass('is-slide');
	$(this).toggleClass('is-active');
	return false;
});


// ---------------------------------------------
// ハンバーガーメニュー
// ---------------------------------------------

var wrapper = document.querySelector('.l-header__sp');
var navBtn = document.querySelector('.c-humberger');
var width = $(window).width();

navBtn.addEventListener('click', navToggle = function() {
    wrapper.classList.toggle('l-header__sp--open');
    $('body,html').toggleClass('js-fix');
});


//ハンバーガーが表示される幅以外ではナビを消す
$(window).resize(function(){
    var width = $(window).width();
    var l = 1024;
    if (width > l) {
        $('.l-header__sp').removeClass('l-header__sp--open');
    }
});



// ---------------------------------------------
//ヒーローヘッダー
// ---------------------------------------------


var heroHeader = function(){
    var header = document.getElementById('js-helo');
    var wHight = window.innerHeight;
    header.style.height = wHight + "px";
}
document.addEventListener('DOMContentLoaded',function(){
    heroHeader();
});
window.addEventListener( 'resize', function () {
    heroHeader();
});


// ---------------------------------------------
//アコーディオン
// ---------------------------------------------


$(function(){
	$('.c-accordion__cont').hide();
	$('.c-accordion__title').click(function(){
		$(this).toggleClass('is-open');
		$('+ .c-accordion__cont',this).slideToggle();
		return false;
	});
});

// スクロール
tatchMoveFlag = 0;
$(function(){
    $('.c-accordion--scroll__cont').hide();
    $('.c-accordion--scroll__title').click(function(){
        tatchMoveFlag = 1
        $(this).toggleClass('is-open');
        $("+.c-accordion--scroll__cont",this).stop().slideToggle(function(){
            var headerHeight = $('.l-header--scroll').outerHeight();
            var p_cont_header = $(this).prev('.c-accordion--scroll__title').offset().top - headerHeight ;
            var p_cont = $(this).prev('.c-accordion--scroll__title').offset().top ;
            if($('.l-header--scroll').position().top == 0){
                $('html,body').animate({scrollTop:p_cont_header}, 500);
            } else if ($('.l-header--scroll').position().top < 0) {
                $('html,body').animate({scrollTop:p_cont}, 500);
            }
            $(function(){
                setTimeout(function(){
                    tatchMoveFlag = 0;
                },1000);
            });
        });
        $($('.c-accordion--scroll__title').next('.c-accordion--scroll__cont')).not($(this).next('.c-accordion--scroll__cont')).slideUp();
        $('.c-accordion--scroll__title').not($(this)).removeClass('is-open');
        return false;
    });
});


// ---------------------------------------------
// カルーセル
// ---------------------------------------------

$(function(){
	$('.p-carousel__content').on('init', function(event, slick) {
		//スライド数を表示する
        $(this).append('<div class="slick-counter"><span class="current"></span> / <span class="total"></span></div>');
        $('.current').text(slick.currentSlide + 1);
        $('.total').text(slick.slideCount);
      })
      .slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 768,  //ブレイクポイントを指定
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }]
    })
    .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.current').text(nextSlide + 1);
      });
});


// ---------------------------------------------
// match-height
// ---------------------------------------------

$(function() {
	$('.js-matchheight').matchHeight();
});


// ---------------------------------------------
// タブ切り替え
// ---------------------------------------------

$(".c-tab__tab").on("click",function(){
	var $th = $(this).index();
	$(".c-tab__tab").removeClass("is-active");
	$(".c-tab__content").removeClass("is-active");
	$(this).addClass("is-active");
	$(".c-tab__content").eq($th).addClass("is-active");
});

// ---------------------------------------------
// スマホ・タブレットhoverなし
// ---------------------------------------------

var touch = 'ontouchstart' in document.documentElement
            || navigator.maxTouchPoints > 0
            || navigator.msMaxTouchPoints > 0;
 
if (touch) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;
 
            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;
 
                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}


// ---------------------------------------------
// スクロールアニメーション
// ---------------------------------------------

$(function(){
    $(window).scroll(function (){
        $('.js-fadein,.js-fadein_continuous,.js-slidein-right,.js-slidein-left').each(function(){
            var targetElement = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
                if (scroll > targetElement - windowHeight + 200){
                    $(this).addClass('is-active');
                }
            } else{
                if (scroll > targetElement - windowHeight + 300){
                    $(this).addClass('is-active');
                }
            }
        });
    });
});



// ---------------------------------------------
// svg animation スクロールイベント
// ---------------------------------------------

//animationの関数を作る
function svg_01() {
    var tl = new TimelineMax({
        repeat: -1,
        yoyo: true
    });
    //配列でまとめてアニメーション
    //tl.staggerTo(['.p-svg__02--body','.p-svg__02--face','.p-svg__02--btn'], 0.5, {rotation:360,transformOrigin: "50% 50%"}, 0.2)　
    tl.to(".p-svg__02--hair" , 1 , 
    {
        autoAlpha: 0
    }
    ) 
    .to(".p-svg__02--body" , 1 ,
    {
        autoAlpha: 0
    }
    , '-=0', '-=0' ); //"前の要素より*秒早く","前の要素のアニメーションが終わる*秒前から"　
    return tl;
}

$(function(){
    $(window).scroll(function (){
        $('.js-svg_animetion').each(function(){
            var targetElement = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            //mastertimelineのインスタンスを作成
            var master = new TimelineMax();
            if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
                if (scroll > targetElement - windowHeight + 200){
                    //mastertimelineで必要な時に呼び出す
                    master.add(svg_01());
                }
            } else{
                if (scroll > targetElement - windowHeight + 300){
                    master.add(svg_01());
                }
            }
        });
    });
});

// ---------------------------------------------
// オプション
// var tl = new TimelineMax({
//     repeat: -1,　//回数分のリピート。-1は永久に反復
//     yoyo: true,　//反復リピート
//     paused: true, //アニメーション停止
//     repeatDelay: 1, //リピートを開始させるまでの待ち時間
//     delay: 1,
// });


// //メソッド
// tl.set('.class', {})　//cssをセットする
// tl.to('.class', {})　//cssを動かす
// tl.from('.class', {})　//toと逆の動き
// tl.fromTo('.class', {})　//fromからtoまでのcssを記述
// tl.staggerTo(['.class01','.class02','.class03'], {})　//配列を順番にアニメーション。全て同じアニメーションならこれが見やすい。
// tl.staggerFrom('.class', {})　//staggerToと逆の動き
// tl.staggerFromTo('.class', {})　//fromからtoまでを全体の要素に指定できる。
// tl.eventCallback("onComplete",end); //アニメーション終了時に関数を追加できる。
// function end() {
//     console.log("aaa");
// }


// //個別の動きの制御(https://reiwinn-web.net/2017/06/07/tweenmax/)
// tl_02.to(".p-svg__03--body" , 1 , 
//     {
//     ease: Power4.easeOut, //イージング（https://greensock.com/ease-visualizer）
//     ease: Back.easeOut.config(4), //イージングの後逆再生。()で逆再生の長さ指定。
//     transformOrigin: "50% 50%", //要素の原点
//     rotation:360, //回転
//     scale: 1.5, //変形（拡大・縮小）
//     width: 100, //オブジェクトの幅
//     height: 100, //オブジェクトの高さ
//     x: 100,//X軸のtranslate
//     y: 100, //y軸のtranslate
//     alpha: 0, //透明度。要素がクリックできる。(opacuty)
//     autoAlpha: 0, //透明度。要素がクリックできない。（display:none）
//     backgroundColor: "#333",//背景色
//     drawSVG:"0 0"　//<path>に指定してストローク描写。pathにはstroke-width,strokeを指定　→有料！！
//     }
//     ,'-=2','-=0.2' //"前の要素より2秒早く","前の要素のアニメーションが終わる0.2秒前から"　
// );

// ---------------------------------------------

// ---------------------------------------------
// lottie
// ---------------------------------------------

var lottieObj = lottie.loadAnimation({
    container: document.getElementById('motion_01'), // 表示させたい要素を渡します
    renderer: 'svg', // 描画形式を指定します. // svg or canvas or html svg以外ちゃんとためしてないですが
    loop: true, // trueにしたらループです。1回再生の場合はfalseで
    autoplay: true, // 自動再生です。falseの場合は自分のタイミングで
    path: '/dist/json/motion_01.json' // 再生させたいアニメーションのjsonのパスを指定します。
});