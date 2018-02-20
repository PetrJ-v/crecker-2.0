(function($){



	function updateRanges(rangeElements){
		$.each(rangeElements, function(index, val) {
			var range =  $(this),
				result = range.next(),
				defaultValue = range.val();

			result.text(range.val());
			counter = 0;
			range.on('input', function(){
				result.text(range.val());
				var elClass = $(this).attr("class"),
				elNumber = elClass.substring(5),
				currentValue = rangeElements[elNumber - 1].value,
				direction = ((currentValue - defaultValue) > 0) ? -1 : 1,
				// console.log($(rangeElements[parseInt(elNumber) + parseInt(counter)]));
				nextElNumber = parseInt(elNumber) + parseInt(counter);
				nextEl = $(rangeElements[nextElNumber]);
				nextElValue = parseInt(nextEl.val());
				// console.log(nextElValue);
				// console.log(nextElValue + direction);
				nextEl.val(nextElValue + direction);
				// console.log(nextEl.val());
				++counter;
				console.log(counter);
				console.log(rangeElements.length);
				if (nextElNumber >= rangeElements.length - 1) {
					counter = 0;
				}
				// $(rangeElements[elNumber + counter]).val() += 1;



				defaultValue = range.val();
				// console.log(elNumber);
				// console.log($(rangeElements[elNumber]).val());
				// eveilebleVal = 100 - rangeElements
				// elValue = 
				// $.each(rangeElements, function(index, val) {
				// 	 if (index > 0) {
				// 	 	$(this).val($(this).val() - 1);
				// 	 }
				// });
			})
		});
	};


	$(document).ready(function() {
		rangeElements = $('.header').find('input');

		updateRanges(rangeElements);



	});





	// $(window).on('load resize orientationchange', function () {

	// 	elements = $('.footer').children();//устанавливаем одинаковую высоту для элементов секции footer
	// 	BuildSection(elements);
	// 	headerclass = '.header',
	// 	mainClass = '.main',
	// 	footerPositionClassName = 'footer__pos-absolute',
	// 	centerSectionClass = '.center',
	// 	lastLeftElementClass = '.main-left__bottom',
	// 	lastLeftElementPositionClassName = 'main-left__bottom__pos-absolute';
	// 	pageSetup(headerclass, mainClass, footerPositionClassName, centerSectionClass, lastLeftElementClass, lastLeftElementPositionClassName);

	// });

	/**
	* BuildSection(elements).
	*
	* @param {array} elements - элементы DOM дерева документа, высоту которых нужно привести к общему значению.
	*/
	

})(jQuery);