"use strict";

const Show = {};

Show.interval = 10000;
Show.autoplay = true;

Selida.init = function() {
	Selida.arxikiTabDOM.remove();
	Show.panelSetup();
	Selida.ofelimoDOM.
	on('click', '.edafioEdafio', function(e) {
		e.stopPropagation();
		e.preventDefault();

		clearTimeout($(this).data('timer'));
		$(this).stop().fadeTo(50, 1);
	}).
	on('click', '.biblioBiblio', function(e) {
		e.stopPropagation();
		e.preventDefault();

		Show.kefaleaToggle($(this));
	}).
	on('click', '.kefaleo', function(e) {
		e.stopPropagation();
		e.preventDefault();

		Show.edafiaToggle($(this));
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

		Selida.ofelimoDOM.
		append($('<div>').
		append(dom).
		append($('<dom>').addClass('kefalea')));

		const w = dom.innerWidth();

		if (w > wmax)
		wmax = w;
	});

	Selida.ofelimoDOM.
	children().
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

Show.kefaleaToggle = function(dom) {
	if (dom.data('open')) {
		dom.removeData('open').parent().children('.kefalea').empty();
		return Show;
	}

	const kefalea = dom.data('open', true).parent().children('.kefalea');

	$.post({
		'url': 'kefalea.php',
		'data': {
			'biblio': dom.children('.biblioId').text(),
		},
		'success': function(rsp) {
			rsp.pop();
			Show.kefaleaDisplay(dom, rsp);
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return Show;
}

Show.kefaleaDisplay = function(biblio, data) {
	const dom = biblio.parent().children('.kefalea');
	const ml = '40px';
	const w = (biblio.innerWidth() - parseInt(ml)) + 'px';
	const col = biblio.css('background-color');

	data.forEach(function(x) {
		dom.
		append($('<div>').
		append($('<div>').
		addClass('kefaleo').
		css({
			'margin-left': ml,
			'width': w,
			'background-color': col,
		}).
		text(x)).
		append($('<div>').addClass('edafia')));
	});

	return Show;
};

///////////////////////////////////////////////////////////////////////////////@

Show.edafiaToggle = function(dom) {
	const kefaleo = dom.parent();
	const edafia = kefaleo.children('.edafia');

	if (dom.data('open')) {
		dom.removeData('open');
		edafia.empty();
		return Show;
	}

	const biblio = kefaleo.parent().parent().children('.biblioBiblio');

	dom.data('open', true);
	$.post({
		'url': 'edafia.php',
		'data': {
			'biblio': biblio.children('.biblioId').text(),
			'kefaleo': dom.text(),
		},
		'success': function(rsp) {
			rsp.pop();
			Show.edafiaDisplay(dom, rsp);
		},
		'fail': function(err) {
			console.error(err);
		},
	});

	return Show;
}

Show.edafiaDisplay = function(kefaleoDOM, data) {
	const kefaleoWrapperDOM = kefaleoDOM.parent();
	const edafiaDOM = kefaleoWrapperDOM.children('.edafia');
	const marglinleft = '80px';
	const kefaleo = kefaleoDOM.text();
	const biblio = kefaleoWrapperDOM.
		parent().	// λίστα κεφαλαίων
		parent().	// wrapper βιβλίου
		children('.biblioBiblio').
		children('.biblioPerigrafi').
		text();

	data.forEach(function(x) {
		x.biblio = biblio;
		x.kefaleo = kefaleo;

		const edafio = new Edafio(x);
		const edafioDOM = edafio.domGet();

		edafiaDOM.
		append(edafioDOM.
		css({
			'display': 'block',
			'margin-left': marglinleft,
		}));
	});

	return Show;
};
