function initFeature() {
						
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

initFeature();

var currentYear = new Date().getFullYear();

var options = {
	strings: ['Fiestas Patrias ' + currentYear],
	typeSpeed: 100,         
	backSpeed: 50,          
	backDelay: 1500,        
	startDelay: 1000,  
	loop: true
};

var typed = new Typed('#typed-text', options);