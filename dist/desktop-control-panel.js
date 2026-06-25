//#region node_modules/lit-html/lib/dom.js
var e = typeof window < "u" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0, t = (e, t, n = null, r = null) => {
	for (; t !== n;) {
		let n = t.nextSibling;
		e.insertBefore(t, r), t = n;
	}
}, n = (e, t, n = null) => {
	for (; t !== n;) {
		let n = t.nextSibling;
		e.removeChild(t), t = n;
	}
}, r = `{{lit-${String(Math.random()).slice(2)}}}`, i = `<!--${r}-->`, a = RegExp(`${r}|${i}`), o = "$lit$", s = class {
	constructor(e, t) {
		this.parts = [], this.element = t;
		let n = [], i = [], s = document.createTreeWalker(t.content, 133, null, !1), l = 0, f = -1, p = 0, { strings: ee, values: { length: m } } = e;
		for (; p < m;) {
			let e = s.nextNode();
			if (e === null) {
				s.currentNode = i.pop();
				continue;
			}
			if (f++, e.nodeType === 1) {
				if (e.hasAttributes()) {
					let t = e.attributes, { length: n } = t, r = 0;
					for (let e = 0; e < n; e++) c(t[e].name, "$lit$") && r++;
					for (; r-- > 0;) {
						let t = ee[p], n = d.exec(t)[2], r = n.toLowerCase() + o, i = e.getAttribute(r);
						e.removeAttribute(r);
						let s = i.split(a);
						this.parts.push({
							type: "attribute",
							index: f,
							name: n,
							strings: s
						}), p += s.length - 1;
					}
				}
				e.tagName === "TEMPLATE" && (i.push(e), s.currentNode = e.content);
			} else if (e.nodeType === 3) {
				let t = e.data;
				if (t.indexOf(r) >= 0) {
					let r = e.parentNode, i = t.split(a), o = i.length - 1;
					for (let t = 0; t < o; t++) {
						let n, a = i[t];
						if (a === "") n = u();
						else {
							let e = d.exec(a);
							e !== null && c(e[2], "$lit$") && (a = a.slice(0, e.index) + e[1] + e[2].slice(0, -5) + e[3]), n = document.createTextNode(a);
						}
						r.insertBefore(n, e), this.parts.push({
							type: "node",
							index: ++f
						});
					}
					i[o] === "" ? (r.insertBefore(u(), e), n.push(e)) : e.data = i[o], p += o;
				}
			} else if (e.nodeType === 8) if (e.data === r) {
				let t = e.parentNode;
				(e.previousSibling === null || f === l) && (f++, t.insertBefore(u(), e)), l = f, this.parts.push({
					type: "node",
					index: f
				}), e.nextSibling === null ? e.data = "" : (n.push(e), f--), p++;
			} else {
				let t = -1;
				for (; (t = e.data.indexOf(r, t + 1)) !== -1;) this.parts.push({
					type: "node",
					index: -1
				}), p++;
			}
		}
		for (let e of n) e.parentNode.removeChild(e);
	}
}, c = (e, t) => {
	let n = e.length - t.length;
	return n >= 0 && e.slice(n) === t;
}, l = (e) => e.index !== -1, u = () => document.createComment(""), d = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/, f = 133;
function p(e, t) {
	let { element: { content: n }, parts: r } = e, i = document.createTreeWalker(n, f, null, !1), a = m(r), o = r[a], s = -1, c = 0, l = [], u = null;
	for (; i.nextNode();) {
		s++;
		let e = i.currentNode;
		for (e.previousSibling === u && (u = null), t.has(e) && (l.push(e), u === null && (u = e)), u !== null && c++; o !== void 0 && o.index === s;) o.index = u === null ? o.index - c : -1, a = m(r, a), o = r[a];
	}
	l.forEach((e) => e.parentNode.removeChild(e));
}
var ee = (e) => {
	let t = e.nodeType === 11 ? 0 : 1, n = document.createTreeWalker(e, f, null, !1);
	for (; n.nextNode();) t++;
	return t;
}, m = (e, t = -1) => {
	for (let n = t + 1; n < e.length; n++) {
		let t = e[n];
		if (l(t)) return n;
	}
	return -1;
};
function te(e, t, n = null) {
	let { element: { content: r }, parts: i } = e;
	if (n == null) {
		r.appendChild(t);
		return;
	}
	let a = document.createTreeWalker(r, f, null, !1), o = m(i), s = 0, c = -1;
	for (; a.nextNode();) for (c++, a.currentNode === n && (s = ee(t), n.parentNode.insertBefore(t, n)); o !== -1 && i[o].index === c;) {
		if (s > 0) {
			for (; o !== -1;) i[o].index += s, o = m(i, o);
			return;
		}
		o = m(i, o);
	}
}
//#endregion
//#region node_modules/lit-html/lib/directive.js
var ne = /* @__PURE__ */ new WeakMap(), h = (e) => typeof e == "function" && ne.has(e), g = {}, _ = {}, v = class {
	constructor(e, t, n) {
		this.__parts = [], this.template = e, this.processor = t, this.options = n;
	}
	update(e) {
		let t = 0;
		for (let n of this.__parts) n !== void 0 && n.setValue(e[t]), t++;
		for (let e of this.__parts) e !== void 0 && e.commit();
	}
	_clone() {
		let t = e ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0), n = [], r = this.template.parts, i = document.createTreeWalker(t, 133, null, !1), a = 0, o = 0, s, c = i.nextNode();
		for (; a < r.length;) {
			if (s = r[a], !l(s)) {
				this.__parts.push(void 0), a++;
				continue;
			}
			for (; o < s.index;) o++, c.nodeName === "TEMPLATE" && (n.push(c), i.currentNode = c.content), (c = i.nextNode()) === null && (i.currentNode = n.pop(), c = i.nextNode());
			if (s.type === "node") {
				let e = this.processor.handleTextExpression(this.options);
				e.insertAfterNode(c.previousSibling), this.__parts.push(e);
			} else this.__parts.push(...this.processor.handleAttributeExpressions(c, s.name, s.strings, this.options));
			a++;
		}
		return e && (document.adoptNode(t), customElements.upgrade(t)), t;
	}
}, re = window.trustedTypes && trustedTypes.createPolicy("lit-html", { createHTML: (e) => e }), ie = ` ${r} `, y = class {
	constructor(e, t, n, r) {
		this.strings = e, this.values = t, this.type = n, this.processor = r;
	}
	getHTML() {
		let e = this.strings.length - 1, t = "", n = !1;
		for (let a = 0; a < e; a++) {
			let e = this.strings[a], s = e.lastIndexOf("<!--");
			n = (s > -1 || n) && e.indexOf("-->", s + 1) === -1;
			let c = d.exec(e);
			c === null ? t += e + (n ? ie : i) : t += e.substr(0, c.index) + c[1] + c[2] + o + c[3] + r;
		}
		return t += this.strings[e], t;
	}
	getTemplateElement() {
		let e = document.createElement("template"), t = this.getHTML();
		return re !== void 0 && (t = re.createHTML(t)), e.innerHTML = t, e;
	}
}, ae = class extends y {
	getHTML() {
		return `<svg>${super.getHTML()}</svg>`;
	}
	getTemplateElement() {
		let e = super.getTemplateElement(), n = e.content, r = n.firstChild;
		return n.removeChild(r), t(n, r.firstChild), e;
	}
}, b = (e) => e === null || !(typeof e == "object" || typeof e == "function"), x = (e) => Array.isArray(e) || !!(e && e[Symbol.iterator]), S = class {
	constructor(e, t, n) {
		this.dirty = !0, this.element = e, this.name = t, this.strings = n, this.parts = [];
		for (let e = 0; e < n.length - 1; e++) this.parts[e] = this._createPart();
	}
	_createPart() {
		return new C(this);
	}
	_getValue() {
		let e = this.strings, t = e.length - 1, n = this.parts;
		if (t === 1 && e[0] === "" && e[1] === "") {
			let e = n[0].value;
			if (typeof e == "symbol") return String(e);
			if (typeof e == "string" || !x(e)) return e;
		}
		let r = "";
		for (let i = 0; i < t; i++) {
			r += e[i];
			let t = n[i];
			if (t !== void 0) {
				let e = t.value;
				if (b(e) || !x(e)) r += typeof e == "string" ? e : String(e);
				else for (let t of e) r += typeof t == "string" ? t : String(t);
			}
		}
		return r += e[t], r;
	}
	commit() {
		this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()));
	}
}, C = class {
	constructor(e) {
		this.value = void 0, this.committer = e;
	}
	setValue(e) {
		e !== g && (!b(e) || e !== this.value) && (this.value = e, h(e) || (this.committer.dirty = !0));
	}
	commit() {
		for (; h(this.value);) {
			let e = this.value;
			this.value = g, e(this);
		}
		this.value !== g && this.committer.commit();
	}
}, oe = class e {
	constructor(e) {
		this.value = void 0, this.__pendingValue = void 0, this.options = e;
	}
	appendInto(e) {
		this.startNode = e.appendChild(u()), this.endNode = e.appendChild(u());
	}
	insertAfterNode(e) {
		this.startNode = e, this.endNode = e.nextSibling;
	}
	appendIntoPart(e) {
		e.__insert(this.startNode = u()), e.__insert(this.endNode = u());
	}
	insertAfterPart(e) {
		e.__insert(this.startNode = u()), this.endNode = e.endNode, e.endNode = this.startNode;
	}
	setValue(e) {
		this.__pendingValue = e;
	}
	commit() {
		if (this.startNode.parentNode === null) return;
		for (; h(this.__pendingValue);) {
			let e = this.__pendingValue;
			this.__pendingValue = g, e(this);
		}
		let e = this.__pendingValue;
		e !== g && (b(e) ? e !== this.value && this.__commitText(e) : e instanceof y ? this.__commitTemplateResult(e) : e instanceof Node ? this.__commitNode(e) : x(e) ? this.__commitIterable(e) : e === _ ? (this.value = _, this.clear()) : this.__commitText(e));
	}
	__insert(e) {
		this.endNode.parentNode.insertBefore(e, this.endNode);
	}
	__commitNode(e) {
		this.value !== e && (this.clear(), this.__insert(e), this.value = e);
	}
	__commitText(e) {
		let t = this.startNode.nextSibling;
		e ??= "";
		let n = typeof e == "string" ? e : String(e);
		t === this.endNode.previousSibling && t.nodeType === 3 ? t.data = n : this.__commitNode(document.createTextNode(n)), this.value = e;
	}
	__commitTemplateResult(e) {
		let t = this.options.templateFactory(e);
		if (this.value instanceof v && this.value.template === t) this.value.update(e.values);
		else {
			let n = new v(t, e.processor, this.options), r = n._clone();
			n.update(e.values), this.__commitNode(r), this.value = n;
		}
	}
	__commitIterable(t) {
		Array.isArray(this.value) || (this.value = [], this.clear());
		let n = this.value, r = 0, i;
		for (let a of t) i = n[r], i === void 0 && (i = new e(this.options), n.push(i), r === 0 ? i.appendIntoPart(this) : i.insertAfterPart(n[r - 1])), i.setValue(a), i.commit(), r++;
		r < n.length && (n.length = r, this.clear(i && i.endNode));
	}
	clear(e = this.startNode) {
		n(this.startNode.parentNode, e.nextSibling, this.endNode);
	}
}, se = class {
	constructor(e, t, n) {
		if (this.value = void 0, this.__pendingValue = void 0, n.length !== 2 || n[0] !== "" || n[1] !== "") throw Error("Boolean attributes can only contain a single expression");
		this.element = e, this.name = t, this.strings = n;
	}
	setValue(e) {
		this.__pendingValue = e;
	}
	commit() {
		for (; h(this.__pendingValue);) {
			let e = this.__pendingValue;
			this.__pendingValue = g, e(this);
		}
		if (this.__pendingValue === g) return;
		let e = !!this.__pendingValue;
		this.value !== e && (e ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = e), this.__pendingValue = g;
	}
}, ce = class extends S {
	constructor(e, t, n) {
		super(e, t, n), this.single = n.length === 2 && n[0] === "" && n[1] === "";
	}
	_createPart() {
		return new le(this);
	}
	_getValue() {
		return this.single ? this.parts[0].value : super._getValue();
	}
	commit() {
		this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue());
	}
}, le = class extends C {}, ue = !1;
(() => {
	try {
		let e = { get capture() {
			return ue = !0, !1;
		} };
		window.addEventListener("test", e, e), window.removeEventListener("test", e, e);
	} catch {}
})();
var de = class {
	constructor(e, t, n) {
		this.value = void 0, this.__pendingValue = void 0, this.element = e, this.eventName = t, this.eventContext = n, this.__boundHandleEvent = (e) => this.handleEvent(e);
	}
	setValue(e) {
		this.__pendingValue = e;
	}
	commit() {
		for (; h(this.__pendingValue);) {
			let e = this.__pendingValue;
			this.__pendingValue = g, e(this);
		}
		if (this.__pendingValue === g) return;
		let e = this.__pendingValue, t = this.value, n = e == null || t != null && (e.capture !== t.capture || e.once !== t.once || e.passive !== t.passive), r = e != null && (t == null || n);
		n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), r && (this.__options = fe(e), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = e, this.__pendingValue = g;
	}
	handleEvent(e) {
		typeof this.value == "function" ? this.value.call(this.eventContext || this.element, e) : this.value.handleEvent(e);
	}
}, fe = (e) => e && (ue ? {
	capture: e.capture,
	passive: e.passive,
	once: e.once
} : e.capture);
//#endregion
//#region node_modules/lit-html/lib/template-factory.js
function pe(e) {
	let t = w.get(e.type);
	t === void 0 && (t = {
		stringsArray: /* @__PURE__ */ new WeakMap(),
		keyString: /* @__PURE__ */ new Map()
	}, w.set(e.type, t));
	let n = t.stringsArray.get(e.strings);
	if (n !== void 0) return n;
	let i = e.strings.join(r);
	return n = t.keyString.get(i), n === void 0 && (n = new s(e, e.getTemplateElement()), t.keyString.set(i, n)), t.stringsArray.set(e.strings, n), n;
}
var w = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new WeakMap(), me = (e, t, r) => {
	let i = T.get(t);
	i === void 0 && (n(t, t.firstChild), T.set(t, i = new oe(Object.assign({ templateFactory: pe }, r))), i.appendInto(t)), i.setValue(e), i.commit();
}, he = new class {
	handleAttributeExpressions(e, t, n, r) {
		let i = t[0];
		return i === "." ? new ce(e, t.slice(1), n).parts : i === "@" ? [new de(e, t.slice(1), r.eventContext)] : i === "?" ? [new se(e, t.slice(1), n)] : new S(e, t, n).parts;
	}
	handleTextExpression(e) {
		return new oe(e);
	}
}();
//#endregion
//#region node_modules/lit-html/lit-html.js
typeof window < "u" && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.3.0");
var E = (e, ...t) => new y(e, t, "html", he), D = (e, ...t) => new ae(e, t, "svg", he), O = (e, t) => `${e}--${t}`, k = !0;
window.ShadyCSS === void 0 ? k = !1 : window.ShadyCSS.prepareTemplateDom === void 0 && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), k = !1);
var ge = (e) => (t) => {
	let n = O(t.type, e), i = w.get(n);
	i === void 0 && (i = {
		stringsArray: /* @__PURE__ */ new WeakMap(),
		keyString: /* @__PURE__ */ new Map()
	}, w.set(n, i));
	let a = i.stringsArray.get(t.strings);
	if (a !== void 0) return a;
	let o = t.strings.join(r);
	if (a = i.keyString.get(o), a === void 0) {
		let n = t.getTemplateElement();
		k && window.ShadyCSS.prepareTemplateDom(n, e), a = new s(t, n), i.keyString.set(o, a);
	}
	return i.stringsArray.set(t.strings, a), a;
}, _e = ["html", "svg"], ve = (e) => {
	_e.forEach((t) => {
		let n = w.get(O(t, e));
		n !== void 0 && n.keyString.forEach((e) => {
			let { element: { content: t } } = e, n = /* @__PURE__ */ new Set();
			Array.from(t.querySelectorAll("style")).forEach((e) => {
				n.add(e);
			}), p(e, n);
		});
	});
}, A = /* @__PURE__ */ new Set(), ye = (e, t, n) => {
	A.add(e);
	let r = n ? n.element : document.createElement("template"), i = t.querySelectorAll("style"), { length: a } = i;
	if (a === 0) {
		window.ShadyCSS.prepareTemplateStyles(r, e);
		return;
	}
	let o = document.createElement("style");
	for (let e = 0; e < a; e++) {
		let t = i[e];
		t.parentNode.removeChild(t), o.textContent += t.textContent;
	}
	ve(e);
	let s = r.content;
	n ? te(n, o, s.firstChild) : s.insertBefore(o, s.firstChild), window.ShadyCSS.prepareTemplateStyles(r, e);
	let c = s.querySelector("style");
	if (window.ShadyCSS.nativeShadow && c !== null) t.insertBefore(c.cloneNode(!0), t.firstChild);
	else if (n) {
		s.insertBefore(o, s.firstChild);
		let e = /* @__PURE__ */ new Set();
		e.add(o), p(n, e);
	}
}, be = (e, t, r) => {
	if (!r || typeof r != "object" || !r.scopeName) throw Error("The `scopeName` option is required.");
	let i = r.scopeName, a = T.has(t), o = k && t.nodeType === 11 && !!t.host, s = o && !A.has(i), c = s ? document.createDocumentFragment() : t;
	if (me(e, c, Object.assign({ templateFactory: ge(i) }, r)), s) {
		let e = T.get(c);
		T.delete(c), ye(i, c, e.value instanceof v ? e.value.template : void 0), n(t, t.firstChild), t.appendChild(c), T.set(t, e);
	}
	!a && o && window.ShadyCSS.styleElement(t.host);
}, j;
window.JSCompiler_renameProperty = (e, t) => e;
var M = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean: return e ? "" : null;
			case Object:
			case Array: return e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		switch (t) {
			case Boolean: return e !== null;
			case Number: return e === null ? null : Number(e);
			case Object:
			case Array: return JSON.parse(e);
		}
		return e;
	}
}, N = (e, t) => t !== e && (t === t || e === e), P = {
	attribute: !0,
	type: String,
	converter: M,
	reflect: !1,
	hasChanged: N
}, F = 1, I = 4, L = 8, R = 16, z = "finalized", xe = class extends HTMLElement {
	constructor() {
		super(), this.initialize();
	}
	static get observedAttributes() {
		this.finalize();
		let e = [];
		return this._classProperties.forEach((t, n) => {
			let r = this._attributeNameForProperty(n, t);
			r !== void 0 && (this._attributeToPropertyMap.set(r, n), e.push(r));
		}), e;
	}
	static _ensureClassProperties() {
		if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
			this._classProperties = /* @__PURE__ */ new Map();
			let e = Object.getPrototypeOf(this)._classProperties;
			e !== void 0 && e.forEach((e, t) => this._classProperties.set(t, e));
		}
	}
	static createProperty(e, t = P) {
		if (this._ensureClassProperties(), this._classProperties.set(e, t), t.noAccessor || this.prototype.hasOwnProperty(e)) return;
		let n = typeof e == "symbol" ? Symbol() : `__${e}`, r = this.getPropertyDescriptor(e, n, t);
		r !== void 0 && Object.defineProperty(this.prototype, e, r);
	}
	static getPropertyDescriptor(e, t, n) {
		return {
			get() {
				return this[t];
			},
			set(r) {
				let i = this[e];
				this[t] = r, this.requestUpdateInternal(e, i, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this._classProperties && this._classProperties.get(e) || P;
	}
	static finalize() {
		let e = Object.getPrototypeOf(this);
		if (e.hasOwnProperty(z) || e.finalize(), this[z] = !0, this._ensureClassProperties(), this._attributeToPropertyMap = /* @__PURE__ */ new Map(), this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
			let e = this.properties, t = [...Object.getOwnPropertyNames(e), ...typeof Object.getOwnPropertySymbols == "function" ? Object.getOwnPropertySymbols(e) : []];
			for (let n of t) this.createProperty(n, e[n]);
		}
	}
	static _attributeNameForProperty(e, t) {
		let n = t.attribute;
		return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	static _valueHasChanged(e, t, n = N) {
		return n(e, t);
	}
	static _propertyValueFromAttribute(e, t) {
		let n = t.type, r = t.converter || M, i = typeof r == "function" ? r : r.fromAttribute;
		return i ? i(e, n) : e;
	}
	static _propertyValueToAttribute(e, t) {
		if (t.reflect === void 0) return;
		let n = t.type, r = t.converter;
		return (r && r.toAttribute || M.toAttribute)(e, n);
	}
	initialize() {
		this._updateState = 0, this._updatePromise = new Promise((e) => this._enableUpdatingResolver = e), this._changedProperties = /* @__PURE__ */ new Map(), this._saveInstanceProperties(), this.requestUpdateInternal();
	}
	_saveInstanceProperties() {
		this.constructor._classProperties.forEach((e, t) => {
			if (this.hasOwnProperty(t)) {
				let e = this[t];
				delete this[t], this._instanceProperties ||= /* @__PURE__ */ new Map(), this._instanceProperties.set(t, e);
			}
		});
	}
	_applyInstanceProperties() {
		this._instanceProperties.forEach((e, t) => this[t] = e), this._instanceProperties = void 0;
	}
	connectedCallback() {
		this.enableUpdating();
	}
	enableUpdating() {
		this._enableUpdatingResolver !== void 0 && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0);
	}
	disconnectedCallback() {}
	attributeChangedCallback(e, t, n) {
		t !== n && this._attributeToProperty(e, n);
	}
	_propertyToAttribute(e, t, n = P) {
		let r = this.constructor, i = r._attributeNameForProperty(e, n);
		if (i !== void 0) {
			let e = r._propertyValueToAttribute(t, n);
			if (e === void 0) return;
			this._updateState |= L, e == null ? this.removeAttribute(i) : this.setAttribute(i, e), this._updateState &= -9;
		}
	}
	_attributeToProperty(e, t) {
		if (this._updateState & L) return;
		let n = this.constructor, r = n._attributeToPropertyMap.get(e);
		if (r !== void 0) {
			let e = n.getPropertyOptions(r);
			this._updateState |= R, this[r] = n._propertyValueFromAttribute(t, e), this._updateState &= -17;
		}
	}
	requestUpdateInternal(e, t, n) {
		let r = !0;
		if (e !== void 0) {
			let i = this.constructor;
			n ||= i.getPropertyOptions(e), i._valueHasChanged(this[e], t, n.hasChanged) ? (this._changedProperties.has(e) || this._changedProperties.set(e, t), n.reflect === !0 && !(this._updateState & R) && (this._reflectingProperties === void 0 && (this._reflectingProperties = /* @__PURE__ */ new Map()), this._reflectingProperties.set(e, n))) : r = !1;
		}
		!this._hasRequestedUpdate && r && (this._updatePromise = this._enqueueUpdate());
	}
	requestUpdate(e, t) {
		return this.requestUpdateInternal(e, t), this.updateComplete;
	}
	async _enqueueUpdate() {
		this._updateState |= I;
		try {
			await this._updatePromise;
		} catch {}
		let e = this.performUpdate();
		return e != null && await e, !this._hasRequestedUpdate;
	}
	get _hasRequestedUpdate() {
		return this._updateState & I;
	}
	get hasUpdated() {
		return this._updateState & F;
	}
	performUpdate() {
		if (!this._hasRequestedUpdate) return;
		this._instanceProperties && this._applyInstanceProperties();
		let e = !1, t = this._changedProperties;
		try {
			e = this.shouldUpdate(t), e ? this.update(t) : this._markUpdated();
		} catch (t) {
			throw e = !1, this._markUpdated(), t;
		}
		e && (this._updateState & F || (this._updateState |= F, this.firstUpdated(t)), this.updated(t));
	}
	_markUpdated() {
		this._changedProperties = /* @__PURE__ */ new Map(), this._updateState &= -5;
	}
	get updateComplete() {
		return this._getUpdateComplete();
	}
	_getUpdateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._updatePromise;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._reflectingProperties !== void 0 && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((e, t) => this._propertyToAttribute(t, this[t], e)), this._reflectingProperties = void 0), this._markUpdated();
	}
	updated(e) {}
	firstUpdated(e) {}
};
j = z, xe[j] = !0;
//#endregion
//#region node_modules/lit-element/lib/decorators.js
var Se = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? Object.assign(Object.assign({}, t), { finisher(n) {
	n.createProperty(t.key, e);
} }) : {
	kind: "field",
	key: Symbol(),
	placement: "own",
	descriptor: {},
	initializer() {
		typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
	},
	finisher(n) {
		n.createProperty(t.key, e);
	}
}, Ce = (e, t, n) => {
	t.constructor.createProperty(n, e);
};
function B(e) {
	return (t, n) => n === void 0 ? Se(e, t) : Ce(e, t, n);
}
var we = Element.prototype;
we.msMatchesSelector || we.webkitMatchesSelector;
//#endregion
//#region node_modules/lit-element/lib/css-tag.js
var V = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, H = Symbol(), U = class {
	constructor(e, t) {
		if (t !== H) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e;
	}
	get styleSheet() {
		return this._styleSheet === void 0 && (V ? (this._styleSheet = new CSSStyleSheet(), this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet;
	}
	toString() {
		return this.cssText;
	}
}, Te = (e) => new U(String(e), H), Ee = (e) => {
	if (e instanceof U) return e.cssText;
	if (typeof e == "number") return e;
	throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
}, W = (e, ...t) => new U(t.reduce((t, n, r) => t + Ee(n) + e[r + 1], e[0]), H);
//#endregion
//#region node_modules/lit-element/lit-element.js
(window.litElementVersions || (window.litElementVersions = [])).push("2.5.1");
var De = {}, G = class extends xe {
	static getStyles() {
		return this.styles;
	}
	static _getUniqueStyles() {
		if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;
		let e = this.getStyles();
		if (Array.isArray(e)) {
			let t = (e, n) => e.reduceRight((e, n) => Array.isArray(n) ? t(n, e) : (e.add(n), e), n), n = t(e, /* @__PURE__ */ new Set()), r = [];
			n.forEach((e) => r.unshift(e)), this._styles = r;
		} else this._styles = e === void 0 ? [] : [e];
		this._styles = this._styles.map((e) => e instanceof CSSStyleSheet && !V ? Te(Array.prototype.slice.call(e.cssRules).reduce((e, t) => e + t.cssText, "")) : e);
	}
	initialize() {
		super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
	}
	createRenderRoot() {
		return this.attachShadow(this.constructor.shadowRootOptions);
	}
	adoptStyles() {
		let e = this.constructor._styles;
		e.length !== 0 && (window.ShadyCSS !== void 0 && !window.ShadyCSS.nativeShadow ? window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e) => e.cssText), this.localName) : V ? this.renderRoot.adoptedStyleSheets = e.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : this._needsShimAdoptedStyleSheets = !0);
	}
	connectedCallback() {
		super.connectedCallback(), this.hasUpdated && window.ShadyCSS !== void 0 && window.ShadyCSS.styleElement(this);
	}
	update(e) {
		let t = this.render();
		super.update(e), t !== De && this.constructor.render(t, this.renderRoot, {
			scopeName: this.localName,
			eventContext: this
		}), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach((e) => {
			let t = document.createElement("style");
			t.textContent = e.cssText, this.renderRoot.appendChild(t);
		}));
	}
	render() {
		return De;
	}
};
G.finalized = !0, G.render = be, G.shadowRootOptions = { mode: "open" };
//#endregion
//#region src/theme.ts
var K = W`
  :host,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`, Oe = W`
  :host {
    color-scheme: dark;
    color: var(--dcp-text);
    font-family: var(
      --ha-card-header-font-family,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif
    );

    --dcp-accent: var(--primary-color, #20c7c7);
    --dcp-accent-strong: #4ad7d7;
    --dcp-background: var(--primary-background-color, #0b1218);
    --dcp-surface: var(--card-background-color, #121d26);
    --dcp-surface-raised: #1a2833;
    --dcp-surface-soft: #15242d;
    --dcp-border: rgba(162, 198, 211, 0.18);
    --dcp-text: var(--primary-text-color, #f2f7f8);
    --dcp-text-muted: var(--secondary-text-color, #9db0ba);
    --dcp-radius: 16px;
    --dcp-radius-small: 8px;
    --dcp-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);

    --wa-color-surface-raised: var(--dcp-surface-raised);
    --wa-color-surface-default: var(--dcp-surface);
    --wa-color-surface-lowered: var(--dcp-background);
    --wa-color-surface-border: var(--dcp-border);
    --wa-color-text-normal: var(--dcp-text);
    --wa-color-text-quiet: var(--dcp-text-muted);
    --wa-color-focus: var(--dcp-accent-strong);
    --wa-color-brand-fill-quiet: rgba(32, 199, 199, 0.12);
    --wa-color-brand-fill-normal: rgba(32, 199, 199, 0.2);
    --wa-color-brand-fill-loud: var(--dcp-accent);
    --wa-color-brand-border-quiet: rgba(32, 199, 199, 0.2);
    --wa-color-brand-border-normal: rgba(32, 199, 199, 0.42);
    --wa-color-brand-border-loud: var(--dcp-accent-strong);
    --wa-color-brand-on-quiet: var(--dcp-accent-strong);
    --wa-color-brand-on-normal: #7ee8e8;
    --wa-color-brand-on-loud: #031516;
    --wa-color-neutral-fill-quiet: rgba(255, 255, 255, 0.035);
    --wa-color-neutral-fill-normal: rgba(255, 255, 255, 0.08);
    --wa-color-neutral-fill-loud: #dce7eb;
    --wa-color-neutral-border-quiet: rgba(255, 255, 255, 0.07);
    --wa-color-neutral-border-normal: rgba(255, 255, 255, 0.14);
    --wa-color-neutral-border-loud: rgba(255, 255, 255, 0.28);
    --wa-color-neutral-on-quiet: var(--dcp-text-muted);
    --wa-color-neutral-on-normal: var(--dcp-text);
    --wa-color-neutral-on-loud: #0b1218;
    --wa-form-control-activated-color: var(--dcp-accent);
    --wa-panel-background-color: var(--dcp-surface);
    --wa-panel-border-color: var(--dcp-border);
    --wa-panel-border-radius: var(--dcp-radius);
    --wa-form-control-border-radius: var(--dcp-radius-small);
    --wa-border-radius-s: 8px;
    --wa-border-radius-m: 12px;
    --wa-border-radius-l: var(--dcp-radius);
    --wa-shadow-m: var(--dcp-shadow);
  }

`;
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/decorate.js
function q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/TopRow/TimeDisplay.ts
function ke(e) {
	let t = e.getHours(), n = e.getMinutes(), r = t >= 12 ? "PM" : "AM";
	t %= 12, t ||= 12;
	let i = n < 10 ? `0${n}` : n;
	return `${t}:${i} ${r}`;
}
var Ae = class extends G {
	constructor() {
		super(), this.date = /* @__PURE__ */ new Date(), setInterval(() => {
			this.date = /* @__PURE__ */ new Date();
		}, 1e3);
	}
	render() {
		return E`
      <div id="time-container">
        <div id="time">
          ${ke(this.date)}
        </div>
      </div>
    `;
	}
	static get styles() {
		return [K, W`
      #time-container {
        display: flex;
        justify-content: center;
      }

      #time {
        display: flex;
        justify-content: center;
        color: var(--dcp-text);
        font-size: 24px;
        font-variant-numeric: tabular-nums;
        font-weight: 400;
        letter-spacing: -0.02em;
        line-height: 1;
      }
    `];
	}
};
q([B({ type: Date })], Ae.prototype, "date", void 0), customElements.get("time-display") || customElements.define("time-display", Ae);
//#endregion
//#region src/external/weatherIcons.ts
var je = W`
  .rain {
    fill: var(--weather-icon-rain-color, #30b3ff);
  }
  .sun {
    fill: var(--weather-icon-sun-color, #fdd93c);
  }
  .moon {
    fill: var(--weather-icon-moon-color, #fcf497);
  }
  .cloud-back {
    fill: var(--weather-icon-cloud-back-color, #d4d4d4);
  }
  .cloud-front {
    fill: var(--weather-icon-cloud-front-color, #f9f9f9);
  }
`, Me = /* @__PURE__ */ new Set([
	"partlycloudy",
	"cloudy",
	"fog",
	"windy",
	"windy-variant",
	"hail",
	"rainy",
	"snowy",
	"snowy-rainy",
	"pouring",
	"lightning",
	"lightning-rainy"
]), Ne = /* @__PURE__ */ new Set([
	"hail",
	"rainy",
	"pouring"
]), Pe = /* @__PURE__ */ new Set(["windy", "windy-variant"]), Fe = /* @__PURE__ */ new Set(["snowy", "snowy-rainy"]), Ie = /* @__PURE__ */ new Set(["lightning", "lightning-rainy"]), Le = (e, t) => D`
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 17 17'
  >
  ${e === "sunny" ? D`
        <path
          class='sun'
          d='m 14.39303,8.4033507 c 0,3.3114723 -2.684145,5.9956173 -5.9956169,5.9956173 -3.3114716,0 -5.9956168,-2.684145 -5.9956168,-5.9956173 0,-3.311471 2.6841452,-5.995617 5.9956168,-5.995617 3.3114719,0 5.9956169,2.684146 5.9956169,5.995617'
        />
      ` : ""}
  ${e === "clear-night" ? D`
        <path
          class='moon'
          d='m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752'
        />
      ` : ""}
  ${e === "partlycloudy" && t ? D`
        <path
          class='moon'
          d='m14.981 4.2112c0 1.9244-1.56 3.4844-3.484 3.4844-1.9244 0-3.4844-1.56-3.4844-3.4844s1.56-3.484 3.4844-3.484c1.924 0 3.484 1.5596 3.484 3.484'
        />
      ` : e === "partlycloudy" ? D`
        <path
          class='sun'
          d='m14.981 4.2112c0 1.9244-1.56 3.4844-3.484 3.4844-1.9244 0-3.4844-1.56-3.4844-3.4844s1.56-3.484 3.4844-3.484c1.924 0 3.484 1.5596 3.484 3.484'
        />
      ` : ""}
  ${Me.has(e) ? D`
        <path
          class='cloud-back'
          d='m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679'
        />
        <path
          class='cloud-front'
          d='m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586'
        />
      ` : ""}
  ${Ne.has(e) ? D`
        <path
          class='rain'
          d='m5.2852 14.734c-0.22401 0.24765-0.57115 0.2988-0.77505 0.11395-0.20391-0.1845-0.18732-0.53481 0.036689-0.78281 0.14817-0.16298 0.59126-0.32914 0.87559-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.065617 0.2921-0.18732 0.74965-0.33514 0.91299'
        />
        <path
          class='rain'
          d='m11.257 14.163c-0.22437 0.24765-0.57115 0.2988-0.77505 0.11395-0.2039-0.1845-0.18768-0.53481 0.03669-0.78281 0.14817-0.16298 0.59126-0.32914 0.8756-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.06562 0.2921-0.18732 0.74965-0.33514 0.91299'
        />
        <path
          class='rain'
          d='m8.432 15.878c-0.15452 0.17039-0.3937 0.20567-0.53446 0.07867-0.14041-0.12735-0.12876-0.36865 0.025753-0.53975 0.10195-0.11218 0.40711-0.22684 0.60325-0.29175 0.085725-0.02858 0.15628 0.03563 0.13652 0.12382-0.045508 0.20108-0.12912 0.51647-0.23107 0.629'
        />
        <path
          class='rain'
          d='m7.9991 14.118c-0.19226 0.21237-0.49001 0.25612-0.66499 0.09737-0.17462-0.15804-0.16051-0.45861 0.03175-0.67098 0.12665-0.14005 0.50729-0.28293 0.75071-0.36336 0.10689-0.03563 0.19473 0.0441 0.17004 0.15346-0.056092 0.25082-0.16051 0.64347-0.28751 0.78352'
        />
      ` : ""}
  ${e === "pouring" ? D`
        <path
          class='rain'
          d='m10.648 16.448c-0.19226 0.21449-0.49001 0.25894-0.66499 0.09878-0.17498-0.16016-0.16087-0.4639 0.03175-0.67874 0.12665-0.14146 0.50694-0.2854 0.75071-0.36724 0.10689-0.03563 0.19473 0.0448 0.17004 0.15558-0.05645 0.25365-0.16051 0.65017-0.28751 0.79163'
        />
        <path
          class='rain'
          d='m5.9383 16.658c-0.22437 0.25012-0.5715 0.30162-0.77505 0.11501-0.20391-0.18627-0.18768-0.54046 0.036689-0.79093 0.14817-0.1651 0.59126-0.33267 0.87559-0.42827 0.12418-0.04127 0.22648 0.05221 0.19791 0.18168-0.065617 0.29528-0.18732 0.75741-0.33514 0.92251'
        />
      ` : ""}
  ${Pe.has(e) ? D`
        <path
          class='cloud-back'
          d='m 13.59616,15.30968 c 0,0 -0.09137,-0.0071 -0.250472,-0.0187 -0.158045,-0.01235 -0.381353,-0.02893 -0.64382,-0.05715 -0.262466,-0.02716 -0.564444,-0.06385 -0.877358,-0.124531 -0.156986,-0.03034 -0.315383,-0.06844 -0.473781,-0.111478 -0.157691,-0.04551 -0.313266,-0.09842 -0.463902,-0.161219 l -0.267406,-0.0949 c -0.09984,-0.02646 -0.205669,-0.04904 -0.305153,-0.06738 -0.193322,-0.02716 -0.3838218,-0.03316 -0.5640912,-0.02011 -0.3626556,0.02611 -0.6847417,0.119239 -0.94615,0.226483 -0.2617611,0.108656 -0.4642556,0.230364 -0.600075,0.324203 -0.1358195,0.09419 -0.2049639,0.160514 -0.2049639,0.160514 0,0 0.089958,-0.01623 0.24765,-0.04445 0.1559278,-0.02575 0.3764139,-0.06174 0.6367639,-0.08714 0.2596444,-0.02646 0.5591527,-0.0441 0.8678333,-0.02328 0.076905,0.0035 0.1538111,0.01658 0.2321278,0.02293 0.077611,0.01058 0.1534581,0.02893 0.2314221,0.04022 0.07267,0.01834 0.1397,0.03986 0.213078,0.05644 l 0.238125,0.08925 c 0.09207,0.03281 0.183444,0.07055 0.275872,0.09878 0.09243,0.0261 0.185208,0.05327 0.277636,0.07161 0.184856,0.0388 0.367947,0.06174 0.543983,0.0702 0.353131,0.01905 0.678745,-0.01341 0.951442,-0.06456 0.27305,-0.05292 0.494595,-0.123119 0.646642,-0.181681 0.152047,-0.05785 0.234597,-0.104069 0.234597,-0.104069'
        />
        <path
          class='cloud-back'
          d='m 4.7519154,13.905801 c 0,0 0.091369,-0.0032 0.2511778,-0.0092 0.1580444,-0.0064 0.3820583,-0.01446 0.6455833,-0.03281 0.2631722,-0.01729 0.5662083,-0.04269 0.8812389,-0.09137 0.1576916,-0.02434 0.3175,-0.05609 0.4776611,-0.09384 0.1591027,-0.03951 0.3167944,-0.08643 0.4699,-0.14358 l 0.2702277,-0.08467 c 0.1008945,-0.02222 0.2074334,-0.04127 0.3072695,-0.05574 0.1943805,-0.01976 0.3848805,-0.0187 0.5651499,0.0014 0.3608917,0.03951 0.67945,0.144639 0.936625,0.261761 0.2575278,0.118534 0.4554364,0.247297 0.5873754,0.346781 0.132291,0.09913 0.198966,0.168275 0.198966,0.168275 0,0 -0.08925,-0.01976 -0.245886,-0.05397 C 9.9423347,14.087088 9.7232597,14.042988 9.4639681,14.00736 9.2057347,13.97173 8.9072848,13.94245 8.5978986,13.95162 c -0.077258,7.06e-4 -0.1541638,0.01058 -0.2328333,0.01411 -0.077964,0.0078 -0.1545166,0.02328 -0.2331861,0.03175 -0.073025,0.01588 -0.1404055,0.03422 -0.2141361,0.04798 l -0.2420055,0.08008 c -0.093486,0.02963 -0.1859139,0.06421 -0.2794,0.0889 C 7.3028516,14.23666 7.2093653,14.2603 7.116232,14.27512 6.9303181,14.30722 6.7465209,14.3231 6.5697792,14.32486 6.2166487,14.33046 5.8924459,14.28605 5.6218654,14.224318 5.3505793,14.161565 5.1318571,14.082895 4.9822793,14.01869 4.8327015,13.95519 4.7519154,13.905801 4.7519154,13.905801'
        />
      ` : ""}
  ${Fe.has(e) ? D`
        <path
          class='rain'
          d='m 8.4319893,15.348341 c 0,0.257881 -0.209197,0.467079 -0.467078,0.467079 -0.258586,0 -0.46743,-0.209198 -0.46743,-0.467079 0,-0.258233 0.208844,-0.467431 0.46743,-0.467431 0.257881,0 0.467078,0.209198 0.467078,0.467431'
        />
        <path
          class='rain'
          d='m 11.263878,14.358553 c 0,0.364067 -0.295275,0.659694 -0.659695,0.659694 -0.364419,0 -0.6596937,-0.295627 -0.6596937,-0.659694 0,-0.364419 0.2952747,-0.659694 0.6596937,-0.659694 0.36442,0 0.659695,0.295275 0.659695,0.659694'
        />
        <path
          class='rain'
          d='m 5.3252173,13.69847 c 0,0.364419 -0.295275,0.660047 -0.659695,0.660047 -0.364067,0 -0.659694,-0.295628 -0.659694,-0.660047 0,-0.364067 0.295627,-0.659694 0.659694,-0.659694 0.36442,0 0.659695,0.295627 0.659695,0.659694'
        />
      ` : ""}
  ${Ie.has(e) ? D`
        <path
          class='sun'
          d='m 9.9252695,10.935875 -1.6483986,2.341014 1.1170184,0.05929 -1.2169864,2.02141 3.0450261,-2.616159 H 9.8864918 L 10.97937,11.294651 10.700323,10.79794 h -0.508706 l -0.2663475,0.137936'
        />
      ` : ""}
  </svg>`;
//#endregion
//#region src/TopRow/WeatherDisplay.ts
function Re(e, t) {
	let n = `component.weather.state._.${t}`;
	return e.localize(n) ?? "unknown";
}
var J = class extends G {
	render() {
		if (!this.hass || !this.config || !this.config.weather_name || !this.hass.states[this.config.weather_name]) return E`
        <div class="unavailable-text">
          Unavailable
        </div>
      `;
		let { state: e, attributes: t } = this.hass.states[this.config.weather_name], n = Re(this.hass, e), r = t.temperature ?? -1;
		return E`
      <div class="weather-container">
        <div class="weather-icon">
            ${Le(e)}
        </div>
        <div class="temperature-weather-container">
          <span id="temperature">
            ${r.toFixed(0)}°F
          </span>
          <span>
            ${n}
          </span>
        </div>
      </div>
    `;
	}
	static get styles() {
		return [
			K,
			je,
			W`
      .weather-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
        color: var(--dcp-text);
        height: 100%;
        padding-right: 4px;
      }

      .weather-icon {
        font-size: 28px;
        display: flex;
        align-items: center;
        min-width: 32px;
        color: var(--dcp-accent-strong);
      }

      .weather-icon > * {
        flex: 0 0 32px;
      }

      .temperature-weather-container {
        display: flex;
        flex-direction: column;
        text-align: right;
        color: var(--dcp-text-muted);
        font-size: 11px;
        line-height: 1.15;
      }

      #temperature {
        color: var(--dcp-text);
        font-size: 20px;
        font-weight: 500;
        letter-spacing: -0.02em;
      }

      .unavailable-text {
        display: flex;
        justify-content: flex-end;
      }
    `
		];
	}
};
q([B({ type: Object })], J.prototype, "hass", void 0), q([B({ type: Object })], J.prototype, "config", void 0), customElements.get("weather-display") || customElements.define("weather-display", J);
//#endregion
//#region src/TopRow/TopRow.ts
var Y = class extends G {
	render() {
		return E`
      <div id="top-row">
        <weather-display .hass=${this.hass} .config=${this.config}></weather-display>
        <time-display></time-display>
      </div>
    `;
	}
	static get styles() {
		return [K, W`
      #top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        height: 100%;
      }

      weather-display {
        min-width: 0;
      }

      time-display {
        flex: 0 0 auto;
      }
    `];
	}
};
q([B({ type: Object })], Y.prototype, "hass", void 0), q([B({ type: Object })], Y.prototype, "config", void 0), customElements.get("top-row") || customElements.define("top-row", Y);
//#endregion
//#region node_modules/@mdi/js/mdi.js
var ze = "M14,19H18V5H14M6,19H10V5H6V19Z", Be = "M8,5.14V19.14L19,12.14L8,5.14Z", Ve = "M16,18H18V6H16M6,18L14.5,12L6,6V18Z", He = "M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z";
//#endregion
//#region src/Icon.ts
function X(e, t = "control-icon") {
	return E`
    <svg class=${t} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d=${e}></path>
    </svg>
  `;
}
//#endregion
//#region src/MusicPlayer/MusicPlayer.ts
function Ue(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function We(e) {
	let t = Math.max(0, Math.floor(e || 0));
	return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;
}
var Z = class extends G {
	constructor(...e) {
		super(...e), this.isScrubbing = !1, this.scrubPosition = 0, this.seekAnchor = null, this.seekAnchorTime = 0, this.seekSourceUpdatedAt = "", this.isHoldingProgress = !1;
	}
	connectedCallback() {
		super.connectedCallback(), this.clock = window.setInterval(() => this.requestUpdate(), 1e3);
	}
	disconnectedCallback() {
		window.clearInterval(this.clock), super.disconnectedCallback();
	}
	getPlaybackDetails() {
		let e = this.hass && this.config ? this.hass.states[this.config.spotify_name] : null;
		if (!e) return null;
		let { attributes: t } = e, n = {
			title: t.media_title || "Nothing playing",
			artist: t.media_artist || "",
			albumArt: t.entity_picture || "",
			isPlaying: e.state === "playing",
			duration: Number(t.media_duration) || 0,
			position: Number(t.media_position) || 0,
			positionUpdatedAt: t.media_position_updated_at || ""
		};
		return this.seekAnchor !== null && n.positionUpdatedAt && n.positionUpdatedAt !== this.seekSourceUpdatedAt && (this.seekAnchor = null), n;
	}
	getProjectedPosition(e) {
		if (!e.duration) return 0;
		let t = e.position;
		if (this.seekAnchor !== null) t = this.seekAnchor, e.isPlaying && (t += (Date.now() - this.seekAnchorTime) / 1e3);
		else if (e.isPlaying && e.positionUpdatedAt) {
			let n = Date.parse(e.positionUpdatedAt);
			Number.isNaN(n) || (t += (Date.now() - n) / 1e3);
		}
		return Ue(t, 0, e.duration);
	}
	callMediaService(e, t = {}) {
		this.hass.callService("media_player", e, {
			entity_id: this.config.spotify_name,
			...t
		}).catch((e) => {
			console.log(e);
		});
	}
	previousClicked() {
		this.seekAnchor = null, this.seekSourceUpdatedAt = "", this.callMediaService("media_previous_track");
	}
	playPauseClicked() {
		this.seekAnchor = null, this.seekSourceUpdatedAt = "", this.callMediaService("media_play_pause");
	}
	nextClicked() {
		this.seekAnchor = null, this.seekSourceUpdatedAt = "", this.callMediaService("media_next_track");
	}
	scrubbed(e) {
		this.isScrubbing = !0, this.scrubPosition = Number(e.target.value), this.requestUpdate();
	}
	progressHeld() {
		this.isHoldingProgress = !0, this.requestUpdate();
	}
	progressReleased() {
		this.isHoldingProgress = !1, this.requestUpdate();
	}
	seeked(e) {
		let t = Number(e.target.value), { positionUpdatedAt: n } = this.getPlaybackDetails();
		this.isScrubbing = !1, this.isHoldingProgress = !1, this.seekAnchor = t, this.seekAnchorTime = Date.now(), this.seekSourceUpdatedAt = n, this.callMediaService("media_seek", { seek_position: t }), this.requestUpdate();
	}
	render() {
		let e = this.getPlaybackDetails();
		if (!e) return E`
        <section id="music-player" class="unavailable">
          <p>Media player unavailable</p>
        </section>
      `;
		let t = this.getProjectedPosition(e), n = this.isScrubbing ? this.scrubPosition : t, r = e.duration ? n / e.duration * 100 : 0;
		return E`
      <section id="music-player" aria-label="Now playing">
        <div id="track">
          <div id="artwork-frame">
            ${e.albumArt ? E`<img id="album-cover" src=${e.albumArt} alt="" />` : E`<div id="album-placeholder" aria-hidden="true"></div>`}
          </div>

          <div id="track-info">
            <h1 id="title">${e.title}</h1>
            <p id="artist">${e.artist}</p>
          </div>
        </div>

        <div id="timeline">
          <div id="timestamps">
            <span>${We(n)}</span>
            <span>${We(e.duration)}</span>
          </div>
          <div
            id="progress-control"
            class=${[e.isPlaying && !this.isScrubbing ? "is-playing" : "", this.isHoldingProgress ? "is-held" : ""].filter(Boolean).join(" ")}
            style=${`--progress: ${r}%`}
          >
            <div id="progress-track" aria-hidden="true">
              <div id="progress-fill"></div>
              <div id="progress-thumb"></div>
            </div>
            <input
              id="progress"
              type="range"
              min="0"
              max=${e.duration || 1}
              step="1"
              .value=${String(n)}
              aria-label="Track position"
              ?disabled=${!e.duration}
              @pointerdown=${this.progressHeld}
              @pointerup=${this.progressReleased}
              @pointercancel=${this.progressReleased}
              @input=${this.scrubbed}
              @change=${this.seeked}
            />
          </div>
        </div>

        <div id="controls">
          <button
            class="transport-button skip-button"
            type="button"
            aria-label="Previous track"
            @click=${this.previousClicked}
          >
            ${X(He)}
          </button>
          <button
            class="transport-button play-button"
            type="button"
            aria-label=${e.isPlaying ? "Pause" : "Play"}
            @click=${this.playPauseClicked}
          >
            ${X(e.isPlaying ? ze : Be)}
          </button>
          <button
            class="transport-button skip-button"
            type="button"
            aria-label="Next track"
            @click=${this.nextClicked}
          >
            ${X(Ve)}
          </button>
        </div>
      </section>
    `;
	}
	static get styles() {
		return [K, W`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 0;
      }

      #music-player {
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto auto;
        gap: 12px;
        width: min(100%, 640px);
        height: 100%;
        margin: 0 auto;
        // padding: 8px 16px;
      }

      #music-player.unavailable {
        place-items: center;
        color: var(--dcp-text-muted);
      }

      #track {
        display: grid;
        grid-template-rows: minmax(0, 1fr) auto;
        gap: 12px;
        min-height: 0;
      }

      #artwork-frame {
        width: auto;
        height: 100%;
        max-width: 100%;
        min-height: 0;
        aspect-ratio: 1;
        justify-self: center;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: var(--dcp-radius);
        background: var(--dcp-surface);
        box-shadow: 0 14px 34px rgba(0, 0, 0, 0.32);
      }

      #album-cover,
      #album-placeholder {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: var(--dcp-radius);
        object-fit: contain;
      }

      #album-placeholder {
        background: var(--dcp-surface-raised);
      }

      #track-info {
        min-width: 0;
        min-height: 84px;
        width: 100%;
        text-align: center;
      }

      #title,
      #artist {
        display: -webkit-box;
        overflow: hidden;
        overflow-wrap: anywhere;
        text-overflow: ellipsis;
        white-space: normal;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      #title {
        margin: 0;
        color: var(--dcp-text);
        font-size: 28px;
        font-weight: 520;
        line-height: 1.08;
        letter-spacing: -0.025em;
      }

      #artist {
        margin: 4px 0 0;
        color: var(--dcp-text-muted);
        font-size: 14px;
        line-height: 1.25;
      }

      #timeline {
        width: 100%;
      }

      #timestamps {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        color: var(--dcp-text-muted);
        font-size: 11px;
        font-variant-numeric: tabular-nums;
      }

      #progress-control {
        position: relative;
        width: 100%;
        height: 24px;
      }

      #progress-track {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        height: 3px;
        overflow: visible;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.28);
        transform: translateY(-50%);
      }

      #progress-fill {
        width: var(--progress);
        height: 100%;
        border-radius: inherit;
        background: #f2f2f2;
      }

      #progress-thumb {
        position: absolute;
        top: 50%;
        left: var(--progress);
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #f2f2f2;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.38);
        transform: translate(-50%, -50%);
        transition:
          left 0s,
          width 120ms ease,
          height 120ms ease,
          box-shadow 120ms ease;
      }

      #progress-control.is-playing #progress-fill {
        transition: width 1s linear;
      }

      #progress-control.is-playing #progress-thumb {
        transition:
          left 1s linear,
          width 120ms ease,
          height 120ms ease,
          box-shadow 120ms ease;
      }

      #progress-control.is-held #progress-thumb {
        width: 20px;
        height: 20px;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.48);
      }

      #progress {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
        appearance: none;
        -webkit-appearance: none;
        cursor: pointer;
      }

      #progress:disabled {
        cursor: default;
        opacity: 0.45;
      }

      #controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 32px;
        min-height: 80px;
      }

      .transport-button {
        display: grid;
        flex: 0 0 auto;
        padding: 0;
        place-items: center;
        border: 0;
        color: var(--dcp-text);
        cursor: pointer;
        background: transparent;
        -webkit-tap-highlight-color: transparent;
      }

      .transport-button:focus-visible {
        outline: 2px solid var(--dcp-accent-strong);
        outline-offset: 5px;
      }

      .transport-button:active {
        transform: scale(0.94);
      }

      .skip-button {
        width: 56px;
        height: 56px;
      }

      .skip-button .control-icon {
        width: 44px;
        height: 44px;
      }

      .play-button {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--dcp-surface-raised);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
      }

      .play-button .control-icon {
        width: 40px;
        height: 40px;
      }

      @media (max-width: 560px) {
        #music-player {
          padding-inline: 8px;
        }

        #track {
          gap: 8px;
        }

        #controls {
          gap: 24px;
        }
      }
    `];
	}
};
q([B({ type: Object })], Z.prototype, "hass", void 0), q([B({ type: Object })], Z.prototype, "config", void 0), customElements.get("music-player") || customElements.define("music-player", Z);
//#endregion
//#region src/Recent/Recent.ts
var Q = class e extends G {
	constructor(...e) {
		super(...e), this.recentItems = [], this.queueItems = [], this.selectedList = "recent", this.isLoading = !1, this.loadFailed = !1, this.loadedEntityId = "", this.loadedTrackId = "";
	}
	updated(e) {
		if (!this.hass || !this.config || !this.config.spotifyplus_name) return;
		let t = this.hass.states[this.config.spotify_name], n = t && t.attributes && (t.attributes.media_content_id || t.attributes.media_title) || "", r = this.loadedEntityId !== this.config.spotifyplus_name, i = this.loadedTrackId !== n;
		(e.has("hass") || e.has("config")) && (r || i) && (this.loadedEntityId = this.config.spotifyplus_name, this.loadedTrackId = n, this.loadMediaLists());
	}
	static normalizeTrack(e) {
		return {
			title: e.name || "Unknown title",
			artist: (e.artists || []).map((e) => e.name).join(", ") || e.show && e.show.name || "",
			artwork: e.image_url || "",
			uri: e.uri || ""
		};
	}
	async callSpotifyPlus(e, t = {}) {
		let n = await this.hass.callService("spotifyplus", e, {
			entity_id: this.config.spotifyplus_name,
			...t
		}, void 0, !0, !0);
		if (!n.response) throw Error(`SpotifyPlus ${e} returned no response`);
		return n.response;
	}
	async loadMediaLists() {
		this.isLoading = !0, this.loadFailed = !1;
		try {
			let [t, n] = await Promise.all([this.callSpotifyPlus("get_player_recent_tracks", { limit: 6 }), this.callSpotifyPlus("get_player_queue_info")]);
			this.recentItems = (t.result.items || []).map((t) => e.normalizeTrack(t.track)).slice(0, 6), this.queueItems = (n.result.queue || []).map((t) => e.normalizeTrack(t)).slice(0, 6);
		} catch (e) {
			console.log(e), this.recentItems = [], this.queueItems = [], this.loadFailed = !0;
		} finally {
			this.isLoading = !1;
		}
	}
	selectList(e) {
		this.selectedList = e;
	}
	playItem(e) {
		e.uri && this.hass.callService("media_player", "play_media", {
			entity_id: this.config.spotify_name,
			media_content_type: e.uri.startsWith("spotify:episode:") ? "episode" : "track",
			media_content_id: e.uri
		}).catch((e) => {
			console.log(e);
		});
	}
	renderContent() {
		if (!this.config || !this.config.spotifyplus_name) return E`<p class="status">SpotifyPlus is not configured</p>`;
		if (this.isLoading) return E`<p class="status">Loading Spotify…</p>`;
		if (this.loadFailed) return E`
        <div class="status-block">
          <p class="status">Spotify lists unavailable</p>
          <button class="retry-button" type="button" @click=${this.loadMediaLists}>
            Retry
          </button>
        </div>
      `;
		let e = this.selectedList === "recent" ? this.recentItems : this.queueItems;
		return e.length ? E`
      <div id="media-list">
        ${e.map((e) => E`
          <button
            class="media-item"
            type="button"
            aria-label=${`Play ${e.title}${e.artist ? ` by ${e.artist}` : ""}`}
            @click=${() => this.playItem(e)}
          >
            <span class="artwork" aria-hidden="true">
              ${e.artwork ? E`<img src=${e.artwork} alt="" />` : E`<span class="artwork-placeholder"></span>`}
            </span>
            <span class="track-details">
              <span class="track-title">${e.title}</span>
              ${e.artist ? E`<span class="track-artist">${e.artist}</span>` : ""}
            </span>
          </button>
        `)}
      </div>
    ` : E`<p class="status">No ${this.selectedList === "recent" ? "recent tracks" : "queued tracks"}</p>`;
	}
	render() {
		return E`
      <section id="recent" aria-labelledby="recent-title">
        <div class="header">
          <h2 id="recent-title">Spotify</h2>
          <div class="tabs" role="tablist" aria-label="Spotify lists">
            <button
              class=${this.selectedList === "recent" ? "tab selected" : "tab"}
              type="button"
              role="tab"
              aria-selected=${this.selectedList === "recent" ? "true" : "false"}
              @click=${() => this.selectList("recent")}
            >
              Recent
            </button>
            <button
              class=${this.selectedList === "queue" ? "tab selected" : "tab"}
              type="button"
              role="tab"
              aria-selected=${this.selectedList === "queue" ? "true" : "false"}
              @click=${() => this.selectList("queue")}
            >
              Queue
            </button>
          </div>
        </div>
        ${this.renderContent()}
      </section>
    `;
	}
	static get styles() {
		return [K, W`
      :host {
        display: block;
        min-height: 0;
      }

      #recent {
        display: grid;
        grid-template-rows: auto minmax(0, 1fr);
        gap: 12px;
        height: 100%;
        min-height: 0;
        padding: 20px;
        overflow: hidden;
        border: 1px solid var(--dcp-border);
        border-radius: var(--dcp-radius);
        background:
          linear-gradient(145deg, rgba(255, 255, 255, 0.025), transparent 55%),
          var(--dcp-surface);
        box-shadow: var(--dcp-shadow);
      }

      .header {
        display: grid;
        gap: 8px;
      }

      #recent-title {
        margin: 0;
        color: var(--dcp-text);
        font-size: 22px;
        font-weight: 560;
        line-height: 1;
        letter-spacing: -0.025em;
      }

      .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--dcp-border);
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.18);
      }

      .tab {
        min-width: 0;
        min-height: 36px;
        padding: 0 12px;
        border: 0;
        border-radius: 8px;
        color: var(--dcp-text-muted);
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        background: transparent;
      }

      .tab.selected {
        color: var(--dcp-text);
        background: var(--dcp-surface-raised);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .tab:focus-visible,
      .media-item:focus-visible {
        outline: 2px solid var(--dcp-accent-strong);
        outline-offset: 2px;
      }

      #media-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
      }

      .media-item {
        display: grid;
        grid-template-columns: 56px minmax(0, 1fr);
        align-items: center;
        gap: 12px;
        min-width: 0;
        min-height: 56px;
        padding: 0;
        border: 0;
        border-radius: 12px;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
        background: transparent;
        -webkit-tap-highlight-color: transparent;
      }

      .media-item:active {
        transform: scale(0.98);
      }

      .artwork {
        display: block;
        width: 56px;
        height: 56px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: var(--dcp-surface-raised);
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
      }

      .artwork img,
      .artwork-placeholder {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .artwork-placeholder {
        background:
          linear-gradient(145deg, rgba(74, 215, 215, 0.22), transparent),
          var(--dcp-surface-raised);
      }

      .track-details {
        display: grid;
        gap: 4px;
        min-width: 0;
      }

      .track-title,
      .track-artist {
        display: block;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .track-title {
        color: var(--dcp-text);
        font-size: 14px;
        font-weight: 560;
        line-height: 1.2;
      }

      .track-artist {
        color: var(--dcp-text-muted);
        font-size: 12px;
        line-height: 1.2;
      }

      .status-block {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
      }

      .status {
        margin: 0;
        color: var(--dcp-text-muted);
        font-size: 13px;
      }

      .retry-button {
        min-width: 72px;
        min-height: 44px;
        padding: 0 16px;
        border: 1px solid var(--dcp-border);
        border-radius: 8px;
        color: var(--dcp-text);
        font: inherit;
        cursor: pointer;
        background: var(--dcp-surface-raised);
      }

      @media (max-width: 760px) {
        #recent {
          padding: 16px;
        }

        .media-item {
          gap: 8px;
        }
      }
    `];
	}
};
q([B({ type: Object })], Q.prototype, "hass", void 0), q([B({ type: Object })], Q.prototype, "config", void 0), q([B({ attribute: !1 })], Q.prototype, "recentItems", void 0), q([B({ attribute: !1 })], Q.prototype, "queueItems", void 0), q([B({
	type: String,
	attribute: !1
})], Q.prototype, "selectedList", void 0), q([B({
	type: Boolean,
	attribute: !1
})], Q.prototype, "isLoading", void 0), q([B({
	type: Boolean,
	attribute: !1
})], Q.prototype, "loadFailed", void 0), customElements.get("recent-media") || customElements.define("recent-media", Q);
//#endregion
//#region src/index.ts
var $ = class extends G {
	render() {
		let e = this.panel ? this.panel.config : null;
		return E`
      <div class="app-shell">
        <music-player
          .hass=${this.hass}
          .config=${e}
        ></music-player>
        <aside class="side-rail" aria-label="Media overview">
          <top-row .hass=${this.hass} .config=${e}></top-row>
          <recent-media
            .hass=${this.hass}
            .config=${e}
          ></recent-media>
        </aside>
      </div>
    `;
	}
	static get styles() {
		return [
			Oe,
			K,
			W`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: var(--dcp-background);
      }

      .app-shell {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 320px;
        gap: 16px;
        height: 100%;
        width: 100%;
        padding: 16px;
      }

      music-player {
        min-height: 0;
      }

      .side-rail {
        display: grid;
        grid-template-rows: 44px minmax(0, 1fr);
        gap: 12px;
        min-width: 0;
        min-height: 0;
      }

      top-row {
        min-width: 0;
      }

      @media (max-width: 760px) {
        .app-shell {
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 12px;
          padding: 8px;
        }

        .side-rail {
          grid-template-rows: 44px minmax(0, 1fr);
        }
      }
    `
		];
	}
};
q([B({ type: Object })], $.prototype, "hass", void 0), q([B({ type: Boolean })], $.prototype, "narrow", void 0), q([B({ type: Object })], $.prototype, "panel", void 0), customElements.get("desktop-control") || customElements.define("desktop-control", $);
//#endregion
export { $ as default };

//# sourceMappingURL=desktop-control-panel.js.map