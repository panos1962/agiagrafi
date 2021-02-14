"use strict";

const Show = {};

Show.interval = 2000;
Show.count = 15;

Selida.init = function() {
	Selida.arxikiTabDOM.remove();
	Selida.ofelimoDOM.on('click', '.edafioEdafio', function(e) {
		e.stopPropagation();
		e.preventDefault();

		clearTimeout($(this).data('timer'));
		$(this).stop().fadeTo(50, 1);
	});
	Show.edafioStinTixi();
};

Show.edafioStinTixi = function() {
	$.post({
		'url': 'edafio.php',
		'success': function(rsp) {
			Show.edafioDisplay(new Edafio(rsp));
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return Show;
};

Show.edafioDisplay = function(edafio) {
	const dom = edafio.domGet();

	Selida.ofelimoDOM.
	prepend($('<div>').
	append(dom));

	dom.data('timer', setTimeout(function() {
		dom.fadeTo(10000, 0, function() {
			$(this).animate({
				'height': '0px',
			}, 200, function() {
				$(this).remove();
			});
		});
	}, 20000));

	if (Show.count-- <= 0)
	return Show;

	if (Show.interval <= 0)
	return Show;

	setTimeout(function() {
		Show.edafioStinTixi();
	}, Show.interval);

	return Show;
};
