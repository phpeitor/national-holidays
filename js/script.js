function initFeature() {
	var fusionApp = document.getElementById("fusion-app");
	if (!fusionApp) return Promise.resolve();
	var templateVersion = "v1.13";
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
			fusionApp.classList.add("loaded");
			initFeatureInteractions();
		}).catch(function(error) {
			fusionApp.innerHTML = '<div style="color:#fff;text-align:center;padding:40px;font-family:sans-serif">Error al cargar la escena. <button onclick="location.reload()">Reintentar</button></div>';
			console.error(error);
		});
}

function initFeatureInteractions() {
	function t(e, t, n) {
		var a = screen.width / 2 - t / 2,
			o = screen.height / 2 - n / 2;
		window.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + t + ",height=" + n + ",top=" + o + ",left=" + a)
	}

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

	var startStr = String(startYear);
	var targetStr = String(currentYear);
	var numDigits = startStr.length;

	while (targetStr.length < numDigits) targetStr = '0' + targetStr;

	var parent = yearEl.parentNode;

	var digitSpans = [];
	for (var i = 0; i < numDigits; i++) {
		var span = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
		span.setAttribute('class', 'slot-digit');
		span.textContent = startStr[i];
		parent.insertBefore(span, yearEl);
		digitSpans.push(span);
	}
	parent.removeChild(yearEl);

	var totalSpinTime = 2000;
	var stopDelay = 300;
	var tickInterval = 50;

	setTimeout(function() {
		for (var i = numDigits - 1; i >= 0; i--) {
			(function(idx) {
				var targetDigit = parseInt(targetStr[idx]);
				var elapsed = 0;
				var startOffset = (numDigits - 1 - idx) * 60;
				var maxTime = totalSpinTime - (numDigits - 1 - idx) * stopDelay;
				if (maxTime < 120) maxTime = 120;

				setTimeout(function() {
					function tick() {
						elapsed += tickInterval;
						var randomDigit = Math.floor(Math.random() * 10);
						digitSpans[idx].textContent = randomDigit;

						var progress = elapsed / maxTime;
						var blurAmount = Math.max(0, 0.8 * (1 - progress));
						digitSpans[idx].setAttribute('style',
							'filter: blur(' + blurAmount + 'px); opacity: ' + (0.55 + 0.45 * (1 - progress * progress)) + ';');

						if (elapsed >= maxTime) {
							digitSpans[idx].textContent = targetDigit;
							digitSpans[idx].setAttribute('style',
								'filter: blur(0); opacity: 1;');
							return;
						}
						setTimeout(tick, tickInterval);
					}
					tick();
				}, startOffset);
			})(i);
		}
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
		});

	const logoEl = document.querySelector('.logo');
	if (!logoEl) return;
	const logoImg = logoEl.querySelector('.box img');
	if (!logoImg) return;

	function openLogo() {
		openImageLightbox(logoImg.src, 'Logo Fiestas Patrias Per\u00fa', logoEl);
	}

	logoEl.addEventListener('click', openLogo);
	logoEl.addEventListener('keydown', function(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openLogo();
		}
	});
});
