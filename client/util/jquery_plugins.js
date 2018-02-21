$.fn.scrollEnd = function(callback, timeout) {
	$(this).scroll(function(e) {
		var $this = $(this);
		if ($this.data('scrollTimeout')) {
			clearTimeout($this.data('scrollTimeout'));
		}
		$this.data('scrollTimeout', setTimeout(callback,timeout));
	});
};