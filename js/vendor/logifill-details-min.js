(function () {
	function c() {
		var c = function (a) {
			var b = a.createElement("details"),
				c, d, e;
			if (!("open" in b)) {
				return false
			}
			d = a.body || function () {
				var b = a.documentElement;
				c = true;
				return b.insertBefore(a.createElement("body"), b.firstElementChild || b.firstChild)
			}();
			b.innerHTML = "<summary>a</summary>b";
			b.style.display = "block";
			d.appendChild(b);
			e = b.offsetHeight;
			b.open = true;
			e = e != b.offsetHeight;
			d.removeChild(b);
			if (c) {
				d.parentNode.removeChild(d)
			}
			return e
		}(document);
		if (!c) {
			var d = String.fromCharCode(9658);
			var e = String.fromCharCode(9660);
			var f = ["details > * {position: absolute;top: -4000px;left: -4000px;}", "details > summary, details[open] > * {position: static;}", "details, details > summary {display: block;}", 'details > summary:before {content: "' + d + '";padding-right: 5px;font-size: 11px;}', 'details[open] > summary:before {content:"' + e + '"}'];
			if (false) {
				f.push("details > summary { ... }")
			}
			f = f.join("\n");
			var g = document.getElementsByTagName("HEAD")[0];
			var h = document.createElement("style");
			h.type = "text/css";
			if (h.styleSheet) {
				h.styleSheet.cssText = f
			} else {
				h.appendChild(document.createTextNode(f))
			}
			var i = g.childNodes && g.childNodes[0];
			if (i) {
				g.insertBefore(h, i)
			} else {
				g.appendChild(h)
			}
			var j = document.getElementsByTagName("BODY")[0];
			if (!window.addEventListener) {
				window.addEventListener = function (a, b, c) {
					document.attachEvent("on" + a, function (a) {
						var c = a || window.event;
						if (!c.target) c.target = c.srcElement;
						if (typeof c.preventDefault != "function") {
							c.preventDefault = function () {
								this.returnValue = false
							}
						}
						if (typeof c.stopPropagation != "function") {
							c.stopPropagation = function () {
								this.cancelBubble = true
							}
						}
						b(c)
					})
				}
			}
			var k = "trigger-refresh ";
			var l = k.length;
			j.className = j.className || "";
			window.addEventListener("click", function (c) {
				var d = c.target;
				var e, f;
				while (d) {
					e = d.nodeName.toLowerCase();
					if (e == a) {
						f = d.parentNode;
						if (f.getAttributeNode("open")) {
							f.removeAttribute("open")
						} else {
							f.setAttribute("open", "open")
						}
						j.className = k + j.className;
						j.className = j.className.substr(l);
						break
					}
					if (e == b) {
						break
					}
					d = d.parentNode
				}
			}, false)
		}
	}

	function d() {
		if (document.getElementsByTagName("BODY").length > 0) {
			c()
		} else {
			setTimeout(d, 50)
		}
	}
	var a = "summary";
	var b = "details";
	document.createElement(b);
	document.createElement(a);
	d()
})()