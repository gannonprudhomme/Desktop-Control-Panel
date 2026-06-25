//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, r, i, a, o, s, c, l, u, d, f = t((() => {
	r = globalThis, i = r.ShadowRoot && (r.ShadyCSS === void 0 || r.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, a = Symbol(), o = /* @__PURE__ */ new WeakMap(), s = class {
		constructor(e, t, n) {
			if (this._$cssResult$ = !0, n !== a) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = e, this.t = t;
		}
		get styleSheet() {
			let e = this.o, t = this.t;
			if (i && e === void 0) {
				let n = t !== void 0 && t.length === 1;
				n && (e = o.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && o.set(t, e));
			}
			return e;
		}
		toString() {
			return this.cssText;
		}
	}, c = (e) => new s(typeof e == "string" ? e : e + "", void 0, a), l = (e, ...t) => new s(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
		if (!0 === e._$cssResult$) return e.cssText;
		if (typeof e == "number") return e;
		throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
	})(n) + e[r + 1], e[0]), e, a), u = (e, t) => {
		if (i) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
		else for (let n of t) {
			let t = document.createElement("style"), i = r.litNonce;
			i !== void 0 && t.setAttribute("nonce", i), t.textContent = n.cssText, e.appendChild(t);
		}
	}, d = i ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
		let t = "";
		for (let n of e.cssRules) t += n.cssText;
		return c(t);
	})(e) : e;
})), p, m, h, g, _, v, y, ee, b, te, x, S, C, ne, re, ie = t((() => {
	f(), {is: p, defineProperty: m, getOwnPropertyDescriptor: h, getOwnPropertyNames: g, getOwnPropertySymbols: _, getPrototypeOf: v} = Object, y = globalThis, ee = y.trustedTypes, b = ee ? ee.emptyScript : "", te = y.reactiveElementPolyfillSupport, x = (e, t) => e, S = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? b : null;
					break;
				case Object:
				case Array: e = e == null ? e : JSON.stringify(e);
			}
			return e;
		},
		fromAttribute(e, t) {
			let n = e;
			switch (t) {
				case Boolean:
					n = e !== null;
					break;
				case Number:
					n = e === null ? null : Number(e);
					break;
				case Object:
				case Array: try {
					n = JSON.parse(e);
				} catch {
					n = null;
				}
			}
			return n;
		}
	}, C = (e, t) => !p(e, t), ne = {
		attribute: !0,
		type: String,
		converter: S,
		reflect: !1,
		useDefault: !1,
		hasChanged: C
	}, Symbol.metadata ??= Symbol("metadata"), y.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap(), re = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ??= []).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = ne) {
			if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
				let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
				r !== void 0 && m(this.prototype, e, r);
			}
		}
		static getPropertyDescriptor(e, t, n) {
			let { get: r, set: i } = h(this.prototype, e) ?? {
				get() {
					return this[t];
				},
				set(e) {
					this[t] = e;
				}
			};
			return {
				get: r,
				set(t) {
					let a = r?.call(this);
					i?.call(this, t), this.requestUpdate(e, a, n);
				},
				configurable: !0,
				enumerable: !0
			};
		}
		static getPropertyOptions(e) {
			return this.elementProperties.get(e) ?? ne;
		}
		static _$Ei() {
			if (this.hasOwnProperty(x("elementProperties"))) return;
			let e = v(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(x("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
				let e = this.properties, t = [...g(e), ..._(e)];
				for (let n of t) this.createProperty(n, e[n]);
			}
			let e = this[Symbol.metadata];
			if (e !== null) {
				let t = litPropertyMetadata.get(e);
				if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (let [e, t] of this.elementProperties) {
				let n = this._$Eu(e, t);
				n !== void 0 && this._$Eh.set(n, e);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(e) {
			let t = [];
			if (Array.isArray(e)) {
				let n = new Set(e.flat(Infinity).reverse());
				for (let e of n) t.unshift(d(e));
			} else e !== void 0 && t.push(d(e));
			return t;
		}
		static _$Eu(e, t) {
			let n = t.attribute;
			return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
		}
		constructor() {
			super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
		}
		_$Ev() {
			this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
		}
		addController(e) {
			(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
		}
		removeController(e) {
			this._$EO?.delete(e);
		}
		_$E_() {
			let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
			for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
			e.size > 0 && (this._$Ep = e);
		}
		createRenderRoot() {
			let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return u(e, this.constructor.elementStyles), e;
		}
		connectedCallback() {
			this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
		}
		enableUpdating(e) {}
		disconnectedCallback() {
			this._$EO?.forEach((e) => e.hostDisconnected?.());
		}
		attributeChangedCallback(e, t, n) {
			this._$AK(e, n);
		}
		_$ET(e, t) {
			let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
			if (r !== void 0 && !0 === n.reflect) {
				let i = (n.converter?.toAttribute === void 0 ? S : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? S : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n, r = !1, i) {
			if (e !== void 0) {
				let a = this.constructor;
				if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? C)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
				this.C(e, t, n);
			}
			!1 === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
			n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
		}
		async _$EP() {
			this.isUpdatePending = !0;
			try {
				await this._$ES;
			} catch (e) {
				Promise.reject(e);
			}
			let e = this.scheduleUpdate();
			return e != null && await e, !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
					for (let [e, t] of this._$Ep) this[e] = t;
					this._$Ep = void 0;
				}
				let e = this.constructor.elementProperties;
				if (e.size > 0) for (let [t, n] of e) {
					let { wrapped: e } = n, r = this[t];
					!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
				}
			}
			let e = !1, t = this._$AL;
			try {
				e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
			} catch (t) {
				throw e = !1, this._$EM(), t;
			}
			e && this._$AE(t);
		}
		willUpdate(e) {}
		_$AE(e) {
			this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
		}
		_$EM() {
			this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
		}
		get updateComplete() {
			return this.getUpdateComplete();
		}
		getUpdateComplete() {
			return this._$ES;
		}
		shouldUpdate(e) {
			return !0;
		}
		update(e) {
			this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
		}
		updated(e) {}
		firstUpdated(e) {}
	}, re.elementStyles = [], re.shadowRootOptions = { mode: "open" }, re[x("elementProperties")] = /* @__PURE__ */ new Map(), re[x("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: re }), (y.reactiveElementVersions ??= []).push("2.1.2");
}));
//#endregion
//#region node_modules/lit/node_modules/lit-html/lit-html.js
function ae(e, t) {
	if (!ge(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return le === void 0 ? t : le.createHTML(t);
}
function w(e, t, n = e, r) {
	if (t === Oe) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = he(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = w(e, i._$AS(e, t.values), i, r)), t;
}
var oe, se, ce, le, ue, T, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, E, D, De, Oe, O, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue = t((() => {
	oe = globalThis, se = (e) => e, ce = oe.trustedTypes, le = ce ? ce.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ue = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, de = "?" + T, fe = `<${de}>`, pe = document, me = () => pe.createComment(""), he = (e) => e === null || typeof e != "object" && typeof e != "function", ge = Array.isArray, _e = (e) => ge(e) || typeof e?.[Symbol.iterator] == "function", ve = "[ 	\n\f\r]", ye = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, xe = />/g, Se = RegExp(`>|${ve}(?:([^\\s"'>=/]+)(${ve}*=${ve}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Ce = /'/g, we = /"/g, Te = /^(?:script|style|textarea|title)$/i, Ee = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), E = Ee(1), D = Ee(2), De = Ee(3), Oe = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), Ae = pe.createTreeWalker(pe, 129), je = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ye;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === ye ? c[1] === "!--" ? o = be : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = Se) : (Te.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = Se) : o = xe : o === Se ? c[0] === ">" ? (o = i ?? ye, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? Se : c[3] === "\"" ? we : Ce) : o === we || o === Ce ? o = Se : o === be || o === xe ? o = ye : (o = Se, i = void 0);
			let d = o === Se && e[t + 1].startsWith("/>") ? " " : "";
			a += o === ye ? n + fe : l >= 0 ? (r.push(s), n.slice(0, l) + ue + n.slice(l) + T + d) : n + T + (l === -2 ? t : d);
		}
		return [ae(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, Me = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = je(t, n);
			if (this.el = e.createElement(l, r), Ae.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = Ae.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ue)) {
						let t = u[o++], n = i.getAttribute(e).split(T), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? Ie : r[1] === "?" ? Le : r[1] === "@" ? Re : Fe
						}), i.removeAttribute(e);
					} else e.startsWith(T) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (Te.test(i.tagName)) {
						let e = i.textContent.split(T), t = e.length - 1;
						if (t > 0) {
							i.textContent = ce ? ce.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], me()), Ae.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], me());
						}
					}
				} else if (i.nodeType === 8) if (i.data === de) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(T, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += T.length - 1;
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = pe.createElement("template");
			return n.innerHTML = e, n;
		}
	}, Ne = class {
		constructor(e, t) {
			this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
		}
		get parentNode() {
			return this._$AM.parentNode;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		u(e) {
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? pe).importNode(t, !0);
			Ae.currentNode = r;
			let i = Ae.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new Pe(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ze(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = Ae.nextNode(), a++);
			}
			return Ae.currentNode = pe, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, Pe = class e {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(e, t, n, r) {
			this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
		}
		get parentNode() {
			let e = this._$AA.parentNode, t = this._$AM;
			return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
		}
		get startNode() {
			return this._$AA;
		}
		get endNode() {
			return this._$AB;
		}
		_$AI(e, t = this) {
			e = w(this, e, t), he(e) ? e === O || e == null || e === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : e !== this._$AH && e !== Oe && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? _e(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== O && he(this._$AH) ? this._$AA.nextSibling.data = e : this.T(pe.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Me.createElement(ae(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new Ne(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = ke.get(e.strings);
			return t === void 0 && ke.set(e.strings, t = new Me(e)), t;
		}
		k(t) {
			ge(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(me()), this.O(me()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = se(e).nextSibling;
				se(e).remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, Fe = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(e, t, n, r, i) {
			this.type = 1, this._$AH = O, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = O;
		}
		_$AI(e, t = this, n, r) {
			let i = this.strings, a = !1;
			if (i === void 0) e = w(this, e, t, 0), a = !he(e) || e !== this._$AH && e !== Oe, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = w(this, r[n + o], t, o), s === Oe && (s = this._$AH[o]), a ||= !he(s) || s !== this._$AH[o], s === O ? e = O : e !== O && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, Ie = class extends Fe {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === O ? void 0 : e;
		}
	}, Le = class extends Fe {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== O);
		}
	}, Re = class extends Fe {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = w(this, e, t, 0) ?? O) === Oe) return;
			let n = this._$AH, r = e === O && n !== O || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== O && (n === O || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, ze = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			w(this, e);
		}
	}, Be = {
		M: ue,
		P: T,
		A: de,
		C: 1,
		L: je,
		R: Ne,
		D: _e,
		V: w,
		I: Pe,
		H: Fe,
		N: Le,
		U: Re,
		B: Ie,
		F: ze
	}, Ve = oe.litHtmlPolyfillSupport, Ve?.(Me, Pe), (oe.litHtmlVersions ??= []).push("3.3.3"), He = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new Pe(t.insertBefore(me(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), We, k, Ge, Ke = t((() => {
	ie(), ie(), Ue(), Ue(), We = globalThis, k = class extends re {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			let e = super.createRenderRoot();
			return this.renderOptions.renderBefore ??= e.firstChild, e;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = He(t, this.renderRoot, this.renderOptions);
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(!0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(!1);
		}
		render() {
			return Oe;
		}
	}, k._$litElement$ = !0, k.finalized = !0, We.litElementHydrateSupport?.({ LitElement: k }), Ge = We.litElementPolyfillSupport, Ge?.({ LitElement: k }), (We.litElementVersions ??= []).push("4.2.2");
})), qe = t((() => {})), A = t((() => {
	ie(), Ue(), Ke(), qe();
})), Je, Ye = t((() => {
	Je = (e) => (t, n) => {
		n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
			customElements.define(e, t);
		});
	};
}));
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
function j(e) {
	return (t, n) => typeof n == "object" ? Ze(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
var Xe, Ze, Qe = t((() => {
	ie(), Xe = {
		attribute: !0,
		type: String,
		converter: S,
		reflect: !1,
		hasChanged: C
	}, Ze = (e = Xe, t, n) => {
		let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
		if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
			let { name: r } = n;
			return {
				set(n) {
					let i = t.get.call(this);
					t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
				},
				init(t) {
					return t !== void 0 && this.C(r, void 0, e, t), t;
				}
			};
		}
		if (r === "setter") {
			let { name: r } = n;
			return function(n) {
				let i = this[r];
				t.call(this, n), this.requestUpdate(r, i, e, !0, n);
			};
		}
		throw Error("Unsupported decorator location: " + r);
	};
}));
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function $e(e) {
	return j({
		...e,
		state: !0,
		attribute: !1
	});
}
var et = t((() => {
	Qe();
})), tt = t((() => {})), nt, rt = t((() => {
	nt = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
}));
//#endregion
//#region node_modules/@lit/reactive-element/decorators/query.js
function M(e, t) {
	return (n, r, i) => {
		let a = (t) => t.renderRoot?.querySelector(e) ?? null;
		if (t) {
			let { get: e, set: t } = typeof r == "object" ? n : i ?? (() => {
				let e = Symbol();
				return {
					get() {
						return this[e];
					},
					set(t) {
						this[e] = t;
					}
				};
			})();
			return nt(n, r, { get() {
				let n = e.call(this);
				return n === void 0 && (n = a(this), (n !== null || this.hasUpdated) && t.call(this, n)), n;
			} });
		}
		return nt(n, r, { get() {
			return a(this);
		} });
	};
}
var it = t((() => {
	rt();
})), at = t((() => {})), ot = t((() => {})), st = t((() => {})), ct = t((() => {})), N = t((() => {
	Ye(), Qe(), et(), tt(), it(), at(), ot(), st(), ct();
}));
N(), A();
var lt = l`
  :host,
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`, ut = l`
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
    --dcp-media-surface: rgba(24, 24, 24, 0.7);
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
function P(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/TopRow/TimeDisplay.ts
A();
function dt(e) {
	let t = e.getHours(), n = e.getMinutes(), r = t >= 12 ? "PM" : "AM";
	t %= 12, t ||= 12;
	let i = n < 10 ? `0${n}` : n;
	return `${t}:${i} ${r}`;
}
var ft = class extends k {
	constructor() {
		super(), this.date = /* @__PURE__ */ new Date(), this.date = /* @__PURE__ */ new Date(), setInterval(() => {
			this.date = /* @__PURE__ */ new Date();
		}, 1e3);
	}
	render() {
		return E`
      <div id="time-container">
        <div id="time">
          ${dt(this.date)}
        </div>
      </div>
    `;
	}
	static get styles() {
		return [lt, l`
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
//#endregion
//#region src/external/weatherIcons.ts
P([j({ type: Date })], ft.prototype, "date", void 0), customElements.get("time-display") || customElements.define("time-display", ft), A();
var pt = l`
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
`, mt = /* @__PURE__ */ new Set([
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
]), ht = /* @__PURE__ */ new Set([
	"hail",
	"rainy",
	"pouring"
]), gt = /* @__PURE__ */ new Set(["windy", "windy-variant"]), _t = /* @__PURE__ */ new Set(["snowy", "snowy-rainy"]), vt = /* @__PURE__ */ new Set(["lightning", "lightning-rainy"]), yt = (e, t) => D`
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
  ${mt.has(e) ? D`
        <path
          class='cloud-back'
          d='m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679'
        />
        <path
          class='cloud-front'
          d='m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586'
        />
      ` : ""}
  ${ht.has(e) ? D`
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
  ${gt.has(e) ? D`
        <path
          class='cloud-back'
          d='m 13.59616,15.30968 c 0,0 -0.09137,-0.0071 -0.250472,-0.0187 -0.158045,-0.01235 -0.381353,-0.02893 -0.64382,-0.05715 -0.262466,-0.02716 -0.564444,-0.06385 -0.877358,-0.124531 -0.156986,-0.03034 -0.315383,-0.06844 -0.473781,-0.111478 -0.157691,-0.04551 -0.313266,-0.09842 -0.463902,-0.161219 l -0.267406,-0.0949 c -0.09984,-0.02646 -0.205669,-0.04904 -0.305153,-0.06738 -0.193322,-0.02716 -0.3838218,-0.03316 -0.5640912,-0.02011 -0.3626556,0.02611 -0.6847417,0.119239 -0.94615,0.226483 -0.2617611,0.108656 -0.4642556,0.230364 -0.600075,0.324203 -0.1358195,0.09419 -0.2049639,0.160514 -0.2049639,0.160514 0,0 0.089958,-0.01623 0.24765,-0.04445 0.1559278,-0.02575 0.3764139,-0.06174 0.6367639,-0.08714 0.2596444,-0.02646 0.5591527,-0.0441 0.8678333,-0.02328 0.076905,0.0035 0.1538111,0.01658 0.2321278,0.02293 0.077611,0.01058 0.1534581,0.02893 0.2314221,0.04022 0.07267,0.01834 0.1397,0.03986 0.213078,0.05644 l 0.238125,0.08925 c 0.09207,0.03281 0.183444,0.07055 0.275872,0.09878 0.09243,0.0261 0.185208,0.05327 0.277636,0.07161 0.184856,0.0388 0.367947,0.06174 0.543983,0.0702 0.353131,0.01905 0.678745,-0.01341 0.951442,-0.06456 0.27305,-0.05292 0.494595,-0.123119 0.646642,-0.181681 0.152047,-0.05785 0.234597,-0.104069 0.234597,-0.104069'
        />
        <path
          class='cloud-back'
          d='m 4.7519154,13.905801 c 0,0 0.091369,-0.0032 0.2511778,-0.0092 0.1580444,-0.0064 0.3820583,-0.01446 0.6455833,-0.03281 0.2631722,-0.01729 0.5662083,-0.04269 0.8812389,-0.09137 0.1576916,-0.02434 0.3175,-0.05609 0.4776611,-0.09384 0.1591027,-0.03951 0.3167944,-0.08643 0.4699,-0.14358 l 0.2702277,-0.08467 c 0.1008945,-0.02222 0.2074334,-0.04127 0.3072695,-0.05574 0.1943805,-0.01976 0.3848805,-0.0187 0.5651499,0.0014 0.3608917,0.03951 0.67945,0.144639 0.936625,0.261761 0.2575278,0.118534 0.4554364,0.247297 0.5873754,0.346781 0.132291,0.09913 0.198966,0.168275 0.198966,0.168275 0,0 -0.08925,-0.01976 -0.245886,-0.05397 C 9.9423347,14.087088 9.7232597,14.042988 9.4639681,14.00736 9.2057347,13.97173 8.9072848,13.94245 8.5978986,13.95162 c -0.077258,7.06e-4 -0.1541638,0.01058 -0.2328333,0.01411 -0.077964,0.0078 -0.1545166,0.02328 -0.2331861,0.03175 -0.073025,0.01588 -0.1404055,0.03422 -0.2141361,0.04798 l -0.2420055,0.08008 c -0.093486,0.02963 -0.1859139,0.06421 -0.2794,0.0889 C 7.3028516,14.23666 7.2093653,14.2603 7.116232,14.27512 6.9303181,14.30722 6.7465209,14.3231 6.5697792,14.32486 6.2166487,14.33046 5.8924459,14.28605 5.6218654,14.224318 5.3505793,14.161565 5.1318571,14.082895 4.9822793,14.01869 4.8327015,13.95519 4.7519154,13.905801 4.7519154,13.905801'
        />
      ` : ""}
  ${_t.has(e) ? D`
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
  ${vt.has(e) ? D`
        <path
          class='sun'
          d='m 9.9252695,10.935875 -1.6483986,2.341014 1.1170184,0.05929 -1.2169864,2.02141 3.0450261,-2.616159 H 9.8864918 L 10.97937,11.294651 10.700323,10.79794 h -0.508706 l -0.2663475,0.137936'
        />
      ` : ""}
  </svg>`;
A(), N();
function bt(e, t) {
	let n = `component.weather.state._.${t}`;
	return e.localize(n) ?? "unknown";
}
var xt = class extends k {
	render() {
		if (!this.hass || !this.config || !this.config.weather_name || !this.hass.states[this.config.weather_name]) return E`
        <div class="unavailable-text">
          Unavailable
        </div>
      `;
		let { state: e, attributes: t } = this.hass.states[this.config.weather_name], n = bt(this.hass, e), r = t.temperature ?? -1;
		return E`
      <div class="weather-container">
        <div class="weather-icon">
            ${yt(e)}
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
			lt,
			pt,
			l`
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
P([j({ type: Object })], xt.prototype, "hass", void 0), P([j({ type: Object })], xt.prototype, "config", void 0), customElements.get("weather-display") || customElements.define("weather-display", xt), A(), N();
var St = class extends k {
	render() {
		return E`
      <div id="top-row">
        <weather-display .hass=${this.hass} .config=${this.config}></weather-display>
        <time-display></time-display>
      </div>
    `;
	}
	static get styles() {
		return [lt, l`
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
P([j({ type: Object })], St.prototype, "hass", void 0), P([j({ type: Object })], St.prototype, "config", void 0), customElements.get("top-row") || customElements.define("top-row", St);
//#endregion
//#region node_modules/@mdi/js/mdi.js
var Ct = "M14,19H18V5H14M6,19H10V5H6V19Z", wt = "M8,5.14V19.14L19,12.14L8,5.14Z", Tt = "M16,18H18V6H16M6,18L14.5,12L6,6V18Z", Et = "M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z";
//#endregion
//#region src/Icon.ts
A();
function Dt(e, t = "control-icon") {
	return E`
    <svg class=${t} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d=${e}></path>
    </svg>
  `;
}
A(), N();
function Ot(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
function kt(e) {
	let t = Math.max(0, Math.floor(e || 0));
	return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;
}
var At = class extends k {
	constructor(...e) {
		super(...e), this.isScrubbing = !1, this.scrubPosition = 0, this.seekAnchor = null, this.seekAnchorTime = 0, this.seekSourceUpdatedAt = "", this.isHoldingProgress = !1;
	}
	connectedCallback() {
		super.connectedCallback(), this.clock = window.setInterval(() => this.requestUpdate(), 1e3);
	}
	disconnectedCallback() {
		this.clock !== void 0 && window.clearInterval(this.clock), super.disconnectedCallback();
	}
	getPlaybackDetails() {
		let e = this.hass && this.config?.spotify_name ? this.hass.states[this.config.spotify_name] : null;
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
		return Ot(t, 0, e.duration);
	}
	callMediaService(e, t = {}) {
		!this.hass || !this.config?.spotify_name || this.hass.callService("media_player", e, {
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
		let t = Number(e.target.value), n = this.getPlaybackDetails();
		n && (this.isScrubbing = !1, this.isHoldingProgress = !1, this.seekAnchor = t, this.seekAnchorTime = Date.now(), this.seekSourceUpdatedAt = n.positionUpdatedAt, this.callMediaService("media_seek", { seek_position: t }), this.requestUpdate());
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
            <span>${kt(n)}</span>
            <span>${kt(e.duration)}</span>
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
            ${Dt(Et)}
          </button>
          <button
            class="transport-button play-button"
            type="button"
            aria-label=${e.isPlaying ? "Pause" : "Play"}
            @click=${this.playPauseClicked}
          >
            ${Dt(e.isPlaying ? Ct : wt)}
          </button>
          <button
            class="transport-button skip-button"
            type="button"
            aria-label="Next track"
            @click=${this.nextClicked}
          >
            ${Dt(Tt)}
          </button>
        </div>
      </section>
    `;
	}
	static get styles() {
		return [lt, l`
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
        font-size: 11px;
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
        font-size: 14px;
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
        background: var(--dcp-media-surface);
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
P([j({ type: Object })], At.prototype, "hass", void 0), P([j({ type: Object })], At.prototype, "config", void 0), customElements.get("music-player") || customElements.define("music-player", At), A(), N();
var jt = class e extends k {
	constructor(...e) {
		super(...e), this.recentItems = [], this.queueItems = [], this.selectedList = "recent", this.isLoading = !1, this.loadFailed = !1, this.loadedEntityId = "", this.loadedTrackId = "";
	}
	updated(e) {
		if (!this.hass || !this.config?.spotify_name || !this.config.spotifyplus_name || !this.hass.states[this.config.spotifyplus_name]) return;
		let t = this.hass.states[this.config.spotify_name], n = t && t.attributes && (t.attributes.media_content_id || t.attributes.media_title) || "", r = this.loadedEntityId !== this.config.spotifyplus_name, i = this.loadedTrackId !== n;
		(e.has("hass") || e.has("config")) && (r || i) && (this.loadedEntityId = this.config.spotifyplus_name, this.loadedTrackId = n, queueMicrotask(() => {
			this.loadMediaLists();
		}));
	}
	static normalizeTrack(e) {
		return {
			title: e.name || "Unknown title",
			artist: (e.artists || []).map((e) => e.name).join(", ") || e.show && e.show.name || "Unknown artist",
			artwork: e.image_url || "",
			uri: e.uri || ""
		};
	}
	async callSpotifyPlus(e, t = {}) {
		if (!this.hass || !this.config?.spotifyplus_name) throw Error("SpotifyPlus is not configured");
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
			let [t, n] = await Promise.all([this.callSpotifyPlus("get_player_recent_tracks", { limit: 50 }), this.callSpotifyPlus("get_player_queue_info")]);
			this.recentItems = (t.result.items || []).map((t) => e.normalizeTrack(t.track)), this.queueItems = (n.result.queue || []).map((t) => e.normalizeTrack(t));
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
		!e.uri || !this.hass || !this.config?.spotify_name || this.hass.callService("media_player", "play_media", {
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
              <span class="track-artist">${e.artist}</span>
            </span>
          </button>
        `)}
      </div>
    ` : E`<p class="status">No ${this.selectedList === "recent" ? "recent tracks" : "queued tracks"}</p>`;
	}
	render() {
		return E`
      <section id="recent" aria-label="Spotify">
        <div class="tabs" role="tablist" aria-label="Spotify lists">
          <button
            class=${this.selectedList === "recent" ? "tab selected" : "tab"}
            type="button"
            role="tab"
            aria-selected=${this.selectedList === "recent" ? "true" : "false"}
            @click=${() => this.selectList("recent")}
          >
            Recents
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
        ${this.renderContent()}
      </section>
    `;
	}
	static get styles() {
		return [lt, l`
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
          var(--dcp-media-surface);
        box-shadow: var(--dcp-shadow);
      }

      .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
        border: 1px solid var(--dcp-border);
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.32);
      }

      .tab {
        padding: 8px;
        border: 0;
        color: rgba(242, 247, 248, 0.58);
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        background: transparent;
      }

      .tab.selected {
        color: var(--dcp-text);
        background:
          linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12)),
          var(--dcp-media-surface);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.24);
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
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        padding-right: 4px;
        scrollbar-gutter: stable;
        -webkit-overflow-scrolling: touch;
      }

      #media-list::-webkit-scrollbar {
        width: 8px;
      }

      #media-list::-webkit-scrollbar-thumb {
        border: 2px solid transparent;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.24);
        background-clip: padding-box;
      }

      #media-list::-webkit-scrollbar-track {
        background: transparent;
      }

      .media-item {
        display: grid;
        flex: 0 0 56px;
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
P([j({ type: Object })], jt.prototype, "hass", void 0), P([j({ type: Object })], jt.prototype, "config", void 0), P([j({ attribute: !1 })], jt.prototype, "recentItems", void 0), P([j({ attribute: !1 })], jt.prototype, "queueItems", void 0), P([j({
	type: String,
	attribute: !1
})], jt.prototype, "selectedList", void 0), P([j({
	type: Boolean,
	attribute: !1
})], jt.prototype, "isLoading", void 0), P([j({
	type: Boolean,
	attribute: !1
})], jt.prototype, "loadFailed", void 0), customElements.get("recent-media") || customElements.define("recent-media", jt);
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/styles/themes/default.css?inline
var Mt = "@layer wa-native;@layer wa-base{wa-page :-webkit-any(*){scroll-margin-top:var(--scroll-margin-top)}wa-page :is(*){scroll-margin-top:var(--scroll-margin-top)}wa-page[view=desktop] [data-toggle-nav]{display:none}wa-page[view=mobile] .wa-desktop-only,wa-page[view=desktop] .wa-mobile-only{display:none!important}}@layer wa-utilities;@layer wa-color-palette{.wa-palette-default{--wa-color-red-95:#fff0ef ;--wa-color-red-90:#ffdedc ;--wa-color-red-80:#ffb8b6 ;--wa-color-red-70:#fd8f90 ;--wa-color-red-60:#f3676c ;--wa-color-red-50:#dc3146 ;--wa-color-red-40:#b30532 ;--wa-color-red-30:#8a132c ;--wa-color-red-20:#631323 ;--wa-color-red-10:#3e0913 ;--wa-color-red-05:#2a040b ;--wa-color-red:var(--wa-color-red-50);--wa-color-red-key:50;--wa-color-orange-95:#fff0e6 ;--wa-color-orange-90:#ffdfca ;--wa-color-orange-80:#ffbb94 ;--wa-color-orange-70:#ff9266 ;--wa-color-orange-60:#f46a45 ;--wa-color-orange-50:#cd491c ;--wa-color-orange-40:#9f3501 ;--wa-color-orange-30:#802700 ;--wa-color-orange-20:#601b00 ;--wa-color-orange-10:#3c0d00 ;--wa-color-orange-05:#280600 ;--wa-color-orange:var(--wa-color-orange-60);--wa-color-orange-key:60;--wa-color-yellow-95:#fef3cd ;--wa-color-yellow-90:#ffe495 ;--wa-color-yellow-80:#fac22b ;--wa-color-yellow-70:#ef9d00 ;--wa-color-yellow-60:#da7e00 ;--wa-color-yellow-50:#b45f04 ;--wa-color-yellow-40:#8c4602 ;--wa-color-yellow-30:#6f3601 ;--wa-color-yellow-20:#532600 ;--wa-color-yellow-10:#331600 ;--wa-color-yellow-05:#220c00 ;--wa-color-yellow:var(--wa-color-yellow-80);--wa-color-yellow-key:80;--wa-color-green-95:#e3f9e3 ;--wa-color-green-90:#c2f2c1 ;--wa-color-green-80:#93da98 ;--wa-color-green-70:#5dc36f ;--wa-color-green-60:#00ac49 ;--wa-color-green-50:#00883c ;--wa-color-green-40:#036730 ;--wa-color-green-30:#0a5027 ;--wa-color-green-20:#0a3a1d ;--wa-color-green-10:#052310 ;--wa-color-green-05:#031608 ;--wa-color-green:var(--wa-color-green-60);--wa-color-green-key:60;--wa-color-cyan-95:#e3f6fb ;--wa-color-cyan-90:#c5ecf7 ;--wa-color-cyan-80:#7fd6ec ;--wa-color-cyan-70:#2fbedc ;--wa-color-cyan-60:#00a3c0 ;--wa-color-cyan-50:#078098 ;--wa-color-cyan-40:#026274 ;--wa-color-cyan-30:#014c5b ;--wa-color-cyan-20:#003844 ;--wa-color-cyan-10:#002129 ;--wa-color-cyan-05:#00151b ;--wa-color-cyan:var(--wa-color-cyan-70);--wa-color-cyan-key:70;--wa-color-blue-95:#e8f3ff ;--wa-color-blue-90:#d1e8ff ;--wa-color-blue-80:#9fceff ;--wa-color-blue-70:#6eb3ff ;--wa-color-blue-60:#3e96ff ;--wa-color-blue-50:#0071ec ;--wa-color-blue-40:#0053c0 ;--wa-color-blue-30:#003f9c ;--wa-color-blue-20:#002d77 ;--wa-color-blue-10:#001a4e ;--wa-color-blue-05:#000f35 ;--wa-color-blue:var(--wa-color-blue-50);--wa-color-blue-key:50;--wa-color-indigo-95:#f0f2ff ;--wa-color-indigo-90:#dfe5ff ;--wa-color-indigo-80:#bcc7ff ;--wa-color-indigo-70:#9da9ff ;--wa-color-indigo-60:#808aff ;--wa-color-indigo-50:#6163f2 ;--wa-color-indigo-40:#4945cb ;--wa-color-indigo-30:#3933a7 ;--wa-color-indigo-20:#292381 ;--wa-color-indigo-10:#181255 ;--wa-color-indigo-05:#0d0a3a ;--wa-color-indigo:var(--wa-color-indigo-50);--wa-color-indigo-key:50;--wa-color-purple-95:#f7f0ff ;--wa-color-purple-90:#eedfff ;--wa-color-purple-80:#ddbdff ;--wa-color-purple-70:#ca99ff ;--wa-color-purple-60:#b678f5 ;--wa-color-purple-50:#9951db ;--wa-color-purple-40:#7936b3 ;--wa-color-purple-30:#612692 ;--wa-color-purple-20:#491870 ;--wa-color-purple-10:#2d0b48 ;--wa-color-purple-05:#1e0532 ;--wa-color-purple:var(--wa-color-purple-50);--wa-color-purple-key:50;--wa-color-pink-95:#feeff9 ;--wa-color-pink-90:#feddf0 ;--wa-color-pink-80:#fcb5d8 ;--wa-color-pink-70:#f78dbf ;--wa-color-pink-60:#e66ba3 ;--wa-color-pink-50:#c84382 ;--wa-color-pink-40:#9e2a6c ;--wa-color-pink-30:#7d1e58 ;--wa-color-pink-20:#5e1342 ;--wa-color-pink-10:#3c0828 ;--wa-color-pink-05:#28041a ;--wa-color-pink:var(--wa-color-pink-50);--wa-color-pink-key:50;--wa-color-gray-95:#f1f2f3 ;--wa-color-gray-90:#e4e5e9 ;--wa-color-gray-80:#c7c9d0 ;--wa-color-gray-70:#abaeb9 ;--wa-color-gray-60:#9194a2 ;--wa-color-gray-50:#717584 ;--wa-color-gray-40:#545868 ;--wa-color-gray-30:#424554 ;--wa-color-gray-20:#2f323f ;--wa-color-gray-10:#1b1d26 ;--wa-color-gray-05:#101219 ;--wa-color-gray:var(--wa-color-gray-40);--wa-color-gray-key:40}:where(:root){--wa-color-red-95:#fff0ef ;--wa-color-red-90:#ffdedc ;--wa-color-red-80:#ffb8b6 ;--wa-color-red-70:#fd8f90 ;--wa-color-red-60:#f3676c ;--wa-color-red-50:#dc3146 ;--wa-color-red-40:#b30532 ;--wa-color-red-30:#8a132c ;--wa-color-red-20:#631323 ;--wa-color-red-10:#3e0913 ;--wa-color-red-05:#2a040b ;--wa-color-red:var(--wa-color-red-50);--wa-color-red-key:50;--wa-color-orange-95:#fff0e6 ;--wa-color-orange-90:#ffdfca ;--wa-color-orange-80:#ffbb94 ;--wa-color-orange-70:#ff9266 ;--wa-color-orange-60:#f46a45 ;--wa-color-orange-50:#cd491c ;--wa-color-orange-40:#9f3501 ;--wa-color-orange-30:#802700 ;--wa-color-orange-20:#601b00 ;--wa-color-orange-10:#3c0d00 ;--wa-color-orange-05:#280600 ;--wa-color-orange:var(--wa-color-orange-60);--wa-color-orange-key:60;--wa-color-yellow-95:#fef3cd ;--wa-color-yellow-90:#ffe495 ;--wa-color-yellow-80:#fac22b ;--wa-color-yellow-70:#ef9d00 ;--wa-color-yellow-60:#da7e00 ;--wa-color-yellow-50:#b45f04 ;--wa-color-yellow-40:#8c4602 ;--wa-color-yellow-30:#6f3601 ;--wa-color-yellow-20:#532600 ;--wa-color-yellow-10:#331600 ;--wa-color-yellow-05:#220c00 ;--wa-color-yellow:var(--wa-color-yellow-80);--wa-color-yellow-key:80;--wa-color-green-95:#e3f9e3 ;--wa-color-green-90:#c2f2c1 ;--wa-color-green-80:#93da98 ;--wa-color-green-70:#5dc36f ;--wa-color-green-60:#00ac49 ;--wa-color-green-50:#00883c ;--wa-color-green-40:#036730 ;--wa-color-green-30:#0a5027 ;--wa-color-green-20:#0a3a1d ;--wa-color-green-10:#052310 ;--wa-color-green-05:#031608 ;--wa-color-green:var(--wa-color-green-60);--wa-color-green-key:60;--wa-color-cyan-95:#e3f6fb ;--wa-color-cyan-90:#c5ecf7 ;--wa-color-cyan-80:#7fd6ec ;--wa-color-cyan-70:#2fbedc ;--wa-color-cyan-60:#00a3c0 ;--wa-color-cyan-50:#078098 ;--wa-color-cyan-40:#026274 ;--wa-color-cyan-30:#014c5b ;--wa-color-cyan-20:#003844 ;--wa-color-cyan-10:#002129 ;--wa-color-cyan-05:#00151b ;--wa-color-cyan:var(--wa-color-cyan-70);--wa-color-cyan-key:70;--wa-color-blue-95:#e8f3ff ;--wa-color-blue-90:#d1e8ff ;--wa-color-blue-80:#9fceff ;--wa-color-blue-70:#6eb3ff ;--wa-color-blue-60:#3e96ff ;--wa-color-blue-50:#0071ec ;--wa-color-blue-40:#0053c0 ;--wa-color-blue-30:#003f9c ;--wa-color-blue-20:#002d77 ;--wa-color-blue-10:#001a4e ;--wa-color-blue-05:#000f35 ;--wa-color-blue:var(--wa-color-blue-50);--wa-color-blue-key:50;--wa-color-indigo-95:#f0f2ff ;--wa-color-indigo-90:#dfe5ff ;--wa-color-indigo-80:#bcc7ff ;--wa-color-indigo-70:#9da9ff ;--wa-color-indigo-60:#808aff ;--wa-color-indigo-50:#6163f2 ;--wa-color-indigo-40:#4945cb ;--wa-color-indigo-30:#3933a7 ;--wa-color-indigo-20:#292381 ;--wa-color-indigo-10:#181255 ;--wa-color-indigo-05:#0d0a3a ;--wa-color-indigo:var(--wa-color-indigo-50);--wa-color-indigo-key:50;--wa-color-purple-95:#f7f0ff ;--wa-color-purple-90:#eedfff ;--wa-color-purple-80:#ddbdff ;--wa-color-purple-70:#ca99ff ;--wa-color-purple-60:#b678f5 ;--wa-color-purple-50:#9951db ;--wa-color-purple-40:#7936b3 ;--wa-color-purple-30:#612692 ;--wa-color-purple-20:#491870 ;--wa-color-purple-10:#2d0b48 ;--wa-color-purple-05:#1e0532 ;--wa-color-purple:var(--wa-color-purple-50);--wa-color-purple-key:50;--wa-color-pink-95:#feeff9 ;--wa-color-pink-90:#feddf0 ;--wa-color-pink-80:#fcb5d8 ;--wa-color-pink-70:#f78dbf ;--wa-color-pink-60:#e66ba3 ;--wa-color-pink-50:#c84382 ;--wa-color-pink-40:#9e2a6c ;--wa-color-pink-30:#7d1e58 ;--wa-color-pink-20:#5e1342 ;--wa-color-pink-10:#3c0828 ;--wa-color-pink-05:#28041a ;--wa-color-pink:var(--wa-color-pink-50);--wa-color-pink-key:50;--wa-color-gray-95:#f1f2f3 ;--wa-color-gray-90:#e4e5e9 ;--wa-color-gray-80:#c7c9d0 ;--wa-color-gray-70:#abaeb9 ;--wa-color-gray-60:#9194a2 ;--wa-color-gray-50:#717584 ;--wa-color-gray-40:#545868 ;--wa-color-gray-30:#424554 ;--wa-color-gray-20:#2f323f ;--wa-color-gray-10:#1b1d26 ;--wa-color-gray-05:#101219 ;--wa-color-gray:var(--wa-color-gray-40);--wa-color-gray-key:40}}@layer wa-color-variant{.wa-brand-blue{--wa-color-brand-95:var(--wa-color-blue-95);--wa-color-brand-90:var(--wa-color-blue-90);--wa-color-brand-80:var(--wa-color-blue-80);--wa-color-brand-70:var(--wa-color-blue-70);--wa-color-brand-60:var(--wa-color-blue-60);--wa-color-brand-50:var(--wa-color-blue-50);--wa-color-brand-40:var(--wa-color-blue-40);--wa-color-brand-30:var(--wa-color-blue-30);--wa-color-brand-20:var(--wa-color-blue-20);--wa-color-brand-10:var(--wa-color-blue-10);--wa-color-brand-05:var(--wa-color-blue-05);--wa-color-brand:var(--wa-color-blue);--wa-color-brand-on:var(--wa-color-blue-on)}:where(:root){--wa-color-brand-95:var(--wa-color-blue-95);--wa-color-brand-90:var(--wa-color-blue-90);--wa-color-brand-80:var(--wa-color-blue-80);--wa-color-brand-70:var(--wa-color-blue-70);--wa-color-brand-60:var(--wa-color-blue-60);--wa-color-brand-50:var(--wa-color-blue-50);--wa-color-brand-40:var(--wa-color-blue-40);--wa-color-brand-30:var(--wa-color-blue-30);--wa-color-brand-20:var(--wa-color-blue-20);--wa-color-brand-10:var(--wa-color-blue-10);--wa-color-brand-05:var(--wa-color-blue-05);--wa-color-brand:var(--wa-color-blue);--wa-color-brand-on:var(--wa-color-blue-on)}.wa-brand-red{--wa-color-brand-95:var(--wa-color-red-95);--wa-color-brand-90:var(--wa-color-red-90);--wa-color-brand-80:var(--wa-color-red-80);--wa-color-brand-70:var(--wa-color-red-70);--wa-color-brand-60:var(--wa-color-red-60);--wa-color-brand-50:var(--wa-color-red-50);--wa-color-brand-40:var(--wa-color-red-40);--wa-color-brand-30:var(--wa-color-red-30);--wa-color-brand-20:var(--wa-color-red-20);--wa-color-brand-10:var(--wa-color-red-10);--wa-color-brand-05:var(--wa-color-red-05);--wa-color-brand:var(--wa-color-red);--wa-color-brand-on:var(--wa-color-red-on)}.wa-brand-orange{--wa-color-brand-95:var(--wa-color-orange-95);--wa-color-brand-90:var(--wa-color-orange-90);--wa-color-brand-80:var(--wa-color-orange-80);--wa-color-brand-70:var(--wa-color-orange-70);--wa-color-brand-60:var(--wa-color-orange-60);--wa-color-brand-50:var(--wa-color-orange-50);--wa-color-brand-40:var(--wa-color-orange-40);--wa-color-brand-30:var(--wa-color-orange-30);--wa-color-brand-20:var(--wa-color-orange-20);--wa-color-brand-10:var(--wa-color-orange-10);--wa-color-brand-05:var(--wa-color-orange-05);--wa-color-brand:var(--wa-color-orange);--wa-color-brand-on:var(--wa-color-orange-on)}.wa-brand-yellow{--wa-color-brand-95:var(--wa-color-yellow-95);--wa-color-brand-90:var(--wa-color-yellow-90);--wa-color-brand-80:var(--wa-color-yellow-80);--wa-color-brand-70:var(--wa-color-yellow-70);--wa-color-brand-60:var(--wa-color-yellow-60);--wa-color-brand-50:var(--wa-color-yellow-50);--wa-color-brand-40:var(--wa-color-yellow-40);--wa-color-brand-30:var(--wa-color-yellow-30);--wa-color-brand-20:var(--wa-color-yellow-20);--wa-color-brand-10:var(--wa-color-yellow-10);--wa-color-brand-05:var(--wa-color-yellow-05);--wa-color-brand:var(--wa-color-yellow);--wa-color-brand-on:var(--wa-color-yellow-on)}.wa-brand-green{--wa-color-brand-95:var(--wa-color-green-95);--wa-color-brand-90:var(--wa-color-green-90);--wa-color-brand-80:var(--wa-color-green-80);--wa-color-brand-70:var(--wa-color-green-70);--wa-color-brand-60:var(--wa-color-green-60);--wa-color-brand-50:var(--wa-color-green-50);--wa-color-brand-40:var(--wa-color-green-40);--wa-color-brand-30:var(--wa-color-green-30);--wa-color-brand-20:var(--wa-color-green-20);--wa-color-brand-10:var(--wa-color-green-10);--wa-color-brand-05:var(--wa-color-green-05);--wa-color-brand:var(--wa-color-green);--wa-color-brand-on:var(--wa-color-green-on)}.wa-brand-cyan{--wa-color-brand-95:var(--wa-color-cyan-95);--wa-color-brand-90:var(--wa-color-cyan-90);--wa-color-brand-80:var(--wa-color-cyan-80);--wa-color-brand-70:var(--wa-color-cyan-70);--wa-color-brand-60:var(--wa-color-cyan-60);--wa-color-brand-50:var(--wa-color-cyan-50);--wa-color-brand-40:var(--wa-color-cyan-40);--wa-color-brand-30:var(--wa-color-cyan-30);--wa-color-brand-20:var(--wa-color-cyan-20);--wa-color-brand-10:var(--wa-color-cyan-10);--wa-color-brand-05:var(--wa-color-cyan-05);--wa-color-brand:var(--wa-color-cyan);--wa-color-brand-on:var(--wa-color-cyan-on)}.wa-brand-indigo{--wa-color-brand-95:var(--wa-color-indigo-95);--wa-color-brand-90:var(--wa-color-indigo-90);--wa-color-brand-80:var(--wa-color-indigo-80);--wa-color-brand-70:var(--wa-color-indigo-70);--wa-color-brand-60:var(--wa-color-indigo-60);--wa-color-brand-50:var(--wa-color-indigo-50);--wa-color-brand-40:var(--wa-color-indigo-40);--wa-color-brand-30:var(--wa-color-indigo-30);--wa-color-brand-20:var(--wa-color-indigo-20);--wa-color-brand-10:var(--wa-color-indigo-10);--wa-color-brand-05:var(--wa-color-indigo-05);--wa-color-brand:var(--wa-color-indigo);--wa-color-brand-on:var(--wa-color-indigo-on)}.wa-brand-purple{--wa-color-brand-95:var(--wa-color-purple-95);--wa-color-brand-90:var(--wa-color-purple-90);--wa-color-brand-80:var(--wa-color-purple-80);--wa-color-brand-70:var(--wa-color-purple-70);--wa-color-brand-60:var(--wa-color-purple-60);--wa-color-brand-50:var(--wa-color-purple-50);--wa-color-brand-40:var(--wa-color-purple-40);--wa-color-brand-30:var(--wa-color-purple-30);--wa-color-brand-20:var(--wa-color-purple-20);--wa-color-brand-10:var(--wa-color-purple-10);--wa-color-brand-05:var(--wa-color-purple-05);--wa-color-brand:var(--wa-color-purple);--wa-color-brand-on:var(--wa-color-purple-on)}.wa-brand-pink{--wa-color-brand-95:var(--wa-color-pink-95);--wa-color-brand-90:var(--wa-color-pink-90);--wa-color-brand-80:var(--wa-color-pink-80);--wa-color-brand-70:var(--wa-color-pink-70);--wa-color-brand-60:var(--wa-color-pink-60);--wa-color-brand-50:var(--wa-color-pink-50);--wa-color-brand-40:var(--wa-color-pink-40);--wa-color-brand-30:var(--wa-color-pink-30);--wa-color-brand-20:var(--wa-color-pink-20);--wa-color-brand-10:var(--wa-color-pink-10);--wa-color-brand-05:var(--wa-color-pink-05);--wa-color-brand:var(--wa-color-pink);--wa-color-brand-on:var(--wa-color-pink-on)}.wa-brand-gray{--wa-color-brand-95:var(--wa-color-gray-95);--wa-color-brand-90:var(--wa-color-gray-90);--wa-color-brand-80:var(--wa-color-gray-80);--wa-color-brand-70:var(--wa-color-gray-70);--wa-color-brand-60:var(--wa-color-gray-60);--wa-color-brand-50:var(--wa-color-gray-50);--wa-color-brand-40:var(--wa-color-gray-40);--wa-color-brand-30:var(--wa-color-gray-30);--wa-color-brand-20:var(--wa-color-gray-20);--wa-color-brand-10:var(--wa-color-gray-10);--wa-color-brand-05:var(--wa-color-gray-05);--wa-color-brand:var(--wa-color-gray);--wa-color-brand-on:var(--wa-color-gray-on)}.wa-neutral-gray{--wa-color-neutral-95:var(--wa-color-gray-95);--wa-color-neutral-90:var(--wa-color-gray-90);--wa-color-neutral-80:var(--wa-color-gray-80);--wa-color-neutral-70:var(--wa-color-gray-70);--wa-color-neutral-60:var(--wa-color-gray-60);--wa-color-neutral-50:var(--wa-color-gray-50);--wa-color-neutral-40:var(--wa-color-gray-40);--wa-color-neutral-30:var(--wa-color-gray-30);--wa-color-neutral-20:var(--wa-color-gray-20);--wa-color-neutral-10:var(--wa-color-gray-10);--wa-color-neutral-05:var(--wa-color-gray-05);--wa-color-neutral:var(--wa-color-gray);--wa-color-neutral-on:var(--wa-color-gray-on)}:where(:root){--wa-color-neutral-95:var(--wa-color-gray-95);--wa-color-neutral-90:var(--wa-color-gray-90);--wa-color-neutral-80:var(--wa-color-gray-80);--wa-color-neutral-70:var(--wa-color-gray-70);--wa-color-neutral-60:var(--wa-color-gray-60);--wa-color-neutral-50:var(--wa-color-gray-50);--wa-color-neutral-40:var(--wa-color-gray-40);--wa-color-neutral-30:var(--wa-color-gray-30);--wa-color-neutral-20:var(--wa-color-gray-20);--wa-color-neutral-10:var(--wa-color-gray-10);--wa-color-neutral-05:var(--wa-color-gray-05);--wa-color-neutral:var(--wa-color-gray);--wa-color-neutral-on:var(--wa-color-gray-on)}.wa-neutral-red{--wa-color-neutral-95:var(--wa-color-red-95);--wa-color-neutral-90:var(--wa-color-red-90);--wa-color-neutral-80:var(--wa-color-red-80);--wa-color-neutral-70:var(--wa-color-red-70);--wa-color-neutral-60:var(--wa-color-red-60);--wa-color-neutral-50:var(--wa-color-red-50);--wa-color-neutral-40:var(--wa-color-red-40);--wa-color-neutral-30:var(--wa-color-red-30);--wa-color-neutral-20:var(--wa-color-red-20);--wa-color-neutral-10:var(--wa-color-red-10);--wa-color-neutral-05:var(--wa-color-red-05);--wa-color-neutral:var(--wa-color-red);--wa-color-neutral-on:var(--wa-color-red-on)}.wa-neutral-orange{--wa-color-neutral-95:var(--wa-color-orange-95);--wa-color-neutral-90:var(--wa-color-orange-90);--wa-color-neutral-80:var(--wa-color-orange-80);--wa-color-neutral-70:var(--wa-color-orange-70);--wa-color-neutral-60:var(--wa-color-orange-60);--wa-color-neutral-50:var(--wa-color-orange-50);--wa-color-neutral-40:var(--wa-color-orange-40);--wa-color-neutral-30:var(--wa-color-orange-30);--wa-color-neutral-20:var(--wa-color-orange-20);--wa-color-neutral-10:var(--wa-color-orange-10);--wa-color-neutral-05:var(--wa-color-orange-05);--wa-color-neutral:var(--wa-color-orange);--wa-color-neutral-on:var(--wa-color-orange-on)}.wa-neutral-yellow{--wa-color-neutral-95:var(--wa-color-yellow-95);--wa-color-neutral-90:var(--wa-color-yellow-90);--wa-color-neutral-80:var(--wa-color-yellow-80);--wa-color-neutral-70:var(--wa-color-yellow-70);--wa-color-neutral-60:var(--wa-color-yellow-60);--wa-color-neutral-50:var(--wa-color-yellow-50);--wa-color-neutral-40:var(--wa-color-yellow-40);--wa-color-neutral-30:var(--wa-color-yellow-30);--wa-color-neutral-20:var(--wa-color-yellow-20);--wa-color-neutral-10:var(--wa-color-yellow-10);--wa-color-neutral-05:var(--wa-color-yellow-05);--wa-color-neutral:var(--wa-color-yellow);--wa-color-neutral-on:var(--wa-color-yellow-on)}.wa-neutral-green{--wa-color-neutral-95:var(--wa-color-green-95);--wa-color-neutral-90:var(--wa-color-green-90);--wa-color-neutral-80:var(--wa-color-green-80);--wa-color-neutral-70:var(--wa-color-green-70);--wa-color-neutral-60:var(--wa-color-green-60);--wa-color-neutral-50:var(--wa-color-green-50);--wa-color-neutral-40:var(--wa-color-green-40);--wa-color-neutral-30:var(--wa-color-green-30);--wa-color-neutral-20:var(--wa-color-green-20);--wa-color-neutral-10:var(--wa-color-green-10);--wa-color-neutral-05:var(--wa-color-green-05);--wa-color-neutral:var(--wa-color-green);--wa-color-neutral-on:var(--wa-color-green-on)}.wa-neutral-cyan{--wa-color-neutral-95:var(--wa-color-cyan-95);--wa-color-neutral-90:var(--wa-color-cyan-90);--wa-color-neutral-80:var(--wa-color-cyan-80);--wa-color-neutral-70:var(--wa-color-cyan-70);--wa-color-neutral-60:var(--wa-color-cyan-60);--wa-color-neutral-50:var(--wa-color-cyan-50);--wa-color-neutral-40:var(--wa-color-cyan-40);--wa-color-neutral-30:var(--wa-color-cyan-30);--wa-color-neutral-20:var(--wa-color-cyan-20);--wa-color-neutral-10:var(--wa-color-cyan-10);--wa-color-neutral-05:var(--wa-color-cyan-05);--wa-color-neutral:var(--wa-color-cyan);--wa-color-neutral-on:var(--wa-color-cyan-on)}.wa-neutral-blue{--wa-color-neutral-95:var(--wa-color-blue-95);--wa-color-neutral-90:var(--wa-color-blue-90);--wa-color-neutral-80:var(--wa-color-blue-80);--wa-color-neutral-70:var(--wa-color-blue-70);--wa-color-neutral-60:var(--wa-color-blue-60);--wa-color-neutral-50:var(--wa-color-blue-50);--wa-color-neutral-40:var(--wa-color-blue-40);--wa-color-neutral-30:var(--wa-color-blue-30);--wa-color-neutral-20:var(--wa-color-blue-20);--wa-color-neutral-10:var(--wa-color-blue-10);--wa-color-neutral-05:var(--wa-color-blue-05);--wa-color-neutral:var(--wa-color-blue);--wa-color-neutral-on:var(--wa-color-blue-on)}.wa-neutral-indigo{--wa-color-neutral-95:var(--wa-color-indigo-95);--wa-color-neutral-90:var(--wa-color-indigo-90);--wa-color-neutral-80:var(--wa-color-indigo-80);--wa-color-neutral-70:var(--wa-color-indigo-70);--wa-color-neutral-60:var(--wa-color-indigo-60);--wa-color-neutral-50:var(--wa-color-indigo-50);--wa-color-neutral-40:var(--wa-color-indigo-40);--wa-color-neutral-30:var(--wa-color-indigo-30);--wa-color-neutral-20:var(--wa-color-indigo-20);--wa-color-neutral-10:var(--wa-color-indigo-10);--wa-color-neutral-05:var(--wa-color-indigo-05);--wa-color-neutral:var(--wa-color-indigo);--wa-color-neutral-on:var(--wa-color-indigo-on)}.wa-neutral-purple{--wa-color-neutral-95:var(--wa-color-purple-95);--wa-color-neutral-90:var(--wa-color-purple-90);--wa-color-neutral-80:var(--wa-color-purple-80);--wa-color-neutral-70:var(--wa-color-purple-70);--wa-color-neutral-60:var(--wa-color-purple-60);--wa-color-neutral-50:var(--wa-color-purple-50);--wa-color-neutral-40:var(--wa-color-purple-40);--wa-color-neutral-30:var(--wa-color-purple-30);--wa-color-neutral-20:var(--wa-color-purple-20);--wa-color-neutral-10:var(--wa-color-purple-10);--wa-color-neutral-05:var(--wa-color-purple-05);--wa-color-neutral:var(--wa-color-purple);--wa-color-neutral-on:var(--wa-color-purple-on)}.wa-neutral-pink{--wa-color-neutral-95:var(--wa-color-pink-95);--wa-color-neutral-90:var(--wa-color-pink-90);--wa-color-neutral-80:var(--wa-color-pink-80);--wa-color-neutral-70:var(--wa-color-pink-70);--wa-color-neutral-60:var(--wa-color-pink-60);--wa-color-neutral-50:var(--wa-color-pink-50);--wa-color-neutral-40:var(--wa-color-pink-40);--wa-color-neutral-30:var(--wa-color-pink-30);--wa-color-neutral-20:var(--wa-color-pink-20);--wa-color-neutral-10:var(--wa-color-pink-10);--wa-color-neutral-05:var(--wa-color-pink-05);--wa-color-neutral:var(--wa-color-pink);--wa-color-neutral-on:var(--wa-color-pink-on)}.wa-success-green{--wa-color-success-95:var(--wa-color-green-95);--wa-color-success-90:var(--wa-color-green-90);--wa-color-success-80:var(--wa-color-green-80);--wa-color-success-70:var(--wa-color-green-70);--wa-color-success-60:var(--wa-color-green-60);--wa-color-success-50:var(--wa-color-green-50);--wa-color-success-40:var(--wa-color-green-40);--wa-color-success-30:var(--wa-color-green-30);--wa-color-success-20:var(--wa-color-green-20);--wa-color-success-10:var(--wa-color-green-10);--wa-color-success-05:var(--wa-color-green-05);--wa-color-success:var(--wa-color-green);--wa-color-success-on:var(--wa-color-green-on)}:where(:root){--wa-color-success-95:var(--wa-color-green-95);--wa-color-success-90:var(--wa-color-green-90);--wa-color-success-80:var(--wa-color-green-80);--wa-color-success-70:var(--wa-color-green-70);--wa-color-success-60:var(--wa-color-green-60);--wa-color-success-50:var(--wa-color-green-50);--wa-color-success-40:var(--wa-color-green-40);--wa-color-success-30:var(--wa-color-green-30);--wa-color-success-20:var(--wa-color-green-20);--wa-color-success-10:var(--wa-color-green-10);--wa-color-success-05:var(--wa-color-green-05);--wa-color-success:var(--wa-color-green);--wa-color-success-on:var(--wa-color-green-on)}.wa-success-red{--wa-color-success-95:var(--wa-color-red-95);--wa-color-success-90:var(--wa-color-red-90);--wa-color-success-80:var(--wa-color-red-80);--wa-color-success-70:var(--wa-color-red-70);--wa-color-success-60:var(--wa-color-red-60);--wa-color-success-50:var(--wa-color-red-50);--wa-color-success-40:var(--wa-color-red-40);--wa-color-success-30:var(--wa-color-red-30);--wa-color-success-20:var(--wa-color-red-20);--wa-color-success-10:var(--wa-color-red-10);--wa-color-success-05:var(--wa-color-red-05);--wa-color-success:var(--wa-color-red);--wa-color-success-on:var(--wa-color-red-on)}.wa-success-orange{--wa-color-success-95:var(--wa-color-orange-95);--wa-color-success-90:var(--wa-color-orange-90);--wa-color-success-80:var(--wa-color-orange-80);--wa-color-success-70:var(--wa-color-orange-70);--wa-color-success-60:var(--wa-color-orange-60);--wa-color-success-50:var(--wa-color-orange-50);--wa-color-success-40:var(--wa-color-orange-40);--wa-color-success-30:var(--wa-color-orange-30);--wa-color-success-20:var(--wa-color-orange-20);--wa-color-success-10:var(--wa-color-orange-10);--wa-color-success-05:var(--wa-color-orange-05);--wa-color-success:var(--wa-color-orange);--wa-color-success-on:var(--wa-color-orange-on)}.wa-success-yellow{--wa-color-success-95:var(--wa-color-yellow-95);--wa-color-success-90:var(--wa-color-yellow-90);--wa-color-success-80:var(--wa-color-yellow-80);--wa-color-success-70:var(--wa-color-yellow-70);--wa-color-success-60:var(--wa-color-yellow-60);--wa-color-success-50:var(--wa-color-yellow-50);--wa-color-success-40:var(--wa-color-yellow-40);--wa-color-success-30:var(--wa-color-yellow-30);--wa-color-success-20:var(--wa-color-yellow-20);--wa-color-success-10:var(--wa-color-yellow-10);--wa-color-success-05:var(--wa-color-yellow-05);--wa-color-success:var(--wa-color-yellow);--wa-color-success-on:var(--wa-color-yellow-on)}.wa-success-cyan{--wa-color-success-95:var(--wa-color-cyan-95);--wa-color-success-90:var(--wa-color-cyan-90);--wa-color-success-80:var(--wa-color-cyan-80);--wa-color-success-70:var(--wa-color-cyan-70);--wa-color-success-60:var(--wa-color-cyan-60);--wa-color-success-50:var(--wa-color-cyan-50);--wa-color-success-40:var(--wa-color-cyan-40);--wa-color-success-30:var(--wa-color-cyan-30);--wa-color-success-20:var(--wa-color-cyan-20);--wa-color-success-10:var(--wa-color-cyan-10);--wa-color-success-05:var(--wa-color-cyan-05);--wa-color-success:var(--wa-color-cyan);--wa-color-success-on:var(--wa-color-cyan-on)}.wa-success-blue{--wa-color-success-95:var(--wa-color-blue-95);--wa-color-success-90:var(--wa-color-blue-90);--wa-color-success-80:var(--wa-color-blue-80);--wa-color-success-70:var(--wa-color-blue-70);--wa-color-success-60:var(--wa-color-blue-60);--wa-color-success-50:var(--wa-color-blue-50);--wa-color-success-40:var(--wa-color-blue-40);--wa-color-success-30:var(--wa-color-blue-30);--wa-color-success-20:var(--wa-color-blue-20);--wa-color-success-10:var(--wa-color-blue-10);--wa-color-success-05:var(--wa-color-blue-05);--wa-color-success:var(--wa-color-blue);--wa-color-success-on:var(--wa-color-blue-on)}.wa-success-indigo{--wa-color-success-95:var(--wa-color-indigo-95);--wa-color-success-90:var(--wa-color-indigo-90);--wa-color-success-80:var(--wa-color-indigo-80);--wa-color-success-70:var(--wa-color-indigo-70);--wa-color-success-60:var(--wa-color-indigo-60);--wa-color-success-50:var(--wa-color-indigo-50);--wa-color-success-40:var(--wa-color-indigo-40);--wa-color-success-30:var(--wa-color-indigo-30);--wa-color-success-20:var(--wa-color-indigo-20);--wa-color-success-10:var(--wa-color-indigo-10);--wa-color-success-05:var(--wa-color-indigo-05);--wa-color-success:var(--wa-color-indigo);--wa-color-success-on:var(--wa-color-indigo-on)}.wa-success-purple{--wa-color-success-95:var(--wa-color-purple-95);--wa-color-success-90:var(--wa-color-purple-90);--wa-color-success-80:var(--wa-color-purple-80);--wa-color-success-70:var(--wa-color-purple-70);--wa-color-success-60:var(--wa-color-purple-60);--wa-color-success-50:var(--wa-color-purple-50);--wa-color-success-40:var(--wa-color-purple-40);--wa-color-success-30:var(--wa-color-purple-30);--wa-color-success-20:var(--wa-color-purple-20);--wa-color-success-10:var(--wa-color-purple-10);--wa-color-success-05:var(--wa-color-purple-05);--wa-color-success:var(--wa-color-purple);--wa-color-success-on:var(--wa-color-purple-on)}.wa-success-pink{--wa-color-success-95:var(--wa-color-pink-95);--wa-color-success-90:var(--wa-color-pink-90);--wa-color-success-80:var(--wa-color-pink-80);--wa-color-success-70:var(--wa-color-pink-70);--wa-color-success-60:var(--wa-color-pink-60);--wa-color-success-50:var(--wa-color-pink-50);--wa-color-success-40:var(--wa-color-pink-40);--wa-color-success-30:var(--wa-color-pink-30);--wa-color-success-20:var(--wa-color-pink-20);--wa-color-success-10:var(--wa-color-pink-10);--wa-color-success-05:var(--wa-color-pink-05);--wa-color-success:var(--wa-color-pink);--wa-color-success-on:var(--wa-color-pink-on)}.wa-success-gray{--wa-color-success-95:var(--wa-color-gray-95);--wa-color-success-90:var(--wa-color-gray-90);--wa-color-success-80:var(--wa-color-gray-80);--wa-color-success-70:var(--wa-color-gray-70);--wa-color-success-60:var(--wa-color-gray-60);--wa-color-success-50:var(--wa-color-gray-50);--wa-color-success-40:var(--wa-color-gray-40);--wa-color-success-30:var(--wa-color-gray-30);--wa-color-success-20:var(--wa-color-gray-20);--wa-color-success-10:var(--wa-color-gray-10);--wa-color-success-05:var(--wa-color-gray-05);--wa-color-success:var(--wa-color-gray);--wa-color-success-on:var(--wa-color-gray-on)}.wa-warning-yellow{--wa-color-warning-95:var(--wa-color-yellow-95);--wa-color-warning-90:var(--wa-color-yellow-90);--wa-color-warning-80:var(--wa-color-yellow-80);--wa-color-warning-70:var(--wa-color-yellow-70);--wa-color-warning-60:var(--wa-color-yellow-60);--wa-color-warning-50:var(--wa-color-yellow-50);--wa-color-warning-40:var(--wa-color-yellow-40);--wa-color-warning-30:var(--wa-color-yellow-30);--wa-color-warning-20:var(--wa-color-yellow-20);--wa-color-warning-10:var(--wa-color-yellow-10);--wa-color-warning-05:var(--wa-color-yellow-05);--wa-color-warning:var(--wa-color-yellow);--wa-color-warning-on:var(--wa-color-yellow-on)}:where(:root){--wa-color-warning-95:var(--wa-color-yellow-95);--wa-color-warning-90:var(--wa-color-yellow-90);--wa-color-warning-80:var(--wa-color-yellow-80);--wa-color-warning-70:var(--wa-color-yellow-70);--wa-color-warning-60:var(--wa-color-yellow-60);--wa-color-warning-50:var(--wa-color-yellow-50);--wa-color-warning-40:var(--wa-color-yellow-40);--wa-color-warning-30:var(--wa-color-yellow-30);--wa-color-warning-20:var(--wa-color-yellow-20);--wa-color-warning-10:var(--wa-color-yellow-10);--wa-color-warning-05:var(--wa-color-yellow-05);--wa-color-warning:var(--wa-color-yellow);--wa-color-warning-on:var(--wa-color-yellow-on)}.wa-warning-red{--wa-color-warning-95:var(--wa-color-red-95);--wa-color-warning-90:var(--wa-color-red-90);--wa-color-warning-80:var(--wa-color-red-80);--wa-color-warning-70:var(--wa-color-red-70);--wa-color-warning-60:var(--wa-color-red-60);--wa-color-warning-50:var(--wa-color-red-50);--wa-color-warning-40:var(--wa-color-red-40);--wa-color-warning-30:var(--wa-color-red-30);--wa-color-warning-20:var(--wa-color-red-20);--wa-color-warning-10:var(--wa-color-red-10);--wa-color-warning-05:var(--wa-color-red-05);--wa-color-warning:var(--wa-color-red);--wa-color-warning-on:var(--wa-color-red-on)}.wa-warning-orange{--wa-color-warning-95:var(--wa-color-orange-95);--wa-color-warning-90:var(--wa-color-orange-90);--wa-color-warning-80:var(--wa-color-orange-80);--wa-color-warning-70:var(--wa-color-orange-70);--wa-color-warning-60:var(--wa-color-orange-60);--wa-color-warning-50:var(--wa-color-orange-50);--wa-color-warning-40:var(--wa-color-orange-40);--wa-color-warning-30:var(--wa-color-orange-30);--wa-color-warning-20:var(--wa-color-orange-20);--wa-color-warning-10:var(--wa-color-orange-10);--wa-color-warning-05:var(--wa-color-orange-05);--wa-color-warning:var(--wa-color-orange);--wa-color-warning-on:var(--wa-color-orange-on)}.wa-warning-green{--wa-color-warning-95:var(--wa-color-green-95);--wa-color-warning-90:var(--wa-color-green-90);--wa-color-warning-80:var(--wa-color-green-80);--wa-color-warning-70:var(--wa-color-green-70);--wa-color-warning-60:var(--wa-color-green-60);--wa-color-warning-50:var(--wa-color-green-50);--wa-color-warning-40:var(--wa-color-green-40);--wa-color-warning-30:var(--wa-color-green-30);--wa-color-warning-20:var(--wa-color-green-20);--wa-color-warning-10:var(--wa-color-green-10);--wa-color-warning-05:var(--wa-color-green-05);--wa-color-warning:var(--wa-color-green);--wa-color-warning-on:var(--wa-color-green-on)}.wa-warning-cyan{--wa-color-warning-95:var(--wa-color-cyan-95);--wa-color-warning-90:var(--wa-color-cyan-90);--wa-color-warning-80:var(--wa-color-cyan-80);--wa-color-warning-70:var(--wa-color-cyan-70);--wa-color-warning-60:var(--wa-color-cyan-60);--wa-color-warning-50:var(--wa-color-cyan-50);--wa-color-warning-40:var(--wa-color-cyan-40);--wa-color-warning-30:var(--wa-color-cyan-30);--wa-color-warning-20:var(--wa-color-cyan-20);--wa-color-warning-10:var(--wa-color-cyan-10);--wa-color-warning-05:var(--wa-color-cyan-05);--wa-color-warning:var(--wa-color-cyan);--wa-color-warning-on:var(--wa-color-cyan-on)}.wa-warning-blue{--wa-color-warning-95:var(--wa-color-blue-95);--wa-color-warning-90:var(--wa-color-blue-90);--wa-color-warning-80:var(--wa-color-blue-80);--wa-color-warning-70:var(--wa-color-blue-70);--wa-color-warning-60:var(--wa-color-blue-60);--wa-color-warning-50:var(--wa-color-blue-50);--wa-color-warning-40:var(--wa-color-blue-40);--wa-color-warning-30:var(--wa-color-blue-30);--wa-color-warning-20:var(--wa-color-blue-20);--wa-color-warning-10:var(--wa-color-blue-10);--wa-color-warning-05:var(--wa-color-blue-05);--wa-color-warning:var(--wa-color-blue);--wa-color-warning-on:var(--wa-color-blue-on)}.wa-warning-indigo{--wa-color-warning-95:var(--wa-color-indigo-95);--wa-color-warning-90:var(--wa-color-indigo-90);--wa-color-warning-80:var(--wa-color-indigo-80);--wa-color-warning-70:var(--wa-color-indigo-70);--wa-color-warning-60:var(--wa-color-indigo-60);--wa-color-warning-50:var(--wa-color-indigo-50);--wa-color-warning-40:var(--wa-color-indigo-40);--wa-color-warning-30:var(--wa-color-indigo-30);--wa-color-warning-20:var(--wa-color-indigo-20);--wa-color-warning-10:var(--wa-color-indigo-10);--wa-color-warning-05:var(--wa-color-indigo-05);--wa-color-warning:var(--wa-color-indigo);--wa-color-warning-on:var(--wa-color-indigo-on)}.wa-warning-purple{--wa-color-warning-95:var(--wa-color-purple-95);--wa-color-warning-90:var(--wa-color-purple-90);--wa-color-warning-80:var(--wa-color-purple-80);--wa-color-warning-70:var(--wa-color-purple-70);--wa-color-warning-60:var(--wa-color-purple-60);--wa-color-warning-50:var(--wa-color-purple-50);--wa-color-warning-40:var(--wa-color-purple-40);--wa-color-warning-30:var(--wa-color-purple-30);--wa-color-warning-20:var(--wa-color-purple-20);--wa-color-warning-10:var(--wa-color-purple-10);--wa-color-warning-05:var(--wa-color-purple-05);--wa-color-warning:var(--wa-color-purple);--wa-color-warning-on:var(--wa-color-purple-on)}.wa-warning-pink{--wa-color-warning-95:var(--wa-color-pink-95);--wa-color-warning-90:var(--wa-color-pink-90);--wa-color-warning-80:var(--wa-color-pink-80);--wa-color-warning-70:var(--wa-color-pink-70);--wa-color-warning-60:var(--wa-color-pink-60);--wa-color-warning-50:var(--wa-color-pink-50);--wa-color-warning-40:var(--wa-color-pink-40);--wa-color-warning-30:var(--wa-color-pink-30);--wa-color-warning-20:var(--wa-color-pink-20);--wa-color-warning-10:var(--wa-color-pink-10);--wa-color-warning-05:var(--wa-color-pink-05);--wa-color-warning:var(--wa-color-pink);--wa-color-warning-on:var(--wa-color-pink-on)}.wa-warning-gray{--wa-color-warning-95:var(--wa-color-gray-95);--wa-color-warning-90:var(--wa-color-gray-90);--wa-color-warning-80:var(--wa-color-gray-80);--wa-color-warning-70:var(--wa-color-gray-70);--wa-color-warning-60:var(--wa-color-gray-60);--wa-color-warning-50:var(--wa-color-gray-50);--wa-color-warning-40:var(--wa-color-gray-40);--wa-color-warning-30:var(--wa-color-gray-30);--wa-color-warning-20:var(--wa-color-gray-20);--wa-color-warning-10:var(--wa-color-gray-10);--wa-color-warning-05:var(--wa-color-gray-05);--wa-color-warning:var(--wa-color-gray);--wa-color-warning-on:var(--wa-color-gray-on)}.wa-danger-red{--wa-color-danger-95:var(--wa-color-red-95);--wa-color-danger-90:var(--wa-color-red-90);--wa-color-danger-80:var(--wa-color-red-80);--wa-color-danger-70:var(--wa-color-red-70);--wa-color-danger-60:var(--wa-color-red-60);--wa-color-danger-50:var(--wa-color-red-50);--wa-color-danger-40:var(--wa-color-red-40);--wa-color-danger-30:var(--wa-color-red-30);--wa-color-danger-20:var(--wa-color-red-20);--wa-color-danger-10:var(--wa-color-red-10);--wa-color-danger-05:var(--wa-color-red-05);--wa-color-danger:var(--wa-color-red);--wa-color-danger-on:var(--wa-color-red-on)}:where(:root){--wa-color-danger-95:var(--wa-color-red-95);--wa-color-danger-90:var(--wa-color-red-90);--wa-color-danger-80:var(--wa-color-red-80);--wa-color-danger-70:var(--wa-color-red-70);--wa-color-danger-60:var(--wa-color-red-60);--wa-color-danger-50:var(--wa-color-red-50);--wa-color-danger-40:var(--wa-color-red-40);--wa-color-danger-30:var(--wa-color-red-30);--wa-color-danger-20:var(--wa-color-red-20);--wa-color-danger-10:var(--wa-color-red-10);--wa-color-danger-05:var(--wa-color-red-05);--wa-color-danger:var(--wa-color-red);--wa-color-danger-on:var(--wa-color-red-on)}.wa-danger-orange{--wa-color-danger-95:var(--wa-color-orange-95);--wa-color-danger-90:var(--wa-color-orange-90);--wa-color-danger-80:var(--wa-color-orange-80);--wa-color-danger-70:var(--wa-color-orange-70);--wa-color-danger-60:var(--wa-color-orange-60);--wa-color-danger-50:var(--wa-color-orange-50);--wa-color-danger-40:var(--wa-color-orange-40);--wa-color-danger-30:var(--wa-color-orange-30);--wa-color-danger-20:var(--wa-color-orange-20);--wa-color-danger-10:var(--wa-color-orange-10);--wa-color-danger-05:var(--wa-color-orange-05);--wa-color-danger:var(--wa-color-orange);--wa-color-danger-on:var(--wa-color-orange-on)}.wa-danger-yellow{--wa-color-danger-95:var(--wa-color-yellow-95);--wa-color-danger-90:var(--wa-color-yellow-90);--wa-color-danger-80:var(--wa-color-yellow-80);--wa-color-danger-70:var(--wa-color-yellow-70);--wa-color-danger-60:var(--wa-color-yellow-60);--wa-color-danger-50:var(--wa-color-yellow-50);--wa-color-danger-40:var(--wa-color-yellow-40);--wa-color-danger-30:var(--wa-color-yellow-30);--wa-color-danger-20:var(--wa-color-yellow-20);--wa-color-danger-10:var(--wa-color-yellow-10);--wa-color-danger-05:var(--wa-color-yellow-05);--wa-color-danger:var(--wa-color-yellow);--wa-color-danger-on:var(--wa-color-yellow-on)}.wa-danger-green{--wa-color-danger-95:var(--wa-color-green-95);--wa-color-danger-90:var(--wa-color-green-90);--wa-color-danger-80:var(--wa-color-green-80);--wa-color-danger-70:var(--wa-color-green-70);--wa-color-danger-60:var(--wa-color-green-60);--wa-color-danger-50:var(--wa-color-green-50);--wa-color-danger-40:var(--wa-color-green-40);--wa-color-danger-30:var(--wa-color-green-30);--wa-color-danger-20:var(--wa-color-green-20);--wa-color-danger-10:var(--wa-color-green-10);--wa-color-danger-05:var(--wa-color-green-05);--wa-color-danger:var(--wa-color-green);--wa-color-danger-on:var(--wa-color-green-on)}.wa-danger-cyan{--wa-color-danger-95:var(--wa-color-cyan-95);--wa-color-danger-90:var(--wa-color-cyan-90);--wa-color-danger-80:var(--wa-color-cyan-80);--wa-color-danger-70:var(--wa-color-cyan-70);--wa-color-danger-60:var(--wa-color-cyan-60);--wa-color-danger-50:var(--wa-color-cyan-50);--wa-color-danger-40:var(--wa-color-cyan-40);--wa-color-danger-30:var(--wa-color-cyan-30);--wa-color-danger-20:var(--wa-color-cyan-20);--wa-color-danger-10:var(--wa-color-cyan-10);--wa-color-danger-05:var(--wa-color-cyan-05);--wa-color-danger:var(--wa-color-cyan);--wa-color-danger-on:var(--wa-color-cyan-on)}.wa-danger-blue{--wa-color-danger-95:var(--wa-color-blue-95);--wa-color-danger-90:var(--wa-color-blue-90);--wa-color-danger-80:var(--wa-color-blue-80);--wa-color-danger-70:var(--wa-color-blue-70);--wa-color-danger-60:var(--wa-color-blue-60);--wa-color-danger-50:var(--wa-color-blue-50);--wa-color-danger-40:var(--wa-color-blue-40);--wa-color-danger-30:var(--wa-color-blue-30);--wa-color-danger-20:var(--wa-color-blue-20);--wa-color-danger-10:var(--wa-color-blue-10);--wa-color-danger-05:var(--wa-color-blue-05);--wa-color-danger:var(--wa-color-blue);--wa-color-danger-on:var(--wa-color-blue-on)}.wa-danger-indigo{--wa-color-danger-95:var(--wa-color-indigo-95);--wa-color-danger-90:var(--wa-color-indigo-90);--wa-color-danger-80:var(--wa-color-indigo-80);--wa-color-danger-70:var(--wa-color-indigo-70);--wa-color-danger-60:var(--wa-color-indigo-60);--wa-color-danger-50:var(--wa-color-indigo-50);--wa-color-danger-40:var(--wa-color-indigo-40);--wa-color-danger-30:var(--wa-color-indigo-30);--wa-color-danger-20:var(--wa-color-indigo-20);--wa-color-danger-10:var(--wa-color-indigo-10);--wa-color-danger-05:var(--wa-color-indigo-05);--wa-color-danger:var(--wa-color-indigo);--wa-color-danger-on:var(--wa-color-indigo-on)}.wa-danger-purple{--wa-color-danger-95:var(--wa-color-purple-95);--wa-color-danger-90:var(--wa-color-purple-90);--wa-color-danger-80:var(--wa-color-purple-80);--wa-color-danger-70:var(--wa-color-purple-70);--wa-color-danger-60:var(--wa-color-purple-60);--wa-color-danger-50:var(--wa-color-purple-50);--wa-color-danger-40:var(--wa-color-purple-40);--wa-color-danger-30:var(--wa-color-purple-30);--wa-color-danger-20:var(--wa-color-purple-20);--wa-color-danger-10:var(--wa-color-purple-10);--wa-color-danger-05:var(--wa-color-purple-05);--wa-color-danger:var(--wa-color-purple);--wa-color-danger-on:var(--wa-color-purple-on)}.wa-danger-pink{--wa-color-danger-95:var(--wa-color-pink-95);--wa-color-danger-90:var(--wa-color-pink-90);--wa-color-danger-80:var(--wa-color-pink-80);--wa-color-danger-70:var(--wa-color-pink-70);--wa-color-danger-60:var(--wa-color-pink-60);--wa-color-danger-50:var(--wa-color-pink-50);--wa-color-danger-40:var(--wa-color-pink-40);--wa-color-danger-30:var(--wa-color-pink-30);--wa-color-danger-20:var(--wa-color-pink-20);--wa-color-danger-10:var(--wa-color-pink-10);--wa-color-danger-05:var(--wa-color-pink-05);--wa-color-danger:var(--wa-color-pink);--wa-color-danger-on:var(--wa-color-pink-on)}.wa-danger-gray{--wa-color-danger-95:var(--wa-color-gray-95);--wa-color-danger-90:var(--wa-color-gray-90);--wa-color-danger-80:var(--wa-color-gray-80);--wa-color-danger-70:var(--wa-color-gray-70);--wa-color-danger-60:var(--wa-color-gray-60);--wa-color-danger-50:var(--wa-color-gray-50);--wa-color-danger-40:var(--wa-color-gray-40);--wa-color-danger-30:var(--wa-color-gray-30);--wa-color-danger-20:var(--wa-color-gray-20);--wa-color-danger-10:var(--wa-color-gray-10);--wa-color-danger-05:var(--wa-color-gray-05);--wa-color-danger:var(--wa-color-gray);--wa-color-danger-on:var(--wa-color-gray-on)}}@layer wa-theme{.wa-theme-default,.wa-light,.wa-dark .wa-invert,.wa-light .wa-theme-default,.wa-dark .wa-theme-default.wa-invert,.wa-dark .wa-theme-default .wa-invert{--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light;color:var(--wa-color-text-normal);--wa-color-surface-raised:white;--wa-color-surface-default:white;--wa-color-surface-lowered:var(--wa-color-neutral-95);--wa-color-surface-border:var(--wa-color-neutral-90);--wa-color-text-normal:var(--wa-color-neutral-10);--wa-color-text-quiet:var(--wa-color-neutral-40);--wa-color-text-link:var(--wa-color-brand-40);--wa-color-overlay-modal:color-mix(in oklab, var(--wa-color-neutral-05) 50%, transparent);--wa-color-overlay-inline:color-mix(in oklab, var(--wa-color-neutral-80) 25%, transparent);--wa-color-shadow:color-mix(in oklab, var(--wa-color-neutral-05) calc(var(--wa-shadow-blur-scale) * 4% + 8%), transparent);--wa-color-focus:var(--wa-color-brand-60);--wa-color-mix-hover:oklch(from currentColor calc(1 - l) c h) 10%;--wa-color-mix-active:var(--wa-color-surface-default) 10%;--wa-color-brand-fill-quiet:var(--wa-color-brand-95);--wa-color-brand-fill-normal:var(--wa-color-brand-90);--wa-color-brand-fill-loud:var(--wa-color-brand-50);--wa-color-brand-border-quiet:var(--wa-color-brand-90);--wa-color-brand-border-normal:var(--wa-color-brand-80);--wa-color-brand-border-loud:var(--wa-color-brand-60);--wa-color-brand-on-quiet:var(--wa-color-brand-40);--wa-color-brand-on-normal:var(--wa-color-brand-30);--wa-color-brand-on-loud:white;--wa-color-success-fill-quiet:var(--wa-color-success-95);--wa-color-success-fill-normal:var(--wa-color-success-90);--wa-color-success-fill-loud:var(--wa-color-success-50);--wa-color-success-border-quiet:var(--wa-color-success-90);--wa-color-success-border-normal:var(--wa-color-success-80);--wa-color-success-border-loud:var(--wa-color-success-60);--wa-color-success-on-quiet:var(--wa-color-success-40);--wa-color-success-on-normal:var(--wa-color-success-30);--wa-color-success-on-loud:white;--wa-color-warning-fill-quiet:var(--wa-color-warning-95);--wa-color-warning-fill-normal:var(--wa-color-warning-90);--wa-color-warning-fill-loud:var(--wa-color-warning-50);--wa-color-warning-border-quiet:var(--wa-color-warning-90);--wa-color-warning-border-normal:var(--wa-color-warning-80);--wa-color-warning-border-loud:var(--wa-color-warning-60);--wa-color-warning-on-quiet:var(--wa-color-warning-40);--wa-color-warning-on-normal:var(--wa-color-warning-30);--wa-color-warning-on-loud:white;--wa-color-danger-fill-quiet:var(--wa-color-danger-95);--wa-color-danger-fill-normal:var(--wa-color-danger-90);--wa-color-danger-fill-loud:var(--wa-color-danger-50);--wa-color-danger-border-quiet:var(--wa-color-danger-90);--wa-color-danger-border-normal:var(--wa-color-danger-80);--wa-color-danger-border-loud:var(--wa-color-danger-60);--wa-color-danger-on-quiet:var(--wa-color-danger-40);--wa-color-danger-on-normal:var(--wa-color-danger-30);--wa-color-danger-on-loud:white;--wa-color-neutral-fill-quiet:var(--wa-color-neutral-95);--wa-color-neutral-fill-normal:var(--wa-color-neutral-90);--wa-color-neutral-fill-loud:var(--wa-color-neutral-20);--wa-color-neutral-border-quiet:var(--wa-color-neutral-90);--wa-color-neutral-border-normal:var(--wa-color-neutral-80);--wa-color-neutral-border-loud:var(--wa-color-neutral-60);--wa-color-neutral-on-quiet:var(--wa-color-neutral-40);--wa-color-neutral-on-normal:var(--wa-color-neutral-30);--wa-color-neutral-on-loud:white}:where(:root){--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light;color:var(--wa-color-text-normal);--wa-color-surface-raised:white;--wa-color-surface-default:white;--wa-color-surface-lowered:var(--wa-color-neutral-95);--wa-color-surface-border:var(--wa-color-neutral-90);--wa-color-text-normal:var(--wa-color-neutral-10);--wa-color-text-quiet:var(--wa-color-neutral-40);--wa-color-text-link:var(--wa-color-brand-40);--wa-color-overlay-modal:color-mix(in oklab, var(--wa-color-neutral-05) 50%, transparent);--wa-color-overlay-inline:color-mix(in oklab, var(--wa-color-neutral-80) 25%, transparent);--wa-color-shadow:color-mix(in oklab, var(--wa-color-neutral-05) calc(var(--wa-shadow-blur-scale) * 4% + 8%), transparent);--wa-color-focus:var(--wa-color-brand-60);--wa-color-mix-hover:oklch(from currentColor calc(1 - l) c h) 10%;--wa-color-mix-active:var(--wa-color-surface-default) 10%;--wa-color-brand-fill-quiet:var(--wa-color-brand-95);--wa-color-brand-fill-normal:var(--wa-color-brand-90);--wa-color-brand-fill-loud:var(--wa-color-brand-50);--wa-color-brand-border-quiet:var(--wa-color-brand-90);--wa-color-brand-border-normal:var(--wa-color-brand-80);--wa-color-brand-border-loud:var(--wa-color-brand-60);--wa-color-brand-on-quiet:var(--wa-color-brand-40);--wa-color-brand-on-normal:var(--wa-color-brand-30);--wa-color-brand-on-loud:white;--wa-color-success-fill-quiet:var(--wa-color-success-95);--wa-color-success-fill-normal:var(--wa-color-success-90);--wa-color-success-fill-loud:var(--wa-color-success-50);--wa-color-success-border-quiet:var(--wa-color-success-90);--wa-color-success-border-normal:var(--wa-color-success-80);--wa-color-success-border-loud:var(--wa-color-success-60);--wa-color-success-on-quiet:var(--wa-color-success-40);--wa-color-success-on-normal:var(--wa-color-success-30);--wa-color-success-on-loud:white;--wa-color-warning-fill-quiet:var(--wa-color-warning-95);--wa-color-warning-fill-normal:var(--wa-color-warning-90);--wa-color-warning-fill-loud:var(--wa-color-warning-50);--wa-color-warning-border-quiet:var(--wa-color-warning-90);--wa-color-warning-border-normal:var(--wa-color-warning-80);--wa-color-warning-border-loud:var(--wa-color-warning-60);--wa-color-warning-on-quiet:var(--wa-color-warning-40);--wa-color-warning-on-normal:var(--wa-color-warning-30);--wa-color-warning-on-loud:white;--wa-color-danger-fill-quiet:var(--wa-color-danger-95);--wa-color-danger-fill-normal:var(--wa-color-danger-90);--wa-color-danger-fill-loud:var(--wa-color-danger-50);--wa-color-danger-border-quiet:var(--wa-color-danger-90);--wa-color-danger-border-normal:var(--wa-color-danger-80);--wa-color-danger-border-loud:var(--wa-color-danger-60);--wa-color-danger-on-quiet:var(--wa-color-danger-40);--wa-color-danger-on-normal:var(--wa-color-danger-30);--wa-color-danger-on-loud:white;--wa-color-neutral-fill-quiet:var(--wa-color-neutral-95);--wa-color-neutral-fill-normal:var(--wa-color-neutral-90);--wa-color-neutral-fill-loud:var(--wa-color-neutral-20);--wa-color-neutral-border-quiet:var(--wa-color-neutral-90);--wa-color-neutral-border-normal:var(--wa-color-neutral-80);--wa-color-neutral-border-loud:var(--wa-color-neutral-60);--wa-color-neutral-on-quiet:var(--wa-color-neutral-40);--wa-color-neutral-on-normal:var(--wa-color-neutral-30);--wa-color-neutral-on-loud:white}.wa-dark,.wa-invert,.wa-dark .wa-theme-default,.wa-light .wa-theme-default.wa-invert,.wa-light .wa-theme-default .wa-invert{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark;color:var(--wa-color-text-normal);--wa-color-surface-raised:var(--wa-color-neutral-10);--wa-color-surface-default:var(--wa-color-neutral-05);--wa-color-surface-lowered:color-mix(in oklab, var(--wa-color-surface-default), black 20%);--wa-color-surface-border:var(--wa-color-neutral-20);--wa-color-text-normal:var(--wa-color-neutral-95);--wa-color-text-quiet:var(--wa-color-neutral-60);--wa-color-text-link:var(--wa-color-brand-70);--wa-color-overlay-modal:#0009;--wa-color-overlay-inline:color-mix(in oklab, var(--wa-color-neutral-50) 10%, transparent);--wa-color-shadow:color-mix(in oklab, var(--wa-color-surface-lowered) calc(var(--wa-shadow-blur-scale) * 32% + 40%), transparent);--wa-color-focus:var(--wa-color-brand-60);--wa-color-mix-hover:oklch(from currentColor calc(1 - l) c h) 20%;--wa-color-mix-active:var(--wa-color-surface-default) 20%;--wa-color-brand-fill-quiet:var(--wa-color-brand-10);--wa-color-brand-fill-normal:var(--wa-color-brand-20);--wa-color-brand-fill-loud:var(--wa-color-brand-50);--wa-color-brand-border-quiet:var(--wa-color-brand-20);--wa-color-brand-border-normal:var(--wa-color-brand-30);--wa-color-brand-border-loud:var(--wa-color-brand-40);--wa-color-brand-on-quiet:var(--wa-color-brand-60);--wa-color-brand-on-normal:var(--wa-color-brand-70);--wa-color-brand-on-loud:white;--wa-color-success-fill-quiet:var(--wa-color-success-10);--wa-color-success-fill-normal:var(--wa-color-success-20);--wa-color-success-fill-loud:var(--wa-color-success-50);--wa-color-success-border-quiet:var(--wa-color-success-20);--wa-color-success-border-normal:var(--wa-color-success-30);--wa-color-success-border-loud:var(--wa-color-success-40);--wa-color-success-on-quiet:var(--wa-color-success-60);--wa-color-success-on-normal:var(--wa-color-success-70);--wa-color-success-on-loud:white;--wa-color-warning-fill-quiet:var(--wa-color-warning-10);--wa-color-warning-fill-normal:var(--wa-color-warning-20);--wa-color-warning-fill-loud:var(--wa-color-warning-50);--wa-color-warning-border-quiet:var(--wa-color-warning-20);--wa-color-warning-border-normal:var(--wa-color-warning-30);--wa-color-warning-border-loud:var(--wa-color-warning-40);--wa-color-warning-on-quiet:var(--wa-color-warning-60);--wa-color-warning-on-normal:var(--wa-color-warning-70);--wa-color-warning-on-loud:white;--wa-color-danger-fill-quiet:var(--wa-color-danger-10);--wa-color-danger-fill-normal:var(--wa-color-danger-20);--wa-color-danger-fill-loud:var(--wa-color-danger-50);--wa-color-danger-border-quiet:var(--wa-color-danger-20);--wa-color-danger-border-normal:var(--wa-color-danger-30);--wa-color-danger-border-loud:var(--wa-color-danger-40);--wa-color-danger-on-quiet:var(--wa-color-danger-60);--wa-color-danger-on-normal:var(--wa-color-danger-70);--wa-color-danger-on-loud:white;--wa-color-neutral-fill-quiet:var(--wa-color-neutral-10);--wa-color-neutral-fill-normal:var(--wa-color-neutral-20);--wa-color-neutral-fill-loud:var(--wa-color-neutral-90);--wa-color-neutral-border-quiet:var(--wa-color-neutral-20);--wa-color-neutral-border-normal:var(--wa-color-neutral-30);--wa-color-neutral-border-loud:var(--wa-color-neutral-40);--wa-color-neutral-on-quiet:var(--wa-color-neutral-60);--wa-color-neutral-on-normal:var(--wa-color-neutral-70);--wa-color-neutral-on-loud:var(--wa-color-neutral-05)}@supports (color:color(display-p3 0 0 0)){.wa-dark,.wa-invert,.wa-dark .wa-theme-default,.wa-light .wa-theme-default.wa-invert,.wa-light .wa-theme-default .wa-invert{--wa-color-overlay-modal:color(display-p3 0 0 0/.6)}}@supports (color:lab(0% 0 0)){.wa-dark,.wa-invert,.wa-dark .wa-theme-default,.wa-light .wa-theme-default.wa-invert,.wa-light .wa-theme-default .wa-invert{--wa-color-overlay-modal:lab(0% 0 0/.6)}}.wa-theme-default,.wa-light,.wa-dark,.wa-invert{font-family:var(--wa-font-family-body);--wa-font-family-body:ui-sans-serif, system-ui, sans-serif;--wa-font-family-heading:var(--wa-font-family-body);--wa-font-family-code:ui-monospace, monospace;--wa-font-family-longform:ui-serif, serif;--wa-font-size-scale:1;--wa-font-size-3xs:round(calc(var(--wa-font-size-2xs) / 1.125), 1px);--wa-font-size-2xs:round(calc(var(--wa-font-size-xs) / 1.125), 1px);--wa-font-size-xs:round(calc(var(--wa-font-size-s) / 1.125), 1px);--wa-font-size-s:round(calc(var(--wa-font-size-m) / 1.125), 1px);--wa-font-size-m:calc(1rem * var(--wa-font-size-scale));--wa-font-size-l:round(calc(var(--wa-font-size-m) * 1.125 * 1.125), 1px);--wa-font-size-xl:round(calc(var(--wa-font-size-l) * 1.125 * 1.125), 1px);--wa-font-size-2xl:round(calc(var(--wa-font-size-xl) * 1.125 * 1.125), 1px);--wa-font-size-3xl:round(calc(var(--wa-font-size-2xl) * 1.125 * 1.125), 1px);--wa-font-size-4xl:round(calc(var(--wa-font-size-3xl) * 1.125 * 1.125), 1px);--wa-font-size-5xl:round(calc(var(--wa-font-size-4xl) * 1.125 * 1.125), 1px);--wa-font-size-smaller:round(calc(1em / 1.125), 1px);--wa-font-size-larger:round(calc(1em * 1.125 * 1.125), 1px);--wa-font-weight-light:300;--wa-font-weight-normal:400;--wa-font-weight-semibold:500;--wa-font-weight-bold:600;--wa-font-weight-body:var(--wa-font-weight-normal);--wa-font-weight-heading:var(--wa-font-weight-bold);--wa-font-weight-code:var(--wa-font-weight-normal);--wa-font-weight-longform:var(--wa-font-weight-normal);--wa-font-weight-action:var(--wa-font-weight-semibold);--wa-line-height-condensed:1.2;--wa-line-height-normal:1.6;--wa-line-height-expanded:2;--wa-link-decoration-default:underline color-mix(in oklab, currentColor 70%, transparent) dotted;--wa-link-decoration-hover:underline;--wa-space-scale:1;--wa-space-3xs:calc(var(--wa-space-scale) * .125rem);--wa-space-2xs:calc(var(--wa-space-scale) * .25rem);--wa-space-xs:calc(var(--wa-space-scale) * .5rem);--wa-space-s:calc(var(--wa-space-scale) * .75rem);--wa-space-m:calc(var(--wa-space-scale) * 1rem);--wa-space-l:calc(var(--wa-space-scale) * 1.5rem);--wa-space-xl:calc(var(--wa-space-scale) * 2rem);--wa-space-2xl:calc(var(--wa-space-scale) * 2.5rem);--wa-space-3xl:calc(var(--wa-space-scale) * 3rem);--wa-space-4xl:calc(var(--wa-space-scale) * 4rem);--wa-space-5xl:calc(var(--wa-space-scale) * 5rem);--wa-content-spacing:var(--wa-space-l);--wa-border-style:solid;--wa-border-width-scale:1;--wa-border-width-s:calc(var(--wa-border-width-scale) * .0625rem);--wa-border-width-m:calc(var(--wa-border-width-scale) * .125rem);--wa-border-width-l:calc(var(--wa-border-width-scale) * .1875rem);--wa-border-radius-scale:1;--wa-border-radius-s:calc(var(--wa-border-radius-scale) * .1875rem);--wa-border-radius-m:calc(var(--wa-border-radius-scale) * .375rem);--wa-border-radius-l:calc(var(--wa-border-radius-scale) * .75rem);--wa-border-radius-pill:9999px;--wa-border-radius-circle:50%;--wa-border-radius-square:0px;--wa-focus-ring-style:solid;--wa-focus-ring-width:.1875rem;--wa-focus-ring:var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);--wa-focus-ring-offset:.0625rem;--wa-shadow-offset-x-scale:0;--wa-shadow-offset-x-s:calc(var(--wa-shadow-offset-x-scale) * .125rem);--wa-shadow-offset-x-m:calc(var(--wa-shadow-offset-x-scale) * .25rem);--wa-shadow-offset-x-l:calc(var(--wa-shadow-offset-x-scale) * .5rem);--wa-shadow-offset-y-scale:1;--wa-shadow-offset-y-s:calc(var(--wa-shadow-offset-y-scale) * .125rem);--wa-shadow-offset-y-m:calc(var(--wa-shadow-offset-y-scale) * .25rem);--wa-shadow-offset-y-l:calc(var(--wa-shadow-offset-y-scale) * .5rem);--wa-shadow-blur-scale:1;--wa-shadow-blur-s:calc(var(--wa-shadow-blur-scale) * .125rem);--wa-shadow-blur-m:calc(var(--wa-shadow-blur-scale) * .25rem);--wa-shadow-blur-l:calc(var(--wa-shadow-blur-scale) * .5rem);--wa-shadow-spread-scale:-.5;--wa-shadow-spread-s:calc(var(--wa-shadow-spread-scale) * .125rem);--wa-shadow-spread-m:calc(var(--wa-shadow-spread-scale) * .25rem);--wa-shadow-spread-l:calc(var(--wa-shadow-spread-scale) * .5rem);--wa-shadow-s:var(--wa-shadow-offset-x-s) var(--wa-shadow-offset-y-s) var(--wa-shadow-blur-s) var(--wa-shadow-spread-s) var(--wa-color-shadow);--wa-shadow-m:var(--wa-shadow-offset-x-m) var(--wa-shadow-offset-y-m) var(--wa-shadow-blur-m) var(--wa-shadow-spread-m) var(--wa-color-shadow);--wa-shadow-l:var(--wa-shadow-offset-x-l) var(--wa-shadow-offset-y-l) var(--wa-shadow-blur-l) var(--wa-shadow-spread-l) var(--wa-color-shadow);--wa-transition-easing:ease;--wa-transition-slow:.3s;--wa-transition-normal:.15s;--wa-transition-fast:75ms;--wa-form-control-background-color:var(--wa-color-surface-default);--wa-form-control-border-color:var(--wa-color-neutral-border-loud);--wa-form-control-border-style:var(--wa-border-style);--wa-form-control-border-width:var(--wa-border-width-s);--wa-form-control-border-radius:var(--wa-border-radius-m);--wa-form-control-activated-color:var(--wa-color-brand-fill-loud);--wa-form-control-label-color:var(--wa-color-text-normal);--wa-form-control-label-font-weight:var(--wa-font-weight-semibold);--wa-form-control-label-line-height:var(--wa-line-height-condensed);--wa-form-control-value-color:var(--wa-color-text-normal);--wa-form-control-value-font-weight:var(--wa-font-weight-body);--wa-form-control-value-line-height:var(--wa-line-height-condensed);--wa-form-control-hint-color:var(--wa-color-text-quiet);--wa-form-control-hint-font-weight:var(--wa-font-weight-body);--wa-form-control-hint-line-height:var(--wa-line-height-normal);--wa-form-control-placeholder-color:var(--wa-color-gray-50);--wa-form-control-required-content:\"*\";--wa-form-control-required-content-color:inherit;--wa-form-control-required-content-offset:.1em;--wa-form-control-padding-block:.75em;--wa-form-control-padding-inline:1em;--wa-form-control-height:round(calc(2 * var(--wa-form-control-padding-block) + 1em * var(--wa-form-control-value-line-height)), 1px);--wa-form-control-toggle-size:round(1.25em, 1px);--wa-button-transform-hover:none;--wa-button-transform-active:scale(.9875);--wa-panel-border-style:var(--wa-border-style);--wa-panel-border-width:var(--wa-border-width-s);--wa-panel-border-radius:var(--wa-border-radius-l);--wa-tooltip-arrow-size:.375rem;--wa-tooltip-background-color:var(--wa-color-text-normal);--wa-tooltip-border-color:var(--wa-tooltip-background-color);--wa-tooltip-border-style:var(--wa-border-style);--wa-tooltip-border-width:var(--wa-border-width-s);--wa-tooltip-border-radius:var(--wa-border-radius-s);--wa-tooltip-content-color:var(--wa-color-surface-default);--wa-tooltip-font-size:var(--wa-font-size-s);--wa-tooltip-line-height:var(--wa-line-height-normal)}:where(:root){font-family:var(--wa-font-family-body);--wa-font-family-body:ui-sans-serif, system-ui, sans-serif;--wa-font-family-heading:var(--wa-font-family-body);--wa-font-family-code:ui-monospace, monospace;--wa-font-family-longform:ui-serif, serif;--wa-font-size-scale:1;--wa-font-size-3xs:round(calc(var(--wa-font-size-2xs) / 1.125), 1px);--wa-font-size-2xs:round(calc(var(--wa-font-size-xs) / 1.125), 1px);--wa-font-size-xs:round(calc(var(--wa-font-size-s) / 1.125), 1px);--wa-font-size-s:round(calc(var(--wa-font-size-m) / 1.125), 1px);--wa-font-size-m:calc(1rem * var(--wa-font-size-scale));--wa-font-size-l:round(calc(var(--wa-font-size-m) * 1.125 * 1.125), 1px);--wa-font-size-xl:round(calc(var(--wa-font-size-l) * 1.125 * 1.125), 1px);--wa-font-size-2xl:round(calc(var(--wa-font-size-xl) * 1.125 * 1.125), 1px);--wa-font-size-3xl:round(calc(var(--wa-font-size-2xl) * 1.125 * 1.125), 1px);--wa-font-size-4xl:round(calc(var(--wa-font-size-3xl) * 1.125 * 1.125), 1px);--wa-font-size-5xl:round(calc(var(--wa-font-size-4xl) * 1.125 * 1.125), 1px);--wa-font-size-smaller:round(calc(1em / 1.125), 1px);--wa-font-size-larger:round(calc(1em * 1.125 * 1.125), 1px);--wa-font-weight-light:300;--wa-font-weight-normal:400;--wa-font-weight-semibold:500;--wa-font-weight-bold:600;--wa-font-weight-body:var(--wa-font-weight-normal);--wa-font-weight-heading:var(--wa-font-weight-bold);--wa-font-weight-code:var(--wa-font-weight-normal);--wa-font-weight-longform:var(--wa-font-weight-normal);--wa-font-weight-action:var(--wa-font-weight-semibold);--wa-line-height-condensed:1.2;--wa-line-height-normal:1.6;--wa-line-height-expanded:2;--wa-link-decoration-default:underline color-mix(in oklab, currentColor 70%, transparent) dotted;--wa-link-decoration-hover:underline;--wa-space-scale:1;--wa-space-3xs:calc(var(--wa-space-scale) * .125rem);--wa-space-2xs:calc(var(--wa-space-scale) * .25rem);--wa-space-xs:calc(var(--wa-space-scale) * .5rem);--wa-space-s:calc(var(--wa-space-scale) * .75rem);--wa-space-m:calc(var(--wa-space-scale) * 1rem);--wa-space-l:calc(var(--wa-space-scale) * 1.5rem);--wa-space-xl:calc(var(--wa-space-scale) * 2rem);--wa-space-2xl:calc(var(--wa-space-scale) * 2.5rem);--wa-space-3xl:calc(var(--wa-space-scale) * 3rem);--wa-space-4xl:calc(var(--wa-space-scale) * 4rem);--wa-space-5xl:calc(var(--wa-space-scale) * 5rem);--wa-content-spacing:var(--wa-space-l);--wa-border-style:solid;--wa-border-width-scale:1;--wa-border-width-s:calc(var(--wa-border-width-scale) * .0625rem);--wa-border-width-m:calc(var(--wa-border-width-scale) * .125rem);--wa-border-width-l:calc(var(--wa-border-width-scale) * .1875rem);--wa-border-radius-scale:1;--wa-border-radius-s:calc(var(--wa-border-radius-scale) * .1875rem);--wa-border-radius-m:calc(var(--wa-border-radius-scale) * .375rem);--wa-border-radius-l:calc(var(--wa-border-radius-scale) * .75rem);--wa-border-radius-pill:9999px;--wa-border-radius-circle:50%;--wa-border-radius-square:0px;--wa-focus-ring-style:solid;--wa-focus-ring-width:.1875rem;--wa-focus-ring:var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus);--wa-focus-ring-offset:.0625rem;--wa-shadow-offset-x-scale:0;--wa-shadow-offset-x-s:calc(var(--wa-shadow-offset-x-scale) * .125rem);--wa-shadow-offset-x-m:calc(var(--wa-shadow-offset-x-scale) * .25rem);--wa-shadow-offset-x-l:calc(var(--wa-shadow-offset-x-scale) * .5rem);--wa-shadow-offset-y-scale:1;--wa-shadow-offset-y-s:calc(var(--wa-shadow-offset-y-scale) * .125rem);--wa-shadow-offset-y-m:calc(var(--wa-shadow-offset-y-scale) * .25rem);--wa-shadow-offset-y-l:calc(var(--wa-shadow-offset-y-scale) * .5rem);--wa-shadow-blur-scale:1;--wa-shadow-blur-s:calc(var(--wa-shadow-blur-scale) * .125rem);--wa-shadow-blur-m:calc(var(--wa-shadow-blur-scale) * .25rem);--wa-shadow-blur-l:calc(var(--wa-shadow-blur-scale) * .5rem);--wa-shadow-spread-scale:-.5;--wa-shadow-spread-s:calc(var(--wa-shadow-spread-scale) * .125rem);--wa-shadow-spread-m:calc(var(--wa-shadow-spread-scale) * .25rem);--wa-shadow-spread-l:calc(var(--wa-shadow-spread-scale) * .5rem);--wa-shadow-s:var(--wa-shadow-offset-x-s) var(--wa-shadow-offset-y-s) var(--wa-shadow-blur-s) var(--wa-shadow-spread-s) var(--wa-color-shadow);--wa-shadow-m:var(--wa-shadow-offset-x-m) var(--wa-shadow-offset-y-m) var(--wa-shadow-blur-m) var(--wa-shadow-spread-m) var(--wa-color-shadow);--wa-shadow-l:var(--wa-shadow-offset-x-l) var(--wa-shadow-offset-y-l) var(--wa-shadow-blur-l) var(--wa-shadow-spread-l) var(--wa-color-shadow);--wa-transition-easing:ease;--wa-transition-slow:.3s;--wa-transition-normal:.15s;--wa-transition-fast:75ms;--wa-form-control-background-color:var(--wa-color-surface-default);--wa-form-control-border-color:var(--wa-color-neutral-border-loud);--wa-form-control-border-style:var(--wa-border-style);--wa-form-control-border-width:var(--wa-border-width-s);--wa-form-control-border-radius:var(--wa-border-radius-m);--wa-form-control-activated-color:var(--wa-color-brand-fill-loud);--wa-form-control-label-color:var(--wa-color-text-normal);--wa-form-control-label-font-weight:var(--wa-font-weight-semibold);--wa-form-control-label-line-height:var(--wa-line-height-condensed);--wa-form-control-value-color:var(--wa-color-text-normal);--wa-form-control-value-font-weight:var(--wa-font-weight-body);--wa-form-control-value-line-height:var(--wa-line-height-condensed);--wa-form-control-hint-color:var(--wa-color-text-quiet);--wa-form-control-hint-font-weight:var(--wa-font-weight-body);--wa-form-control-hint-line-height:var(--wa-line-height-normal);--wa-form-control-placeholder-color:var(--wa-color-gray-50);--wa-form-control-required-content:\"*\";--wa-form-control-required-content-color:inherit;--wa-form-control-required-content-offset:.1em;--wa-form-control-padding-block:.75em;--wa-form-control-padding-inline:1em;--wa-form-control-height:round(calc(2 * var(--wa-form-control-padding-block) + 1em * var(--wa-form-control-value-line-height)), 1px);--wa-form-control-toggle-size:round(1.25em, 1px);--wa-button-transform-hover:none;--wa-button-transform-active:scale(.9875);--wa-panel-border-style:var(--wa-border-style);--wa-panel-border-width:var(--wa-border-width-s);--wa-panel-border-radius:var(--wa-border-radius-l);--wa-tooltip-arrow-size:.375rem;--wa-tooltip-background-color:var(--wa-color-text-normal);--wa-tooltip-border-color:var(--wa-tooltip-background-color);--wa-tooltip-border-style:var(--wa-border-style);--wa-tooltip-border-width:var(--wa-border-width-s);--wa-tooltip-border-radius:var(--wa-border-radius-s);--wa-tooltip-content-color:var(--wa-color-surface-default);--wa-tooltip-font-size:var(--wa-font-size-s);--wa-tooltip-line-height:var(--wa-line-height-normal)}:-webkit-any(html,body):has(wa-page){min-height:100%;margin:0;padding:0}:is(html,body):has(wa-page){min-height:100%;margin:0;padding:0}}@layer wa-theme-dimension,wa-theme-overrides;:host{--wa-color-red-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-red-key), 1) * 100%));--wa-color-orange-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-orange-key), 1) * 100%));--wa-color-yellow-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-yellow-key), 1) * 100%));--wa-color-green-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-green-key), 1) * 100%));--wa-color-cyan-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-cyan-key), 1) * 100%));--wa-color-blue-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-blue-key), 1) * 100%));--wa-color-indigo-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-indigo-key), 1) * 100%));--wa-color-purple-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-purple-key), 1) * 100%));--wa-color-pink-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-pink-key), 1) * 100%));--wa-color-gray-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-gray-key), 1) * 100%));--wa-color-red-on:color-mix(in oklab, var(--wa-color-red-10) var(--wa-color-red-gte-60), white);--wa-color-orange-on:color-mix(in oklab, var(--wa-color-orange-10) var(--wa-color-orange-gte-60), white);--wa-color-yellow-on:color-mix(in oklab, var(--wa-color-yellow-10) var(--wa-color-yellow-gte-60), white);--wa-color-green-on:color-mix(in oklab, var(--wa-color-green-10) var(--wa-color-green-gte-60), white);--wa-color-cyan-on:color-mix(in oklab, var(--wa-color-cyan-10) var(--wa-color-cyan-gte-60), white);--wa-color-blue-on:color-mix(in oklab, var(--wa-color-blue-10) var(--wa-color-blue-gte-60), white);--wa-color-indigo-on:color-mix(in oklab, var(--wa-color-indigo-10) var(--wa-color-indigo-gte-60), white);--wa-color-purple-on:color-mix(in oklab, var(--wa-color-purple-10) var(--wa-color-purple-gte-60), white);--wa-color-pink-on:color-mix(in oklab, var(--wa-color-pink-10) var(--wa-color-pink-gte-60), white);--wa-color-gray-on:color-mix(in oklab, var(--wa-color-gray-10) var(--wa-color-gray-gte-60), white)}:where(:root){--wa-color-red-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-red-key), 1) * 100%));--wa-color-orange-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-orange-key), 1) * 100%));--wa-color-yellow-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-yellow-key), 1) * 100%));--wa-color-green-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-green-key), 1) * 100%));--wa-color-cyan-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-cyan-key), 1) * 100%));--wa-color-blue-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-blue-key), 1) * 100%));--wa-color-indigo-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-indigo-key), 1) * 100%));--wa-color-purple-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-purple-key), 1) * 100%));--wa-color-pink-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-pink-key), 1) * 100%));--wa-color-gray-gte-60:calc(100% - (clamp(0, 60 - var(--wa-color-gray-key), 1) * 100%));--wa-color-red-on:color-mix(in oklab, var(--wa-color-red-10) var(--wa-color-red-gte-60), white);--wa-color-orange-on:color-mix(in oklab, var(--wa-color-orange-10) var(--wa-color-orange-gte-60), white);--wa-color-yellow-on:color-mix(in oklab, var(--wa-color-yellow-10) var(--wa-color-yellow-gte-60), white);--wa-color-green-on:color-mix(in oklab, var(--wa-color-green-10) var(--wa-color-green-gte-60), white);--wa-color-cyan-on:color-mix(in oklab, var(--wa-color-cyan-10) var(--wa-color-cyan-gte-60), white);--wa-color-blue-on:color-mix(in oklab, var(--wa-color-blue-10) var(--wa-color-blue-gte-60), white);--wa-color-indigo-on:color-mix(in oklab, var(--wa-color-indigo-10) var(--wa-color-indigo-gte-60), white);--wa-color-purple-on:color-mix(in oklab, var(--wa-color-purple-10) var(--wa-color-purple-gte-60), white);--wa-color-pink-on:color-mix(in oklab, var(--wa-color-pink-10) var(--wa-color-pink-gte-60), white);--wa-color-gray-on:color-mix(in oklab, var(--wa-color-gray-10) var(--wa-color-gray-gte-60), white)}", Nt, Pt = t((() => {
	Nt = () => ({ checkValidity(e) {
		let t = e.input, n = {
			message: "",
			isValid: !0,
			invalidKeys: []
		};
		if (!t) return n;
		let r = !0;
		if ("checkValidity" in t && (r = t.checkValidity()), r) return n;
		if (n.isValid = !1, "validationMessage" in t && (n.message = t.validationMessage), !("validity" in t)) return n.invalidKeys.push("customError"), n;
		for (let e in t.validity) {
			if (e === "valid") continue;
			let r = e;
			t.validity[r] && n.invalidKeys.push(r);
		}
		return n;
	} });
})), Ft, It = t((() => {
	Ft = class extends Event {
		constructor() {
			super("wa-invalid", {
				bubbles: !0,
				cancelable: !1,
				composed: !0
			});
		}
	};
})), Lt, Rt, zt, F, Bt, Vt, Ht, Ut, I = t((() => {
	Lt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, zt = (e) => {
		throw TypeError(e);
	}, F = (e, t, n, r) => {
		for (var i = r > 1 ? void 0 : r ? Rt(t, n) : t, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = (r ? o(t, n, i) : o(i)) || i);
		return r && i && Lt(t, n, i), i;
	}, Bt = (e, t, n) => t.has(e) || zt("Cannot " + n), Vt = (e, t, n) => (Bt(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Ht = (e, t, n) => t.has(e) ? zt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), Ut = (e, t, n, r) => (Bt(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n);
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.AOKMSJXD.js
function Wt(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function Gt(e) {
	let { property: t, value: n, element: r } = e;
	if (n) {
		let e = r.getAttribute("style") || "";
		e && (e.match(qt) || (e += ";"), e += " ");
		let i = `${t}: ${n}`;
		return e.includes(i) ? void 0 : `${e}${i};`;
	}
	return null;
}
var Kt, qt, Jt, L, R = t((() => {
	I(), A(), N(), Kt = l`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`, qt = /;\s+$/, L = class extends k {
		constructor() {
			super(), Ht(this, Jt, !1), this.initialReflectedProperties = /* @__PURE__ */ new Map(), this.didSSR = !!this.shadowRoot, this.customStates = {
				set: (e, t) => {
					if (this.internals?.states) try {
						t ? this.internals.states.add(e) : this.internals.states.delete(e);
					} catch (e) {
						if (String(e).includes("must start with '--'")) console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");
						else throw e;
					}
				},
				has: (e) => {
					if (!this.internals?.states) return !1;
					try {
						return this.internals.states.has(e);
					} catch {
						return !1;
					}
				}
			};
			try {
				this.internals = this.attachInternals();
			} catch {
				console.error("Element internals are not supported in your browser. Consider using a polyfill");
			}
			this.customStates.set("wa-defined", !0);
			let e = this.constructor;
			for (let [t, n] of e.elementProperties) n.default === "inherit" && n.initial !== void 0 && typeof t == "string" && this.customStates.set(`initial-${t}-${n.initial}`, !0);
		}
		static get styles() {
			return [Kt, ...Array.isArray(this.css) ? this.css : this.css ? [this.css] : []];
		}
		connectedCallback() {
			super.connectedCallback(), this.didSSR || this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `)), this.didSSR && this.updateComplete.then(() => {
				this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `));
			});
		}
		attributeChangedCallback(e, t, n) {
			Vt(this, Jt) || (this.constructor.elementProperties.forEach((e, t) => {
				e.reflect && this[t] != null && this.initialReflectedProperties.set(t, this[t]);
			}), Ut(this, Jt, !0)), super.attributeChangedCallback(e, t, n);
		}
		willUpdate(e) {
			super.willUpdate(e), this.initialReflectedProperties.forEach((t, n) => {
				e.has(n) && this[n] == null && (this[n] = t);
			});
		}
		firstUpdated(e) {
			super.firstUpdated(e), this.didSSR && this.shadowRoot?.querySelectorAll("slot").forEach((e) => {
				e.dispatchEvent(new Event("slotchange", {
					bubbles: !0,
					composed: !1,
					cancelable: !1
				}));
			});
		}
		update(e) {
			try {
				super.update(e);
			} catch (e) {
				if (this.didSSR && !this.hasUpdated) {
					let t = new Event("lit-hydration-error", {
						bubbles: !0,
						composed: !0,
						cancelable: !1
					});
					t.error = e, this.dispatchEvent(t);
				}
				throw e;
			}
		}
		setStyle(e, t) {
			if (!this.style) {
				let n = Gt({
					property: Wt(e),
					value: t,
					element: this
				});
				n && this.setAttribute("style", n);
				return;
			}
			this.style[e] = t;
		}
		setStyleProperty(e, t) {
			if (!this.style) {
				let n = Gt({
					property: e,
					value: t,
					element: this
				});
				n && this.setAttribute("style", n);
				return;
			}
			this.style.setProperty(e, t);
		}
		relayNativeEvent(e, t) {
			e.stopImmediatePropagation(), this.dispatchEvent(new e.constructor(e.type, {
				...e,
				...t
			}));
		}
	}, Jt = /* @__PURE__ */ new WeakMap(), F([j()], L.prototype, "dir", 2), F([j()], L.prototype, "lang", 2), F([j({
		type: Boolean,
		reflect: !0,
		attribute: "did-ssr"
	})], L.prototype, "didSSR", 2);
})), Yt, z, Xt = t((() => {
	It(), R(), I(), A(), N(), Yt = () => ({
		observedAttributes: ["custom-error"],
		checkValidity(e) {
			let t = {
				message: "",
				isValid: !0,
				invalidKeys: []
			};
			return e.customError && (t.message = e.customError, t.isValid = !1, t.invalidKeys = ["customError"]), t;
		}
	}), z = class extends L {
		constructor() {
			super(), this.name = null, this.disabled = !1, this.required = !1, this.assumeInteractionOn = ["input"], this.validators = [], this.valueHasChanged = !1, this.hasInteracted = !1, this.customError = null, this.emittedEvents = [], this.emitInvalid = (e) => {
				e.target === this && (this.hasInteracted = !0, this.dispatchEvent(new Ft()));
			}, this.handleInteraction = (e) => {
				let t = this.emittedEvents;
				t.includes(e.type) || t.push(e.type), t.length === this.assumeInteractionOn?.length && (this.hasInteracted = !0);
			}, "addEventListener" in this && this.addEventListener("invalid", this.emitInvalid);
		}
		static get validators() {
			return [Yt()];
		}
		static get observedAttributes() {
			let e = new Set(super.observedAttributes || []);
			for (let t of this.validators) if (t.observedAttributes) for (let n of t.observedAttributes) e.add(n);
			return [...e];
		}
		connectedCallback() {
			super.connectedCallback(), this.didSSR && !this.hasUpdated ? this.updateComplete.then(() => {
				this.updateValidity();
			}) : this.updateValidity(), this.assumeInteractionOn.forEach((e) => {
				this.addEventListener?.(e, this.handleInteraction);
			});
		}
		firstUpdated(...e) {
			super.firstUpdated(...e), this.updateValidity();
		}
		willUpdate(e) {
			if (e.has("customError") && (this.customError ||= null, this.setCustomValidity(this.customError || "")), e.has("value") || e.has("disabled") || e.has("defaultValue")) {
				let e = this.value;
				this.updateFormValue(e);
			}
			e.has("disabled") && (this.customStates.set("disabled", this.disabled), (this.hasAttribute("disabled") || !this.matches(":disabled")) && this.toggleAttribute("disabled", this.disabled)), super.willUpdate(e), this.didSSR && !this.hasUpdated ? this.updateComplete.then(() => this.updateValidity()) : this.updateValidity();
		}
		updateFormValue(e) {
			if (Array.isArray(e)) {
				if (this.name) {
					let t = new FormData();
					for (let n of e) t.append(this.name, n);
					this.setValue(t, t);
				}
			} else this.setValue(e, e);
		}
		get labels() {
			return this.internals.labels;
		}
		getForm() {
			return this.internals.form;
		}
		set form(e) {
			e ? this.setAttribute("form", e) : this.removeAttribute("form");
		}
		get form() {
			return this.internals.form;
		}
		get validity() {
			return this.internals.validity;
		}
		get willValidate() {
			return this.internals.willValidate;
		}
		get validationMessage() {
			return this.internals.validationMessage;
		}
		checkValidity() {
			return this.updateValidity(), this.internals.checkValidity();
		}
		reportValidity() {
			return this.updateValidity(), this.hasInteracted = !0, this.internals.reportValidity();
		}
		get validationTarget() {
			return this.input || void 0;
		}
		setValidity(...e) {
			let t = e[0], n = e[1], r = e[2];
			r ||= this.validationTarget, this.internals.setValidity(t, n, r || void 0), this.requestUpdate("validity"), this.setCustomStates();
		}
		setCustomStates() {
			let e = !!this.required, t = this.internals.validity.valid, n = this.hasInteracted;
			this.customStates.set("required", e), this.customStates.set("optional", !e), this.customStates.set("invalid", !t), this.customStates.set("valid", t), this.customStates.set("user-invalid", !t && n), this.customStates.set("user-valid", t && n);
		}
		setCustomValidity(e) {
			if (!e) {
				this.customError = null, this.setValidity({});
				return;
			}
			this.customError = e, this.setValidity({ customError: !0 }, e, this.validationTarget);
		}
		formResetCallback() {
			this.resetValidity(), this.hasInteracted = !1, this.valueHasChanged = !1, this.emittedEvents = [], this.updateValidity();
		}
		formDisabledCallback(e) {
			this.disabled = e, this.updateValidity();
		}
		formStateRestoreCallback(e, t) {
			this.didSSR && !this.hasUpdated ? this.updateComplete.then(() => {
				this.value = e, t === "restore" && this.resetValidity(), this.updateValidity();
			}) : (this.value = e, t === "restore" && this.resetValidity(), this.updateValidity());
		}
		setValue(...e) {
			let [t, n] = e;
			this.internals.setFormValue(t, n);
		}
		get allValidators() {
			let e = this.constructor.validators || [], t = this.validators || [];
			return [...e, ...t];
		}
		resetValidity() {
			this.setCustomValidity(""), this.setValidity({});
		}
		updateValidity() {
			if (this.disabled || this.hasAttribute("disabled") || !this.willValidate) {
				this.resetValidity();
				return;
			}
			let e = this.allValidators;
			if (!e?.length) return;
			let t = { customError: !!this.customError }, n = this.validationTarget || this.input || void 0, r = "";
			for (let n of e) {
				let { isValid: e, message: i, invalidKeys: a } = n.checkValidity(this);
				e || (r ||= i, a?.length >= 0 && a.forEach((e) => t[e] = !0));
			}
			r ||= this.validationMessage, this.setValidity(t, r, n);
		}
	}, z.formAssociated = !0, F([j({ reflect: !0 })], z.prototype, "name", 2), F([j({ type: Boolean })], z.prototype, "disabled", 2), F([j({
		state: !0,
		attribute: !1
	})], z.prototype, "valueHasChanged", 2), F([j({
		state: !0,
		attribute: !1
	})], z.prototype, "hasInteracted", 2), F([j({
		attribute: "custom-error",
		reflect: !0
	})], z.prototype, "customError", 2), F([j({
		attribute: !1,
		state: !0,
		type: Object
	})], z.prototype, "validity", 1);
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.RPQJAXXR.js
function Zt(e, t) {
	t in Qt && !$t.has(`${e}:${t}`) && ($t.add(`${e}:${t}`), console.warn(`[${e}] size="${t}" is deprecated. Use size="${Qt[t]}" instead. The long-form value will be removed in the next major version.`));
}
var Qt, $t, en = t((() => {
	Qt = {
		small: "s",
		medium: "m",
		large: "l"
	}, $t = /* @__PURE__ */ new Set();
})), tn, nn = t((() => {
	tn = class {
		constructor(e, ...t) {
			this.slotNames = [], this.handleSlotChange = (e) => {
				let t = e.target;
				(this.slotNames.includes("[default]") && !t.name || t.name && this.slotNames.includes(t.name)) && this.host.requestUpdate();
			}, (this.host = e).addController(this), this.slotNames = t;
		}
		hasDefaultSlot() {
			return this.host.childNodes ? [...this.host.childNodes].some((e) => {
				if (e.nodeType === Node.TEXT_NODE && e.textContent.trim() !== "") return !0;
				if (e.nodeType === Node.ELEMENT_NODE) {
					let t = e;
					if (t.tagName.toLowerCase() === "wa-visually-hidden") return !1;
					if (!t.hasAttribute("slot")) return !0;
				}
				return !1;
			}) : !1;
		}
		hasNamedSlot(e) {
			return this.host.querySelector?.(`:scope > [slot="${e}"]`) !== null;
		}
		test(e, t) {
			return t && this.host.didSSR && !this.host.hasUpdated ? !!this.host[t] : e === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(e);
		}
		hostConnected() {
			let e = this.host.shadowRoot;
			e && "addEventListener" in e && e.addEventListener("slotchange", this.handleSlotChange);
		}
		hostDisconnected() {
			let e = this.host.shadowRoot;
			e && "removeEventListener" in e && e.removeEventListener("slotchange", this.handleSlotChange);
		}
	};
})), rn, an = t((() => {
	A(), rn = l`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`;
})), on, sn = t((() => {
	A(), on = l`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));

    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
    justify-content: center;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`;
})), cn, ln = t((() => {
	A(), cn = l`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js
function B(e, t) {
	let n = {
		waitUntilFirstUpdate: !1,
		...t
	};
	return (t, r) => {
		let { update: i } = t, a = Array.isArray(e) ? e : [e];
		t.update = function(e) {
			a.forEach((t) => {
				let i = t;
				if (e.has(i)) {
					let t = e.get(i), a = this[i];
					t !== a && (!n.waitUntilFirstUpdate || this.hasUpdated) && this[r](t, a);
				}
			}), i.call(this, e);
		};
	};
}
var un = t((() => {}));
//#endregion
//#region node_modules/@shoelace-style/localize/dist/index.js
function dn(...e) {
	e.map((e) => {
		let t = e.$code.toLowerCase();
		mn.has(t) ? mn.set(t, Object.assign(Object.assign({}, mn.get(t)), e)) : mn.set(t, e), hn ||= e;
	}), fn();
}
function fn() {
	vn && (gn = document.documentElement.dir || "ltr", _n = document.documentElement.lang || navigator.language), [...pn.keys()].map((e) => {
		typeof e.requestUpdate == "function" && e.requestUpdate();
	});
}
var pn, mn, hn, gn, _n, vn, yn, bn = t((() => {
	if (pn = /* @__PURE__ */ new Set(), mn = /* @__PURE__ */ new Map(), gn = "ltr", _n = "en", vn = typeof MutationObserver < "u" && typeof document < "u" && document.documentElement !== void 0, vn) {
		let e = new MutationObserver(fn);
		gn = document.documentElement.dir || "ltr", _n = document.documentElement.lang || navigator.language, e.observe(document.documentElement, {
			attributes: !0,
			attributeFilter: ["dir", "lang"]
		});
	}
	yn = class {
		constructor(e) {
			this.host = e, this.host.addController(this);
		}
		hostConnected() {
			pn.add(this.host);
		}
		hostDisconnected() {
			pn.delete(this.host);
		}
		dir() {
			return `${this.host.dir || gn}`.toLowerCase();
		}
		lang() {
			return `${this.host.lang || _n}`.toLowerCase();
		}
		getTranslationData(e) {
			let t;
			try {
				t = new Intl.Locale(e.replace(/_/g, "-"));
			} catch {
				return {
					locale: void 0,
					language: "",
					region: "",
					primary: void 0,
					secondary: void 0
				};
			}
			let n = t.language.toLowerCase(), r = t.region?.toLowerCase() ?? "", i = mn.get(`${n}-${r}`), a = mn.get(n);
			return {
				locale: t,
				language: n,
				region: r,
				primary: i,
				secondary: a
			};
		}
		exists(e, t) {
			let { primary: n, secondary: r } = this.getTranslationData(t.lang ?? this.lang());
			return t = Object.assign({ includeFallback: !1 }, t), !!(n && n[e] || r && r[e] || t.includeFallback && hn && hn[e]);
		}
		term(e, ...t) {
			let { primary: n, secondary: r } = this.getTranslationData(this.lang()), i;
			if (n && n[e]) i = n[e];
			else if (r && r[e]) i = r[e];
			else if (hn && hn[e]) i = hn[e];
			else return console.error(`No translation found for: ${String(e)}`), String(e);
			return typeof i == "function" ? i(...t) : i;
		}
		date(e, t) {
			return e = new Date(e), new Intl.DateTimeFormat(this.lang(), t).format(e);
		}
		number(e, t) {
			return e = Number(e), isNaN(e) ? "" : new Intl.NumberFormat(this.lang(), t).format(e);
		}
		relativeTime(e, t, n) {
			return new Intl.RelativeTimeFormat(this.lang(), n).format(e, t);
		}
	};
})), xn, Sn, Cn = t((() => {
	bn(), xn = {
		$code: "en",
		$name: "English",
		$dir: "ltr",
		carousel: "Carousel",
		captions: "Captions",
		chooseDate: "Choose date",
		chooseDecade: "Choose decade",
		chooseMonth: "Choose month",
		chooseYear: "Choose year",
		clearEntry: "Clear entry",
		close: "Close",
		closeCalendar: "Close calendar",
		createOption: (e) => `Create "${e}"`,
		copied: "Copied",
		copy: "Copy",
		currentValue: "Current value",
		date: "Date",
		datePickerKeyboardHelp: "Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",
		day: "Day",
		incompleteDate: "Enter a complete date.",
		dropFileHere: "Drop file here or click to browse",
		decrement: "Decrement",
		dropFilesHere: "Drop files here or click to browse",
		empty: "Empty",
		endDate: "End date",
		error: "Error",
		enterFullscreen: "Enter fullscreen",
		exitFullscreen: "Exit fullscreen",
		goToSlide: (e, t) => `Go to slide ${e} of ${t}`,
		hidePassword: "Hide password",
		increment: "Increment",
		loading: "Loading",
		month: "Month",
		moreOptions: "More Options",
		mute: "Mute",
		nextDecade: "Next decade",
		nextMonth: "Next month",
		nextSlide: "Next slide",
		nextVideo: "Next Video",
		nextYear: "Next year",
		numCharacters: (e) => e === 1 ? "1 character" : `${e} characters`,
		numCharactersRemaining: (e) => e === 1 ? "1 character remaining" : `${e} characters remaining`,
		numOptionsSelected: (e) => e === 0 ? "No options selected" : e === 1 ? "1 option selected" : `${e} options selected`,
		pause: "Pause",
		pauseAnimation: "Pause animation",
		pictureInPicture: "Picture in picture",
		play: "Play",
		playbackSpeed: "Playback speed",
		playlist: "Playlist",
		playAnimation: "Play animation",
		previousDecade: "Previous decade",
		previousMonth: "Previous month",
		previousSlide: "Previous slide",
		previousVideo: "Previous video",
		previousYear: "Previous year",
		progress: "Progress",
		rangeTooLong: (e) => e === 1 ? "Select a range no longer than 1 day" : `Select a range no longer than ${e} days`,
		rangeTooShort: (e) => e === 1 ? "Select a range at least 1 day long" : `Select a range at least ${e} days long`,
		readonly: "Read-only",
		selected: "Selected",
		selectedDateLabel: (e) => `Selected: ${e}`,
		selectedRangeLabel: (e) => `Selected range: ${e}`,
		selectionCleared: "Selection cleared",
		remove: "Remove",
		resize: "Resize",
		scrollableRegion: "Scrollable region",
		scrollToEnd: "Scroll to end",
		scrollToStart: "Scroll to start",
		selectAColorFromTheScreen: "Select a color from the screen",
		showPassword: "Show password",
		slideNum: (e) => `Slide ${e}`,
		startDate: "Start date",
		today: "Today",
		toggleColorFormat: "Toggle color format",
		seek: "Seek",
		seekProgress: (e, t) => `${e} of ${t}`,
		currentlyPlaying: "currently playing",
		unmute: "Unmute",
		videoPlayer: "Video player",
		volume: "Volume",
		year: "Year",
		zoomIn: "Zoom in",
		zoomOut: "Zoom out",
		am: "AM",
		chooseTime: "Choose time",
		closeTimeInput: "Close time picker",
		dayPeriod: "AM/PM",
		hour: "Hour",
		minute: "Minute",
		now: "Now",
		pm: "PM",
		second: "Second",
		time: "Time",
		timeInputKeyboardHelp: "Use arrow keys to change values; press Alt+Down Arrow to open the time picker."
	}, dn(xn), Sn = xn;
})), wn, Tn = t((() => {
	Cn(), bn(), wn = class extends yn {
		lang() {
			return this.host.didSSR && !this.host.hasUpdated ? this.host.lang || "en" : super.lang();
		}
	}, dn(Sn);
})), En, Dn, On, kn = t((() => {
	En = {
		ATTRIBUTE: 1,
		CHILD: 2,
		PROPERTY: 3,
		BOOLEAN_ATTRIBUTE: 4,
		EVENT: 5,
		ELEMENT: 6
	}, Dn = (e) => (...t) => ({
		_$litDirective$: e,
		values: t
	}), On = class {
		constructor(e) {}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AT(e, t, n) {
			this._$Ct = e, this._$AM = t, this._$Ci = n;
		}
		_$AS(e, t) {
			return this.update(e, t);
		}
		update(e, t) {
			return this.render(...t);
		}
	};
})), An, jn = t((() => {
	Ue(), kn(), An = Dn(class extends On {
		constructor(e) {
			if (super(e), e.type !== En.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
		}
		render(e) {
			return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
		}
		update(e, [t]) {
			if (this.st === void 0) {
				this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((e) => e !== "")));
				for (let e in t) t[e] && !this.nt?.has(e) && this.st.add(e);
				return this.render(t);
			}
			let n = e.element.classList;
			for (let e of this.st) e in t || (n.remove(e), this.st.delete(e));
			for (let e in t) {
				let r = !!t[e];
				r === this.st.has(e) || this.nt?.has(e) || (r ? (n.add(e), this.st.add(e)) : (n.remove(e), this.st.delete(e)));
			}
			return Oe;
		}
	});
})), Mn = t((() => {
	jn();
})), V, Nn = t((() => {
	Ue(), V = (e) => e ?? O;
})), Pn = t((() => {
	Nn();
})), Fn, In, Ln, Rn, zn, Bn, Vn = t((() => {
	Ue(), Fn = Symbol.for(""), In = (e) => {
		if (e?.r === Fn) return e?._$litStatic$;
	}, Ln = (e, ...t) => ({
		_$litStatic$: t.reduce((t, n, r) => t + ((e) => {
			if (e._$litStatic$ !== void 0) return e._$litStatic$;
			throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`);
		})(n) + e[r + 1], e[0]),
		r: Fn
	}), Rn = /* @__PURE__ */ new Map(), zn = (e) => (t, ...n) => {
		let r = n.length, i, a, o = [], s = [], c, l = 0, u = !1;
		for (; l < r;) {
			for (c = t[l]; l < r && (a = n[l], i = In(a)) !== void 0;) c += i + t[++l], u = !0;
			l !== r && s.push(a), o.push(c), l++;
		}
		if (l === r && o.push(t[r]), u) {
			let e = o.join("$$lit$$");
			(t = Rn.get(e)) === void 0 && (o.raw = o, Rn.set(e, t = o)), n = s;
		}
		return e(t, ...n);
	}, Bn = zn(E), zn(D), zn(De);
})), Hn = t((() => {
	Vn();
})), H, Un = t((() => {
	Pt(), Xt(), It(), en(), nn(), an(), sn(), ln(), un(), Tn(), I(), N(), Mn(), Pn(), Hn(), H = class extends z {
		constructor() {
			super(...arguments), this.assumeInteractionOn = ["click"], this.hasSlotController = new tn(this, "[default]", "start", "end"), this.localize = new wn(this), this.invalid = !1, this.isIconButton = !1, this.title = "", this.variant = "neutral", this.appearance = "accent", this.size = "m", this.withCaret = !1, this.withStart = !1, this.withEnd = !1, this.disabled = !1, this.loading = !1, this.pill = !1, this.type = "button";
		}
		static get validators() {
			return [...super.validators, Nt()];
		}
		handleSizeChange() {
			Zt(this.localName, this.size);
		}
		constructLightDOMButton() {
			let e = document.createElement("button");
			for (let t of this.attributes) t.name !== "style" && e.setAttribute(t.name, t.value);
			return e.type = this.type, e.style.position = "absolute !important", e.style.width = "0 !important", e.style.height = "0 !important", e.style.clipPath = "inset(50%) !important", e.style.overflow = "hidden !important", e.style.whiteSpace = "nowrap !important", this.name && (e.name = this.name), e.value = this.value || "", e;
		}
		handleClick(e) {
			if (this.disabled || this.loading) {
				e.preventDefault(), e.stopImmediatePropagation();
				return;
			}
			if (this.type !== "submit" && this.type !== "reset" || !this.getForm()) return;
			let t = this.constructLightDOMButton();
			this.parentElement?.append(t), t.click(), t.remove();
		}
		handleInvalid() {
			this.dispatchEvent(new Ft());
		}
		handleLabelSlotChange() {
			let e = this.labelSlot.assignedNodes({ flatten: !0 }), t = !1, n = !1, r = !1, i = !1;
			[...e].forEach((e) => {
				if (e.nodeType === Node.ELEMENT_NODE) {
					let r = e;
					r.localName === "wa-icon" ? (n = !0, t ||= r.label !== void 0) : i = !0;
				} else e.nodeType === Node.TEXT_NODE && (e.textContent?.trim() || "").length > 0 && (r = !0);
			}), this.isIconButton = n && !r && !i, this.customStates.set("icon-button", this.isIconButton), this.isIconButton && !t && console.warn("Icon buttons must have a label for screen readers. Add <wa-icon label=\"...\"> to remove this warning.", this);
		}
		isButton() {
			return !this.href;
		}
		isLink() {
			return !!this.href;
		}
		handleDisabledChange() {
			this.customStates.set("disabled", this.disabled), this.updateValidity();
		}
		handleHrefChange() {
			this.customStates.set("link", this.isLink());
		}
		handleLoadingChange() {
			this.customStates.set("loading", this.loading);
		}
		setValue(...e) {}
		click() {
			this.button.click();
		}
		focus(e) {
			this.button.focus(e);
		}
		blur() {
			this.button.blur();
		}
		render() {
			let e = this.isLink(), t = e ? Ln`a` : Ln`button`;
			return Bn`
      <${t}
        part="base"
        class=${An({
				button: !0,
				caret: this.withCaret,
				disabled: this.disabled,
				loading: this.loading,
				rtl: this.localize.dir() === "rtl",
				"has-label": this.hasSlotController.test("[default]"),
				"has-start": this.hasSlotController.test("start", "withStart"),
				"has-end": this.hasSlotController.test("end", "withEnd"),
				"is-icon-button": this.isIconButton
			})}
        ?disabled=${V(e ? void 0 : this.disabled)}
        type=${V(e ? void 0 : this.type)}
        title=${this.title}
        name=${V(e ? void 0 : this.name)}
        value=${V(e ? void 0 : this.value)}
        href=${V(e ? this.href : void 0)}
        target=${V(e ? this.target : void 0)}
        download=${V(e ? this.download : void 0)}
        rel=${V(e && this.rel ? this.rel : void 0)}
        role=${V(e ? void 0 : "button")}
        aria-disabled=${V(e && this.disabled ? "true" : void 0)}
        tabindex=${this.disabled ? "-1" : "0"}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret ? Bn`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              ` : ""}
        ${this.loading ? Bn`<wa-spinner part="spinner"></wa-spinner>` : ""}
      </${t}>
    `;
		}
	}, H.shadowRootOptions = {
		...z.shadowRootOptions,
		delegatesFocus: !0
	}, H.css = [
		on,
		cn,
		rn
	], F([M(".button")], H.prototype, "button", 2), F([M("slot:not([name])")], H.prototype, "labelSlot", 2), F([$e()], H.prototype, "invalid", 2), F([$e()], H.prototype, "isIconButton", 2), F([j()], H.prototype, "title", 2), F([j({ reflect: !0 })], H.prototype, "variant", 2), F([j({ reflect: !0 })], H.prototype, "appearance", 2), F([j({ reflect: !0 })], H.prototype, "size", 2), F([B("size")], H.prototype, "handleSizeChange", 1), F([j({
		attribute: "with-caret",
		type: Boolean,
		reflect: !0
	})], H.prototype, "withCaret", 2), F([j({
		attribute: "with-start",
		type: Boolean
	})], H.prototype, "withStart", 2), F([j({
		attribute: "with-end",
		type: Boolean
	})], H.prototype, "withEnd", 2), F([j({ type: Boolean })], H.prototype, "disabled", 2), F([j({
		type: Boolean,
		reflect: !0
	})], H.prototype, "loading", 2), F([j({
		type: Boolean,
		reflect: !0
	})], H.prototype, "pill", 2), F([j()], H.prototype, "type", 2), F([j({ reflect: !0 })], H.prototype, "name", 2), F([j({ reflect: !0 })], H.prototype, "value", 2), F([j({ reflect: !0 })], H.prototype, "href", 2), F([j()], H.prototype, "target", 2), F([j()], H.prototype, "rel", 2), F([j()], H.prototype, "download", 2), F([j({ attribute: "formaction" })], H.prototype, "formAction", 2), F([j({ attribute: "formenctype" })], H.prototype, "formEnctype", 2), F([j({ attribute: "formmethod" })], H.prototype, "formMethod", 2), F([j({
		attribute: "formnovalidate",
		type: Boolean
	})], H.prototype, "formNoValidate", 2), F([j({ attribute: "formtarget" })], H.prototype, "formTarget", 2), F([B("disabled", { waitUntilFirstUpdate: !0 })], H.prototype, "handleDisabledChange", 1), F([B("href")], H.prototype, "handleHrefChange", 1), F([B("loading", { waitUntilFirstUpdate: !0 })], H.prototype, "handleLoadingChange", 1), H = F([Je("wa-button")], H), H.disableWarning?.("change-in-update");
})), Wn, Gn = t((() => {
	A(), Wn = l`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`;
})), Kn, qn = t((() => {
	Gn(), R(), Tn(), I(), A(), N(), Kn = class extends L {
		constructor() {
			super(...arguments), this.localize = new wn(this);
		}
		render() {
			return E`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `;
		}
	}, Kn.css = Wn, Kn = F([Je("wa-spinner")], Kn);
})), Jn, Yn = t((() => {
	Jn = class extends Event {
		constructor() {
			super("wa-error", {
				bubbles: !0,
				cancelable: !1,
				composed: !0
			});
		}
	};
})), Xn, Zn = t((() => {
	Xn = class extends Event {
		constructor() {
			super("wa-load", {
				bubbles: !0,
				cancelable: !1,
				composed: !0
			});
		}
	};
})), Qn, $n = t((() => {
	A(), Qn = l`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    fill: currentColor;
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* Animations */
  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin-pulse;
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  /* Keyframes */
  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']) {
      animation: none !important;
      transition: none !important;
    }
  }
  @keyframes beat {
    0%,
    90% {
      transform: scale(1);
    }
    45% {
      transform: scale(var(--beat-scale, 1.25));
    }
  }

  @keyframes fade {
    50% {
      opacity: var(--fade-opacity, 0.4);
    }
  }

  @keyframes beat-fade {
    0%,
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.125));
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(var(--bounce-start-scale-x, 1.1), var(--bounce-start-scale-y, 0.9)) translateY(0);
    }
    30% {
      transform: scale(var(--bounce-jump-scale-x, 0.9), var(--bounce-jump-scale-y, 1.1))
        translateY(var(--bounce-height, -0.5em));
    }
    50% {
      transform: scale(var(--bounce-land-scale-x, 1.05), var(--bounce-land-scale-y, 0.95)) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(var(--bounce-rebound, -0.125em));
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes flip {
    50% {
      transform: rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -180deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    4% {
      transform: rotate(15deg);
    }
    8%,
    24% {
      transform: rotate(-18deg);
    }
    12%,
    28% {
      transform: rotate(18deg);
    }
    16% {
      transform: rotate(-22deg);
    }
    20% {
      transform: rotate(22deg);
    }
    32% {
      transform: rotate(-12deg);
    }
    36% {
      transform: rotate(12deg);
    }
    40%,
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.HGBRCPUS.js
function er() {
	return rr.replace(/\/$/, "");
}
function tr(e) {
	ir = e;
}
function nr() {
	if (!ir) {
		let e = document.querySelector("[data-fa-kit-code]");
		e && tr(e.getAttribute("data-fa-kit-code") || "");
	}
	return ir;
}
var rr, ir, ar = t((() => {
	rr = "", ir = "";
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.HCXBOJYW.js
function or(e, t, n) {
	let r = "solid";
	return t === "chisel" && (r = "chisel-regular"), t === "etch" && (r = "etch-solid"), t === "graphite" && (r = "graphite-thin"), t === "jelly" && (r = "jelly-regular", n === "duo-regular" && (r = "jelly-duo-regular"), n === "fill-regular" && (r = "jelly-fill-regular")), t === "jelly-duo" && (r = "jelly-duo-regular"), t === "jelly-fill" && (r = "jelly-fill-regular"), t === "notdog" && (n === "solid" && (r = "notdog-solid"), n === "duo-solid" && (r = "notdog-duo-solid")), t === "notdog-duo" && (r = "notdog-duo-solid"), t === "slab" && ((n === "solid" || n === "regular") && (r = "slab-regular"), n === "press-regular" && (r = "slab-press-regular")), t === "slab-press" && (r = "slab-press-regular"), t === "thumbprint" && (r = "thumbprint-light"), t === "utility" && (r = "utility-semibold"), t === "utility-duo" && (r = "utility-duo-semibold"), t === "utility-fill" && (r = "utility-fill-semibold"), t === "whiteboard" && (r = "whiteboard-semibold"), t === "classic" && (n === "thin" && (r = "thin"), n === "light" && (r = "light"), n === "regular" && (r = "regular"), n === "solid" && (r = "solid")), t === "duotone" && (n === "thin" && (r = "duotone-thin"), n === "light" && (r = "duotone-light"), n === "regular" && (r = "duotone-regular"), n === "solid" && (r = "duotone")), t === "sharp" && (n === "thin" && (r = "sharp-thin"), n === "light" && (r = "sharp-light"), n === "regular" && (r = "sharp-regular"), n === "solid" && (r = "sharp-solid")), t === "sharp-duotone" && (n === "thin" && (r = "sharp-duotone-thin"), n === "light" && (r = "sharp-duotone-light"), n === "regular" && (r = "sharp-duotone-regular"), n === "solid" && (r = "sharp-duotone-solid")), t === "brands" && (r = "brands"), r;
}
function sr(e, t, n) {
	let r = or(e, t, n), i = er();
	if (i) return `${i}/${r}/${e}.svg`;
	let a = nr();
	return a.length > 0 ? `https://ka-p.fontawesome.com/releases/v${cr}/svgs/${r}/${e}.svg?token=${encodeURIComponent(a)}` : `https://ka-f.fontawesome.com/releases/v${cr}/svgs/${r}/${e}.svg`;
}
var cr, lr, ur = t((() => {
	ar(), cr = "7.2.0", lr = {
		name: "default",
		resolver: (e, t = "classic", n = "solid") => sr(e, t, n),
		mutator: (e, t) => {
			if (t?.family && !e.hasAttribute("data-duotone-initialized")) {
				let { family: n, variant: r } = t;
				if (n === "duotone" || n === "sharp-duotone" || n === "notdog-duo" || n === "notdog" && r === "duo-solid" || n === "jelly-duo" || n === "jelly" && r === "duo-regular" || n === "utility-duo" || n === "thumbprint") {
					let n = [...e.querySelectorAll("path")], r = n.find((e) => !e.hasAttribute("opacity")), i = n.find((e) => e.hasAttribute("opacity"));
					if (!r || !i) return;
					if (r.setAttribute("data-duotone-primary", ""), i.setAttribute("data-duotone-secondary", ""), t.swapOpacity && r && i) {
						let e = i.getAttribute("opacity") || "0.4";
						r.style.setProperty("--path-opacity", e), i.style.setProperty("--path-opacity", "1");
					}
					e.setAttribute("data-duotone-initialized", "");
				}
			}
		}
	};
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.XTA2JDH4.js
function dr(e) {
	return `data:image/svg+xml,${encodeURIComponent(e)}`;
}
var fr, pr, mr = t((() => {
	fr = {
		solid: {
			backward: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z\"/></svg>",
			"backward-step": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z\"/></svg>",
			check: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z\"/></svg>",
			"chevron-down": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z\"/></svg>",
			"chevron-left": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\"/></svg>",
			"chevron-right": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\"/></svg>",
			circle: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z\"/></svg>",
			"closed-captioning": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z\"/></svg>",
			"closed-captioning-slash": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z\"/></svg>",
			compress: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z\"/></svg>",
			"ellipsis-vertical": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z\"/></svg>",
			expand: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z\"/></svg>",
			eyedropper: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z\"/></svg>",
			forward: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z\"/></svg>",
			file: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z\"/></svg>",
			"file-audio": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z\"/></svg>",
			"file-code": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z\"/></svg>",
			"file-excel": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z\"/></svg>",
			"file-image": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z\"/></svg>",
			"file-pdf": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z\"/></svg>",
			"file-powerpoint": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z\"/></svg>",
			"file-video": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z\"/></svg>",
			"file-word": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z\"/></svg>",
			"file-zipper": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z\"/></svg>",
			"forward-step": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z\"/></svg>",
			gauge: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z\"/></svg>",
			gear: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z\"/></svg>",
			"grip-vertical": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z\"/></svg>",
			indeterminate: "<svg part=\"indeterminate-icon\" class=\"icon\" viewBox=\"0 0 16 16\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"round\"><g stroke=\"currentColor\" stroke-width=\"2\"><g transform=\"translate(2.285714 6.857143)\"><path d=\"M10.2857143,1.14285714 L1.14285714,1.14285714\"/></g></g></g></svg>",
			minus: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z\"/></svg>",
			pause: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z\"/></svg>",
			"picture-in-picture": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z\"/></svg>",
			play: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z\"/></svg>",
			"play-circle": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z\"/></svg>",
			plus: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z\"/></svg>",
			star: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z\"/></svg>",
			upload: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z\"/></svg>",
			user: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z\"/></svg>",
			volume: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z\"/></svg>",
			"volume-low": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z\"/></svg>",
			"volume-xmark": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill=\"currentColor\" d=\"M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z\"/></svg>",
			xmark: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 384 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z\"/></svg>"
		},
		regular: {
			calendar: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d=\"M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z\"/></svg>",
			"circle-question": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z\"/></svg>",
			"circle-xmark": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z\"/></svg>",
			clock: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 640 640\"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d=\"M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z\"/></svg>",
			copy: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z\"/></svg>",
			eye: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z\"/></svg>",
			"eye-slash": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z\"/></svg>",
			star: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 576 512\"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill=\"currentColor\" d=\"M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z\"/></svg>"
		}
	}, pr = {
		name: "system",
		resolver: (e, t = "classic", n = "solid") => {
			let r = fr[n][e] ?? fr.regular[e] ?? fr.regular["circle-question"];
			return r ? dr(r) : "";
		}
	};
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.NF5JTFKH.js
function hr(e) {
	xr.add(e);
}
function gr(e) {
	xr.delete(e);
}
function _r(e) {
	return br.find((t) => t.name === e);
}
function vr() {
	return yr;
}
var yr, br, xr, Sr = t((() => {
	ur(), mr(), yr = "classic", br = [lr, pr], xr = /* @__PURE__ */ new Set();
})), Cr, wr, Tr = t((() => {
	Ue(), {I: Cr} = Be, wr = (e, t) => t === void 0 ? e?._$litType$ !== void 0 : e?._$litType$ === t;
})), Er = t((() => {
	Tr();
})), Dr, Or, kr, Ar, U, jr = t((() => {
	Yn(), Zn(), $n(), un(), R(), Sr(), I(), A(), N(), Er(), Dr = Symbol(), Or = Symbol(), Ar = /* @__PURE__ */ new Map(), U = class extends L {
		constructor() {
			super(...arguments), this.svg = null, this.autoWidth = !1, this.swapOpacity = !1, this.label = "", this.library = "default", this.rotate = 0, this.resolveIcon = async (e, t) => {
				let n;
				if (t?.spriteSheet) {
					this.hasUpdated || await this.updateComplete, this.svg = E`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`, await this.updateComplete;
					let n = this.shadowRoot.querySelector("[part='svg']");
					return typeof t.mutator == "function" && t.mutator(n, this), this.svg;
				}
				try {
					if (n = await fetch(e, { mode: "cors" }), !n.ok) return n.status === 410 ? Dr : Or;
				} catch {
					return Or;
				}
				try {
					let e = document.createElement("div");
					e.innerHTML = await n.text();
					let t = e.firstElementChild;
					if (t?.tagName?.toLowerCase() !== "svg") return Dr;
					kr ||= new DOMParser();
					let r = kr.parseFromString(t.outerHTML, "text/html").body.querySelector("svg");
					return r ? (r.part.add("svg"), document.adoptNode(r)) : Dr;
				} catch {
					return Dr;
				}
			};
		}
		connectedCallback() {
			super.connectedCallback(), hr(this);
		}
		firstUpdated(e) {
			super.firstUpdated(e), this.hasAttribute("rotate") && this.style.setProperty("--rotate-angle", `${this.rotate}deg`), this.setIcon();
		}
		disconnectedCallback() {
			super.disconnectedCallback(), gr(this);
		}
		async getIconSource() {
			let e = _r(this.library), t = this.family || vr();
			if (this.name && e) {
				let n;
				try {
					n = await e.resolver(this.name, t, this.variant, this.autoWidth);
				} catch {
					n = void 0;
				}
				return {
					url: n,
					fromLibrary: !0
				};
			}
			return {
				url: this.src,
				fromLibrary: !1
			};
		}
		handleLabelChange() {
			typeof this.label == "string" && this.label.length > 0 ? (this.setAttribute("role", "img"), this.setAttribute("aria-label", this.label), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.removeAttribute("aria-label"), this.setAttribute("aria-hidden", "true"));
		}
		async setIcon() {
			let { url: e, fromLibrary: t } = await this.getIconSource(), n = t ? _r(this.library) : void 0;
			if (!e) {
				this.svg = null;
				return;
			}
			let r = Ar.get(e);
			r || (r = this.resolveIcon(e, n), Ar.set(e, r));
			let i = await r;
			if (i === Or && Ar.delete(e), e === (await this.getIconSource()).url) {
				if (wr(i)) {
					this.svg = i;
					return;
				}
				switch (i) {
					case Or:
					case Dr:
						this.svg = null, this.dispatchEvent(new Jn());
						break;
					default: this.svg = i.cloneNode(!0), n?.mutator?.(this.svg, this), this.dispatchEvent(new Xn());
				}
			}
		}
		willUpdate(e) {
			return this.style || this.setStyleProperty("--rotate-angle", `${this.rotate}deg`), super.willUpdate(e);
		}
		updated(e) {
			super.updated(e);
			let t = _r(this.library);
			this.hasAttribute("rotate") && this.style.setProperty("--rotate-angle", `${this.rotate}deg`);
			let n = this.shadowRoot?.querySelector("svg");
			n && t?.mutator?.(n, this);
		}
		render() {
			return this.hasUpdated ? this.svg : E`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`;
		}
	}, U.css = Qn, F([$e()], U.prototype, "svg", 2), F([j({ reflect: !0 })], U.prototype, "name", 2), F([j({ reflect: !0 })], U.prototype, "family", 2), F([j({ reflect: !0 })], U.prototype, "variant", 2), F([j({
		attribute: "auto-width",
		type: Boolean,
		reflect: !0
	})], U.prototype, "autoWidth", 2), F([j({
		attribute: "swap-opacity",
		type: Boolean,
		reflect: !0
	})], U.prototype, "swapOpacity", 2), F([j()], U.prototype, "src", 2), F([j()], U.prototype, "label", 2), F([j({ reflect: !0 })], U.prototype, "library", 2), F([j({
		type: Number,
		reflect: !0
	})], U.prototype, "rotate", 2), F([j({
		type: String,
		reflect: !0
	})], U.prototype, "flip", 2), F([j({
		type: String,
		reflect: !0
	})], U.prototype, "animation", 2), F([B("label")], U.prototype, "handleLabelChange", 1), F([B([
		"family",
		"name",
		"library",
		"variant",
		"src",
		"autoWidth",
		"swapOpacity"
	], { waitUntilFirstUpdate: !0 })], U.prototype, "setIcon", 1), U = F([Je("wa-icon")], U);
})), Mr = /* @__PURE__ */ n({ default: () => H }), Nr = t((() => {
	Un(), qn(), Gn(), Xt(), an(), sn(), ln(), jr(), $n(), R(), Tn(), Cn();
})), Pr, Fr = t((() => {
	A(), Pr = l`
  :host {
    display: inline-flex;
  }

  .button-group {
    display: flex;
    position: relative;
    isolation: isolate;
    flex-wrap: wrap;

    @media (hover: hover) {
      > :hover,
      &::slotted(:hover) {
        z-index: 1;
      }
    }

    /* Focus and checked are always on top */
    > :focus,
    &::slotted(:focus),
    > [aria-checked='true'],
    &::slotted([aria-checked='true']),
    > [checked],
    &::slotted([checked]) {
      z-index: 2 !important;
    }

    :host([orientation='horizontal']) & {
      flex-direction: row;
    }

    :host([orientation='vertical']) & {
      flex-direction: column;
    }
  }

  /* Set custom properties to be inherited by slotted buttons */
  :host([orientation='horizontal']) {
    --_button-horizontal-indent: var(--wa-form-control-border-width);
    --_button-horizontal-indent-outlined: calc(var(--wa-form-control-border-width) * -1);
  }

  :host([orientation='vertical']) {
    --_button-vertical-indent: var(--wa-form-control-border-width);
    --_button-vertical-indent-outlined: calc(var(--wa-form-control-border-width) * -1);
  }

  /* All buttons that are not in front or at the end get their border radius removed */
  ::slotted(:not(:first-child):not(:last-child)) {
    --_button-start-start-radius: 0;
    --_button-start-end-radius: 0;
    --_button-end-start-radius: 0;
    --_button-end-end-radius: 0;
  }

  /* Remove leading and trailing buttons border radius individually */
  :host([orientation='horizontal']) {
    ::slotted(:first-child:not(:last-child)) {
      --_button-start-end-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child:not(:first-child)) {
      --_button-start-start-radius: 0;
      --_button-end-start-radius: 0;
    }
  }

  :host([orientation='vertical']) {
    ::slotted(:first-child:not(:last-child)) {
      --_button-end-start-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child:not(:first-child)) {
      --_button-start-start-radius: 0;
      --_button-start-end-radius: 0;
    }
  }
`;
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.IB5IGK3H.js
function Ir(e) {
	let t = "wa-button, wa-radio-button";
	return e.closest(t) ?? e.querySelector(t);
}
var Lr, Rr = t((() => {
	Fr(), R(), I(), A(), N(), Lr = class extends L {
		constructor() {
			super(...arguments), this.disableRole = !1, this.hasOutlined = !1, this.label = "", this.orientation = "horizontal";
		}
		updated(e) {
			super.updated(e), e.has("orientation") && this.setAttribute("aria-orientation", this.orientation);
		}
		handleFocus(e) {
			Ir(e.target)?.classList.add("button-focus");
		}
		handleBlur(e) {
			Ir(e.target)?.classList.remove("button-focus");
		}
		handleMouseOver(e) {
			Ir(e.target)?.classList.add("button-hover");
		}
		handleMouseOut(e) {
			Ir(e.target)?.classList.remove("button-hover");
		}
		render() {
			return E`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      ></slot>
    `;
		}
	}, Lr.css = [Pr], F([M("slot")], Lr.prototype, "defaultSlot", 2), F([$e()], Lr.prototype, "disableRole", 2), F([$e()], Lr.prototype, "hasOutlined", 2), F([j()], Lr.prototype, "label", 2), F([j({ reflect: !0 })], Lr.prototype, "orientation", 2), Lr = F([Je("wa-button-group")], Lr);
})), zr = /* @__PURE__ */ n({ default: () => Lr }), Br = t((() => {
	Rr(), Fr(), R();
})), Vr, Hr = t((() => {
	A(), Vr = l`
  :host {
    --spacing: var(--wa-space-l);

    /* Internal calculated properties */
    --inner-border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));

    display: flex;
    flex-direction: column;
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-s);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :host([appearance='outlined']) {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='accent']) {
    color: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
    border-color: transparent;
  }

  /* Take care of top and bottom radii */
  .media,
  :host(:not([with-media])) .header,
  :host(:not([with-media], [with-header])) .body {
    border-start-start-radius: var(--inner-border-radius);
    border-start-end-radius: var(--inner-border-radius);
  }

  :host(:not([with-footer])) .body,
  .footer {
    border-end-start-radius: var(--inner-border-radius);
    border-end-end-radius: var(--inner-border-radius);
  }

  .media {
    display: flex;
    overflow: hidden;

    &::slotted(*) {
      display: block;
      width: 100%;
      border-radius: 0 !important;
    }
  }

  /* Round all corners for plain appearance */
  :host([appearance='plain']) .media {
    border-radius: var(--inner-border-radius);

    &::slotted(*) {
      border-radius: inherit !important;
    }
  }

  .header {
    display: block;
    border-block-end-style: inherit;
    border-block-end-color: var(--wa-color-surface-border);
    border-block-end-width: var(--wa-panel-border-width);
    padding: calc(var(--spacing) / 2) var(--spacing);
  }

  .body {
    display: block;
    padding: var(--spacing);
  }

  .footer {
    display: block;
    border-block-start-style: inherit;
    border-block-start-color: var(--wa-color-surface-border);
    border-block-start-width: var(--wa-panel-border-width);
    padding: var(--spacing);
  }

  /* Push slots to sides when the action slots renders */
  .has-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :host(:not([with-header])) .header,
  :host(:not([with-footer])) .footer,
  :host(:not([with-media])) .media {
    display: none;
  }

  /* Orientation Styles */
  :host([orientation='horizontal']) {
    flex-direction: row;

    .media {
      border-start-start-radius: var(--inner-border-radius);
      border-end-start-radius: var(--inner-border-radius);
      border-start-end-radius: 0;

      &::slotted(*) {
        block-size: 100%;
        inline-size: 100%;
        object-fit: cover;
      }
    }
  }

  :host([orientation='horizontal']) .body slot::slotted(*) {
    display: block;
    height: 100%;
    margin: 0;
  }

  :host([orientation='horizontal']) slot[name='actions']::slotted(*) {
    display: flex;
    align-items: center;
    padding: var(--spacing);
  }
`;
})), W, Ur = t((() => {
	Hr(), nn(), an(), R(), I(), A(), N(), Mn(), W = class extends L {
		constructor() {
			super(...arguments), this.hasSlotController = new tn(this, "footer", "header", "media", "header-actions", "footer-actions", "actions"), this.appearance = "outlined", this.withHeader = !1, this.withMedia = !1, this.withFooter = !1, this.withHeaderActions = !1, this.withFooterActions = !1, this.orientation = "vertical";
		}
		willUpdate(e) {
			this.withHeader = this.hasSlotController.test("header", "withHeader"), this.withMedia = this.hasSlotController.test("media", "withMedia"), this.withFooter = this.hasSlotController.test("footer", "withFooter"), super.willUpdate(e);
		}
		render() {
			if (this.orientation === "horizontal") return E`
        <slot name="media" part="media" class="media"></slot>
        <div part="body" class="body"><slot></slot></div>
        <slot name="actions" part="actions" class="actions"></slot>
      `;
			let e = this.hasSlotController.test("header-actions", "withHeaderActions"), t = this.hasSlotController.test("footer-actions", "withFooterActions");
			return E`
      <slot name="media" part="media" class="media"></slot>

      <header
        part="header"
        class=${An({
				header: !0,
				"has-actions": e
			})}
      >
        <slot name="header"></slot>
        <slot name="header-actions"></slot>
      </header>

      <div part="body" class="body"><slot></slot></div>

      <footer
        part="footer"
        class=${An({
				footer: !0,
				"has-actions": t
			})}
      >
        <slot name="footer"></slot>
        <slot name="footer-actions"></slot>
      </footer>
    `;
		}
	}, W.css = [rn, Vr], F([j({ reflect: !0 })], W.prototype, "appearance", 2), F([j({
		attribute: "with-header",
		type: Boolean,
		reflect: !0
	})], W.prototype, "withHeader", 2), F([j({
		attribute: "with-media",
		type: Boolean,
		reflect: !0
	})], W.prototype, "withMedia", 2), F([j({
		attribute: "with-footer",
		type: Boolean,
		reflect: !0
	})], W.prototype, "withFooter", 2), F([j({
		attribute: "with-header-actions",
		type: Boolean,
		reflect: !0
	})], W.prototype, "withHeaderActions", 2), F([j({
		attribute: "with-footer-actions",
		type: Boolean,
		reflect: !0
	})], W.prototype, "withFooterActions", 2), F([j({ reflect: !0 })], W.prototype, "orientation", 2), W = F([Je("wa-card")], W), W.disableWarning?.("change-in-update");
})), Wr = /* @__PURE__ */ n({ default: () => W }), Gr = t((() => {
	Ur(), Hr(), an(), R();
})), Kr, qr = t((() => {
	A(), Kr = l`
  :host {
    --track-size: 0.5em;
    --thumb-width: 1.4em;
    --thumb-height: 1.4em;
    --marker-width: 0.1875em;
    --marker-height: 0.1875em;
  }

  :host([orientation='vertical']) {
    width: auto;
  }

  #label:has(~ .vertical) {
    display: block;
    order: 2;
    max-width: none;
    text-align: center;
  }

  #description:has(~ .vertical) {
    order: 3;
    text-align: center;
  }

  /* Add extra space between slider and label, when present */
  #label.has-label ~ #slider {
    &.horizontal {
      margin-block-start: 0.5em;
    }
    &.vertical {
      margin-block-end: 0.5em;
    }
  }

  #slider {
    touch-action: none;

    &:focus {
      outline: none;
    }

    &:focus-visible:not(.disabled) #thumb,
    &:focus-visible:not(.disabled) #thumb-min,
    &:focus-visible:not(.disabled) #thumb-max {
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  #track {
    position: relative;
    border-radius: 9999px;
    background: var(--wa-color-neutral-fill-normal);
    isolation: isolate;
  }

  /* Orientation */
  .horizontal #track {
    height: var(--track-size);
  }

  .vertical #track {
    order: 1;
    width: var(--track-size);
    height: 200px;
  }

  /* Disabled */
  .disabled #track {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Indicator */
  #indicator {
    position: absolute;
    border-radius: inherit;
    background-color: var(--wa-form-control-activated-color);

    &:dir(ltr) {
      right: calc(100% - max(var(--start), var(--end)));
      left: min(var(--start), var(--end));
    }

    &:dir(rtl) {
      right: min(var(--start), var(--end));
      left: calc(100% - max(var(--start), var(--end)));
    }
  }

  .horizontal #indicator {
    top: 0;
    height: 100%;
  }

  .vertical #indicator {
    top: calc(100% - var(--end));
    bottom: var(--start);
    left: 0;
    width: 100%;
  }

  /* Thumbs */
  #thumb,
  #thumb-min,
  #thumb-max {
    z-index: 3;
    position: absolute;
    width: var(--thumb-width);
    height: var(--thumb-height);
    border: solid 0.125em var(--wa-color-surface-default);
    border-radius: 50%;
    background-color: var(--wa-form-control-activated-color);
    cursor: pointer;
  }

  .disabled #thumb,
  .disabled #thumb-min,
  .disabled #thumb-max {
    cursor: inherit;
  }

  .horizontal #thumb,
  .horizontal #thumb-min,
  .horizontal #thumb-max {
    top: calc(50% - var(--thumb-height) / 2);

    &:dir(ltr) {
      right: auto;
      left: calc(var(--position) - var(--thumb-width) / 2);
    }

    &:dir(rtl) {
      right: calc(var(--position) - var(--thumb-width) / 2);
      left: auto;
    }
  }

  .vertical #thumb,
  .vertical #thumb-min,
  .vertical #thumb-max {
    bottom: calc(var(--position) - var(--thumb-height) / 2);
    left: calc(50% - var(--thumb-width) / 2);
  }

  /* Range-specific thumb styles */
  :host([range]) {
    #thumb-min:focus-visible,
    #thumb-max:focus-visible {
      z-index: 4; /* Ensure focused thumb appears on top */
      outline: var(--wa-focus-ring);
      /* intentionally no offset due to border */
    }
  }

  /* Markers */
  #markers {
    pointer-events: none;
  }

  .marker {
    z-index: 2;
    position: absolute;
    width: var(--marker-width);
    height: var(--marker-height);
    border-radius: 50%;
    background-color: var(--wa-color-surface-default);
  }

  .marker:first-of-type,
  .marker:last-of-type {
    display: none;
  }

  .horizontal .marker {
    top: calc(50% - var(--marker-height) / 2);
    left: calc(var(--position) - var(--marker-width) / 2);
  }

  .vertical .marker {
    top: calc(var(--position) - var(--marker-height) / 2);
    left: calc(50% - var(--marker-width) / 2);
  }

  /* Marker labels */
  #references {
    position: relative;

    slot {
      display: flex;
      justify-content: space-between;
      height: 100%;
    }

    ::slotted(*) {
      color: var(--wa-color-text-quiet);
      font-size: 0.875em;
      line-height: 1;
    }
  }

  .horizontal {
    #references {
      margin-block-start: 0.5em;
    }
  }

  .vertical {
    display: flex;
    margin-inline: auto;

    #track {
      order: 1;
    }

    #references {
      order: 2;
      width: min-content;
      margin-inline-start: 0.75em;

      slot {
        flex-direction: column;
      }
    }
  }

  .vertical #references slot {
    flex-direction: column;
  }
`;
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.TTJR7FH2.js
function* Jr(e = document.activeElement) {
	e != null && (yield e, "shadowRoot" in e && e.shadowRoot && e.shadowRoot.mode !== "closed" && (yield* Jr(e.shadowRoot.activeElement)));
}
var Yr = t((() => {}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.DOFHHKB4.js
function Xr(e, t) {
	let n = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
	e.key === "Enter" && !n && setTimeout(() => {
		!e.defaultPrevented && !e.isComposing && Zr(t);
	});
}
function Zr(e) {
	let t = null;
	if ("form" in e && (t = e.form), !t && "getForm" in e && (t = e.getForm()), !t) return;
	let n = [...t.elements];
	if (n.length === 1) {
		t.requestSubmit(null);
		return;
	}
	let r = n.find((e) => e.type === "submit" && !e.matches(":disabled"));
	r && (["input", "button"].includes(r.localName) ? t.requestSubmit(r) : r.click());
}
var Qr = t((() => {})), $r, ei, ti = t((() => {
	$r = typeof window < "u" && "ontouchstart" in window, ei = class {
		constructor(e, t) {
			this.isActive = !1, this.isDragging = !1, this.handleDragStart = (e) => {
				let t = "touches" in e ? e.touches[0].clientX : e.clientX, n = "touches" in e ? e.touches[0].clientY : e.clientY;
				this.isDragging || !$r && e.buttons > 1 || (this.isDragging = !0, document.addEventListener("pointerup", this.handleDragStop), document.addEventListener("pointermove", this.handleDragMove), document.addEventListener("pointercancel", this.handleDragStop), document.addEventListener("touchend", this.handleDragStop), document.addEventListener("touchmove", this.handleDragMove), document.addEventListener("touchcancel", this.handleDragStop), this.options.start(t, n));
			}, this.handleDragStop = (e) => {
				let t = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX, n = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
				this.isDragging = !1, document.removeEventListener("pointerup", this.handleDragStop), document.removeEventListener("pointermove", this.handleDragMove), document.removeEventListener("pointercancel", this.handleDragStop), document.removeEventListener("touchend", this.handleDragStop), document.removeEventListener("touchmove", this.handleDragMove), document.removeEventListener("touchcancel", this.handleDragStop), this.options.stop(t, n);
			}, this.handleDragMove = (e) => {
				let t = "touches" in e ? e.touches[0].clientX : e.clientX, n = "touches" in e ? e.touches[0].clientY : e.clientY;
				window.getSelection()?.removeAllRanges(), this.options.move(t, n);
			}, this.element = e, this.options = {
				start: () => void 0,
				stop: () => void 0,
				move: () => void 0,
				...t
			}, this.start();
		}
		start() {
			this.isActive ||= (this.element.addEventListener("pointerdown", this.handleDragStart), $r && this.element.addEventListener("touchstart", this.handleDragStart), !0);
		}
		stop() {
			document.removeEventListener("pointerup", this.handleDragStop), document.removeEventListener("pointermove", this.handleDragMove), document.removeEventListener("pointercancel", this.handleDragStop), document.removeEventListener("touchend", this.handleDragStop), document.removeEventListener("touchmove", this.handleDragMove), document.removeEventListener("touchcancel", this.handleDragStop), this.element.removeEventListener("pointerdown", this.handleDragStart), $r && this.element.removeEventListener("touchstart", this.handleDragStart), this.isActive = !1, this.isDragging = !1;
		}
		toggle(e) {
			(e === void 0 ? !this.isActive : e) ? this.start() : this.stop();
		}
	};
})), ni, ri = t((() => {
	A(), ni = l`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`;
})), ii, ai = t((() => {
	ii = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
})), oi, si = t((() => {
	ai(), oi = (e = 21) => {
		let t = "", n = crypto.getRandomValues(new Uint8Array(e |= 0));
		for (; e--;) t += ii[n[e] & 63];
		return t;
	};
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.KNJT7KBU.js
function G(e, t, n) {
	return ((e) => Object.is(e, -0) ? 0 : e)(e < t ? t : e > n ? n : e);
}
function ci(e = "") {
	return `${e}${oi()}`;
}
var li = t((() => {
	si();
})), ui, di, fi, pi = t((() => {
	Ue(), kn(), ui = "important", di = " !important", fi = Dn(class extends On {
		constructor(e) {
			if (super(e), e.type !== En.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
		}
		render(e) {
			return Object.keys(e).reduce((t, n) => {
				let r = e[n];
				return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
			}, "");
		}
		update(e, [t]) {
			let { style: n } = e.element;
			if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
			for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
			for (let e in t) {
				let r = t[e];
				if (r != null) {
					this.ft.add(e);
					let t = typeof r == "string" && r.endsWith(di);
					e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? ui : "") : n[e] = r;
				}
			}
			return Oe;
		}
	});
})), mi = t((() => {
	pi();
})), hi, K, gi = t((() => {
	qr(), Yr(), Qr(), ti(), ri(), li(), Xt(), en(), nn(), an(), un(), Tn(), I(), A(), N(), Mn(), mi(), hi = () => ({
		observedAttributes: [
			"min",
			"max",
			"step"
		],
		checkValidity(e) {
			let t = {
				message: "",
				isValid: !0,
				invalidKeys: []
			}, n = (e, t, n, r) => {
				if (typeof document > "u") return "";
				let i = document.createElement("input");
				return i.type = "range", i.min = String(t), i.max = String(n), i.step = String(r), i.value = String(e), i.checkValidity(), i.validationMessage;
			};
			if (e.isRange) {
				let r = e.minValue, i = e.maxValue;
				if (r < e.min) return t.isValid = !1, t.invalidKeys.push("rangeUnderflow"), t.message = n(r, e.min, e.max, e.step) || `Value must be greater than or equal to ${e.min}.`, t;
				if (i > e.max) return t.isValid = !1, t.invalidKeys.push("rangeOverflow"), t.message = n(i, e.min, e.max, e.step) || `Value must be less than or equal to ${e.max}.`, t;
				if (e.step && e.step !== 1) {
					let a = (r - e.min) % e.step !== 0, o = (i - e.min) % e.step !== 0;
					if (a || o) return t.isValid = !1, t.invalidKeys.push("stepMismatch"), t.message = n(a ? r : i, e.min, e.max, e.step) || `Value must be a multiple of ${e.step}.`, t;
				}
			} else {
				let r = e.value;
				if (r < e.min) return t.isValid = !1, t.invalidKeys.push("rangeUnderflow"), t.message = n(r, e.min, e.max, e.step) || `Value must be greater than or equal to ${e.min}.`, t;
				if (r > e.max) return t.isValid = !1, t.invalidKeys.push("rangeOverflow"), t.message = n(r, e.min, e.max, e.step) || `Value must be less than or equal to ${e.max}.`, t;
				if (e.step && e.step !== 1 && (r - e.min) % e.step !== 0) return t.isValid = !1, t.invalidKeys.push("stepMismatch"), t.message = n(r, e.min, e.max, e.step) || `Value must be a multiple of ${e.step}.`, t;
			}
			return t;
		}
	}), K = class extends z {
		constructor() {
			super(...arguments), this.draggableThumbMin = null, this.draggableThumbMax = null, this.hasSlotController = new tn(this, "hint", "label"), this.localize = new wn(this), this.activeThumb = null, this.lastTrackPosition = null, this.label = "", this.hint = "", this.minValue = 0, this.maxValue = 50, this.defaultValue = this.getAttribute("value") == null ? this.minValue : Number(this.getAttribute("value")), this._value = null, this.range = !1, this.disabled = !1, this.readonly = !1, this.orientation = "horizontal", this.size = "m", this.min = 0, this.max = 100, this.step = 1, this.tooltipDistance = 8, this.tooltipPlacement = "top", this.withMarkers = !1, this.withTooltip = !1, this.withLabel = !1, this.withHint = !1;
		}
		static get validators() {
			return [...super.validators, hi()];
		}
		get focusableAnchor() {
			return this.isRange && this.thumbMin || this.slider;
		}
		get validationTarget() {
			return this.focusableAnchor;
		}
		get value() {
			return this.valueHasChanged ? G(this._value ?? this.minValue ?? 0, this.min, this.max) : G(this._value ?? this.defaultValue, this.min, this.max);
		}
		set value(e) {
			e = Number(e) ?? this.minValue, this._value !== e && (this.valueHasChanged = !0, this._value = e);
		}
		get isRange() {
			return this.range;
		}
		handleSizeChange() {
			Zt(this.localName, this.size);
		}
		firstUpdated() {
			this.isRange ? (this.draggableThumbMin = new ei(this.thumbMin, {
				start: () => {
					this.activeThumb = "min", this.trackBoundingClientRect = this.track.getBoundingClientRect(), this.valueWhenDraggingStarted = this.minValue, this.customStates.set("dragging", !0), this.showRangeTooltips();
				},
				move: (e, t) => {
					this.setThumbValueFromCoordinates(e, t, "min");
				},
				stop: () => {
					this.minValue !== this.valueWhenDraggingStarted && (this.updateComplete.then(() => {
						this.dispatchEvent(new Event("change", {
							bubbles: !0,
							composed: !0
						}));
					}), this.hasInteracted = !0), this.hideRangeTooltips(), this.customStates.set("dragging", !1), this.valueWhenDraggingStarted = void 0, this.activeThumb = null;
				}
			}), this.draggableThumbMax = new ei(this.thumbMax, {
				start: () => {
					this.activeThumb = "max", this.trackBoundingClientRect = this.track.getBoundingClientRect(), this.valueWhenDraggingStarted = this.maxValue, this.customStates.set("dragging", !0), this.showRangeTooltips();
				},
				move: (e, t) => {
					this.setThumbValueFromCoordinates(e, t, "max");
				},
				stop: () => {
					this.maxValue !== this.valueWhenDraggingStarted && (this.updateComplete.then(() => {
						this.dispatchEvent(new Event("change", {
							bubbles: !0,
							composed: !0
						}));
					}), this.hasInteracted = !0), this.hideRangeTooltips(), this.customStates.set("dragging", !1), this.valueWhenDraggingStarted = void 0, this.activeThumb = null;
				}
			}), this.draggableTrack = new ei(this.track, {
				start: (e, t) => {
					if (this.trackBoundingClientRect = this.track.getBoundingClientRect(), this.activeThumb) this.valueWhenDraggingStarted = this.activeThumb === "min" ? this.minValue : this.maxValue;
					else {
						let n = this.getValueFromCoordinates(e, t), r = Math.abs(n - this.minValue), i = Math.abs(n - this.maxValue);
						if (r === i) if (n > this.maxValue) this.activeThumb = "max";
						else if (n < this.minValue) this.activeThumb = "min";
						else {
							let n = this.localize.dir() === "rtl", r = this.orientation === "vertical", i = r ? t : e, a = this.lastTrackPosition || i;
							this.lastTrackPosition = i;
							let o = i > a !== n && !r || i < a && r;
							this.activeThumb = o ? "max" : "min";
						}
						else this.activeThumb = r <= i ? "min" : "max";
						this.valueWhenDraggingStarted = this.activeThumb === "min" ? this.minValue : this.maxValue;
					}
					this.customStates.set("dragging", !0), this.setThumbValueFromCoordinates(e, t, this.activeThumb), this.showRangeTooltips();
				},
				move: (e, t) => {
					this.activeThumb && this.setThumbValueFromCoordinates(e, t, this.activeThumb);
				},
				stop: () => {
					this.activeThumb && (this.activeThumb === "min" ? this.minValue : this.maxValue) !== this.valueWhenDraggingStarted && (this.updateComplete.then(() => {
						this.dispatchEvent(new Event("change", {
							bubbles: !0,
							composed: !0
						}));
					}), this.hasInteracted = !0), this.hideRangeTooltips(), this.customStates.set("dragging", !1), this.valueWhenDraggingStarted = void 0, this.activeThumb = null;
				}
			})) : this.draggableTrack = new ei(this.slider, {
				start: (e, t) => {
					this.trackBoundingClientRect = this.track.getBoundingClientRect(), this.valueWhenDraggingStarted = this.value, this.customStates.set("dragging", !0), this.setValueFromCoordinates(e, t), this.showTooltip();
				},
				move: (e, t) => {
					this.setValueFromCoordinates(e, t);
				},
				stop: () => {
					this.value !== this.valueWhenDraggingStarted && (this.updateComplete.then(() => {
						this.dispatchEvent(new Event("change", {
							bubbles: !0,
							composed: !0
						}));
					}), this.hasInteracted = !0), this.hideTooltip(), this.customStates.set("dragging", !1), this.valueWhenDraggingStarted = void 0;
				}
			});
		}
		willUpdate(e) {
			this.isRange && (e.has("minValue") || e.has("maxValue") || e.has("min") || e.has("max")) && (this.minValue = G(this.minValue, this.min, this.maxValue), this.maxValue = G(this.maxValue, this.minValue, this.max)), super.willUpdate(e);
		}
		updated(e) {
			if (this.isRange && (e.has("minValue") || e.has("maxValue")) && this.updateFormValue(), e.has("disabled") || e.has("readonly")) {
				let e = !(this.disabled || this.readonly);
				this.isRange && (this.draggableThumbMin && this.draggableThumbMin.toggle(e), this.draggableThumbMax && this.draggableThumbMax.toggle(e)), this.draggableTrack && this.draggableTrack.toggle(e);
			}
			super.updated(e);
		}
		formDisabledCallback(e) {
			this.disabled = e;
		}
		formResetCallback() {
			this.isRange ? (this.minValue = parseFloat(this.getAttribute("min-value") ?? String(this.min)), this.maxValue = parseFloat(this.getAttribute("max-value") ?? String(this.max))) : (this._value = null, this.defaultValue = this.defaultValue ?? parseFloat(this.getAttribute("value") ?? String(this.min))), this.valueHasChanged = !1, this.hasInteracted = !1, super.formResetCallback();
		}
		clampAndRoundToStep(e) {
			let t = (String(this.step).split(".")[1] || "").replace(/0+$/g, "").length, n = Number(this.step), r = Number(this.min), i = Number(this.max);
			return e = Math.round(e / n) * n, e = G(e, r, i), parseFloat(e.toFixed(t));
		}
		getPercentageFromValue(e) {
			return (e - this.min) / (this.max - this.min) * 100;
		}
		getValueFromCoordinates(e, t) {
			let n = this.localize.dir() === "rtl", r = this.orientation === "vertical", { top: i, right: a, bottom: o, left: s, height: c, width: l } = this.trackBoundingClientRect, u = r ? t : e, d = r ? {
				start: i,
				end: o,
				size: c
			} : {
				start: s,
				end: a,
				size: l
			}, f = (r || n ? d.end - u : u - d.start) / d.size;
			return this.clampAndRoundToStep(this.min + (this.max - this.min) * f);
		}
		handleBlur() {
			this.isRange ? requestAnimationFrame(() => {
				let e = this.shadowRoot?.activeElement;
				e === this.thumbMin || e === this.thumbMax || this.hideRangeTooltips();
			}) : this.hideTooltip(), this.customStates.set("focused", !1), this.dispatchEvent(new FocusEvent("blur", {
				bubbles: !0,
				composed: !0
			}));
		}
		handleFocus(e) {
			let t = e.target;
			this.isRange ? (t === this.thumbMin ? this.activeThumb = "min" : t === this.thumbMax && (this.activeThumb = "max"), this.showRangeTooltips()) : this.showTooltip(), this.customStates.set("focused", !0), this.dispatchEvent(new FocusEvent("focus", {
				bubbles: !0,
				composed: !0
			}));
		}
		handleKeyDown(e) {
			let t = this.localize.dir() === "rtl", n = e.target;
			if (this.disabled || this.readonly || this.isRange && (n === this.thumbMin ? this.activeThumb = "min" : n === this.thumbMax && (this.activeThumb = "max"), !this.activeThumb)) return;
			let r = this.isRange ? this.activeThumb === "min" ? this.minValue : this.maxValue : this.value, i = r;
			switch (e.key) {
				case "ArrowUp":
				case t ? "ArrowLeft" : "ArrowRight":
					e.preventDefault(), i = this.clampAndRoundToStep(r + this.step);
					break;
				case "ArrowDown":
				case t ? "ArrowRight" : "ArrowLeft":
					e.preventDefault(), i = this.clampAndRoundToStep(r - this.step);
					break;
				case "Home":
					e.preventDefault(), i = this.isRange && this.activeThumb === "min" ? this.min : this.isRange ? this.minValue : this.min;
					break;
				case "End":
					e.preventDefault(), i = this.isRange && this.activeThumb === "max" ? this.max : this.isRange ? this.maxValue : this.max;
					break;
				case "PageUp":
					e.preventDefault();
					let n = Math.max(r + (this.max - this.min) / 10, r + this.step);
					i = this.clampAndRoundToStep(n);
					break;
				case "PageDown":
					e.preventDefault();
					let a = Math.min(r - (this.max - this.min) / 10, r - this.step);
					i = this.clampAndRoundToStep(a);
					break;
				case "Enter":
					Xr(e, this);
					return;
			}
			i !== r && (this.isRange ? (this.activeThumb === "min" ? i > this.maxValue ? (this.maxValue = i, this.minValue = i) : this.minValue = Math.max(this.min, i) : i < this.minValue ? (this.minValue = i, this.maxValue = i) : this.maxValue = Math.min(this.max, i), this.updateFormValue()) : this.value = G(i, this.min, this.max), this.updateComplete.then(() => {
				this.dispatchEvent(new InputEvent("input", {
					bubbles: !0,
					composed: !0
				})), this.dispatchEvent(new Event("change", {
					bubbles: !0,
					composed: !0
				}));
			}), this.hasInteracted = !0);
		}
		handleLabelPointerDown(e) {
			e.preventDefault(), this.disabled || (this.isRange ? this.thumbMin?.focus() : this.slider.focus());
		}
		setValueFromCoordinates(e, t) {
			let n = this.value;
			this.value = this.getValueFromCoordinates(e, t), this.value !== n && this.updateComplete.then(() => {
				this.dispatchEvent(new InputEvent("input", {
					bubbles: !0,
					composed: !0
				}));
			});
		}
		setThumbValueFromCoordinates(e, t, n) {
			let r = this.getValueFromCoordinates(e, t), i = n === "min" ? this.minValue : this.maxValue;
			n === "min" ? r > this.maxValue ? (this.maxValue = r, this.minValue = r) : this.minValue = Math.max(this.min, r) : r < this.minValue ? (this.minValue = r, this.maxValue = r) : this.maxValue = Math.min(this.max, r), i !== (n === "min" ? this.minValue : this.maxValue) && (this.updateFormValue(), this.updateComplete.then(() => {
				this.dispatchEvent(new InputEvent("input", {
					bubbles: !0,
					composed: !0
				}));
			}));
		}
		showTooltip() {
			this.withTooltip && this.tooltip && (this.tooltip.open = !0);
		}
		hideTooltip() {
			this.withTooltip && this.tooltip && (this.tooltip.open = !1);
		}
		showRangeTooltips() {
			if (!this.withTooltip) return;
			let e = this.shadowRoot?.getElementById("tooltip-thumb-min"), t = this.shadowRoot?.getElementById("tooltip-thumb-max");
			this.activeThumb === "min" ? (e && (e.open = !0), t && (t.open = !1)) : this.activeThumb === "max" && (t && (t.open = !0), e && (e.open = !1));
		}
		hideRangeTooltips() {
			if (!this.withTooltip) return;
			let e = this.shadowRoot?.getElementById("tooltip-thumb-min"), t = this.shadowRoot?.getElementById("tooltip-thumb-max");
			e && (e.open = !1), t && (t.open = !1);
		}
		updateFormValue(e) {
			if (this.isRange) {
				let e = new FormData();
				e.append(this.name || "", String(this.minValue)), e.append(this.name || "", String(this.maxValue)), this.setValue(e, e);
				return;
			}
			super.updateFormValue(e);
		}
		focus() {
			this.isRange ? this.thumbMin?.focus() : this.slider.focus();
		}
		blur() {
			if (this.isRange) {
				for (let e of Jr()) if (e === this.thumbMin) {
					this.thumbMin.blur();
					break;
				} else if (e === this.thumbMax) {
					this.thumbMax.blur();
					break;
				}
			} else this.slider.blur();
		}
		stepDown() {
			if (this.isRange) {
				let e = this.clampAndRoundToStep(this.minValue - this.step);
				this.minValue = G(e, this.min, this.maxValue), this.updateFormValue();
			} else {
				let e = this.clampAndRoundToStep(this.value - this.step);
				this.value = e;
			}
		}
		stepUp() {
			if (this.isRange) {
				let e = this.clampAndRoundToStep(this.maxValue + this.step);
				this.maxValue = G(e, this.minValue, this.max), this.updateFormValue();
			} else {
				let e = this.clampAndRoundToStep(this.value + this.step);
				this.value = e;
			}
		}
		render() {
			let e = this.hasSlotController.test("label", "withLabel"), t = this.hasSlotController.test("hint", "withHint"), n = this.label ? !0 : !!e, r = this.hint ? !0 : !!t, i = this.hasSlotController.test("reference"), a = An({
				xs: this.size === "xs",
				s: this.size === "s" || this.size === "small",
				m: this.size === "m" || this.size === "medium",
				l: this.size === "l" || this.size === "large",
				xl: this.size === "xl",
				small: this.size === "small" || this.size === "s",
				medium: this.size === "medium" || this.size === "m",
				large: this.size === "large" || this.size === "l",
				horizontal: this.orientation === "horizontal",
				vertical: this.orientation === "vertical",
				disabled: this.disabled
			}), o = [];
			if (this.withMarkers) for (let e = this.min; e <= this.max; e += this.step) o.push(this.getPercentageFromValue(e));
			let s = E`
      <label
        id="label"
        part="label"
        for=${this.isRange ? "thumb-min" : "text-box"}
        class=${An({
				vh: !n,
				"has-label": n
			})}
        @pointerdown=${this.handleLabelPointerDown}
      >
        <slot name="label">${this.label}</slot>
      </label>
    `, c = E`
      <div
        id="hint"
        part="hint"
        class=${An({ "has-slotted": r })}
      >
        <slot name="hint">${this.hint}</slot>
      </div>
    `, l = this.withMarkers ? E`
          <div id="markers" part="markers">
            ${o.map((e) => E`<span part="marker" class="marker" style=${fi({ "--position": `${e}%` })}></span>`)}
          </div>
        ` : "", u = i ? E`
          <div id="references" part="references" aria-hidden="true">
            <slot name="reference"></slot>
          </div>
        ` : "", d = (e, t) => this.withTooltip ? E`
            <wa-tooltip
              id=${`tooltip${e === "thumb" ? "" : "-" + e}`}
              part="tooltip"
              exportparts="
                base:tooltip__base,
                body:tooltip__body,
                arrow:tooltip__arrow
              "
              trigger="manual"
              distance=${this.tooltipDistance}
              placement=${this.tooltipPlacement}
              for=${e}
              activation="manual"
              dir=${this.localize.dir()}
            >
              <span aria-hidden="true">
                ${typeof this.valueFormatter == "function" ? this.valueFormatter(t) : this.localize.number(t)}
              </span>
            </wa-tooltip>
          ` : "";
			if (this.isRange) {
				let e = G(this.getPercentageFromValue(this.minValue), 0, 100), t = G(this.getPercentageFromValue(this.maxValue), 0, 100);
				return E`
        ${s}

        <div id="slider" part="slider" class=${a}>
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${fi({
					"--start": `${Math.min(e, t)}%`,
					"--end": `${Math.max(e, t)}%`
				})}
            ></div>

            ${l}

            <span
              id="thumb-min"
              part="thumb thumb-min"
              style=${fi({ "--position": `${e}%` })}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.minValue}
              aria-valuetext=${typeof this.valueFormatter == "function" ? this.valueFormatter(this.minValue) : this.localize.number(this.minValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label ? `${this.label} (minimum value)` : "Minimum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled ? "true" : "false"}
              aria-readonly=${this.readonly ? "true" : "false"}
              tabindex=${this.disabled ? -1 : 0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>

            <span
              id="thumb-max"
              part="thumb thumb-max"
              style=${fi({ "--position": `${t}%` })}
              role="slider"
              aria-valuemin=${this.min}
              aria-valuenow=${this.maxValue}
              aria-valuetext=${typeof this.valueFormatter == "function" ? this.valueFormatter(this.maxValue) : this.localize.number(this.maxValue)}
              aria-valuemax=${this.max}
              aria-label="${this.label ? `${this.label} (maximum value)` : "Maximum value"}"
              aria-orientation=${this.orientation}
              aria-disabled=${this.disabled ? "true" : "false"}
              aria-readonly=${this.readonly ? "true" : "false"}
              tabindex=${this.disabled ? -1 : 0}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
              @keydown=${this.handleKeyDown}
            ></span>
          </div>

          ${u} ${c}
        </div>

        ${d("thumb-min", this.minValue)} ${d("thumb-max", this.maxValue)}
      `;
			} else {
				let e = G(this.getPercentageFromValue(this.value), 0, 100), t = G(this.getPercentageFromValue(typeof this.indicatorOffset == "number" ? this.indicatorOffset : this.min), 0, 100);
				return E`
        ${s}

        <div
          id="slider"
          part="slider"
          class=${a}
          role="slider"
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-readonly=${this.disabled ? "true" : "false"}
          aria-orientation=${this.orientation}
          aria-valuemin=${this.min}
          aria-valuenow=${this.value}
          aria-valuetext=${typeof this.valueFormatter == "function" ? this.valueFormatter(this.value) : this.localize.number(this.value)}
          aria-valuemax=${this.max}
          aria-labelledby="label"
          aria-describedby="hint"
          tabindex=${this.disabled ? -1 : 0}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        >
          <div id="track" part="track">
            <div
              id="indicator"
              part="indicator"
              style=${fi({
					"--start": `${t}%`,
					"--end": `${e}%`
				})}
            ></div>

            ${l}
            <span id="thumb" part="thumb" style=${fi({ "--position": `${e}%` })}></span>
          </div>

          ${u} ${c}
        </div>

        ${d("thumb", this.value)}
      `;
			}
		}
	}, K.formAssociated = !0, K.observeSlots = !0, K.css = [
		rn,
		ni,
		Kr
	], F([M("#slider")], K.prototype, "slider", 2), F([M("#thumb")], K.prototype, "thumb", 2), F([M("#thumb-min")], K.prototype, "thumbMin", 2), F([M("#thumb-max")], K.prototype, "thumbMax", 2), F([M("#track")], K.prototype, "track", 2), F([M("#tooltip")], K.prototype, "tooltip", 2), F([j()], K.prototype, "label", 2), F([j({ attribute: "hint" })], K.prototype, "hint", 2), F([j({ reflect: !0 })], K.prototype, "name", 2), F([j({
		type: Number,
		attribute: "min-value"
	})], K.prototype, "minValue", 2), F([j({
		type: Number,
		attribute: "max-value"
	})], K.prototype, "maxValue", 2), F([j({
		attribute: "value",
		reflect: !0,
		type: Number
	})], K.prototype, "defaultValue", 2), F([$e()], K.prototype, "value", 1), F([j({
		type: Boolean,
		reflect: !0
	})], K.prototype, "range", 2), F([j({ type: Boolean })], K.prototype, "disabled", 2), F([j({
		type: Boolean,
		reflect: !0
	})], K.prototype, "readonly", 2), F([j({ reflect: !0 })], K.prototype, "orientation", 2), F([j({ reflect: !0 })], K.prototype, "size", 2), F([B("size")], K.prototype, "handleSizeChange", 1), F([j({
		attribute: "indicator-offset",
		type: Number
	})], K.prototype, "indicatorOffset", 2), F([j({ type: Number })], K.prototype, "min", 2), F([j({ type: Number })], K.prototype, "max", 2), F([j({ type: Number })], K.prototype, "step", 2), F([j({ type: Boolean })], K.prototype, "autofocus", 2), F([j({
		attribute: "tooltip-distance",
		type: Number
	})], K.prototype, "tooltipDistance", 2), F([j({
		attribute: "tooltip-placement",
		reflect: !0
	})], K.prototype, "tooltipPlacement", 2), F([j({
		attribute: "with-markers",
		type: Boolean
	})], K.prototype, "withMarkers", 2), F([j({
		attribute: "with-tooltip",
		type: Boolean
	})], K.prototype, "withTooltip", 2), F([j({
		attribute: "with-label",
		type: Boolean
	})], K.prototype, "withLabel", 2), F([j({
		attribute: "with-hint",
		type: Boolean
	})], K.prototype, "withHint", 2), F([j({ attribute: !1 })], K.prototype, "valueFormatter", 2), K = F([Je("wa-slider")], K);
})), _i, vi = t((() => {
	A(), _i = l`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`;
})), yi, bi = t((() => {
	yi = class extends Event {
		constructor() {
			super("wa-show", {
				bubbles: !0,
				cancelable: !0,
				composed: !0
			});
		}
	};
})), xi, Si = t((() => {
	xi = class extends Event {
		constructor(e) {
			super("wa-hide", {
				bubbles: !0,
				cancelable: !0,
				composed: !0
			}), this.detail = e;
		}
	};
})), Ci, wi = t((() => {
	Ci = class extends Event {
		constructor() {
			super("wa-after-hide", {
				bubbles: !0,
				cancelable: !1,
				composed: !0
			});
		}
	};
})), Ti, Ei = t((() => {
	Ti = class extends Event {
		constructor() {
			super("wa-after-show", {
				bubbles: !0,
				cancelable: !1,
				composed: !0
			});
		}
	};
})), Di, Oi = t((() => {
	Di = class extends Event {
		constructor() {
			super("wa-reposition", {
				bubbles: !0,
				cancelable: !1,
				composed: !0
			});
		}
	};
})), ki, Ai = t((() => {
	A(), ki = l`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;
}));
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function ji(e, t, n) {
	return q(e, Ji(t, n));
}
function Mi(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Ni(e) {
	return e.split("-")[0];
}
function Pi(e) {
	return e.split("-")[1];
}
function Fi(e) {
	return e === "x" ? "y" : "x";
}
function Ii(e) {
	return e === "y" ? "height" : "width";
}
function Li(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function Ri(e) {
	return Fi(Li(e));
}
function zi(e, t, n) {
	n === void 0 && (n = !1);
	let r = Pi(e), i = Ri(e), a = Ii(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Wi(o)), [o, Wi(o)];
}
function Bi(e) {
	let t = Wi(e);
	return [
		Vi(e),
		t,
		Vi(t)
	];
}
function Vi(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
function Hi(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? $i : Qi : t ? Qi : $i;
		case "left":
		case "right": return t ? ea : ta;
		default: return [];
	}
}
function Ui(e, t, n, r) {
	let i = Pi(e), a = Hi(Ni(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(Vi)))), a;
}
function Wi(e) {
	let t = Ni(e);
	return Zi[t] + e.slice(t.length);
}
function Gi(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function Ki(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : Gi(e);
}
function qi(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
var Ji, q, Yi, Xi, J, Zi, Qi, $i, ea, ta, na = t((() => {
	Ji = Math.min, q = Math.max, Yi = Math.round, Xi = Math.floor, J = (e) => ({
		x: e,
		y: e
	}), Zi = {
		left: "right",
		right: "left",
		bottom: "top",
		top: "bottom"
	}, Qi = ["left", "right"], $i = ["right", "left"], ea = ["top", "bottom"], ta = ["bottom", "top"];
}));
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function ra(e, t, n) {
	let { reference: r, floating: i } = e, a = Li(t), o = Ri(t), s = Ii(o), c = Ni(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (Pi(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function ia(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Mi(t, e), p = Ki(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = qi(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = qi(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
async function aa(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Ni(n), s = Pi(n), c = Li(n) === "y", l = ua.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Mi(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var oa, sa, ca, la, ua, da, fa, pa, ma = t((() => {
	na(), oa = 50, sa = async (e, t, n) => {
		let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
			...o,
			detectOverflow: ia
		}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}), { x: u, y: d } = ra(l, r, c), f = r, p = 0, m = {};
		for (let n = 0; n < a.length; n++) {
			let h = a[n];
			if (!h) continue;
			let { name: g, fn: _ } = h, { x: v, y, data: ee, reset: b } = await _({
				x: u,
				y: d,
				initialPlacement: r,
				placement: f,
				strategy: i,
				middlewareData: m,
				rects: l,
				platform: s,
				elements: {
					reference: e,
					floating: t
				}
			});
			u = v ?? u, d = y ?? d, m[g] = {
				...m[g],
				...ee
			}, b && p < oa && (p++, typeof b == "object" && (b.placement && (f = b.placement), b.rects && (l = b.rects === !0 ? await o.getElementRects({
				reference: e,
				floating: t,
				strategy: i
			}) : b.rects), {x: u, y: d} = ra(l, f, c)), n = -1);
		}
		return {
			x: u,
			y: d,
			placement: f,
			strategy: i,
			middlewareData: m
		};
	}, ca = (e) => ({
		name: "arrow",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Mi(e, t) || {};
			if (l == null) return {};
			let d = Ki(u), f = {
				x: n,
				y: r
			}, p = Ri(i), m = Ii(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", ee = a.reference[m] + a.reference[p] - f[p] - a.floating[m], b = f[p] - a.reference[p], te = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), x = te ? te[y] : 0;
			(!x || !await (o.isElement == null ? void 0 : o.isElement(te))) && (x = s.floating[y] || a.floating[m]);
			let S = ee / 2 - b / 2, C = x / 2 - h[m] / 2 - 1, ne = Ji(d[_], C), re = Ji(d[v], C), ie = ne, ae = x - h[m] - re, w = x / 2 - h[m] / 2 + S, oe = ji(ie, w, ae), se = !c.arrow && Pi(i) != null && w !== oe && a.reference[m] / 2 - (w < ie ? ne : re) - h[m] / 2 < 0, ce = se ? w < ie ? w - ie : w - ae : 0;
			return {
				[p]: f[p] + ce,
				data: {
					[p]: oe,
					centerOffset: w - oe - ce,
					...se && { alignmentOffset: ce }
				},
				reset: se
			};
		}
	}), la = function(e) {
		return e === void 0 && (e = {}), {
			name: "flip",
			options: e,
			async fn(t) {
				var n;
				let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Mi(e, t);
				if ((n = i.arrow) != null && n.alignmentOffset) return {};
				let g = Ni(r), _ = Li(o), v = Ni(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), ee = d || (v || !m ? [Wi(o)] : Bi(o)), b = p !== "none";
				!d && b && ee.push(...Ui(o, m, p, y));
				let te = [o, ...ee], x = await s.detectOverflow(t, h), S = [], C = i.flip?.overflows || [];
				if (l && S.push(x[g]), u) {
					let e = zi(r, a, y);
					S.push(x[e[0]], x[e[1]]);
				}
				if (C = [...C, {
					placement: r,
					overflows: S
				}], !S.every((e) => e <= 0)) {
					let e = (i.flip?.index || 0) + 1, t = te[e];
					if (t && (!(u === "alignment" && _ !== Li(t)) || C.every((e) => Li(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
						data: {
							index: e,
							overflows: C
						},
						reset: { placement: t }
					};
					let n = C.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
					if (!n) switch (f) {
						case "bestFit": {
							let e = C.filter((e) => {
								if (b) {
									let t = Li(e.placement);
									return t === _ || t === "y";
								}
								return !0;
							}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
							e && (n = e);
							break;
						}
						case "initialPlacement":
							n = o;
							break;
					}
					if (r !== n) return { reset: { placement: n } };
				}
				return {};
			}
		};
	}, ua = /*#__PURE__*/ new Set(["left", "top"]), da = function(e) {
		return e === void 0 && (e = 0), {
			name: "offset",
			options: e,
			async fn(t) {
				var n;
				let { x: r, y: i, placement: a, middlewareData: o } = t, s = await aa(t, e);
				return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
					x: r + s.x,
					y: i + s.y,
					data: {
						...s,
						placement: a
					}
				};
			}
		};
	}, fa = function(e) {
		return e === void 0 && (e = {}), {
			name: "shift",
			options: e,
			async fn(t) {
				let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
					let { x: t, y: n } = e;
					return {
						x: t,
						y: n
					};
				} }, ...l } = Mi(e, t), u = {
					x: n,
					y: r
				}, d = await a.detectOverflow(t, l), f = Li(Ni(i)), p = Fi(f), m = u[p], h = u[f];
				if (o) {
					let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
					m = ji(n, m, r);
				}
				if (s) {
					let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
					h = ji(n, h, r);
				}
				let g = c.fn({
					...t,
					[p]: m,
					[f]: h
				});
				return {
					...g,
					data: {
						x: g.x - n,
						y: g.y - r,
						enabled: {
							[p]: o,
							[f]: s
						}
					}
				};
			}
		};
	}, pa = function(e) {
		return e === void 0 && (e = {}), {
			name: "size",
			options: e,
			async fn(t) {
				var n, r;
				let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = Mi(e, t), u = await o.detectOverflow(t, l), d = Ni(i), f = Pi(i), p = Li(i) === "y", { width: m, height: h } = a.floating, g, _;
				d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
				let v = h - u.top - u.bottom, y = m - u.left - u.right, ee = Ji(h - u[g], v), b = Ji(m - u[_], y), te = !t.middlewareData.shift, x = ee, S = b;
				if ((n = t.middlewareData.shift) != null && n.enabled.x && (S = y), (r = t.middlewareData.shift) != null && r.enabled.y && (x = v), te && !f) {
					let e = q(u.left, 0), t = q(u.right, 0), n = q(u.top, 0), r = q(u.bottom, 0);
					p ? S = m - 2 * (e !== 0 || t !== 0 ? e + t : q(u.left, u.right)) : x = h - 2 * (n !== 0 || r !== 0 ? n + r : q(u.top, u.bottom));
				}
				await c({
					...t,
					availableWidth: S,
					availableHeight: x
				});
				let C = await o.getDimensions(s.floating);
				return m !== C.width || h !== C.height ? { reset: { rects: !0 } } : {};
			}
		};
	};
}));
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function ha() {
	return typeof window < "u";
}
function ga(e) {
	return va(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Y(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function _a(e) {
	return ((va(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function va(e) {
	return ha() ? e instanceof Node || e instanceof Y(e).Node : !1;
}
function X(e) {
	return ha() ? e instanceof Element || e instanceof Y(e).Element : !1;
}
function ya(e) {
	return ha() ? e instanceof HTMLElement || e instanceof Y(e).HTMLElement : !1;
}
function ba(e) {
	return !ha() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Y(e).ShadowRoot;
}
function xa(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Z(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Sa(e) {
	return /^(table|td|th)$/.test(ga(e));
}
function Ca(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
function wa(e) {
	let t = X(e) ? Z(e) : e;
	return Fa(t.transform) || Fa(t.translate) || Fa(t.scale) || Fa(t.rotate) || Fa(t.perspective) || !Ea() && (Fa(t.backdropFilter) || Fa(t.filter)) || Na.test(t.willChange || "") || Pa.test(t.contain || "");
}
function Ta(e) {
	let t = ka(e);
	for (; ya(t) && !Da(t);) {
		if (wa(t)) return t;
		if (Ca(t)) return null;
		t = ka(t);
	}
	return null;
}
function Ea() {
	return Ia ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Ia;
}
function Da(e) {
	return /^(html|body|#document)$/.test(ga(e));
}
function Z(e) {
	return Y(e).getComputedStyle(e);
}
function Oa(e) {
	return X(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function ka(e) {
	if (ga(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || ba(e) && e.host || _a(e);
	return ba(t) ? t.host : t;
}
function Aa(e) {
	let t = ka(e);
	return Da(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ya(t) && xa(t) ? t : Aa(t);
}
function ja(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Aa(e), i = r === e.ownerDocument?.body, a = Y(r);
	if (i) {
		let e = Ma(a);
		return t.concat(a, a.visualViewport || [], xa(r) ? r : [], e && n ? ja(e) : []);
	} else return t.concat(r, ja(r, [], n));
}
function Ma(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
var Na, Pa, Fa, Ia, La = t((() => {
	Na = /transform|translate|scale|rotate|perspective|filter/, Pa = /paint|layout|strict|content/, Fa = (e) => !!e && e !== "none";
}));
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Ra(e) {
	let t = Z(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = ya(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Yi(n) !== a || Yi(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function za(e) {
	return X(e) ? e : e.contextElement;
}
function Ba(e) {
	let t = za(e);
	if (!ya(t)) return J(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Ra(t), o = (a ? Yi(n.width) : n.width) / r, s = (a ? Yi(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
function Va(e) {
	let t = Y(e);
	return !Ea() || !t.visualViewport ? uo : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Ha(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== Y(e) ? !1 : t;
}
function Ua(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = za(e), o = J(1);
	t && (r ? X(r) && (o = Ba(r)) : o = Ba(e));
	let s = Ha(a, n, r) ? Va(a) : J(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = Y(a), t = r && X(r) ? Y(r) : r, n = e, i = Ma(n);
		for (; i && r && t !== n;) {
			let e = Ba(i), t = i.getBoundingClientRect(), r = Z(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Y(i), i = Ma(n);
		}
	}
	return qi({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Wa(e, t) {
	let n = Oa(e).scrollLeft;
	return t ? t.left + n : Ua(_a(e)).left + n;
}
function Ga(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Wa(e, n),
		y: n.top + t.scrollTop
	};
}
function Ka(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = _a(r), s = t ? Ca(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = J(1), u = J(0), d = ya(r);
	if ((d || !d && !a) && ((ga(r) !== "body" || xa(o)) && (c = Oa(r)), d)) {
		let e = Ua(r);
		l = Ba(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Ga(o, c) : J(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function qa(e) {
	return Array.from(e.getClientRects());
}
function Ja(e) {
	let t = _a(e), n = Oa(e), r = e.ownerDocument.body, i = q(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = q(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + Wa(e), s = -n.scrollTop;
	return Z(r).direction === "rtl" && (o += q(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
function Ya(e, t) {
	let n = Y(e), r = _a(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = Ea();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = Wa(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= fo && (a -= o);
	} else l <= fo && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function Xa(e, t) {
	let n = Ua(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = ya(e) ? Ba(e) : J(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Za(e, t, n) {
	let r;
	if (t === "viewport") r = Ya(e, n);
	else if (t === "document") r = Ja(_a(e));
	else if (X(t)) r = Xa(t, n);
	else {
		let n = Va(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return qi(r);
}
function Qa(e, t) {
	let n = ka(e);
	return n === t || !X(n) || Da(n) ? !1 : Z(n).position === "fixed" || Qa(n, t);
}
function $a(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ja(e, [], !1).filter((e) => X(e) && ga(e) !== "body"), i = null, a = Z(e).position === "fixed", o = a ? ka(e) : e;
	for (; X(o) && !Da(o);) {
		let t = Z(o), n = wa(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || xa(o) && !n && Qa(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = ka(o);
	}
	return t.set(e, r), r;
}
function eo(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Ca(t) ? [] : $a(t, this._c) : [].concat(n), r], o = Za(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Za(t, a[e], i);
		s = q(n.top, s), c = Ji(n.right, c), l = Ji(n.bottom, l), u = q(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function to(e) {
	let { width: t, height: n } = Ra(e);
	return {
		width: t,
		height: n
	};
}
function no(e, t, n) {
	let r = ya(t), i = _a(t), a = n === "fixed", o = Ua(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = J(0);
	function l() {
		c.x = Wa(i);
	}
	if (r || !r && !a) if ((ga(t) !== "body" || xa(i)) && (s = Oa(t)), r) {
		let e = Ua(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? Ga(i, s) : J(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function ro(e) {
	return Z(e).position === "static";
}
function io(e, t) {
	if (!ya(e) || Z(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return _a(e) === n && (n = n.ownerDocument.body), n;
}
function ao(e, t) {
	let n = Y(e);
	if (Ca(e)) return n;
	if (!ya(e)) {
		let t = ka(e);
		for (; t && !Da(t);) {
			if (X(t) && !ro(t)) return t;
			t = ka(t);
		}
		return n;
	}
	let r = io(e, t);
	for (; r && Sa(r) && ro(r);) r = io(r, t);
	return r && Da(r) && ro(r) && !wa(r) ? n : r || Ta(e) || n;
}
function oo(e) {
	return Z(e).direction === "rtl";
}
function so(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function co(e, t) {
	let n = null, r, i = _a(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = Xi(d), h = Xi(i.clientWidth - (u + f)), g = Xi(i.clientHeight - (d + p)), _ = Xi(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: q(0, Ji(1, c)) || 1
		}, y = !0;
		function ee(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !so(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(ee, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(ee, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function lo(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = za(e), u = i || a ? [...l ? ja(l) : [], ...t ? ja(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? co(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Ua(e) : null;
	c && g();
	function g() {
		let t = Ua(e);
		h && !so(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo = t((() => {
	ma(), na(), La(), uo = /*#__PURE__*/ J(0), fo = 25, po = async function(e) {
		let t = this.getOffsetParent || ao, n = this.getDimensions, r = await n(e.floating);
		return {
			reference: no(e.reference, await t(e.floating), e.strategy),
			floating: {
				x: 0,
				y: 0,
				width: r.width,
				height: r.height
			}
		};
	}, mo = {
		convertOffsetParentRelativeRectToViewportRelativeRect: Ka,
		getDocumentElement: _a,
		getClippingRect: eo,
		getOffsetParent: ao,
		getElementRects: po,
		getClientRects: qa,
		getDimensions: to,
		getScale: Ba,
		isElement: X,
		isRTL: oo
	}, ho = da, go = fa, _o = la, vo = pa, yo = ca, bo = (e, t, n) => {
		let r = /* @__PURE__ */ new Map(), i = {
			platform: mo,
			...n
		}, a = {
			...i.platform,
			_c: r
		};
		return sa(e, t, {
			...i,
			platform: a
		});
	};
}));
//#endregion
//#region node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
function So(e) {
	return wo(e);
}
function Co(e) {
	return e.assignedSlot ? e.assignedSlot : e.parentNode instanceof ShadowRoot ? e.parentNode.host : e.parentNode;
}
function wo(e) {
	for (let t = e; t; t = Co(t)) if (t instanceof Element && getComputedStyle(t).display === "none") return null;
	for (let t = Co(e); t; t = Co(t)) {
		if (!(t instanceof Element)) continue;
		let e = getComputedStyle(t);
		if (e.display !== "contents" && (e.position !== "static" || wa(e) || t.tagName === "BODY")) return t;
	}
	return null;
}
var To = t((() => {
	La();
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.K442ELDU.js
function Eo(e) {
	return typeof e == "object" && !!e && "getBoundingClientRect" in e && ("contextElement" in e ? e instanceof Element : !0);
}
var Do, Q, Oo = t((() => {
	Oi(), Ai(), R(), Tn(), I(), xo(), To(), A(), N(), Mn(), Do = !!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"), Q = class extends L {
		constructor() {
			super(...arguments), this.localize = new wn(this), this.SUPPORTS_POPOVER = !1, this.active = !1, this.placement = "top", this.boundary = "viewport", this.distance = 0, this.skidding = 0, this.arrow = !1, this.arrowPlacement = "anchor", this.arrowPadding = 10, this.flip = !1, this.flipFallbackPlacements = "", this.flipFallbackStrategy = "best-fit", this.flipPadding = 0, this.shift = !1, this.shiftPadding = 0, this.autoSizePadding = 0, this.hoverBridge = !1, this.updateHoverBridge = () => {
				if (this.hoverBridge && this.anchorEl && this.popup) {
					let e = this.anchorEl.getBoundingClientRect(), t = this.popup.getBoundingClientRect(), n = this.placement.includes("top") || this.placement.includes("bottom"), r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0;
					n ? e.top < t.top ? (r = e.left, i = e.bottom, a = e.right, o = e.bottom, s = t.left, c = t.top, l = t.right, u = t.top) : (r = t.left, i = t.bottom, a = t.right, o = t.bottom, s = e.left, c = e.top, l = e.right, u = e.top) : e.left < t.left ? (r = e.right, i = e.top, a = t.left, o = t.top, s = e.right, c = e.bottom, l = t.left, u = t.bottom) : (r = t.right, i = t.top, a = e.left, o = e.top, s = t.right, c = t.bottom, l = e.left, u = e.bottom), this.style.setProperty("--hover-bridge-top-left-x", `${r}px`), this.style.setProperty("--hover-bridge-top-left-y", `${i}px`), this.style.setProperty("--hover-bridge-top-right-x", `${a}px`), this.style.setProperty("--hover-bridge-top-right-y", `${o}px`), this.style.setProperty("--hover-bridge-bottom-left-x", `${s}px`), this.style.setProperty("--hover-bridge-bottom-left-y", `${c}px`), this.style.setProperty("--hover-bridge-bottom-right-x", `${l}px`), this.style.setProperty("--hover-bridge-bottom-right-y", `${u}px`);
				}
			};
		}
		async connectedCallback() {
			super.connectedCallback(), await this.updateComplete, this.SUPPORTS_POPOVER = Do, this.start();
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this.stop();
		}
		async updated(e) {
			super.updated(e), e.has("active") && (this.active ? this.start() : this.stop()), e.has("anchor") && this.handleAnchorChange(), this.active && (await this.updateComplete, this.reposition());
		}
		async handleAnchorChange() {
			if (await this.stop(), this.anchor && typeof this.anchor == "string") {
				let e = this.getRootNode();
				this.anchorEl = e.getElementById(this.anchor);
			} else this.anchor instanceof Element || Eo(this.anchor) ? this.anchorEl = this.anchor : this.anchorEl = this.querySelector("[slot=\"anchor\"]");
			this.anchorEl instanceof HTMLSlotElement && (this.anchorEl = this.anchorEl.assignedElements({ flatten: !0 })[0]), this.anchorEl && this.start();
		}
		start() {
			!this.anchorEl || !this.active || !this.isConnected || (this.popup?.showPopover?.(), this.cleanup = lo(this.anchorEl, this.popup, () => {
				this.reposition();
			}));
		}
		async stop() {
			return new Promise((e) => {
				this.popup?.hidePopover?.(), this.cleanup ? (this.cleanup(), this.cleanup = void 0, this.removeAttribute("data-current-placement"), this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height"), requestAnimationFrame(() => e())) : e();
			});
		}
		reposition() {
			if (!this.active || !this.anchorEl || !this.popup) return;
			let e = [ho({
				mainAxis: this.distance,
				crossAxis: this.skidding
			})];
			this.sync ? e.push(vo({ apply: ({ rects: e }) => {
				let t = this.sync === "width" || this.sync === "both", n = this.sync === "height" || this.sync === "both";
				this.popup.style.width = t ? `${e.reference.width}px` : "", this.popup.style.height = n ? `${e.reference.height}px` : "";
			} })) : (this.popup.style.width = "", this.popup.style.height = "");
			let t;
			this.SUPPORTS_POPOVER && !Eo(this.anchor) && this.boundary === "scroll" && (t = ja(this.anchorEl).filter((e) => e instanceof Element)), this.flip && e.push(_o({
				boundary: this.flipBoundary || t,
				fallbackPlacements: this.flipFallbackPlacements,
				fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
				padding: this.flipPadding
			})), this.shift && e.push(go({
				boundary: this.shiftBoundary || t,
				padding: this.shiftPadding
			})), this.autoSize ? e.push(vo({
				boundary: this.autoSizeBoundary || t,
				padding: this.autoSizePadding,
				apply: ({ availableWidth: e, availableHeight: t }) => {
					this.autoSize === "vertical" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-height", `${t}px`) : this.style.removeProperty("--auto-size-available-height"), this.autoSize === "horizontal" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-width", `${e}px`) : this.style.removeProperty("--auto-size-available-width");
				}
			})) : (this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height")), this.arrow && e.push(yo({
				element: this.arrowEl,
				padding: this.arrowPadding
			}));
			let n = this.SUPPORTS_POPOVER ? (e) => mo.getOffsetParent(e, So) : mo.getOffsetParent;
			bo(this.anchorEl, this.popup, {
				placement: this.placement,
				middleware: e,
				strategy: this.SUPPORTS_POPOVER ? "absolute" : "fixed",
				platform: {
					...mo,
					getOffsetParent: n
				}
			}).then(({ x: e, y: t, middlewareData: n, placement: r }) => {
				let i = this.localize.dir() === "rtl", a = {
					top: "bottom",
					right: "left",
					bottom: "top",
					left: "right"
				}[r.split("-")[0]];
				if (this.setAttribute("data-current-placement", r), Object.assign(this.popup.style, {
					left: `${e}px`,
					top: `${t}px`
				}), this.arrow) {
					let e = n.arrow.x, t = n.arrow.y, r = "", o = "", s = "", c = "";
					if (this.arrowPlacement === "start") {
						let n = typeof e == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
						r = typeof t == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "", o = i ? n : "", c = i ? "" : n;
					} else if (this.arrowPlacement === "end") {
						let n = typeof e == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
						o = i ? "" : n, c = i ? n : "", s = typeof t == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
					} else this.arrowPlacement === "center" ? (c = typeof e == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "", r = typeof t == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "") : (c = typeof e == "number" ? `${e}px` : "", r = typeof t == "number" ? `${t}px` : "");
					Object.assign(this.arrowEl.style, {
						top: r,
						right: o,
						bottom: s,
						left: c,
						[a]: "calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"
					});
				}
			}), requestAnimationFrame(() => this.updateHoverBridge()), this.dispatchEvent(new Di());
		}
		render() {
			return E`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${An({
				"popup-hover-bridge": !0,
				"popup-hover-bridge-visible": this.hoverBridge && this.active
			})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${An({
				popup: !0,
				"popup-active": this.active,
				"popup-fixed": !this.SUPPORTS_POPOVER,
				"popup-has-arrow": this.arrow
			})}
      >
        <slot></slot>
        ${this.arrow ? E`<div part="arrow" class="arrow" role="presentation"></div>` : ""}
      </div>
    `;
		}
	}, Q.css = ki, F([M(".popup")], Q.prototype, "popup", 2), F([M(".arrow")], Q.prototype, "arrowEl", 2), F([j({
		attribute: !1,
		type: Boolean
	})], Q.prototype, "SUPPORTS_POPOVER", 2), F([j()], Q.prototype, "anchor", 2), F([j({
		type: Boolean,
		reflect: !0
	})], Q.prototype, "active", 2), F([j({ reflect: !0 })], Q.prototype, "placement", 2), F([j()], Q.prototype, "boundary", 2), F([j({ type: Number })], Q.prototype, "distance", 2), F([j({ type: Number })], Q.prototype, "skidding", 2), F([j({ type: Boolean })], Q.prototype, "arrow", 2), F([j({ attribute: "arrow-placement" })], Q.prototype, "arrowPlacement", 2), F([j({
		attribute: "arrow-padding",
		type: Number
	})], Q.prototype, "arrowPadding", 2), F([j({ type: Boolean })], Q.prototype, "flip", 2), F([j({
		attribute: "flip-fallback-placements",
		converter: {
			fromAttribute: (e) => e.split(" ").map((e) => e.trim()).filter((e) => e !== ""),
			toAttribute: (e) => e.join(" ")
		}
	})], Q.prototype, "flipFallbackPlacements", 2), F([j({ attribute: "flip-fallback-strategy" })], Q.prototype, "flipFallbackStrategy", 2), F([j({ type: Object })], Q.prototype, "flipBoundary", 2), F([j({
		attribute: "flip-padding",
		type: Number
	})], Q.prototype, "flipPadding", 2), F([j({ type: Boolean })], Q.prototype, "shift", 2), F([j({ type: Object })], Q.prototype, "shiftBoundary", 2), F([j({
		attribute: "shift-padding",
		type: Number
	})], Q.prototype, "shiftPadding", 2), F([j({ attribute: "auto-size" })], Q.prototype, "autoSize", 2), F([j()], Q.prototype, "sync", 2), F([j({ type: Object })], Q.prototype, "autoSizeBoundary", 2), F([j({
		attribute: "auto-size-padding",
		type: Number
	})], Q.prototype, "autoSizePadding", 2), F([j({
		attribute: "hover-bridge",
		type: Boolean
	})], Q.prototype, "hoverBridge", 2), Q = F([Je("wa-popup")], Q);
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.52WA2DJO.js
function ko(e) {
	Mo.push(e);
}
function Ao(e) {
	for (let t = Mo.length - 1; t >= 0; t--) if (Mo[t] === e) {
		Mo.splice(t, 1);
		break;
	}
}
function jo(e) {
	return Mo.length > 0 && Mo[Mo.length - 1] === e;
}
var Mo, No = t((() => {
	Mo = [];
}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.F25QOBDY.js
function Po(e, t) {
	return new Promise((n) => {
		function r(i) {
			i.target === e && (e.removeEventListener(t, r), n());
		}
		e.addEventListener(t, r);
	});
}
var Fo = t((() => {}));
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js
function Io(e, t) {
	return new Promise((n) => {
		let r = new AbortController(), { signal: i } = r;
		if (e.classList.contains(t)) return;
		e.classList.add(t);
		let a = !1, o = () => {
			a || (a = !0, e.classList.remove(t), n(), r.abort());
		};
		e.addEventListener("animationend", o, {
			once: !0,
			signal: i
		}), e.addEventListener("animationcancel", o, {
			once: !0,
			signal: i
		}), requestAnimationFrame(() => {
			!a && e.getAnimations().length === 0 && o();
		});
	});
}
var Lo = t((() => {})), $, Ro = t((() => {
	vi(), bi(), Si(), wi(), Ei(), Oo(), No(), li(), Fo(), Lo(), un(), R(), I(), A(), N(), Mn(), $ = class extends L {
		constructor() {
			super(...arguments), this.placement = "top", this.disabled = !1, this.distance = 8, this.open = !1, this.skidding = 0, this.showDelay = 150, this.hideDelay = 0, this.trigger = "hover focus", this.withoutArrow = !1, this.for = null, this.anchor = null, this.eventController = new AbortController(), this.handleBlur = () => {
				this.hasTrigger("focus") && this.hide();
			}, this.handleClick = () => {
				this.hasTrigger("click") && (this.open ? this.hide() : this.show());
			}, this.handleFocus = () => {
				this.hasTrigger("focus") && this.show();
			}, this.handleDocumentKeyDown = (e) => {
				e.key === "Escape" && this.open && jo(this) && (e.preventDefault(), e.stopPropagation(), this.hide());
			}, this.handleMouseOver = () => {
				this.hasTrigger("hover") && (clearTimeout(this.hoverTimeout), this.hoverTimeout = window.setTimeout(() => this.show(), this.showDelay));
			}, this.handleMouseOut = (e) => {
				if (this.hasTrigger("hover")) {
					let t = e.relatedTarget, n = !!(t && this.anchor?.contains(t)), r = !!(t && this.contains(t));
					if (n || r) return;
					clearTimeout(this.hoverTimeout), this.hoverTimeout = window.setTimeout(() => {
						this.hide();
					}, this.hideDelay);
				}
			};
		}
		connectedCallback() {
			super.connectedCallback(), typeof document < "u" && (this.eventController.signal.aborted && (this.eventController = new AbortController()), this.addEventListener("mouseout", this.handleMouseOut), this.open && (this.open = !1, this.updateComplete.then(() => {
				this.open = !0;
			})), this.id ||= ci("wa-tooltip-"), this.for && this.anchor ? (this.anchor = null, this.handleForChange()) : this.for && this.handleForChange());
		}
		disconnectedCallback() {
			super.disconnectedCallback(), document.removeEventListener("keydown", this.handleDocumentKeyDown), Ao(this), this.eventController.abort(), this.anchor && this.removeFromAriaLabelledBy(this.anchor, this.id);
		}
		firstUpdated() {
			this.body.hidden = !this.open, this.open && (this.popup.active = !0, this.popup.reposition());
		}
		hasTrigger(e) {
			return this.trigger.split(" ").includes(e);
		}
		addToAriaLabelledBy(e, t) {
			let n = (e.getAttribute("aria-labelledby") || "").split(/\s+/).filter(Boolean);
			n.includes(t) || (n.push(t), e.setAttribute("aria-labelledby", n.join(" ")));
		}
		removeFromAriaLabelledBy(e, t) {
			let n = (e.getAttribute("aria-labelledby") || "").split(/\s+/).filter(Boolean).filter((e) => e !== t);
			n.length > 0 ? e.setAttribute("aria-labelledby", n.join(" ")) : e.removeAttribute("aria-labelledby");
		}
		async handleOpenChange() {
			if (this.open) {
				if (this.disabled) return;
				let e = new yi();
				if (this.dispatchEvent(e), e.defaultPrevented) {
					this.open = !1;
					return;
				}
				document.addEventListener("keydown", this.handleDocumentKeyDown, { signal: this.eventController.signal }), ko(this), this.body.hidden = !1, this.popup.active = !0, await Io(this.popup.popup, "show-with-scale"), this.popup.reposition(), this.dispatchEvent(new Ti());
			} else {
				let e = new xi();
				if (this.dispatchEvent(e), e.defaultPrevented) {
					this.open = !1;
					return;
				}
				document.removeEventListener("keydown", this.handleDocumentKeyDown), Ao(this), await Io(this.popup.popup, "hide-with-scale"), this.popup.active = !1, this.body.hidden = !0, this.dispatchEvent(new Ci());
			}
		}
		handleForChange() {
			let e = this.getRootNode?.();
			if (!e) return;
			let t = this.for ? e.getElementById?.(this.for) : null, n = this.anchor;
			if (t === n) return;
			let { signal: r } = this.eventController;
			t && (this.addToAriaLabelledBy(t, this.id), t.addEventListener("blur", this.handleBlur, {
				capture: !0,
				signal: r
			}), t.addEventListener("focus", this.handleFocus, {
				capture: !0,
				signal: r
			}), t.addEventListener("click", this.handleClick, { signal: r }), t.addEventListener("mouseover", this.handleMouseOver, { signal: r }), t.addEventListener("mouseout", this.handleMouseOut, { signal: r })), n && (this.removeFromAriaLabelledBy(n, this.id), n.removeEventListener("blur", this.handleBlur, { capture: !0 }), n.removeEventListener("focus", this.handleFocus, { capture: !0 }), n.removeEventListener("click", this.handleClick), n.removeEventListener("mouseover", this.handleMouseOver), n.removeEventListener("mouseout", this.handleMouseOut)), this.anchor = t;
		}
		async handleOptionsChange() {
			this.hasUpdated && (await this.updateComplete, this.popup.reposition());
		}
		handleDisabledChange() {
			this.disabled && this.open && this.hide();
		}
		async show() {
			if (!this.open) return this.open = !0, Po(this, "wa-after-show");
		}
		async hide() {
			if (this.open) return this.open = !1, Po(this, "wa-after-hide");
		}
		render() {
			return E`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${An({
				tooltip: !0,
				"tooltip-open": this.open
			})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `;
		}
	}, $.css = _i, $.dependencies = { "wa-popup": Q }, F([M("slot:not([name])")], $.prototype, "defaultSlot", 2), F([M(".body")], $.prototype, "body", 2), F([M("wa-popup")], $.prototype, "popup", 2), F([j()], $.prototype, "placement", 2), F([j({
		type: Boolean,
		reflect: !0
	})], $.prototype, "disabled", 2), F([j({ type: Number })], $.prototype, "distance", 2), F([j({
		type: Boolean,
		reflect: !0
	})], $.prototype, "open", 2), F([j({ type: Number })], $.prototype, "skidding", 2), F([j({
		attribute: "show-delay",
		type: Number
	})], $.prototype, "showDelay", 2), F([j({
		attribute: "hide-delay",
		type: Number
	})], $.prototype, "hideDelay", 2), F([j()], $.prototype, "trigger", 2), F([j({
		attribute: "without-arrow",
		type: Boolean,
		reflect: !0
	})], $.prototype, "withoutArrow", 2), F([j()], $.prototype, "for", 2), F([$e()], $.prototype, "anchor", 2), F([B("open", { waitUntilFirstUpdate: !0 })], $.prototype, "handleOpenChange", 1), F([B("for")], $.prototype, "handleForChange", 1), F([B([
		"distance",
		"placement",
		"skidding"
	])], $.prototype, "handleOptionsChange", 1), F([B("disabled")], $.prototype, "handleDisabledChange", 1), $ = F([Je("wa-tooltip")], $);
})), zo = /* @__PURE__ */ n({ default: () => K }), Bo = t((() => {
	gi(), qr(), Ro(), vi(), ti(), Oo(), Ai(), ri(), Xt(), an(), R(), Tn(), Cn();
}));
//#endregion
//#region src/webawesome.ts
if (!document.head.querySelector("style[data-web-awesome]")) {
	let e = document.createElement("style");
	e.dataset.webAwesome = "true", e.textContent = Mt, document.head.appendChild(e);
}
var Vo = window;
Vo.dcpWebAwesomeReady ??= (async () => {
	customElements.get("wa-button") || await Promise.resolve().then(() => (Nr(), Mr)), customElements.get("wa-button-group") || await Promise.resolve().then(() => (Br(), zr)), customElements.get("wa-card") || await Promise.resolve().then(() => (Gr(), Wr)), customElements.get("wa-slider") || await Promise.resolve().then(() => (Bo(), zo));
})(), A(), N();
var Ho = class extends k {
	constructor(...e) {
		super(...e), this.narrow = !1;
	}
	getAlbumArt(e) {
		return e.spotify_name && (this.hass?.states[e.spotify_name])?.attributes.entity_picture || "";
	}
	render() {
		if (!this.hass || !this.panel) return E``;
		let { config: e } = this.panel, t = this.getAlbumArt(e);
		return E`
      ${t ? E`
          <div class="album-backdrop" aria-hidden="true">
            <img src=${t} alt="" />
          </div>
        ` : ""}
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
			ut,
			lt,
			l`
      :host {
        position: relative;
        isolation: isolate;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: var(--dcp-background);
      }

      .album-backdrop {
        position: absolute;
        z-index: 0;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        background: var(--dcp-background);
      }

      .album-backdrop::after {
        position: absolute;
        z-index: 1;
        content: "";
        inset: 0;
        background: linear-gradient(
          90deg,
          rgba(4, 9, 13, 0.4),
          rgba(4, 9, 13, 0.64)
        );
      }

      .album-backdrop img {
        position: absolute;
        width: 120%;
        height: 120%;
        top: -10%;
        left: -10%;
        object-fit: cover;
        filter: blur(56px) saturate(1.65) brightness(0.82);
        transform: scale(1.08);
      }

      .app-shell {
        position: relative;
        z-index: 1;
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
P([j({ type: Object })], Ho.prototype, "hass", void 0), P([j({ type: Boolean })], Ho.prototype, "narrow", void 0), P([j({ type: Object })], Ho.prototype, "panel", void 0), customElements.get("desktop-control") || customElements.define("desktop-control", Ho);
//#endregion
export { Ho as default };

//# sourceMappingURL=desktop-control-panel.js.map