
DomUtil = new Object();
$.extend(DomUtil, {
	onSwipe: function(leftSwipeFunc, rightSwipeFunc) {
		var layout = $('.Main');

		var xDown = null;
		var yDown = null;

		var handleTouchStart = function(evt) {
			xDown = evt.originalEvent.touches[0].clientX;
			yDown = evt.originalEvent.touches[0].clientY;
		};

		var handleTouchMove = function(evt) {
			if ( ! xDown || ! yDown ) {
				return;
			}

			var xUp = evt.originalEvent.touches[0].clientX;
			var yUp = evt.originalEvent.touches[0].clientY;

			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
				if ( xDiff > 0 ) {
					/* left swipe */
					leftSwipeFunc();
				} else {
					/* right swipe */
					rightSwipeFunc();
				}
			} else {
				if ( yDiff > 0 ) {
					/* up swipe */
				} else {
					/* down swipe */
				}
			}
			/* reset values */
			xDown = null;
			yDown = null;
		};

		layout.on('touchstart', handleTouchStart);
		layout.on('touchmove', handleTouchMove);
	}
});