(function ($) {
	var $menu = $('#topmenu');
	var $advers = $('#advers');
	if (document.addEventListener) {
		document.addEventListener('DOMMouseScroll',mScroll, false);
	}
	$(document).on('mousewheel',mScroll);
	function mScroll() {
		var $scrollTop = $(window).scrollTop();
		if($scrollTop >=window.topMenuScroll){
			$menu.css('position','fixed');
			$advers.css('marginTop',$menu.innerHeight());
		}else if ($scrollTop < window.topMenuScroll){
			$menu.css('position','');
			$advers.css('marginTop','0');
		}
	}
})(jQuery);