"use strict";

const Selida = {};

$(document).ready(function() {
	Selida.selidaSetup();

	if (Selida.hasOwnProperty('init'))
	Selida.init();
});

Selida.selidaSetup = function() {
	Selida.windowDOM = $(window);
	Selida.bodyDOM = $(document.body);

	Selida.
	toolbarSetup().
	ofelimoSetup().
	ribbonSetup().
	ofelimoHeightSetup();

	setTimeout(function() {
		Selida.
		ofelimoHeightSetup(true);
	}, 200);

	return Selida;
};

Selida.toolbarSetup = function() {
	Selida.toolbarDOM = $('<div>').
	attr('id', 'toolbar').
	appendTo(Selida.bodyDOM);

	Selida.toolbarDOM.
	append(Selida.toolbarLeftDOM = $('<div>').attr('id', 'toolbarLeft')).
	append(Selida.toolbarCenterDOM = $('<div>').attr('id', 'toolbarCenter')).
	append(Selida.toolbarRightDOM = $('<div>').attr('id', 'toolbarRight'));

	Selida.toolbarLeftDOM.
	prepend(Selida.arxikiTabDOM = Selida.tabArxiki());

	Selida.toolbarCenterDOM.
	append($('<div>').attr('id', 'titlos').text('Αγία Γραφή'));

	return Selida;
};

Selida.tabCreate = function(opts) {
	if (!opts)
	opts = {};

	if (!opts.hasOwnProperty('text'))
	opts.text = '';

	if (!opts.hasOwnProperty('target'))
	opts.target = '_self';

	const tab = $('<a>').
	addClass('tab').
	text(opts.text);

	if (typeof(opts.href) === 'string')
	tab.attr({
		'href': opts.href,
		'target': opts.target,
	});

	else {
		tab.attr('href', '#');
		tab.on('click', function() {
			opts.href();
			return false;
		});
	}

	return tab;
};

Selida.tabArxiki = function() {
	return Selida.tabCreate({
		'href': Selida.baseUrl,
		'text': 'Αρχική',
	});
};

Selida.ofelimoSetup = function() {
	Selida.ofelimoDOM = $('<div>').
	attr('id', 'ofelimo').
	appendTo(Selida.bodyDOM);

	Selida.windowDOM.on('resize', function() {
		Selida.ofelimoHeightSetup(true);
	});

	return Selida;
};

Selida.ribbonSetup = function() {
	Selida.ribbonDOM = $('<div>').
	attr('id', 'ribbon').
	appendTo(Selida.bodyDOM);

	Selida.ribbonDOM.
	append(Selida.ribbonLeftDOM = $('<div>').attr('id', 'ribbonLeft')).
	append(Selida.ribbonRightDOM = $('<div>').attr('id', 'ribbonRight'));

	Selida.ribbonRightDOM.
	append($('<div>').
	attr('id', 'copyright').
	html('Copyright &copy; N.K.F.Papas 2021-'));

	return Selida;
};

Selida.ofelimoHeightSetup = function(scroll) {
	const pad = 1;

	Selida.bodyDOM.css('overflow-y', 'hidden');
	Selida.ofelimoDOM.css({
		'padding-top': pad + 'px',
		'padding-bottom': pad + 'px',
		'min-height': 0,
	});

	const th = Selida.toolbarDOM.outerHeight();
	const rh = Selida.ribbonDOM.outerHeight();
	const wh = Selida.windowDOM.height();
	const oh = wh - th - rh - pad - pad;

	Selida.ofelimoDOM.css('min-height', oh + 'px');

	if (scroll)
	Selida.bodyDOM.css('overflow-y', '');

	return Selida;
};

Selida.widthFix = function(dom, selector) {
	let cl = dom.children(selector);
	let cw = 0;

	cl.each(function() {
		let w = $(this).innerWidth();

		if (w > cw)
		cw = w;
	});

	cl.css('width', cw + 'px');

	return Selida;
};

///////////////////////////////////////////////////////////////////////////////@

const Edafio = function(edafio) {
	for (let i in edafio)
	this[i] = edafio[i];
};

Edafio.prototype.biblioGet = function() {
	return this.biblio;
};

Edafio.prototype.kefaleoGet = function() {
	return this.kefaleo;
};

Edafio.prototype.stixosGet = function() {
	return this.stixos;
};

Edafio.prototype.kimenoGet = function() {
	return this.kimeno;
};

Edafio.prototype.domGet = function() {
	const dom = $('<div>').addClass('edafioEdafio');
	const info = $('<div>').addClass('edafioInfo');

	if (this.biblio)
	info.append($('<div>').addClass('edafioBiblio').text(this.biblio));

	if (this.kefaleo)
	info.append($('<div>').addClass('edafioKefaleo').text(this.kefaleo));

	if (this.stixos)
	info.append($('<div>').addClass('edafioStixos').text(this.stixos));

	dom.append(info);

	if (this.kimeno)
	dom.append($('<div>').addClass('edafioKimeno').text(this.kimeno));

	return dom;
};
