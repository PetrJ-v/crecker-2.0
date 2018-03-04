(function($){

	Range = function(el){
		this.el = $(el);
		this.defaultVal = el.value;
		this.setState = function(){
			rangeValue = $(el).val();
			rangeOutput = $(el).next();
			rangeOutput.text(rangeValue);
		};
		this.setState();
		this.changed = false;
	};

	function setUpRanges(rangeElements){
		var rangeObjects = new Array(rangeElements.length);
			
		$.each(rangeElements, function(index, val) {
			rangeObjects[index] = new Range(this);
			rangeObjects[index].elNumber = index;
		});
		return rangeObjects;
	}

	function getAvailableElements(rangeObjects, direction, index){
		availableElements = $.grep(rangeObjects, function(obj){
			if (direction === 1) {
				return (obj.changed === false && obj.elNumber > index && obj.el.val() != 100);
			}
			else {
				return (obj.changed === false && obj.elNumber > index && obj.el.val() != 0);
			}
		});
		return availableElements;
	}

	function updateRanges(rangeObjects){
		$.each(rangeObjects, function(index, val) {
			this.el.on('input', function() {
				// sum = 0;
				// (function checkSum(){
				// 	$.each(rangeObjects, function(index, val) {
				// 		sum = parseInt(sum) + parseInt(this.defaultVal);
				// 	})
				// 	console.log(sum);
				// })();

				direction = (rangeObjects[index].defaultVal - this.value > 0) ? 1 : -1;
				prevElements = $.grep(rangeObjects, function(el){
					return (el.elNumber <= index);
				});
				prevElementsSum = 0;
				$.each(prevElements, function(index, val) {
					 prevElementsSum = prevElementsSum + parseInt(this.el.val());
				});

				if (prevElementsSum < 100 || (prevElementsSum == 100 && direction == -1)) {
					diapazon = Math.abs(rangeObjects[index].defaultVal - this.value);
					for (i = 1; i <= diapazon; i++) {
						
						availableElements = getAvailableElements(rangeObjects, direction, index);
						
						if (availableElements.length === 0) {
							$.each(rangeObjects, function(index, val) {
								this.changed = false;
							});
							availableElements = getAvailableElements(rangeObjects, direction);
						}
						nextRangeValue = parseInt(availableElements[0].el.val());
						availableElements[0].el.val(nextRangeValue + parseInt(direction));
						$.each(rangeObjects, function(index, val) {
							 this.setState();
						});
						$.each(rangeObjects, function(index, val) {
							this.defaultVal = $(this.el).val();
						})
						availableElements[0].changed = true;
						if (availableElements.length == 1) {
							$.each(rangeObjects, function(index, val) {
								this.changed = false;
							})
						}
					};
				}
				else {
					$(rangeObjects[index].el).val(rangeObjects[index].defaultVal);
					$.each(rangeObjects, function(index, val) {
						this.setState();
						this.el.changed = false;
					});
					prevElementsSum = 100;
				}
			});
		});
	}


	$(document).ready(function() {
		rangeElements = $('.ranges').find('input[type=range]');
		rangeObjects = setUpRanges(rangeElements);
		// console.log(rangeObjects);
		$('button').on('click', function(){
			updateRanges(rangeObjects);
		})
		updateRanges(rangeObjects);


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