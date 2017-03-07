/*!
 * vue-clipboards v0.2.5
 * (c) 2017 卓文理 <531840344@qq.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vueClipboard = factory());
}(this, function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var asyncGenerator = function () {
    function AwaitValue(value) {
      this.value = value;
    }

    function AsyncGenerator(gen) {
      var front, back;

      function send(key, arg) {
        return new Promise(function (resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };

          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }

      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;

          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function (arg) {
              resume("next", arg);
            }, function (arg) {
              resume("throw", arg);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }

      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;

          case "throw":
            front.reject(value);
            break;

          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }

        front = front.next;

        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }

      this._invoke = send;

      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }

    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
        return this;
      };
    }

    AsyncGenerator.prototype.next = function (arg) {
      return this._invoke("next", arg);
    };

    AsyncGenerator.prototype.throw = function (arg) {
      return this._invoke("throw", arg);
    };

    AsyncGenerator.prototype.return = function (arg) {
      return this._invoke("return", arg);
    };

    return {
      wrap: function (fn) {
        return function () {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function (value) {
        return new AwaitValue(value);
      }
    };
  }();

  /**
   * @author: 卓文理
   * @email : 531840344@qq.com
   * @desc  : VueClipboard
   */

  var Clipboard = require('clipboard');

  if (!Clipboard) {
      throw new Error('[vue-clipboards] cannot locate Clipboard.');
  }

  function VueClipboard (Vue) {
      var clipboards = void 0;

      Vue.directive('clipboard', {
          bind: function bind(container, binding, vnode) {
              var value = binding.value;

              var option = {};

              if (value && typeof value === 'string') {
                  option.text = function () {
                      return value;
                  };
              }

              clipboards = new Clipboard(container, option);

              var componentOptions = vnode.componentOptions,
                  data = vnode.data;

              var listeners = componentOptions ? componentOptions.listeners : null;
              var on = data ? data.on : null;
              var events = listeners && listeners || on && on;

              if (events && (typeof events === 'undefined' ? 'undefined' : _typeof(events)) === 'object' && Object.keys(events).length) {
                  // fixed with Vue 2.2.x, event object `fn` rename to `fns`
                  Object.keys(events).map(function (cb) {
                      return clipboards.on(cb, events[cb].fn || events[cb].fns);
                  });
              }
          },
          unbind: function unbind() {
              if (clipboards && clipboards.destroy) {
                  clipboards.destroy();
              }
          },
          update: function update(container, binding, vnode) {
              binding.def.unbind();
              binding.def.bind(container, binding, vnode);
          }
      });
  }

  function plugin(Vue) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (plugin.installed) {
          console.warn('[vue-clipboards] already installed.');
      }

      VueClipboard(Vue);
  }

  if (typeof define === 'function' && define.amd) {
      define([], function () {
          return { plugin: plugin };
      });
  } else if (window.Vue) {
      window.Vue.use(plugin);
  }

  return plugin;

}));