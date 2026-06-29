function initFeature() {
						
	const fusionApp = document.getElementById("fusion-app");
	if (!fusionApp) return Promise.resolve();
	var templateVersion = "v1.11";
	var templateParts = [
		"shell-open",
		"defs-and-sky",
		"ground",
		"back-building",
		"front-building",
		"background",
		"middleground",
		"foreground",
		"horse-mountie",
		"foreground-haze",
		"shell-close"
	];

	return Promise.all(templateParts.map(function(part) {
		var url = "./templates/fusion-app/" + part + ".html?" + templateVersion;
		return fetch(url).then(function(response) {
			if (!response.ok) throw new Error("No se pudo cargar " + url);
			return response.text();
		});
	})).then(function(parts) {
			fusionApp.innerHTML = parts.join("\n");
			initFeatureInteractions();
		});
}

function initFeatureInteractions() {

	function t(e, t, n) {
		var a = screen.width / 2 - t / 2,
			o = screen.height / 2 - n / 2;
		window.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + t + ",height=" + n + ",top=" + o + ",left=" + a)
	}

	var n = document.querySelector(".gi-header"),
		a = window.innerWidth,
		o = document.querySelector("nav"),
		r = document.querySelector(".books-icon"),
		i = document.querySelector(".close-icon");
	o.addEventListener("click", function() {
		this.classList.contains("nav-animate__partial") ? (o.classList.toggle("nav-animate__full"), TweenMax.fromTo(i, .05, {
			y: 0,
			ease: Power1.easeIn
		}, {
			y: 40,
			ease: Power1.easeIn
		})) : TweenMax.fromTo(r, .05, {
			y: 40,
			ease: Power1.easeIn
		}, {
			y: 0,
			ease: Power1.easeIn,
			delay: .35
		})
	});

	var s = document.getElementById("fg-crowd"),
		c = document.getElementById("mg-back-characters"),
		d = document.getElementById("mg-front-characters"),
		l = document.getElementById("bg-crowd"),
		m = document.getElementById("horse-mountie"),
		u = new TimelineMax({
			repeat: -1,
			yoyo: !0
		}),
		y = new TimelineMax({
			repeat: -1,
			yoyo: !0,
			repeatDelay: 3
		});
	u.add("start").to(s, 1, {
		x: -10,
		ease: Power1.easeIn
	}, "start").to([c, d, l], 1, {
		x: 10,
		ease: Power1.easeIn
	}, "start"), y.to(m, 1.5, {
		rotation: 6,
		transformOrigin: "60% 100%",
		ease: Back.easeInOut,
		delay: 1
	});

	var w = function(e) {
		"interactive" === document.readyState || "complete" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
	};
	
	w(function() {
		var e = document.querySelectorAll(".js-gi-share");
		e && [].forEach.call(e, function(e) {
			e.addEventListener("click", function(e) {
				e.preventDefault(), t(this.href, 600, 620)
			})
		})
	})
}

function initYearCountdown() {
	var currentYear = new Date().getFullYear();
	var yearEl = document.getElementById('year-count');
	if (!yearEl) return;

	var startYear = 1821;
	var initialDelay = 900;
	var duration = 2200;
	var startTime = null;
	yearEl.textContent = startYear;

	function updateYear(timestamp) {
		if (!startTime) startTime = timestamp;
		var progress = Math.min((timestamp - startTime) / duration, 1);
		var easedProgress = 1 - Math.pow(1 - progress, 3);
		var year = Math.floor(startYear + (currentYear - startYear) * easedProgress);
		yearEl.textContent = year;

		if (progress < 1) {
			requestAnimationFrame(updateYear);
		} else {
			yearEl.textContent = currentYear;
		}
	}

	setTimeout(function() {
		requestAnimationFrame(updateYear);
	}, initialDelay);
}

function openImageLightbox(imageSrc, imageAlt, triggerElement) {
	if (document.querySelector('.logo-lightbox')) {
	return;
	}

	const rect = triggerElement.getBoundingClientRect();
	const elementCX = rect.left + rect.width / 2;
	const elementCY = rect.top + rect.height / 2;
	const vpCX = window.innerWidth / 2;
	const vpCY = window.innerHeight / 2;
	const dx = elementCX - vpCX;
	const dy = elementCY - vpCY;

	const overlay = document.createElement('div');
	overlay.className = 'logo-lightbox';
	overlay.style.setProperty('--lbx', dx + 'px');
	overlay.style.setProperty('--lby', dy + 'px');

	const img = document.createElement('img');
	img.src = imageSrc;
	img.className = 'logo-lightbox__img';
	img.alt = imageAlt;

	const closeBtn = document.createElement('button');
	closeBtn.className = 'logo-lightbox__close';
	closeBtn.setAttribute('aria-label', 'Cerrar');
	closeBtn.innerHTML = '&times;';

	overlay.appendChild(img);
	overlay.appendChild(closeBtn);
	document.body.appendChild(overlay);

	requestAnimationFrame(function () {
	requestAnimationFrame(function () {
		overlay.classList.add('logo-lightbox--open');
	});
	});

	function onKey(e) {
	if (e.key === 'Escape') {
		closeLightbox();
	}
	}

	function closeLightbox() {
	document.removeEventListener('keydown', onKey);
	overlay.classList.remove('logo-lightbox--open');
	overlay.classList.add('logo-lightbox--closing');
	window.setTimeout(function () {
		overlay.remove();
	}, 420);
	}

	closeBtn.addEventListener('click', function (e) {
	e.stopPropagation();
	closeLightbox();
	});

	overlay.addEventListener('click', function (e) {
	if (e.target === overlay) closeLightbox();
	});

	document.addEventListener('keydown', onKey);
}

document.addEventListener("DOMContentLoaded", function() {
	initFeature()
		.then(function() {
			initYearCountdown();
		})
		.catch(function(error) {
			console.error(error);
		});
	
	const logoEl = document.querySelector('.logo');
	if (!logoEl) return;
	const logoImg = logoEl.querySelector('.box img');
	if (!logoImg) return;

	logoEl.addEventListener('click', function () {
		openImageLightbox(logoImg.src, 'Logo', logoEl);
	});
});
