!(function () {
  'use strict';
  function t() {}
  const e = (t) => t;
  function n(t) {
    return t();
  }
  function r() {
    return Object.create(null);
  }
  function i(t) {
    t.forEach(n);
  }
  function o(t) {
    return 'function' == typeof t;
  }
  function s(t, e) {
    return t != t
      ? e == e
      : t !== e || (t && 'object' == typeof t) || 'function' == typeof t;
  }
  function c(e, n, r) {
    e.$$.on_destroy.push(
      (function (e, ...n) {
        if (null == e) return t;
        const r = e.subscribe(...n);
        return r.unsubscribe ? () => r.unsubscribe() : r;
      })(n, r),
    );
  }
  function u(t, e, n, r) {
    if (t) {
      const i = l(t, e, n, r);
      return t[0](i);
    }
  }
  function l(t, e, n, r) {
    return t[1] && r
      ? (function (t, e) {
          for (const n in e) t[n] = e[n];
          return t;
        })(n.ctx.slice(), t[1](r(e)))
      : n.ctx;
  }
  function a(t, e, n, r, i, o, s) {
    const c = (function (t, e, n, r) {
      if (t[2] && r) {
        const i = t[2](r(n));
        if (void 0 === e.dirty) return i;
        if ('object' == typeof i) {
          const t = [],
            n = Math.max(e.dirty.length, i.length);
          for (let r = 0; r < n; r += 1) t[r] = e.dirty[r] | i[r];
          return t;
        }
        return e.dirty | i;
      }
      return e.dirty;
    })(e, r, i, o);
    if (c) {
      const i = l(e, n, r, s);
      t.p(i, c);
    }
  }
  const f = 'undefined' != typeof window;
  let p = f ? () => window.performance.now() : () => Date.now(),
    h = f ? (t) => requestAnimationFrame(t) : t;
  const d = new Set();
  function y(t) {
    d.forEach((e) => {
      e.c(t) || (d.delete(e), e.f());
    }),
      0 !== d.size && h(y);
  }
  function b(t, e) {
    t.appendChild(e);
  }
  function v(t, e, n) {
    t.insertBefore(e, n || null);
  }
  function m(t) {
    t.parentNode.removeChild(t);
  }
  function g(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
  }
  function w(t) {
    return document.createElement(t);
  }
  function _(t) {
    return document.createElementNS('http://www.w3.org/2000/svg', t);
  }
  function x(t) {
    return document.createTextNode(t);
  }
  function $() {
    return x(' ');
  }
  function S() {
    return x('');
  }
  function E(t, e, n, r) {
    return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
  }
  function P(t, e, n) {
    null == n
      ? t.removeAttribute(e)
      : t.getAttribute(e) !== n && t.setAttribute(e, n);
  }
  function k(t, e) {
    (e = '' + e), t.wholeText !== e && (t.data = e);
  }
  function O(t, e, n, r) {
    t.style.setProperty(e, n, r ? 'important' : '');
  }
  class T {
    constructor(t = null) {
      (this.a = t), (this.e = this.n = null);
    }
    m(t, e, n = null) {
      this.e || ((this.e = w(e.nodeName)), (this.t = e), this.h(t)), this.i(n);
    }
    h(t) {
      (this.e.innerHTML = t), (this.n = Array.from(this.e.childNodes));
    }
    i(t) {
      for (let e = 0; e < this.n.length; e += 1) v(this.t, this.n[e], t);
    }
    p(t) {
      this.d(), this.h(t), this.i(this.a);
    }
    d() {
      this.n.forEach(m);
    }
  }
  const C = new Set();
  let I,
    N = 0;
  function j(t, e, n, r, i, o, s, c = 0) {
    const u = 16.666 / r;
    let l = '{\n';
    for (let t = 0; t <= 1; t += u) {
      const r = e + (n - e) * o(t);
      l += 100 * t + `%{${s(r, 1 - r)}}\n`;
    }
    const a = l + `100% {${s(n, 1 - n)}}\n}`,
      f = `__svelte_${(function (t) {
        let e = 5381,
          n = t.length;
        for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
        return e >>> 0;
      })(a)}_${c}`,
      p = t.ownerDocument;
    C.add(p);
    const h =
        p.__svelte_stylesheet ||
        (p.__svelte_stylesheet = p.head.appendChild(w('style')).sheet),
      d = p.__svelte_rules || (p.__svelte_rules = {});
    d[f] ||
      ((d[f] = !0), h.insertRule(`@keyframes ${f} ${a}`, h.cssRules.length));
    const y = t.style.animation || '';
    return (
      (t.style.animation = `${
        y ? `${y}, ` : ''
      }${f} ${r}ms linear ${i}ms 1 both`),
      (N += 1),
      f
    );
  }
  function G(t, e) {
    const n = (t.style.animation || '').split(', '),
      r = n.filter(
        e ? (t) => t.indexOf(e) < 0 : (t) => -1 === t.indexOf('__svelte'),
      ),
      i = n.length - r.length;
    i &&
      ((t.style.animation = r.join(', ')),
      (N -= i),
      N ||
        h(() => {
          N ||
            (C.forEach((t) => {
              const e = t.__svelte_stylesheet;
              let n = e.cssRules.length;
              for (; n--; ) e.deleteRule(n);
              t.__svelte_rules = {};
            }),
            C.clear());
        }));
  }
  function A(t) {
    I = t;
  }
  const z = [],
    V = [],
    M = [],
    L = [],
    F = Promise.resolve();
  let Y = !1;
  function D(t) {
    M.push(t);
  }
  let R = !1;
  const B = new Set();
  function H() {
    if (!R) {
      R = !0;
      do {
        for (let t = 0; t < z.length; t += 1) {
          const e = z[t];
          A(e), U(e.$$);
        }
        for (A(null), z.length = 0; V.length; ) V.pop()();
        for (let t = 0; t < M.length; t += 1) {
          const e = M[t];
          B.has(e) || (B.add(e), e());
        }
        M.length = 0;
      } while (z.length);
      for (; L.length; ) L.pop()();
      (Y = !1), (R = !1), B.clear();
    }
  }
  function U(t) {
    if (null !== t.fragment) {
      t.update(), i(t.before_update);
      const e = t.dirty;
      (t.dirty = [-1]),
        t.fragment && t.fragment.p(t.ctx, e),
        t.after_update.forEach(D);
    }
  }
  let K;
  function q(t, e, n) {
    t.dispatchEvent(
      (function (t, e) {
        const n = document.createEvent('CustomEvent');
        return n.initCustomEvent(t, !1, !1, e), n;
      })(`${e ? 'intro' : 'outro'}${n}`),
    );
  }
  const W = new Set();
  let J;
  function Q() {
    J = { r: 0, c: [], p: J };
  }
  function X() {
    J.r || i(J.c), (J = J.p);
  }
  function Z(t, e) {
    t && t.i && (W.delete(t), t.i(e));
  }
  function tt(t, e, n, r) {
    if (t && t.o) {
      if (W.has(t)) return;
      W.add(t),
        J.c.push(() => {
          W.delete(t), r && (n && t.d(1), r());
        }),
        t.o(e);
    }
  }
  const et = { duration: 0 };
  function nt(n, r, s, c) {
    let u = r(n, s),
      l = c ? 0 : 1,
      a = null,
      f = null,
      b = null;
    function v() {
      b && G(n, b);
    }
    function m(t, e) {
      const n = t.b - l;
      return (
        (e *= Math.abs(n)),
        {
          a: l,
          b: t.b,
          d: n,
          duration: e,
          start: t.start,
          end: t.start + e,
          group: t.group,
        }
      );
    }
    function g(r) {
      const {
          delay: o = 0,
          duration: s = 300,
          easing: c = e,
          tick: g = t,
          css: w,
        } = u || et,
        _ = { start: p() + o, b: r };
      r || ((_.group = J), (J.r += 1)),
        a || f
          ? (f = _)
          : (w && (v(), (b = j(n, l, r, s, o, c, w))),
            r && g(0, 1),
            (a = m(_, s)),
            D(() => q(n, r, 'start')),
            (function (t) {
              let e;
              0 === d.size && h(y),
                new Promise((n) => {
                  d.add((e = { c: t, f: n }));
                });
            })((t) => {
              if (
                (f &&
                  t > f.start &&
                  ((a = m(f, s)),
                  (f = null),
                  q(n, a.b, 'start'),
                  w && (v(), (b = j(n, l, a.b, a.duration, 0, c, u.css)))),
                a)
              )
                if (t >= a.end)
                  g((l = a.b), 1 - l),
                    q(n, a.b, 'end'),
                    f || (a.b ? v() : --a.group.r || i(a.group.c)),
                    (a = null);
                else if (t >= a.start) {
                  const e = t - a.start;
                  (l = a.a + a.d * c(e / a.duration)), g(l, 1 - l);
                }
              return !(!a && !f);
            }));
    }
    return {
      run(t) {
        o(u)
          ? (K ||
              ((K = Promise.resolve()),
              K.then(() => {
                K = null;
              })),
            K).then(() => {
              (u = u()), g(t);
            })
          : g(t);
      },
      end() {
        v(), (a = f = null);
      },
    };
  }
  function rt(t) {
    t && t.c();
  }
  function it(t, e, r, s) {
    const { fragment: c, on_mount: u, on_destroy: l, after_update: a } = t.$$;
    c && c.m(e, r),
      s ||
        D(() => {
          const e = u.map(n).filter(o);
          l ? l.push(...e) : i(e), (t.$$.on_mount = []);
        }),
      a.forEach(D);
  }
  function ot(t, e) {
    const n = t.$$;
    null !== n.fragment &&
      (i(n.on_destroy),
      n.fragment && n.fragment.d(e),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function st(t, e) {
    -1 === t.$$.dirty[0] &&
      (z.push(t), Y || ((Y = !0), F.then(H)), t.$$.dirty.fill(0)),
      (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
  }
  function ct(e, n, o, s, c, u, l = [-1]) {
    const a = I;
    A(e);
    const f = (e.$$ = {
      fragment: null,
      ctx: null,
      props: u,
      update: t,
      not_equal: c,
      bound: r(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(a ? a.$$.context : []),
      callbacks: r(),
      dirty: l,
      skip_bound: !1,
    });
    let p = !1;
    if (
      ((f.ctx = o
        ? o(e, n.props || {}, (t, n, ...r) => {
            const i = r.length ? r[0] : n;
            return (
              f.ctx &&
                c(f.ctx[t], (f.ctx[t] = i)) &&
                (!f.skip_bound && f.bound[t] && f.bound[t](i), p && st(e, t)),
              n
            );
          })
        : []),
      f.update(),
      (p = !0),
      i(f.before_update),
      (f.fragment = !!s && s(f.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const t = (function (t) {
          return Array.from(t.childNodes);
        })(n.target);
        f.fragment && f.fragment.l(t), t.forEach(m);
      } else f.fragment && f.fragment.c();
      n.intro && Z(e.$$.fragment),
        it(e, n.target, n.anchor, n.customElement),
        H();
    }
    A(a);
  }
  class ut {
    $destroy() {
      ot(this, 1), (this.$destroy = t);
    }
    $on(t, e) {
      const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        n.push(e),
        () => {
          const t = n.indexOf(e);
          -1 !== t && n.splice(t, 1);
        }
      );
    }
    $set(t) {
      var e;
      this.$$set &&
        ((e = t), 0 !== Object.keys(e).length) &&
        ((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
    }
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */ var lt =
    function (t, e) {
      return (lt =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        })(t, e);
    };
  function at(t, e) {
    function n() {
      this.constructor = t;
    }
    lt(t, e),
      (t.prototype =
        null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
  }
  function ft(t) {
    return 'function' == typeof t;
  }
  var pt = !1,
    ht = {
      Promise: void 0,
      set useDeprecatedSynchronousErrorHandling(t) {
        t && new Error().stack;
        pt = t;
      },
      get useDeprecatedSynchronousErrorHandling() {
        return pt;
      },
    };
  function dt(t) {
    setTimeout(function () {
      throw t;
    }, 0);
  }
  var yt = {
      closed: !0,
      next: function (t) {},
      error: function (t) {
        if (ht.useDeprecatedSynchronousErrorHandling) throw t;
        dt(t);
      },
      complete: function () {},
    },
    bt = (function () {
      return (
        Array.isArray ||
        function (t) {
          return t && 'number' == typeof t.length;
        }
      );
    })();
  function vt(t) {
    return null !== t && 'object' == typeof t;
  }
  var mt = (function () {
      function t(t) {
        return (
          Error.call(this),
          (this.message = t
            ? t.length +
              ' errors occurred during unsubscription:\n' +
              t
                .map(function (t, e) {
                  return e + 1 + ') ' + t.toString();
                })
                .join('\n  ')
            : ''),
          (this.name = 'UnsubscriptionError'),
          (this.errors = t),
          this
        );
      }
      return (t.prototype = Object.create(Error.prototype)), t;
    })(),
    gt = (function () {
      function t(t) {
        (this.closed = !1),
          (this._parentOrParents = null),
          (this._subscriptions = null),
          t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
      }
      return (
        (t.prototype.unsubscribe = function () {
          var e;
          if (!this.closed) {
            var n = this,
              r = n._parentOrParents,
              i = n._ctorUnsubscribe,
              o = n._unsubscribe,
              s = n._subscriptions;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              r instanceof t)
            )
              r.remove(this);
            else if (null !== r)
              for (var c = 0; c < r.length; ++c) {
                r[c].remove(this);
              }
            if (ft(o)) {
              i && (this._unsubscribe = void 0);
              try {
                o.call(this);
              } catch (t) {
                e = t instanceof mt ? wt(t.errors) : [t];
              }
            }
            if (bt(s)) {
              c = -1;
              for (var u = s.length; ++c < u; ) {
                var l = s[c];
                if (vt(l))
                  try {
                    l.unsubscribe();
                  } catch (t) {
                    (e = e || []),
                      t instanceof mt
                        ? (e = e.concat(wt(t.errors)))
                        : e.push(t);
                  }
              }
            }
            if (e) throw new mt(e);
          }
        }),
        (t.prototype.add = function (e) {
          var n = e;
          if (!e) return t.EMPTY;
          switch (typeof e) {
            case 'function':
              n = new t(e);
            case 'object':
              if (n === this || n.closed || 'function' != typeof n.unsubscribe)
                return n;
              if (this.closed) return n.unsubscribe(), n;
              if (!(n instanceof t)) {
                var r = n;
                (n = new t())._subscriptions = [r];
              }
              break;
            default:
              throw new Error(
                'unrecognized teardown ' + e + ' added to Subscription.',
              );
          }
          var i = n._parentOrParents;
          if (null === i) n._parentOrParents = this;
          else if (i instanceof t) {
            if (i === this) return n;
            n._parentOrParents = [i, this];
          } else {
            if (-1 !== i.indexOf(this)) return n;
            i.push(this);
          }
          var o = this._subscriptions;
          return null === o ? (this._subscriptions = [n]) : o.push(n), n;
        }),
        (t.prototype.remove = function (t) {
          var e = this._subscriptions;
          if (e) {
            var n = e.indexOf(t);
            -1 !== n && e.splice(n, 1);
          }
        }),
        (t.EMPTY = (function (t) {
          return (t.closed = !0), t;
        })(new t())),
        t
      );
    })();
  function wt(t) {
    return t.reduce(function (t, e) {
      return t.concat(e instanceof mt ? e.errors : e);
    }, []);
  }
  var _t = (function () {
      return 'function' == typeof Symbol
        ? Symbol('rxSubscriber')
        : '@@rxSubscriber_' + Math.random();
    })(),
    xt = (function (t) {
      function e(n, r, i) {
        var o = t.call(this) || this;
        switch (
          ((o.syncErrorValue = null),
          (o.syncErrorThrown = !1),
          (o.syncErrorThrowable = !1),
          (o.isStopped = !1),
          arguments.length)
        ) {
          case 0:
            o.destination = yt;
            break;
          case 1:
            if (!n) {
              o.destination = yt;
              break;
            }
            if ('object' == typeof n) {
              n instanceof e
                ? ((o.syncErrorThrowable = n.syncErrorThrowable),
                  (o.destination = n),
                  n.add(o))
                : ((o.syncErrorThrowable = !0), (o.destination = new $t(o, n)));
              break;
            }
          default:
            (o.syncErrorThrowable = !0), (o.destination = new $t(o, n, r, i));
        }
        return o;
      }
      return (
        at(e, t),
        (e.prototype[_t] = function () {
          return this;
        }),
        (e.create = function (t, n, r) {
          var i = new e(t, n, r);
          return (i.syncErrorThrowable = !1), i;
        }),
        (e.prototype.next = function (t) {
          this.isStopped || this._next(t);
        }),
        (e.prototype.error = function (t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }),
        (e.prototype.complete = function () {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }),
        (e.prototype.unsubscribe = function () {
          this.closed ||
            ((this.isStopped = !0), t.prototype.unsubscribe.call(this));
        }),
        (e.prototype._next = function (t) {
          this.destination.next(t);
        }),
        (e.prototype._error = function (t) {
          this.destination.error(t), this.unsubscribe();
        }),
        (e.prototype._complete = function () {
          this.destination.complete(), this.unsubscribe();
        }),
        (e.prototype._unsubscribeAndRecycle = function () {
          var t = this._parentOrParents;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }),
        e
      );
    })(gt),
    $t = (function (t) {
      function e(e, n, r, i) {
        var o,
          s = t.call(this) || this;
        s._parentSubscriber = e;
        var c = s;
        return (
          ft(n)
            ? (o = n)
            : n &&
              ((o = n.next),
              (r = n.error),
              (i = n.complete),
              n !== yt &&
                (ft((c = Object.create(n)).unsubscribe) &&
                  s.add(c.unsubscribe.bind(c)),
                (c.unsubscribe = s.unsubscribe.bind(s)))),
          (s._context = c),
          (s._next = o),
          (s._error = r),
          (s._complete = i),
          s
        );
      }
      return (
        at(e, t),
        (e.prototype.next = function (t) {
          if (!this.isStopped && this._next) {
            var e = this._parentSubscriber;
            ht.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }),
        (e.prototype.error = function (t) {
          if (!this.isStopped) {
            var e = this._parentSubscriber,
              n = ht.useDeprecatedSynchronousErrorHandling;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : dt(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              dt(t);
            }
          }
        }),
        (e.prototype.complete = function () {
          var t = this;
          if (!this.isStopped) {
            var e = this._parentSubscriber;
            if (this._complete) {
              var n = function () {
                return t._complete.call(t._context);
              };
              ht.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, n), this.unsubscribe())
                : (this.__tryOrUnsub(n), this.unsubscribe());
            } else this.unsubscribe();
          }
        }),
        (e.prototype.__tryOrUnsub = function (t, e) {
          try {
            t.call(this._context, e);
          } catch (t) {
            if ((this.unsubscribe(), ht.useDeprecatedSynchronousErrorHandling))
              throw t;
            dt(t);
          }
        }),
        (e.prototype.__tryOrSetError = function (t, e, n) {
          if (!ht.useDeprecatedSynchronousErrorHandling)
            throw new Error('bad call');
          try {
            e.call(this._context, n);
          } catch (e) {
            return ht.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = e), (t.syncErrorThrown = !0), !0)
              : (dt(e), !0);
          }
          return !1;
        }),
        (e.prototype._unsubscribe = function () {
          var t = this._parentSubscriber;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }),
        e
      );
    })(xt);
  var St = (function () {
    return ('function' == typeof Symbol && Symbol.observable) || '@@observable';
  })();
  function Et(t) {
    return t;
  }
  function Pt(t) {
    return 0 === t.length
      ? Et
      : 1 === t.length
      ? t[0]
      : function (e) {
          return t.reduce(function (t, e) {
            return e(t);
          }, e);
        };
  }
  var kt = (function () {
    function t(t) {
      (this._isScalar = !1), t && (this._subscribe = t);
    }
    return (
      (t.prototype.lift = function (e) {
        var n = new t();
        return (n.source = this), (n.operator = e), n;
      }),
      (t.prototype.subscribe = function (t, e, n) {
        var r = this.operator,
          i = (function (t, e, n) {
            if (t) {
              if (t instanceof xt) return t;
              if (t[_t]) return t[_t]();
            }
            return t || e || n ? new xt(t, e, n) : new xt(yt);
          })(t, e, n);
        if (
          (r
            ? i.add(r.call(i, this.source))
            : i.add(
                this.source ||
                  (ht.useDeprecatedSynchronousErrorHandling &&
                    !i.syncErrorThrowable)
                  ? this._subscribe(i)
                  : this._trySubscribe(i),
              ),
          ht.useDeprecatedSynchronousErrorHandling &&
            i.syncErrorThrowable &&
            ((i.syncErrorThrowable = !1), i.syncErrorThrown))
        )
          throw i.syncErrorValue;
        return i;
      }),
      (t.prototype._trySubscribe = function (t) {
        try {
          return this._subscribe(t);
        } catch (e) {
          ht.useDeprecatedSynchronousErrorHandling &&
            ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
            !(function (t) {
              for (; t; ) {
                var e = t,
                  n = e.closed,
                  r = e.destination,
                  i = e.isStopped;
                if (n || i) return !1;
                t = r && r instanceof xt ? r : null;
              }
              return !0;
            })(t)
              ? console.warn(e)
              : t.error(e);
        }
      }),
      (t.prototype.forEach = function (t, e) {
        var n = this;
        return new (e = Ot(e))(function (e, r) {
          var i;
          i = n.subscribe(
            function (e) {
              try {
                t(e);
              } catch (t) {
                r(t), i && i.unsubscribe();
              }
            },
            r,
            e,
          );
        });
      }),
      (t.prototype._subscribe = function (t) {
        var e = this.source;
        return e && e.subscribe(t);
      }),
      (t.prototype[St] = function () {
        return this;
      }),
      (t.prototype.pipe = function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        return 0 === t.length ? this : Pt(t)(this);
      }),
      (t.prototype.toPromise = function (t) {
        var e = this;
        return new (t = Ot(t))(function (t, n) {
          var r;
          e.subscribe(
            function (t) {
              return (r = t);
            },
            function (t) {
              return n(t);
            },
            function () {
              return t(r);
            },
          );
        });
      }),
      (t.create = function (e) {
        return new t(e);
      }),
      t
    );
  })();
  function Ot(t) {
    if ((t || (t = Promise), !t)) throw new Error('no Promise impl found');
    return t;
  }
  var Tt = (function () {
      function t() {
        return (
          Error.call(this),
          (this.message = 'object unsubscribed'),
          (this.name = 'ObjectUnsubscribedError'),
          this
        );
      }
      return (t.prototype = Object.create(Error.prototype)), t;
    })(),
    Ct = (function (t) {
      function e(e, n) {
        var r = t.call(this) || this;
        return (r.subject = e), (r.subscriber = n), (r.closed = !1), r;
      }
      return (
        at(e, t),
        (e.prototype.unsubscribe = function () {
          if (!this.closed) {
            this.closed = !0;
            var t = this.subject,
              e = t.observers;
            if (
              ((this.subject = null),
              e && 0 !== e.length && !t.isStopped && !t.closed)
            ) {
              var n = e.indexOf(this.subscriber);
              -1 !== n && e.splice(n, 1);
            }
          }
        }),
        e
      );
    })(gt),
    It = (function (t) {
      function e(e) {
        var n = t.call(this, e) || this;
        return (n.destination = e), n;
      }
      return at(e, t), e;
    })(xt),
    Nt = (function (t) {
      function e() {
        var e = t.call(this) || this;
        return (
          (e.observers = []),
          (e.closed = !1),
          (e.isStopped = !1),
          (e.hasError = !1),
          (e.thrownError = null),
          e
        );
      }
      return (
        at(e, t),
        (e.prototype[_t] = function () {
          return new It(this);
        }),
        (e.prototype.lift = function (t) {
          var e = new jt(this, this);
          return (e.operator = t), e;
        }),
        (e.prototype.next = function (t) {
          if (this.closed) throw new Tt();
          if (!this.isStopped)
            for (
              var e = this.observers, n = e.length, r = e.slice(), i = 0;
              i < n;
              i++
            )
              r[i].next(t);
        }),
        (e.prototype.error = function (t) {
          if (this.closed) throw new Tt();
          (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
          for (
            var e = this.observers, n = e.length, r = e.slice(), i = 0;
            i < n;
            i++
          )
            r[i].error(t);
          this.observers.length = 0;
        }),
        (e.prototype.complete = function () {
          if (this.closed) throw new Tt();
          this.isStopped = !0;
          for (
            var t = this.observers, e = t.length, n = t.slice(), r = 0;
            r < e;
            r++
          )
            n[r].complete();
          this.observers.length = 0;
        }),
        (e.prototype.unsubscribe = function () {
          (this.isStopped = !0), (this.closed = !0), (this.observers = null);
        }),
        (e.prototype._trySubscribe = function (e) {
          if (this.closed) throw new Tt();
          return t.prototype._trySubscribe.call(this, e);
        }),
        (e.prototype._subscribe = function (t) {
          if (this.closed) throw new Tt();
          return this.hasError
            ? (t.error(this.thrownError), gt.EMPTY)
            : this.isStopped
            ? (t.complete(), gt.EMPTY)
            : (this.observers.push(t), new Ct(this, t));
        }),
        (e.prototype.asObservable = function () {
          var t = new kt();
          return (t.source = this), t;
        }),
        (e.create = function (t, e) {
          return new jt(t, e);
        }),
        e
      );
    })(kt),
    jt = (function (t) {
      function e(e, n) {
        var r = t.call(this) || this;
        return (r.destination = e), (r.source = n), r;
      }
      return (
        at(e, t),
        (e.prototype.next = function (t) {
          var e = this.destination;
          e && e.next && e.next(t);
        }),
        (e.prototype.error = function (t) {
          var e = this.destination;
          e && e.error && this.destination.error(t);
        }),
        (e.prototype.complete = function () {
          var t = this.destination;
          t && t.complete && this.destination.complete();
        }),
        (e.prototype._subscribe = function (t) {
          return this.source ? this.source.subscribe(t) : gt.EMPTY;
        }),
        e
      );
    })(Nt),
    Gt = (function (t) {
      function e(e) {
        var n = t.call(this) || this;
        return (n._value = e), n;
      }
      return (
        at(e, t),
        Object.defineProperty(e.prototype, 'value', {
          get: function () {
            return this.getValue();
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype._subscribe = function (e) {
          var n = t.prototype._subscribe.call(this, e);
          return n && !n.closed && e.next(this._value), n;
        }),
        (e.prototype.getValue = function () {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new Tt();
          return this._value;
        }),
        (e.prototype.next = function (e) {
          t.prototype.next.call(this, (this._value = e));
        }),
        e
      );
    })(Nt),
    At = (function (t) {
      function e(e, n) {
        var r = t.call(this, e, n) || this;
        return (r.scheduler = e), (r.work = n), (r.pending = !1), r;
      }
      return (
        at(e, t),
        (e.prototype.schedule = function (t, e) {
          if ((void 0 === e && (e = 0), this.closed)) return this;
          this.state = t;
          var n = this.id,
            r = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(r, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          );
        }),
        (e.prototype.requestAsyncId = function (t, e, n) {
          return void 0 === n && (n = 0), setInterval(t.flush.bind(t, this), n);
        }),
        (e.prototype.recycleAsyncId = function (t, e, n) {
          if (
            (void 0 === n && (n = 0),
            null !== n && this.delay === n && !1 === this.pending)
          )
            return e;
          clearInterval(e);
        }),
        (e.prototype.execute = function (t, e) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          var n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }),
        (e.prototype._execute = function (t, e) {
          var n = !1,
            r = void 0;
          try {
            this.work(t);
          } catch (t) {
            (n = !0), (r = (!!t && t) || new Error(t));
          }
          if (n) return this.unsubscribe(), r;
        }),
        (e.prototype._unsubscribe = function () {
          var t = this.id,
            e = this.scheduler,
            n = e.actions,
            r = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== r && n.splice(r, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }),
        e
      );
    })(
      (function (t) {
        function e(e, n) {
          return t.call(this) || this;
        }
        return (
          at(e, t),
          (e.prototype.schedule = function (t, e) {
            return this;
          }),
          e
        );
      })(gt),
    ),
    zt = (function () {
      function t(e, n) {
        void 0 === n && (n = t.now), (this.SchedulerAction = e), (this.now = n);
      }
      return (
        (t.prototype.schedule = function (t, e, n) {
          return (
            void 0 === e && (e = 0),
            new this.SchedulerAction(this, t).schedule(n, e)
          );
        }),
        (t.now = function () {
          return Date.now();
        }),
        t
      );
    })(),
    Vt = (function (t) {
      function e(n, r) {
        void 0 === r && (r = zt.now);
        var i =
          t.call(this, n, function () {
            return e.delegate && e.delegate !== i ? e.delegate.now() : r();
          }) || this;
        return (i.actions = []), (i.active = !1), (i.scheduled = void 0), i;
      }
      return (
        at(e, t),
        (e.prototype.schedule = function (n, r, i) {
          return (
            void 0 === r && (r = 0),
            e.delegate && e.delegate !== this
              ? e.delegate.schedule(n, r, i)
              : t.prototype.schedule.call(this, n, r, i)
          );
        }),
        (e.prototype.flush = function (t) {
          var e = this.actions;
          if (this.active) e.push(t);
          else {
            var n;
            this.active = !0;
            do {
              if ((n = t.execute(t.state, t.delay))) break;
            } while ((t = e.shift()));
            if (((this.active = !1), n)) {
              for (; (t = e.shift()); ) t.unsubscribe();
              throw n;
            }
          }
        }),
        e
      );
    })(zt),
    Mt = new kt(function (t) {
      return t.complete();
    });
  function Lt(t) {
    return t
      ? (function (t) {
          return new kt(function (e) {
            return t.schedule(function () {
              return e.complete();
            });
          });
        })(t)
      : Mt;
  }
  function Ft(t) {
    return t && 'function' == typeof t.schedule;
  }
  var Yt = function (t) {
    return function (e) {
      for (var n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
      e.complete();
    };
  };
  function Dt(t, e) {
    return new kt(function (n) {
      var r = new gt(),
        i = 0;
      return (
        r.add(
          e.schedule(function () {
            i !== t.length
              ? (n.next(t[i++]), n.closed || r.add(this.schedule()))
              : n.complete();
          }),
        ),
        r
      );
    });
  }
  function Rt(t, e) {
    return e ? Dt(t, e) : new kt(Yt(t));
  }
  function Bt() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    var n = t[t.length - 1];
    return Ft(n) ? (t.pop(), Dt(t, n)) : Rt(t);
  }
  var Ht = new Vt(At);
  function Ut(t, e) {
    return function (n) {
      if ('function' != typeof t)
        throw new TypeError(
          'argument is not a function. Are you looking for `mapTo()`?',
        );
      return n.lift(new Kt(t, e));
    };
  }
  var Kt = (function () {
      function t(t, e) {
        (this.project = t), (this.thisArg = e);
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new qt(t, this.project, this.thisArg));
        }),
        t
      );
    })(),
    qt = (function (t) {
      function e(e, n, r) {
        var i = t.call(this, e) || this;
        return (i.project = n), (i.count = 0), (i.thisArg = r || i), i;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          var e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(e);
        }),
        e
      );
    })(xt),
    Wt = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        at(e, t),
        (e.prototype.notifyNext = function (t, e, n, r, i) {
          this.destination.next(e);
        }),
        (e.prototype.notifyError = function (t, e) {
          this.destination.error(t);
        }),
        (e.prototype.notifyComplete = function (t) {
          this.destination.complete();
        }),
        e
      );
    })(xt),
    Jt = (function (t) {
      function e(e, n, r) {
        var i = t.call(this) || this;
        return (
          (i.parent = e),
          (i.outerValue = n),
          (i.outerIndex = r),
          (i.index = 0),
          i
        );
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this,
          );
        }),
        (e.prototype._error = function (t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }),
        (e.prototype._complete = function () {
          this.parent.notifyComplete(this), this.unsubscribe();
        }),
        e
      );
    })(xt);
  function Qt() {
    return 'function' == typeof Symbol && Symbol.iterator
      ? Symbol.iterator
      : '@@iterator';
  }
  var Xt = Qt(),
    Zt = function (t) {
      return t && 'number' == typeof t.length && 'function' != typeof t;
    };
  function te(t) {
    return (
      !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then
    );
  }
  var ee = function (t) {
    if (t && 'function' == typeof t[St])
      return (
        (n = t),
        function (t) {
          var e = n[St]();
          if ('function' != typeof e.subscribe)
            throw new TypeError(
              'Provided object does not correctly implement Symbol.observable',
            );
          return e.subscribe(t);
        }
      );
    if (Zt(t)) return Yt(t);
    if (te(t))
      return (function (t) {
        return function (e) {
          return (
            t
              .then(
                function (t) {
                  e.closed || (e.next(t), e.complete());
                },
                function (t) {
                  return e.error(t);
                },
              )
              .then(null, dt),
            e
          );
        };
      })(t);
    if (t && 'function' == typeof t[Xt])
      return (
        (e = t),
        function (t) {
          for (var n = e[Xt](); ; ) {
            var r = void 0;
            try {
              r = n.next();
            } catch (e) {
              return t.error(e), t;
            }
            if (r.done) {
              t.complete();
              break;
            }
            if ((t.next(r.value), t.closed)) break;
          }
          return (
            'function' == typeof n.return &&
              t.add(function () {
                n.return && n.return();
              }),
            t
          );
        }
      );
    var e,
      n,
      r = vt(t) ? 'an invalid object' : "'" + t + "'";
    throw new TypeError(
      'You provided ' +
        r +
        ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.',
    );
  };
  function ne(t, e, n, r, i) {
    if ((void 0 === i && (i = new Jt(t, n, r)), !i.closed))
      return e instanceof kt ? e.subscribe(i) : ee(e)(i);
  }
  function re(t, e) {
    if (null != t) {
      if (
        (function (t) {
          return t && 'function' == typeof t[St];
        })(t)
      )
        return (function (t, e) {
          return new kt(function (n) {
            var r = new gt();
            return (
              r.add(
                e.schedule(function () {
                  var i = t[St]();
                  r.add(
                    i.subscribe({
                      next: function (t) {
                        r.add(
                          e.schedule(function () {
                            return n.next(t);
                          }),
                        );
                      },
                      error: function (t) {
                        r.add(
                          e.schedule(function () {
                            return n.error(t);
                          }),
                        );
                      },
                      complete: function () {
                        r.add(
                          e.schedule(function () {
                            return n.complete();
                          }),
                        );
                      },
                    }),
                  );
                }),
              ),
              r
            );
          });
        })(t, e);
      if (te(t))
        return (function (t, e) {
          return new kt(function (n) {
            var r = new gt();
            return (
              r.add(
                e.schedule(function () {
                  return t.then(
                    function (t) {
                      r.add(
                        e.schedule(function () {
                          n.next(t),
                            r.add(
                              e.schedule(function () {
                                return n.complete();
                              }),
                            );
                        }),
                      );
                    },
                    function (t) {
                      r.add(
                        e.schedule(function () {
                          return n.error(t);
                        }),
                      );
                    },
                  );
                }),
              ),
              r
            );
          });
        })(t, e);
      if (Zt(t)) return Dt(t, e);
      if (
        (function (t) {
          return t && 'function' == typeof t[Xt];
        })(t) ||
        'string' == typeof t
      )
        return (function (t, e) {
          if (!t) throw new Error('Iterable cannot be null');
          return new kt(function (n) {
            var r,
              i = new gt();
            return (
              i.add(function () {
                r && 'function' == typeof r.return && r.return();
              }),
              i.add(
                e.schedule(function () {
                  (r = t[Xt]()),
                    i.add(
                      e.schedule(function () {
                        if (!n.closed) {
                          var t, e;
                          try {
                            var i = r.next();
                            (t = i.value), (e = i.done);
                          } catch (t) {
                            return void n.error(t);
                          }
                          e ? n.complete() : (n.next(t), this.schedule());
                        }
                      }),
                    );
                }),
              ),
              i
            );
          });
        })(t, e);
    }
    throw new TypeError(((null !== t && typeof t) || t) + ' is not observable');
  }
  function ie(t, e) {
    return e ? re(t, e) : t instanceof kt ? t : new kt(ee(t));
  }
  var oe = (function (t) {
      function e(e) {
        var n = t.call(this) || this;
        return (n.parent = e), n;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          this.parent.notifyNext(t);
        }),
        (e.prototype._error = function (t) {
          this.parent.notifyError(t), this.unsubscribe();
        }),
        (e.prototype._complete = function () {
          this.parent.notifyComplete(), this.unsubscribe();
        }),
        e
      );
    })(xt),
    se = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        at(e, t),
        (e.prototype.notifyNext = function (t) {
          this.destination.next(t);
        }),
        (e.prototype.notifyError = function (t) {
          this.destination.error(t);
        }),
        (e.prototype.notifyComplete = function () {
          this.destination.complete();
        }),
        e
      );
    })(xt);
  function ce(t, e) {
    if (!e.closed) return t instanceof kt ? t.subscribe(e) : ee(t)(e);
  }
  function ue(t, e, n) {
    return (
      void 0 === n && (n = Number.POSITIVE_INFINITY),
      'function' == typeof e
        ? function (r) {
            return r.pipe(
              ue(function (n, r) {
                return ie(t(n, r)).pipe(
                  Ut(function (t, i) {
                    return e(n, t, r, i);
                  }),
                );
              }, n),
            );
          }
        : ('number' == typeof e && (n = e),
          function (e) {
            return e.lift(new le(t, n));
          })
    );
  }
  var le = (function () {
      function t(t, e) {
        void 0 === e && (e = Number.POSITIVE_INFINITY),
          (this.project = t),
          (this.concurrent = e);
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new ae(t, this.project, this.concurrent));
        }),
        t
      );
    })(),
    ae = (function (t) {
      function e(e, n, r) {
        void 0 === r && (r = Number.POSITIVE_INFINITY);
        var i = t.call(this, e) || this;
        return (
          (i.project = n),
          (i.concurrent = r),
          (i.hasCompleted = !1),
          (i.buffer = []),
          (i.active = 0),
          (i.index = 0),
          i
        );
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }),
        (e.prototype._tryNext = function (t) {
          var e,
            n = this.index++;
          try {
            e = this.project(t, n);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.active++, this._innerSub(e);
        }),
        (e.prototype._innerSub = function (t) {
          var e = new oe(this),
            n = this.destination;
          n.add(e);
          var r = ce(t, e);
          r !== e && n.add(r);
        }),
        (e.prototype._complete = function () {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }),
        (e.prototype.notifyNext = function (t) {
          this.destination.next(t);
        }),
        (e.prototype.notifyComplete = function () {
          var t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }),
        e
      );
    })(se);
  function fe(t) {
    return void 0 === t && (t = Number.POSITIVE_INFINITY), ue(Et, t);
  }
  function pe(t) {
    return !bt(t) && t - parseFloat(t) + 1 >= 0;
  }
  function he(t, e) {
    return (
      void 0 === t && (t = 0),
      void 0 === e && (e = Ht),
      (!pe(t) || t < 0) && (t = 0),
      (e && 'function' == typeof e.schedule) || (e = Ht),
      new kt(function (n) {
        return (
          n.add(e.schedule(de, t, { subscriber: n, counter: 0, period: t })), n
        );
      })
    );
  }
  function de(t) {
    var e = t.subscriber,
      n = t.counter,
      r = t.period;
    e.next(n), this.schedule({ subscriber: e, counter: n + 1, period: r }, r);
  }
  function ye(t, e) {
    return function (n) {
      return n.lift(new be(t, e));
    };
  }
  var be = (function () {
      function t(t, e) {
        (this.predicate = t), (this.thisArg = e);
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new ve(t, this.predicate, this.thisArg));
        }),
        t
      );
    })(),
    ve = (function (t) {
      function e(e, n, r) {
        var i = t.call(this, e) || this;
        return (i.predicate = n), (i.thisArg = r), (i.count = 0), i;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          var e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (t) {
            return void this.destination.error(t);
          }
          e && this.destination.next(t);
        }),
        e
      );
    })(xt);
  function me(t) {
    var e = t.index,
      n = t.period,
      r = t.subscriber;
    if ((r.next(e), !r.closed)) {
      if (-1 === n) return r.complete();
      (t.index = e + 1), this.schedule(t, n);
    }
  }
  var ge = (function () {
      function t(t) {
        this.closingSelector = t;
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new we(t, this.closingSelector));
        }),
        t
      );
    })(),
    we = (function (t) {
      function e(e, n) {
        var r = t.call(this, e) || this;
        return (r.closingSelector = n), (r.subscribing = !1), r.openBuffer(), r;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          this.buffer.push(t);
        }),
        (e.prototype._complete = function () {
          var e = this.buffer;
          e && this.destination.next(e), t.prototype._complete.call(this);
        }),
        (e.prototype._unsubscribe = function () {
          (this.buffer = void 0), (this.subscribing = !1);
        }),
        (e.prototype.notifyNext = function () {
          this.openBuffer();
        }),
        (e.prototype.notifyComplete = function () {
          this.subscribing ? this.complete() : this.openBuffer();
        }),
        (e.prototype.openBuffer = function () {
          var t = this.closingSubscription;
          t && (this.remove(t), t.unsubscribe());
          var e,
            n = this.buffer;
          this.buffer && this.destination.next(n), (this.buffer = []);
          try {
            e = (0, this.closingSelector)();
          } catch (t) {
            return this.error(t);
          }
          (t = new gt()),
            (this.closingSubscription = t),
            this.add(t),
            (this.subscribing = !0),
            t.add(ce(e, new oe(this))),
            (this.subscribing = !1);
        }),
        e
      );
    })(se);
  var _e = (function () {
      function t(t) {
        this.durationSelector = t;
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new xe(t, this.durationSelector));
        }),
        t
      );
    })(),
    xe = (function (t) {
      function e(e, n) {
        var r = t.call(this, e) || this;
        return (r.durationSelector = n), (r.hasValue = !1), r;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          try {
            var e = this.durationSelector.call(this, t);
            e && this._tryNext(t, e);
          } catch (t) {
            this.destination.error(t);
          }
        }),
        (e.prototype._complete = function () {
          this.emitValue(), this.destination.complete();
        }),
        (e.prototype._tryNext = function (t, e) {
          var n = this.durationSubscription;
          (this.value = t),
            (this.hasValue = !0),
            n && (n.unsubscribe(), this.remove(n)),
            (n = ce(e, new oe(this))) &&
              !n.closed &&
              this.add((this.durationSubscription = n));
        }),
        (e.prototype.notifyNext = function () {
          this.emitValue();
        }),
        (e.prototype.notifyComplete = function () {
          this.emitValue();
        }),
        (e.prototype.emitValue = function () {
          if (this.hasValue) {
            var e = this.value,
              n = this.durationSubscription;
            n &&
              ((this.durationSubscription = void 0),
              n.unsubscribe(),
              this.remove(n)),
              (this.value = void 0),
              (this.hasValue = !1),
              t.prototype._next.call(this, e);
          }
        }),
        e
      );
    })(se);
  function $e(t, e) {
    return function (n) {
      return n.lift(new Se(t, e));
    };
  }
  var Se = (function () {
      function t(t, e) {
        (this.compare = t), (this.keySelector = e);
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new Ee(t, this.compare, this.keySelector));
        }),
        t
      );
    })(),
    Ee = (function (t) {
      function e(e, n, r) {
        var i = t.call(this, e) || this;
        return (
          (i.keySelector = r),
          (i.hasKey = !1),
          'function' == typeof n && (i.compare = n),
          i
        );
      }
      return (
        at(e, t),
        (e.prototype.compare = function (t, e) {
          return t === e;
        }),
        (e.prototype._next = function (t) {
          var e;
          try {
            var n = this.keySelector;
            e = n ? n(t) : t;
          } catch (t) {
            return this.destination.error(t);
          }
          var r = !1;
          if (this.hasKey)
            try {
              r = (0, this.compare)(this.key, e);
            } catch (t) {
              return this.destination.error(t);
            }
          else this.hasKey = !0;
          r || ((this.key = e), this.destination.next(t));
        }),
        e
      );
    })(xt);
  var Pe = (function () {
      function t(t) {
        this.value = t;
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new ke(t, this.value));
        }),
        t
      );
    })(),
    ke = (function (t) {
      function e(e, n) {
        var r = t.call(this, e) || this;
        return (r.value = n), r;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          this.destination.next(this.value);
        }),
        e
      );
    })(xt);
  function Oe() {
    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
    var n = t.length;
    if (0 === n) throw new Error('list of properties cannot be empty.');
    return function (e) {
      return Ut(Te(t, n))(e);
    };
  }
  function Te(t, e) {
    return function (n) {
      for (var r = n, i = 0; i < e; i++) {
        var o = null != r ? r[t[i]] : void 0;
        if (void 0 === o) return;
        r = o;
      }
      return r;
    };
  }
  var Ce = (function () {
      function t(t, e) {
        (this.count = t), (this.source = e);
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new Ie(t, this.count, this.source));
        }),
        t
      );
    })(),
    Ie = (function (t) {
      function e(e, n, r) {
        var i = t.call(this, e) || this;
        return (i.count = n), (i.source = r), i;
      }
      return (
        at(e, t),
        (e.prototype.complete = function () {
          if (!this.isStopped) {
            var e = this.source,
              n = this.count;
            if (0 === n) return t.prototype.complete.call(this);
            n > -1 && (this.count = n - 1),
              e.subscribe(this._unsubscribeAndRecycle());
          }
        }),
        e
      );
    })(xt);
  var Ne = (function () {
      function t(t) {
        this.project = t;
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new je(t, this.project));
        }),
        t
      );
    })(),
    je = (function (t) {
      function e(e, n) {
        var r = t.call(this, e) || this;
        return (r.project = n), (r.index = 0), r;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          var e,
            n = this.index++;
          try {
            e = this.project(t, n);
          } catch (t) {
            return void this.destination.error(t);
          }
          this._innerSub(e);
        }),
        (e.prototype._innerSub = function (t) {
          var e = this.innerSubscription;
          e && e.unsubscribe();
          var n = new oe(this),
            r = this.destination;
          r.add(n),
            (this.innerSubscription = ce(t, n)),
            this.innerSubscription !== n && r.add(this.innerSubscription);
        }),
        (e.prototype._complete = function () {
          var e = this.innerSubscription;
          (e && !e.closed) || t.prototype._complete.call(this),
            this.unsubscribe();
        }),
        (e.prototype._unsubscribe = function () {
          this.innerSubscription = void 0;
        }),
        (e.prototype.notifyComplete = function () {
          (this.innerSubscription = void 0),
            this.isStopped && t.prototype._complete.call(this);
        }),
        (e.prototype.notifyNext = function (t) {
          this.destination.next(t);
        }),
        e
      );
    })(se);
  var Ge = (function () {
      function t(t, e) {
        (this.predicate = t), (this.inclusive = e);
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new Ae(t, this.predicate, this.inclusive));
        }),
        t
      );
    })(),
    Ae = (function (t) {
      function e(e, n, r) {
        var i = t.call(this, e) || this;
        return (i.predicate = n), (i.inclusive = r), (i.index = 0), i;
      }
      return (
        at(e, t),
        (e.prototype._next = function (t) {
          var e,
            n = this.destination;
          try {
            e = this.predicate(t, this.index++);
          } catch (t) {
            return void n.error(t);
          }
          this.nextOrComplete(t, e);
        }),
        (e.prototype.nextOrComplete = function (t, e) {
          var n = this.destination;
          Boolean(e) ? n.next(t) : (this.inclusive && n.next(t), n.complete());
        }),
        e
      );
    })(xt);
  var ze = (function () {
      function t(t, e) {
        (this.observables = t), (this.project = e);
      }
      return (
        (t.prototype.call = function (t, e) {
          return e.subscribe(new Ve(t, this.observables, this.project));
        }),
        t
      );
    })(),
    Ve = (function (t) {
      function e(e, n, r) {
        var i = t.call(this, e) || this;
        (i.observables = n), (i.project = r), (i.toRespond = []);
        var o = n.length;
        i.values = new Array(o);
        for (var s = 0; s < o; s++) i.toRespond.push(s);
        for (s = 0; s < o; s++) {
          var c = n[s];
          i.add(ne(i, c, void 0, s));
        }
        return i;
      }
      return (
        at(e, t),
        (e.prototype.notifyNext = function (t, e, n) {
          this.values[n] = e;
          var r = this.toRespond;
          if (r.length > 0) {
            var i = r.indexOf(n);
            -1 !== i && r.splice(i, 1);
          }
        }),
        (e.prototype.notifyComplete = function () {}),
        (e.prototype._next = function (t) {
          if (0 === this.toRespond.length) {
            var e = [t].concat(this.values);
            this.project ? this._tryProject(e) : this.destination.next(e);
          }
        }),
        (e.prototype._tryProject = function (t) {
          var e;
          try {
            e = this.project.apply(this, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(e);
        }),
        e
      );
    })(Wt);
  const Me = (t, e, n = 'local') => chrome.storage[n].set({ [t]: e }),
    Le = 'selectedConf',
    Fe = 'apiKey',
    Ye = 'pollRate',
    De = 'eip1559',
    Re = 'badgeValue',
    Be = {
      estimatedPrices: [99, 95, 90, 80, 70].map((t) => ({
        confidence: t,
        price: null,
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
      })),
      baseFeePerGas: null,
      blockNumber: null,
      estimatedTransactionCount: null,
    };
  var He, Ue;
  new Nt()
    .pipe(
      ((Ue = () => he(15e3)),
      function (t) {
        return t.lift(new ge(Ue));
      }),
      ye((t) => t && t.length > 1),
      ((He = !0),
      function (t) {
        return t.lift(new Pe(He));
      }),
    )
    .subscribe(() => Me(Ye, 5e3));
  const Ke = (function t(e, n, r) {
      return r
        ? t(e, n).pipe(
            Ut(function (t) {
              return bt(t) ? r.apply(void 0, t) : r(t);
            }),
          )
        : new kt(function (t) {
            var r,
              i = function () {
                for (var e = [], n = 0; n < arguments.length; n++)
                  e[n] = arguments[n];
                return t.next(1 === e.length ? e[0] : e);
              };
            try {
              r = e(i);
            } catch (e) {
              return void t.error(e);
            }
            if (ft(n))
              return function () {
                return n(i, r);
              };
          });
    })(
      (t) => chrome.storage.onChanged.addListener(t),
      (t) => chrome.storage.onChanged.removeListener(t),
    ).pipe(Oe('0')),
    qe = (t, e) =>
      (function () {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var n = Number.POSITIVE_INFINITY,
          r = null,
          i = t[t.length - 1];
        return (
          Ft(i)
            ? ((r = t.pop()),
              t.length > 1 &&
                'number' == typeof t[t.length - 1] &&
                (n = t.pop()))
            : 'number' == typeof i && (n = t.pop()),
          null === r && 1 === t.length && t[0] instanceof kt
            ? t[0]
            : fe(n)(Rt(t, r))
        );
      })(
        new kt((n) => {
          chrome.storage.local.get({ [t]: e }, n.next.bind(n));
        }).pipe(Oe(t)),
        Ke.pipe(
          ye((e) => t in e),
          Oe(t, 'newValue'),
        ),
      ),
    We = qe(Ye, 5e3);
  We.pipe(
    (function t(e, n) {
      return 'function' == typeof n
        ? function (r) {
            return r.pipe(
              t(function (t, r) {
                return ie(e(t, r)).pipe(
                  Ut(function (e, i) {
                    return n(t, e, r, i);
                  }),
                );
              }),
            );
          }
        : function (t) {
            return t.lift(new Ne(e));
          };
    })((t) => {
      return (function (t, e, n) {
        void 0 === t && (t = 0);
        var r = -1;
        return (
          pe(e) ? (r = Number(e) < 1 ? 1 : Number(e)) : Ft(e) && (n = e),
          Ft(n) || (n = Ht),
          new kt(function (e) {
            var i = pe(t) ? t : +t - n.now();
            return n.schedule(me, i, { index: 0, period: r, subscriber: e });
          })
        );
      })(0, t / 100).pipe(
        ((n = (t) => t < 101),
        void 0 === r && (r = !1),
        function (t) {
          return t.lift(new Ge(n, r));
        }),
        (void 0 === e && (e = -1),
        function (t) {
          return 0 === e
            ? Lt()
            : e < 0
            ? t.lift(new Ce(-1, t))
            : t.lift(new Ce(e - 1, t));
        }),
      );
      var e, n, r;
    }),
  );
  const Je = qe('progress', 0),
    Qe = qe(De, !0),
    Xe = qe(Fe, ''),
    Ze = qe('gasPrices', Be),
    tn = qe(Le, 90);
  Ze.pipe(
    (function () {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      return function (e) {
        var n;
        'function' == typeof t[t.length - 1] && (n = t.pop());
        var r = t;
        return e.lift(new ze(r, n));
      };
    })(tn, Qe),
    ye(([t]) => !!t),
    Ut(([t, e, n]) => {
      var r;
      return n
        ? [{ price: Math.round(null == t ? void 0 : t.baseFeePerGas) }]
        : null === (r = null == t ? void 0 : t.estimatedPrices) || void 0 === r
        ? void 0
        : r.filter(({ confidence: t }) => t === e);
    }),
    Oe('0'),
    Oe('price'),
  ).subscribe((t) => Me(Re, t)),
    qe(Re, null);
  const en = new Gt('');
  function nn(t, e, n) {
    const r = t.slice();
    return (
      (r[8] = e[n].confidence),
      (r[9] = e[n].price),
      (r[10] = e[n].maxFeePerGas),
      (r[11] = e[n].maxPriorityFeePerGas),
      r
    );
  }
  function rn(t) {
    let e,
      n,
      r,
      i,
      o,
      s,
      c,
      u,
      l,
      a,
      f,
      p,
      h,
      d,
      y,
      _,
      S,
      E,
      C,
      I = t[0].blockNumber + '',
      N = t[0].estimatedTransactionCount + '',
      j = t[0].estimatedPrices,
      G = [];
    for (let e = 0; e < j.length; e += 1) G[e] = un(nn(t, j, e));
    let A = t[2] && ln(t);
    return {
      c() {
        e = w('div');
        for (let t = 0; t < G.length; t += 1) G[t].c();
        (n = $()),
          (r = w('div')),
          (i = w('div')),
          (o = w('div')),
          (o.textContent = 'Pending Block Number'),
          (s = $()),
          (c = w('div')),
          (u = x(I)),
          (l = $()),
          (a = w('div')),
          (f = w('div')),
          (f.textContent = 'Transactions in Pending Block'),
          (p = $()),
          (h = w('span')),
          (d = x('~')),
          (_ = $()),
          (S = w('div')),
          (E = x(N)),
          (C = $()),
          A && A.c(),
          P(e, 'class', 'Gas--body svelte-7ywcd2'),
          P(o, 'class', 'Gas--stat-label svelte-7ywcd2'),
          P(c, 'class', 'Gas--stat-value svelte-7ywcd2'),
          P(c, 'id', 'pending-block-number'),
          P(i, 'class', 'Gas--stat-container svelte-7ywcd2'),
          P(f, 'class', 'Gas--stat-label svelte-7ywcd2'),
          (y = new T(null)),
          O(h, 'font-size', '18px'),
          O(h, 'font-weight', '600'),
          P(S, 'class', 'Gas--stat-value svelte-7ywcd2'),
          P(S, 'id', 'transaction-count'),
          P(a, 'class', 'Gas--stat-container svelte-7ywcd2'),
          P(r, 'class', 'Gas--stats svelte-7ywcd2');
      },
      m(t, m) {
        v(t, e, m);
        for (let t = 0; t < G.length; t += 1) G[t].m(e, null);
        v(t, n, m),
          v(t, r, m),
          b(r, i),
          b(i, o),
          b(i, s),
          b(i, c),
          b(c, u),
          b(r, l),
          b(r, a),
          b(a, f),
          b(a, p),
          b(a, h),
          b(h, d),
          y.m('&nbsp;', h),
          b(a, _),
          b(a, S),
          b(S, E),
          b(r, C),
          A && A.m(r, null);
      },
      p(t, n) {
        if (95 & n) {
          let r;
          for (j = t[0].estimatedPrices, r = 0; r < j.length; r += 1) {
            const i = nn(t, j, r);
            G[r] ? G[r].p(i, n) : ((G[r] = un(i)), G[r].c(), G[r].m(e, null));
          }
          for (; r < G.length; r += 1) G[r].d(1);
          G.length = j.length;
        }
        1 & n && I !== (I = t[0].blockNumber + '') && k(u, I),
          1 & n && N !== (N = t[0].estimatedTransactionCount + '') && k(E, N),
          t[2]
            ? A
              ? A.p(t, n)
              : ((A = ln(t)), A.c(), A.m(r, null))
            : A && (A.d(1), (A = null));
      },
      d(t) {
        t && m(e), g(G, t), t && m(n), t && m(r), A && A.d();
      },
    };
  }
  function on(t) {
    let e,
      n,
      r,
      i,
      o,
      s = (t[9] || '-') + '';
    return {
      c() {
        (e = w('div')),
          (n = w('div')),
          (r = x(s)),
          (i = $()),
          (o = w('div')),
          (o.textContent = 'GWEI'),
          P(n, 'class', 'Gas--card-price svelte-7ywcd2'),
          P(o, 'class', 'Gas--card-price-label svelte-7ywcd2'),
          P(o, 'id', 'gas-price-unit');
      },
      m(t, s) {
        v(t, e, s), b(e, n), b(n, r), b(e, i), b(e, o);
      },
      p(t, e) {
        1 & e && s !== (s = (t[9] || '-') + '') && k(r, s);
      },
      d(t) {
        t && m(e);
      },
    };
  }
  function sn(t) {
    let e,
      n,
      r,
      i,
      o,
      s,
      c,
      u,
      l,
      a = (Math.round(t[11]) || '-') + '',
      f = (Math.round(t[10]) || '-') + '';
    return {
      c() {
        (e = w('div')),
          (e.textContent = 'priority fee'),
          (n = $()),
          (r = w('div')),
          (i = x(a)),
          (o = $()),
          (s = w('div')),
          (s.textContent = 'max fee'),
          (c = $()),
          (u = w('div')),
          (l = x(f)),
          P(e, 'class', 'Gas--card-price-label svelte-7ywcd2'),
          P(r, 'class', 'Gas--card-price svelte-7ywcd2'),
          P(s, 'class', 'Gas--card-price-label svelte-7ywcd2'),
          P(u, 'class', 'Gas--card-price svelte-7ywcd2'),
          P(u, 'id', 'max-fee');
      },
      m(t, a) {
        v(t, e, a),
          v(t, n, a),
          v(t, r, a),
          b(r, i),
          v(t, o, a),
          v(t, s, a),
          v(t, c, a),
          v(t, u, a),
          b(u, l);
      },
      p(t, e) {
        1 & e && a !== (a = (Math.round(t[11]) || '-') + '') && k(i, a),
          1 & e && f !== (f = (Math.round(t[10]) || '-') + '') && k(l, f);
      },
      d(t) {
        t && m(e),
          t && m(n),
          t && m(r),
          t && m(o),
          t && m(s),
          t && m(c),
          t && m(u);
      },
    };
  }
  function cn(t) {
    let e;
    return {
      c() {
        (e = w('div')),
          P(e, 'class', 'Gas--card-bg svelte-7ywcd2'),
          O(e, 'background', 'var(--conf-level-' + t[8] + '-color)'),
          O(e, 'transition-duration', t[3] / 100 + 'ms'),
          O(e, 'transform', 'scaleY(' + t[4] / 100);
      },
      m(t, n) {
        v(t, e, n);
      },
      p(t, n) {
        1 & n && O(e, 'background', 'var(--conf-level-' + t[8] + '-color)'),
          8 & n && O(e, 'transition-duration', t[3] / 100 + 'ms'),
          16 & n && O(e, 'transform', 'scaleY(' + t[4] / 100);
      },
      d(t) {
        t && m(e);
      },
    };
  }
  function un(t) {
    let e,
      n,
      r,
      i,
      o,
      s,
      c,
      u,
      l,
      a,
      f = t[8] + '';
    function p(t, e) {
      return t[2] ? sn : on;
    }
    let h = p(t),
      d = h(t),
      y = (t[2] || t[1] === t[8]) && cn(t);
    function g() {
      return t[7](t[8]);
    }
    return {
      c() {
        (e = w('div')),
          d.c(),
          (n = $()),
          (r = w('div')),
          (i = x(f)),
          (o = x('% Probability')),
          (s = $()),
          y && y.c(),
          (c = $()),
          P(r, 'class', 'Gas--card-conf svelte-7ywcd2'),
          O(r, 'color', 'var(--conf-level-' + t[8] + '-color)'),
          O(e, 'border-color', 'var(--conf-level-' + t[8] + '-color)'),
          P(
            e,
            'class',
            (u =
              'Gas--card ' +
              (t[1] !== t[8] || t[2] ? '' : 'Gas--card-selected') +
              ' svelte-7ywcd2'),
          );
      },
      m(t, u) {
        v(t, e, u),
          d.m(e, null),
          b(e, n),
          b(e, r),
          b(r, i),
          b(r, o),
          b(e, s),
          y && y.m(e, null),
          b(e, c),
          l || ((a = E(e, 'click', g)), (l = !0));
      },
      p(o, s) {
        h === (h = p((t = o))) && d
          ? d.p(t, s)
          : (d.d(1), (d = h(t)), d && (d.c(), d.m(e, n))),
          1 & s && f !== (f = t[8] + '') && k(i, f),
          1 & s && O(r, 'color', 'var(--conf-level-' + t[8] + '-color)'),
          t[2] || t[1] === t[8]
            ? y
              ? y.p(t, s)
              : ((y = cn(t)), y.c(), y.m(e, c))
            : y && (y.d(1), (y = null)),
          1 & s && O(e, 'border-color', 'var(--conf-level-' + t[8] + '-color)'),
          7 & s &&
            u !==
              (u =
                'Gas--card ' +
                (t[1] !== t[8] || t[2] ? '' : 'Gas--card-selected') +
                ' svelte-7ywcd2') &&
            P(e, 'class', u);
      },
      d(t) {
        t && m(e), d.d(), y && y.d(), (l = !1), a();
      },
    };
  }
  function ln(t) {
    let e,
      n,
      r,
      i,
      o,
      s = t[0].baseFeePerGas + '';
    return {
      c() {
        (e = w('div')),
          (n = w('div')),
          (n.textContent = 'Base Fee'),
          (r = $()),
          (i = w('div')),
          (o = x(s)),
          P(n, 'class', 'Gas--stat-label svelte-7ywcd2'),
          P(i, 'class', 'Gas--stat-value svelte-7ywcd2'),
          P(i, 'id', 'base-fee'),
          P(e, 'class', 'Gas--stat-container svelte-7ywcd2');
      },
      m(t, s) {
        v(t, e, s), b(e, n), b(e, r), b(e, i), b(i, o);
      },
      p(t, e) {
        1 & e && s !== (s = t[0].baseFeePerGas + '') && k(o, s);
      },
      d(t) {
        t && m(e);
      },
    };
  }
  function an(t) {
    let e, n;
    return {
      c() {
        (e = w('a')),
          (e.textContent = 'Add your Blocknative API key'),
          (n = x(' to increase your poll rate for accuracy!')),
          P(e, 'href', 'https://explorer.blocknative.com/account'),
          P(e, 'target', '_blank');
      },
      m(t, r) {
        v(t, e, r), v(t, n, r);
      },
      d(t) {
        t && m(e), t && m(n);
      },
    };
  }
  function fn(e) {
    let n,
      r,
      i,
      o,
      s,
      c,
      u = e[0] && e[0]?.estimatedPrices?.length && rn(e),
      l = !e[5] && an();
    return {
      c() {
        (n = w('div')),
          (r = w('div')),
          (r.innerHTML =
            '<span>MORE LIKELY </span><span class="Gas--likelihood-line svelte-7ywcd2"></span> \n    <span>LESS LIKELY</span>'),
          (i = $()),
          u && u.c(),
          (o = $()),
          (s = w('div')),
          (c = w('div')),
          l && l.c(),
          P(r, 'class', 'Gas--likelihood svelte-7ywcd2'),
          P(c, 'class', 'Gas--footer-item'),
          P(s, 'class', 'Gas--footer svelte-7ywcd2'),
          P(n, 'class', 'Gas svelte-7ywcd2');
      },
      m(t, e) {
        v(t, n, e),
          b(n, r),
          b(n, i),
          u && u.m(n, null),
          b(n, o),
          b(n, s),
          b(s, c),
          l && l.m(c, null);
      },
      p(t, [e]) {
        t[0] && t[0]?.estimatedPrices?.length
          ? u
            ? u.p(t, e)
            : ((u = rn(t)), u.c(), u.m(n, o))
          : u && (u.d(1), (u = null)),
          t[5]
            ? l && (l.d(1), (l = null))
            : l || ((l = an()), l.c(), l.m(c, null));
      },
      i: t,
      o: t,
      d(t) {
        t && m(n), u && u.d(), l && l.d();
      },
    };
  }
  function pn(t, e, n) {
    let r, i, o, s, u, l;
    c(t, Ze, (t) => n(0, (r = t))),
      c(t, tn, (t) => n(1, (i = t))),
      c(t, Qe, (t) => n(2, (o = t))),
      c(t, We, (t) => n(3, (s = t))),
      c(t, Je, (t) => n(4, (u = t))),
      c(t, Xe, (t) => n(5, (l = t)));
    const a = (t) => {
      Me(Le, t);
    };
    return [r, i, o, s, u, l, a, (t) => a(t)];
  }
  class hn extends ut {
    constructor(t) {
      super(), ct(this, t, pn, fn, s, {});
    }
  }
  function dn(t, e, n) {
    const r = t.slice();
    return (r[6] = e[n]), r;
  }
  function yn(t) {
    let e,
      n = t[1],
      r = [];
    for (let e = 0; e < n.length; e += 1) r[e] = bn(dn(t, n, e));
    return {
      c() {
        for (let t = 0; t < r.length; t += 1) r[t].c();
        e = S();
      },
      m(t, n) {
        for (let e = 0; e < r.length; e += 1) r[e].m(t, n);
        v(t, e, n);
      },
      p(t, i) {
        if (38 & i) {
          let o;
          for (n = t[1], o = 0; o < n.length; o += 1) {
            const s = dn(t, n, o);
            r[o]
              ? r[o].p(s, i)
              : ((r[o] = bn(s)), r[o].c(), r[o].m(e.parentNode, e));
          }
          for (; o < r.length; o += 1) r[o].d(1);
          r.length = n.length;
        }
      },
      d(t) {
        g(r, t), t && m(e);
      },
    };
  }
  function bn(t) {
    let e,
      n,
      r,
      i,
      o = t[5](t[6]) + '';
    return {
      c() {
        (e = w('option')),
          (n = x(o)),
          (e.__value = r = t[6]),
          (e.value = e.__value),
          (e.selected = i = t[6] === t[2]);
      },
      m(t, r) {
        v(t, e, r), b(e, n);
      },
      p(t, s) {
        2 & s && o !== (o = t[5](t[6]) + '') && k(n, o),
          2 & s && r !== (r = t[6]) && ((e.__value = r), (e.value = e.__value)),
          6 & s && i !== (i = t[6] === t[2]) && (e.selected = i);
      },
      d(t) {
        t && m(e);
      },
    };
  }
  function vn(e) {
    let n,
      r,
      o,
      s,
      c,
      u,
      l,
      a,
      f,
      p,
      h,
      d,
      y,
      g,
      _ = e[2] && yn(e);
    return {
      c() {
        (n = w('div')),
          (r = w('div')),
          (o = w('label')),
          (o.textContent = 'API Key'),
          (s = $()),
          (c = w('input')),
          (u = $()),
          (l = w('div')),
          (a = w('label')),
          (a.textContent = 'Poll Rate'),
          (f = $()),
          (p = w('select')),
          _ && _.c(),
          (h = $()),
          (d = w('div')),
          (d.textContent = 'seconds'),
          P(o, 'class', 'Settings--setting-label svelte-14uaa65'),
          P(o, 'for', 'apikey'),
          P(c, 'id', 'apikey-input'),
          P(c, 'name', 'apikey'),
          P(c, 'placeholder', 'Your API key'),
          P(c, 'class', 'Settings--setting-input svelte-14uaa65'),
          (c.value = e[0]),
          P(r, 'class', 'Settings--setting svelte-14uaa65'),
          P(a, 'class', 'Settings--setting-label svelte-14uaa65'),
          P(a, 'for', 'pollRate'),
          P(p, 'id', 'pollrate-input'),
          P(p, 'name', 'pollRate'),
          P(p, 'class', 'Settings--setting-input svelte-14uaa65'),
          O(d, 'margin-left', '6px'),
          O(d, 'font-weight', '100'),
          P(l, 'class', 'Settings--setting svelte-14uaa65'),
          P(n, 'class', 'Settings svelte-14uaa65');
      },
      m(t, i) {
        v(t, n, i),
          b(n, r),
          b(r, o),
          b(r, s),
          b(r, c),
          b(n, u),
          b(n, l),
          b(l, a),
          b(l, f),
          b(l, p),
          _ && _.m(p, null),
          b(l, h),
          b(l, d),
          y || ((g = [E(c, 'input', e[3]()), E(p, 'blur', e[4]())]), (y = !0));
      },
      p(t, [e]) {
        1 & e && c.value !== t[0] && (c.value = t[0]),
          t[2]
            ? _
              ? _.p(t, e)
              : ((_ = yn(t)), _.c(), _.m(p, null))
            : _ && (_.d(1), (_ = null));
      },
      i: t,
      o: t,
      d(t) {
        t && m(n), _ && _.d(), (y = !1), i(g);
      },
    };
  }
  function mn(t, e, n) {
    let r, i, o;
    c(t, Xe, (t) => n(0, (i = t))), c(t, We, (t) => n(2, (o = t)));
    return (
      (t.$$.update = () => {
        var e, o;
        1 & t.$$.dirty &&
          n(
            1,
            (r = ((e = i ? 1 : 5),
            (o = 15),
            Array(o - e + 1)
              .fill(0)
              .map((t, n) => n + e)).map((t) => 1e3 * t)),
          );
      }),
      [
        i,
        r,
        o,
        () => (t) => {
          var e;
          Bt(t.target.value)
            .pipe(
              $e(),
              ((e = () => he(500)),
              function (t) {
                return t.lift(new _e(e));
              }),
            )
            .subscribe((t) => {
              en.next('Saved!'), setTimeout(() => en.next(''), 1500), Me(Fe, t);
            });
        },
        () => (t) => {
          Bt(t.target.value)
            .pipe($e())
            .subscribe((t) => Me(Ye, +t));
        },
        (t) => t / 1e3,
      ]
    );
  }
  class gn extends ut {
    constructor(t) {
      super(), ct(this, t, mn, vn, s, {});
    }
  }
  const wn = (t) => ({}),
    _n = (t) => ({}),
    xn = (t) => ({}),
    $n = (t) => ({});
  function Sn(t) {
    let e, n, r, i;
    const o = t[1].header,
      s = u(o, t, t[0], $n),
      c = t[1].body,
      l = u(c, t, t[0], _n);
    return {
      c() {
        (e = w('div')),
          (n = w('div')),
          s && s.c(),
          (r = $()),
          l && l.c(),
          P(n, 'class', 'Frame--header'),
          P(e, 'class', 'Frame font-semi-bold svelte-siqv6a');
      },
      m(t, o) {
        v(t, e, o),
          b(e, n),
          s && s.m(n, null),
          b(e, r),
          l && l.m(e, null),
          (i = !0);
      },
      p(t, [e]) {
        s && s.p && 1 & e && a(s, o, t, t[0], e, xn, $n),
          l && l.p && 1 & e && a(l, c, t, t[0], e, wn, _n);
      },
      i(t) {
        i || (Z(s, t), Z(l, t), (i = !0));
      },
      o(t) {
        tt(s, t), tt(l, t), (i = !1);
      },
      d(t) {
        t && m(e), s && s.d(t), l && l.d(t);
      },
    };
  }
  function En(t, e, n) {
    let { $$slots: r = {}, $$scope: i } = e;
    return (
      (t.$$set = (t) => {
        '$$scope' in t && n(0, (i = t.$$scope));
      }),
      [i, r]
    );
  }
  class Pn extends ut {
    constructor(t) {
      super(), ct(this, t, En, Sn, s, {});
    }
  }
  function kn(e) {
    let n, r, o, s, c, u, l, a, f, p;
    return {
      c() {
        (n = w('div')),
          (r = w('input')),
          (o = $()),
          (s = w('div')),
          (c = $()),
          (u = w('div')),
          (l = $()),
          (a = w('div')),
          P(r, 'class', 'Toggle--checkbox svelte-d0ol6z'),
          P(r, 'type', 'checkbox'),
          P(s, 'class', 'Toggle--background svelte-d0ol6z'),
          P(u, 'class', 'Toggle--foreground svelte-d0ol6z'),
          P(a, 'class', 'Toggle--dot svelte-d0ol6z'),
          P(n, 'class', 'Toggle svelte-d0ol6z');
      },
      m(t, i) {
        v(t, n, i),
          b(n, r),
          (r.checked = e[0]),
          b(n, o),
          b(n, s),
          b(n, c),
          b(n, u),
          b(n, l),
          b(n, a),
          f || ((p = [E(r, 'change', e[2]), E(r, 'click', e[1])]), (f = !0));
      },
      p(t, [e]) {
        1 & e && (r.checked = t[0]);
      },
      i: t,
      o: t,
      d(t) {
        t && m(n), (f = !1), i(p);
      },
    };
  }
  function On(t, e, n) {
    let { toggled: r = !1 } = e;
    return (
      (t.$$set = (t) => {
        'toggled' in t && n(0, (r = t.toggled));
      }),
      [
        r,
        function (e) {
          !(function (t, e) {
            const n = t.$$.callbacks[e.type];
            n && n.slice().forEach((t) => t(e));
          })(t, e);
        },
        function () {
          (r = this.checked), n(0, r);
        },
      ]
    );
  }
  class Tn extends ut {
    constructor(t) {
      super(), ct(this, t, On, kn, s, { toggled: 0 });
    }
  }
  function Cn(t) {
    let e, n, r, i;
    function o(t, e) {
      return 'string' == typeof t[8][4] ? Nn : In;
    }
    let s = o(t),
      c = s(t);
    return {
      c() {
        (e = _('svg')),
          (n = _('g')),
          (r = _('g')),
          c.c(),
          P(r, 'transform', t[10]),
          P(n, 'transform', 'translate(256 256)'),
          P(e, 'id', t[1]),
          P(e, 'class', t[0]),
          P(e, 'style', t[9]),
          P(e, 'viewBox', (i = `0 0 ${t[8][0]} ${t[8][1]}`)),
          P(e, 'aria-hidden', 'true'),
          P(e, 'role', 'img'),
          P(e, 'xmlns', 'http://www.w3.org/2000/svg');
      },
      m(t, i) {
        v(t, e, i), b(e, n), b(n, r), c.m(r, null);
      },
      p(t, n) {
        s === (s = o(t)) && c
          ? c.p(t, n)
          : (c.d(1), (c = s(t)), c && (c.c(), c.m(r, null))),
          1024 & n && P(r, 'transform', t[10]),
          2 & n && P(e, 'id', t[1]),
          1 & n && P(e, 'class', t[0]),
          512 & n && P(e, 'style', t[9]),
          256 & n &&
            i !== (i = `0 0 ${t[8][0]} ${t[8][1]}`) &&
            P(e, 'viewBox', i);
      },
      d(t) {
        t && m(e), c.d();
      },
    };
  }
  function In(t) {
    let e, n, r, i, o, s, c, u;
    return {
      c() {
        (e = _('path')),
          (o = _('path')),
          P(e, 'd', (n = t[8][4][0])),
          P(e, 'fill', (r = t[4] || t[2] || 'currentColor')),
          P(e, 'fill-opacity', (i = 0 != t[7] ? t[5] : t[6])),
          P(e, 'transform', 'translate(-256 -256)'),
          P(o, 'd', (s = t[8][4][1])),
          P(o, 'fill', (c = t[3] || t[2] || 'currentColor')),
          P(o, 'fill-opacity', (u = 0 != t[7] ? t[6] : t[5])),
          P(o, 'transform', 'translate(-256 -256)');
      },
      m(t, n) {
        v(t, e, n), v(t, o, n);
      },
      p(t, l) {
        256 & l && n !== (n = t[8][4][0]) && P(e, 'd', n),
          20 & l &&
            r !== (r = t[4] || t[2] || 'currentColor') &&
            P(e, 'fill', r),
          224 & l &&
            i !== (i = 0 != t[7] ? t[5] : t[6]) &&
            P(e, 'fill-opacity', i),
          256 & l && s !== (s = t[8][4][1]) && P(o, 'd', s),
          12 & l &&
            c !== (c = t[3] || t[2] || 'currentColor') &&
            P(o, 'fill', c),
          224 & l &&
            u !== (u = 0 != t[7] ? t[6] : t[5]) &&
            P(o, 'fill-opacity', u);
      },
      d(t) {
        t && m(e), t && m(o);
      },
    };
  }
  function Nn(t) {
    let e, n, r;
    return {
      c() {
        (e = _('path')),
          P(e, 'd', (n = t[8][4])),
          P(e, 'fill', (r = t[2] || t[3] || 'currentColor')),
          P(e, 'transform', 'translate(-256 -256)');
      },
      m(t, n) {
        v(t, e, n);
      },
      p(t, i) {
        256 & i && n !== (n = t[8][4]) && P(e, 'd', n),
          12 & i &&
            r !== (r = t[2] || t[3] || 'currentColor') &&
            P(e, 'fill', r);
      },
      d(t) {
        t && m(e);
      },
    };
  }
  function jn(e) {
    let n,
      r = e[8][4] && Cn(e);
    return {
      c() {
        r && r.c(), (n = S());
      },
      m(t, e) {
        r && r.m(t, e), v(t, n, e);
      },
      p(t, [e]) {
        t[8][4]
          ? r
            ? r.p(t, e)
            : ((r = Cn(t)), r.c(), r.m(n.parentNode, n))
          : r && (r.d(1), (r = null));
      },
      i: t,
      o: t,
      d(t) {
        r && r.d(t), t && m(n);
      },
    };
  }
  function Gn(t, e, n) {
    let r,
      i,
      o,
      { class: s = '' } = e,
      { id: c = '' } = e,
      { style: u = '' } = e,
      { icon: l } = e,
      { fw: a = !1 } = e,
      { flip: f = !1 } = e,
      { pull: p = !1 } = e,
      { rotate: h = !1 } = e,
      { size: d = !1 } = e,
      { color: y = '' } = e,
      { primaryColor: b = '' } = e,
      { secondaryColor: v = '' } = e,
      { primaryOpacity: m = 1 } = e,
      { secondaryOpacity: g = 0.4 } = e,
      { swapOpacity: w = !1 } = e;
    return (
      (t.$$set = (t) => {
        'class' in t && n(0, (s = t.class)),
          'id' in t && n(1, (c = t.id)),
          'style' in t && n(11, (u = t.style)),
          'icon' in t && n(12, (l = t.icon)),
          'fw' in t && n(13, (a = t.fw)),
          'flip' in t && n(14, (f = t.flip)),
          'pull' in t && n(15, (p = t.pull)),
          'rotate' in t && n(16, (h = t.rotate)),
          'size' in t && n(17, (d = t.size)),
          'color' in t && n(2, (y = t.color)),
          'primaryColor' in t && n(3, (b = t.primaryColor)),
          'secondaryColor' in t && n(4, (v = t.secondaryColor)),
          'primaryOpacity' in t && n(5, (m = t.primaryOpacity)),
          'secondaryOpacity' in t && n(6, (g = t.secondaryOpacity)),
          'swapOpacity' in t && n(7, (w = t.swapOpacity));
      }),
      (t.$$.update = () => {
        if (
          (4096 & t.$$.dirty && n(8, (r = (l && l.icon) || [0, 0, '', [], ''])),
          174080 & t.$$.dirty)
        ) {
          let t, e;
          const r = '1em';
          let o,
            s,
            c,
            l = '-.125em';
          const f = 'visible';
          a && ((c = 'center'), (e = '1.25em')),
            p && (t = p),
            d &&
              ('lg' == d
                ? ((s = '1.33333em'), (o = '.75em'), (l = '-.225em'))
                : (s =
                    'xs' == d
                      ? '.75em'
                      : 'sm' == d
                      ? '.875em'
                      : d.replace('x', 'em')));
          const h = {
            float: t,
            width: e,
            height: r,
            'line-height': o,
            'font-size': s,
            'text-align': c,
            'vertical-align': l,
            overflow: f,
          };
          let y = '';
          for (const t in h) h[t] && (y += `${t}:${h[t]};`);
          n(9, (i = y + u));
        }
        if (81920 & t.$$.dirty) {
          let t = '';
          if (f) {
            let e = 1,
              n = 1;
            'horizontal' == f
              ? (e = -1)
              : 'vertical' == f
              ? (n = -1)
              : (e = n = -1),
              (t += ` scale(${e} ${n})`);
          }
          h && (t += ` rotate(${h} 0 0)`), n(10, (o = t));
        }
      }),
      [s, c, y, b, v, m, g, w, r, i, o, u, l, a, f, p, h, d]
    );
  }
  class An extends ut {
    constructor(t) {
      super(),
        ct(this, t, Gn, jn, s, {
          class: 0,
          id: 1,
          style: 11,
          icon: 12,
          fw: 13,
          flip: 14,
          pull: 15,
          rotate: 16,
          size: 17,
          color: 2,
          primaryColor: 3,
          secondaryColor: 4,
          primaryOpacity: 5,
          secondaryOpacity: 6,
          swapOpacity: 7,
        });
    }
  }
  /*!
   * Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com
   * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
   */ var zn = {
      prefix: 'fas',
      iconName: 'cog',
      icon: [
        512,
        512,
        [],
        'f013',
        'M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z',
      ],
    },
    Vn = {
      prefix: 'fas',
      iconName: 'times',
      icon: [
        352,
        512,
        [],
        'f00d',
        'M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z',
      ],
    };
  function Mn(t) {
    const e = t - 1;
    return e * e * e + 1;
  }
  function Ln(
    t,
    {
      delay: e = 0,
      duration: n = 400,
      easing: r = Mn,
      x: i = 0,
      y: o = 0,
      opacity: s = 0,
    } = {},
  ) {
    const c = getComputedStyle(t),
      u = +c.opacity,
      l = 'none' === c.transform ? '' : c.transform,
      a = u * (1 - s);
    return {
      delay: e,
      duration: n,
      easing: r,
      css: (t, e) =>
        `\n\t\t\ttransform: ${l} translate(${(1 - t) * i}px, ${
          (1 - t) * o
        }px);\n\t\t\topacity: ${u - a * e}`,
    };
  }
  function Fn(t) {
    let e, n, r, i;
    return {
      c() {
        (e = w('div')),
          (n = x(t[5])),
          P(e, 'class', 'Settings--saved-notif svelte-i53z0h');
      },
      m(t, r) {
        v(t, e, r), b(e, n), (i = !0);
      },
      p(t, e) {
        (!i || 32 & e) && k(n, t[5]);
      },
      i(t) {
        i ||
          (t &&
            D(() => {
              r || (r = nt(e, Ln, { duration: 150 }, !0)), r.run(1);
            }),
          (i = !0));
      },
      o(t) {
        t && (r || (r = nt(e, Ln, { duration: 150 }, !1)), r.run(0)), (i = !1);
      },
      d(t) {
        t && m(e), t && r && r.end();
      },
    };
  }
  function Yn(t) {
    let e, n, r, i, o;
    return (
      (n = new Tn({ props: { toggled: t[6] } })),
      n.$on('click', t[7]()),
      {
        c() {
          (e = w('div')),
            rt(n.$$.fragment),
            (r = $()),
            (i = w('label')),
            (i.textContent = 'EIP 1559'),
            P(i, 'class', 'Popup--EIP1559-label svelte-i53z0h'),
            P(i, 'for', 'eip1559'),
            P(e, 'class', 'Popup--EIP1559 svelte-i53z0h');
        },
        m(t, s) {
          v(t, e, s), it(n, e, null), b(e, r), b(e, i), (o = !0);
        },
        p(t, e) {
          const r = {};
          64 & e && (r.toggled = t[6]), n.$set(r);
        },
        i(t) {
          o || (Z(n.$$.fragment, t), (o = !0));
        },
        o(t) {
          tt(n.$$.fragment, t), (o = !1);
        },
        d(t) {
          t && m(e), ot(n);
        },
      }
    );
  }
  function Dn(t) {
    let e,
      n,
      r,
      i,
      o,
      s,
      c,
      u,
      l,
      a,
      f,
      p,
      h,
      d,
      y,
      g,
      _ = t[5] && t[0] && Fn(t),
      S = !t[0] && void 0 !== t[6] && Yn(t);
    return (
      (h = new An({ props: { icon: t[3] } })),
      {
        c() {
          (e = w('div')),
            (n = w('div')),
            (r = w('div')),
            (i = w('div')),
            (s = $()),
            _ && _.c(),
            (c = $()),
            (u = w('div')),
            (l = x(t[2])),
            (a = $()),
            S && S.c(),
            (f = $()),
            (p = w('div')),
            rt(h.$$.fragment),
            (o = new T(s)),
            P(i, 'class', 'Popup--header-title svelte-i53z0h'),
            P(u, 'class', 'Popup--header-subtitle svelte-i53z0h'),
            P(r, 'class', 'Popup--header svelte-i53z0h'),
            P(n, 'class', 'Popup--header-container svelte-i53z0h'),
            P(p, 'class', 'Popup--settings-icon svelte-i53z0h'),
            P(e, 'slot', 'header');
        },
        m(m, w) {
          v(m, e, w),
            b(e, n),
            b(n, r),
            b(r, i),
            o.m(t[1], i),
            b(i, s),
            _ && _.m(i, null),
            b(r, c),
            b(r, u),
            b(u, l),
            b(n, a),
            S && S.m(n, null),
            b(e, f),
            b(e, p),
            it(h, p, null),
            (d = !0),
            y || ((g = E(p, 'click', t[8])), (y = !0));
        },
        p(t, e) {
          (!d || 2 & e) && o.p(t[1]),
            t[5] && t[0]
              ? _
                ? (_.p(t, e), 33 & e && Z(_, 1))
                : ((_ = Fn(t)), _.c(), Z(_, 1), _.m(i, null))
              : _ &&
                (Q(),
                tt(_, 1, 1, () => {
                  _ = null;
                }),
                X()),
            (!d || 4 & e) && k(l, t[2]),
            t[0] || void 0 === t[6]
              ? S &&
                (Q(),
                tt(S, 1, 1, () => {
                  S = null;
                }),
                X())
              : S
              ? (S.p(t, e), 65 & e && Z(S, 1))
              : ((S = Yn(t)), S.c(), Z(S, 1), S.m(n, null));
          const r = {};
          8 & e && (r.icon = t[3]), h.$set(r);
        },
        i(t) {
          d || (Z(_), Z(S), Z(h.$$.fragment, t), (d = !0));
        },
        o(t) {
          tt(_), tt(S), tt(h.$$.fragment, t), (d = !1);
        },
        d(t) {
          t && m(e), _ && _.d(), S && S.d(), ot(h), (y = !1), g();
        },
      }
    );
  }
  function Rn(t) {
    let e, n, r;
    var i = t[4];
    return (
      i && (n = new i({})),
      {
        c() {
          (e = w('span')), n && rt(n.$$.fragment), P(e, 'slot', 'body');
        },
        m(t, i) {
          v(t, e, i), n && it(n, e, null), (r = !0);
        },
        p(t, r) {
          if (i !== (i = t[4])) {
            if (n) {
              Q();
              const t = n;
              tt(t.$$.fragment, 1, 0, () => {
                ot(t, 1);
              }),
                X();
            }
            i
              ? ((n = new i({})),
                rt(n.$$.fragment),
                Z(n.$$.fragment, 1),
                it(n, e, null))
              : (n = null);
          }
        },
        i(t) {
          r || (n && Z(n.$$.fragment, t), (r = !0));
        },
        o(t) {
          n && tt(n.$$.fragment, t), (r = !1);
        },
        d(t) {
          t && m(e), n && ot(n);
        },
      }
    );
  }
  function Bn(t) {
    let e, n, r;
    return (
      (n = new Pn({
        props: { $$slots: { body: [Rn], header: [Dn] }, $$scope: { ctx: t } },
      })),
      {
        c() {
          (e = w('div')), rt(n.$$.fragment);
        },
        m(t, i) {
          v(t, e, i), it(n, e, null), (r = !0);
        },
        p(t, [e]) {
          const r = {};
          639 & e && (r.$$scope = { dirty: e, ctx: t }), n.$set(r);
        },
        i(t) {
          r || (Z(n.$$.fragment, t), (r = !0));
        },
        o(t) {
          tt(n.$$.fragment, t), (r = !1);
        },
        d(t) {
          t && m(e), ot(n);
        },
      }
    );
  }
  function Hn(t, e, n) {
    let r, i, o, s, u, l, a;
    c(t, en, (t) => n(5, (l = t))), c(t, Qe, (t) => n(6, (a = t)));
    return (
      (t.$$.update = () => {
        1 & t.$$.dirty &&
          n(
            1,
            (i = r ? 'Settings' : 'Ethereum Next Block &mdash; Gas Estimation'),
          ),
          1 & t.$$.dirty &&
            n(2, (o = r ? '' : 'powered by the Blocknative Gas Platform API')),
          1 & t.$$.dirty && n(3, (s = r ? Vn : zn)),
          1 & t.$$.dirty && n(4, (u = r ? gn : hn));
      }),
      n(0, (r = !1)),
      [
        r,
        i,
        o,
        s,
        u,
        l,
        a,
        () => (t) => {
          Bt(t.target.checked).subscribe((t) => {
            Me(De, t);
          });
        },
        () => n(0, (r = !r)),
      ]
    );
  }
  new (class extends ut {
    constructor(t) {
      super(), ct(this, t, Hn, Bn, s, {});
    }
  })({ target: document.body });
})();
