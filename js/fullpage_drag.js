/*!
 * fullpage.js Drag And Move Extension 0.0.1
 * https://github.com/alvarotrigo/fullPage.js
 *
 * This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distrubute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
! function (n) {
    window.fp_dragAndMoveExtension = function () {
        function o() {
            b.isAnimating && (r(), e(), h()), window.requestAnimFrame(o)
        }

        function t() {
            "fingersonly" !== S.dragAndMove && n(window).on("mousedown MouseDownHandler", f)
        }

        function e() {
            return en ? (ln || (ln = Y), I = ln < Y ? "up" : ln > Y ? "down" : "none", ln = Y) : (un || (un = z), I = un < z ? "left" : un > z ? "right" : "none", un = z), I
        }

        function r() {
            a(), l();
            var n = en ? U : W;
            !b.isGrabbing && n < 0 && A.scrollHandler(), en ? (_ *= N, U += _) : (J *= N, W += J), b.isGrabbing || tn || i(n)
        }

        function i(n) {
            var o = en ? U : W;
            Math.round(100 * o) == Math.round(100 * n) && Q++, Q > 2 && (b.isAnimating = !1)
        }

        function a() {
            var n, o;
            en ? (n = A.getDestinationPosition(X), o = U) : X.length && (n = X.position().left, o = W);
            var t = X.length ? n * -1 - o : 0,
                e = t * K;
            s(e)
        }

        function s(n) {
            en ? _ += n : J += n
        }

        function l() {
            if (b.isGrabbing) {
                var n, o;
                en ? (n = Z - U, o = n - _) : (n = $ - W, o = n - J), s(o)
            }
        }

        function u(o) {
            n(window).off("mousemove MouseMoveHandler", g), n(window).off("mouseup", u);
            var t = en ? n(window).height() : n(window).width(),
                e = I === V;
            if ((rn < 30 || rn < t / 2 && !e) && (X = en ? n(H) : n(H).find(q)), !en && X && b.isGrabbing) {
                var r = L.find(E);
                r.length && A.landscapeScroll(r, X, V)
            }
            if (b.isGrabbing = !1, tn = !1, ln = 0, un = 0, !j)
                if (en) {
                    var i = {
                        up: n(H).prev().length ? X.next() : n(H),
                        down: n(H).next().length ? X.prev() : n(H)
                    };
                    "none" !== V && i[V].find(F).length && A.silentLandscapeScroll(i[V].find(q), "internal")
                } else A.silentScroll(A.getDestinationPosition(n(H)))
        }

        function c(o) {
            var t = o.originalEvent;
            if (Q = 0, tn = !0, O = (new Date).getTime(), A.isReallyTouch(t)) {
                var e = A.getEventsPage(t);
                an = e.y, sn = e.x, nn = b.getCurrentScroll(), on = b.getCurrentScrollSlides(t);
                var r = A.getMSPointer();
                n(window).on("touchmove " + r.move, g), n(window).on("touchend", u)
            }
        }

        function f(o) {
            j = Q, Q = 0, tn = !0, O = (new Date).getTime(), an = d(o, "y"), sn = d(o, "x"), nn = b.getCurrentScroll(), on = b.getCurrentScrollSlides(o), g(o), n(window).on("mousemove MouseMoveHandler", g), n(window).on("mouseup", u)
        }

        function d(n, o) {
            var t = "x" === o;
            if (A.isTouch && A.isReallyTouch(n)) {
                var e = A.getEventsPage(n);
                return t ? e.x : e.y
            }
            return t ? n.pageX : S.scrollBar || !S.autoScrolling ? n.screenY : n.pageY
        }

        function g(o) {
            var t, e, r = o.originalEvent;
            e = d(r, "x"), t = d(r, "y");
            var i = t - an,
                a = e - sn;
            if (!(Math.abs(i) < 5 && Math.abs(a) < 5 || Math.abs(i) < 5 && Math.abs(i) > Math.abs(a) || Math.abs(a) < 5 && Math.abs(a) > Math.abs(i))) {
                tn && (b.isGrabbing || (en = Math.abs(i) > Math.abs(a), A.removeAnimation(n(y)), A.removeAnimation(L.find(R))), b.isGrabbing = !0);
                var s = {
                    up: n(H).prev(),
                    down: n(H).next(),
                    left: n(r.target).closest(G).find(q).prev(),
                    right: n(r.target).closest(G).find(q).next(),
                    none: n(H)
                };
                b.isGrabbing && (U = b.getCurrentScroll(), W = b.getCurrentScrollSlides(r), z = e, Y = t, V = w(e, t), X = s[V], X = v(X, V), b.isAnimating = !0, n("#log").html(V)), Z = nn + i, $ = on + a, r.preventDefault()
            }
        }

        function w(n, o) {
            var t = en ? an : sn,
                e = en ? o : n;
            return rn = Math.abs(t - e), t > e ? en ? "down" : "right" : t < e ? en ? "up" : "left" : "none"
        }

        function v(o, t) {
            return o.length ? o : en ? n(H) : L.find(q)
        }

        function h() {
            var o = en ? n(y) : L.find(R);
            if (S.css3 && (!en || en && S.autoScrolling && !S.scrollBar)) {
                var t = en ? "translate3d(0px, " + Math.round(U) + "px, 0px)" : "translate3d(" + Math.round(W) + "px, 0px, 0px)";
                o.css(A.getTransforms(t))
            } else S.autoScrolling && !S.scrollBar ? o.css("top", Math.round(U)) : en ? n(window).scrollTop(Math.round(-U)) : o.closest(E).scrollLeft(-1 * Math.round(W))
        }

        function p() {
            var o = ["continuousHorizontal", "continuousVertical"];
            n.each(o, function (n, o) {
                S[o] && (S[o] = !1, m("error", "The option `" + o + "` is not compatible with `dragAndDrop`; `" + o + "` desactivated."))
            }), S.scrollOverflow && m("warn", "The option `scrollOverflow` is not fully compatible with `dragAndDrop`; Scrolling sections/slides will not work when dragging")
        }

        function m(n, o) {
            console && console[n] && console[n]("fullPage: " + o)
        }
        var b = this,
            M = n.fn.fullpage.getFullpageData(),
            S = M.options,
            A = M.internals,
            x = "fullpage-wrapper",
            y = "." + x,
            T = "active",
            D = "." + T,
            C = "fp-section",
            G = "." + C,
            H = G + D,
            P = "fp-slide",
            F = "." + P,
            q = F + D,
            B = "fp-slides",
            E = "." + B,
            k = "fp-slidesContainer",
            R = "." + k;
        b.isGrabbing = !1, b.isAnimating = !1;
        var I, L, O, z, Y, j, Q = 0,
            V = null,
            X = null,
            _ = 0,
            J = 0,
            K = .05,
            N = .7,
            U = 0,
            W = 0,
            Z = 0,
            $ = 0,
            nn = 0,
            on = 0,
            tn = !1,
            en = !1,
            rn = 0;
        window.requestAnimFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (n) {
                window.setTimeout(n, 1e3 / 60)
            }
        }(), b.init = function (n) {
            return S.fitToSection = !1, p(), t(), o(), b
        }, b.turnOffTouch = function () {
            var o = A.getMSPointer();
            n(y).off("touchstart " + o.down).off("touchmove " + o.move).on("touchstart " + o.down, c)
        };
        var an, sn, ln = 0,
            un = 0;
        b.getCurrentScroll = function () {
            if (!S.css3 || !S.autoScrolling || S.scrollBar) return S.autoScrolling && !S.scrollBar ? parseInt(n(y).css("top")) : -n(window).scrollTop();
            var o = n(y).css("transform");
            return o = "undefined" == typeof o ? n(y).css("-webkit-transform") : o, "undefined" != typeof o ? parseInt(o.split(",")[5]) : void 0
        }, b.getCurrentScrollSlides = function (o) {
            var t = n(o.target).closest(G);
            L = t.length ? t : L, "undefined" == typeof L && (L = n(H));
            var e = L.find(E);
            if (e.length) {
                var r = e.find(R);
                if (!S.css3) return -e.scrollLeft();
                var i = r.css("transform");
                if (i = "undefined" == typeof i ? n(y).css("-webkit-transform") : i, "undefined" != typeof i) return "none" === i ? 0 : parseInt(i.split(",")[4])
            }
            return 0
        }, b.getDocumentHeight = function () {
            var o = 0,
                t = n(G).length;
            return n(G).each(function (e) {
                e !== t && (o += n(this).height())
            }), o
        }, b.destroy = function () {
            var o = A.getMSPointer();
            n(y).off("touchstart " + o.down).off("touchmove " + o.move).off("touchend"), n(window).off("mousedown MouseDownHandler").off("mousemove MouseMoveHandler").off("mouseup")
        };
        var cn;
        b.isScrollingDown = function () {
            return !en && cn ? cn : cn = "down" === V
        }, b.c = A.c;
        var fn = b["common".charAt(0)];
        return "complete" === document.readyState && fn("dragAndMove"), n(window).on("load", function () {
            fn("dragAndMove")
        }), b
    }
}(jQuery);
/*!
 * fullPage 2.9.2 - Extensions 0.0.6
 * https://github.com/alvarotrigo/fullPage.js
 * @license http://alvarotrigo.com/fullPage/extensions/#license
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
! function (e, n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function (t) {
        return n(t, e, e.document, e.Math)
    }) : "object" == typeof exports && exports ? module.exports = n(require("jquery"), e, e.document, e.Math) : n(jQuery, e, e.document, e.Math)
}("undefined" != typeof window ? window : this, function (e, n, t, o, i) {
    "use strict";
    var r = "fullpage-wrapper",
        a = "." + r,
        l = "fp-scrollable",
        s = "." + l,
        c = "fp-responsive",
        d = "fp-notransition",
        f = "fp-destroyed",
        u = "fp-enabled",
        h = "fp-viewing",
        p = "active",
        v = "." + p,
        g = "fp-completely",
        m = "." + g,
        S = ".section",
        w = "fp-section",
        y = "." + w,
        b = y + v,
        x = y + ":first",
        C = y + ":last",
        T = "fp-tableCell",
        I = "." + T,
        k = "fp-auto-height",
        A = "fp-normal-scroll",
        M = "fp-nav",
        O = "#" + M,
        L = "fp-tooltip",
        E = "." + L,
        H = "fp-show-active",
        z = ".slide",
        B = "fp-slide",
        R = "." + B,
        D = R + v,
        P = "fp-slides",
        V = "." + P,
        W = "fp-slidesContainer",
        F = "." + W,
        Z = "fp-table",
        Y = "fp-slidesNav",
        j = "." + Y,
        N = j + " a",
        U = "fp-controlArrow",
        G = "." + U,
        X = "fp-prev",
        q = "." + X,
        Q = U + " " + X,
        _ = G + q,
        K = "fp-next",
        J = "." + K,
        $ = U + " " + K,
        ee = G + J,
        ne = e(n),
        te = e(t),
        oe = {
            scrollbars: !0,
            mouseWheel: !0,
            hideScrollbars: !1,
            fadeScrollbars: !1,
            disableMouse: !0,
            interactiveScrollbars: !0
        };
    e.fn.fullpage = function (l) {
        function s(n, t) {
            n || at(0), pt("autoScrolling", n, t);
            var o = e(b);
            l.autoScrolling && !l.scrollBar ? (mt.css({
                overflow: "hidden",
                height: "100%"
            }), U(Wt.recordHistory, "internal"), kt.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), o.length && at(o.position().top)) : (mt.css({
                overflow: "visible",
                height: "initial"
            }), U(!1, "internal"), kt.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), o.length && mt.scrollTop(o.position().top))
        }

        function U(e, n) {
            pt("recordHistory", e, n)
        }

        function q(e, n) {
            "internal" !== n && l.fadingEffect && wt.fadingEffect && wt.fadingEffect.update(e), pt("scrollingSpeed", e, n)
        }

        function K(e, n) {
            pt("fitToSection", e, n)
        }

        function J(e) {
            l.lockAnchors = e
        }

        function re(e) {
            e ? (Jn(), $n()) : (Kn(), et())
        }

        function ae(n, t) {
            "undefined" != typeof t ? (t = t.replace(/ /g, "").split(","), e.each(t, function (e, t) {
                st(n, t, "m")
            })) : n ? (re(!0), nt()) : (re(!1), tt())
        }

        function le(n, t) {
            "undefined" != typeof t ? (t = t.replace(/ /g, "").split(","), e.each(t, function (e, t) {
                st(n, t, "k")
            })) : l.keyboardScrolling = n
        }

        function se() {
            var n = e(b).prev(y);
            n.length || !l.loopTop && !l.continuousVertical || (n = e(y).last()), n.length && Qe(n, null, !0)
        }

        function ce() {
            var n = e(b).next(y);
            n.length || !l.loopBottom && !l.continuousVertical || (n = e(y).first()), n.length && Qe(n, null, !1)
        }

        function de(e, n) {
            q(0, "internal"), fe(e, n), q(Wt.scrollingSpeed, "internal")
        }

        function fe(e, n) {
            var t = Zn(e);
            "undefined" != typeof n ? jn(e, n) : t.length > 0 && Qe(t)
        }

        function ue(e) {
            Ue("right", e)
        }

        function he(e) {
            Ue("left", e)
        }

        function pe(n) {
            if (!kt.hasClass(f)) {
                Mt = !0, At = ne.height(), e(y).each(function () {
                    var n = e(this).find(V),
                        t = e(this).find(R);
                    l.verticalCentered && e(this).find(I).css("height", Wn(e(this)) + "px"), e(this).css("height", Ce(e(this)) + "px"), l.scrollOverflow && (t.length ? t.each(function () {
                        Pn(e(this))
                    }) : Pn(e(this))), t.length > 1 && Tn(n, n.find(D))
                });
                var t = e(b),
                    o = t.index(y);
                o && de(o + 1), Mt = !1, e.isFunction(l.afterResize) && n && l.afterResize.call(kt), e.isFunction(l.afterReBuild) && !n && l.afterReBuild.call(kt)
            }
        }

        function ve(n) {
            var t = St.hasClass(c);
            n ? t || (s(!1, "internal"), K(!1, "internal"), e(O).hide(), St.addClass(c), e.isFunction(l.afterResponsive) && l.afterResponsive.call(kt, n), l.responsiveSlides && wt.responsiveSlides && wt.responsiveSlides.toSections()) : t && (s(Wt.autoScrolling, "internal"), K(Wt.autoScrolling, "internal"), e(O).show(), St.removeClass(c), e.isFunction(l.afterResponsive) && l.afterResponsive.call(kt, n), l.responsiveSlides && wt.responsiveSlides && wt.responsiveSlides.toSlides())
        }

        function ge() {
            return {
                options: l,
                internals: {
                    getDestinationPosition: qe,
                    isTouch: It,
                    c: dn,
                    getXmovement: Dn,
                    removeAnimation: En,
                    getTransforms: lt,
                    lazyLoad: nn,
                    addAnimation: Ln,
                    performHorizontalMove: kn,
                    landscapeScroll: Tn,
                    silentLandscapeScroll: rt,
                    keepSlidesPosition: Xe,
                    silentScroll: at,
                    styleSlides: xe,
                    scrollHandler: Be,
                    getSlidesDestiny: Ge,
                    getEventsPage: it,
                    getMSPointer: ot,
                    isReallyTouch: Ze,
                    checkParentForNormalScrollElement: Fe
                }
            }
        }

        function me() {
            l.css3 && (l.css3 = _n()), l.scrollBar = l.scrollBar || l.hybrid, ye(), be(), ae(!0), s(l.autoScrolling, "internal");
            var n = e(b).find(D);
            n.length && (0 !== e(b).index(y) || 0 === e(b).index(y) && 0 !== n.index()) && rt(n), On(), Qn(), "complete" === t.readyState && fn(), ne.on("load", fn)
        }

        function Se() {
            ne.on("scroll", Be).on("hashchange", un).blur(wn).resize(Mn), te.keydown(hn).keyup(vn).on("click touchstart", O + " a", yn).on("click touchstart", N, bn).on("click", E, pn), e(y).on("click touchstart", G, Sn), l.normalScrollElements && (te.on("mouseenter", l.normalScrollElements, function () {
                re(!1)
            }), te.on("mouseleave", l.normalScrollElements, function () {
                re(!0)
            }))
        }

        function we(e) {
            var t = "fp_" + e + "Extension";
            Ft[e] = l[e + "Key"], wt[e] = "undefined" != typeof n[t] ? new n[t] : null, wt[e] && wt[e].c(e)
        }

        function ye() {
            var n = kt.find(l.sectionSelector);
            l.anchors.length || (l.anchors = n.filter("[data-anchor]").map(function () {
                return e(this).data("anchor").toString()
            }).get()), l.navigationTooltips.length || (l.navigationTooltips = n.filter("[data-tooltip]").map(function () {
                return e(this).data("tooltip").toString()
            }).get())
        }

        function be() {
            kt.css({
                height: "100%",
                position: "relative"
            }), kt.addClass(r), e("html").addClass(u), At = ne.height(), kt.removeClass(f), ke(), e(y).each(function (n) {
                var t = e(this),
                    o = t.find(R),
                    i = o.length;
                Te(t, n), Ie(t, n), i > 0 ? xe(t, o, i) : l.verticalCentered && Vn(t)
            }), l.fixedElements && l.css3 && e(l.fixedElements).appendTo(St), l.navigation && Me(), Le(), l.fadingEffect && wt.fadingEffect && wt.fadingEffect.apply(), l.scrollOverflow ? ("complete" === t.readyState && Oe(), ne.on("load", Oe)) : ze()
        }

        function xe(n, t, o) {
            var i = 100 * o,
                r = 100 / o;
            t.wrapAll('<div class="' + W + '" />'), t.parent().wrap('<div class="' + P + '" />'), n.find(F).css("width", i + "%"), o > 1 && (l.controlArrows && Ae(n), l.slidesNavigation && Un(n, o)), t.each(function (n) {
                e(this).css("width", r + "%"), l.verticalCentered && Vn(e(this))
            });
            var a = n.find(D);
            a.length && (0 !== e(b).index(y) || 0 === e(b).index(y) && 0 !== a.index()) ? rt(a) : t.eq(0).addClass(p)
        }

        function Ce(e) {
            return l.offsetSections && wt.offsetSections ? wt.offsetSections.getWindowHeight(e) : At
        }

        function Te(n, t) {
            t || 0 !== e(b).length || n.addClass(p), n.css("height", Ce(n) + "px"), l.paddingTop && n.css("padding-top", l.paddingTop), l.paddingBottom && n.css("padding-bottom", l.paddingBottom), "undefined" != typeof l.sectionsColor[t] && n.css("background-color", l.sectionsColor[t]), "undefined" != typeof l.anchors[t] && n.attr("data-anchor", l.anchors[t])
        }

        function Ie(n, t) {
            "undefined" != typeof l.anchors[t] && n.hasClass(p) && Bn(l.anchors[t], t), l.menu && l.css3 && e(l.menu).closest(a).length && e(l.menu).appendTo(St)
        }

        function ke() {
            kt.find(l.sectionSelector).addClass(w), kt.find(l.slideSelector).addClass(B)
        }

        function Ae(e) {
            e.find(V).after('<div class="' + Q + '"></div><div class="' + $ + '"></div>'), "#fff" != l.controlArrowColor && (e.find(ee).css("border-color", "transparent transparent transparent " + l.controlArrowColor), e.find(_).css("border-color", "transparent " + l.controlArrowColor + " transparent transparent")), l.loopHorizontal || e.find(_).hide()
        }

        function Me() {
            St.append('<div id="' + M + '"><ul></ul></div>');
            var n = e(O);
            n.addClass(function () {
                return l.showActiveTooltip ? H + " " + l.navigationPosition : l.navigationPosition
            });
            for (var t = 0; t < e(y).length; t++) {
                var o = "";
                l.anchors.length && (o = l.anchors[t]);
                var i = '<li><a href="#' + o + '"><span></span></a>',
                    r = l.navigationTooltips[t];
                "undefined" != typeof r && "" !== r && (i += '<div class="' + L + " " + l.navigationPosition + '">' + r + "</div>"), i += "</li>", n.find("ul").append(i)
            }
            e(O).css("margin-top", "-" + e(O).height() / 2 + "px"), e(O).find("li").eq(e(b).index(y)).find("a").addClass(p)
        }

        function Oe() {
            e(y).each(function () {
                var n = e(this).find(R);
                n.length ? n.each(function () {
                    Pn(e(this))
                }) : Pn(e(this))
            }), ze()
        }

        function Le() {
            kt.find('iframe[src*="youtube.com/embed/"]').each(function () {
                Ee(e(this), "enablejsapi=1")
            })
        }

        function Ee(e, n) {
            var t = e.attr("src");
            e.attr("src", t + He(t) + n)
        }

        function He(e) {
            return /\?/.test(e) ? "&" : "?"
        }

        function ze() {
            var n = e(b);
            n.addClass(g), l.scrollOverflowHandler.afterRender && l.scrollOverflowHandler.afterRender(n), nn(n), tn(n), l.scrollOverflowHandler.afterLoad(), e.isFunction(l.afterLoad) && l.afterLoad.call(n, n.data("anchor"), n.index(y) + 1), e.isFunction(l.afterRender) && l.afterRender.call(kt)
        }

        function Be() {
            var n;
            if ((!l.autoScrolling || l.scrollBar || ft("dragAndMove")) && !ht()) {
                var i = ft("dragAndMove") ? o.abs(wt.dragAndMove.getCurrentScroll()) : ne.scrollTop(),
                    r = De(i),
                    a = 0,
                    s = i + ne.height() / 2,
                    c = ft("dragAndMove") ? wt.dragAndMove.getDocumentHeight() : St.height() - ne.height(),
                    d = c === i,
                    f = t.querySelectorAll(y);
                if (d) a = f.length - 1;
                else if (i)
                    for (var u = 0; u < f.length; ++u) {
                        var h = f[u];
                        h.offsetTop <= s && (a = u)
                    } else a = 0;
                if (Re(r) && (e(b).hasClass(g) || e(b).addClass(g).siblings().removeClass(g)), n = e(f).eq(a), !n.hasClass(p)) {
                    Zt = !0;
                    var v, m, S = e(b),
                        w = S.index(y) + 1,
                        x = Rn(n),
                        C = n.data("anchor"),
                        T = n.index(y) + 1,
                        I = n.find(D);
                    I.length && (m = I.data("anchor"), v = I.index()), Lt && (n.addClass(p).siblings().removeClass(p), e.isFunction(l.onLeave) && l.onLeave.call(S, w, T, x), e.isFunction(l.afterLoad) && l.afterLoad.call(n, C, T), rn(S), nn(n), tn(n), Bn(C, T - 1), l.anchors.length && (yt = C), Gn(v, m, C, T)), clearTimeout(Dt), Dt = setTimeout(function () {
                        Zt = !1
                    }, 100)
                }
                l.fitToSection && (clearTimeout(Pt), Pt = setTimeout(function () {
                    Lt && l.fitToSection && (e(b).is(n) && (Mt = !0), Qe(e(b)), Mt = !1)
                }, l.fitToSectionDelay))
            }
        }

        function Re(n) {
            var t = e(b).position().top,
                o = t + ne.height();
            return "up" == n ? o >= ne.scrollTop() + ne.height() : t <= ne.scrollTop()
        }

        function De(e) {
            var n = e > Yt ? "down" : "up";
            return Yt = e, qt = e, n
        }

        function Pe(e, n) {
            if (Ht.m[e]) {
                var t = "down" === e ? "bottom" : "top",
                    o = "down" === e ? ce : se;
                if (wt.scrollHorizontally && (o = wt.scrollHorizontally.getScrollSection(e, o)), n.length > 0) {
                    if (!l.scrollOverflowHandler.isScrolled(t, n)) return !0;
                    o()
                } else o()
            }
        }

        function Ve(e) {
            var n = e.originalEvent;
            !Fe(e.target) && l.autoScrolling && Ze(n) && e.preventDefault()
        }

        function We(n) {
            var t = n.originalEvent,
                i = e(t.target).closest(y);
            if (!Fe(n.target) && Ze(t)) {
                l.autoScrolling && n.preventDefault();
                var r = l.scrollOverflowHandler.scrollable(i),
                    a = it(t);
                Ut = a.y, Gt = a.x, i.find(V).length && o.abs(Nt - Gt) > o.abs(jt - Ut) ? !Ct && o.abs(Nt - Gt) > ne.outerWidth() / 100 * l.touchSensitivity && (Nt > Gt ? Ht.m.right && ue(i) : Ht.m.left && he(i)) : l.autoScrolling && Lt && o.abs(jt - Ut) > ne.height() / 100 * l.touchSensitivity && (jt > Ut ? Pe("down", r) : Ut > jt && Pe("up", r))
            }
        }

        function Fe(n, t) {
            t = t || 0;
            var o = e(n).parent();
            return t < l.normalScrollElementTouchThreshold && o.is(l.normalScrollElements) ? !0 : t == l.normalScrollElementTouchThreshold ? !1 : Fe(o, ++t)
        }

        function Ze(e) {
            return "undefined" == typeof e.pointerType || "mouse" != e.pointerType
        }

        function Ye(e) {
            var n = e.originalEvent;
            if (l.fitToSection && mt.stop(), Ze(n)) {
                var t = it(n);
                jt = t.y, Nt = t.x
            }
        }

        function je(e, n) {
            for (var t = 0, i = e.slice(o.max(e.length - n, 1)), r = 0; r < i.length; r++) t += i[r];
            return o.ceil(t / n)
        }

        function Ne(t) {
            var i = (new Date).getTime(),
                r = e(m).hasClass(A);
            if (l.autoScrolling && !xt && !r) {
                t = t || n.event;
                var a = t.wheelDelta || -t.deltaY || -t.detail,
                    s = o.max(-1, o.min(1, a)),
                    c = "undefined" != typeof t.wheelDeltaX || "undefined" != typeof t.deltaX,
                    d = o.abs(t.wheelDeltaX) < o.abs(t.wheelDelta) || o.abs(t.deltaX) < o.abs(t.deltaY) || !c;
                Et.length > 149 && Et.shift(), Et.push(o.abs(a)), l.scrollBar && (t.preventDefault ? t.preventDefault() : t.returnValue = !1);
                var f = e(b),
                    u = l.scrollOverflowHandler.scrollable(f),
                    h = i - Xt;
                if (Xt = i, h > 200 && (Et = []), Lt && !ut()) {
                    var p = je(Et, 10),
                        v = je(Et, 70),
                        g = p >= v;
                    g && d && (0 > s ? Pe("down", u) : Pe("up", u))
                }
                return !1
            }
            l.fitToSection && mt.stop()
        }

        function Ue(n, t) {
            var o = "undefined" == typeof t ? e(b) : t,
                i = o.find(V);
            if (!(!i.length || ut() || Ct || i.find(R).length < 2)) {
                var r = Ge(n, i);
                Ct = !0, Tn(i, r, n)
            }
        }

        function Ge(e, n) {
            var t = (n.find(R).length, n.find(D)),
                o = null;
            if (o = "left" === e ? t.prev(R) : t.next(R), !o.length) {
                if (!l.loopHorizontal) return;
                o = "left" === e ? t.siblings(":last") : t.siblings(":first")
            }
            return o
        }

        function Xe() {
            e(D).each(function () {
                rt(e(this), "internal")
            })
        }

        function qe(e) {
            var n = e.position(),
                t = n.top,
                o = ft("dragAndMove") ? wt.dragAndMove.isScrollingDown() : n.top > qt,
                i = t - At + e.outerHeight(),
                r = l.bigSectionsDestination;
            return e.outerHeight() > At ? (!o && !r || "bottom" === r) && (t = i) : (o || Mt && e.is(":last-child")) && (t = i), l.offsetSections && wt.offsetSections && (t = wt.offsetSections.getSectionPosition(o, t, e)), qt = t, t
        }

        function Qe(n, t, o) {
            if ("undefined" != typeof n && n.length) {
                var i, r, a = qe(n),
                    s = {
                        element: n,
                        callback: t,
                        isMovementUp: o,
                        dtop: a,
                        yMovement: Rn(n),
                        anchorLink: n.data("anchor"),
                        sectionIndex: n.index(y),
                        activeSlide: n.find(D),
                        activeSection: e(b),
                        leavingSection: e(b).index(y) + 1,
                        localIsResizing: Mt
                    };
                s.activeSection.is(n) && !Mt || l.scrollBar && ne.scrollTop() === s.dtop && !n.hasClass(k) || (s.activeSlide.length && (i = s.activeSlide.data("anchor"), r = s.activeSlide.index()), l.autoScrolling && l.continuousVertical && "undefined" != typeof s.isMovementUp && (!s.isMovementUp && "up" == s.yMovement || s.isMovementUp && "down" == s.yMovement) && (s = Je(s)), (!e.isFunction(l.onLeave) || s.localIsResizing || l.onLeave.call(s.activeSection, s.leavingSection, s.sectionIndex + 1, s.yMovement) !== !1) && (ft("scrollOverflowReset") && wt.scrollOverflowReset.setPrevious(s.activeSection), rn(s.activeSection), l.scrollOverflowHandler.beforeLeave(), n.addClass(p).siblings().removeClass(p), nn(n), l.scrollOverflowHandler.onLeave(), Lt = !1, Gn(r, i, s.anchorLink, s.sectionIndex), _e(s), yt = s.anchorLink, Bn(s.anchorLink, s.sectionIndex)))
            }
        }

        function _e(n) {
            if (l.css3 && l.autoScrolling && !l.scrollBar) {
                var t = "translate3d(0px, -" + o.round(n.dtop) + "px, 0px)";
                Fn(t, !0), l.scrollingSpeed ? (clearTimeout(Bt), Bt = setTimeout(function () {
                    en(n)
                }, l.scrollingSpeed)) : en(n)
            } else {
                var i = Ke(n);
                e(i.element).animate(i.options, l.scrollingSpeed, l.easing).promise().done(function () {
                    l.scrollBar ? setTimeout(function () {
                        en(n)
                    }, 30) : en(n)
                })
            }
        }

        function Ke(e) {
            var n = {};
            return l.autoScrolling && !l.scrollBar ? (n.options = {
                top: -e.dtop
            }, n.element = a) : (n.options = {
                scrollTop: e.dtop
            }, n.element = "html, body"), n
        }

        function Je(n) {
            return n.isMovementUp ? e(b).before(n.activeSection.nextAll(y)) : e(b).after(n.activeSection.prevAll(y).get().reverse()), at(e(b).position().top), Xe(), n.wrapAroundElements = n.activeSection, n.dtop = n.element.position().top, n.yMovement = Rn(n.element), n
        }

        function $e(n) {
            n.wrapAroundElements && n.wrapAroundElements.length && (n.isMovementUp ? e(x).before(n.wrapAroundElements) : e(C).after(n.wrapAroundElements), at(e(b).position().top), Xe())
        }

        function en(n) {
            $e(n), e.isFunction(l.afterLoad) && !n.localIsResizing && l.afterLoad.call(n.element, n.anchorLink, n.sectionIndex + 1), l.scrollOverflowHandler.afterLoad(), ft("scrollOverflowReset") && wt.scrollOverflowReset.reset(), l.resetSliders && wt.resetSliders && wt.resetSliders.apply(n), n.localIsResizing || tn(n.element), n.element.addClass(g).siblings().removeClass(g), Lt = !0, e.isFunction(n.callback) && n.callback.call(this)
        }

        function nn(n) {
            if (l.lazyLoading) {
                var t, o = an(n);
                o.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function () {
                    t = e(this), t.attr("src", t.data("src")), t.removeAttr("data-src"), t.is("source") && t.closest("video").get(0).load()
                })
            }
        }

        function tn(n) {
            var t = an(n);
            t.find("video, audio").each(function () {
                var n = e(this).get(0);
                n.hasAttribute("data-autoplay") && "function" == typeof n.play && n.play()
            }), t.find('iframe[src*="youtube.com/embed/"]').each(function () {
                var n = e(this).get(0);
                n.hasAttribute("data-autoplay") && on(n), n.onload = function () {
                    n.hasAttribute("data-autoplay") && on(n)
                }
            })
        }

        function on(e) {
            e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }

        function rn(n) {
            var t = an(n);
            t.find("video, audio").each(function () {
                var n = e(this).get(0);
                n.hasAttribute("data-keepplaying") || "function" != typeof n.pause || n.pause()
            }), t.find('iframe[src*="youtube.com/embed/"]').each(function () {
                var n = e(this).get(0);
                /youtube\.com\/embed\//.test(e(this).attr("src")) && !n.hasAttribute("data-keepplaying") && e(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
            })
        }

        function an(n) {
            var t = n.find(D);
            return t.length && (n = e(t)), n
        }

        function ln(e) {
            function n(e) {
                var n, o, i, r, l, s, c, d = "",
                    f = 0;
                for (e = e.replace(/[^A-Za-z0-9+\/=]/g, ""); f < e.length;) r = a.indexOf(e.charAt(f++)), l = a.indexOf(e.charAt(f++)), s = a.indexOf(e.charAt(f++)), c = a.indexOf(e.charAt(f++)), n = r << 2 | l >> 4, o = (15 & l) << 4 | s >> 2, i = (3 & s) << 6 | c, d += String.fromCharCode(n), 64 != s && (d += String.fromCharCode(o)), 64 != c && (d += String.fromCharCode(i));
                return d = t(d)
            }

            function t(e) {
                for (var n, t = "", o = 0, i = 0, r = 0; o < e.length;) i = e.charCodeAt(o), 128 > i ? (t += String.fromCharCode(i), o++) : i > 191 && 224 > i ? (r = e.charCodeAt(o + 1), t += String.fromCharCode((31 & i) << 6 | 63 & r), o += 2) : (r = e.charCodeAt(o + 1), n = e.charCodeAt(o + 2), t += String.fromCharCode((15 & i) << 12 | (63 & r) << 6 | 63 & n), o += 3);
                return t
            }

            function o(e) {
                return e
            }

            function i(e) {
                return e.slice(3).slice(0, -3)
            }

            function r(e) {
                var t = e.split("_");
                if (t.length > 1) {
                    var o = t[1],
                        r = e.replace(i(t[1]), "").split("_")[0],
                        a = r;
                    return a + "_" + n(o.slice(3).slice(0, -3))
                }
                return i(e)
            }
            var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            return o(r(n(e)))
        }

        function sn() {
            if (t.domain.length) {
                var e = t.domain.replace(/^(www\.)/, "").split("."),
                    n = (e.shift(), e.join("."));
                return n.replace(/(^\.*)|(\.*$)/g, "")
            }
            return ""
        }

        function cn(e) {
            var n = sn(),
                t = ["localhost", "127.0.0.1", "jshell.net", "UDdDQU5ZNlNN"],
                o = t[0],
                i = t[1],
                r = t[2],
                a = ln(t[3]),
                l = [o, i, r].indexOf(n) < 0 && 0 !== n.length,
                s = "undefined" != typeof Ft[e] && Ft[e].length;
            if (!s && l) return !1;
            var c = s ? ln(Ft[e]) : "";
            c = c.split("_");
            var d = c.length > 1 && c[1].indexOf(e, c[1].length - e.length) > -1,
                f = c[0].indexOf(n, c[0].length - n.length) < 0;
            return !(f && l && a != c[0]) && d || !l
        }

        function dn(e) {
            if (!cn(e)) {
                var n = function () {
                    "9999999" !== St.find("div").first().css("z-index") && St.prepend(ln("MTIzPGRpdiBzdHlsZT0iei1pbmRleDo5OTk5OTk5O3Bvc2l0aW9uOmZpeGVkOyB0b3A6IDIwcHg7IGxlZnQ6MjBweDsgYmFja2dyb3VuZDpyZWQ7IHBhZGRpbmc6IDdweCAxNXB4OyBmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiBhcmlhbDsgY29sb3I6ICNmZmY7IGRpc3BsYXk6IGlubGluZS1ibG9jazsiPjxhIGhyZWY9Imh0dHA6Ly9hbHZhcm90cmlnby5jb20vZnVsbFBhZ2UvZXh0ZW5zaW9ucy8iIHN0eWxlPSJjb2xvcjogI2ZmZjsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7Ij5VbmxpY2Vuc2VkIGZ1bGxQYWdlLmpzIEV4dGVuc2lvbjwvYT48L2Rpdj4xMjM="))
                };
                n(), setInterval(n, 2e3)
            }
        }

        function fn() {
            var e = n.location.hash.replace("#", "").split("/"),
                t = decodeURIComponent(e[0]),
                o = decodeURIComponent(e[1]);
            t && (l.animateAnchor ? jn(t, o) : de(t, o))
        }

        function un() {
            if (!Zt && !l.lockAnchors) {
                var e = n.location.hash.replace("#", "").split("/"),
                    t = decodeURIComponent(e[0]),
                    o = decodeURIComponent(e[1]),
                    i = "undefined" == typeof yt,
                    r = "undefined" == typeof yt && "undefined" == typeof o && !Ct;
                t.length && (t && t !== yt && !i || r || !Ct && bt != o) && jn(t, o)
            }
        }

        function hn(n) {
            clearTimeout(Vt);
            var t = e(":focus");
            if (!t.is("textarea") && !t.is("input") && !t.is("select") && "true" !== t.attr("contentEditable") && "" !== t.attr("contentEditable") && l.keyboardScrolling && l.autoScrolling) {
                var o = n.which,
                    i = [40, 38, 32, 33, 34];
                e.inArray(o, i) > -1 && n.preventDefault(), xt = n.ctrlKey, Vt = setTimeout(function () {
                    xn(n)
                }, 150)
            }
        }

        function pn() {
            e(this).prev().trigger("click")
        }

        function vn(e) {
            Ot && (xt = e.ctrlKey)
        }

        function gn(e) {
            2 == e.which && (Qt = e.pageY, kt.on("mousemove", Cn))
        }

        function mn(e) {
            2 == e.which && kt.off("mousemove")
        }

        function Sn() {
            var n = e(this).closest(y);
            e(this).hasClass(X) ? Ht.m.left && he(n) : Ht.m.right && ue(n)
        }

        function wn() {
            Ot = !1, xt = !1
        }

        function yn(n) {
            n.preventDefault();
            var t = e(this).parent().index();
            Qe(e(y).eq(t))
        }

        function bn(n) {
            n.preventDefault();
            var t = e(this).closest(y).find(V),
                o = t.find(R).eq(e(this).closest("li").index());
            Tn(t, o)
        }

        function xn(n) {
            var t = n.shiftKey;
            if (Lt || !([37, 39].indexOf(n.which) < 0)) switch (n.which) {
                case 38:
                case 33:
                    Ht.k.up && se();
                    break;
                case 32:
                    if (t && Ht.k.up) {
                        se();
                        break
                    }
                    case 40:
                    case 34:
                        Ht.k.down && ce();
                        break;
                    case 36:
                        Ht.k.up && fe(1);
                        break;
                    case 35:
                        Ht.k.down && fe(e(y).length);
                        break;
                    case 37:
                        Ht.k.left && he();
                        break;
                    case 39:
                        Ht.k.right && ue();
                        break;
                    default:
                        return
            }
        }

        function Cn(e) {
            Lt && (e.pageY < Qt && Ht.m.up ? se() : e.pageY > Qt && Ht.m.down && ce()), Qt = e.pageY
        }

        function Tn(n, t, o) {
            var i = n.closest(y),
                r = {
                    slides: n,
                    destiny: t,
                    direction: o,
                    destinyPos: t.position(),
                    slideIndex: t.index(),
                    section: i,
                    sectionIndex: i.index(y),
                    anchorLink: i.data("anchor"),
                    slidesNav: i.find(j),
                    slideAnchor: qn(t),
                    prevSlide: i.find(D),
                    prevSlideIndex: i.find(D).index(),
                    localIsResizing: Mt
                };
            return r.xMovement = Dn(r.prevSlideIndex, r.slideIndex), r.localIsResizing || (Lt = !1), l.onSlideLeave && !r.localIsResizing && "none" !== r.xMovement && e.isFunction(l.onSlideLeave) && l.onSlideLeave.call(r.prevSlide, r.anchorLink, r.sectionIndex + 1, r.prevSlideIndex, r.xMovement, r.slideIndex) === !1 ? void(Ct = !1) : (t.addClass(p).siblings().removeClass(p), r.localIsResizing || (rn(r.prevSlide), nn(t)), !l.loopHorizontal && l.controlArrows && (i.find(_).toggle(0 !== r.slideIndex), i.find(ee).toggle(!t.is(":last-child"))), i.hasClass(p) && Gn(r.slideIndex, r.slideAnchor, r.anchorLink, r.sectionIndex), wt.continuousHorizontal && wt.continuousHorizontal.apply(r), ht() ? In(r) : kn(n, r, !0), void(l.interlockedSlides && wt.interlockedSlides && wt.interlockedSlides.apply(r)))
        }

        function In(n) {
            wt.continuousHorizontal && wt.continuousHorizontal.afterSlideLoads(n), An(n.slidesNav, n.slideIndex), n.localIsResizing || (e.isFunction(l.afterSlideLoad) && l.afterSlideLoad.call(n.destiny, n.anchorLink, n.sectionIndex + 1, n.slideAnchor, n.slideIndex), Lt = !0, tn(n.destiny)), Ct = !1, wt.interlockedSlides && wt.interlockedSlides.apply(n)
        }

        function kn(e, n, t) {
            var i = n.destinyPos;
            if (l.css3) {
                var r = "translate3d(-" + o.round(i.left) + "px, 0px, 0px)";
                Ln(e.find(F)).css(lt(r)), Rt = setTimeout(function () {
                    t && In(n)
                }, l.scrollingSpeed, l.easing)
            } else e.animate({
                scrollLeft: o.round(i.left)
            }, l.scrollingSpeed, l.easing, function () {
                t && In(n)
            })
        }

        function An(e, n) {
            e.find(v).removeClass(p), e.find("li").eq(n).find("a").addClass(p)
        }

        function Mn() {
            if (On(), Tt) {
                var n = e(t.activeElement);
                if (!n.is("textarea") && !n.is("input") && !n.is("select")) {
                    var i = ne.height();
                    o.abs(i - _t) > 20 * o.max(_t, i) / 100 && (pe(!0), _t = i)
                }
            } else clearTimeout(zt), zt = setTimeout(function () {
                pe(!0)
            }, 350)
        }

        function On() {
            var e = l.responsive || l.responsiveWidth,
                n = l.responsiveHeight,
                t = e && ne.outerWidth() < e,
                o = n && ne.height() < n;
            e && n ? ve(t || o) : e ? ve(t) : n && ve(o)
        }

        function Ln(e) {
            var n = "all " + l.scrollingSpeed + "ms " + l.easingcss3;
            return e.removeClass(d), e.css({
                "-webkit-transition": n,
                transition: n
            })
        }

        function En(e) {
            return e.addClass(d)
        }

        function Hn(n, t) {
            l.navigation && (e(O).find(v).removeClass(p), n ? e(O).find('a[href="#' + n + '"]').addClass(p) : e(O).find("li").eq(t).find("a").addClass(p))
        }

        function zn(n) {
            l.menu && (e(l.menu).find(v).removeClass(p), e(l.menu).find('[data-menuanchor="' + n + '"]').addClass(p))
        }

        function Bn(e, n) {
            zn(e), Hn(e, n)
        }

        function Rn(n) {
            var t = e(b).index(y),
                o = n.index(y);
            return t == o ? "none" : t > o ? "up" : "down"
        }

        function Dn(e, n) {
            return e == n ? "none" : e > n ? "left" : "right"
        }

        function Pn(e) {
            if (!e.hasClass("fp-noscroll")) {
                e.css("overflow", "hidden");
                var n, t = l.scrollOverflowHandler,
                    o = t.wrapContent(),
                    i = e.closest(y),
                    r = t.scrollable(e);
                r.length ? n = t.scrollHeight(e) : (n = e.get(0).scrollHeight, l.verticalCentered && (n = e.find(I).get(0).scrollHeight));
                var a = At - parseInt(i.css("padding-bottom")) - parseInt(i.css("padding-top"));
                n > a ? r.length ? t.update(e, a) : (l.verticalCentered ? e.find(I).wrapInner(o) : e.wrapInner(o), t.create(e, a, l.scrollOverflowOptions)) : t.remove(e), e.css("overflow", "")
            }
        }

        function Vn(e) {
            e.hasClass(Z) || e.addClass(Z).wrapInner('<div class="' + T + '" style="height:' + Wn(e) + 'px;" />')
        }

        function Wn(e) {
            var n = Ce(e);
            if (l.paddingTop || l.paddingBottom) {
                var t = e;
                t.hasClass(w) || (t = e.closest(y));
                var o = parseInt(t.css("padding-top")) + parseInt(t.css("padding-bottom"));
                n = At - o
            }
            return n
        }

        function Fn(e, n) {
            n ? Ln(kt) : En(kt), kt.css(lt(e)), setTimeout(function () {
                kt.removeClass(d)
            }, 10)
        }

        function Zn(n) {
            var t = kt.find(y + '[data-anchor="' + n + '"]');
            return t.length || (t = e(y).eq(n - 1)), t
        }

        function Yn(e, n) {
            var t = n.find(V),
                o = t.find(R + '[data-anchor="' + e + '"]');
            return o.length || (o = t.find(R).eq(e)), o
        }

        function jn(e, n) {
            var t = Zn(e);
            t.length && ("undefined" == typeof n && (n = 0), e === yt || t.hasClass(p) ? Nn(t, n) : Qe(t, function () {
                Nn(t, n)
            }))
        }

        function Nn(e, n) {
            if ("undefined" != typeof n) {
                var t = e.find(V),
                    o = Yn(n, e);
                o.length && Tn(t, o)
            }
        }

        function Un(e, n) {
            e.append('<div class="' + Y + '"><ul></ul></div>');
            var t = e.find(j);
            t.addClass(l.slidesNavPosition);
            for (var o = 0; n > o; o++) t.find("ul").append('<li><a href="#"><span></span></a></li>');
            t.css("margin-left", "-" + t.width() / 2 + "px"), t.find("li").first().find("a").addClass(p)
        }

        function Gn(e, n, t, o) {
            var i = "";
            l.anchors.length && !l.lockAnchors && (e ? ("undefined" != typeof t && (i = t), "undefined" == typeof n && (n = e), bt = n, Xn(i + "/" + n)) : "undefined" != typeof e ? (bt = n, Xn(t)) : Xn(t)), Qn()
        }

        function Xn(e) {
            if (l.recordHistory) location.hash = e;
            else if (Tt || It) n.history.replaceState(i, i, "#" + e);
            else {
                var t = n.location.href.split("#")[0];
                n.location.replace(t + "#" + e)
            }
        }

        function qn(e) {
            var n = e.data("anchor"),
                t = e.index();
            return "undefined" == typeof n && (n = t), n
        }

        function Qn() {
            var n = e(b),
                t = n.find(D),
                o = qn(n),
                i = qn(t),
                r = String(o);
            t.length && (r = r + "-" + i), r = r.replace("/", "-").replace("#", "");
            var a = new RegExp("\\b\\s?" + h + "-[^\\s]+\\b", "g");
            St[0].className = St[0].className.replace(a, ""), St.addClass(h + "-" + r)
        }

        function _n() {
            var e, o = t.createElement("p"),
                r = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            t.body.insertBefore(o, null);
            for (var a in r) o.style[a] !== i && (o.style[a] = "translate3d(1px,1px,1px)", e = n.getComputedStyle(o).getPropertyValue(r[a]));
            return t.body.removeChild(o), e !== i && e.length > 0 && "none" !== e
        }

        function Kn() {
            t.addEventListener ? (t.removeEventListener("mousewheel", Ne, !1), t.removeEventListener("wheel", Ne, !1), t.removeEventListener("MozMousePixelScroll", Ne, !1)) : t.detachEvent("onmousewheel", Ne)
        }

        function Jn() {
            var e, o = "";
            n.addEventListener ? e = "addEventListener" : (e = "attachEvent", o = "on");
            var r = "onwheel" in t.createElement("div") ? "wheel" : t.onmousewheel !== i ? "mousewheel" : "DOMMouseScroll";
            "DOMMouseScroll" == r ? t[e](o + "MozMousePixelScroll", Ne, !1) : t[e](o + r, Ne, !1)
        }

        function $n() {
            kt.on("mousedown", gn).on("mouseup", mn)
        }

        function et() {
            kt.off("mousedown", gn).off("mouseup", mn)
        }

        function nt() {
            if (Tt || It) {
                var n = ot();
                l.autoScrolling && St.off("touchmove " + n.move).on("touchmove " + n.move, Ve), e(a).off("touchstart " + n.down).on("touchstart " + n.down, Ye).off("touchmove " + n.move).on("touchmove " + n.move, We)
            }
        }

        function tt() {
            if (Tt || It) {
                var n = ot();
                e(a).off("touchstart " + n.down).off("touchmove " + n.move)
            }
        }

        function ot() {
            var e;
            return e = n.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            }
        }

        function it(e) {
            var n = [];
            return n.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, n.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, It && Ze(e) && l.scrollBar && (n.y = e.touches[0].pageY, n.x = e.touches[0].pageX), n
        }

        function rt(e, n) {
            q(0, "internal"), "undefined" != typeof n && (Mt = !0), Tn(e.closest(V), e), "undefined" != typeof n && (Mt = !1), q(Wt.scrollingSpeed, "internal")
        }

        function at(e) {
            var n = o.round(e);
            if (l.css3 && l.autoScrolling && !l.scrollBar) {
                var t = "translate3d(0px, -" + n + "px, 0px)";
                Fn(t, !1)
            } else l.autoScrolling && !l.scrollBar ? kt.css("top", -n) : mt.scrollTop(n)
        }

        function lt(e) {
            return {
                "-webkit-transform": e,
                "-moz-transform": e,
                "-ms-transform": e,
                transform: e
            }
        }

        function st(e, n, t) {
            switch (n) {
                case "up":
                    Ht[t].up = e;
                    break;
                case "down":
                    Ht[t].down = e;
                    break;
                case "left":
                    Ht[t].left = e;
                    break;
                case "right":
                    Ht[t].right = e;
                    break;
                case "all":
                    "m" == t ? ae(e) : le(e)
            }
        }

        function ct(n) {
            s(!1, "internal"), ae(!1), le(!1), kt.addClass(f), clearTimeout(Rt), clearTimeout(Bt), clearTimeout(zt), clearTimeout(Dt), clearTimeout(Pt), ne.off("scroll", Be).off("hashchange", un).off("resize", Mn), te.off("click touchstart", O + " a").off("mouseenter", O + " li").off("mouseleave", O + " li").off("click touchstart", N).off("mouseover", l.normalScrollElements).off("mouseout", l.normalScrollElements), e(y).off("click touchstart", G), ft("dragAndMove") && wt.dragAndMove.destroy(), clearTimeout(Rt), clearTimeout(Bt), n && dt()
        }

        function dt() {
            at(0), kt.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function () {
                e(this).attr("src", e(this).data("src")), e(this).removeAttr("data-src")
            }), e(O + ", " + j + ", " + G).remove(), e(y).css({
                height: "",
                "background-color": "",
                padding: ""
            }), e(R).css({
                width: ""
            }), kt.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), mt.css({
                overflow: "",
                height: ""
            }), e("html").removeClass(u), St.removeClass(c), e.each(St.get(0).className.split(/\s+/), function (e, n) {
                0 === n.indexOf(h) && St.removeClass(n)
            }), e(y + ", " + R).each(function () {
                l.scrollOverflowHandler.remove(e(this)), e(this).removeClass(Z + " " + p)
            }), En(kt), kt.find(I + ", " + F + ", " + V).each(function () {
                e(this).replaceWith(this.childNodes)
            }), mt.scrollTop(0);
            var n = [w, B, W];
            e.each(n, function (n, t) {
                e("." + t).removeClass(t)
            })
        }

        function ft(e) {
            return l[e] && wt[e]
        }

        function ut() {
            return ft("dragAndMove") && wt.dragAndMove.isAnimating
        }

        function ht() {
            return ft("dragAndMove") && wt.dragAndMove.isGrabbing
        }

        function pt(e, n, t) {
            l[e] = n, "internal" !== t && (Wt[e] = n)
        }

        function vt() {
            return e("html").hasClass(u) ? void gt("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (l.continuousVertical && (l.loopTop || l.loopBottom) && (l.continuousVertical = !1, gt("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), l.scrollBar && l.scrollOverflow && gt("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !l.continuousVertical || !l.scrollBar && l.autoScrolling || (l.continuousVertical = !1, gt("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), void e.each(l.anchors, function (n, t) {
                var o = te.find("[name]").filter(function () {
                        return e(this).attr("name") && e(this).attr("name").toLowerCase() == t.toLowerCase()
                    }),
                    i = te.find("[id]").filter(function () {
                        return e(this).attr("id") && e(this).attr("id").toLowerCase() == t.toLowerCase()
                    });
                (i.length || o.length) && (gt("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), i.length && gt("error", '"' + t + '" is is being used by another element `id` property'), o.length && gt("error", '"' + t + '" is is being used by another element `name` property'))
            }))
        }

        function gt(e, n) {
            console && console[e] && console[e]("fullPage: " + n)
        }
        if (e("html").hasClass(u)) return void vt();
        var mt = e("html, body"),
            St = e("body"),
            wt = e.fn.fullpage;
        l = e.extend({
            menu: !1,
            anchors: [],
            lockAnchors: !1,
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            hybrid: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            fitToSectionDelay: 1e3,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            continuousHorizontal: !1,
            scrollHorizontally: !1,
            interlockedSlides: !1,
            dragAndMove: !1,
            offsetSections: !1,
            resetSliders: !1,
            fadingEffect: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            scrollOverflowReset: !1,
            scrollOverflowHandler: ie,
            scrollOverflowOptions: null,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            // 풀페이지 제거하고싶은 가로 픽셀값 설정
            responsiveWidth: 1224,
            // responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: !1,
            sectionSelector: S,
            slideSelector: z,
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null,
            afterResponsive: null,
            lazyLoading: !0
        }, l);
        var yt, bt, xt, Ct = !1,
            Tt = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            It = "ontouchstart" in n || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            kt = e(this),
            At = ne.height(),
            Mt = !1,
            Ot = !0,
            Lt = !0,
            Et = [],
            Ht = {};
        Ht.m = {
            up: !0,
            down: !0,
            left: !0,
            right: !0
        }, Ht.k = e.extend(!0, {}, Ht.m);
        var zt, Bt, Rt, Dt, Pt, Vt, Wt = e.extend(!0, {}, l),
            Ft = {};
        vt(), oe.click = It, l.scrollOverflowOptions = e.extend(oe, l.scrollOverflowOptions), e.extend(e.easing, {
            easeInOutCubic: function (e, n, t, o, i) {
                return (n /= i / 2) < 1 ? o / 2 * n * n * n + t : o / 2 * ((n -= 2) * n * n + 2) + t
            }
        }), e(this).length && (wt.setAutoScrolling = s, wt.setRecordHistory = U, wt.setScrollingSpeed = q, wt.setFitToSection = K, wt.setLockAnchors = J, wt.setMouseWheelScrolling = re, wt.setAllowScrolling = ae, wt.setKeyboardScrolling = le, wt.moveSectionUp = se, wt.moveSectionDown = ce, wt.silentMoveTo = de, wt.moveTo = fe, wt.moveSlideRight = ue, wt.moveSlideLeft = he, wt.reBuild = pe, wt.setResponsive = ve, wt.getFullpageData = ge, wt.destroy = ct, wt.landscapeScroll = Tn, we("continuousHorizontal"), we("scrollHorizontally"), we("resetSliders"), we("interlockedSlides"), we("responsiveSlides"), we("fadingEffect"), we("dragAndMove"), we("offsetSections"), we("scrollOverflowReset"), ft("dragAndMove") && wt.dragAndMove.init(), me(), Se(), ft("dragAndMove") && wt.dragAndMove.turnOffTouch());
        var Zt = !1,
            Yt = 0,
            jt = 0,
            Nt = 0,
            Ut = 0,
            Gt = 0,
            Xt = (new Date).getTime(),
            qt = 0,
            Qt = 0,
            _t = At
    }, "undefined" != typeof IScroll && (IScroll.prototype.wheelOn = function () {
        this.wrapper.addEventListener("wheel", this),
            this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
    }, IScroll.prototype.wheelOff = function () {
        this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
    });
    var ie = {
        refreshId: null,
        iScrollInstances: [],
        toggleWheel: function (n) {
            var t = e(b).find(s);
            t.each(function () {
                var t = e(this).data("iscrollInstance");
                "undefined" != typeof t && t && (n ? t.wheelOn() : t.wheelOff())
            })
        },
        onLeave: function () {
            ie.toggleWheel(!1)
        },
        beforeLeave: function () {
            ie.onLeave()
        },
        afterLoad: function () {
            ie.toggleWheel(!0)
        },
        create: function (n, t, o) {
            var i = n.find(s);
            i.height(t), i.each(function () {
                var n = e(this),
                    t = n.data("iscrollInstance");
                t && e.each(ie.iScrollInstances, function () {
                    e(this).destroy()
                }), t = new IScroll(n.get(0), o), t.on("scrollEnd", function () {
                    this.fp_isAtTop = this.y > -30, this.fp_isAtEnd = this.y - this.maxScrollY < 30
                }), ie.iScrollInstances.push(t), t.wheelOff(), n.data("iscrollInstance", t)
            })
        },
        isScrolled: function (e, n) {
            var t = n.data("iscrollInstance");
            return t ? "top" === e ? t.y >= 0 && !n.scrollTop() : "bottom" === e ? 0 - t.y + n.scrollTop() + 1 + n.innerHeight() >= n[0].scrollHeight : void 0 : !0
        },
        scrollable: function (e) {
            return e.find(V).length ? e.find(D).find(s) : e.find(s)
        },
        scrollHeight: function (e) {
            return e.find(s).children().first().get(0).scrollHeight
        },
        remove: function (e) {
            var n = e.find(s);
            if (n.length) {
                var t = n.data("iscrollInstance");
                t && t.destroy(), n.data("iscrollInstance", null)
            }
            e.find(s).children().first().children().first().unwrap().unwrap()
        },
        update: function (n, t) {
            clearTimeout(ie.refreshId), ie.refreshId = setTimeout(function () {
                e.each(ie.iScrollInstances, function () {
                    e(this).get(0).refresh()
                })
            }, 150), n.find(s).css("height", t + "px").parent().css("height", t + "px")
        },
        wrapContent: function () {
            return '<div class="' + l + '"><div class="fp-scroller"></div></div>'
        }
    }
});

$(document).ready(function () {
    $('#fullpage').fullpage({
        dragAndMove: true,
        navigation: true,
        // navigationTooltips: ['view1', 'view2', 'view3', 'view4'],
        anchors: ['view1', 'view2', 'view3', 'view4'],
        // sectionsColor: ['yellow', 'orange', '#aa55bb', '#00aaff'],
    });
});