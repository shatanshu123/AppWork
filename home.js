function setTheme(themeName) {
	Cookies.set('theme', themeName, { expires: 99999 });
	document.documentElement.className = 'theme-' + themeName;
	$('#settings-theme > use').attr('xlink:href', '#theme-' + themeName);
}

/* Set and store other options */
function setOption(option, value) {
	Cookies.set(option, value, { expires: 99999 });
	$('#settings-' + option + ' > use').attr('xlink:href', '#' + option + '-' + value);
}

/* Switch theme */
function toggleTheme() {
	if (Cookies.get('theme') === 'dark'){
		setTheme('light');
	} else {
		setTheme('dark');
	}
}

/* Switch boolean option */
function toggleOption(option) {
	if (Cookies.get(option) === 'false'){
		setOption(option, 'true')
	} else {
		setOption(option, 'false');
	}
}

/* Immediately invoked function to load theme on initial load */
(function () {
	if (Cookies.get('theme') === 'light') {
		setTheme('light');
	} else {
		setTheme('dark');
	}
})();

if (Cookies.get('animation') != 'false') {
	/* Splits elements into multiple spans */
	$('.split').each(function() {
		var text = [...$(this).text()];
		$(this).text('');

		text.forEach(char => {
			if (char == ' ') {char = '&#160;'}
			let span = $('<span/>').html(char);
			$(this).append(span);
		});
	});

	/* Show header and content once everything has loaded */
	$('.header').css('visibility', 'visible');
	$('.content').css('visibility', 'visible');
	$('footer').css('visibility', 'visible');

	/* Move spans around randomly */
	$('.split > span').each(function() {
		let random1 = Math.random() * 100 - 50;
		let random2 = Math.random() * 100 - 50;
		$(this).css({
			'transform': `translate(${random1}vw, ${random2}vh)`,
			'transition-delay': Math.random() / 2 + 's',
			'animation-delay': Math.random() / 3 + 's'
		});
	});

	/* Run transition */
	var transitionInterval = setInterval(() => {
		clearInterval(transitionInterval);
		$('.split > span').each(function() {
			$(this).css({
				'transform': 'none'
			});
		});
	}, 1000);

	/* Mid transition */
	var midTransitionInterval = setInterval(() => {
		clearInterval(midTransitionInterval);
		$('.header-logo > use').css('transform', 'scale(1)');
	}, 1500);

	/* Allow scroll */
	var scrollAllowInterval = setInterval(() => {
		clearInterval(scrollAllowInterval);
		$('body').css('overflow', 'auto');
		$('.scroll-button').css({
			'visibility': 'visible',
			'opacity': '1'
		});
		// If the browser window is too long, enable scrolling by making the page longer
		$('body').css('height', '100.1vh');
	}, 2200);

	/* Disable cover on scroll */
	triggeredScroll = false;
	window.onscroll = function(e) {
		if (triggeredScroll !== true) {
			triggeredScroll = true;
			$('.container').removeClass('cover');
			this.oldScroll = this.scrollY;
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
			$('.scroll-button').css('display', 'none');
			$('body').css('height', '100vh');
		}
	};
} else {
	$('#settings-animation > use').attr('xlink:href', '#animation-false');
	$('body').css('overflow', 'auto');
	$('.container').removeClass('cover');
	$('.header-logo > use').css('transform', 'scale(1)');
	$('.header').css('visibility', 'visible');
	$('.content').css('visibility', 'visible');
	$('footer').css('visibility', 'visible');
	$('.scroll-button').css('display', 'none');
}

/* Go back to top on unload */
$(window).on('unload', function(e) {
	e.returnValue = true;
	window.scrollTo(0, 0);
	return true;
});

/* Recent blog posts */
$('article.blog').rss('https://www.blogger.com/feeds/3330691885388818359/posts/default?max-results=4', {
	limit: 2,
	ssl: true,
	tokens: {
		snippet: function(entry, tokens) {
			var snippet = tokens.shortBodyPlain;
			if (tokens.shortBodyPlain.length >= 120) {
				snippet = snippet + '...';
			}
			return snippet;
		}
	},
	layoutTemplate: '<div class="flex-grid">{entries}</div>',
	entryTemplate: '<div class="box"><h2>Visit Work</h2><a href="index.html" class="box-footer">Visit &gt;</a></div>'
  
    
}, function callback() {
	$('article.blog').css('visibility', 'visible');
})

/* Stop using Internet Explorer */
if (/(Trident\/7\.0; .*rv:([\d\.]*))|; MSIE ([\d\.]*);/i.test(navigator.userAgent)) {
	alert('get a real browser.');
}