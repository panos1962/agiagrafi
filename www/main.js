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

			Show.booksIndexOff();
			Show.edafioStinTixi();
		},
	})).
	prepend(Show.playButtonDOM = Show.panelButton({
		'img': 'play.svg',
		'title': 'Play',
		'action': function() {
			clearTimeout(Show.timerNext);
			Show.booksIndexOff();
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
			Show.booksIndexOff();
			Show.autoplay = false;
			Show.pauseButtonDOM.css('display', 'none');
			Show.playButtonDOM.css('display', '');
		},
	}));

	Selida.toolbarRightDOM.
	prepend(Show.panelButton({
		'img': 'book.svg',
		'title': 'Books',
		'action': function() {
			clearTimeout(Show.timerNext);
			Show.booksIndexOn();
			$.post({
				'url': 'books.php',
				'success': function(rsp) {
					rsp.pop();
					Show.booksIndexDisplay(rsp);
				},
				'faile': function(err) {
					console.error(err);
				},
			});
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

///////////////////////////////////////////////////////////////////////////////@

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

///////////////////////////////////////////////////////////////////////////////@

Show.booksIndexDisplay = function(data) {
	let wmax = 0;

	data.forEach(function(x) {
		const dom = (new Biblio(x)).domGet();

		Selida.ofelimoDOM.append(dom);

		const w = dom.innerWidth();

		if (w > wmax)
		wmax = w;
	});

	Selida.ofelimoDOM.
	children('.biblioBiblio').
	css({
		'width': wmax + 'px',
		'display': 'block',
	});

	return Show;
};

Show.booksIndexOn = function() {
	Selida.ofelimoDOM.empty();
	Show.booksIndex = true;

	return Show;
};

Show.booksIndexOff = function() {
	if (!Show.booksIndex)
	return Show;

	Selida.ofelimoDOM.empty();
	Show.booksIndex = false;
	return Show;
};

///////////////////////////////////////////////////////////////////////////////@
