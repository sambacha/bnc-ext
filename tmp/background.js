!(function () {
  'use strict';
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
    ***************************************************************************** */ var t =
    function (r, e) {
      return (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, r) {
            t.__proto__ = r;
          }) ||
        function (t, r) {
          for (var e in r) r.hasOwnProperty(e) && (t[e] = r[e]);
        })(r, e);
    };
  function r(r, e) {
    function n() {
      this.constructor = r;
    }
    t(r, e),
      (r.prototype =
        null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
  }
  var e = function () {
    return (e =
      Object.assign ||
      function (t) {
        for (var r, e = 1, n = arguments.length; e < n; e++)
          for (var i in (r = arguments[e]))
            Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
        return t;
      }).apply(this, arguments);
  };
  function n(t) {
    return 'function' == typeof t;
  }
  var i = !1,
    o = {
      Promise: void 0,
      set useDeprecatedSynchronousErrorHandling(t) {
        t && new Error().stack;
        i = t;
      },
      get useDeprecatedSynchronousErrorHandling() {
        return i;
      },
    };
  function s(t) {
    setTimeout(function () {
      throw t;
    }, 0);
  }
  var u = {
      closed: !0,
      next: function (t) {},
      error: function (t) {
        if (o.useDeprecatedSynchronousErrorHandling) throw t;
        s(t);
      },
      complete: function () {},
    },
    c = (function () {
      return (
        Array.isArray ||
        function (t) {
          return t && 'number' == typeof t.length;
        }
      );
    })();
  function h(t) {
    return null !== t && 'object' == typeof t;
  }
  var a = (function () {
      function t(t) {
        return (
          Error.call(this),
          (this.message = t
            ? t.length +
              ' errors occurred during unsubscription:\n' +
              t
                .map(function (t, r) {
                  return r + 1 + ') ' + t.toString();
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
    p = (function () {
      function t(t) {
        (this.closed = !1),
          (this._parentOrParents = null),
          (this._subscriptions = null),
          t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
      }
      return (
        (t.prototype.unsubscribe = function () {
          var r;
          if (!this.closed) {
            var e = this,
              i = e._parentOrParents,
              o = e._ctorUnsubscribe,
              s = e._unsubscribe,
              u = e._subscriptions;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              i instanceof t)
            )
              i.remove(this);
            else if (null !== i)
              for (var p = 0; p < i.length; ++p) {
                i[p].remove(this);
              }
            if (n(s)) {
              o && (this._unsubscribe = void 0);
              try {
                s.call(this);
              } catch (t) {
                r = t instanceof a ? f(t.errors) : [t];
              }
            }
            if (c(u)) {
              p = -1;
              for (var l = u.length; ++p < l; ) {
                var d = u[p];
                if (h(d))
                  try {
                    d.unsubscribe();
                  } catch (t) {
                    (r = r || []),
                      t instanceof a ? (r = r.concat(f(t.errors))) : r.push(t);
                  }
              }
            }
            if (r) throw new a(r);
          }
        }),
        (t.prototype.add = function (r) {
          var e = r;
          if (!r) return t.EMPTY;
          switch (typeof r) {
            case 'function':
              e = new t(r);
            case 'object':
              if (e === this || e.closed || 'function' != typeof e.unsubscribe)
                return e;
              if (this.closed) return e.unsubscribe(), e;
              if (!(e instanceof t)) {
                var n = e;
                (e = new t())._subscriptions = [n];
              }
              break;
            default:
              throw new Error(
                'unrecognized teardown ' + r + ' added to Subscription.',
              );
          }
          var i = e._parentOrParents;
          if (null === i) e._parentOrParents = this;
          else if (i instanceof t) {
            if (i === this) return e;
            e._parentOrParents = [i, this];
          } else {
            if (-1 !== i.indexOf(this)) return e;
            i.push(this);
          }
          var o = this._subscriptions;
          return null === o ? (this._subscriptions = [e]) : o.push(e), e;
        }),
        (t.prototype.remove = function (t) {
          var r = this._subscriptions;
          if (r) {
            var e = r.indexOf(t);
            -1 !== e && r.splice(e, 1);
          }
        }),
        (t.EMPTY = (function (t) {
          return (t.closed = !0), t;
        })(new t())),
        t
      );
    })();
  function f(t) {
    return t.reduce(function (t, r) {
      return t.concat(r instanceof a ? r.errors : r);
    }, []);
  }
  var l = (function () {
      return 'function' == typeof Symbol
        ? Symbol('rxSubscriber')
        : '@@rxSubscriber_' + Math.random();
    })(),
    d = (function (t) {
      function e(r, n, i) {
        var o = t.call(this) || this;
        switch (
          ((o.syncErrorValue = null),
          (o.syncErrorThrown = !1),
          (o.syncErrorThrowable = !1),
          (o.isStopped = !1),
          arguments.length)
        ) {
          case 0:
            o.destination = u;
            break;
          case 1:
            if (!r) {
              o.destination = u;
              break;
            }
            if ('object' == typeof r) {
              r instanceof e
                ? ((o.syncErrorThrowable = r.syncErrorThrowable),
                  (o.destination = r),
                  r.add(o))
                : ((o.syncErrorThrowable = !0), (o.destination = new b(o, r)));
              break;
            }
          default:
            (o.syncErrorThrowable = !0), (o.destination = new b(o, r, n, i));
        }
        return o;
      }
      return (
        r(e, t),
        (e.prototype[l] = function () {
          return this;
        }),
        (e.create = function (t, r, n) {
          var i = new e(t, r, n);
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
    })(p),
    b = (function (t) {
      function e(r, e, i, o) {
        var s,
          c = t.call(this) || this;
        c._parentSubscriber = r;
        var h = c;
        return (
          n(e)
            ? (s = e)
            : e &&
              ((s = e.next),
              (i = e.error),
              (o = e.complete),
              e !== u &&
                (n((h = Object.create(e)).unsubscribe) &&
                  c.add(h.unsubscribe.bind(h)),
                (h.unsubscribe = c.unsubscribe.bind(c)))),
          (c._context = h),
          (c._next = s),
          (c._error = i),
          (c._complete = o),
          c
        );
      }
      return (
        r(e, t),
        (e.prototype.next = function (t) {
          if (!this.isStopped && this._next) {
            var r = this._parentSubscriber;
            o.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable
              ? this.__tryOrSetError(r, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }),
        (e.prototype.error = function (t) {
          if (!this.isStopped) {
            var r = this._parentSubscriber,
              e = o.useDeprecatedSynchronousErrorHandling;
            if (this._error)
              e && r.syncErrorThrowable
                ? (this.__tryOrSetError(r, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (r.syncErrorThrowable)
              e ? ((r.syncErrorValue = t), (r.syncErrorThrown = !0)) : s(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), e)) throw t;
              s(t);
            }
          }
        }),
        (e.prototype.complete = function () {
          var t = this;
          if (!this.isStopped) {
            var r = this._parentSubscriber;
            if (this._complete) {
              var e = function () {
                return t._complete.call(t._context);
              };
              o.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable
                ? (this.__tryOrSetError(r, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }),
        (e.prototype.__tryOrUnsub = function (t, r) {
          try {
            t.call(this._context, r);
          } catch (t) {
            if ((this.unsubscribe(), o.useDeprecatedSynchronousErrorHandling))
              throw t;
            s(t);
          }
        }),
        (e.prototype.__tryOrSetError = function (t, r, e) {
          if (!o.useDeprecatedSynchronousErrorHandling)
            throw new Error('bad call');
          try {
            r.call(this._context, e);
          } catch (r) {
            return o.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (s(r), !0);
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
    })(d);
  var y = (function () {
    return ('function' == typeof Symbol && Symbol.observable) || '@@observable';
  })();
  function v(t) {
    return t;
  }
  function w(t) {
    return 0 === t.length
      ? v
      : 1 === t.length
      ? t[0]
      : function (r) {
          return t.reduce(function (t, r) {
            return r(t);
          }, r);
        };
  }
  var _ = (function () {
    function t(t) {
      (this._isScalar = !1), t && (this._subscribe = t);
    }
    return (
      (t.prototype.lift = function (r) {
        var e = new t();
        return (e.source = this), (e.operator = r), e;
      }),
      (t.prototype.subscribe = function (t, r, e) {
        var n = this.operator,
          i = (function (t, r, e) {
            if (t) {
              if (t instanceof d) return t;
              if (t[l]) return t[l]();
            }
            return t || r || e ? new d(t, r, e) : new d(u);
          })(t, r, e);
        if (
          (n
            ? i.add(n.call(i, this.source))
            : i.add(
                this.source ||
                  (o.useDeprecatedSynchronousErrorHandling &&
                    !i.syncErrorThrowable)
                  ? this._subscribe(i)
                  : this._trySubscribe(i),
              ),
          o.useDeprecatedSynchronousErrorHandling &&
            i.syncErrorThrowable &&
            ((i.syncErrorThrowable = !1), i.syncErrorThrown))
        )
          throw i.syncErrorValue;
        return i;
      }),
      (t.prototype._trySubscribe = function (t) {
        try {
          return this._subscribe(t);
        } catch (r) {
          o.useDeprecatedSynchronousErrorHandling &&
            ((t.syncErrorThrown = !0), (t.syncErrorValue = r)),
            !(function (t) {
              for (; t; ) {
                var r = t,
                  e = r.closed,
                  n = r.destination,
                  i = r.isStopped;
                if (e || i) return !1;
                t = n && n instanceof d ? n : null;
              }
              return !0;
            })(t)
              ? console.warn(r)
              : t.error(r);
        }
      }),
      (t.prototype.forEach = function (t, r) {
        var e = this;
        return new (r = m(r))(function (r, n) {
          var i;
          i = e.subscribe(
            function (r) {
              try {
                t(r);
              } catch (t) {
                n(t), i && i.unsubscribe();
              }
            },
            n,
            r,
          );
        });
      }),
      (t.prototype._subscribe = function (t) {
        var r = this.source;
        return r && r.subscribe(t);
      }),
      (t.prototype[y] = function () {
        return this;
      }),
      (t.prototype.pipe = function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return 0 === t.length ? this : w(t)(this);
      }),
      (t.prototype.toPromise = function (t) {
        var r = this;
        return new (t = m(t))(function (t, e) {
          var n;
          r.subscribe(
            function (t) {
              return (n = t);
            },
            function (t) {
              return e(t);
            },
            function () {
              return t(n);
            },
          );
        });
      }),
      (t.create = function (r) {
        return new t(r);
      }),
      t
    );
  })();
  function m(t) {
    if ((t || (t = Promise), !t)) throw new Error('no Promise impl found');
    return t;
  }
  var x = (function () {
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
    g = (function (t) {
      function e(r, e) {
        var n = t.call(this) || this;
        return (n.subject = r), (n.subscriber = e), (n.closed = !1), n;
      }
      return (
        r(e, t),
        (e.prototype.unsubscribe = function () {
          if (!this.closed) {
            this.closed = !0;
            var t = this.subject,
              r = t.observers;
            if (
              ((this.subject = null),
              r && 0 !== r.length && !t.isStopped && !t.closed)
            ) {
              var e = r.indexOf(this.subscriber);
              -1 !== e && r.splice(e, 1);
            }
          }
        }),
        e
      );
    })(p),
    S = (function (t) {
      function e(r) {
        var e = t.call(this, r) || this;
        return (e.destination = r), e;
      }
      return r(e, t), e;
    })(d),
    E = (function (t) {
      function e() {
        var r = t.call(this) || this;
        return (
          (r.observers = []),
          (r.closed = !1),
          (r.isStopped = !1),
          (r.hasError = !1),
          (r.thrownError = null),
          r
        );
      }
      return (
        r(e, t),
        (e.prototype[l] = function () {
          return new S(this);
        }),
        (e.prototype.lift = function (t) {
          var r = new O(this, this);
          return (r.operator = t), r;
        }),
        (e.prototype.next = function (t) {
          if (this.closed) throw new x();
          if (!this.isStopped)
            for (
              var r = this.observers, e = r.length, n = r.slice(), i = 0;
              i < e;
              i++
            )
              n[i].next(t);
        }),
        (e.prototype.error = function (t) {
          if (this.closed) throw new x();
          (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
          for (
            var r = this.observers, e = r.length, n = r.slice(), i = 0;
            i < e;
            i++
          )
            n[i].error(t);
          this.observers.length = 0;
        }),
        (e.prototype.complete = function () {
          if (this.closed) throw new x();
          this.isStopped = !0;
          for (
            var t = this.observers, r = t.length, e = t.slice(), n = 0;
            n < r;
            n++
          )
            e[n].complete();
          this.observers.length = 0;
        }),
        (e.prototype.unsubscribe = function () {
          (this.isStopped = !0), (this.closed = !0), (this.observers = null);
        }),
        (e.prototype._trySubscribe = function (r) {
          if (this.closed) throw new x();
          return t.prototype._trySubscribe.call(this, r);
        }),
        (e.prototype._subscribe = function (t) {
          if (this.closed) throw new x();
          return this.hasError
            ? (t.error(this.thrownError), p.EMPTY)
            : this.isStopped
            ? (t.complete(), p.EMPTY)
            : (this.observers.push(t), new g(this, t));
        }),
        (e.prototype.asObservable = function () {
          var t = new _();
          return (t.source = this), t;
        }),
        (e.create = function (t, r) {
          return new O(t, r);
        }),
        e
      );
    })(_),
    O = (function (t) {
      function e(r, e) {
        var n = t.call(this) || this;
        return (n.destination = r), (n.source = e), n;
      }
      return (
        r(e, t),
        (e.prototype.next = function (t) {
          var r = this.destination;
          r && r.next && r.next(t);
        }),
        (e.prototype.error = function (t) {
          var r = this.destination;
          r && r.error && this.destination.error(t);
        }),
        (e.prototype.complete = function () {
          var t = this.destination;
          t && t.complete && this.destination.complete();
        }),
        (e.prototype._subscribe = function (t) {
          return this.source ? this.source.subscribe(t) : p.EMPTY;
        }),
        e
      );
    })(E),
    j = (function (t) {
      function e(r) {
        var e = t.call(this) || this;
        return (e._value = r), e;
      }
      return (
        r(e, t),
        Object.defineProperty(e.prototype, 'value', {
          get: function () {
            return this.getValue();
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype._subscribe = function (r) {
          var e = t.prototype._subscribe.call(this, r);
          return e && !e.closed && r.next(this._value), e;
        }),
        (e.prototype.getValue = function () {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new x();
          return this._value;
        }),
        (e.prototype.next = function (r) {
          t.prototype.next.call(this, (this._value = r));
        }),
        e
      );
    })(E),
    P = (function (t) {
      function e(r, e) {
        var n = t.call(this, r, e) || this;
        return (n.scheduler = r), (n.work = e), (n.pending = !1), n;
      }
      return (
        r(e, t),
        (e.prototype.schedule = function (t, r) {
          if ((void 0 === r && (r = 0), this.closed)) return this;
          this.state = t;
          var e = this.id,
            n = this.scheduler;
          return (
            null != e && (this.id = this.recycleAsyncId(n, e, r)),
            (this.pending = !0),
            (this.delay = r),
            (this.id = this.id || this.requestAsyncId(n, this.id, r)),
            this
          );
        }),
        (e.prototype.requestAsyncId = function (t, r, e) {
          return void 0 === e && (e = 0), setInterval(t.flush.bind(t, this), e);
        }),
        (e.prototype.recycleAsyncId = function (t, r, e) {
          if (
            (void 0 === e && (e = 0),
            null !== e && this.delay === e && !1 === this.pending)
          )
            return r;
          clearInterval(r);
        }),
        (e.prototype.execute = function (t, r) {
          if (this.closed) return new Error('executing a cancelled action');
          this.pending = !1;
          var e = this._execute(t, r);
          if (e) return e;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }),
        (e.prototype._execute = function (t, r) {
          var e = !1,
            n = void 0;
          try {
            this.work(t);
          } catch (t) {
            (e = !0), (n = (!!t && t) || new Error(t));
          }
          if (e) return this.unsubscribe(), n;
        }),
        (e.prototype._unsubscribe = function () {
          var t = this.id,
            r = this.scheduler,
            e = r.actions,
            n = e.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== n && e.splice(n, 1),
            null != t && (this.id = this.recycleAsyncId(r, t, null)),
            (this.delay = null);
        }),
        e
      );
    })(
      (function (t) {
        function e(r, e) {
          return t.call(this) || this;
        }
        return (
          r(e, t),
          (e.prototype.schedule = function (t, r) {
            return this;
          }),
          e
        );
      })(p),
    ),
    T = (function () {
      function t(r, e) {
        void 0 === e && (e = t.now), (this.SchedulerAction = r), (this.now = e);
      }
      return (
        (t.prototype.schedule = function (t, r, e) {
          return (
            void 0 === r && (r = 0),
            new this.SchedulerAction(this, t).schedule(e, r)
          );
        }),
        (t.now = function () {
          return Date.now();
        }),
        t
      );
    })(),
    I = (function (t) {
      function e(r, n) {
        void 0 === n && (n = T.now);
        var i =
          t.call(this, r, function () {
            return e.delegate && e.delegate !== i ? e.delegate.now() : n();
          }) || this;
        return (i.actions = []), (i.active = !1), (i.scheduled = void 0), i;
      }
      return (
        r(e, t),
        (e.prototype.schedule = function (r, n, i) {
          return (
            void 0 === n && (n = 0),
            e.delegate && e.delegate !== this
              ? e.delegate.schedule(r, n, i)
              : t.prototype.schedule.call(this, r, n, i)
          );
        }),
        (e.prototype.flush = function (t) {
          var r = this.actions;
          if (this.active) r.push(t);
          else {
            var e;
            this.active = !0;
            do {
              if ((e = t.execute(t.state, t.delay))) break;
            } while ((t = r.shift()));
            if (((this.active = !1), e)) {
              for (; (t = r.shift()); ) t.unsubscribe();
              throw e;
            }
          }
        }),
        e
      );
    })(T),
    N = new _(function (t) {
      return t.complete();
    });
  function A(t) {
    return t
      ? (function (t) {
          return new _(function (r) {
            return t.schedule(function () {
              return r.complete();
            });
          });
        })(t)
      : N;
  }
  function C(t) {
    return t && 'function' == typeof t.schedule;
  }
  var k = function (t) {
    return function (r) {
      for (var e = 0, n = t.length; e < n && !r.closed; e++) r.next(t[e]);
      r.complete();
    };
  };
  function V(t, r) {
    return new _(function (e) {
      var n = new p(),
        i = 0;
      return (
        n.add(
          r.schedule(function () {
            i !== t.length
              ? (e.next(t[i++]), e.closed || n.add(this.schedule()))
              : e.complete();
          }),
        ),
        n
      );
    });
  }
  function D(t, r) {
    return r ? V(t, r) : new _(k(t));
  }
  function H() {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    var e = t[t.length - 1];
    return C(e) ? (t.pop(), V(t, e)) : D(t);
  }
  var Y = new I(P);
  function F() {}
  function R(t, r) {
    return function (e) {
      if ('function' != typeof t)
        throw new TypeError(
          'argument is not a function. Are you looking for `mapTo()`?',
        );
      return e.lift(new U(t, r));
    };
  }
  var U = (function () {
      function t(t, r) {
        (this.project = t), (this.thisArg = r);
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new B(t, this.project, this.thisArg));
        }),
        t
      );
    })(),
    B = (function (t) {
      function e(r, e, n) {
        var i = t.call(this, r) || this;
        return (i.project = e), (i.count = 0), (i.thisArg = n || i), i;
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          var r;
          try {
            r = this.project.call(this.thisArg, t, this.count++);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(r);
        }),
        e
      );
    })(d),
    M = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        r(e, t),
        (e.prototype.notifyNext = function (t, r, e, n, i) {
          this.destination.next(r);
        }),
        (e.prototype.notifyError = function (t, r) {
          this.destination.error(t);
        }),
        (e.prototype.notifyComplete = function (t) {
          this.destination.complete();
        }),
        e
      );
    })(d),
    G = (function (t) {
      function e(r, e, n) {
        var i = t.call(this) || this;
        return (
          (i.parent = r),
          (i.outerValue = e),
          (i.outerIndex = n),
          (i.index = 0),
          i
        );
      }
      return (
        r(e, t),
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
    })(d);
  function L() {
    return 'function' == typeof Symbol && Symbol.iterator
      ? Symbol.iterator
      : '@@iterator';
  }
  var q = L(),
    z = function (t) {
      return t && 'number' == typeof t.length && 'function' != typeof t;
    };
  function $(t) {
    return (
      !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then
    );
  }
  var K = function (t) {
    if (t && 'function' == typeof t[y])
      return (
        (n = t),
        function (t) {
          var r = n[y]();
          if ('function' != typeof r.subscribe)
            throw new TypeError(
              'Provided object does not correctly implement Symbol.observable',
            );
          return r.subscribe(t);
        }
      );
    if (z(t)) return k(t);
    if ($(t))
      return (
        (e = t),
        function (t) {
          return (
            e
              .then(
                function (r) {
                  t.closed || (t.next(r), t.complete());
                },
                function (r) {
                  return t.error(r);
                },
              )
              .then(null, s),
            t
          );
        }
      );
    if (t && 'function' == typeof t[q])
      return (
        (r = t),
        function (t) {
          for (var e = r[q](); ; ) {
            var n = void 0;
            try {
              n = e.next();
            } catch (r) {
              return t.error(r), t;
            }
            if (n.done) {
              t.complete();
              break;
            }
            if ((t.next(n.value), t.closed)) break;
          }
          return (
            'function' == typeof e.return &&
              t.add(function () {
                e.return && e.return();
              }),
            t
          );
        }
      );
    var r,
      e,
      n,
      i = h(t) ? 'an invalid object' : "'" + t + "'";
    throw new TypeError(
      'You provided ' +
        i +
        ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.',
    );
  };
  function J(t, r, e, n, i) {
    if ((void 0 === i && (i = new G(t, e, n)), !i.closed))
      return r instanceof _ ? r.subscribe(i) : K(r)(i);
  }
  function Q(t, r) {
    if (null != t) {
      if (
        (function (t) {
          return t && 'function' == typeof t[y];
        })(t)
      )
        return (function (t, r) {
          return new _(function (e) {
            var n = new p();
            return (
              n.add(
                r.schedule(function () {
                  var i = t[y]();
                  n.add(
                    i.subscribe({
                      next: function (t) {
                        n.add(
                          r.schedule(function () {
                            return e.next(t);
                          }),
                        );
                      },
                      error: function (t) {
                        n.add(
                          r.schedule(function () {
                            return e.error(t);
                          }),
                        );
                      },
                      complete: function () {
                        n.add(
                          r.schedule(function () {
                            return e.complete();
                          }),
                        );
                      },
                    }),
                  );
                }),
              ),
              n
            );
          });
        })(t, r);
      if ($(t))
        return (function (t, r) {
          return new _(function (e) {
            var n = new p();
            return (
              n.add(
                r.schedule(function () {
                  return t.then(
                    function (t) {
                      n.add(
                        r.schedule(function () {
                          e.next(t),
                            n.add(
                              r.schedule(function () {
                                return e.complete();
                              }),
                            );
                        }),
                      );
                    },
                    function (t) {
                      n.add(
                        r.schedule(function () {
                          return e.error(t);
                        }),
                      );
                    },
                  );
                }),
              ),
              n
            );
          });
        })(t, r);
      if (z(t)) return V(t, r);
      if (
        (function (t) {
          return t && 'function' == typeof t[q];
        })(t) ||
        'string' == typeof t
      )
        return (function (t, r) {
          if (!t) throw new Error('Iterable cannot be null');
          return new _(function (e) {
            var n,
              i = new p();
            return (
              i.add(function () {
                n && 'function' == typeof n.return && n.return();
              }),
              i.add(
                r.schedule(function () {
                  (n = t[q]()),
                    i.add(
                      r.schedule(function () {
                        if (!e.closed) {
                          var t, r;
                          try {
                            var i = n.next();
                            (t = i.value), (r = i.done);
                          } catch (t) {
                            return void e.error(t);
                          }
                          r ? e.complete() : (e.next(t), this.schedule());
                        }
                      }),
                    );
                }),
              ),
              i
            );
          });
        })(t, r);
    }
    throw new TypeError(((null !== t && typeof t) || t) + ' is not observable');
  }
  function W(t, r) {
    return r ? Q(t, r) : t instanceof _ ? t : new _(K(t));
  }
  var X = (function (t) {
      function e(r) {
        var e = t.call(this) || this;
        return (e.parent = r), e;
      }
      return (
        r(e, t),
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
    })(d),
    Z = (function (t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        r(e, t),
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
    })(d);
  function tt(t, r) {
    if (!r.closed) return t instanceof _ ? t.subscribe(r) : K(t)(r);
  }
  function rt(t, r, e) {
    return (
      void 0 === e && (e = Number.POSITIVE_INFINITY),
      'function' == typeof r
        ? function (n) {
            return n.pipe(
              rt(function (e, n) {
                return W(t(e, n)).pipe(
                  R(function (t, i) {
                    return r(e, t, n, i);
                  }),
                );
              }, e),
            );
          }
        : ('number' == typeof r && (e = r),
          function (r) {
            return r.lift(new et(t, e));
          })
    );
  }
  var et = (function () {
      function t(t, r) {
        void 0 === r && (r = Number.POSITIVE_INFINITY),
          (this.project = t),
          (this.concurrent = r);
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new nt(t, this.project, this.concurrent));
        }),
        t
      );
    })(),
    nt = (function (t) {
      function e(r, e, n) {
        void 0 === n && (n = Number.POSITIVE_INFINITY);
        var i = t.call(this, r) || this;
        return (
          (i.project = e),
          (i.concurrent = n),
          (i.hasCompleted = !1),
          (i.buffer = []),
          (i.active = 0),
          (i.index = 0),
          i
        );
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }),
        (e.prototype._tryNext = function (t) {
          var r,
            e = this.index++;
          try {
            r = this.project(t, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.active++, this._innerSub(r);
        }),
        (e.prototype._innerSub = function (t) {
          var r = new X(this),
            e = this.destination;
          e.add(r);
          var n = tt(t, r);
          n !== r && e.add(n);
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
    })(Z);
  function it(t) {
    return void 0 === t && (t = Number.POSITIVE_INFINITY), rt(v, t);
  }
  function ot(t) {
    return !c(t) && t - parseFloat(t) + 1 >= 0;
  }
  function st(t) {
    var r = t.subscriber,
      e = t.counter,
      n = t.period;
    r.next(e), this.schedule({ subscriber: r, counter: e + 1, period: n }, n);
  }
  function ut(t, r) {
    return function (e) {
      return e.lift(new ct(t, r));
    };
  }
  var ct = (function () {
      function t(t, r) {
        (this.predicate = t), (this.thisArg = r);
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new ht(t, this.predicate, this.thisArg));
        }),
        t
      );
    })(),
    ht = (function (t) {
      function e(r, e, n) {
        var i = t.call(this, r) || this;
        return (i.predicate = e), (i.thisArg = n), (i.count = 0), i;
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          var r;
          try {
            r = this.predicate.call(this.thisArg, t, this.count++);
          } catch (t) {
            return void this.destination.error(t);
          }
          r && this.destination.next(t);
        }),
        e
      );
    })(d);
  function at(t) {
    var r = t.index,
      e = t.period,
      n = t.subscriber;
    if ((n.next(r), !n.closed)) {
      if (-1 === e) return n.complete();
      (t.index = r + 1), this.schedule(t, e);
    }
  }
  var pt = (function () {
      function t(t) {
        this.closingSelector = t;
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new ft(t, this.closingSelector));
        }),
        t
      );
    })(),
    ft = (function (t) {
      function e(r, e) {
        var n = t.call(this, r) || this;
        return (n.closingSelector = e), (n.subscribing = !1), n.openBuffer(), n;
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          this.buffer.push(t);
        }),
        (e.prototype._complete = function () {
          var r = this.buffer;
          r && this.destination.next(r), t.prototype._complete.call(this);
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
          var r,
            e = this.buffer;
          this.buffer && this.destination.next(e), (this.buffer = []);
          try {
            r = (0, this.closingSelector)();
          } catch (t) {
            return this.error(t);
          }
          (t = new p()),
            (this.closingSubscription = t),
            this.add(t),
            (this.subscribing = !0),
            t.add(tt(r, new X(this))),
            (this.subscribing = !1);
        }),
        e
      );
    })(Z);
  var lt = (function () {
      function t(t) {
        this.selector = t;
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new dt(t, this.selector, this.caught));
        }),
        t
      );
    })(),
    dt = (function (t) {
      function e(r, e, n) {
        var i = t.call(this, r) || this;
        return (i.selector = e), (i.caught = n), i;
      }
      return (
        r(e, t),
        (e.prototype.error = function (r) {
          if (!this.isStopped) {
            var e = void 0;
            try {
              e = this.selector(r, this.caught);
            } catch (r) {
              return void t.prototype.error.call(this, r);
            }
            this._unsubscribeAndRecycle();
            var n = new X(this);
            this.add(n);
            var i = tt(e, n);
            i !== n && this.add(i);
          }
        }),
        e
      );
    })(Z);
  var bt = (function () {
      function t(t) {
        this.project = t;
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new yt(t, this.project));
        }),
        t
      );
    })(),
    yt = (function (t) {
      function e(r, e) {
        var n = t.call(this, r) || this;
        return (
          (n.project = e),
          (n.hasSubscription = !1),
          (n.hasCompleted = !1),
          (n.index = 0),
          n
        );
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          this.hasSubscription || this.tryNext(t);
        }),
        (e.prototype.tryNext = function (t) {
          var r,
            e = this.index++;
          try {
            r = this.project(t, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          (this.hasSubscription = !0), this._innerSub(r);
        }),
        (e.prototype._innerSub = function (t) {
          var r = new X(this),
            e = this.destination;
          e.add(r);
          var n = tt(t, r);
          n !== r && e.add(n);
        }),
        (e.prototype._complete = function () {
          (this.hasCompleted = !0),
            this.hasSubscription || this.destination.complete(),
            this.unsubscribe();
        }),
        (e.prototype.notifyNext = function (t) {
          this.destination.next(t);
        }),
        (e.prototype.notifyError = function (t) {
          this.destination.error(t);
        }),
        (e.prototype.notifyComplete = function () {
          (this.hasSubscription = !1),
            this.hasCompleted && this.destination.complete();
        }),
        e
      );
    })(Z);
  var vt = (function () {
      function t(t) {
        this.value = t;
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new wt(t, this.value));
        }),
        t
      );
    })(),
    wt = (function (t) {
      function e(r, e) {
        var n = t.call(this, r) || this;
        return (n.value = e), n;
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          this.destination.next(this.value);
        }),
        e
      );
    })(d);
  function _t() {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    var e = t.length;
    if (0 === e) throw new Error('list of properties cannot be empty.');
    return function (r) {
      return R(mt(t, e))(r);
    };
  }
  function mt(t, r) {
    return function (e) {
      for (var n = e, i = 0; i < r; i++) {
        var o = null != n ? n[t[i]] : void 0;
        if (void 0 === o) return;
        n = o;
      }
      return n;
    };
  }
  var xt = (function () {
      function t(t, r) {
        (this.count = t), (this.source = r);
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new gt(t, this.count, this.source));
        }),
        t
      );
    })(),
    gt = (function (t) {
      function e(r, e, n) {
        var i = t.call(this, r) || this;
        return (i.count = e), (i.source = n), i;
      }
      return (
        r(e, t),
        (e.prototype.complete = function () {
          if (!this.isStopped) {
            var r = this.source,
              e = this.count;
            if (0 === e) return t.prototype.complete.call(this);
            e > -1 && (this.count = e - 1),
              r.subscribe(this._unsubscribeAndRecycle());
          }
        }),
        e
      );
    })(d);
  function St(t, r) {
    return 'function' == typeof r
      ? function (e) {
          return e.pipe(
            St(function (e, n) {
              return W(t(e, n)).pipe(
                R(function (t, i) {
                  return r(e, t, n, i);
                }),
              );
            }),
          );
        }
      : function (r) {
          return r.lift(new Et(t));
        };
  }
  var Et = (function () {
      function t(t) {
        this.project = t;
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new Ot(t, this.project));
        }),
        t
      );
    })(),
    Ot = (function (t) {
      function e(r, e) {
        var n = t.call(this, r) || this;
        return (n.project = e), (n.index = 0), n;
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          var r,
            e = this.index++;
          try {
            r = this.project(t, e);
          } catch (t) {
            return void this.destination.error(t);
          }
          this._innerSub(r);
        }),
        (e.prototype._innerSub = function (t) {
          var r = this.innerSubscription;
          r && r.unsubscribe();
          var e = new X(this),
            n = this.destination;
          n.add(e),
            (this.innerSubscription = tt(t, e)),
            this.innerSubscription !== e && n.add(this.innerSubscription);
        }),
        (e.prototype._complete = function () {
          var r = this.innerSubscription;
          (r && !r.closed) || t.prototype._complete.call(this),
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
    })(Z);
  var jt = (function () {
      function t(t, r) {
        (this.predicate = t), (this.inclusive = r);
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new Pt(t, this.predicate, this.inclusive));
        }),
        t
      );
    })(),
    Pt = (function (t) {
      function e(r, e, n) {
        var i = t.call(this, r) || this;
        return (i.predicate = e), (i.inclusive = n), (i.index = 0), i;
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          var r,
            e = this.destination;
          try {
            r = this.predicate(t, this.index++);
          } catch (t) {
            return void e.error(t);
          }
          this.nextOrComplete(t, r);
        }),
        (e.prototype.nextOrComplete = function (t, r) {
          var e = this.destination;
          Boolean(r) ? e.next(t) : (this.inclusive && e.next(t), e.complete());
        }),
        e
      );
    })(d);
  var Tt = (function () {
      function t(t, r, e) {
        (this.nextOrObserver = t), (this.error = r), (this.complete = e);
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(
            new It(t, this.nextOrObserver, this.error, this.complete),
          );
        }),
        t
      );
    })(),
    It = (function (t) {
      function e(r, e, i, o) {
        var s = t.call(this, r) || this;
        return (
          (s._tapNext = F),
          (s._tapError = F),
          (s._tapComplete = F),
          (s._tapError = i || F),
          (s._tapComplete = o || F),
          n(e)
            ? ((s._context = s), (s._tapNext = e))
            : e &&
              ((s._context = e),
              (s._tapNext = e.next || F),
              (s._tapError = e.error || F),
              (s._tapComplete = e.complete || F)),
          s
        );
      }
      return (
        r(e, t),
        (e.prototype._next = function (t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(t);
        }),
        (e.prototype._error = function (t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }),
        (e.prototype._complete = function () {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }),
        e
      );
    })(d);
  function Nt() {
    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
    return function (r) {
      var e;
      'function' == typeof t[t.length - 1] && (e = t.pop());
      var n = t;
      return r.lift(new At(n, e));
    };
  }
  var At = (function () {
      function t(t, r) {
        (this.observables = t), (this.project = r);
      }
      return (
        (t.prototype.call = function (t, r) {
          return r.subscribe(new Ct(t, this.observables, this.project));
        }),
        t
      );
    })(),
    Ct = (function (t) {
      function e(r, e, n) {
        var i = t.call(this, r) || this;
        (i.observables = e), (i.project = n), (i.toRespond = []);
        var o = e.length;
        i.values = new Array(o);
        for (var s = 0; s < o; s++) i.toRespond.push(s);
        for (s = 0; s < o; s++) {
          var u = e[s];
          i.add(J(i, u, void 0, s));
        }
        return i;
      }
      return (
        r(e, t),
        (e.prototype.notifyNext = function (t, r, e) {
          this.values[e] = r;
          var n = this.toRespond;
          if (n.length > 0) {
            var i = n.indexOf(e);
            -1 !== i && n.splice(i, 1);
          }
        }),
        (e.prototype.notifyComplete = function () {}),
        (e.prototype._next = function (t) {
          if (0 === this.toRespond.length) {
            var r = [t].concat(this.values);
            this.project ? this._tryProject(r) : this.destination.next(r);
          }
        }),
        (e.prototype._tryProject = function (t) {
          var r;
          try {
            r = this.project.apply(this, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.next(r);
        }),
        e
      );
    })(M);
  function kt(t, r) {
    void 0 === r && (r = {});
    var n = r.selector,
      i = (function (t, r) {
        var e = {};
        for (var n in t)
          Object.prototype.hasOwnProperty.call(t, n) &&
            r.indexOf(n) < 0 &&
            (e[n] = t[n]);
        if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (n = Object.getOwnPropertySymbols(t); i < n.length; i++)
            r.indexOf(n[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(t, n[i]) &&
              (e[n[i]] = t[n[i]]);
        }
        return e;
      })(r, ['selector']);
    return new _(function (r) {
      var o,
        s = new AbortController(),
        u = s.signal,
        c = !0,
        h = !1,
        a = new p();
      if (
        (a.add(function () {
          (h = !0), c && s.abort();
        }),
        i)
      ) {
        if (i.signal)
          if (i.signal.aborted) s.abort();
          else {
            var f = i.signal,
              l = function () {
                u.aborted || s.abort();
              };
            f.addEventListener('abort', l),
              a.add(function () {
                return f.removeEventListener('abort', l);
              });
          }
        o = e({}, i, { signal: u });
      } else o = { signal: u };
      return (
        fetch(t, o)
          .then(function (t) {
            n
              ? a.add(
                  W(n(t)).subscribe(
                    function (t) {
                      return r.next(t);
                    },
                    function (t) {
                      (c = !1), h || r.error(t);
                    },
                    function () {
                      (c = !1), r.complete();
                    },
                  ),
                )
              : ((c = !1), r.next(t), r.complete());
          })
          .catch(function (t) {
            (c = !1), h || r.error(t);
          }),
        a
      );
    });
  }
  const Vt = (t, r, e = 'local') => chrome.storage[e].set({ [t]: r }),
    Dt = 'gasPrices',
    Ht = 'pollRate',
    Yt = 'badgeValue',
    Ft = {
      estimatedPrices: [99, 95, 90, 80, 70].map((t) => ({
        confidence: t,
        price: null,
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
      })),
      baseFeePerGas: null,
      blockNumber: null,
      estimatedTransactionCount: null,
    },
    Rt = new E();
  var Ut, Bt;
  Rt.pipe(
    ((Bt = () => {
      return (
        void 0 === (t = 15e3) && (t = 0),
        void 0 === r && (r = Y),
        (!ot(t) || t < 0) && (t = 0),
        (r && 'function' == typeof r.schedule) || (r = Y),
        new _(function (e) {
          return (
            e.add(r.schedule(st, t, { subscriber: e, counter: 0, period: t })),
            e
          );
        })
      );
      var t, r;
    }),
    function (t) {
      return t.lift(new pt(Bt));
    }),
    ut((t) => t && t.length > 1),
    ((Ut = !0),
    function (t) {
      return t.lift(new vt(Ut));
    }),
  ).subscribe(() => Vt(Ht, 5e3));
  const Mt = (t) => {
      return kt(
        t
          ? 'https://api.blocknative.com/gasprices/blockprices'
          : 'https://blocknative-api.herokuapp.com/data',
        { headers: { Authorization: t } },
      ).pipe(
        St((t) => {
          return t.ok
            ? t.json()
            : H({
                error: !0,
                message: `Error ${t.status}`,
                status: t.status,
              }).pipe(
                ut(({ status: t }) => 429 === t),
                ((r = () => {
                  Rt.next();
                }),
                function (t) {
                  return t.lift(new Tt(r, e, n));
                }),
              );
          var r, e, n;
        }),
        ((r = (t) => H({ error: !0, message: t.message })),
        function (t) {
          var e = new lt(r),
            n = t.lift(e);
          return (e.caught = n);
        }),
        ut((t) => !t.error),
        R((r) =>
          t
            ? r.blockPrices[0]
            : Object.assign(
                {
                  blockNumber: r.pendingBlockNumberVal,
                  estimatedTransactionCount: r.estimatedTransactions,
                },
                r,
              ),
        ),
      );
      var r;
    },
    Gt = (function t(r, e, i) {
      return i
        ? t(r, e).pipe(
            R(function (t) {
              return c(t) ? i.apply(void 0, t) : i(t);
            }),
          )
        : new _(function (t) {
            var i,
              o = function () {
                for (var r = [], e = 0; e < arguments.length; e++)
                  r[e] = arguments[e];
                return t.next(1 === r.length ? r[0] : r);
              };
            try {
              i = r(o);
            } catch (r) {
              return void t.error(r);
            }
            if (n(e))
              return function () {
                return e(o, i);
              };
          });
    })(
      (t) => chrome.storage.onChanged.addListener(t),
      (t) => chrome.storage.onChanged.removeListener(t),
    ).pipe(_t('0')),
    Lt = (t, r) =>
      (function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        var e = Number.POSITIVE_INFINITY,
          n = null,
          i = t[t.length - 1];
        return (
          C(i)
            ? ((n = t.pop()),
              t.length > 1 &&
                'number' == typeof t[t.length - 1] &&
                (e = t.pop()))
            : 'number' == typeof i && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof _
            ? t[0]
            : it(e)(D(t, n))
        );
      })(
        new _((e) => {
          chrome.storage.local.get({ [t]: r }, e.next.bind(e));
        }).pipe(_t(t)),
        Gt.pipe(
          ut((r) => t in r),
          _t(t, 'newValue'),
        ),
      ),
    qt = Lt(Ht, 5e3).pipe(
      St((t) => {
        return (function (t, r, e) {
          void 0 === t && (t = 0);
          var n = -1;
          return (
            ot(r) ? (n = Number(r) < 1 ? 1 : Number(r)) : C(r) && (e = r),
            C(e) || (e = Y),
            new _(function (r) {
              var i = ot(t) ? t : +t - e.now();
              return e.schedule(at, i, { index: 0, period: n, subscriber: r });
            })
          );
        })(0, t / 100).pipe(
          ((e = (t) => t < 101),
          void 0 === n && (n = !1),
          function (t) {
            return t.lift(new jt(e, n));
          }),
          (void 0 === r && (r = -1),
          function (t) {
            return 0 === r
              ? A()
              : r < 0
              ? t.lift(new xt(-1, t))
              : t.lift(new xt(r - 1, t));
          }),
        );
        var r, e, n;
      }),
    );
  Lt('progress', 0);
  const zt = Lt('eip1559', !0),
    $t = Lt('apiKey', ''),
    Kt = Lt(Dt, Ft),
    Jt = Lt('selectedConf', 90);
  Kt.pipe(
    Nt(Jt, zt),
    ut(([t]) => !!t),
    R(([t, r, e]) => {
      var n;
      return e
        ? [{ price: Math.round(null == t ? void 0 : t.baseFeePerGas) }]
        : null === (n = null == t ? void 0 : t.estimatedPrices) || void 0 === n
        ? void 0
        : n.filter(({ confidence: t }) => t === r);
    }),
    _t('0'),
    _t('price'),
  ).subscribe((t) => Vt(Yt, t));
  const Qt = Lt(Yt, null);
  new j(''),
    qt.subscribe((t) => Vt('progress', t)),
    qt
      .pipe(
        ut((t) => 0 === t),
        Nt($t),
        (function t(r, e) {
          return e
            ? function (n) {
                return n.pipe(
                  t(function (t, n) {
                    return W(r(t, n)).pipe(
                      R(function (r, i) {
                        return e(t, r, n, i);
                      }),
                    );
                  }),
                );
              }
            : function (t) {
                return t.lift(new bt(r));
              };
        })(([, t]) => Mt(t)),
      )
      .subscribe((t) => Vt(Dt, t)),
    Qt.pipe(ut((t) => !!t)).subscribe((t) =>
      chrome.browserAction.setBadgeText({ text: `${t}` }),
    );
})();
