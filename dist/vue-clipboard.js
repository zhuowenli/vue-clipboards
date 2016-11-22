/*!
 * vue-clipboard v1.0.0
 * (c) 2016 zhuowenli
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vueClipboard = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    } else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

var select_1 = select;

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















var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var clipboardAction = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        if (typeof define === "function" && define.amd) {
            define(['module', 'select'], factory);
        } else if (typeof exports !== "undefined") {
            factory(module, select_1);
        } else {
            var mod = {
                exports: {}
            };
            factory(mod, global.select);
            global.clipboardAction = mod.exports;
        }
    })(commonjsGlobal, function (module, _select) {
        'use strict';

        var _select2 = _interopRequireDefault(_select);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        var _typeof = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
            return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        } : function (obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
        };

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var ClipboardAction = function () {
            /**
             * @param {Object} options
             */
            function ClipboardAction(options) {
                _classCallCheck(this, ClipboardAction);

                this.resolveOptions(options);
                this.initSelection();
            }

            /**
             * Defines base properties passed from constructor.
             * @param {Object} options
             */

            _createClass(ClipboardAction, [{
                key: 'resolveOptions',
                value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    this.action = options.action;
                    this.emitter = options.emitter;
                    this.target = options.target;
                    this.text = options.text;
                    this.trigger = options.trigger;

                    this.selectedText = '';
                }
            }, {
                key: 'initSelection',
                value: function initSelection() {
                    if (this.text) {
                        this.selectFake();
                    } else if (this.target) {
                        this.selectTarget();
                    }
                }
            }, {
                key: 'selectFake',
                value: function selectFake() {
                    var _this = this;

                    var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                    this.removeFake();

                    this.fakeHandlerCallback = function () {
                        return _this.removeFake();
                    };
                    this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

                    this.fakeElem = document.createElement('textarea');
                    // Prevent zooming on iOS
                    this.fakeElem.style.fontSize = '12pt';
                    // Reset box model
                    this.fakeElem.style.border = '0';
                    this.fakeElem.style.padding = '0';
                    this.fakeElem.style.margin = '0';
                    // Move element out of screen horizontally
                    this.fakeElem.style.position = 'absolute';
                    this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                    // Move element to the same position vertically
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    this.fakeElem.addEventListener('focus', window.scrollTo(0, yPosition));
                    this.fakeElem.style.top = yPosition + 'px';

                    this.fakeElem.setAttribute('readonly', '');
                    this.fakeElem.value = this.text;

                    document.body.appendChild(this.fakeElem);

                    this.selectedText = (0, _select2.default)(this.fakeElem);
                    this.copyText();
                }
            }, {
                key: 'removeFake',
                value: function removeFake() {
                    if (this.fakeHandler) {
                        document.body.removeEventListener('click', this.fakeHandlerCallback);
                        this.fakeHandler = null;
                        this.fakeHandlerCallback = null;
                    }

                    if (this.fakeElem) {
                        document.body.removeChild(this.fakeElem);
                        this.fakeElem = null;
                    }
                }
            }, {
                key: 'selectTarget',
                value: function selectTarget() {
                    this.selectedText = (0, _select2.default)(this.target);
                    this.copyText();
                }
            }, {
                key: 'copyText',
                value: function copyText() {
                    var succeeded = void 0;

                    try {
                        succeeded = document.execCommand(this.action);
                    } catch (err) {
                        succeeded = false;
                    }

                    this.handleResult(succeeded);
                }
            }, {
                key: 'handleResult',
                value: function handleResult(succeeded) {
                    this.emitter.emit(succeeded ? 'success' : 'error', {
                        action: this.action,
                        text: this.selectedText,
                        trigger: this.trigger,
                        clearSelection: this.clearSelection.bind(this)
                    });
                }
            }, {
                key: 'clearSelection',
                value: function clearSelection() {
                    if (this.target) {
                        this.target.blur();
                    }

                    window.getSelection().removeAllRanges();
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    this.removeFake();
                }
            }, {
                key: 'action',
                set: function set() {
                    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                    this._action = action;

                    if (this._action !== 'copy' && this._action !== 'cut') {
                        throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                },
                get: function get() {
                    return this._action;
                }
            }, {
                key: 'target',
                set: function set(target) {
                    if (target !== undefined) {
                        if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                            if (this.action === 'copy' && target.hasAttribute('disabled')) {
                                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                            }

                            if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                                throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                            }

                            this._target = target;
                        } else {
                            throw new Error('Invalid "target" value, use a valid Element');
                        }
                    }
                },
                get: function get() {
                    return this._target;
                }
            }]);

            return ClipboardAction;
        }();

        module.exports = ClipboardAction;
    });
});

function E() {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? e[name] = liveEvents : delete e[name];

    return this;
  }
};

var index = E;

var is$1 = createCommonjsModule(function (module, exports) {
  /**
   * Check if argument is a HTML element.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.node = function (value) {
    return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
  };

  /**
   * Check if argument is a list of HTML elements.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.nodeList = function (value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
  };

  /**
   * Check if argument is a string.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.string = function (value) {
    return typeof value === 'string' || value instanceof String;
  };

  /**
   * Check if argument is a function.
   *
   * @param {Object} value
   * @return {Boolean}
   */
  exports.fn = function (value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
  };
});

/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest$1(element, selector) {
    while (element && element !== document) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

var closest_1 = closest$1;

var closest = closest_1;

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate$1(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function destroy() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    };
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function (e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    };
}

var delegate_1 = delegate$1;

var is = is$1;
var delegate = delegate_1;

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    } else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    } else if (is.string(target)) {
        return listenSelector(target, type, callback);
    } else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function destroy() {
            node.removeEventListener(type, callback);
        }
    };
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function (node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function destroy() {
            Array.prototype.forEach.call(nodeList, function (node) {
                node.removeEventListener(type, callback);
            });
        }
    };
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

var listen_1 = listen;

var clipboard = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        if (typeof define === "function" && define.amd) {
            define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
        } else if (typeof exports !== "undefined") {
            factory(module, clipboardAction, index, listen_1);
        } else {
            var mod = {
                exports: {}
            };
            factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
            global.clipboard = mod.exports;
        }
    })(commonjsGlobal, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
        'use strict';

        var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

        var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

        var _goodListener2 = _interopRequireDefault(_goodListener);

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }

            return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
            }

            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var Clipboard = function (_Emitter) {
            _inherits(Clipboard, _Emitter);

            /**
             * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
             * @param {Object} options
             */
            function Clipboard(trigger, options) {
                _classCallCheck(this, Clipboard);

                var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

                _this.resolveOptions(options);
                _this.listenClick(trigger);
                return _this;
            }

            /**
             * Defines if attributes would be resolved using internal setter functions
             * or custom functions that were passed in the constructor.
             * @param {Object} options
             */

            _createClass(Clipboard, [{
                key: 'resolveOptions',
                value: function resolveOptions() {
                    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                    this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                    this.text = typeof options.text === 'function' ? options.text : this.defaultText;
                }
            }, {
                key: 'listenClick',
                value: function listenClick(trigger) {
                    var _this2 = this;

                    this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                        return _this2.onClick(e);
                    });
                }
            }, {
                key: 'onClick',
                value: function onClick(e) {
                    var trigger = e.delegateTarget || e.currentTarget;

                    if (this.clipboardAction) {
                        this.clipboardAction = null;
                    }

                    this.clipboardAction = new _clipboardAction2.default({
                        action: this.action(trigger),
                        target: this.target(trigger),
                        text: this.text(trigger),
                        trigger: trigger,
                        emitter: this
                    });
                }
            }, {
                key: 'defaultAction',
                value: function defaultAction(trigger) {
                    return getAttributeValue('action', trigger);
                }
            }, {
                key: 'defaultTarget',
                value: function defaultTarget(trigger) {
                    var selector = getAttributeValue('target', trigger);

                    if (selector) {
                        return document.querySelector(selector);
                    }
                }
            }, {
                key: 'defaultText',
                value: function defaultText(trigger) {
                    return getAttributeValue('text', trigger);
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    this.listener.destroy();

                    if (this.clipboardAction) {
                        this.clipboardAction.destroy();
                        this.clipboardAction = null;
                    }
                }
            }]);

            return Clipboard;
        }(_tinyEmitter2.default);

        /**
         * Helper function to retrieve attribute value.
         * @param {String} suffix
         * @param {Element} element
         */
        function getAttributeValue(suffix, element) {
            var attribute = 'data-clipboard-' + suffix;

            if (!element.hasAttribute(attribute)) {
                return;
            }

            return element.getAttribute(attribute);
        }

        module.exports = Clipboard;
    });
});

var Clipboard = unwrapExports(clipboard);

/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : VueClipboard
 */

if (!Clipboard) {
    throw new Error('[vue-clipboard] cannot locate Clipboard.');
}

var VueClipboard = function (Vue) {
    var clipboard = void 0;

    Vue.directive('clipboard', {
        bind: function bind(container, binding) {
            var value = binding.value;

            var option = {};

            if (value && typeof value === 'string') {
                option.text = function () {
                    return value;
                };
            }

            clipboard = new Clipboard(container, option);

            clipboard.on('success', console.log);
            clipboard.on('error', console.log);
        },

        // update(container, binding) {
        //     console.log(container, binding);
        // },
        unbind: function unbind() {
            clipboard.destroy();
        }
    });
};

/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : index
 */

function plugin(Vue) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (plugin.installed) {
        console.warn('[vue-clipboard] already installed.');
    }

    VueClipboard(Vue);
}

if (typeof define === 'function' && define.amd) {
    define([], function () {
        plugin;
    });
} else if (window.Vue) {
    window.Vue.use(plugin);
}

return plugin;

})));
