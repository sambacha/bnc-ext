(function() {
  'use strict';
  function r(r, e) {
    function n() {
      this.constructor = r;
    }
    t(r, e);
    r.prototype =
      e === null ? Object.create(e) : ((n.prototype = e.prototype), new n());
  }
  function n(t) {
    return typeof t == 'function';
  }
  function s(t) {
    setTimeout(function() {
      throw t;
    }, 0);
  }
  function h(t) {
    return t !== null && typeof t == 'object';
  }
  function f(t) {
    return t.reduce(function(t, r) {
      return t.concat(r instanceof a ? r.errors : r);
    }, []);
  }
  function v(t) {
    return t;
  }
  function w(t) {
    if (t.length === 0) {
      return v;
    } else if (t.length === 1) {
      return t[0];
    } else {
      return function(r) {
        return t.reduce(function(t, r) {
          return r(t);
        }, r);
      };
    }
  }
  function m(t) {
    if (!t) {
      t = Promise;
    }
    if (!t) {
      throw new Error('no Promise impl found');
    }
    return t;
  }
  function A(t) {
    if (t) {
      return (function(t) {
        return new _(function(r) {
          return t.schedule(function() {
            return r.complete();
          });
        });
      })(t);
    } else {
      return N;
    }
  }
  function C(t) {
    return t && typeof t.schedule == 'function';
  }
  function V(t, r) {
    return new _(function(e) {
      var n = new p();
      var i = 0;
      n.add(
        r.schedule(function() {
          if (i === t.length) {
            e.complete();
          } else {
            e.next(t[i++]);
            if (!e.closed) {
              n.add(this.schedule());
            }
          }
        })
      );
      return n;
    });
  }
  function D(t, r) {
    if (r) {
      return V(t, r);
    } else {
      return new _(k(t));
    }
  }
  function H() {
    var t = [];
    for (var r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    var e = t[t.length - 1];
    if (C(e)) {
      t.pop();
      return V(t, e);
    } else {
      return D(t);
    }
  }
  function F() {}
  function R(t, r) {
    return function(e) {
      if (typeof t != 'function') {
        throw new TypeError(
          'argument is not a function. Are you looking for `mapTo()`?'
        );
      }
      return e.lift(new U(t, r));
    };
  }
  function L() {
    if (typeof Symbol == 'function' && Symbol.iterator) {
      return Symbol.iterator;
    } else {
      return '@@iterator';
    }
  }
  function $(t) {
    return (
      !!t && typeof t.subscribe != 'function' && typeof t.then == 'function'
    );
  }
  function J(t, r, e, n, i) {
    if (i === void 0) {
      i = new G(t, e, n);
    }
    if (!i.closed) {
      if (r instanceof _) {
        return r.subscribe(i);
      } else {
        return K(r)(i);
      }
    }
  }
  function Q(t, r) {
    if (t != null) {
      if (
        (function(t) {
          return t && typeof t[y] == 'function';
        })(t)
      ) {
        return (function(t, r) {
          return new _(function(e) {
            var n = new p();
            n.add(
              r.schedule(function() {
                var i = t[y]();
                n.add(
                  i.subscribe({
                    next: function(t) {
                      n.add(
                        r.schedule(function() {
                          return e.next(t);
                        })
                      );
                    },
                    error: function(t) {
                      n.add(
                        r.schedule(function() {
                          return e.error(t);
                        })
                      );
                    },
                    complete: function() {
                      n.add(
                        r.schedule(function() {
                          return e.complete();
                        })
                      );
                    },
                  })
                );
              })
            );
            return n;
          });
        })(t, r);
      }
      if ($(t)) {
        return (function(t, r) {
          return new _(function(e) {
            var n = new p();
            n.add(
              r.schedule(function() {
                return t.then(
                  function(t) {
                    n.add(
                      r.schedule(function() {
                        e.next(t);
                        n.add(
                          r.schedule(function() {
                            return e.complete();
                          })
                        );
                      })
                    );
                  },
                  function(t) {
                    n.add(
                      r.schedule(function() {
                        return e.error(t);
                      })
                    );
                  }
                );
              })
            );
            return n;
          });
        })(t, r);
      }
      if (z(t)) {
        return V(t, r);
      }
      if (
        (function(t) {
          return t && typeof t[q] == 'function';
        })(t) ||
        typeof t == 'string'
      ) {
        return (function(t, r) {
          if (!t) {
            throw new Error('Iterable cannot be null');
          }
          return new _(function(e) {
            var n;
            var i = new p();
            i.add(function() {
              if (n && typeof n.return == 'function') {
                n.return();
              }
            });
            i.add(
              r.schedule(function() {
                n = t[q]();
                i.add(
                  r.schedule(function() {
                    if (!e.closed) {
                      var t;
                      var r;
                      try {
                        var i = n.next();
                        t = i.value;
                        r = i.done;
                      } catch (t) {
                        e.error(t);
                        return;
                      }
                      if (r) {
                        e.complete();
                      } else {
                        e.next(t);
                        this.schedule();
                      }
                    }
                  })
                );
              })
            );
            return i;
          });
        })(t, r);
      }
    }
    throw new TypeError(((t !== null && typeof t) || t) + ' is not observable');
  }
  function W(t, r) {
    if (r) {
      return Q(t, r);
    } else if (t instanceof _) {
      return t;
    } else {
      return new _(K(t));
    }
  }
  function tt(t, r) {
    if (!r.closed) {
      if (t instanceof _) {
        return t.subscribe(r);
      } else {
        return K(t)(r);
      }
    }
  }
  function rt(t, r, e) {
    if (e === void 0) {
      e = Number.POSITIVE_INFINITY;
    }
    if (typeof r == 'function') {
      return function(n) {
        return n.pipe(
          rt(function(e, n) {
            return W(t(e, n)).pipe(
              R(function(t, i) {
                return r(e, t, n, i);
              })
            );
          }, e)
        );
      };
    } else {
      if (typeof r == 'number') {
        e = r;
      }
      return function(r) {
        return r.lift(new et(t, e));
      };
    }
  }
  function it(t) {
    if (t === void 0) {
      t = Number.POSITIVE_INFINITY;
    }
    return rt(v, t);
  }
  function ot(t) {
    return !c(t) && t - parseFloat(t) + 1 >= 0;
  }
  function st(t) {
    var r = t.subscriber;
    var e = t.counter;
    var n = t.period;
    r.next(e);
    this.schedule({ subscriber: r, counter: e + 1, period: n }, n);
  }
  function ut(t, r) {
    return function(e) {
      return e.lift(new ct(t, r));
    };
  }
  function at(t) {
    var r = t.index;
    var e = t.period;
    var n = t.subscriber;
    n.next(r);
    if (!n.closed) {
      if (e === -1) {
        return n.complete();
      }
      t.index = r + 1;
      this.schedule(t, e);
    }
  }
  function _t() {
    var t = [];
    for (var r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    var e = t.length;
    if (e === 0) {
      throw new Error('list of properties cannot be empty.');
    }
    return function(r) {
      return R(mt(t, e))(r);
    };
  }
  function mt(t, r) {
    return function(e) {
      var n = e;
      for (var i = 0; i < r; i++) {
        var o = n != null ? n[t[i]] : void 0;
        if (o === void 0) {
          return;
        }
        n = o;
      }
      return n;
    };
  }
  function St(t, r) {
    if (typeof r == 'function') {
      return function(e) {
        return e.pipe(
          St(function(e, n) {
            return W(t(e, n)).pipe(
              R(function(t, i) {
                return r(e, t, n, i);
              })
            );
          })
        );
      };
    } else {
      return function(r) {
        return r.lift(new Et(t));
      };
    }
  }
  function Nt() {
    var t = [];
    for (var r = 0; r < arguments.length; r++) {
      t[r] = arguments[r];
    }
    return function(r) {
      var e;
      if (typeof t[t.length - 1] == 'function') {
        e = t.pop();
      }
      return r.lift(new At(t, e));
    };
  }
  function kt(t, r) {
    if (r === void 0) {
      r = {};
    }
    var n = r.selector;
    var i = (function(t, r) {
      var e = {};
      for (var n in t) {
        if (Object.prototype.hasOwnProperty.call(t, n) && r.indexOf(n) < 0) {
          e[n] = t[n];
        }
      }
      if (t != null && typeof Object.getOwnPropertySymbols == 'function') {
        var i = 0;
        for (n = Object.getOwnPropertySymbols(t); i < n.length; i++) {
          if (
            r.indexOf(n[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(t, n[i])
          ) {
            e[n[i]] = t[n[i]];
          }
        }
      }
      return e;
    })(r, ['selector']);
    return new _(function(r) {
      var o;
      var s = new AbortController();
      var u = s.signal;
      var c = true;
      var h = false;
      var a = new p();
      a.add(function() {
        h = true;
        if (c) {
          s.abort();
        }
      });
      if (i) {
        if (i.signal) {
          if (i.signal.aborted) {
            s.abort();
          } else {
            var f = i.signal;
            var l = function() {
              if (!u.aborted) {
                s.abort();
              }
            };
            f.addEventListener('abort', l);
            a.add(function() {
              return f.removeEventListener('abort', l);
            });
          }
        }
        o = e({}, i, { signal: u });
      } else {
        o = { signal: u };
      }
      fetch(t, o)
        .then(function(t) {
          if (n) {
            a.add(
              W(n(t)).subscribe(
                function(t) {
                  return r.next(t);
                },
                function(t) {
                  c = false;
                  if (!h) {
                    r.error(t);
                  }
                },
                function() {
                  c = false;
                  r.complete();
                }
              )
            );
          } else {
            c = false;
            r.next(t);
            r.complete();
          }
        })
        .catch(function(t) {
          c = false;
          if (!h) {
            r.error(t);
          }
        });
      return a;
    });
  }
  var t = function(r, e) {
    return (t =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(t, r) {
          t.__proto__ = r;
        }) ||
      function(t, r) {
        for (var e in r) {
          if (r.hasOwnProperty(e)) {
            t[e] = r[e];
          }
        }
      })(r, e);
  };
  var e = function() {
    return (e =
      Object.assign ||
      function(t) {
        var r;
        var e = 1;
        for (var n = arguments.length; e < n; e++) {
          for (var i in (r = arguments[e])) {
            if (Object.prototype.hasOwnProperty.call(r, i)) {
              t[i] = r[i];
            }
          }
        }
        return t;
      }).apply(this, arguments);
  };
  var i = false;
  var o = {
    Promise: void 0,
    set useDeprecatedSynchronousErrorHandling(t) {
      if (t) {
        new Error().stack;
      }
      i = t;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return i;
    },
  };
  var u = {
    closed: true,
    next: function(t) {},
    error: function(t) {
      if (o.useDeprecatedSynchronousErrorHandling) {
        throw t;
      }
      s(t);
    },
    complete: function() {},
  };
  var c =
    Array.isArray ||
    function(t) {
      return t && typeof t.length == 'number';
    };
  var a = (function() {
    function t(t) {
      Error.call(this);
      this.message = t
        ? t.length +
          ' errors occurred during unsubscription:\n' +
          t
            .map(function(t, r) {
              return r + 1 + ') ' + t.toString();
            })
            .join('\n  ')
        : '';
      this.name = 'UnsubscriptionError';
      this.errors = t;
      return this;
    }
    t.prototype = Object.create(Error.prototype);
    return t;
  })();
  var p = (function() {
    function t(t) {
      this.closed = false;
      this._parentOrParents = null;
      this._subscriptions = null;
      if (t) {
        this._ctorUnsubscribe = true;
        this._unsubscribe = t;
      }
    }
    t.prototype.unsubscribe = function() {
      var r;
      if (!this.closed) {
        var e = this;
        var i = e._parentOrParents;
        var o = e._ctorUnsubscribe;
        var s = e._unsubscribe;
        var u = e._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (i instanceof t) {
          i.remove(this);
        } else if (i !== null) {
          for (var p = 0; p < i.length; ++p) {
            i[p].remove(this);
          }
        }
        if (n(s)) {
          if (o) {
            this._unsubscribe = void 0;
          }
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
            if (h(d)) {
              try {
                d.unsubscribe();
              } catch (t) {
                r = r || [];
                if (t instanceof a) {
                  r = r.concat(f(t.errors));
                } else {
                  r.push(t);
                }
              }
            }
          }
        }
        if (r) {
          throw new a(r);
        }
      }
    };
    t.prototype.add = function(r) {
      var e = r;
      if (!r) {
        return t.EMPTY;
      }
      switch (typeof r) {
        case 'function':
          e = new t(r);
        case 'object':
          if (e === this || e.closed || typeof e.unsubscribe != 'function') {
            return e;
          }
          if (this.closed) {
            e.unsubscribe();
            return e;
          }
          if (!(e instanceof t)) {
            var n = e;
            (e = new t())._subscriptions = [n];
          }
          break;
        default:
          throw new Error(
            'unrecognized teardown ' + r + ' added to Subscription.'
          );
      }
      var i = e._parentOrParents;
      if (i === null) {
        e._parentOrParents = this;
      } else if (i instanceof t) {
        if (i === this) {
          return e;
        }
        e._parentOrParents = [i, this];
      } else {
        if (i.indexOf(this) !== -1) {
          return e;
        }
        i.push(this);
      }
      var o = this._subscriptions;
      if (o === null) {
        this._subscriptions = [e];
      } else {
        o.push(e);
      }
      return e;
    };
    t.prototype.remove = function(t) {
      var r = this._subscriptions;
      if (r) {
        var e = r.indexOf(t);
        if (e !== -1) {
          r.splice(e, 1);
        }
      }
    };
    t.EMPTY = (function(t) {
      t.closed = true;
      return t;
    })(new t());
    return t;
  })();
  var l = (function() {
    if (typeof Symbol == 'function') {
      return Symbol('rxSubscriber');
    } else {
      return '@@rxSubscriber_' + Math.random();
    }
  })();
  var d = (function() {
    function e(r, n, i) {
      var o = p.call(this) || this;
      switch (((o.syncErrorValue = null),
      (o.syncErrorThrown = false),
      (o.syncErrorThrowable = false),
      (o.isStopped = false),
      arguments.length)) {
        case 0:
          o.destination = u;
          break;
        case 1:
          if (!r) {
            o.destination = u;
            break;
          }
          if (typeof r == 'object') {
            if (r instanceof e) {
              o.syncErrorThrowable = r.syncErrorThrowable;
              o.destination = r;
              r.add(o);
            } else {
              o.syncErrorThrowable = true;
              o.destination = new b(o, r);
            }
            break;
          }
        default:
          o.syncErrorThrowable = true;
          o.destination = new b(o, r, n, i);
      }
      return o;
    }
    r(e, p);
    e.prototype[l] = function() {
      return this;
    };
    e.create = function(t, r, n) {
      var i = new e(t, r, n);
      i.syncErrorThrowable = false;
      return i;
    };
    e.prototype.next = function(t) {
      if (!this.isStopped) {
        this._next(t);
      }
    };
    e.prototype.error = function(t) {
      if (!this.isStopped) {
        this.isStopped = true;
        this._error(t);
      }
    };
    e.prototype.complete = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        this._complete();
      }
    };
    e.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        p.prototype.unsubscribe.call(this);
      }
    };
    e.prototype._next = function(t) {
      this.destination.next(t);
    };
    e.prototype._error = function(t) {
      this.destination.error(t);
      this.unsubscribe();
    };
    e.prototype._complete = function() {
      this.destination.complete();
      this.unsubscribe();
    };
    e.prototype._unsubscribeAndRecycle = function() {
      var t = this._parentOrParents;
      this._parentOrParents = null;
      this.unsubscribe();
      this.closed = false;
      this.isStopped = false;
      this._parentOrParents = t;
      return this;
    };
    return e;
  })();
  var b = (function() {
    function e(r, e, i, o) {
      var s;
      var c = d.call(this) || this;
      c._parentSubscriber = r;
      var h = c;
      if (n(e)) {
        s = e;
      } else if (e) {
        s = e.next;
        i = e.error;
        o = e.complete;
        if (e !== u) {
          if (n((h = Object.create(e)).unsubscribe)) {
            c.add(h.unsubscribe.bind(h));
          }
          h.unsubscribe = c.unsubscribe.bind(c);
        }
      }
      c._context = h;
      c._next = s;
      c._error = i;
      c._complete = o;
      return c;
    }
    r(e, d);
    e.prototype.next = function(t) {
      if (!this.isStopped && this._next) {
        var r = this._parentSubscriber;
        if (o.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable) {
          if (this.__tryOrSetError(r, this._next, t)) {
            this.unsubscribe();
          }
        } else {
          this.__tryOrUnsub(this._next, t);
        }
      }
    };
    e.prototype.error = function(t) {
      if (!this.isStopped) {
        var r = this._parentSubscriber;
        var e = o.useDeprecatedSynchronousErrorHandling;
        if (this._error) {
          if (e && r.syncErrorThrowable) {
            this.__tryOrSetError(r, this._error, t);
            this.unsubscribe();
          } else {
            this.__tryOrUnsub(this._error, t);
            this.unsubscribe();
          }
        } else if (r.syncErrorThrowable) {
          if (e) {
            r.syncErrorValue = t;
            r.syncErrorThrown = true;
          } else {
            s(t);
          }
          this.unsubscribe();
        } else {
          this.unsubscribe();
          if (e) {
            throw t;
          }
          s(t);
        }
      }
    };
    e.prototype.complete = function() {
      var t = this;
      if (!this.isStopped) {
        var r = this._parentSubscriber;
        if (this._complete) {
          var e = function() {
            return t._complete.call(t._context);
          };
          if (o.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable) {
            this.__tryOrSetError(r, e);
            this.unsubscribe();
          } else {
            this.__tryOrUnsub(e);
            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    };
    e.prototype.__tryOrUnsub = function(t, r) {
      try {
        t.call(this._context, r);
      } catch (t) {
        this.unsubscribe();
        if (o.useDeprecatedSynchronousErrorHandling) {
          throw t;
        }
        s(t);
      }
    };
    e.prototype.__tryOrSetError = function(t, r, e) {
      if (!o.useDeprecatedSynchronousErrorHandling) {
        throw new Error('bad call');
      }
      try {
        r.call(this._context, e);
      } catch (r) {
        if (o.useDeprecatedSynchronousErrorHandling) {
          t.syncErrorValue = r;
          t.syncErrorThrown = true;
          return true;
        } else {
          s(r);
          return true;
        }
      }
      return false;
    };
    e.prototype._unsubscribe = function() {
      var t = this._parentSubscriber;
      this._context = null;
      this._parentSubscriber = null;
      t.unsubscribe();
    };
    return e;
  })();
  var y = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
  var _ = (function() {
    function t(t) {
      this._isScalar = false;
      if (t) {
        this._subscribe = t;
      }
    }
    t.prototype.lift = function(r) {
      var e = new t();
      e.source = this;
      e.operator = r;
      return e;
    };
    t.prototype.subscribe = function(t, r, e) {
      var n = this.operator;
      var i = (function(t, r, e) {
        if (t) {
          if (t instanceof d) {
            return t;
          }
          if (t[l]) {
            return t[l]();
          }
        }
        if (t || r || e) {
          return new d(t, r, e);
        } else {
          return new d(u);
        }
      })(t, r, e);
      if (n) {
        i.add(n.call(i, this.source));
      } else {
        i.add(
          this.source ||
          (o.useDeprecatedSynchronousErrorHandling && !i.syncErrorThrowable)
            ? this._subscribe(i)
            : this._trySubscribe(i)
        );
      }
      if (
        o.useDeprecatedSynchronousErrorHandling &&
        i.syncErrorThrowable &&
        ((i.syncErrorThrowable = false), i.syncErrorThrown)
      ) {
        throw i.syncErrorValue;
      }
      return i;
    };
    t.prototype._trySubscribe = function(t) {
      try {
        return this._subscribe(t);
      } catch (r) {
        if (o.useDeprecatedSynchronousErrorHandling) {
          t.syncErrorThrown = true;
          t.syncErrorValue = r;
        }
        if (
          !(function(t) {
            while (t) {
              var r = t;
              var e = r.closed;
              var n = r.destination;
              var i = r.isStopped;
              if (e || i) {
                return false;
              }
              t = n && n instanceof d ? n : null;
            }
            return true;
          })(t)
        ) {
          console.warn(r);
        } else {
          t.error(r);
        }
      }
    };
    t.prototype.forEach = function(t, r) {
      var e = this;
      return new (r = m(r))(function(r, n) {
        var i = e.subscribe(
          function(r) {
            try {
              t(r);
            } catch (t) {
              n(t);
              if (i) {
                i.unsubscribe();
              }
            }
          },
          n,
          r
        );
      });
    };
    t.prototype._subscribe = function(t) {
      var r = this.source;
      return r && r.subscribe(t);
    };
    t.prototype[y] = function() {
      return this;
    };
    t.prototype.pipe = function() {
      var t = [];
      for (var r = 0; r < arguments.length; r++) {
        t[r] = arguments[r];
      }
      if (t.length === 0) {
        return this;
      } else {
        return w(t)(this);
      }
    };
    t.prototype.toPromise = function(t) {
      var r = this;
      return new (t = m(t))(function(t, e) {
        var n;
        r.subscribe(
          function(t) {
            return (n = t);
          },
          function(t) {
            return e(t);
          },
          function() {
            return t(n);
          }
        );
      });
    };
    t.create = function(r) {
      return new t(r);
    };
    return t;
  })();
  var x = (function() {
    function t() {
      Error.call(this);
      this.message = 'object unsubscribed';
      this.name = 'ObjectUnsubscribedError';
      return this;
    }
    t.prototype = Object.create(Error.prototype);
    return t;
  })();
  var g = (function() {
    function e(r, e) {
      var n = p.call(this) || this;
      n.subject = r;
      n.subscriber = e;
      n.closed = false;
      return n;
    }
    r(e, p);
    e.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.closed = true;
        var t = this.subject;
        var r = t.observers;
        this.subject = null;
        if (r && r.length !== 0 && !t.isStopped && !t.closed) {
          var e = r.indexOf(this.subscriber);
          if (e !== -1) {
            r.splice(e, 1);
          }
        }
      }
    };
    return e;
  })();
  var S = (function() {
    function e(r) {
      var e = d.call(this, r) || this;
      e.destination = r;
      return e;
    }
    r(e, d);
    return e;
  })();
  var E = (function() {
    function e() {
      var r = _.call(this) || this;
      r.observers = [];
      r.closed = false;
      r.isStopped = false;
      r.hasError = false;
      r.thrownError = null;
      return r;
    }
    r(e, _);
    e.prototype[l] = function() {
      return new S(this);
    };
    e.prototype.lift = function(t) {
      var r = new O(this, this);
      r.operator = t;
      return r;
    };
    e.prototype.next = function(t) {
      if (this.closed) {
        throw new x();
      }
      if (!this.isStopped) {
        var r = this.observers;
        var e = r.length;
        var n = r.slice();
        for (var i = 0; i < e; i++) {
          n[i].next(t);
        }
      }
    };
    e.prototype.error = function(t) {
      if (this.closed) {
        throw new x();
      }
      this.hasError = true;
      this.thrownError = t;
      this.isStopped = true;
      var r = this.observers;
      var e = r.length;
      var n = r.slice();
      for (var i = 0; i < e; i++) {
        n[i].error(t);
      }
      this.observers.length = 0;
    };
    e.prototype.complete = function() {
      if (this.closed) {
        throw new x();
      }
      this.isStopped = true;
      var t = this.observers;
      var r = t.length;
      var e = t.slice();
      for (var n = 0; n < r; n++) {
        e[n].complete();
      }
      this.observers.length = 0;
    };
    e.prototype.unsubscribe = function() {
      this.isStopped = true;
      this.closed = true;
      this.observers = null;
    };
    e.prototype._trySubscribe = function(r) {
      if (this.closed) {
        throw new x();
      }
      return _.prototype._trySubscribe.call(this, r);
    };
    e.prototype._subscribe = function(t) {
      if (this.closed) {
        throw new x();
      }
      if (this.hasError) {
        t.error(this.thrownError);
        return p.EMPTY;
      } else if (this.isStopped) {
        t.complete();
        return p.EMPTY;
      } else {
        this.observers.push(t);
        return new g(this, t);
      }
    };
    e.prototype.asObservable = function() {
      var t = new _();
      t.source = this;
      return t;
    };
    e.create = function(t, r) {
      return new O(t, r);
    };
    return e;
  })();
  var O = (function() {
    function e(r, e) {
      var n = E.call(this) || this;
      n.destination = r;
      n.source = e;
      return n;
    }
    r(e, E);
    e.prototype.next = function(t) {
      var r = this.destination;
      if (r && r.next) {
        r.next(t);
      }
    };
    e.prototype.error = function(t) {
      var r = this.destination;
      if (r && r.error) {
        this.destination.error(t);
      }
    };
    e.prototype.complete = function() {
      var t = this.destination;
      if (t && t.complete) {
        this.destination.complete();
      }
    };
    e.prototype._subscribe = function(t) {
      if (this.source) {
        return this.source.subscribe(t);
      } else {
        return p.EMPTY;
      }
    };
    return e;
  })();
  var j = (function() {
    function e(r) {
      var e = E.call(this) || this;
      e._value = r;
      return e;
    }
    r(e, E);
    Object.defineProperty(e.prototype, 'value', {
      get: function() {
        return this.getValue();
      },
      enumerable: true,
      configurable: true,
    });
    e.prototype._subscribe = function(r) {
      var e = E.prototype._subscribe.call(this, r);
      if (e && !e.closed) {
        r.next(this._value);
      }
      return e;
    };
    e.prototype.getValue = function() {
      if (this.hasError) {
        throw this.thrownError;
      }
      if (this.closed) {
        throw new x();
      }
      return this._value;
    };
    e.prototype.next = function(r) {
      E.prototype.next.call(this, (this._value = r));
    };
    return e;
  })();
  var P = (function() {
    function e(r, e) {
      var n = t.call(this, r, e) || this;
      n.scheduler = r;
      n.work = e;
      n.pending = false;
      return n;
    }
    var t = (function() {
      function e(r, e) {
        return p.call(this) || this;
      }
      r(e, p);
      e.prototype.schedule = function(t, r) {
        return this;
      };
      return e;
    })();
    r(e, t);
    e.prototype.schedule = function(t, r) {
      if (r === void 0) {
        r = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = t;
      var e = this.id;
      var n = this.scheduler;
      if (e != null) {
        this.id = this.recycleAsyncId(n, e, r);
      }
      this.pending = true;
      this.delay = r;
      this.id = this.id || this.requestAsyncId(n, this.id, r);
      return this;
    };
    e.prototype.requestAsyncId = function(t, r, e) {
      if (e === void 0) {
        e = 0;
      }
      return setInterval(t.flush.bind(t, this), e);
    };
    e.prototype.recycleAsyncId = function(t, r, e) {
      if (e === void 0) {
        e = 0;
      }
      if (e !== null && this.delay === e && this.pending === false) {
        return r;
      }
      clearInterval(r);
    };
    e.prototype.execute = function(t, r) {
      if (this.closed) {
        return new Error('executing a cancelled action');
      }
      this.pending = false;
      var e = this._execute(t, r);
      if (e) {
        return e;
      }
      if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    e.prototype._execute = function(t, r) {
      var e = false;
      var n = void 0;
      try {
        this.work(t);
      } catch (t) {
        e = true;
        n = (!!t && t) || new Error(t);
      }
      if (e) {
        this.unsubscribe();
        return n;
      }
    };
    e.prototype._unsubscribe = function() {
      var t = this.id;
      var r = this.scheduler;
      var e = r.actions;
      var n = e.indexOf(this);
      this.work = null;
      this.state = null;
      this.pending = false;
      this.scheduler = null;
      if (n !== -1) {
        e.splice(n, 1);
      }
      if (t != null) {
        this.id = this.recycleAsyncId(r, t, null);
      }
      this.delay = null;
    };
    return e;
  })();
  var T = (function() {
    function t(r, e) {
      if (e === void 0) {
        e = t.now;
      }
      this.SchedulerAction = r;
      this.now = e;
    }
    t.prototype.schedule = function(t, r, e) {
      if (r === void 0) {
        r = 0;
      }
      return new this.SchedulerAction(this, t).schedule(e, r);
    };
    t.now = function() {
      return Date.now();
    };
    return t;
  })();
  var I = (function() {
    function e(r, n) {
      if (n === void 0) {
        n = T.now;
      }
      var i =
        T.call(this, r, function() {
          if (e.delegate && e.delegate !== i) {
            return e.delegate.now();
          } else {
            return n();
          }
        }) || this;
      i.actions = [];
      i.active = false;
      i.scheduled = void 0;
      return i;
    }
    r(e, T);
    e.prototype.schedule = function(r, n, i) {
      if (n === void 0) {
        n = 0;
      }
      if (e.delegate && e.delegate !== this) {
        return e.delegate.schedule(r, n, i);
      } else {
        return T.prototype.schedule.call(this, r, n, i);
      }
    };
    e.prototype.flush = function(t) {
      var r = this.actions;
      if (this.active) {
        r.push(t);
      } else {
        var e;
        this.active = true;
        do {
          if ((e = t.execute(t.state, t.delay))) {
            break;
          }
        } while ((t = r.shift()));
        this.active = false;
        if (e) {
          while ((t = r.shift())) {
            t.unsubscribe();
          }
          throw e;
        }
      }
    };
    return e;
  })();
  var N = new _(function(t) {
    return t.complete();
  });
  var k = function(t) {
    return function(r) {
      var e = 0;
      for (var n = t.length; e < n && !r.closed; e++) {
        r.next(t[e]);
      }
      r.complete();
    };
  };
  var Y = new I(P);
  var U = (function() {
    function t(t, r) {
      this.project = t;
      this.thisArg = r;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new B(t, this.project, this.thisArg));
    };
    return t;
  })();
  var B = (function() {
    function e(r, e, n) {
      var i = d.call(this, r) || this;
      i.project = e;
      i.count = 0;
      i.thisArg = n || i;
      return i;
    }
    r(e, d);
    e.prototype._next = function(t) {
      var r;
      try {
        r = this.project.call(this.thisArg, t, this.count++);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      this.destination.next(r);
    };
    return e;
  })();
  var M = (function() {
    function e() {
      return (d !== null && d.apply(this, arguments)) || this;
    }
    r(e, d);
    e.prototype.notifyNext = function(t, r, e, n, i) {
      this.destination.next(r);
    };
    e.prototype.notifyError = function(t, r) {
      this.destination.error(t);
    };
    e.prototype.notifyComplete = function(t) {
      this.destination.complete();
    };
    return e;
  })();
  var G = (function() {
    function e(r, e, n) {
      var i = d.call(this) || this;
      i.parent = r;
      i.outerValue = e;
      i.outerIndex = n;
      i.index = 0;
      return i;
    }
    r(e, d);
    e.prototype._next = function(t) {
      this.parent.notifyNext(
        this.outerValue,
        t,
        this.outerIndex,
        this.index++,
        this
      );
    };
    e.prototype._error = function(t) {
      this.parent.notifyError(t, this);
      this.unsubscribe();
    };
    e.prototype._complete = function() {
      this.parent.notifyComplete(this);
      this.unsubscribe();
    };
    return e;
  })();
  var q = L();
  var z = function(t) {
    return t && typeof t.length == 'number' && typeof t != 'function';
  };
  var K = function(t) {
    if (t && typeof t[y] == 'function') {
      n = t;
      return function(t) {
        var r = n[y]();
        if (typeof r.subscribe != 'function') {
          throw new TypeError(
            'Provided object does not correctly implement Symbol.observable'
          );
        }
        return r.subscribe(t);
      };
    }
    if (z(t)) {
      return k(t);
    }
    if ($(t)) {
      e = t;
      return function(t) {
        e
          .then(
            function(r) {
              if (!t.closed) {
                t.next(r);
                t.complete();
              }
            },
            function(r) {
              return t.error(r);
            }
          )
          .then(null, s);
        return t;
      };
    }
    if (t && typeof t[q] == 'function') {
      r = t;
      return function(t) {
        for (var e = r[q](); ; ) {
          var n = void 0;
          try {
            n = e.next();
          } catch (r) {
            t.error(r);
            return t;
          }
          if (n.done) {
            t.complete();
            break;
          }
          t.next(n.value);
          if (t.closed) {
            break;
          }
        }
        if (typeof e.return == 'function') {
          t.add(function() {
            if (e.return) {
              e.return();
            }
          });
        }
        return t;
      };
    }
    var r;
    var e;
    var n;
    var i = h(t) ? 'an invalid object' : "'" + t + "'";
    throw new TypeError(
      'You provided ' +
        i +
        ' where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.'
    );
  };
  var X = (function() {
    function e(r) {
      var e = d.call(this) || this;
      e.parent = r;
      return e;
    }
    r(e, d);
    e.prototype._next = function(t) {
      this.parent.notifyNext(t);
    };
    e.prototype._error = function(t) {
      this.parent.notifyError(t);
      this.unsubscribe();
    };
    e.prototype._complete = function() {
      this.parent.notifyComplete();
      this.unsubscribe();
    };
    return e;
  })();
  var Z = (function() {
    function e() {
      return (d !== null && d.apply(this, arguments)) || this;
    }
    r(e, d);
    e.prototype.notifyNext = function(t) {
      this.destination.next(t);
    };
    e.prototype.notifyError = function(t) {
      this.destination.error(t);
    };
    e.prototype.notifyComplete = function() {
      this.destination.complete();
    };
    return e;
  })();
  var et = (function() {
    function t(t, r) {
      if (r === void 0) {
        r = Number.POSITIVE_INFINITY;
      }
      this.project = t;
      this.concurrent = r;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new nt(t, this.project, this.concurrent));
    };
    return t;
  })();
  var nt = (function() {
    function e(r, e, n) {
      if (n === void 0) {
        n = Number.POSITIVE_INFINITY;
      }
      var i = Z.call(this, r) || this;
      i.project = e;
      i.concurrent = n;
      i.hasCompleted = false;
      i.buffer = [];
      i.active = 0;
      i.index = 0;
      return i;
    }
    r(e, Z);
    e.prototype._next = function(t) {
      if (this.active < this.concurrent) {
        this._tryNext(t);
      } else {
        this.buffer.push(t);
      }
    };
    e.prototype._tryNext = function(t) {
      var r;
      var e = this.index++;
      try {
        r = this.project(t, e);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      this.active++;
      this._innerSub(r);
    };
    e.prototype._innerSub = function(t) {
      var r = new X(this);
      var e = this.destination;
      e.add(r);
      var n = tt(t, r);
      if (n !== r) {
        e.add(n);
      }
    };
    e.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
      this.unsubscribe();
    };
    e.prototype.notifyNext = function(t) {
      this.destination.next(t);
    };
    e.prototype.notifyComplete = function() {
      var t = this.buffer;
      this.active--;
      if (t.length > 0) {
        this._next(t.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return e;
  })();
  var ct = (function() {
    function t(t, r) {
      this.predicate = t;
      this.thisArg = r;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new ht(t, this.predicate, this.thisArg));
    };
    return t;
  })();
  var ht = (function() {
    function e(r, e, n) {
      var i = d.call(this, r) || this;
      i.predicate = e;
      i.thisArg = n;
      i.count = 0;
      return i;
    }
    r(e, d);
    e.prototype._next = function(t) {
      var r;
      try {
        r = this.predicate.call(this.thisArg, t, this.count++);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      if (r) {
        this.destination.next(t);
      }
    };
    return e;
  })();
  var pt = (function() {
    function t(t) {
      this.closingSelector = t;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new ft(t, this.closingSelector));
    };
    return t;
  })();
  var ft = (function() {
    function e(r, e) {
      var n = Z.call(this, r) || this;
      n.closingSelector = e;
      n.subscribing = false;
      n.openBuffer();
      return n;
    }
    r(e, Z);
    e.prototype._next = function(t) {
      this.buffer.push(t);
    };
    e.prototype._complete = function() {
      var r = this.buffer;
      if (r) {
        this.destination.next(r);
      }
      Z.prototype._complete.call(this);
    };
    e.prototype._unsubscribe = function() {
      this.buffer = void 0;
      this.subscribing = false;
    };
    e.prototype.notifyNext = function() {
      this.openBuffer();
    };
    e.prototype.notifyComplete = function() {
      if (this.subscribing) {
        this.complete();
      } else {
        this.openBuffer();
      }
    };
    e.prototype.openBuffer = function() {
      var t = this.closingSubscription;
      if (t) {
        this.remove(t);
        t.unsubscribe();
      }
      var r;
      var e = this.buffer;
      if (this.buffer) {
        this.destination.next(e);
      }
      this.buffer = [];
      try {
        r = this.closingSelector();
      } catch (t) {
        return this.error(t);
      }
      t = new p();
      this.closingSubscription = t;
      this.add(t);
      this.subscribing = true;
      t.add(tt(r, new X(this)));
      this.subscribing = false;
    };
    return e;
  })();
  var lt = (function() {
    function t(t) {
      this.selector = t;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new dt(t, this.selector, this.caught));
    };
    return t;
  })();
  var dt = (function() {
    function e(r, e, n) {
      var i = Z.call(this, r) || this;
      i.selector = e;
      i.caught = n;
      return i;
    }
    r(e, Z);
    e.prototype.error = function(r) {
      if (!this.isStopped) {
        var e = void 0;
        try {
          e = this.selector(r, this.caught);
        } catch (r) {
          Z.prototype.error.call(this, r);
          return;
        }
        this._unsubscribeAndRecycle();
        var n = new X(this);
        this.add(n);
        var i = tt(e, n);
        if (i !== n) {
          this.add(i);
        }
      }
    };
    return e;
  })();
  var bt = (function() {
    function t(t) {
      this.project = t;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new yt(t, this.project));
    };
    return t;
  })();
  var yt = (function() {
    function e(r, e) {
      var n = Z.call(this, r) || this;
      n.project = e;
      n.hasSubscription = false;
      n.hasCompleted = false;
      n.index = 0;
      return n;
    }
    r(e, Z);
    e.prototype._next = function(t) {
      if (!this.hasSubscription) {
        this.tryNext(t);
      }
    };
    e.prototype.tryNext = function(t) {
      var r;
      var e = this.index++;
      try {
        r = this.project(t, e);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      this.hasSubscription = true;
      this._innerSub(r);
    };
    e.prototype._innerSub = function(t) {
      var r = new X(this);
      var e = this.destination;
      e.add(r);
      var n = tt(t, r);
      if (n !== r) {
        e.add(n);
      }
    };
    e.prototype._complete = function() {
      this.hasCompleted = true;
      if (!this.hasSubscription) {
        this.destination.complete();
      }
      this.unsubscribe();
    };
    e.prototype.notifyNext = function(t) {
      this.destination.next(t);
    };
    e.prototype.notifyError = function(t) {
      this.destination.error(t);
    };
    e.prototype.notifyComplete = function() {
      this.hasSubscription = false;
      if (this.hasCompleted) {
        this.destination.complete();
      }
    };
    return e;
  })();
  var vt = (function() {
    function t(t) {
      this.value = t;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new wt(t, this.value));
    };
    return t;
  })();
  var wt = (function() {
    function e(r, e) {
      var n = d.call(this, r) || this;
      n.value = e;
      return n;
    }
    r(e, d);
    e.prototype._next = function(t) {
      this.destination.next(this.value);
    };
    return e;
  })();
  var xt = (function() {
    function t(t, r) {
      this.count = t;
      this.source = r;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new gt(t, this.count, this.source));
    };
    return t;
  })();
  var gt = (function() {
    function e(r, e, n) {
      var i = d.call(this, r) || this;
      i.count = e;
      i.source = n;
      return i;
    }
    r(e, d);
    e.prototype.complete = function() {
      if (!this.isStopped) {
        var r = this.source;
        var e = this.count;
        if (e === 0) {
          return d.prototype.complete.call(this);
        }
        if (e > -1) {
          this.count = e - 1;
        }
        r.subscribe(this._unsubscribeAndRecycle());
      }
    };
    return e;
  })();
  var Et = (function() {
    function t(t) {
      this.project = t;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new Ot(t, this.project));
    };
    return t;
  })();
  var Ot = (function() {
    function e(r, e) {
      var n = Z.call(this, r) || this;
      n.project = e;
      n.index = 0;
      return n;
    }
    r(e, Z);
    e.prototype._next = function(t) {
      var r;
      var e = this.index++;
      try {
        r = this.project(t, e);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      this._innerSub(r);
    };
    e.prototype._innerSub = function(t) {
      var r = this.innerSubscription;
      if (r) {
        r.unsubscribe();
      }
      var e = new X(this);
      var n = this.destination;
      n.add(e);
      this.innerSubscription = tt(t, e);
      if (this.innerSubscription !== e) {
        n.add(this.innerSubscription);
      }
    };
    e.prototype._complete = function() {
      var r = this.innerSubscription;
      if (!r || !!r.closed) {
        Z.prototype._complete.call(this);
      }
      this.unsubscribe();
    };
    e.prototype._unsubscribe = function() {
      this.innerSubscription = void 0;
    };
    e.prototype.notifyComplete = function() {
      this.innerSubscription = void 0;
      if (this.isStopped) {
        Z.prototype._complete.call(this);
      }
    };
    e.prototype.notifyNext = function(t) {
      this.destination.next(t);
    };
    return e;
  })();
  var jt = (function() {
    function t(t, r) {
      this.predicate = t;
      this.inclusive = r;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new Pt(t, this.predicate, this.inclusive));
    };
    return t;
  })();
  var Pt = (function() {
    function e(r, e, n) {
      var i = d.call(this, r) || this;
      i.predicate = e;
      i.inclusive = n;
      i.index = 0;
      return i;
    }
    r(e, d);
    e.prototype._next = function(t) {
      var r;
      var e = this.destination;
      try {
        r = this.predicate(t, this.index++);
      } catch (t) {
        e.error(t);
        return;
      }
      this.nextOrComplete(t, r);
    };
    e.prototype.nextOrComplete = function(t, r) {
      var e = this.destination;
      if (Boolean(r)) {
        e.next(t);
      } else {
        if (this.inclusive) {
          e.next(t);
        }
        e.complete();
      }
    };
    return e;
  })();
  var Tt = (function() {
    function t(t, r, e) {
      this.nextOrObserver = t;
      this.error = r;
      this.complete = e;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(
        new It(t, this.nextOrObserver, this.error, this.complete)
      );
    };
    return t;
  })();
  var It = (function() {
    function e(r, e, i, o) {
      var s = d.call(this, r) || this;
      s._tapNext = F;
      s._tapError = F;
      s._tapComplete = F;
      s._tapError = i || F;
      s._tapComplete = o || F;
      if (n(e)) {
        s._context = s;
        s._tapNext = e;
      } else if (e) {
        s._context = e;
        s._tapNext = e.next || F;
        s._tapError = e.error || F;
        s._tapComplete = e.complete || F;
      }
      return s;
    }
    r(e, d);
    e.prototype._next = function(t) {
      try {
        this._tapNext.call(this._context, t);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      this.destination.next(t);
    };
    e.prototype._error = function(t) {
      try {
        this._tapError.call(this._context, t);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      this.destination.error(t);
    };
    e.prototype._complete = function() {
      try {
        this._tapComplete.call(this._context);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      return this.destination.complete();
    };
    return e;
  })();
  var At = (function() {
    function t(t, r) {
      this.observables = t;
      this.project = r;
    }
    t.prototype.call = function(t, r) {
      return r.subscribe(new Ct(t, this.observables, this.project));
    };
    return t;
  })();
  var Ct = (function() {
    function e(r, e, n) {
      var i = M.call(this, r) || this;
      i.observables = e;
      i.project = n;
      i.toRespond = [];
      var o = e.length;
      i.values = new Array(o);
      for (var s = 0; s < o; s++) {
        i.toRespond.push(s);
      }
      for (s = 0; s < o; s++) {
        var u = e[s];
        i.add(J(i, u, void 0, s));
      }
      return i;
    }
    r(e, M);
    e.prototype.notifyNext = function(t, r, e) {
      this.values[e] = r;
      var n = this.toRespond;
      if (n.length > 0) {
        var i = n.indexOf(e);
        if (i !== -1) {
          n.splice(i, 1);
        }
      }
    };
    e.prototype.notifyComplete = function() {};
    e.prototype._next = function(t) {
      if (this.toRespond.length === 0) {
        var r = [t].concat(this.values);
        if (this.project) {
          this._tryProject(r);
        } else {
          this.destination.next(r);
        }
      }
    };
    e.prototype._tryProject = function(t) {
      var r;
      try {
        r = this.project.apply(this, t);
      } catch (t) {
        this.destination.error(t);
        return;
      }
      this.destination.next(r);
    };
    return e;
  })();
  const Vt = (t, r, e = 'local') => chrome.storage[e].set({ [t]: r });
  const Ft = {
    estimatedPrices: [99, 95, 90, 80, 70].map(t => ({
      confidence: t,
      price: null,
      maxFeePerGas: null,
      maxPriorityFeePerGas: null,
    })),
    baseFeePerGas: null,
    blockNumber: null,
    estimatedTransactionCount: null,
  };
  const Rt = new E();
  var Ut;
  var Bt;
  Rt.pipe(
    ((Bt = () => {
      if ((t = 15e3) === void 0) {
        t = 0;
      }
      if (r === void 0) {
        r = Y;
      }
      if (!ot(t) || t < 0) {
        t = 0;
      }
      if (!r || typeof r.schedule != 'function') {
        r = Y;
      }
      return new _(function(e) {
        e.add(r.schedule(st, t, { subscriber: e, counter: 0, period: t }));
        return e;
      });
      var t;
      var r;
    }),
    function(t) {
      return t.lift(new pt(Bt));
    }),
    ut(t => t && t.length > 1),
    ((Ut = true),
    function(t) {
      return t.lift(new vt(Ut));
    })
  ).subscribe(() => Vt('pollRate', 5e3));
  const Mt = t => {
    return kt(
      t
        ? 'https://api.blocknative.com/gasprices/blockprices'
        : 'https://blocknative-api.herokuapp.com/data',
      { headers: { Authorization: t } }
    ).pipe(
      St(t => {
        if (t.ok) {
          return t.json();
        } else {
          return H({
            error: true,
            message: `Error ${t.status}`,
            status: t.status,
          }).pipe(
            ut(({ status: t }) => t === 429),
            ((r = () => {
              Rt.next();
            }),
            function(t) {
              return t.lift(new Tt(r, e, n));
            })
          );
        }
        var r;
        var e;
        var n;
      }),
      ((r = t => H({ error: true, message: t.message })),
      function(t) {
        var e = new lt(r);
        var n = t.lift(e);
        return (e.caught = n);
      }),
      ut(t => !t.error),
      R(
        r =>
          t
            ? r.blockPrices[0]
            : Object.assign(
                {
                  blockNumber: r.pendingBlockNumberVal,
                  estimatedTransactionCount: r.estimatedTransactions,
                },
                r
              )
      )
    );
    var r;
  };
  const Gt = (function t(r, e, i) {
    if (i) {
      return t(r, e).pipe(
        R(function(t) {
          if (c(t)) {
            return i.apply(void 0, t);
          } else {
            return i(t);
          }
        })
      );
    } else {
      return new _(function(t) {
        var i;
        var o = function() {
          var r = [];
          for (var e = 0; e < arguments.length; e++) {
            r[e] = arguments[e];
          }
          return t.next(r.length === 1 ? r[0] : r);
        };
        try {
          i = r(o);
        } catch (r) {
          t.error(r);
          return;
        }
        if (n(e)) {
          return function() {
            return e(o, i);
          };
        }
      });
    }
  })(
    t => chrome.storage.onChanged.addListener(t),
    t => chrome.storage.onChanged.removeListener(t)
  ).pipe(_t('0'));
  const Lt = (t, r) =>
    (function() {
      var t = [];
      for (var r = 0; r < arguments.length; r++) {
        t[r] = arguments[r];
      }
      var e = Number.POSITIVE_INFINITY;
      var n = null;
      var i = t[t.length - 1];
      if (C(i)) {
        n = t.pop();
        if (t.length > 1 && typeof t[t.length - 1] == 'number') {
          e = t.pop();
        }
      } else if (typeof i == 'number') {
        e = t.pop();
      }
      if (n === null && t.length === 1 && t[0] instanceof _) {
        return t[0];
      } else {
        return it(e)(D(t, n));
      }
    })(
      new _(e => {
        chrome.storage.local.get({ [t]: r }, e.next.bind(e));
      }).pipe(_t(t)),
      Gt.pipe(ut(r => t in r), _t(t, 'newValue'))
    );
  const qt = Lt('pollRate', 5e3).pipe(
    St(t => {
      return (function(t, r, e) {
        if (t === void 0) {
          t = 0;
        }
        var n = -1;
        if (ot(r)) {
          n = Number(r) < 1 ? 1 : Number(r);
        } else if (C(r)) {
          e = r;
        }
        if (!C(e)) {
          e = Y;
        }
        return new _(function(r) {
          var i = ot(t) ? t : +t - e.now();
          return e.schedule(at, i, { index: 0, period: n, subscriber: r });
        });
      })(0, t / 100).pipe(
        ((e = t => t < 101),
        n === void 0 && (n = false),
        function(t) {
          return t.lift(new jt(e, n));
        }),
        (r === void 0 && (r = -1),
        function(t) {
          if (r === 0) {
            return A();
          } else if (r < 0) {
            return t.lift(new xt(-1, t));
          } else {
            return t.lift(new xt(r - 1, t));
          }
        })
      );
      var r;
      var e;
      var n;
    })
  );
  Lt('progress', 0);
  const zt = Lt('eip1559', true);
  const $t = Lt('apiKey', '');
  const Kt = Lt('gasPrices', Ft);
  const Jt = Lt('selectedConf', 90);
  Kt.pipe(
    Nt(Jt, zt),
    ut(([t]) => !!t),
    R(([t, r, e]) => {
      var n;
      if (e) {
        return [{ price: Math.round(t == null ? void 0 : t.baseFeePerGas) }];
      } else if (
        (n = t == null ? void 0 : t.estimatedPrices) === null ||
        n === void 0
      ) {
        return;
      } else {
        return n.filter(({ confidence: t }) => t === r);
      }
    }),
    _t('0'),
    _t('price')
  ).subscribe(t => Vt('badgeValue', t));
  const Qt = Lt('badgeValue', null);
  new j('');
  qt.subscribe(t => Vt('progress', t));
  qt
    .pipe(
      ut(t => t === 0),
      Nt($t),
      (function t(r, e) {
        if (e) {
          return function(n) {
            return n.pipe(
              t(function(t, n) {
                return W(r(t, n)).pipe(
                  R(function(r, i) {
                    return e(t, r, n, i);
                  })
                );
              })
            );
          };
        } else {
          return function(t) {
            return t.lift(new bt(r));
          };
        }
      })(([, t]) => Mt(t))
    )
    .subscribe(t => Vt('gasPrices', t));
  Qt.pipe(ut(t => !!t)).subscribe(t =>
    chrome.browserAction.setBadgeText({ text: `${t}` })
  );
})();
