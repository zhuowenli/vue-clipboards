'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Clipboard = _interopDefault(require('clipboard'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : VueClipboard
 */
if (!Clipboard) {
  throw new Error('[vue-clipboards] cannot locate Clipboard.');
}

function isDom(obj) {
  return _typeof(window.HTMLElement) === 'object' ? obj instanceof window.HTMLElement : obj && _typeof(obj) === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

function vueClipboards (Vue) {
  Vue.directive('clipboard', {
    bind: function bind(el, _ref, vnode) {
      return new Promise(function ($return, $error) {
        var value, option, $parent, text, componentOptions, data, listeners, on, events;
        value = _ref.value;
        option = {};
        $parent = null;
        text = value;

        if (text) {
          if (typeof text === 'function') {
            return Promise.resolve(value()).then(function ($await_3) {
              try {
                text = $await_3;
                return $If_2.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          }

          function $If_2() {
            if (/(string|number)/.test(_typeof(text))) {
              option.text = function () {
                return text;
              };
            } else {
              return $error(new Error('[vue-clipboards] Invalid value. Please use a valid value.'));
            }

            return $If_1.call(this);
          }

          return $If_2.call(this);
        }

        function $If_1() {
          if (vnode.data.attrs && vnode.data.attrs.model) {
            $parent = isDom(vnode.data.attrs.model) ? vnode.data.attrs.model : document.querySelector(vnode.data.attrs.model);
          } // 修复按钮脱离文档流时，clipboard监听失败问题


          if (vnode.elm.offsetParent) {
            option.container = vnode.elm.offsetParent;
          } else if (isDom($parent)) {
            option.container = $parent;
          } else {
            // if root element should use document.body
            option.container = el.parentElement || document.body;
          }

          vnode.elm.$clipboards = new Clipboard(el, option);
          componentOptions = vnode.componentOptions, data = vnode.data;
          listeners = componentOptions ? componentOptions.listeners : null;
          on = data ? data.on : null;
          events = listeners && listeners || on && on;

          if (events && _typeof(events) === 'object' && Object.keys(events).length) {
            // fixed with Vue 2.2.x, event object `fn` rename to `fns`
            Object.keys(events).map(function (cb) {
              return vnode.elm.$clipboards.on(cb, events[cb].fn || events[cb].fns);
            });
          }

          return $return(vnode.elm.$clipboards);
        }

        return $If_1.call(this);
      }.bind(this));
    },
    unbind: function unbind(vnode) {
      if (vnode.elm && vnode.elm.$clipboards && vnode.elm.$clipboards.destroy) {
        vnode.elm.$clipboards.destroy();
        delete vnode.elm.$clipboards;
      }
    },
    update: function update(el, binding, vnode) {
      binding.def.unbind(vnode);
      binding.def.bind(el, binding, vnode);
    }
  });
}

module.exports = vueClipboards;
