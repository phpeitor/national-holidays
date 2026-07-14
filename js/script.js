function initFeature() {
	const fusionApp = document.getElementById("fusion-app");
	if (!fusionApp) return Promise.resolve();
	const templateVersion = "v1.24";
	const templateParts = [
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
		const url = "./templates/fusion-app/" + part + ".html?" + templateVersion;
		return fetch(url).then(function(response) {
			if (!response.ok) throw new Error("No se pudo cargar " + url);
			return response.text();
		});
	})).then(function(parts) {
			fusionApp.innerHTML = parts.join("\n");
			fusionApp.classList.add("loaded");
			return loadCondorSvg(fusionApp);
		}).then(function() {
			initFeatureInteractions();
		}).catch(function(error) {
			fusionApp.innerHTML = '<div style="color:#fff;text-align:center;padding:40px;font-family:sans-serif">Error al cargar la escena. <button onclick="location.reload()">Reintentar</button></div>';
			console.error(error);
		});
}

function loadCondorSvg(container) {
	const target = container.querySelector("#condor-content");
	if (!target) return Promise.resolve();
	return fetch("./resources/condor.svg?v=" + Date.now()).then(function(response) {
		if (!response.ok) throw new Error("No se pudo cargar condor.svg");
		return response.text();
	}).then(function(svgText) {
		var temp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		temp.innerHTML = svgText;
		var children = temp.childNodes;
		var mainDefs = container.querySelector("#main-art defs");
		for (var i = 0; i < children.length; i++) {
			var node = children[i];
			if (node.nodeType === 1) {
				var tag = node.tagName.toLowerCase();
				if (tag === "defs" || tag === "style") {
					if (mainDefs) mainDefs.appendChild(document.importNode(node, true));
				} else {
					target.appendChild(document.importNode(node, true));
				}
			}
		}
		console.log("Cóndor cargado:", target.childNodes.length, "elementos");
	}).catch(function(error) {
		console.error("Error cargando condor.svg:", error);
	});
}

function initFeatureInteractions() {
	function shareWindow(e, t, n) {
		const a = screen.width / 2 - t / 2;
		const o = screen.height / 2 - n / 2;
		window.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + t + ",height=" + n + ",top=" + o + ",left=" + a);
	}

	const readyFn = function(e) {
		"interactive" === document.readyState || "complete" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e);
	};
	
	readyFn(function() {
		const shareLinks = document.querySelectorAll(".js-gi-share");
		shareLinks && [].forEach.call(shareLinks, function(el) {
			el.addEventListener("click", function(e) {
				e.preventDefault();
				shareWindow(this.href, 600, 620);
			});
		});

		initAudioToggle();
	});
}

function initAudioToggle() {
	var notes = document.getElementById("musical-notes");
	if (!notes) return;

	var audio = new Audio("./resources/himno.mp3");
	audio.loop = true;

	var isPlaying = false;

	function toggleAudio() {
		if (isPlaying) {
			audio.pause();
			notes.classList.remove("is-playing");
			isPlaying = false;
		} else {
			audio.play().catch(function() {});
			notes.classList.add("is-playing");
			isPlaying = true;
		}
	}

	notes.addEventListener("click", toggleAudio);
}

function initYearCountdown() {
	const currentYear = new Date().getFullYear();
	const yearEl = document.getElementById("year-count");
	if (!yearEl) return;

	const startYear = 1821;
	const initialDelay = 900;

	const startStr = String(startYear);
	let targetStr = String(currentYear);
	const numDigits = startStr.length;

	while (targetStr.length < numDigits) targetStr = "0" + targetStr;

	const parent = yearEl.parentNode;

	const digitSpans = [];
	for (let i = 0; i < numDigits; i++) {
		const span = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
		span.setAttribute("class", "slot-digit");
		span.textContent = startStr[i];
		parent.insertBefore(span, yearEl);
		digitSpans.push(span);
	}
	parent.removeChild(yearEl);

	const totalSpinTime = 2000;
	const stopDelay = 300;
	const tickInterval = 50;

	setTimeout(function() {
		for (let i = numDigits - 1; i >= 0; i--) {
			const idx = i;
			const targetDigit = parseInt(targetStr[idx]);
			const startOffset = (numDigits - 1 - idx) * 60;
			let maxTime = totalSpinTime - (numDigits - 1 - idx) * stopDelay;
			if (maxTime < 120) maxTime = 120;

			setTimeout(function() {
				let elapsed = 0;
				function tick() {
					elapsed += tickInterval;
					const randomDigit = Math.floor(Math.random() * 10);
					digitSpans[idx].textContent = randomDigit;

					const progress = elapsed / maxTime;
					const blurAmount = Math.max(0, 0.8 * (1 - progress));
					digitSpans[idx].setAttribute("style",
						"filter: blur(" + blurAmount + "px); opacity: " + (0.55 + 0.45 * (1 - progress * progress)) + ";");

					if (elapsed >= maxTime) {
						digitSpans[idx].textContent = targetDigit;
						digitSpans[idx].setAttribute("style",
							"filter: blur(0); opacity: 1;");
						return;
					}
					setTimeout(tick, tickInterval);
				}
				tick();
			}, startOffset);
		}
	}, initialDelay);
}

function openImageLightbox(imageSrc, imageAlt, triggerElement) {
	if (document.querySelector(".logo-lightbox")) {
		return;
	}

	const rect = triggerElement.getBoundingClientRect();
	const elementCX = rect.left + rect.width / 2;
	const elementCY = rect.top + rect.height / 2;
	const vpCX = window.innerWidth / 2;
	const vpCY = window.innerHeight / 2;
	const dx = elementCX - vpCX;
	const dy = elementCY - vpCY;

	const overlay = document.createElement("div");
	overlay.className = "logo-lightbox";
	overlay.style.setProperty("--lbx", dx + "px");
	overlay.style.setProperty("--lby", dy + "px");

	const img = document.createElement("img");
	img.src = imageSrc;
	img.className = "logo-lightbox__img";
	img.alt = imageAlt;

	const closeBtn = document.createElement("button");
	closeBtn.className = "logo-lightbox__close";
	closeBtn.setAttribute("aria-label", "Cerrar");
	closeBtn.innerHTML = "&times;";

	overlay.appendChild(img);
	overlay.appendChild(closeBtn);
	document.body.appendChild(overlay);

	requestAnimationFrame(function () {
		requestAnimationFrame(function () {
			overlay.classList.add("logo-lightbox--open");
		});
	});

	function onKey(e) {
		if (e.key === "Escape") {
			closeLightbox();
		}
	}

	function closeLightbox() {
		document.removeEventListener("keydown", onKey);
		overlay.classList.remove("logo-lightbox--open");
		overlay.classList.add("logo-lightbox--closing");
		window.setTimeout(function () {
			overlay.remove();
		}, 420);
	}

	closeBtn.addEventListener("click", function (e) {
		e.stopPropagation();
		closeLightbox();
	});

	overlay.addEventListener("click", function (e) {
		if (e.target === overlay) closeLightbox();
	});

	document.addEventListener("keydown", onKey);
}

document.addEventListener("DOMContentLoaded", function() {
	initFeature()
		.then(function() {
			initYearCountdown();
		});

	const logoEl = document.querySelector(".logo");
	if (!logoEl) return;
	const logoImg = logoEl.querySelector(".box img");
	if (!logoImg) return;

	function openLogo() {
		openImageLightbox(logoImg.src, "Logo Fiestas Patrias Per\u00fa", logoEl);
	}

	logoEl.addEventListener("click", openLogo);
	logoEl.addEventListener("keydown", function(e) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			openLogo();
		}
	});

	if ("serviceWorker" in navigator) {
		var basePath = location.pathname.replace(/\/[^\/]*$/, "/");
		navigator.serviceWorker.register("./js/sw.js", { scope: basePath }).catch(function() {});
	}
});
