jQuery(document).ready(function($){
	$('.button').each(function(){
		$(this).click(function(){
			$(this).find('audio')[0].play();
		});
	});
});

$('.scrollbutton').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});