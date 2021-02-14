"use strict";

const Show = {};

Show.interval = 10000;
Show.autoplay = true;

Selida.init = function() {
	Selida.arxikiTabDOM.remove();
	Show.panelSetup();
	Selida.ofelimoDOM.on('click', '.edafioEdafio', function(e) {
		e.stopPropagation();
		e.preventDefault();

		clearTimeout($(this).data('timer'));
		$(this).stop().fadeTo(50, 1);
	});
	Show.edafioStinTixi();
};

Show.panelSetup = function() {
	Selida.toolbarLeftDOM.
	prepend(Show.panelButton({
		'img': 'next.svg',
		'title': 'Next',
		'action': function() {
			if (Show.autoplay)
			clearTimeout(Show.timerNext);
			Show.edafioStinTixi();
		},
	})).
	prepend(Show.playButtonDOM = Show.panelButton({
		'img': 'play.svg',
		'title': 'Play',
		'action': function() {
			clearTimeout(Show.timerNext);
			Show.autoplay = true;
			Show.playButtonDOM.css('display', 'none');
			Show.pauseButtonDOM.css('display', '');
			Show.edafioStinTixi();
		},
	}).css('display', 'none')).
	prepend(Show.pauseButtonDOM = Show.panelButton({
		'img': 'pause.svg',
		'title': 'Pause',
		'action': function() {
			clearTimeout(Show.timerNext);
			Show.autoplay = false;
			Show.pauseButtonDOM.css('display', 'none');
			Show.playButtonDOM.css('display', '');
		},
	}));

	return Show;
};

Show.panelButton = function(opts) {
	const button = $('<img>').
	addClass('controlButton').
	attr({
		'src': 'images/' + opts.img,
		'alt': opts.title,
		'title': opts.title,
	}).
	on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();

		opts.action();
	});

	return button;
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

	if (Show.autoplay)
	Show.timerNext = setTimeout(function() {
		Show.edafioStinTixi();
	}, Show.interval);

	return Show;
};
