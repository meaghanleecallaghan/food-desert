**
	Author: http://codecanyon.net/user/sike?ref=sike
*/

;(function($) {
    $.fn.hotSpot = function(options) {
	   	// plugin default options
		var settings = {
			easeIn: 'cardInLeft',
			triggerBy: 'hover',  /* hover | click */
			delay: 600,
			slideshow: true,
			loop: true,
			autoHide: true,
			slideshowDelay: 2000,
			sticky: true
		};

		// extends settings with options provided
        if (options) {
			$.extend(settings, options);
		}

		var _this = this;

		var _allowOut = true;
		_this.data('_allowOut', _allowOut);
		var _popOutID;
		var _popArr = [];
		_this.data('slideshow', settings.slideshow);
		$('.popover', _this).each(function(index) {
			_popArr[index] = $(this).data('index', index);
			if(settings.sticky){
				$(this).on('mouseover', function(event) {
					clearTimeout(_popOutID);
					clearTimeout(_slideID);
					_this.data('_allowOut', false);
				}).on('mouseleave', function(event) {
					if(settings.autoHide){
						clearTimeout(_popOutID);
						_popOutID = setTimeout(function() {
							_this.data('_allowOut', true);
	 	                   	if(Modernizr.csstransitions){
								_currentPop.removeClass(_currentPop.data('easein')).addClass(_currentPop.data('easeout')).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(event) {
									clearTimeout(_slideID);
									if(_this.data('slideshow')) startSlideshow();
								});
							}else{
								_currentPop.animate({opacity: 0}, 300, function(){
									clearTimeout(_slideID);
									if(_this.data('slideshow')) startSlideshow();
								});
							}
							_currentPop.data('isshow', false);
						}, settings.delay);
					}
				});
			}
		});

		var _slideID, _currentPopIndex = 0;
	    var _currentPop = null;
		if (settings.slideshow) {
			function startSlideshow(){
				clearTimeout(_slideID);
				_slideID = setTimeout(function() {
					nextPop();
				}, settings.slideshowDelay);
			}

	 	    if(Modernizr.csstransitions){
				_popArr[_currentPopIndex].show().removeClass(_popArr[_currentPopIndex].data('easeout')).addClass('animated ' + _popArr[_currentPopIndex].data('easein')).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(event) {
					startSlideshow();
				});
			}else{
				_popArr[_currentPopIndex].show().animate({opacity: 1}, 300, function(){
					startSlideshow();
				});
			}
			_popArr[_currentPopIndex].data('isshow', true);
			_currentPop = _popArr[_currentPopIndex];

			function nextPop(){
				clearTimeout(_slideID);
				var _tmpCurrentPop = _popArr[_currentPopIndex];
				if(_tmpCurrentPop!=null){
					if(Modernizr.csstransitions){
						_tmpCurrentPop.removeClass(_tmpCurrentPop.data('easein')).addClass(_tmpCurrentPop.data('easeout'));
					}else{
						_tmpCurrentPop.animate({
							opacity: 0},
							300, function() {
							$(this).hide();
						});
					}
					_tmpCurrentPop.data('isshow', false);

				}
				_currentPopIndex++;
				if(_currentPopIndex>_popArr.length - 1) {
					if(settings.loop){
						_currentPopIndex = 0;
					}else{
						return false;
					}
				}
				if(Modernizr.csstransitions){
					_popArr[_currentPopIndex].show().removeClass(_popArr[_currentPopIndex].data('easeout')).addClass('animated ' + _popArr[_currentPopIndex].data('easein')).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(event) {
						if(_this.data('slideshow')) startSlideshow();
					});
				}else{
					_popArr[_currentPopIndex].show().animate({opacity: 1}, 300, function(){
						if(_this.data('slideshow')) startSlideshow();
					});
				}

				_popArr[_currentPopIndex].data('isshow', true);
				_currentPop = _popArr[_currentPopIndex];

			}

		};

		$('.info-icon', _this).each(function(index) {
			if(settings.triggerBy=="hover"){
				$(this).on('mouseover', function(event) {
					clearTimeout(_popOutID);
					clearTimeout(_slideID);
					if(_currentPop!=null && !_currentPop.is($('#'+$(this).data('target')))){
						if(Modernizr.csstransitions){
							_currentPop.removeClass(_currentPop.data('easein')).addClass(_currentPop.data('easeout'));
						}else{
							_currentPop.animate({
								opacity: 0 },
								300, function() {
									$(this).hide();
							});
						}
						_currentPop.data('isshow', false);
					}
					_currentPop = $('#'+$(this).data('target'));
					_currentPopIndex = _currentPop.data('index');
					if(Modernizr.csstransitions){
						_currentPop.show().removeClass(_currentPop.data('easeout')).addClass('animated ' + _currentPop.data('easein'))
					}else{
						_currentPop.show().animate({opacity: 1}, 300);
					}

					_currentPop.data('isshow', true);
				}).on('mouseleave', function(event) {
					_currentPop = $('#'+$(this).data('target'));
					if(_this.data('_allowOut')&&settings.autoHide){
						clearTimeout(_popOutID);
						_popOutID = setTimeout(function() {
							if(Modernizr.csstransitions){
								_currentPop.removeClass(_currentPop.data('easein')).addClass(_currentPop.data('easeout')).on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(event) {
									clearTimeout(_slideID);
									if(_this.data('slideshow')) startSlideshow();
								});
							}else{
								_currentPop.animate({opacity: 0}, 300, function(){
									$(this).hide();
									clearTimeout(_slideID);
									if(_this.data('slideshow')) startSlideshow();
								})
							}
							_currentPop.data('isshow', false);
						}, settings.delay);
					}
				});
			}else{
				$(this).on('click', function(event) {
					clearTimeout(_slideID);
					if(_currentPop!=null && !_currentPop.is($('#'+$(this).data('target')))){
						if(Modernizr.csstransitions){
							_currentPop.removeClass(_currentPop.data('easein')).addClass(_currentPop.data('easeout'));
						}else{
							_currentPop.animate({
								opacity: 0
								},
								300, function() {
									$(this).hide();
							});
						}
						_currentPop.data('isshow', false);
					}
					_currentPop = $('#'+$(this).data('target'));
					_currentPopIndex = _currentPop.data('index');

					if(_currentPop.data('isshow')){
						if(Modernizr.csstransitions){
							_currentPop.removeClass(_currentPop.data('easein')).addClass(_currentPop.data('easeout'));
						}else{
							_currentPop.animate({
								opacity: 0},
								300, function() {
									$(this).hide();
							});
						}
						_currentPop.data('isshow', false);
					}else{
						if(Modernizr.csstransitions){
							_currentPop.show().removeClass(_currentPop.data('easeout')).addClass('animated ' + _currentPop.data('easein'))
						}else{
							_currentPop.show().animate({opacity: 1}, 300);
						}
						_currentPop.data('isshow', true);
					}
				}).on('mouseleave', function(event) {
					if(_this.data('_allowOut')&&settings.autoHide){
						_currentPop = $('#'+$(this).data('target'));
						clearTimeout(_popOutID);
						_popOutID = setTimeout(function() {
							if(Modernizr.csstransitions){
								_currentPop.removeClass(_currentPop.data('easein')).addClass(_currentPop.data('easeout'));
							}else{
								_currentPop.animate({
									opacity: 0},
									300, function() {
									$(this).hide();
								});
							}
							_currentPop.data('isshow', false);
						}, settings.delay);
					}
				});
			}

		});

		_this.hideCurrentPop = function(){
			if(_currentPop!=null){
				if(Modernizr.csstransitions){
					_currentPop.removeClass(_currentPop.data('easein')).addClass(_currentPop.data('easeout'));
				}else{
					_currentPop.animate({
						opacity: 0},
						300, function() {
						$(this).hide();
					});
				}
				_currentPop.data('isshow', false);
			}
		}

		return this;

	};

})(jQuery);

