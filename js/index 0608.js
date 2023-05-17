$(function () {

	$('#fullpage').fullpage({
		//options here
		autoScrolling: true,
		scrollHorizontally: true,
		navigation: true,
		dragAndMove: true,
		slidesNavigation: false,
	});
	//////////////////////////// 더보기메뉴 ////////////////////////////

	let hidemenuBtn = $('#hidemenu'),
	hidemenu=$('#hidemenu_wrap'),
	hidemenuClose=$('#close_btn');

	hidemenuBtn.click(function () {

		hidemenu.css({
			display:'block',
			// transitionDuration: '1s',
		});

	});

	hidemenuClose.click(function(){

		hidemenu.css({
			display:'none',
			// transitionDuration: '1s',
		});

	});


	//////////////////////////// 헤더메뉴 ////////////////////////////

	// 서브메뉴 호버 >> 폰트 컬러 바꾸기

	let submenu = $('.sub_menu>a');

	submenu.hover(function () {
		$(this).css({
			color: '#7f1085'
		})
	}, function () {
		$(this).css({
			color: '#333'
		});
	});

	//////////////////////////// 섹션3 ////////////////////////////

	// 타이어메뉴 호버 > 타이어 회전

	let tire_text = $('.tire_text>span'),
		tire_img = $('#sec03_Rtire');

	tire_text.hover(function () {

		tire_img.css({
			transform: 'rotate(25deg)',
			transitionDuration: '1s',
		});

	}, function () {

		tire_img.css({
			transform: 'rotate(0deg)',
			transitionDuration: '1s',
		});

	});




	// // 타이어메뉴 클릭 > 해당 컨텐츠 보이기 - 초기에 보이는 건 첫번째 li : A_history
	// 클릭된 타이어메뉴는 보라색 + 나머지는 그레이


	$('.tire_text').each(function(index){

		$(this).attr('data-index',index);


	}).click(function(){
		i=$(this).attr('data-index');

		$('.sec03_box').css({
			display: 'none'
		});
		$('.sec03_box').eq(i).css({
			display: 'block'
		});

		$('.tire_text').removeClass('on');

		$('.tire_text').eq(i).addClass('on');


	});














	//////////////////////////// 섹션4 ////////////////////////////

	/////////////// 왼쪽 //////////////

	// 이미지 호버 > 이미지 확대 + 텍스트 올라오기

	let sec4_leftimg = $('.sec04_left_img'),
		sec4_leftimg_img = $('.sec04_left_img img'),
		sec4_leftimg_text = $('.sec04_left_imgtext');

	// 이미지 확대
	sec4_leftimg.hover(function () {

		$(this).find('img').css({
			transform: 'scale(1.1)',
			transitionDuration: '1s',
		});
		$(this).find('.sec04_left_imgtext').css({
			bottom: '0'
		});

	}, function () {

		$(this).find('img').css({
			transform: 'scale(1)',
			transitionDuration: '1s',
		});
		$(this).find('.sec04_left_imgtext').css({
			bottom: '-30px'
		});

	});


	///////////// 오른쪽 ///////////////

	let sec4_rightimgA_img = $('.sec04_right_imgA img'),
	sec4_rightimgB_img = $('.sec04_right_imgB img');



	sec4_rightimgA_img.hover(function () {

		$(this).css({
			transform: 'scale(1.1)',
			// height: '180%',
			transitionDuration: '1s',
			opacity: '25%',
		});

	}, function () {

		$(this).css({
			// height: '150%',
			transform: 'scale(1)',
			transitionDuration: '1s',
			opacity: '100%',
		});

	});



	sec4_rightimgB_img.hover(function () {

		$(this).css({
			transform: 'scale(1.1)',
			// height: '180%',
			transitionDuration: '1s',
			opacity: '50%',
		});

	}, function () {

		$(this).css({
			// height: '150%',
			transform: 'scale(1)',
			transitionDuration: '1s',
			opacity: '100%',
		});

	});


let ww=$(window).width();

console.log(ww);

function layout(){
	if(ww>501){
		$('#mobile_splash').hide();
	}
	else if(ww<=501){

		$('#mobile_splash').fadeIn(500);
		$('#mobile_splash').delay(2000).animate({
			opacity: 0,
		},500)
	}
}


layout();

$(window).resize(function(){
	ww=$(window).width();
	layout();
})







}); //end