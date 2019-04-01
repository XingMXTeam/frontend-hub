(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 @author	leeluolee
 @version	0.6.0-beta.6
 @homepage	http://regularjs.github.io
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["Regular"] = factory();
  else
    root["Regular"] = factory();
})(this, function() {
  return /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};

    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {

      /******/ 		// Check if module is in cache
      /******/ 		if(installedModules[moduleId])
      /******/ 			return installedModules[moduleId].exports;

      /******/ 		// Create a new module (and put it into the cache)
      /******/ 		var module = installedModules[moduleId] = {
        /******/ 			exports: {},
        /******/ 			id: moduleId,
        /******/ 			loaded: false
        /******/ 		};

      /******/ 		// Execute the module function
      /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

      /******/ 		// Flag the module as loaded
      /******/ 		module.loaded = true;

      /******/ 		// Return the exports of the module
      /******/ 		return module.exports;
      /******/ 	}


    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;

    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;

    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";

    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(0);
    /******/ })
  /************************************************************************/
  /******/ ([
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {

      var env =  __webpack_require__(1);
      var config = __webpack_require__(7);
      var Regular = module.exports = __webpack_require__(8);
      var Parser = Regular.Parser;
      var Lexer = Regular.Lexer;

      // if(env.browser){
      __webpack_require__(26);
      __webpack_require__(29);
      __webpack_require__(30);
      Regular.dom = __webpack_require__(15);
      // }
      Regular.env = env;
      Regular.util = __webpack_require__(3);
      Regular.parse = function(str, options){
        options = options || {};

        if(options.BEGIN || options.END){
          if(options.BEGIN) config.BEGIN = options.BEGIN;
          if(options.END) config.END = options.END;
          Lexer.setup();
        }
        var ast = new Parser(str).parse();
        return !options.stringify? ast : JSON.stringify(ast);
      }
      Regular.Cursor =__webpack_require__(22)

      Regular.isServer = env.node;
      Regular.isRegular = function( Comp ){
        return  Comp.prototype instanceof Regular;
      }




      /***/ },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function(process) {// some fixture test;
        // ---------------
        var _ = __webpack_require__(3);
        exports.svg = (function(){
          return typeof document !== "undefined" && document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1" );
        })();


        exports.browser = typeof document !== "undefined" && document.nodeType;
        // whether have component in initializing
        exports.exprCache = _.cache(1000);
        exports.node = typeof process !== "undefined" && ( '' + process ) === '[object process]';
        exports.isRunning = false;

        /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

      /***/ },
    /* 2 */
    /***/ function(module, exports) {

      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout () {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      } ())
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch(e){
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }


      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e){
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }



      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () { return '/' };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function() { return 0; };


      /***/ },
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function(global, setImmediate) {__webpack_require__(5)();



        var _  = module.exports;
        var entities = __webpack_require__(6);
        var o2str = ({}).toString;
        var win = typeof window !=='undefined'? window: global;
        var MAX_PRIORITY = 9999;
        var config = __webpack_require__(7);


        _.noop = function(){};
        _.uid = (function(){
          var _uid=0;
          return function(){
            return _uid++;
          }
        })();

        _.extend = function( o1, o2, override ){
          for(var i in o2) if (o2.hasOwnProperty(i)){
            if( o1[i] === undefined || override === true ){
              o1[i] = o2[i]
            }
          }
          return o1;
        }

        _.keys = Object.keys? Object.keys: function(obj){
          var res = [];
          for(var i in obj) if(obj.hasOwnProperty(i)){
            res.push(i);
          }
          return res;
        }

        _.some = function(list, fn){
          for(var i =0,len = list.length; i < len; i++){
            if(fn(list[i])) return true
          }
        }

        _.varName = 'd';
        _.setName = 'p_';
        _.ctxName = 'c';
        _.extName = 'e';

        _.rWord = /^[\$\w]+$/;
        _.rSimpleAccessor = /^[\$\w]+(\.[\$\w]+)*$/;

        _.nextTick = typeof setImmediate === 'function'?
          setImmediate.bind(win) :
          function(callback) {
            setTimeout(callback, 0)
          }



        _.prefix = "'use strict';var " + _.varName + "=" + _.ctxName + ".data;" +  _.extName  + "=" + _.extName + "||'';";


        _.slice = function(obj, start, end){
          var res = [];
          for(var i = start || 0, len = end || obj.length; i < len; i++){
            res.push(obj[i])
          }
          return res;
        }

        // beacuse slice and toLowerCase is expensive. we handle undefined and null in another way
        _.typeOf = function (o) {
          return o == null ? String(o) :o2str.call(o).slice(8, -1).toLowerCase();
        }




        _.makePredicate = function makePredicate(words, prefix) {
          if (typeof words === "string") {
            words = words.split(" ");
          }
          var f = "",
            cats = [];
          out: for (var i = 0; i < words.length; ++i) {
            for (var j = 0; j < cats.length; ++j){
              if (cats[j][0].length === words[i].length) {
                cats[j].push(words[i]);
                continue out;
              }
            }
            cats.push([words[i]]);
          }
          function compareTo(arr) {
            if (arr.length === 1) return f += "return str === '" + arr[0] + "';";
            f += "switch(str){";
            for (var i = 0; i < arr.length; ++i){
              f += "case '" + arr[i] + "':";
            }
            f += "return true}return false;";
          }

          // When there are more than three length categories, an outer
          // switch first dispatches on the lengths, to save on comparisons.
          if (cats.length > 3) {
            cats.sort(function(a, b) {
              return b.length - a.length;
            });
            f += "switch(str.length){";
            for (var i = 0; i < cats.length; ++i) {
              var cat = cats[i];
              f += "case " + cat[0].length + ":";
              compareTo(cat);
            }
            f += "}";

            // Otherwise, simply generate a flat `switch` statement.
          } else {
            compareTo(words);
          }
          return new Function("str", f);
        }


        _.trackErrorPos = (function (){
          // linebreak
          var lb = /\r\n|[\n\r\u2028\u2029]/g;
          var minRange = 20, maxRange = 20;
          function findLine(lines, pos){
            var tmpLen = 0;
            for(var i = 0,len = lines.length; i < len; i++){
              var lineLen = (lines[i] || "").length;

              if(tmpLen + lineLen > pos) {
                return {num: i, line: lines[i], start: pos - i - tmpLen , prev:lines[i-1], next: lines[i+1] };
              }
              // 1 is for the linebreak
              tmpLen = tmpLen + lineLen ;
            }
          }
          function formatLine(str,  start, num, target){
            var len = str.length;
            var min = start - minRange;
            if(min < 0) min = 0;
            var max = start + maxRange;
            if(max > len) max = len;

            var remain = str.slice(min, max);
            var prefix = "[" +(num+1) + "] " + (min > 0? ".." : "")
            var postfix = max < len ? "..": "";
            var res = prefix + remain + postfix;
            if(target) res += "\n" + new Array(start-min + prefix.length + 1).join(" ") + "^^^";
            return res;
          }
          return function(input, pos){
            if(pos > input.length-1) pos = input.length-1;
            lb.lastIndex = 0;
            var lines = input.split(lb);
            var line = findLine(lines,pos);
            var start = line.start, num = line.num;

            return (line.prev? formatLine(line.prev, start, num-1 ) + '\n': '' ) +
              formatLine(line.line, start, num, true) + '\n' +
              (line.next? formatLine(line.next, start, num+1 ) + '\n': '' );

          }
        })();


        var ignoredRef = /\((\?\!|\?\:|\?\=)/g;
        _.findSubCapture = function (regStr) {
          var left = 0,
            right = 0,
            len = regStr.length,
            ignored = regStr.match(ignoredRef); // ignored uncapture
          if(ignored) ignored = ignored.length
          else ignored = 0;
          for (; len--;) {
            var letter = regStr.charAt(len);
            if (len === 0 || regStr.charAt(len - 1) !== "\\" ) {
              if (letter === "(") left++;
              if (letter === ")") right++;
            }
          }
          if (left !== right) throw "RegExp: "+ regStr + "'s bracket is not marched";
          else return left - ignored;
        };


        _.escapeRegExp = function( str){// Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License
          return str.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, function(match){
            return '\\' + match;
          });
        };


        var rEntity = new RegExp("&(?:(#x[0-9a-fA-F]+)|(#[0-9]+)|(" + _.keys(entities).join('|') + '));', 'gi');

        _.convertEntity = function(chr){

          return ("" + chr).replace(rEntity, function(all, hex, dec, capture){
            var charCode;
            if( dec ) charCode = parseInt( dec.slice(1), 10 );
            else if( hex ) charCode = parseInt( hex.slice(2), 16 );
            else charCode = entities[capture]

            return String.fromCharCode( charCode )
          });

        }


        // simple get accessor

        _.createObject = Object.create? function(o){
          return Object.create(o || null)
        }: (function(){
          function Temp() {}
          return function(o){
            if(!o) return {}
            Temp.prototype = o;
            var obj = new Temp();
            Temp.prototype = null; // 不要保持一个 O 的杂散引用（a stray reference）...
            return obj
          }
        })();

        _.createProto = function(fn, o){
          function Foo() { this.constructor = fn;}
          Foo.prototype = o;
          return (fn.prototype = new Foo());
        }


        _.removeOne = function(list , filter){
          var len = list.length;
          for(;len--;){
            if(filter(list[len])) {
              list.splice(len, 1)
              return;
            }
          }
        }


        /**
         clone
         */
        _.clone = function clone(obj){
          if(!obj || (typeof obj !== 'object' )) return obj;
          if(Array.isArray(obj)){
            var cloned = [];
            for(var i=0,len = obj.length; i< len;i++){
              cloned[i] = obj[i]
            }
            return cloned;
          }else{
            var cloned = {};
            for(var i in obj) if(obj.hasOwnProperty(i)){
              cloned[i] = obj[i];
            }
            return cloned;
          }
        }

        _.equals = function(now, old){
          var type = typeof now;
          if(type === 'number' && typeof old === 'number'&& isNaN(now) && isNaN(old)) return true
          return now === old;
        }

        var dash = /-([a-z])/g;
        _.camelCase = function(str){
          return str.replace(dash, function(all, capture){
            return capture.toUpperCase();
          })
        }



        _.throttle = function throttle(func, wait){
          var wait = wait || 100;
          var context, args, result;
          var timeout = null;
          var previous = 0;
          var later = function() {
            previous = +new Date;
            timeout = null;
            result = func.apply(context, args);
            context = args = null;
          };
          return function() {
            var now = + new Date;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
              clearTimeout(timeout);
              timeout = null;
              previous = now;
              result = func.apply(context, args);
              context = args = null;
            } else if (!timeout) {
              timeout = setTimeout(later, remaining);
            }
            return result;
          };
        };

        // hogan escape
        // ==============
        _.escape = (function(){
          var rAmp = /&/g,
            rLt = /</g,
            rGt = />/g,
            rApos = /\'/g,
            rQuot = /\"/g,
            hChars = /[&<>\"\']/;

          return function(str) {
            return hChars.test(str) ?
              str
                .replace(rAmp, '&amp;')
                .replace(rLt, '&lt;')
                .replace(rGt, '&gt;')
                .replace(rApos, '&#39;')
                .replace(rQuot, '&quot;') :
              str;
          }
        })();

        _.cache = function(max){
          max = max || 1000;
          var keys = [],
            cache = {};
          return {
            set: function(key, value) {
              if (keys.length > this.max) {
                cache[keys.shift()] = undefined;
              }
              //
              if(cache[key] === undefined){
                keys.push(key);
              }
              cache[key] = value;
              return value;
            },
            get: function(key) {
              if (key === undefined) return cache;
              return cache[key];
            },
            max: max,
            len:function(){
              return keys.length;
            }
          };
        }

        // // setup the raw Expression


        // handle the same logic on component's `on-*` and element's `on-*`
        // return the fire object
        _.handleEvent = function(value, type ){
          var self = this, evaluate;
          if(value.type === 'expression'){ // if is expression, go evaluated way
            evaluate = value.get;
          }
          if(evaluate){
            return function fire(obj){
              self.$update(function(){
                var data = this.data;
                data.$event = obj;
                var res = evaluate(self);
                if(res === false && obj && obj.preventDefault) obj.preventDefault();
                data.$event = undefined;
              })

            }
          }else{
            return function fire(){
              var args = _.slice(arguments);
              args.unshift(value);
              self.$update(function(){
                self.$emit.apply(self, args);
              })
            }
          }
        }

        // only call once
        _.once = function(fn){
          var time = 0;
          return function(){
            if( time++ === 0) fn.apply(this, arguments);
          }
        }

        _.fixObjStr = function(str){
          if(str.trim().indexOf('{') !== 0){
            return '{' + str + '}';
          }
          return str;
        }


        _.map= function(array, callback){
          var res = [];
          for (var i = 0, len = array.length; i < len; i++) {
            res.push(callback(array[i], i));
          }
          return res;
        }

        function log(msg, type){
          if(typeof console !== "undefined")  console[type || "log"](msg);
        }

        _.log = log;


        _.normListener = function( events  ){
          var eventListeners = [];
          var pType = _.typeOf( events );
          if( pType === 'array' ){
            return events;
          }else if ( pType === 'object' ){
            for( var i in events ) if ( events.hasOwnProperty(i) ){
              eventListeners.push({
                type: i,
                listener: events[i]
              })
            }
          }
          return eventListeners;
        }


        //http://www.w3.org/html/wg/drafts/html/master/single-page.html#void-elements
        _.isVoidTag = _.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content");
        _.isBooleanAttr = _.makePredicate('selected checked disabled readonly required open autofocus controls autoplay compact loop defer multiple');


        _.isExpr = function(expr){
          return expr && expr.type === 'expression';
        }
        // @TODO: make it more strict
        _.isGroup = function(group){
          return group.inject || group.$inject;
        }

        _.blankReg = /\s+/;

        _.getCompileFn = function(source, ctx, options){
          return function( passedOptions ){
            if( passedOptions && options ) _.extend( passedOptions , options );
            else passedOptions = options;
            return ctx.$compile(source, passedOptions )
          }
          return ctx.$compile.bind(ctx,source, options)
        }

        // remove directive param from AST
        _.fixTagAST = function( tagAST, Component ){

          if( tagAST.touched ) return;

          var attrs = tagAST.attrs;

          if( !attrs ) return;

          // Maybe multiple directive need same param,
          // We place all param in totalParamMap
          var len = attrs.length;
          if(!len) return;
          var directives=[], otherAttrMap = {};
          for(;len--;){

            var attr = attrs[ len ];


            // @IE fix IE9- input type can't assign after value
            if(attr.name === 'type') attr.priority = MAX_PRIORITY + 1;

            var directive = Component.directive( attr.name );
            if( directive ) {

              attr.priority = directive.priority || 1;
              attr.directive = true;
              directives.push(attr);

            }else if(attr.type === 'attribute'){
              otherAttrMap[attr.name] = attr.value;
            }
          }

          directives.forEach( function( attr ){
            var directive = Component.directive(attr.name);
            var param = directive.param;
            if(param && param.length){
              attr.param = {};
              param.forEach(function( name ){
                if( name in otherAttrMap ){
                  attr.param[name] = otherAttrMap[name] === undefined? true: otherAttrMap[name]
                  _.removeOne(attrs, function(attr){
                    return attr.name === name
                  })
                }
              })
            }
          });

          attrs.sort(function(a1, a2){

            var p1 = a1.priority;
            var p2 = a2.priority;

            if( p1 == null ) p1 = MAX_PRIORITY;
            if( p2 == null ) p2 = MAX_PRIORITY;

            return p2 - p1;

          })

          tagAST.touched = true;
        }

        _.findItem = function(list, filter){
          if(!list || !list.length) return;
          var len = list.length;
          while(len--){
            if(filter(list[len])) return list[len]
          }
        }

        _.getParamObj = function(component, param){
          var paramObj = {};
          if(param) {
            for(var i in param) if(param.hasOwnProperty(i)){
              var value = param[i];
              paramObj[i] =  value && value.type==='expression'? component.$get(value): value;
            }
          }
          return paramObj;
        }
        _.eventReg = /^on-(\w[-\w]+)$/;

        _.toText = function(obj){
          return obj == null ? "": "" + obj;
        }


        // hogan
        // https://github.com/twitter/hogan.js
        // MIT
        _.escape = (function(){
          var rAmp = /&/g,
            rLt = /</g,
            rGt = />/g,
            rApos = /\'/g,
            rQuot = /\"/g,
            hChars = /[&<>\"\']/;

          function ignoreNullVal(val) {
            return String((val === undefined || val == null) ? '' : val);
          }

          return function (str) {
            str = ignoreNullVal(str);
            return hChars.test(str) ?
              str
                .replace(rAmp, '&amp;')
                .replace(rLt, '&lt;')
                .replace(rGt, '&gt;')
                .replace(rApos, '&#39;')
                .replace(rQuot, '&quot;') :
              str;
          }

        })();








        /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4).setImmediate))

      /***/ },
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(2).nextTick;
        var apply = Function.prototype.apply;
        var slice = Array.prototype.slice;
        var immediateIds = {};
        var nextImmediateId = 0;

        // DOM APIs, for completeness

        exports.setTimeout = function() {
          return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
        };
        exports.setInterval = function() {
          return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
        };
        exports.clearTimeout =
          exports.clearInterval = function(timeout) { timeout.close(); };

        function Timeout(id, clearFn) {
          this._id = id;
          this._clearFn = clearFn;
        }
        Timeout.prototype.unref = Timeout.prototype.ref = function() {};
        Timeout.prototype.close = function() {
          this._clearFn.call(window, this._id);
        };

        // Does not start the time, just sets up the members needed.
        exports.enroll = function(item, msecs) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = msecs;
        };

        exports.unenroll = function(item) {
          clearTimeout(item._idleTimeoutId);
          item._idleTimeout = -1;
        };

        exports._unrefActive = exports.active = function(item) {
          clearTimeout(item._idleTimeoutId);

          var msecs = item._idleTimeout;
          if (msecs >= 0) {
            item._idleTimeoutId = setTimeout(function onTimeout() {
              if (item._onTimeout)
                item._onTimeout();
            }, msecs);
          }
        };

        // That's not how node.js implements it but the exposed api is the same.
        exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
          var id = nextImmediateId++;
          var args = arguments.length < 2 ? false : slice.call(arguments, 1);

          immediateIds[id] = true;

          nextTick(function onNextTick() {
            if (immediateIds[id]) {
              // fn.call() is faster so we optimize for the common use-case
              // @see http://jsperf.com/call-apply-segu
              if (args) {
                fn.apply(null, args);
              } else {
                fn.call(null);
              }
              // Prevent ids from leaking
              exports.clearImmediate(id);
            }
          });

          return id;
        };

        exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
          delete immediateIds[id];
        };
        /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).setImmediate, __webpack_require__(4).clearImmediate))

      /***/ },
    /* 5 */
    /***/ function(module, exports) {

      // shim for es5
      var slice = [].slice;
      var tstr = ({}).toString;

      function extend(o1, o2 ){
        for(var i in o2) if( o1[i] === undefined){
          o1[i] = o2[i]
        }
        return o2;
      }


      module.exports = function(){
        // String proto ;
        extend(String.prototype, {
          trim: function(){
            return this.replace(/^\s+|\s+$/g, '');
          }
        });


        // Array proto;
        extend(Array.prototype, {
          indexOf: function(obj, from){
            from = from || 0;
            for (var i = from, len = this.length; i < len; i++) {
              if (this[i] === obj) return i;
            }
            return -1;
          },
          // polyfill from MDN
          // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
          forEach: function(callback, ctx){
            var k = 0;

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);

            var len = O.length >>> 0;

            if ( typeof callback !== "function" ) {
              throw new TypeError( callback + " is not a function" );
            }

            // 7. Repeat, while k < len
            while( k < len ) {

              var kValue;

              if ( k in O ) {

                kValue = O[ k ];

                callback.call( ctx, kValue, k, O );
              }
              k++;
            }
          },
          // @deprecated
          //  will be removed at 0.5.0
          filter: function(fun, context){

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
              throw new TypeError();

            var res = [];
            for (var i = 0; i < len; i++)
            {
              if (i in t)
              {
                var val = t[i];
                if (fun.call(context, val, i, t))
                  res.push(val);
              }
            }

            return res;
          }
        });

        // Function proto;
        extend(Function.prototype, {
          bind: function(context){
            var fn = this;
            var preArgs = slice.call(arguments, 1);
            return function(){
              var args = preArgs.concat(slice.call(arguments));
              return fn.apply(context, args);
            }
          },
          //@FIXIT
          __bind__: function(context){
            if(this.__binding__){
              return this.__binding__
            }else{
              return (this.__binding__ = this.bind.apply(this, arguments))
            }
          }
        })

        // Array
        extend(Array, {
          isArray: function(arr){
            return tstr.call(arr) === "[object Array]";
          }
        })
      }



      /***/ },
    /* 6 */
    /***/ function(module, exports) {

      // http://stackoverflow.com/questions/1354064/how-to-convert-characters-to-html-entities-using-plain-javascript
      var entities = {
        'quot':34,
        'amp':38,
        'apos':39,
        'lt':60,
        'gt':62,
        'nbsp':160,
        'iexcl':161,
        'cent':162,
        'pound':163,
        'curren':164,
        'yen':165,
        'brvbar':166,
        'sect':167,
        'uml':168,
        'copy':169,
        'ordf':170,
        'laquo':171,
        'not':172,
        'shy':173,
        'reg':174,
        'macr':175,
        'deg':176,
        'plusmn':177,
        'sup2':178,
        'sup3':179,
        'acute':180,
        'micro':181,
        'para':182,
        'middot':183,
        'cedil':184,
        'sup1':185,
        'ordm':186,
        'raquo':187,
        'frac14':188,
        'frac12':189,
        'frac34':190,
        'iquest':191,
        'Agrave':192,
        'Aacute':193,
        'Acirc':194,
        'Atilde':195,
        'Auml':196,
        'Aring':197,
        'AElig':198,
        'Ccedil':199,
        'Egrave':200,
        'Eacute':201,
        'Ecirc':202,
        'Euml':203,
        'Igrave':204,
        'Iacute':205,
        'Icirc':206,
        'Iuml':207,
        'ETH':208,
        'Ntilde':209,
        'Ograve':210,
        'Oacute':211,
        'Ocirc':212,
        'Otilde':213,
        'Ouml':214,
        'times':215,
        'Oslash':216,
        'Ugrave':217,
        'Uacute':218,
        'Ucirc':219,
        'Uuml':220,
        'Yacute':221,
        'THORN':222,
        'szlig':223,
        'agrave':224,
        'aacute':225,
        'acirc':226,
        'atilde':227,
        'auml':228,
        'aring':229,
        'aelig':230,
        'ccedil':231,
        'egrave':232,
        'eacute':233,
        'ecirc':234,
        'euml':235,
        'igrave':236,
        'iacute':237,
        'icirc':238,
        'iuml':239,
        'eth':240,
        'ntilde':241,
        'ograve':242,
        'oacute':243,
        'ocirc':244,
        'otilde':245,
        'ouml':246,
        'divide':247,
        'oslash':248,
        'ugrave':249,
        'uacute':250,
        'ucirc':251,
        'uuml':252,
        'yacute':253,
        'thorn':254,
        'yuml':255,
        'fnof':402,
        'Alpha':913,
        'Beta':914,
        'Gamma':915,
        'Delta':916,
        'Epsilon':917,
        'Zeta':918,
        'Eta':919,
        'Theta':920,
        'Iota':921,
        'Kappa':922,
        'Lambda':923,
        'Mu':924,
        'Nu':925,
        'Xi':926,
        'Omicron':927,
        'Pi':928,
        'Rho':929,
        'Sigma':931,
        'Tau':932,
        'Upsilon':933,
        'Phi':934,
        'Chi':935,
        'Psi':936,
        'Omega':937,
        'alpha':945,
        'beta':946,
        'gamma':947,
        'delta':948,
        'epsilon':949,
        'zeta':950,
        'eta':951,
        'theta':952,
        'iota':953,
        'kappa':954,
        'lambda':955,
        'mu':956,
        'nu':957,
        'xi':958,
        'omicron':959,
        'pi':960,
        'rho':961,
        'sigmaf':962,
        'sigma':963,
        'tau':964,
        'upsilon':965,
        'phi':966,
        'chi':967,
        'psi':968,
        'omega':969,
        'thetasym':977,
        'upsih':978,
        'piv':982,
        'bull':8226,
        'hellip':8230,
        'prime':8242,
        'Prime':8243,
        'oline':8254,
        'frasl':8260,
        'weierp':8472,
        'image':8465,
        'real':8476,
        'trade':8482,
        'alefsym':8501,
        'larr':8592,
        'uarr':8593,
        'rarr':8594,
        'darr':8595,
        'harr':8596,
        'crarr':8629,
        'lArr':8656,
        'uArr':8657,
        'rArr':8658,
        'dArr':8659,
        'hArr':8660,
        'forall':8704,
        'part':8706,
        'exist':8707,
        'empty':8709,
        'nabla':8711,
        'isin':8712,
        'notin':8713,
        'ni':8715,
        'prod':8719,
        'sum':8721,
        'minus':8722,
        'lowast':8727,
        'radic':8730,
        'prop':8733,
        'infin':8734,
        'ang':8736,
        'and':8743,
        'or':8744,
        'cap':8745,
        'cup':8746,
        'int':8747,
        'there4':8756,
        'sim':8764,
        'cong':8773,
        'asymp':8776,
        'ne':8800,
        'equiv':8801,
        'le':8804,
        'ge':8805,
        'sub':8834,
        'sup':8835,
        'nsub':8836,
        'sube':8838,
        'supe':8839,
        'oplus':8853,
        'otimes':8855,
        'perp':8869,
        'sdot':8901,
        'lceil':8968,
        'rceil':8969,
        'lfloor':8970,
        'rfloor':8971,
        'lang':9001,
        'rang':9002,
        'loz':9674,
        'spades':9824,
        'clubs':9827,
        'hearts':9829,
        'diams':9830,
        'OElig':338,
        'oelig':339,
        'Scaron':352,
        'scaron':353,
        'Yuml':376,
        'circ':710,
        'tilde':732,
        'ensp':8194,
        'emsp':8195,
        'thinsp':8201,
        'zwnj':8204,
        'zwj':8205,
        'lrm':8206,
        'rlm':8207,
        'ndash':8211,
        'mdash':8212,
        'lsquo':8216,
        'rsquo':8217,
        'sbquo':8218,
        'ldquo':8220,
        'rdquo':8221,
        'bdquo':8222,
        'dagger':8224,
        'Dagger':8225,
        'permil':8240,
        'lsaquo':8249,
        'rsaquo':8250,
        'euro':8364
      }



      module.exports  = entities;

      /***/ },
    /* 7 */
    /***/ function(module, exports) {


      module.exports = {
        'BEGIN': '{',
        'END': '}',
        'PRECOMPILE': false
      }

      /***/ },
    /* 8 */
    /***/ function(module, exports, __webpack_require__) {

      /**
       * render for component in browsers
       */

      var env = __webpack_require__(1);
      var Lexer = __webpack_require__(9);
      var Parser = __webpack_require__(10);
      var config = __webpack_require__(7);
      var _ = __webpack_require__(3);
      var extend = __webpack_require__(12);
      var shared = __webpack_require__(13);
      var combine = {};
      if(env.browser){
        var dom = __webpack_require__(15);
        var walkers = __webpack_require__(17);
        var Group = __webpack_require__(21);
        var doc = dom.doc;
        combine = __webpack_require__(19);
      }
      var events = __webpack_require__(23);
      var Watcher = __webpack_require__(24);
      var parse = __webpack_require__(14);
      var filter = __webpack_require__(25);
      var ERROR = __webpack_require__(16).ERROR;
      var nodeCursor = __webpack_require__(22);
      var shared = __webpack_require__(13);
      var NOOP = function(){};


      /**
       * `Regular` is regularjs's NameSpace and BaseClass. Every Component is inherited from it
       *
       * @class Regular
       * @module Regular
       * @constructor
       * @param {Object} options specification of the component
       */
      var Regular = function(definition, options){
        var prevRunning = env.isRunning;
        env.isRunning = true;
        var node, template, cursor, context = this, body, mountNode;
        options = options || {};
        definition = definition || {};



        var dtemplate = definition.template;

        if(env.browser) {

          if( node = tryGetSelector( dtemplate ) ){
            dtemplate = node;
          }
          if( dtemplate && dtemplate.nodeType ){
            definition.template = dtemplate.innerHTML
          }

          mountNode = definition.mountNode;
          if(typeof mountNode === 'string'){
            mountNode = dom.find( mountNode );
            if(!mountNode) throw Error('mountNode ' + mountNode + ' is not found')
          }

          if(mountNode){
            cursor = nodeCursor(mountNode.firstChild)
            delete definition.mountNode
          }else{
            cursor = options.cursor
          }
        }



        template = shared.initDefinition(context, definition)


        if(context.$parent){
          context.$parent._append(context);
        }
        context._children = [];
        context.$refs = {};
        context.$root = context.$root || context;

        var extra = options.extra;
        var oldModify = extra && extra.$$modify;


        var newExtra;
        if( body = context._body ){
          context._body = null
          var modifyBodyComponent = context.modifyBodyComponent;
          if( typeof modifyBodyComponent  === 'function'){
            modifyBodyComponent = modifyBodyComponent.bind(this)
            newExtra = _.createObject(extra);
            newExtra.$$modify = function( comp ){
              return modifyBodyComponent(comp, oldModify? oldModify: NOOP)
            }
          }else{ //@FIXIT: multiply modifier
            newExtra = extra
          }
          if(body.ast && body.ast.length){
            context.$body = _.getCompileFn(body.ast, body.ctx , {
              outer: context,
              namespace: options.namespace,
              extra: newExtra,
              record: true
            })
          }
        }

        // handle computed
        if(template){
          var cplOpt = {
            namespace: options.namespace,
            cursor: cursor
          }
          // if(extra && extra.$$modify){
          cplOpt.extra = {$$modify : extra&& extra.$$modify}
          // }
          context.group = context.$compile(template, cplOpt);
          combine.node(context);
        }



        // modify在compile之后调用， 这样就无需处理SSR相关逻辑

        if( oldModify ){
          oldModify(this);
        }

        // this is outest component
        if( !context.$parent ) context.$update();
        context.$ready = true;

        context.$emit("$init");
        if( context.init ) context.init( context.data );
        context.$emit("$afterInit");

        env.isRunning = prevRunning;

        // children is not required;

        if (this.devtools) {
          this.devtools.emit("init", this)
        }
      }

      // check if regular devtools hook exists
      if(typeof window !== 'undefined'){
        var devtools = window.__REGULAR_DEVTOOLS_GLOBAL_HOOK__;
        if (devtools) {
          Regular.prototype.devtools = devtools;
        }
      }

      walkers && (walkers.Regular = Regular);


      // description
      // -------------------------
      // 1. Regular and derived Class use same filter
      _.extend(Regular, {
        // private data stuff
        _directives: { __regexp__:[] },
        _plugins: {},
        _protoInheritCache: [ 'directive', 'use'] ,
        __after__: function(supr, o) {

          var template;
          this.__after__ = supr.__after__;

          // use name make the component global.
          if(o.name) Regular.component(o.name, this);
          // this.prototype.template = dom.initTemplate(o)
          if(template = o.template){
            var node, name;
            if( env.browser ){
              if( node = tryGetSelector(template) ) template = node ;
              if( template && template.nodeType ){

                if(name = dom.attr(template, 'name')) Regular.component(name, this);

                template = template.innerHTML;
              }
            }

            if(typeof template === 'string' ){
              this.prototype.template = config.PRECOMPILE? new Parser(template).parse(): template;
            }
          }

          if(o.computed) this.prototype.computed = shared.handleComputed(o.computed);
          // inherit directive and other config from supr
          Regular._inheritConfig(this, supr);

        },
        /**
         * Define a directive
         *
         * @method directive
         * @return {Object} Copy of ...
         */
        directive: function(name, cfg){
          if(!name) return;

          var type = typeof name;
          if(type === 'object' && !cfg){
            for(var k in name){
              if(name.hasOwnProperty(k)) this.directive(k, name[k]);
            }
            return this;
          }
          var directives = this._directives, directive;
          if(cfg == null){
            if( type === 'string' ){
              if(directive = directives[name]) return directive;
              else{

                var regexp = directives.__regexp__;
                for(var i = 0, len = regexp.length; i < len ; i++){
                  directive = regexp[i];
                  var test = directive.regexp.test(name);
                  if(test) return directive;
                }
              }
            }
          }else{
            if( typeof cfg === 'function') cfg = { link: cfg }
            if( type === 'string' ) directives[name] = cfg;
            else{
              cfg.regexp = name;
              directives.__regexp__.push(cfg)
            }
            return this
          }
        },
        plugin: function(name, fn){
          var plugins = this._plugins;
          if(fn == null) return plugins[name];
          plugins[name] = fn;
          return this;
        },
        use: function(fn){
          if(typeof fn === "string") fn = Regular.plugin(fn);
          if(typeof fn !== "function") return this;
          fn(this, Regular);
          return this;
        },
        // config the Regularjs's global
        config: function(name, value){
          var needGenLexer = false;
          if(typeof name === "object"){
            for(var i in name){
              // if you config
              if( i ==="END" || i==='BEGIN' )  needGenLexer = true;
              config[i] = name[i];
            }
          }
          if(needGenLexer) Lexer.setup();
        },
        expression: parse.expression,
        Parser: Parser,
        Lexer: Lexer,
        _addProtoInheritCache: function(name, transform){
          if( Array.isArray( name ) ){
            return name.forEach(Regular._addProtoInheritCache);
          }
          var cacheKey = "_" + name + "s"
          Regular._protoInheritCache.push(name)
          Regular[cacheKey] = {};
          if(Regular[name]) return;
          Regular[name] = function(key, cfg){
            var cache = this[cacheKey];

            if(typeof key === "object"){
              for(var i in key){
                if(key.hasOwnProperty(i)) this[name](i, key[i]);
              }
              return this;
            }
            if(cfg == null) return cache[key];
            cache[key] = transform? transform(cfg) : cfg;
            return this;
          }
        },
        _inheritConfig: function(self, supr){

          // prototype inherit some Regular property
          // so every Component will have own container to serve directive, filter etc..
          var defs = Regular._protoInheritCache;
          var keys = _.slice(defs);
          keys.forEach(function(key){
            self[key] = supr[key];
            var cacheKey = '_' + key + 's';
            if(supr[cacheKey]) self[cacheKey] = _.createObject(supr[cacheKey]);
          })
          return self;
        }

      });

      extend(Regular);

      Regular._addProtoInheritCache("component")

      Regular._addProtoInheritCache("filter", function(cfg){
        return typeof cfg === "function"? {get: cfg}: cfg;
      })


      events.mixTo(Regular);
      Watcher.mixTo(Regular);

      Regular.implement({
        init: function(){},
        config: function(){},
        destroy: function(){
          // destroy event wont propgation;
          this.$emit("$destroy");
          this._watchers = null;
          this._watchersForStable = null;
          this.group && this.group.destroy(true);
          this.group = null;
          this.parentNode = null;
          this._children = null;
          this.$root = null;
          this._handles = null;
          this.$refs = null;
          var parent = this.$parent;
          if(parent && parent._children){
            var index = parent._children.indexOf(this);
            parent._children.splice(index,1);
          }
          this.$parent = null;

          if (this.devtools) {
            this.devtools.emit("destroy", this)
          }
          this._handles = null;
          this.$phase = "destroyed";
        },

        /**
         * compile a block ast ; return a group;
         * @param  {Array} parsed ast
         * @param  {[type]} record
         * @return {[type]}
         */
        $compile: function(ast, options){
          options = options || {};
          if(typeof ast === 'string'){
            ast = new Parser(ast).parse()
          }
          var preExt = this.__ext__,
            record = options.record,
            records;

          if(options.extra) this.__ext__ = options.extra;


          if(record) this._record();
          var group = this._walk(ast, options);
          if(record){
            records = this._release();
            var self = this;
            if( records.length ){
              // auto destroy all wather;
              group.ondestroy = function(){ self.$unwatch(records); }
            }
          }
          if(options.extra) this.__ext__ = preExt;
          return group;
        },


        /**
         * create two-way binding with another component;
         * *warn*:
         *   expr1 and expr2 must can operate set&get, for example: the 'a.b' or 'a[b + 1]' is set-able, but 'a.b + 1' is not,
         *   beacuse Regular dont know how to inverse set through the expression;
         *
         *   if before $bind, two component's state is not sync, the component(passed param) will sync with the called component;
         *
         * *example: *
         *
         * ```javascript
         * // in this example, we need to link two pager component
         * var pager = new Pager({}) // pager compoennt
         * var pager2 = new Pager({}) // another pager component
         * pager.$bind(pager2, 'current'); // two way bind throw two component
         * pager.$bind(pager2, 'total');   //
         * // or just
         * pager.$bind(pager2, {"current": "current", "total": "total"})
         * ```
         *
         * @param  {Regular} component the
         * @param  {String|Expression} expr1     required, self expr1 to operate binding
         * @param  {String|Expression} expr2     optional, other component's expr to bind with, if not passed, the expr2 will use the expr1;
         * @return          this;
         */
        $bind: function(component, expr1, expr2){
          var type = _.typeOf(expr1);
          if( expr1.type === 'expression' || type === 'string' ){
            this._bind(component, expr1, expr2)
          }else if( type === "array" ){ // multiply same path binding through array
            for(var i = 0, len = expr1.length; i < len; i++){
              this._bind(component, expr1[i]);
            }
          }else if(type === "object"){
            for(var i in expr1) if(expr1.hasOwnProperty(i)){
              this._bind(component, i, expr1[i]);
            }
          }
          // digest
          component.$update();
          return this;
        },
        /**
         * unbind one component( see $bind also)
         *
         * unbind will unbind all relation between two component
         *
         * @param  {Regular} component [descriptionegular
         * @return {This}    this
         */
        $unbind: function(){
          // todo
        },
        $inject: combine.inject,
        $mute: function(isMute){

          isMute = !!isMute;

          var needupdate = isMute === false && this._mute;

          this._mute = !!isMute;

          if(needupdate) this.$update();
          return this;
        },
        // private bind logic
        _bind: function(component, expr1, expr2){

          var self = this;
          // basic binding

          if(!component || !(component instanceof Regular)) throw "$bind() should pass Regular component as first argument";
          if(!expr1) throw "$bind() should  pass as least one expression to bind";

          if(!expr2) expr2 = expr1;

          expr1 = parse.expression( expr1 );
          expr2 = parse.expression( expr2 );

          // set is need to operate setting ;
          if(expr2.set){
            var wid1 = this.$watch( expr1, function(value){
              component.$update(expr2, value)
            });
            component.$on('$destroy', function(){
              self.$unwatch(wid1)
            })
          }
          if(expr1.set){
            var wid2 = component.$watch(expr2, function(value){
              self.$update(expr1, value)
            });
            // when brother destroy, we unlink this watcher
            this.$on('$destroy', component.$unwatch.bind(component,wid2))
          }
          // sync the component's state to called's state
          expr2.set(component, expr1.get(this));
        },
        _walk: function(ast, options){
          if( Array.isArray(ast) ){
            var res = [];

            for(var i = 0, len = ast.length; i < len; i++){
              var ret = this._walk(ast[i], options);
              if(ret && ret.code === ERROR.UNMATCHED_AST){
                ast.splice(i, 1);
                i--;
                len--;
              }else res.push( ret );
            }
            return new Group(res);
          }
          if(typeof ast === 'string') return doc.createTextNode(ast)
          return walkers[ast.type || "default"].call(this, ast, options);
        },
        _append: function(component){
          this._children.push(component);
          component.$parent = this;
        },
        _handleEvent: function(elem, type, value, attrs){
          var Component = this.constructor,
            fire = typeof value !== "function"? _.handleEvent.call( this, value, type ) : value,
            handler = Component.event(type), destroy;

          if ( handler ) {
            destroy = handler.call(this, elem, fire, attrs);
          } else {
            dom.on(elem, type, fire);
          }
          return handler ? destroy : function() {
            dom.off(elem, type, fire);
          }
        },
        // 1. 用来处理exprBody -> Function
        // 2. list里的循环
        _touchExpr: function(expr, ext){
          var rawget, ext = this.__ext__, touched = {};
          if(expr.type !== 'expression' || expr.touched) return expr;

          rawget = expr.get;
          if(!rawget){
            rawget = expr.get = new Function(_.ctxName, _.extName , _.prefix+ "return (" + expr.body + ")");
            expr.body = null;
          }
          touched.get = !ext? rawget: function(context, e){
            return rawget( context, e || ext )
          }

          if(expr.setbody && !expr.set){
            var setbody = expr.setbody;
            var filters = expr.filters;
            var self = this;
            if(!filters || !_.some(filters, function(filter){ return !self._f_(filter).set }) ){
              expr.set = function(ctx, value, ext){
                expr.set = new Function(_.ctxName, _.setName , _.extName, _.prefix + setbody);
                return expr.set(ctx, value, ext);
              }
            }
            expr.filters = expr.setbody = null;
          }
          if(expr.set){
            touched.set = !ext? expr.set : function(ctx, value){
              return expr.set(ctx, value, ext);
            }
          }

          touched.type = 'expression';
          touched.touched = true;
          touched.once = expr.once || expr.constant;
          return touched
        },
        // find filter
        _f_: function(name){
          var Component = this.constructor;
          var filter = Component.filter(name);
          if(!filter) throw Error('filter ' + name + ' is undefined');
          return filter;
        },
        // simple accessor get
        _sg_:function(path, defaults, ext){
          if( path === undefined ) return undefined;
          if(ext && typeof ext === 'object'){
            if(ext[path] !== undefined)  return ext[path];
          }
          var computed = this.computed,
            computedProperty = computed[path];
          if(computedProperty){
            if(computedProperty.type==='expression' && !computedProperty.get) this._touchExpr(computedProperty);
            if(computedProperty.get)  return computedProperty.get(this);
            else _.log("the computed '" + path + "' don't define the get function,  get data."+path + " altnately", "warn")
          }

          if( defaults === undefined  ){
            return undefined;
          }
          return defaults[path];

        },
        // simple accessor set
        _ss_:function(path, value, data , op, computed){
          var computed = this.computed,
            op = op || "=", prev,
            computedProperty = computed? computed[path]:null;

          if(op !== '='){
            prev = computedProperty? computedProperty.get(this): data[path];
            switch(op){
              case "+=":
                value = prev + value;
                break;
              case "-=":
                value = prev - value;
                break;
              case "*=":
                value = prev * value;
                break;
              case "/=":
                value = prev / value;
                break;
              case "%=":
                value = prev % value;
                break;
            }
          }
          if(computedProperty) {
            if(computedProperty.set) return computedProperty.set(this, value);
            else _.log("the computed '" + path + "' don't define the set function,  assign data."+path + " altnately", "warn" )
          }
          data[path] = value;
          return value;
        }
      });

      Regular.prototype.inject = function(){
        _.log("use $inject instead of inject", "warn");
        return this.$inject.apply(this, arguments);
      }


      // only one builtin filter

      Regular.filter(filter);

      module.exports = Regular;



      function tryGetSelector(tpl){
        var node;
        if( typeof tpl === 'string' && tpl.length < 16 && (node = dom.find( tpl )) ) {
          _.log("pass selector as template has be deprecated, pass node or template string instead", 'warn')
          return node
        }
      }


      /***/ },
    /* 9 */
    /***/ function(module, exports, __webpack_require__) {

      var _ = __webpack_require__(3);
      var config = __webpack_require__(7);

      // some custom tag  will conflict with the Lexer progress
      var conflictTag = {"}": "{", "]": "["}, map1, map2;
      // some macro for lexer
      var macro = {
        'NAME': /(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,
        'IDENT': /[\$_A-Za-z][_0-9A-Za-z\$]*/,
        'SPACE': /[\r\n\t\f ]/
      }


      var test = /a|(b)/.exec("a");
      var testSubCapure = test && test[1] === undefined?
        function(str){ return str !== undefined }
        :function(str){return !!str};

      function wrapHander(handler){
        return function(all){
          return {type: handler, value: all }
        }
      }

      function Lexer(input, opts){
        if(conflictTag[config.END]){
          this.markStart = conflictTag[config.END];
          this.markEnd = config.END;
        }

        this.input = (input||"").trim();
        this.opts = opts || {};
        this.map = this.opts.mode !== 2?  map1: map2;
        this.states = ["INIT"];
        if(opts && opts.expression){
          this.states.push("JST");
          this.expression = true;
        }
      }

      var lo = Lexer.prototype


      lo.lex = function(str){
        str = (str || this.input).trim();
        var tokens = [], split, test,mlen, token, state;
        this.input = str,
          this.marks = 0;
        // init the pos index
        this.index=0;
        var i = 0;
        while(str){
          i++
          state = this.state();
          split = this.map[state]
          test = split.TRUNK.exec(str);
          if(!test){
            this.error('Unrecoginized Token');
          }
          mlen = test[0].length;
          str = str.slice(mlen)
          token = this._process.call(this, test, split, str)
          if(token) tokens.push(token)
          this.index += mlen;
          // if(state == 'TAG' || state == 'JST') str = this.skipspace(str);
        }

        tokens.push({type: 'EOF'});

        return tokens;
      }

      lo.error = function(msg){
        throw  Error("Parse Error: " + msg +  ':\n' + _.trackErrorPos(this.input, this.index));
      }

      lo._process = function(args, split,str){
        // console.log(args.join(","), this.state())
        var links = split.links, marched = false, token;

        for(var len = links.length, i=0;i<len ;i++){
          var link = links[i],
            handler = link[2],
            index = link[0];
          // if(args[6] === '>' && index === 6) console.log('haha')
          if(testSubCapure(args[index])) {
            marched = true;
            if(handler){
              token = handler.apply(this, _.slice(args, index, index + link[1]))
              if(token)  token.pos = this.index;
            }
            break;
          }
        }
        if(!marched){ // in ie lt8 . sub capture is "" but ont
          switch(str.charAt(0)){
            case "<":
              this.enter("TAG");
              break;
            default:
              this.enter("JST");
              break;
          }
        }
        return token;
      }
      lo.enter = function(state){
        this.states.push(state)
        return this;
      }

      lo.state = function(){
        var states = this.states;
        return states[states.length-1];
      }

      lo.leave = function(state){
        var states = this.states;
        if(!state || states[states.length-1] === state) states.pop()
      }


      Lexer.setup = function(){
        macro.END = config.END;
        macro.BEGIN = config.BEGIN;

        // living template lexer
        map1 = genMap([
          // INIT
          rules.BODY_END,
          rules.ENTER_JST,
          rules.ENTER_TAG,
          rules.TEXT,

          //TAG
          rules.TAG_NAME,
          rules.TAG_OPEN,
          rules.TAG_CLOSE,
          rules.TAG_PUNCHOR,
          rules.TAG_ENTER_JST,
          rules.TAG_UNQ_VALUE,
          rules.TAG_STRING,
          rules.TAG_SPACE,
          rules.TAG_COMMENT,

          // JST
          rules.JST_OPEN,
          rules.JST_BODY_OPEN,
          rules.JST_CLOSE,
          rules.JST_EXPR_OPEN,
          rules.JST_IDENT,
          rules.JST_SPACE,
          rules.JST_LEAVE,
          rules.JST_NUMBER,
          rules.JST_PUNCHOR,
          rules.JST_STRING,
          rules.JST_COMMENT
        ])

        // ignored the tag-relative token
        map2 = genMap([
          // INIT no < restrict
          rules.BODY_END,
          rules.ENTER_JST2,
          rules.TEXT,
          // JST
          rules.JST_OPEN,
          rules.JST_BODY_OPEN,
          rules.JST_CLOSE,
          rules.JST_EXPR_OPEN,
          rules.JST_IDENT,
          rules.JST_SPACE,
          rules.JST_LEAVE,
          rules.JST_NUMBER,
          rules.JST_PUNCHOR,
          rules.JST_STRING,
          rules.JST_COMMENT
        ])
      }


      function genMap(rules){
        var rule, map = {}, sign;
        for(var i = 0, len = rules.length; i < len ; i++){
          rule = rules[i];
          sign = rule[2] || 'INIT';
          ( map[sign] || (map[sign] = {rules:[], links:[]}) ).rules.push(rule);
        }
        return setup(map);
      }

      function setup(map){
        var split, rules, trunks, handler, reg, retain, rule;
        function replaceFn(all, one){
          return typeof macro[one] === 'string'?
            _.escapeRegExp(macro[one])
            : String(macro[one]).slice(1,-1);
        }

        for(var i in map){

          split = map[i];
          split.curIndex = 1;
          rules = split.rules;
          trunks = [];

          for(var j = 0,len = rules.length; j<len; j++){
            rule = rules[j];
            reg = rule[0];
            handler = rule[1];

            if(typeof handler === 'string'){
              handler = wrapHander(handler);
            }
            if(_.typeOf(reg) === 'regexp') reg = reg.toString().slice(1, -1);

            reg = reg.replace(/\{(\w+)\}/g, replaceFn)
            retain = _.findSubCapture(reg) + 1;
            split.links.push([split.curIndex, retain, handler]);
            split.curIndex += retain;
            trunks.push(reg);
          }
          split.TRUNK = new RegExp("^(?:(" + trunks.join(")|(") + "))")
        }
        return map;
      }

      var rules = {

        // 1. INIT
        // ---------------

        // mode1's JST ENTER RULE
        ENTER_JST: [/[^\x00<]*?(?={BEGIN})/, function(all){
          this.enter('JST');
          if(all) return {type: 'TEXT', value: all}
        }],

        // mode2's JST ENTER RULE
        ENTER_JST2: [/[^\x00]*?(?={BEGIN})/, function(all){
          this.enter('JST');
          if(all) return {type: 'TEXT', value: all}
        }],

        ENTER_TAG: [/[^\x00]*?(?=<[\w\/\!])/, function(all){
          this.enter('TAG');
          if(all) return {type: 'TEXT', value: all}
        }],

        // {~ <div></div> }
        BODY_END: [/{SPACE}*{END}/,  function(val){

          var states = this.states, slen = states.length;


          if(states[slen-2] === 'JST' ){

            this.leave('INIT');
            this.leave('JST');
            return {type: 'END'}
          }

          return { type: 'TEXT', value: val }

        } ],

        TEXT: [/[^\x00]+/, 'TEXT' ],

        // 2. TAG
        // --------------------
        TAG_NAME: [/{NAME}/, 'NAME', 'TAG'],
        TAG_UNQ_VALUE: [/[^\{}&"'=><`\r\n\f\t ]+/, 'UNQ', 'TAG'],

        TAG_OPEN: [/<({NAME})\s*/, function(all, one){ //"
          return {type: 'TAG_OPEN', value: one}
        }, 'TAG'],
        TAG_CLOSE: [/<\/({NAME})[\r\n\f\t ]*>/, function(all, one){
          this.leave();
          return {type: 'TAG_CLOSE', value: one }
        }, 'TAG'],

        // mode2's JST ENTER RULE
        TAG_ENTER_JST: [/(?={BEGIN})/, function(){
          this.enter('JST');
        }, 'TAG'],


        TAG_PUNCHOR: [/[\>\/=&]/, function(all){
          if(all === '>') this.leave();
          return {type: all, value: all }
        }, 'TAG'],

        TAG_STRING:  [ /'([^']*)'|"([^"]*)\"/, /*'*/  function(all, one, two){
          var value = one || two || "";

          return {type: 'STRING', value: value}
        }, 'TAG'],

        TAG_SPACE: [/{SPACE}+/, null, 'TAG'],
        TAG_COMMENT: [/<\!--([^\x00]*?)--\>/, function(all){
          this.leave()
          // this.leave('TAG')
        } ,'TAG'],

        // 3. JST
        // -------------------
        JST_OPEN: ['{BEGIN}#{SPACE}*({IDENT})', function(all, name){
          return {
            type: 'OPEN',
            value: name
          }
        }, 'JST'],
        // title = {~ <div></div>}
        JST_BODY_OPEN: ['{BEGIN}~{SPACE}*', function(all, name){
          this.enter('INIT');
          return {
            type: 'BODY_OPEN',
            value: name
          }
        }, 'JST'],
        JST_LEAVE: [/{END}/, function(all){
          if(this.markEnd === all && this.expression) return {type: this.markEnd, value: this.markEnd};
          if(!this.markEnd || !this.marks ){
            this.firstEnterStart = false;
            this.leave('JST');
            return {type: 'END'}
          }else{
            this.marks--;
            return {type: this.markEnd, value: this.markEnd}
          }
        }, 'JST'],
        JST_CLOSE: [/{BEGIN}\s*\/({IDENT})\s*{END}/, function(all, one){
          this.leave('JST');
          return {
            type: 'CLOSE',
            value: one
          }
        }, 'JST'],
        JST_COMMENT: [/{BEGIN}\!([^\x00]*?)\!{END}/, function(){
          this.leave();
        }, 'JST'],
        JST_EXPR_OPEN: ['{BEGIN}',function(all, one){
          if(all === this.markStart){
            if(this.expression) return { type: this.markStart, value: this.markStart };
            if(this.firstEnterStart || this.marks){
              this.marks++
              this.firstEnterStart = false;
              return { type: this.markStart, value: this.markStart };
            }else{
              this.firstEnterStart = true;
            }
          }
          return {
            type: 'EXPR_OPEN',
            escape: false
          }

        }, 'JST'],
        JST_IDENT: ['{IDENT}', 'IDENT', 'JST'],
        JST_SPACE: [/[ \r\n\f]+/, null, 'JST'],
        JST_PUNCHOR: [/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/, function(all){
          return { type: all, value: all }
        },'JST'],

        JST_STRING:  [ /'([^']*)'|"([^"]*)"/, function(all, one, two){ //"'
          return {type: 'STRING', value: one || two || ""}
        }, 'JST'],
        JST_NUMBER: [/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/, function(all){
          return {type: 'NUMBER', value: parseFloat(all, 10)};
        }, 'JST']
      }


      // setup when first config
      Lexer.setup();



      module.exports = Lexer;


      /***/ },
    /* 10 */
    /***/ function(module, exports, __webpack_require__) {

      var _ = __webpack_require__(3);

      var config = __webpack_require__(7);
      var node = __webpack_require__(11);
      var Lexer = __webpack_require__(9);
      var varName = _.varName;
      var ctxName = _.ctxName;
      var extName = _.extName;
      var isPath = _.makePredicate("STRING IDENT NUMBER");
      var isKeyWord = _.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object");
      var isInvalidTag = _.makePredicate("script style");
      var isLastBind = /\.bind$/;



      function Parser(input, opts){
        opts = opts || {};

        this.input = input;
        this.tokens = new Lexer(input, opts).lex();
        this.pos = 0;
        this.length = this.tokens.length;
      }


      var op = Parser.prototype;


      op.parse = function(){
        this.pos = 0;
        var res= this.program();
        if(this.ll().type === 'TAG_CLOSE'){
          this.error("You may got a unclosed Tag")
        }
        return res;
      }

      op.ll =  function(k){
        k = k || 1;
        if(k < 0) k = k + 1;
        var pos = this.pos + k - 1;
        if(pos > this.length - 1){
          return this.tokens[this.length-1];
        }
        return this.tokens[pos];
      }
      // lookahead
      op.la = function(k){
        return (this.ll(k) || '').type;
      }

      op.match = function(type, value){
        var ll;
        if(!(ll = this.eat(type, value))){
          ll  = this.ll();
          this.error('expect [' + type + (value == null? '':':'+ value) + ']" -> got "[' + ll.type + (value==null? '':':'+ll.value) + ']', ll.pos)
        }else{
          return ll;
        }
      }

      op.error = function(msg, pos){
        msg =  "\n【 parse failed 】 " + msg +  ':\n\n' + _.trackErrorPos(this.input, typeof pos === 'number'? pos: this.ll().pos||0);
        throw new Error(msg);
      }

      op.next = function(k){
        k = k || 1;
        this.pos += k;
      }
      op.eat = function(type, value){
        var ll = this.ll();
        if(typeof type !== 'string'){
          for(var len = type.length ; len--;){
            if(ll.type === type[len]) {
              this.next();
              return ll;
            }
          }
        }else{
          if( ll.type === type && (typeof value === 'undefined' || ll.value === value) ){
            this.next();
            return ll;
          }
        }
        return false;
      }

      // program
      //  :EOF
      //  | (statement)* EOF
      op.program = function(isAttr){
        var statements = [],  ll = this.ll();
        while(ll.type !== 'EOF' && ll.type !=='TAG_CLOSE'){

          statements.push(this.statement());
          ll = this.ll();
          // {~ <div></div>}
          if( isAttr && ll.type === 'END'){
            this.next();
            return node.body(statements)
          }
        }
        // if(ll.type === 'TAG_CLOSE') this.error("You may have unmatched Tag")
        return statements;
      }

      // statement
      //  : xml
      //  | jst
      //  | text
      var rRN = /\r\n/g;
      op.statement = function(){
        var ll = this.ll();
        switch(ll.type){
          case 'NAME':
          case 'TEXT':
            var text = ll.value;
            this.next();
            while(ll = this.eat(['NAME', 'TEXT'])){
              text += ll.value;
            }
            return node.text(text.replace(rRN, '\n'));
          case 'TAG_OPEN':
            return this.xml();
          case 'OPEN':
            return this.directive();
          case 'EXPR_OPEN':
            return this.interplation();
          default:
            this.error('Unexpected token: '+ this.la())
        }
      }

      // xml
      // stag statement* TAG_CLOSE?(if self-closed tag)
      op.xml = function(){
        var name, attrs, children, selfClosed;
        name = this.match('TAG_OPEN').value;

        if( isInvalidTag(name)){
          this.error('Invalid Tag: ' + name);
        }
        attrs = this.attrs();
        selfClosed = this.eat('/')
        this.match('>');
        if( !selfClosed && !_.isVoidTag(name) ){
          children = this.program();
          if(!this.eat('TAG_CLOSE', name)) this.error('expect </'+name+'> got'+ 'no matched closeTag')
        }
        return node.element(name, attrs, children);
      }

      // xentity
      //  -rule(wrap attribute)
      //  -attribute
      //
      // __example__
      //  name = 1 |
      //  ng-hide |
      //  on-click={{}} |
      //  {{#if name}}on-click={{xx}}{{#else}}on-tap={{}}{{/if}}

      op.xentity = function(ll){
        var name = ll.value, value, modifier;
        if(ll.type === 'NAME'){
          //@ only for test
          if(~name.indexOf('.')){
            var tmp = name.split('.');
            name = tmp[0];
            modifier = tmp[1]

          }
          if( this.eat("=") ) value = this.attvalue(modifier);
          return node.attribute( name, value, modifier );
        }else{
          if( name !== 'if') this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #" + name + ' is invalid');
          return this['if'](true);
        }

      }

      // stag     ::=    '<' Name (S attr)* S? '>'
      // attr    ::=     Name Eq attvalue
      op.attrs = function(isAttribute){
        var eat
        if(!isAttribute){
          eat = ["NAME", "OPEN"]
        }else{
          eat = ["NAME"]
        }

        var attrs = [], ll;
        while (ll = this.eat(eat)){
          attrs.push(this.xentity( ll ))
        }
        return attrs;
      }

      // attvalue
      //  : STRING
      //  | NAME
      op.attvalue = function(mdf){
        var ll = this.ll();
        switch(ll.type){
          case "NAME":
          case "UNQ":
          case "STRING":
            this.next();
            var value = ll.value;
            return value;
          case "EXPR_OPEN":
            return this.interplation();
          case "BODY_OPEN":
            this.next();
            return this.program(true);
          default:
            this.error('Unexpected token: '+ this.la())
        }
      }


      // {{#}}
      op.directive = function(){
        var name = this.ll().value;
        this.next();
        if(typeof this[name] === 'function'){
          return this[name]()
        }else{
          this.error('Undefined directive['+ name +']');
        }
      }





      // {{}}
      op.interplation = function(){
        this.match('EXPR_OPEN');
        var res = this.expression(true);
        this.match('END');
        return res;
      }

      // {{~}}
      op.inc = op.include = function(){
        var content = this.expression();
        this.match('END');
        return node.template(content);
      }

      // {{#if}}
      op["if"] = function(tag){
        var test = this.expression();
        var consequent = [], alternate=[];

        var container = consequent;
        var statement = !tag? "statement" : "attrs";

        this.match('END');

        var ll, close;
        while( ! (close = this.eat('CLOSE')) ){
          ll = this.ll();
          if( ll.type === 'OPEN' ){
            switch( ll.value ){
              case 'else':
                container = alternate;
                this.next();
                this.match( 'END' );
                break;
              case 'elseif':
                this.next();
                alternate.push( this["if"](tag) );
                return node['if']( test, consequent, alternate );
              default:
                container.push( this[statement](true) );
            }
          }else{
            container.push(this[statement](true));
          }
        }
        // if statement not matched
        if(close.value !== "if") this.error('Unmatched if directive')
        return node["if"](test, consequent, alternate);
      }


      // @mark   mustache syntax have natrure dis, canot with expression
      // {{#list}}
      op.list = function(){
        // sequence can be a list or hash
        var sequence = this.expression(), variable, ll, track;
        var consequent = [], alternate=[];
        var container = consequent;

        this.match('IDENT', 'as');

        variable = this.match('IDENT').value;

        if(this.eat('IDENT', 'by')){
          if(this.eat('IDENT',variable + '_index')){
            track = true;
          }else{
            track = this.expression();
            if(track.constant){
              // true is means constant, we handle it just like xxx_index.
              track = true;
            }
          }
        }

        this.match('END');

        while( !(ll = this.eat('CLOSE')) ){
          if(this.eat('OPEN', 'else')){
            container =  alternate;
            this.match('END');
          }else{
            container.push(this.statement());
          }
        }

        if(ll.value !== 'list') this.error('expect ' + 'list got ' + '/' + ll.value + ' ', ll.pos );
        return node.list(sequence, variable, consequent, alternate, track);
      }


      op.expression = function(){
        var expression;
        if(this.eat('@(')){ //once bind
          expression = this.expr();
          expression.once = true;
          this.match(')')
        }else{
          expression = this.expr();
        }
        return expression;
      }

      op.expr = function(){
        this.depend = [];

        var buffer = this.filter()

        var body = buffer.get || buffer;
        var setbody = buffer.set;
        return node.expression(body, setbody, !this.depend.length, buffer.filters);
      }


      // filter
      // assign ('|' filtername[':' args]) *
      op.filter = function(){
        var left = this.assign();
        var ll = this.eat('|');
        var buffer = [], filters,setBuffer, prefix,
          attr = "t",
          set = left.set, get,
          tmp = "";

        if(ll){
          if(set) {
            setBuffer = [];
            filters = [];
          }

          prefix = "(function(" + attr + "){";

          do{
            var filterName = this.match('IDENT').value;
            tmp = attr + " = " + ctxName + "._f_('" + filterName + "' ).get.call( "+_.ctxName +"," + attr ;
            if(this.eat(':')){
              tmp +=", "+ this.arguments("|").join(",") + ");"
            }else{
              tmp += ');'
            }
            buffer.push(tmp);

            if(set){
              // only in runtime ,we can detect  whether  the filter has a set function.
              filters.push(filterName);
              setBuffer.unshift( tmp.replace(" ).get.call", " ).set.call") );
            }

          }while(ll = this.eat('|'));
          buffer.push("return " + attr );
          setBuffer && setBuffer.push("return " + attr);

          get =  prefix + buffer.join("") + "})("+left.get+")";
          // we call back to value.
          if(setBuffer){
            // change _ss__(name, _p_) to _s__(name, filterFn(_p_));
            set = set.replace(_.setName,
              prefix + setBuffer.join("") + "})("+　_.setName　+")" );

          }
          // the set function is depend on the filter definition. if it have set method, the set will work
          var ret = getset(get, set);
          ret.filters = filters;
          return ret;
        }
        return left;
      }

      // assign
      // left-hand-expr = condition
      op.assign = function(){
        var left = this.condition(), ll;
        if(ll = this.eat(['=', '+=', '-=', '*=', '/=', '%='])){
          if(!left.set) this.error('invalid lefthand expression in assignment expression');
          return getset( left.set.replace( "," + _.setName, "," + this.condition().get ).replace("'='", "'"+ll.type+"'"), left.set);
          // return getset('(' + left.get + ll.type  + this.condition().get + ')', left.set);
        }
        return left;
      }

      // or
      // or ? assign : assign
      op.condition = function(){

        var test = this.or();
        if(this.eat('?')){
          return getset([test.get + "?",
            this.assign().get,
            this.match(":").type,
            this.assign().get].join(""));
        }

        return test;
      }

      // and
      // and && or
      op.or = function(){

        var left = this.and();

        if(this.eat('||')){
          return getset(left.get + '||' + this.or().get);
        }

        return left;
      }
      // equal
      // equal && and
      op.and = function(){

        var left = this.equal();

        if(this.eat('&&')){
          return getset(left.get + '&&' + this.and().get);
        }
        return left;
      }
      // relation
      //
      // equal == relation
      // equal != relation
      // equal === relation
      // equal !== relation
      op.equal = function(){
        var left = this.relation(), ll;
        // @perf;
        if( ll = this.eat(['==','!=', '===', '!=='])){
          return getset(left.get + ll.type + this.equal().get);
        }
        return left
      }
      // relation < additive
      // relation > additive
      // relation <= additive
      // relation >= additive
      // relation in additive
      op.relation = function(){
        var left = this.additive(), ll;
        // @perf
        if(ll = (this.eat(['<', '>', '>=', '<=']) || this.eat('IDENT', 'in') )){
          return getset(left.get + ll.value + this.relation().get);
        }
        return left
      }
      // additive :
      // multive
      // additive + multive
      // additive - multive
      op.additive = function(){
        var left = this.multive() ,ll;
        if(ll= this.eat(['+','-']) ){
          return getset(left.get + ll.value + this.additive().get);
        }
        return left
      }
      // multive :
      // unary
      // multive * unary
      // multive / unary
      // multive % unary
      op.multive = function(){
        var left = this.range() ,ll;
        if( ll = this.eat(['*', '/' ,'%']) ){
          return getset(left.get + ll.type + this.multive().get);
        }
        return left;
      }

      op.range = function(){
        var left = this.unary(), ll, right;

        if(ll = this.eat('..')){
          right = this.unary();
          var body =
            "(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+left.get+","+right.get+")"
          return getset(body);
        }

        return left;
      }



      // lefthand
      // + unary
      // - unary
      // ~ unary
      // ! unary
      op.unary = function(){
        var ll;
        if(ll = this.eat(['+','-','~', '!'])){
          return getset('(' + ll.type + this.unary().get + ')') ;
        }else{
          return this.member()
        }
      }

      // call[lefthand] :
      // member args
      // member [ expression ]
      // member . ident

      op.member = function(base, last, pathes, prevBase){
        var ll, path;


        var onlySimpleAccessor = false;
        if(!base){ //first
          path = this.primary();
          var type = typeof path;
          if(type === 'string'){
            pathes = [];
            pathes.push( path );
            last = path;
            base = ctxName + "._sg_('" + path + "', " + varName + ", " + extName + ")";
            onlySimpleAccessor = true;
          }else{ //Primative Type
            if(path.get === 'this'){
              base = ctxName;
              pathes = ['this'];
            }else{
              pathes = null;
              base = path.get;
            }
          }
        }else{ // not first enter
          if(typeof last === 'string' && isPath( last) ){ // is valid path
            pathes.push(last);
          }else{
            if(pathes && pathes.length) this.depend.push(pathes);
            pathes = null;
          }
        }
        if(ll = this.eat(['[', '.', '('])){
          switch(ll.type){
            case '.':
              // member(object, property, computed)
              var tmpName = this.match('IDENT').value;
              prevBase = base;
              if( this.la() !== "(" ){
                base = ctxName + "._sg_('" + tmpName + "', " + base + ")";
              }else{
                base += "." + tmpName ;
              }
              return this.member( base, tmpName, pathes,  prevBase);
            case '[':
              // member(object, property, computed)
              path = this.assign();
              prevBase = base;
              if( this.la() !== "(" ){
                // means function call, we need throw undefined error when call function
                // and confirm that the function call wont lose its context
                base = ctxName + "._sg_(" + path.get + ", " + base + ")";
              }else{
                base += "[" + path.get + "]";
              }
              this.match(']')
              return this.member(base, path, pathes, prevBase);
            case '(':
              // call(callee, args)

              base = base.replace(isLastBind, '.__bind__')
              var args = this.arguments().join(',');

              base =  base+"(" + args +")";
              this.match(')')
              return this.member(base, null, pathes);
          }
        }
        if( pathes && pathes.length ) this.depend.push( pathes );
        var res =  {get: base};
        if(last){
          res.set = ctxName + "._ss_(" +
            (last.get? last.get : "'"+ last + "'") +
            ","+ _.setName + ","+
            (prevBase?prevBase:_.varName) +
            ", '=', "+ ( onlySimpleAccessor? 1 : 0 ) + ")";

        }
        return res;
      }

      /**
       *
       */
      op.arguments = function(end){
        end = end || ')'
        var args = [];
        do{
          if(this.la() !== end){
            args.push(this.assign().get)
          }
        }while( this.eat(','));
        return args
      }


      // primary :
      // this
      // ident
      // literal
      // array
      // object
      // ( expression )

      op.primary = function(){
        var ll = this.ll();
        switch(ll.type){
          case "{":
            return this.object();
          case "[":
            return this.array();
          case "(":
            return this.paren();
          // literal or ident
          case 'STRING':
            this.next();
            var value = "" + ll.value;
            var quota = ~value.indexOf("'")? "\"": "'" ;
            return getset(quota + value + quota);
          case 'NUMBER':
            this.next();
            return getset( "" + ll.value );
          case "IDENT":
            this.next();
            if(isKeyWord(ll.value)){
              return getset( ll.value );
            }
            return ll.value;
          default:
            this.error('Unexpected Token: ' + ll.type);
        }
      }

      // object
      //  {propAssign [, propAssign] * [,]}

      // propAssign
      //  prop : assign

      // prop
      //  STRING
      //  IDENT
      //  NUMBER

      op.object = function(){
        var code = [this.match('{').type];

        var ll = this.eat( ['STRING', 'IDENT', 'NUMBER'] );
        while(ll){
          code.push("'" + ll.value + "'" + this.match(':').type);
          var get = this.assign().get;
          code.push(get);
          ll = null;
          if(this.eat(",") && (ll = this.eat(['STRING', 'IDENT', 'NUMBER'])) ) code.push(",");
        }
        code.push(this.match('}').type);
        return {get: code.join("")}
      }

      // array
      // [ assign[,assign]*]
      op.array = function(){
        var code = [this.match('[').type], item;
        if( this.eat("]") ){

          code.push("]");
        } else {
          while(item = this.assign()){
            code.push(item.get);
            if(this.eat(',')) code.push(",");
            else break;
          }
          code.push(this.match(']').type);
        }
        return {get: code.join("")};
      }

      // '(' expression ')'
      op.paren = function(){
        this.match('(');
        var res = this.filter()
        res.get = '(' + res.get + ')';
        res.set = res.set;
        this.match(')');
        return res;
      }

      function getset(get, set){
        return {
          get: get,
          set: set
        }
      }



      module.exports = Parser;


      /***/ },
    /* 11 */
    /***/ function(module, exports) {

      module.exports = {
        element: function(name, attrs, children){
          return {
            type: 'element',
            tag: name,
            attrs: attrs,
            children: children
          }
        },
        attribute: function(name, value, mdf){
          return {
            type: 'attribute',
            name: name,
            value: value,
            mdf: mdf
          }
        },
        "if": function(test, consequent, alternate){
          return {
            type: 'if',
            test: test,
            consequent: consequent,
            alternate: alternate
          }
        },
        list: function(sequence, variable, body, alternate, track){
          return {
            type: 'list',
            sequence: sequence,
            alternate: alternate,
            variable: variable,
            body: body,
            track: track
          }
        },
        expression: function( body, setbody, constant, filters ){
          return {
            type: "expression",
            body: body,
            constant: constant || false,
            setbody: setbody || false,
            filters: filters
          }
        },
        // {~ <div>{name}</div>}
        body: function( body ){
          return {
            type: "body",
            body: body
          }
        },
        text: function(text){
          return {
            type: "text",
            text: text
          }
        },
        template: function(template){
          return {
            type: 'template',
            content: template
          }
        }
      }


      /***/ },
    /* 12 */
    /***/ function(module, exports, __webpack_require__) {

      // (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
      // Backbone may be freely distributed under the MIT license.
      // For all details and documentation:
      // http://backbonejs.org

      // klass: a classical JS OOP façade
      // https://github.com/ded/klass
      // License MIT (c) Dustin Diaz 2014

      // inspired by backbone's extend and klass
      var _ = __webpack_require__(3),
        fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
        isFn = function(o){return typeof o === "function"};

      var hooks = {
        events: function( propertyValue, proto ){
          var eventListeners = proto._eventListeners || [];
          var normedEvents = _.normListener(propertyValue);

          if(normedEvents.length) {
            proto._eventListeners = eventListeners.concat( normedEvents );
          }
          delete proto.events ;
        }
      }


      function wrap( k, fn, supro ) {
        return function () {
          var tmp = this.supr;
          this.supr = supro[k];
          var ret = fn.apply(this, arguments);
          this.supr = tmp;
          return ret;
        }
      }

      function process( what, o, supro ) {
        for ( var k in o ) {
          if (o.hasOwnProperty(k)) {
            if(hooks.hasOwnProperty(k)) {
              hooks[k](o[k], what, supro)
            }
            what[k] = isFn( o[k] ) && isFn( supro[k] ) &&
            fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
          }
        }
      }

      // if the property is ["events", "data", "computed"] , we should merge them
      var merged = ["data", "computed"], mlen = merged.length;
      module.exports = function extend(o){
        o = o || {};
        var supr = this, proto,
          supro = supr && supr.prototype || {};

        if(typeof o === 'function'){
          proto = o.prototype;
          o.implement = implement;
          o.extend = extend;
          return o;
        }

        function fn() {
          supr.apply(this, arguments);
        }

        proto = _.createProto(fn, supro);

        function implement(o){
          // we need merge the merged property
          var len = mlen;
          for(;len--;){
            var prop = merged[len];
            if(proto[prop] && o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
              _.extend(proto[prop], o[prop], true)
              delete o[prop];
            }
          }


          process(proto, o, supro);
          return this;
        }



        fn.implement = implement
        fn.implement(o)
        if(supr.__after__) supr.__after__.call(fn, supr, o);
        fn.extend = extend;
        return fn;
      }



      /***/ },
    /* 13 */
    /***/ function(module, exports, __webpack_require__) {

      var _ = __webpack_require__(3);
      var config = __webpack_require__(7);
      var parse = __webpack_require__(14);
      var node = __webpack_require__(11);


      function initDefinition(context, definition, beforeConfig){

        var eventConfig, hasInstanceComputed = !!definition.computed, template;
        var usePrototyeString = typeof context.template === 'string' && !definition.template;

        // template is a string (len < 16). we will find it container first

        definition.data = definition.data || {};
        definition.computed = definition.computed || {};
        if( context.data ) _.extend( definition.data, context.data );
        if( context.computed ) _.extend( definition.computed, context.computed );

        var listeners = context._eventListeners || [];
        var normListener;
        // hanle initialized event binding
        if( definition.events){
          normListener = _.normListener(definition.events);
          if(normListener.length){
            listeners = listeners.concat(normListener)
          }
          delete definition.events;
        }


        definition.data = definition.data || {};
        definition.computed = definition.computed || {};
        if(context.data) _.extend(definition.data, context.data);
        if(context.computed) _.extend(definition.computed, context.computed);

        var usePrototyeString = typeof context.template === 'string' && !definition.template;

        _.extend(context, definition, true);



        if(listeners && listeners.length){
          listeners.forEach(function( item ){
            context.$on(item.type, item.listener)
          })
        }


        // we need add some logic at client.
        beforeConfig && beforeConfig();

        // only have instance computed, we need prepare the property
        if( hasInstanceComputed ) context.computed = handleComputed(context.computed);

        context.$emit( "$config", context.data );
        context.config && context.config( context.data );
        context.$emit( "$afterConfig", context.data );

        template = context.template;


        if(typeof template === 'string') {
          template = parse.parse(template);
          if(usePrototyeString) {
            // avoid multiply compile
            context.constructor.prototype.template = template;
          }else{
            delete context.template;
          }
        }
        return template;
      }

      var handleComputed = (function(){
        // wrap the computed getter;
        function wrapGet(get){
          return function(context){
            return get.call(context, context.data );
          }
        }
        // wrap the computed setter;
        function wrapSet(set){
          return function(context, value){
            set.call( context, value, context.data );
            return value;
          }
        }

        return function( computed ){
          if(!computed) return;
          var parsedComputed = {}, handle, pair, type;
          for(var i in computed){
            handle = computed[i]
            type = typeof handle;

            if(handle.type === 'expression'){
              parsedComputed[i] = handle;
              continue;
            }
            if( type === "string" ){
              parsedComputed[i] = parse.expression(handle)
            }else{
              pair = parsedComputed[i] = {type: 'expression'};
              if(type === "function" ){
                pair.get = wrapGet(handle);
              }else{
                if(handle.get) pair.get = wrapGet(handle.get);
                if(handle.set) pair.set = wrapSet(handle.set);
              }
            }
          }
          return parsedComputed;
        }
      })();


      function prepareAttr ( ast ,directive ){
        if(ast.parsed ) return ast;
        var value = ast.value;
        var name=  ast.name, body, constant;
        if(typeof value === 'string' && ~value.indexOf(config.BEGIN) && ~value.indexOf(config.END) ){
          if( !directive || !directive.nps ) {
            var parsed = parse.parse(value, { mode: 2 });
            if(parsed.length === 1 && parsed[0].type === 'expression'){
              body = parsed[0];
            } else{
              constant = true;
              body = [];
              parsed.forEach(function(item){
                if(!item.constant) constant=false;
                // silent the mutiple inteplation
                body.push(item.body || "'" + item.text.replace(/'/g, "\\'") + "'");
              });
              body = node.expression("[" + body.join(",") + "].join('')", null, constant);
            }
            ast.value = body;
          }
        }
        ast.parsed = true;
        return ast;
      }

      module.exports = {
        // share logic between server and client
        initDefinition: initDefinition,
        handleComputed: handleComputed,
        prepareAttr: prepareAttr
      }

      /***/ },
    /* 14 */
    /***/ function(module, exports, __webpack_require__) {

      var exprCache = __webpack_require__(1).exprCache;
      var _ = __webpack_require__(3);
      var Parser = __webpack_require__(10);
      module.exports = {
        expression: function(expr, simple){
          // @TODO cache
          if( typeof expr === 'string' && ( expr = expr.trim() ) ){
            expr = exprCache.get( expr ) || exprCache.set( expr, new Parser( expr, { mode: 2, expression: true } ).expression() )
          }
          if(expr) return expr;
        },
        parse: function(template){
          return new Parser(template).parse();
        }
      }



      /***/ },
    /* 15 */
    /***/ function(module, exports, __webpack_require__) {

      /*jshint -W082 */

      // thanks for angular && mootools for some concise&cross-platform  implemention
      // =====================================

      // The MIT License
      // Copyright (c) 2010-2014 Google, Inc. http://angularjs.org

      // ---
      // license: MIT-style license. http://mootools.net


      if(typeof window !== 'undefined'){

        var dom = module.exports;
        var env = __webpack_require__(1);
        var _ = __webpack_require__(3);
        var consts = __webpack_require__(16);
        var tNode = document.createElement('div')
        var addEvent, removeEvent;
        var noop = function(){}

        var namespaces = consts.NAMESPACE;

        dom.body = document.body;
        dom.doc = document;
        dom.tNode = tNode;


        // camelCase
        var camelCase = function (str){
          return ("" + str).replace(/-\D/g, function(match){
            return match.charAt(1).toUpperCase();
          });
        }



        if(tNode.addEventListener){
          addEvent = function(node, type, fn) {
            node.addEventListener(type, fn, false);
          }
          removeEvent = function(node, type, fn) {
            node.removeEventListener(type, fn, false)
          }
        }else{
          addEvent = function(node, type, fn) {
            node.attachEvent('on' + type, fn);
          }
          removeEvent = function(node, type, fn) {
            node.detachEvent('on' + type, fn);
          }
        }


        dom.msie = parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
        if (isNaN(dom.msie)) {
          dom.msie = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]);
        }

        dom.find = function(sl){
          if(document.querySelector) {
            try{
              return document.querySelector(sl);
            }catch(e){

            }
          }
          if(sl.indexOf('#')!==-1) return document.getElementById( sl.slice(1) );
        }


        dom.inject = function(node, refer, position){

          position = position || 'bottom';
          if(!node) return ;
          if(Array.isArray(node)){
            var tmp = node;
            node = dom.fragment();
            for(var i = 0,len = tmp.length; i < len ;i++){
              node.appendChild(tmp[i])
            }
          }

          var firstChild, next;
          switch(position){
            case 'bottom':
              refer.appendChild( node );
              break;
            case 'top':
              if( firstChild = refer.firstChild ){
                refer.insertBefore( node, refer.firstChild );
              }else{
                refer.appendChild( node );
              }
              break;
            case 'after':
              if( next = refer.nextSibling ){
                next.parentNode.insertBefore( node, next );
              }else{
                refer.parentNode.appendChild( node );
              }
              break;
            case 'before':
              refer.parentNode.insertBefore( node, refer );
          }
        }


        dom.id = function(id){
          return document.getElementById(id);
        }

        // createElement
        dom.create = function(type, ns){
          if(ns === 'svg'){
            if(!env.svg) throw Error('the env need svg support')
            ns = namespaces.svg;
          }
          return !ns? document.createElement(type): document.createElementNS(ns, type);
        }

        // documentFragment
        dom.fragment = function(){
          return document.createDocumentFragment();
        }




        var specialAttr = {
          'class': function(node, value){
            ('className' in node && (!node.namespaceURI || node.namespaceURI === namespaces.html  )) ?
              node.className = (value || '') : node.setAttribute('class', value);
          },
          'for': function(node, value){
            ('htmlFor' in node) ? node.htmlFor = value : node.setAttribute('for', value);
          },
          'style': function(node, value){
            (node.style) ? node.style.cssText = value : node.setAttribute('style', value);
          },
          'value': function(node, value){
            node.value = (value != null) ? value : '';
          }
        }


        // attribute Setter & Getter
        dom.attr = function(node, name, value){
          if (_.isBooleanAttr(name)) {
            if (typeof value !== 'undefined') {
              if (!!value) {
                node[name] = true;
                node.setAttribute(name, name);
                // lt ie7 . the javascript checked setting is in valid
                //http://bytes.com/topic/javascript/insights/799167-browser-quirk-dynamically-appended-checked-checkbox-does-not-appear-checked-ie
                if(dom.msie && dom.msie <=7 && name === 'checked' ) node.defaultChecked = true
              } else {
                node[name] = false;
                node.removeAttribute(name);
              }
            } else {
              return (node[name] ||
                (node.attributes.getNamedItem(name)|| noop).specified) ? name : undefined;
            }
          } else if (typeof (value) !== 'undefined') {
            // if in specialAttr;
            if(specialAttr[name]) specialAttr[name](node, value);
            else if(value === null) node.removeAttribute(name)
            else node.setAttribute(name, value);
          } else if (node.getAttribute) {
            // the extra argument "2" is to get the right thing for a.href in IE, see jQuery code
            // some elements (e.g. Document) don't have get attribute, so return undefined
            var ret = node.getAttribute(name, 2);
            // normalize non-existing attributes to undefined (as jQuery)
            return ret === null ? undefined : ret;
          }
        }


        dom.on = function(node, type, handler){
          var types = type.split(' ');
          handler.real = function(ev){
            var $event = new Event(ev);
            $event.origin = node;
            handler.call(node, $event);
          }
          types.forEach(function(type){
            type = fixEventName(node, type);
            addEvent(node, type, handler.real);
          });
          return dom;
        }
        dom.off = function(node, type, handler){
          var types = type.split(' ');
          handler = handler.real || handler;
          types.forEach(function(type){
            type = fixEventName(node, type);
            removeEvent(node, type, handler);
          })
        }


        dom.text = (function (){
          var map = {};
          if (dom.msie && dom.msie < 9) {
            map[1] = 'innerText';
            map[3] = 'nodeValue';
          } else {
            map[1] = map[3] = 'textContent';
          }

          return function (node, value) {
            var textProp = map[node.nodeType];
            if (value == null) {
              return textProp ? node[textProp] : '';
            }
            node[textProp] = value;
          }
        })();


        dom.html = function( node, html ){
          if(typeof html === "undefined"){
            return node.innerHTML;
          }else{
            node.innerHTML = html;
          }
        }

        dom.replace = function(node, replaced){
          if(replaced.parentNode) replaced.parentNode.replaceChild(node, replaced);
        }

        dom.remove = function(node){
          if(node.parentNode) node.parentNode.removeChild(node);
        }

        // css Settle & Getter from angular
        // =================================
        // it isnt computed style
        dom.css = function(node, name, value){
          if( typeof (name) === "object" && name ){
            for(var i in name){
              if( name.hasOwnProperty(i) ){
                dom.css( node, i, name[i] );
              }
            }
            return;
          }
          if ( typeof value !== "undefined" ) {

            name = camelCase(name);
            if(name) node.style[name] = value;

          } else {

            var val;
            if (dom.msie <= 8) {
              // this is some IE specific weirdness that jQuery 1.6.4 does not sure why
              val = node.currentStyle && node.currentStyle[name];
              if (val === '') val = 'auto';
            }
            val = val || node.style[name];
            if (dom.msie <= 8) {
              val = val === '' ? undefined : val;
            }
            return  val;
          }
        }

        dom.addClass = function(node, className){
          var current = node.className || "";
          if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
            node.className = current? ( current + " " + className ) : className;
          }
        }

        dom.delClass = function(node, className){
          var current = node.className || "";
          node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
        }

        dom.hasClass = function(node, className){
          var current = node.className || "";
          return (" " + current + " ").indexOf(" " + className + " ") !== -1;
        }



        // simple Event wrap

        //http://stackoverflow.com/questions/11068196/ie8-ie7-onchange-event-is-emited-only-after-repeated-selection
        function fixEventName(elem, name){
          return (name === 'change'  &&  dom.msie < 9 &&
            (elem && elem.tagName && elem.tagName.toLowerCase()==='input' &&
              (elem.type === 'checkbox' || elem.type === 'radio')
            )
          )? 'click': name;
        }

        var rMouseEvent = /^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/
        var doc = document;
        doc = (!doc.compatMode || doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
        function Event(ev){
          ev = ev || window.event;
          if(ev._fixed) return ev;
          this.event = ev;
          this.target = ev.target || ev.srcElement;

          var type = this.type = ev.type;
          var button = this.button = ev.button;

          // if is mouse event patch pageX
          if(rMouseEvent.test(type)){ //fix pageX
            this.pageX = (ev.pageX != null) ? ev.pageX : ev.clientX + doc.scrollLeft;
            this.pageY = (ev.pageX != null) ? ev.pageY : ev.clientY + doc.scrollTop;
            if (type === 'mouseover' || type === 'mouseout'){// fix relatedTarget
              var related = ev.relatedTarget || ev[(type === 'mouseover' ? 'from' : 'to') + 'Element'];
              while (related && related.nodeType === 3) related = related.parentNode;
              this.relatedTarget = related;
            }
          }
          // if is mousescroll
          if (type === 'DOMMouseScroll' || type === 'mousewheel'){
            // ff ev.detail: 3    other ev.wheelDelta: -120
            this.wheelDelta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
          }

          // fix which
          this.which = ev.which || ev.keyCode;
          if( !this.which && button !== undefined){
            // http://api.jquery.com/event.which/ use which
            this.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
          }
          this._fixed = true;
        }

        _.extend(Event.prototype, {
          stop: function(){
            this.preventDefault().stopPropagation();
          },
          preventDefault: function(){
            if (this.event.preventDefault) this.event.preventDefault();
            else this.event.returnValue = false;
            return this;
          },
          stopPropagation: function(){
            if (this.event.stopPropagation) this.event.stopPropagation();
            else this.event.cancelBubble = true;
            return this;
          },
          stopImmediatePropagation: function(){
            if(this.event.stopImmediatePropagation) this.event.stopImmediatePropagation();
          }
        })


        dom.nextFrame = (function(){
          var request = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame||
            function(callback){
              return setTimeout(callback, 16)
            }

          var cancel = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            function(tid){
              clearTimeout(tid)
            }

          return function(callback){
            var id = request(callback);
            return function(){ cancel(id); }
          }
        })();

        // 3ks for angular's raf  service
        var k
        dom.nextReflow = dom.msie? function(callback){
          return dom.nextFrame(function(){
            k = document.body.offsetWidth;
            callback();
          })
        }: dom.nextFrame;

      }





      /***/ },
    /* 16 */
    /***/ function(module, exports) {

      module.exports = {
        'COMPONENT_TYPE': 1,
        'ELEMENT_TYPE': 2,
        'ERROR': {
          'UNMATCHED_AST': 101
        },
        "MSG": {
          101: "Unmatched ast and mountNode, report issue at https://github.com/regularjs/regular/issues"
        },
        'NAMESPACE': {
          html: "http://www.w3.org/1999/xhtml",
          svg: "http://www.w3.org/2000/svg"
        },
        'OPTIONS': {
          'STABLE_INIT': { stable: !0, init: !0 },
          'FORCE_INIT': { force: !0, init: !0 },
          'STABLE': {stable: !0},
          'INIT': { init: !0 },
          'SYNC': { sync: !0 },
          'FORCE': { force: !0 }
        }
      }


      /***/ },
    /* 17 */
    /***/ function(module, exports, __webpack_require__) {

      var diffArray = __webpack_require__(18).diffArray;
      var combine = __webpack_require__(19);
      var animate = __webpack_require__(20);
      var Parser = __webpack_require__(10);
      var node = __webpack_require__(11);
      var Group = __webpack_require__(21);
      var dom = __webpack_require__(15);
      var _ = __webpack_require__(3);
      var consts = __webpack_require__(16);
      var OPTIONS = consts.OPTIONS;
      var ERROR = consts.ERROR;
      var MSG = consts.MSG;
      var nodeCursor = __webpack_require__(22);
      var config = __webpack_require__(7)
      var shared = __webpack_require__(13);



      var walkers = module.exports = {};



      // used in walkers.list
      // remove block in group
      function removeRange(index, rlen, children){
        for(var j = 1; j <= rlen; j++){ //removed
          var removed = children[ index + j ];
          if(removed) removed.destroy(true);
        }
        children.splice(index+1, rlen);
      }


      walkers.list = function(ast, options){

        var Regular = walkers.Regular;
        var placeholder = document.createComment("Regular list"),
          namespace = options.namespace,
          extra = options.extra;

        var self = this;
        var group = new Group([placeholder]);
        var children = group.children;

        var indexName = ast.variable + '_index';
        var keyName = ast.variable + '_key';
        var variable = ast.variable;
        var alternate = ast.alternate;
        var track = ast.track, keyOf, extraObj;
        var cursor = options.cursor;

        insertPlaceHolder(placeholder, cursor)


        if( track && track !== true ){

          track = this._touchExpr(track);
          extraObj = _.createObject(extra);
          keyOf = function( item, index ){
            extraObj[ variable ] = item;
            extraObj[ indexName ] = index;
            // @FIX keyName
            return track.get( self, extraObj );
          }
        }

        function addRange(index, end, newList, rawNewValue){
          for(var o = index; o < end; o++){ //add
            // prototype inherit
            var item = newList[o];
            var data = _.createObject(extra);
            updateTarget(data, o, item, rawNewValue);

            var section = self.$compile(ast.body, {
              extra: data,
              namespace:namespace,
              record: true,
              outer: options.outer,
              cursor: cursor
            })
            section.data = data;
            // autolink
            var insert =  combine.last(group.get(o));
            if(insert.parentNode && !cursor ){
              animate.inject(combine.node(section),insert, 'after');
            }
            // insert.parentNode.insertBefore(combine.node(section), insert.nextSibling);
            children.splice( o + 1 , 0, section);
          }
        }

        function updateTarget(target, index, item, rawNewValue){
          target[ indexName ] = index;
          if( rawNewValue ){
            target[ keyName ] = item;
            target[ variable ] = rawNewValue[ item ];
          }else{
            target[ variable ] = item;
            target[keyName] = null
          }
        }


        function updateRange(start, end, newList, rawNewValue){
          for(var k = start; k < end; k++){ // no change
            var sect = group.get( k + 1 ), item = newList[ k ];
            updateTarget(sect.data, k, item, rawNewValue);
          }
        }

        function updateLD(newList, oldList, splices , rawNewValue ){

          var cur = placeholder;
          var m = 0, len = newList.length;

          if(!splices && (len !==0 || oldList.length !==0)  ){
            splices = diffArray(newList, oldList, true);
          }

          if(!splices || !splices.length) return;

          for(var i = 0; i < splices.length; i++){ //init
            var splice = splices[i];
            var index = splice.index; // beacuse we use a comment for placeholder
            var removed = splice.removed;
            var add = splice.add;
            var rlen = removed.length;
            // for track
            if( track && rlen && add ){
              var minar = Math.min(rlen, add);
              var tIndex = 0;
              while(tIndex < minar){
                if( keyOf(newList[index], index) !== keyOf( removed[0], index ) ){
                  removeRange(index, 1, children)
                  addRange(index, index+1, newList, rawNewValue)
                }
                removed.shift();
                add--;
                index++;
                tIndex++;
              }
              rlen = removed.length;
            }
            // update
            updateRange(m, index, newList, rawNewValue);

            removeRange( index ,rlen, children)

            addRange(index, index+add, newList, rawNewValue)

            m = index + add - rlen;
            m  = m < 0? 0 : m;

          }
          if(m < len){
            for(var i = m; i < len; i++){
              var pair = group.get(i + 1);
              pair.data[indexName] = i;
              // @TODO fix keys
            }
          }
        }

        // if the track is constant test.
        function updateSimple(newList, oldList, rawNewValue ){

          var nlen = newList.length;
          var olen = oldList.length;
          var mlen = Math.min(nlen, olen);

          updateRange(0, mlen, newList, rawNewValue)
          if(nlen < olen){ //need add
            removeRange(nlen, olen-nlen, children);
          }else if(nlen > olen){
            addRange(olen, nlen, newList, rawNewValue);
          }
        }

        function update(newValue, oldValue, splices){

          var nType = _.typeOf( newValue );
          var oType = _.typeOf( oldValue );

          var newList = getListFromValue( newValue, nType );
          var oldList = getListFromValue( oldValue, oType );

          var rawNewValue;


          var nlen = newList && newList.length;
          var olen = oldList && oldList.length;

          // if previous list has , we need to remove the altnated section.
          if( !olen && nlen && group.get(1) ){
            var altGroup = children.pop();
            if(altGroup.destroy)  altGroup.destroy(true);
          }

          if( nType === 'object' ) rawNewValue = newValue;

          if(track === true){
            updateSimple( newList, oldList,  rawNewValue );
          }else{
            updateLD( newList, oldList, splices, rawNewValue );
          }

          // @ {#list} {#else}
          if( !nlen && alternate && alternate.length){
            var section = self.$compile(alternate, {
              extra: extra,
              record: true,
              outer: options.outer,
              namespace: namespace
            })
            children.push(section);
            if(placeholder.parentNode){
              animate.inject(combine.node(section), placeholder, 'after');
            }
          }
        }

        this.$watch(ast.sequence, update, {
          init: true,
          diff: track !== true ,
          deep: true
        });
        //@FIXIT, beacuse it is sync process, we can
        cursor = null;
        return group;
      }



      // {#include } or {#inc template}
      walkers.template = function(ast, options){
        var content = ast.content, compiled;
        var placeholder = document.createComment('inlcude');
        var compiled, namespace = options.namespace, extra = options.extra;
        var group = new Group([placeholder]);
        var cursor = options.cursor;

        insertPlaceHolder(placeholder, cursor);

        if(content){
          var self = this;
          this.$watch(content, function(value){
            var removed = group.get(1), type= typeof value;
            if( removed){
              removed.destroy(true);
              group.children.pop();
            }
            if(!value) return;

            group.push( compiled = type === 'function' ? value(cursor? {cursor: cursor}: null): self.$compile( type !== 'object'? String(value): value, {
              record: true,
              outer: options.outer,
              namespace: namespace,
              cursor: cursor,
              extra: extra}) );
            if(placeholder.parentNode && !cursor) {
              compiled.$inject(placeholder, 'before')
            }
          }, OPTIONS.INIT);
          cursor = null;
        }
        return group;
      };

      function getListFromValue(value, type){
        return type === 'array'? value: (type === 'object'? _.keys(value) :  []);
      }


      // how to resolve this problem
      var ii = 0;
      walkers['if'] = function(ast, options){
        var self = this, consequent, alternate, extra = options.extra;
        if(options && options.element){ // attribute inteplation
          var update = function(nvalue){
            if(!!nvalue){
              if(alternate) combine.destroy(alternate)
              if(ast.consequent) consequent = self.$compile(ast.consequent, {
                record: true,
                element: options.element ,
                extra:extra
              });
            }else{
              if( consequent ) combine.destroy(consequent)
              if( ast.alternate ) alternate = self.$compile(ast.alternate, {record: true, element: options.element, extra: extra});
            }
          }
          this.$watch(ast.test, update, OPTIONS.FORCE);
          return {
            destroy: function(){
              if(consequent) combine.destroy(consequent);
              else if(alternate) combine.destroy(alternate);
            }
          }
        }

        var test, node;
        var placeholder = document.createComment("Regular if" + ii++);
        var group = new Group();
        group.push(placeholder);
        var preValue = null, namespace= options.namespace;
        var cursor = options.cursor;
        insertPlaceHolder(placeholder, cursor)

        var update = function (nvalue, old){
          var value = !!nvalue, compiledSection;
          if(value === preValue) return;
          preValue = value;
          if(group.children[1]){
            group.children[1].destroy(true);
            group.children.pop();
          }
          var curOptions = {
            record: true,
            outer: options.outer,
            namespace: namespace,
            extra: extra,
            cursor: cursor
          }
          if(value){ //true

            if(ast.consequent && ast.consequent.length){
              compiledSection = self.$compile( ast.consequent , curOptions );
            }
          }else{ //false
            if(ast.alternate && ast.alternate.length){
              compiledSection = self.$compile(ast.alternate, curOptions);
            }
          }
          // placeholder.parentNode && placeholder.parentNode.insertBefore( node, placeholder );
          if(compiledSection){
            group.push(compiledSection );
            if(placeholder.parentNode && !cursor){
              animate.inject(combine.node(compiledSection), placeholder, 'before');
            }
          }
          cursor = null;
          // after first mount , we need clear this flat;
        }
        this.$watch(ast.test, update, OPTIONS.FORCE_INIT);

        return group;
      }


      walkers._handleMountText = function(cursor, astText){
        var node, mountNode = cursor.node;
        // fix unused black in astText;
        var nodeText = dom.text(mountNode);

        if( nodeText === astText ){
          node = mountNode;
          cursor.next();
        }else{
          // maybe have some redundancy  blank
          var index = nodeText.indexOf(astText);
          if(~index){
            node = document.createTextNode(astText);
            dom.text( mountNode, nodeText.slice(index + astText.length) );
            dom.inject(node, mountNode, 'before');
          } else {
            // if( _.blankReg.test( astText ) ){ }
            throw Error( MSG[ERROR.UNMATCHED_AST]);
          }
        }

        return node;
      }


      walkers.expression = function(ast, options){

        var cursor = options.cursor, node,
          mountNode = cursor && cursor.node;

        if(mountNode){
          //@BUG: if server render &gt; in Expression will cause error
          var astText = _.toText( this.$get(ast) );
          node = walkers._handleMountText(cursor, astText);

        }else{
          node = document.createTextNode("");
        }

        this.$watch(ast, function(newval){
          dom.text(node, _.toText(newval));
        }, OPTIONS.STABLE_INIT )
        return node;

      }


      walkers.text = function(ast, options){
        var cursor = options.cursor , node;
        var text = ast.text;
        var astText = text.indexOf('&') !== -1? _.convertEntity(text): text;

        if(cursor && cursor.node) {
          var mountNode = cursor.node;
          // maybe regularjs parser have some difference with html builtin parser when process  empty text
          // @todo error report
          if(mountNode.nodeType !== 3 ){

            if( _.blankReg.test(astText) ) return {
              code:  ERROR.UNMATCHED_AST
            }

          }else{
            node = walkers._handleMountText( cursor, astText )
          }
        }


        return node || document.createTextNode( astText );
      }




      /**
       * walkers element (contains component)
       */
      walkers.element = function(ast, options){

        var attrs = ast.attrs, self = this,
          Constructor = this.constructor,
          children = ast.children,
          namespace = options.namespace,
          extra = options.extra,
          cursor = options.cursor,
          tag = ast.tag,
          Component = Constructor.component(tag),
          ref, group, element, mountNode;




        if( tag === 'r-content' ){
          _.log('r-content is deprecated, use {#inc this.$body} instead (`{#include}` as same)', 'warn');
          return this.$body && this.$body(cursor? {cursor: cursor}: null);
        }


        // if inititalized with mount mode, sometime,
        // browser will ignore the whitespace between node, and sometimes it won't
        if(cursor ){
          // textCOntent with Empty text
          if(cursor.node && cursor.node.nodeType === 3){
            if(_.blankReg.test(dom.text(cursor.node) ) ) cursor.next();
            else if( !Component && tag !== 'r-component' ) {
              throw Error(MSG[ERROR.UNMATCHED_AST]);
            }
          }
        }

        if(Component || tag === 'r-component'){
          options.Component = Component;
          return walkers.component.call(this, ast, options)
        }

        if(cursor) mountNode = cursor.node;

        if(tag === 'svg') namespace = "svg";
        // @Deprecated: may be removed in next version, use {#inc } instead

        if( children && children.length ){

          var subMountNode = mountNode? mountNode.firstChild: null;
          group = this.$compile(children, {
            extra: extra ,
            outer: options.outer,
            namespace: namespace,
            cursor: nodeCursor(subMountNode, mountNode)
          });
        }


        if(mountNode){
          element = mountNode
          cursor.next();
        }else{
          element = dom.create( tag, namespace, attrs);
        }

        if(group && !_.isVoidTag( tag ) && !mountNode ){ // if not init with mount mode
          animate.inject( combine.node( group ) , element)
        }

        // fix tag ast, some infomation only avaliable at runtime (directive etc..)
        _.fixTagAST(ast, Constructor)

        var destroies = walkAttributes.call(this, attrs, element, extra);

        return {
          type: "element",
          group: group,
          node: function(){
            return element;
          },
          last: function(){
            return element;
          },
          destroy: function(first){
            if( first ){
              animate.remove( element, group? group.destroy.bind( group ): _.noop );
            }else if(group) {
              group.destroy();
            }
            // destroy ref
            if( destroies.length ) {
              destroies.forEach(function( destroy ){
                if( destroy ){
                  if( typeof destroy.destroy === 'function' ){
                    destroy.destroy()
                  }else{
                    destroy();
                  }
                }
              })
            }
          }
        }
      }

      walkers.component = function(ast, options){
        var attrs = ast.attrs,
          Component = options.Component,
          cursor = options.cursor,
          Constructor = this.constructor,
          isolate,
          extra = options.extra,
          namespace = options.namespace,
          refDirective = walkers.Regular.directive('ref'),
          ref, self = this, is;

        var data = {}, events;

        for(var i = 0, len = attrs.length; i < len; i++){
          var attr = attrs[i];
          // consider disabled   equlasto  disabled={true}

          shared.prepareAttr( attr, attr.name === 'ref' && refDirective );

          var value = this._touchExpr(attr.value === undefined? true: attr.value);
          if(value.constant) value = attr.value = value.get(this);
          if(attr.value && attr.value.constant === true){
            value = value.get(this);
          }
          var name = attr.name;
          if(!attr.event){
            var etest = name.match(_.eventReg);
            // event: 'nav'
            if(etest) attr.event = etest[1];
          }


          // @deprecated  use
          if(attr.mdf === 'cmpl'){
            value = _.getCompileFn(value, this, {
              record: true,
              namespace:namespace,
              extra: extra,
              outer: options.outer
            })
          }

          // title = {~ <h2>{name}</h2>}
          if(value.type === 'body'){
            value = _.getCompileFn(value.body, this, {
              record: true,
              namespace: namespace,
              extra: extra,
              outer: options.outer
            })
          }

          // @if is r-component . we need to find the target Component
          if(name === 'is' && !Component){
            is = value;
            var componentName = this.$get(value, true);
            Component = Constructor.component(componentName)
            if(typeof Component !== 'function') throw new Error("component " + componentName + " has not registed!");
          }
          // bind event proxy
          var eventName;
          if(eventName = attr.event){
            events = events || {};
            events[eventName] = _.handleEvent.call(this, value, eventName);
            continue;
          }else {
            name = attr.name = _.camelCase( name );
          }

          if(!value || value.type !== 'expression'){
            data[name] = value;
          }else{
            data[name] = value.get(self);
          }
          if( name === 'ref'  && value != null){
            ref = value
          }
          if( name === 'isolate'){
            // 1: stop: composite -> parent
            // 2. stop: composite <- parent
            // 3. stop 1 and 2: composite <-> parent
            // 0. stop nothing (defualt)
            isolate = value.type === 'expression'? value.get(self): parseInt(value === true? 3: value, 10);
            data.isolate = isolate;
          }
        }

        var definition = {
          data: data,
          events: events,
          $parent: (isolate & 2)? null: this,
          $root: this.$root,
          $outer: options.outer,
          _body: {
            ctx: this,
            ast: ast.children
          }
        }
        var options = {
          namespace: namespace,
          cursor: cursor,
          extra: options.extra
        }


        var component = new Component(definition, options), reflink;


        if(ref && this.$refs){
          reflink = refDirective.link;
          var refDestroy = reflink.call(this, component, ref);
          component.$on('$destroy', refDestroy);
        }
        for(var i = 0, len = attrs.length; i < len; i++){
          var attr = attrs[i];
          var value = attr.value||true;
          var name = attr.name;
          // need compiled
          if(value.type === 'expression' && !attr.event){
            value = self._touchExpr(value);
            // use bit operate to control scope
            if( !(isolate & 2) )
              this.$watch(value, (function(name, val){
                this.data[name] = val;
              }).bind(component, name), OPTIONS.SYNC)
            if( value.set && !(isolate & 1 ) )
            // sync the data. it force the component don't trigger attr.name's first dirty echeck
              component.$watch(name, self.$update.bind(self, value), OPTIONS.INIT);
          }
        }
        if(is && is.type === 'expression'  ){
          var group = new Group();
          group.push(component);
          this.$watch(is, function(value){
            // found the new component
            var Component = Constructor.component(value);
            if(!Component) throw new Error("component " + value + " has not registed!");
            var ncomponent = new Component(definition);
            var component = group.children.pop();
            group.push(ncomponent);
            ncomponent.$inject(combine.last(component), 'after')
            component.destroy();
            // @TODO  if component changed , we need update ref
            if(ref){
              var refName = ref.get? ref.get(this): ref;
              self.$refs[refName] = ncomponent;
            }
          }, OPTIONS.SYNC)
          return group;
        }
        return component;
      }

      function walkAttributes(attrs, element, extra){
        var bindings = []
        for(var i = 0, len = attrs.length; i < len; i++){
          var binding = this._walk(attrs[i], {element: element, fromElement: true, attrs: attrs, extra: extra})
          if(binding) bindings.push(binding);
        }
        return bindings;
      }


      walkers.attribute = function(ast ,options){

        var attr = ast;
        var Component = this.constructor;
        var name = attr.name;
        var directive = Component.directive(name);

        shared.prepareAttr(ast, directive);

        var value = attr.value || "";
        var constant = value.constant;
        var element = options.element;
        var self = this;



        value = this._touchExpr(value);

        if(constant) value = value.get(this);

        if(directive && directive.link){
          var extra = {
            attrs: options.attrs,
            param: _.getParamObj(this, attr.param)
          }
          var binding = directive.link.call(self, element, value, name, extra);
          // if update has been passed in , we will  automately watch value for user
          if( typeof directive.update === 'function'){
            if(_.isExpr(value)){
              this.$watch(value, function(val, old){
                directive.update.call(self, element, val, old, extra);
              })
            }else{
              directive.update.call(self, element, value, undefined, extra );
            }
          }
          if(typeof binding === 'function') binding = {destroy: binding};
          return binding;
        } else{
          if(value.type === 'expression' ){
            this.$watch(value, function(nvalue, old){
              dom.attr(element, name, nvalue);
            }, OPTIONS.STABLE_INIT);
          }else{
            if(_.isBooleanAttr(name)){
              dom.attr(element, name, true);
            }else{
              dom.attr(element, name, value);
            }
          }
          if(!options.fromElement){
            return {
              destroy: function(){
                dom.attr(element, name, null);
              }
            }
          }
        }

      }

      function insertPlaceHolder(placeholder, cursor){
        if(cursor){
          if(cursor.node) dom.inject( placeholder , cursor.node,'before')
          else if(cursor.prev) {
            dom.inject( placeholder , cursor.prev,'after')
            cursor.prev = placeholder;
          }
        }
      }


      /***/ },
    /* 18 */
    /***/ function(module, exports, __webpack_require__) {

      var _ = __webpack_require__(3);

      function simpleDiff(now, old){
        var nlen = now.length;
        var olen = old.length;
        if(nlen !== olen){
          return true;
        }
        for(var i = 0; i < nlen ; i++){
          if(now[i] !== old[i]) return  true;
        }
        return false

      }

      function equals(a,b){
        return a === b;
      }

      // array1 - old array
      // array2 - new array
      function ld(array1, array2, equalFn){
        var n = array1.length;
        var m = array2.length;
        var equalFn = equalFn || equals;
        var matrix = [];
        for(var i = 0; i <= n; i++){
          matrix.push([i]);
        }
        for(var j=1;j<=m;j++){
          matrix[0][j]=j;
        }
        for(var i = 1; i <= n; i++){
          for(var j = 1; j <= m; j++){
            if(equalFn(array1[i-1], array2[j-1])){
              matrix[i][j] = matrix[i-1][j-1];
            }else{
              matrix[i][j] = Math.min(
                matrix[i-1][j]+1, //delete
                matrix[i][j-1]+1//add
              )
            }
          }
        }
        return matrix;
      }
      // arr2 - new array
      // arr1 - old array
      function diffArray(arr2, arr1, diff, diffFn) {
        if(!diff) return simpleDiff(arr2, arr1);
        var matrix = ld(arr1, arr2, diffFn)
        var n = arr1.length;
        var i = n;
        var m = arr2.length;
        var j = m;
        var edits = [];
        var current = matrix[i][j];
        while(i>0 || j>0){
          // the last line
          if (i === 0) {
            edits.unshift(3);
            j--;
            continue;
          }
          // the last col
          if (j === 0) {
            edits.unshift(2);
            i--;
            continue;
          }
          var northWest = matrix[i - 1][j - 1];
          var west = matrix[i - 1][j];
          var north = matrix[i][j - 1];

          var min = Math.min(north, west, northWest);

          if (min === west) {
            edits.unshift(2); //delete
            i--;
            current = west;
          } else if (min === northWest ) {
            if (northWest === current) {
              edits.unshift(0); //no change
            } else {
              edits.unshift(1); //update
              current = northWest;
            }
            i--;
            j--;
          } else {
            edits.unshift(3); //add
            j--;
            current = north;
          }
        }
        var LEAVE = 0;
        var ADD = 3;
        var DELELE = 2;
        var UPDATE = 1;
        var n = 0;m=0;
        var steps = [];
        var step = { index: null, add:0, removed:[] };

        for(var i=0;i<edits.length;i++){
          if(edits[i] > 0 ){ // NOT LEAVE
            if(step.index === null){
              step.index = m;
            }
          } else { //LEAVE
            if(step.index != null){
              steps.push(step)
              step = {index: null, add:0, removed:[]};
            }
          }
          switch(edits[i]){
            case LEAVE:
              n++;
              m++;
              break;
            case ADD:
              step.add++;
              m++;
              break;
            case DELELE:
              step.removed.push(arr1[n])
              n++;
              break;
            case UPDATE:
              step.add++;
              step.removed.push(arr1[n])
              n++;
              m++;
              break;
          }
        }
        if(step.index != null){
          steps.push(step)
        }
        return steps
      }



      // diffObject
      // ----
      // test if obj1 deepEqual obj2
      function diffObject( now, last, diff ){


        if(!diff){

          for( var j in now ){
            if( last[j] !== now[j] ) return true
          }

          for( var n in last ){
            if(last[n] !== now[n]) return true;
          }

        }else{

          var nKeys = _.keys(now);
          var lKeys = _.keys(last);

          /**
           * [description]
           * @param  {[type]} a    [description]
           * @param  {[type]} b){                   return now[b] [description]
           * @return {[type]}      [description]
           */
          return diffArray(nKeys, lKeys, diff, function(a, b){
            return now[b] === last[a];
          });

        }

        return false;


      }

      module.exports = {
        diffArray: diffArray,
        diffObject: diffObject
      }

      /***/ },
    /* 19 */
    /***/ function(module, exports, __webpack_require__) {

      // some nested  operation in ast
      // --------------------------------

      var dom = __webpack_require__(15);
      var animate = __webpack_require__(20);

      var combine = module.exports = {

        // get the initial dom in object
        node: function(item){
          var children,node, nodes;
          if(!item) return;
          if(typeof item.node === "function") return item.node();
          if(typeof item.nodeType === "number") return item;
          if(item.group) return combine.node(item.group)

          item = item.children || item;
          if( Array.isArray(item )){
            var len = item.length;
            if(len === 1){
              return combine.node(item[0]);
            }
            nodes = [];
            for(var i = 0, len = item.length; i < len; i++ ){
              node = combine.node(item[i]);
              if(Array.isArray(node)){
                nodes.push.apply(nodes, node)
              }else if(node) {
                nodes.push(node)
              }
            }
            return nodes;
          }

        },
        // @TODO remove _gragContainer
        inject: function(node, pos ){
          var group = this;
          var fragment = combine.node(group.group || group);
          if(node === false) {
            animate.remove(fragment)
            return group;
          }else{
            if(!fragment) return group;
            if(typeof node === 'string') node = dom.find(node);
            if(!node) throw Error('injected node is not found');
            // use animate to animate firstchildren
            animate.inject(fragment, node, pos);
          }
          // if it is a component
          if(group.$emit) {
            var preParent = group.parentNode;
            var newParent = (pos ==='after' || pos === 'before')? node.parentNode : node;
            group.parentNode = newParent;
            group.$emit("$inject", node, pos, preParent);
          }
          return group;
        },

        // get the last dom in object(for insertion operation)
        last: function(item){
          var children = item.children;

          if(typeof item.last === "function") return item.last();
          if(typeof item.nodeType === "number") return item;

          if(children && children.length) return combine.last(children[children.length - 1]);
          if(item.group) return combine.last(item.group);

        },

        destroy: function(item, first){
          if(!item) return;
          if( typeof item.nodeType === "number"  ) return first && dom.remove(item)
          if( typeof item.destroy === "function" ) return item.destroy(first);

          if( Array.isArray(item)){
            for(var i = 0, len = item.length; i < len; i++ ){
              combine.destroy(item[i], first);
            }
          }
        }

      }


      // @TODO: need move to dom.js
      dom.element = function( component, all ){
        if(!component) return !all? null: [];
        var nodes = combine.node( component );
        if( nodes.nodeType === 1 ) return all? [nodes]: nodes;
        var elements = [];
        for(var i = 0; i<nodes.length ;i++){
          var node = nodes[i];
          if( node && node.nodeType === 1){
            if(!all) return node;
            elements.push(node);
          }
        }
        return !all? elements[0]: elements;
      }





      /***/ },
    /* 20 */
    /***/ function(module, exports, __webpack_require__) {

      var _ = __webpack_require__(3);
      var dom  = __webpack_require__(15);
      var animate = {};
      var env = __webpack_require__(1);


      if(typeof window !== 'undefined'){
        var
          transitionEnd = 'transitionend',
          animationEnd = 'animationend',
          transitionProperty = 'transition',
          animationProperty = 'animation';

        if(!('ontransitionend' in window)){
          if('onwebkittransitionend' in window) {

            // Chrome/Saf (+ Mobile Saf)/Android
            transitionEnd += ' webkitTransitionEnd';
            transitionProperty = 'webkitTransition'
          } else if('onotransitionend' in dom.tNode || navigator.appName === 'Opera') {

            // Opera
            transitionEnd += ' oTransitionEnd';
            transitionProperty = 'oTransition';
          }
        }
        if(!('onanimationend' in window)){
          if ('onwebkitanimationend' in window){
            // Chrome/Saf (+ Mobile Saf)/Android
            animationEnd += ' webkitAnimationEnd';
            animationProperty = 'webkitAnimation';

          }else if ('onoanimationend' in dom.tNode){
            // Opera
            animationEnd += ' oAnimationEnd';
            animationProperty = 'oAnimation';
          }
        }
      }

      /**
       * inject node with animation
       * @param  {[type]} node      [description]
       * @param  {[type]} refer     [description]
       * @param  {[type]} direction [description]
       * @return {[type]}           [description]
       */
      animate.inject = function( node, refer ,direction, callback ){
        callback = callback || _.noop;
        if( Array.isArray(node) ){
          var fragment = dom.fragment();
          var count=0;

          for(var i = 0,len = node.length;i < len; i++ ){
            fragment.appendChild(node[i]);
          }
          dom.inject(fragment, refer, direction);

          // if all nodes is done, we call the callback
          var enterCallback = function (){
            count++;
            if( count === len ) callback();
          }
          if(len === count) callback();
          for( i = 0; i < len; i++ ){
            if(node[i].onenter){
              node[i].onenter(enterCallback);
            }else{
              enterCallback();
            }
          }
        }else{
          if(!node) return;
          dom.inject( node, refer, direction );
          if(node.onenter){
            node.onenter(callback)
          }else{
            callback();
          }
        }
      }

      /**
       * remove node with animation
       * @param  {[type]}   node     [description]
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */

      animate.remove = function(node, callback){
        if(!node) return;
        var count = 0;
        function loop(){
          count++;
          if(count === len) callback && callback()
        }
        if( Array.isArray(node) ){
          for(var i = 0, len = node.length; i < len ; i++){
            animate.remove(node[i], loop)
          }
          return;
        }
        if(typeof node.onleave ==='function'){
          node.onleave(function(){
            removeDone(node, callback)
          })
        }else{
          removeDone(node, callback)
        }
      }

      function removeDone(node, callback){
        dom.remove(node);
        callback && callback();
      }



      animate.startClassAnimate = function ( node, className,  callback, mode ){
        var activeClassName, timeout, tid, onceAnim;
        if( (!animationEnd && !transitionEnd) || env.isRunning ){
          return callback();
        }

        if(mode !== 4){
          onceAnim = _.once(function onAnimateEnd(){
            if(tid) clearTimeout(tid);

            if(mode === 2) {
              dom.delClass(node, activeClassName);
            }
            if(mode !== 3){ // mode hold the class
              dom.delClass(node, className);
            }
            dom.off(node, animationEnd, onceAnim)
            dom.off(node, transitionEnd, onceAnim)

            callback();

          });
        }else{
          onceAnim = _.once(function onAnimateEnd(){
            if(tid) clearTimeout(tid);
            callback();
          });
        }
        if(mode === 2){ // auto removed
          dom.addClass( node, className );

          activeClassName = _.map(className.split(/\s+/), function(name){
            return name + '-active';
          }).join(" ");

          dom.nextReflow(function(){
            dom.addClass( node, activeClassName );
            timeout = getMaxTimeout( node );
            tid = setTimeout( onceAnim, timeout );
          });

        }else if(mode===4){
          dom.nextReflow(function(){
            dom.delClass( node, className );
            timeout = getMaxTimeout( node );
            tid = setTimeout( onceAnim, timeout );
          });

        }else{
          dom.nextReflow(function(){
            dom.addClass( node, className );
            timeout = getMaxTimeout( node );
            tid = setTimeout( onceAnim, timeout );
          });
        }



        dom.on( node, animationEnd, onceAnim )
        dom.on( node, transitionEnd, onceAnim )
        return onceAnim;
      }


      animate.startStyleAnimate = function(node, styles, callback){
        var timeout, onceAnim, tid;

        dom.nextReflow(function(){
          dom.css( node, styles );
          timeout = getMaxTimeout( node );
          tid = setTimeout( onceAnim, timeout );
        });


        onceAnim = _.once(function onAnimateEnd(){
          if(tid) clearTimeout(tid);

          dom.off(node, animationEnd, onceAnim)
          dom.off(node, transitionEnd, onceAnim)

          callback();

        });

        dom.on( node, animationEnd, onceAnim )
        dom.on( node, transitionEnd, onceAnim )

        return onceAnim;
      }


      /**
       * get maxtimeout
       * @param  {Node} node
       * @return {[type]}   [description]
       */
      function getMaxTimeout(node){
        var timeout = 0,
          tDuration = 0,
          tDelay = 0,
          aDuration = 0,
          aDelay = 0,
          ratio = 5 / 3,
          styles ;

        if(window.getComputedStyle){

          styles = window.getComputedStyle(node),
            tDuration = getMaxTime( styles[transitionProperty + 'Duration']) || tDuration;
          tDelay = getMaxTime( styles[transitionProperty + 'Delay']) || tDelay;
          aDuration = getMaxTime( styles[animationProperty + 'Duration']) || aDuration;
          aDelay = getMaxTime( styles[animationProperty + 'Delay']) || aDelay;
          timeout = Math.max( tDuration+tDelay, aDuration + aDelay );

        }
        return timeout * 1000 * ratio;
      }

      function getMaxTime(str){

        var maxTimeout = 0, time;

        if(!str) return 0;

        str.split(",").forEach(function(str){

          time = parseFloat(str);
          if( time > maxTimeout ) maxTimeout = time;

        });

        return maxTimeout;
      }

      module.exports = animate;

      /***/ },
    /* 21 */
    /***/ function(module, exports, __webpack_require__) {

      var _ = __webpack_require__(3);
      var combine = __webpack_require__(19)

      function Group(list){
        this.children = list || [];
      }


      var o = _.extend(Group.prototype, {
        destroy: function(first){
          combine.destroy(this.children, first);
          if(this.ondestroy) this.ondestroy();
          this.children = null;
        },
        get: function(i){
          return this.children[i]
        },
        push: function(item){
          this.children.push( item );
        }
      })
      o.inject = o.$inject = combine.inject



      module.exports = Group;




      /***/ },
    /* 22 */
    /***/ function(module, exports) {

      function NodeCursor(node, parentNode){
        this.node = node;
        this.parent = parentNode;
      }


      var no = NodeCursor.prototype;

      no.next = function(){
        this.prev = this.node;
        this.node = this.node.nextSibling;
        return this;
      }

      module.exports = function(n){ return new NodeCursor(n)}


      /***/ },
    /* 23 */
    /***/ function(module, exports, __webpack_require__) {

      // simplest event emitter 60 lines
      // ===============================
      var _ = __webpack_require__(3);
      var fallbackEvent = {
        destory: '$destory',
        update: '$update',
        init: '$init',
        config: '$config'
      }

      // to fix 0.2.x version event
      // map init to $init;
      // @FIXIT after version 1.0
      function fix(type){
        return fallbackEvent[type] || type
      }
      var API = {
        $on: function(event, fn, desc) {
          if(typeof event === "object" && event){
            for (var i in event) {
              this.$on(i, event[i], fn);
            }
          }else{
            desc = desc || {};
            // @patch: for list
            var context = this;
            event = fix(event);
            var handles = context._handles || (context._handles = {}),
              calls = handles[event] || (handles[event] = []);
            var realFn;
            if(desc.once){
              realFn = function(){
                fn.apply( this, arguments )
                this.$off(event, fn);
              }
              // @FIX: if  same fn
              fn.real = realFn;
            }
            calls.push( realFn || fn );
          }
          return this;
        },
        $off: function(event, fn) {
          var context = this;
          if(!context._handles) return;
          if(!event) this._handles = {};
          var handles = context._handles,
            calls;

          event = fix(event);
          if (calls = handles[event]) {
            if (!fn) {
              handles[event] = [];
              return context;
            }
            fn = fn.real || fn;
            for (var i = 0, len = calls.length; i < len; i++) {
              if (fn === calls[i]) {
                calls.splice(i, 1);
                return context;
              }
            }
          }
          return context;
        },
        // bubble event
        $emit: function(event){
          // @patch: for list
          var context = this;
          var handles = context._handles, calls, args, type;
          if(!event) return;
          var args = _.slice(arguments, 1);
          var type = fix(event);

          if(!handles) return context;
          if (!(calls = handles[type])) return context;

          if(calls.length > 1){ // handle, when first is off the event
            calls = calls.slice();
          }

          for (var i = 0, len = calls.length; i < len; i++) {
            if(typeof calls[i] === 'function') calls[i].apply(context, args)
          }
          return context;
        },
        // capture  event
        $once: function(event, fn){
          var args = _.slice(arguments);
          args.push({once: true})
          return this.$on.apply(this, args);
        }
      }
      // container class
      function Event() {}
      _.extend(Event.prototype, API)

      Event.mixTo = function(obj){
        obj = typeof obj === "function" ? obj.prototype : obj;
        _.extend(obj, API)
      }
      module.exports = Event;


      /***/ },
    /* 24 */
    /***/ function(module, exports, __webpack_require__) {

      var _ = __webpack_require__(3);
      var parseExpression = __webpack_require__(14).expression;
      var diff = __webpack_require__(18);
      var diffArray = diff.diffArray;
      var diffObject = diff.diffObject;

      function Watcher(){}

      var methods = {
        $watch: function(expr, fn, options){
          var get, once, test, rlen, extra = this.__ext__; //records length
          if(!this._watchers) this._watchers = [];
          if(!this._watchersForStable) this._watchersForStable = [];

          options = options || {};
          if(options === true){
            options = { deep: true }
          }
          var uid = _.uid('w_');
          if(Array.isArray(expr)){
            var tests = [];
            for(var i = 0,len = expr.length; i < len; i++){
              tests.push(this.$expression(expr[i]).get)
            }
            var prev = [];
            test = function(context){
              var equal = true;
              for(var i =0, len = tests.length; i < len; i++){
                var splice = tests[i](context, extra);
                if(!_.equals(splice, prev[i])){
                  equal = false;
                  prev[i] = splice;//_.clone(splice);
                }
              }
              return equal? false: prev;
            }
          }else{
            if(typeof expr === 'function'){
              get = expr.bind(this);
            }else{
              expr = this.$expression(expr);
              get = expr.get;
              once = expr.once;
            }
          }

          var watcher = {
            id: uid,
            get: get,
            fn: fn,
            once: once,
            force: options.force,
            // don't use ld to resolve array diff
            diff: options.diff,
            test: test,
            deep: options.deep,
            last: options.sync? get(this): options.last
          }


          this[options.stable? '_watchersForStable': '_watchers'].push(watcher);

          rlen = this._records && this._records.length;
          if(rlen) this._records[rlen-1].push(watcher)
          // init state.
          if(options.init === true){
            var prephase = this.$phase;
            this.$phase = 'digest';
            this._checkSingleWatch( watcher);
            this.$phase = prephase;
          }
          return watcher;
        },
        $unwatch: function( watcher ){
          if(!this._watchers || !watcher) return;
          var watchers = this._watchers;
          var type = typeof watcher;

          if(type === 'object'){
            var len = watcher.length;
            if(!len){
              watcher.removed = true
            }else{
              while( (len--) >= 0 ){
                this.$unwatch(watcher[len])
              }
            }
          }else if(type === 'number'){
            var id = watcher;
            watcher =  _.findItem( watchers, function(item){
              return item.id === id;
            } );
            if(!watcher) watcher = _.findItem(this._watchersForStable, function( item ){
              return item.id === id
            })
            return this.$unwatch(watcher);
          }
          return this;
        },
        $expression: function(value){
          return this._touchExpr(parseExpression(value))
        },
        /**
         * the whole digest loop ,just like angular, it just a dirty-check loop;
         * @param  {String} path  now regular process a pure dirty-check loop, but in parse phase,
         *                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
         * @return {Void}
         */

        $digest: function(){
          if(this.$phase === 'digest' || this._mute) return;
          this.$phase = 'digest';
          var dirty = false, n =0;
          while(dirty = this._digest()){

            if((++n) > 20){ // max loop
              throw Error('there may a circular dependencies reaches')
            }
          }
          // stable watch is dirty
          var stableDirty =  this._digest(true);

          if( (n > 0 || stableDirty) && this.$emit) {
            this.$emit("$update");
            if (this.devtools) {
              this.devtools.emit("flush", this)
            }
          }
          this.$phase = null;
        },
        // private digest logic
        _digest: function(stable){
          if(this._mute) return;
          var watchers = !stable? this._watchers: this._watchersForStable;
          var dirty = false, children, watcher, watcherDirty;
          var len = watchers && watchers.length;
          if(len){
            var mark = 0, needRemoved=0;
            for(var i =0; i < len; i++ ){
              watcher = watchers[i];
              var shouldRemove = !watcher ||  watcher.removed;
              if( shouldRemove ){
                needRemoved += 1;
              }else{
                watcherDirty = this._checkSingleWatch(watcher);
                if(watcherDirty) dirty = true;
              }
              // remove when encounter first unmoved item or touch the end
              if( !shouldRemove || i === len-1 ){
                if( needRemoved ){
                  watchers.splice(mark, needRemoved );
                  len -= needRemoved;
                  i -= needRemoved;
                  needRemoved = 0;
                }
                mark = i+1;
              }
            }
          }
          // check children's dirty.
          children = this._children;
          if(children && children.length){
            for(var m = 0, mlen = children.length; m < mlen; m++){
              var child = children[m];
              if(child && child._digest(stable)) dirty = true;
            }
          }
          return dirty;
        },
        // check a single one watcher
        _checkSingleWatch: function(watcher){
          var dirty = false;
          if(!watcher) return;

          var now, last, tlast, tnow,  eq, diff;

          if(!watcher.test){

            now = watcher.get(this);
            last = watcher.last;

            if(now !== last || watcher.force){
              tlast = _.typeOf(last);
              tnow = _.typeOf(now);
              eq = true;

              // !Object
              if( !(tnow === 'object' && tlast==='object' && watcher.deep) ){
                // Array
                if( tnow === 'array' && ( tlast=='undefined' || tlast === 'array') ){
                  diff = diffArray(now, watcher.last || [], watcher.diff)
                  if( tlast !== 'array' || diff === true || diff.length ) dirty = true;
                }else{
                  eq = _.equals( now, last );
                  if( !eq || watcher.force ){
                    watcher.force = null;
                    dirty = true;
                  }
                }
              }else{
                diff =  diffObject( now, last, watcher.diff );
                if( diff === true || diff.length ) dirty = true;
              }
            }

          } else{
            // @TODO 是否把多重改掉
            var result = watcher.test(this);
            if(result){
              dirty = true;
              watcher.fn.apply(this, result)
            }
          }
          if(dirty && !watcher.test){
            if(tnow === 'object' && watcher.deep || tnow === 'array'){
              watcher.last = _.clone(now);
            }else{
              watcher.last = now;
            }
            watcher.fn.call(this, now, last, diff)
            if(watcher.once) this.$unwatch(watcher)
          }

          return dirty;
        },

        /**
         * **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
         *
         * @param  {Function|String|Expression} path
         * @param  {Whatever} value optional, when path is Function, the value is ignored
         * @return {this}     this
         */
        $set: function(path, value){
          if(path != null){
            var type = typeof (path);
            if( type === 'string' || path.type === 'expression' ){
              path = this.$expression(path);
              path.set(this, value);
            }else if(type === 'function'){
              path.call(this, this.data);
            }else{
              for(var i in path) {
                this.$set(i, path[i])
              }
            }
          }
        },
        // 1. expr canbe string or a Expression
        // 2. detect: if true, if expr is a string will directly return;
        $get: function(expr, detect)  {
          if(detect && typeof expr === 'string') return expr;
          return this.$expression(expr).get(this);
        },
        $update: function(){
          var rootParent = this;
          do{
            if(rootParent.data.isolate || !rootParent.$parent) break;
            rootParent = rootParent.$parent;
          } while(rootParent)

          var prephase =rootParent.$phase;
          rootParent.$phase = 'digest'

          this.$set.apply(this, arguments);

          rootParent.$phase = prephase

          rootParent.$digest();
          return this;
        },
        // auto collect watchers for logic-control.
        _record: function(){
          if(!this._records) this._records = [];
          this._records.push([]);
        },
        _release: function(){
          return this._records.pop();
        }
      }


      _.extend(Watcher.prototype, methods)


      Watcher.mixTo = function(obj){
        obj = typeof obj === "function" ? obj.prototype : obj;
        return _.extend(obj, methods)
      }

      module.exports = Watcher;


      /***/ },
    /* 25 */
    /***/ function(module, exports) {


      var f = module.exports = {};

      // json:  two way
      //  - get: JSON.stringify
      //  - set: JSON.parse
      //  - example: `{ title|json }`
      f.json = {
        get: function( value ){
          return typeof JSON !== 'undefined'? JSON.stringify(value): value;
        },
        set: function( value ){
          return typeof JSON !== 'undefined'? JSON.parse(value) : value;
        }
      }

      // last: one-way
      //  - get: return the last item in list
      //  - example: `{ list|last }`
      f.last = function(arr){
        return arr && arr[arr.length - 1];
      }

      // average: one-way
      //  - get: copute the average of the list
      //  - example: `{ list| average: "score" }`
      f.average = function(array, key){
        array = array || [];
        return array.length? f.total(array, key)/ array.length : 0;
      }


      // total: one-way
      //  - get: copute the total of the list
      //  - example: `{ list| total: "score" }`
      f.total = function(array, key){
        var total = 0;
        if(!array) return;
        array.forEach(function( item ){
          total += key? item[key] : item;
        })
        return total;
      }




      /***/ },
    /* 26 */
    /***/ function(module, exports, __webpack_require__) {

      // Regular
      var _ = __webpack_require__(3);
      var dom = __webpack_require__(15);
      var animate = __webpack_require__(20);
      var Regular = __webpack_require__(8);
      var consts = __webpack_require__(16);
      var namespaces = consts.NAMESPACE;
      var OPTIONS = consts.OPTIONS
      var STABLE = OPTIONS.STABLE;
      var DEEP_STABLE = {deep: true, stable: true};




      __webpack_require__(27);
      __webpack_require__(28);


      module.exports = {
        // **warn**: class inteplation will override this directive
        'r-class': function(elem, value){

          if(typeof value=== 'string'){
            value = _.fixObjStr(value)
          }
          var isNotHtml = elem.namespaceURI && elem.namespaceURI !== namespaces.html ;
          this.$watch(value, function(nvalue){
            var className = isNotHtml? elem.getAttribute('class'): elem.className;
            className = ' '+ (className||'').replace(/\s+/g, ' ') +' ';
            for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
              className = className.replace(' ' + i + ' ',' ');
              if(nvalue[i] === true){
                className += i+' ';
              }
            }
            className = className.trim();
            if(isNotHtml){
              dom.attr(elem, 'class', className)
            }else{
              elem.className = className
            }
          }, DEEP_STABLE);
        },
        // **warn**: style inteplation will override this directive
        'r-style': function(elem, value){
          if(typeof value=== 'string'){
            value = _.fixObjStr(value)
          }
          this.$watch(value, function(nvalue){
            for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
              dom.css(elem, i, nvalue[i]);
            }
          },DEEP_STABLE);
        },
        // when expression is evaluate to true, the elem will add display:none
        // Example: <div r-hide={{items.length > 0}}></div>
        'r-hide': {
          link:function(elem, value){
            var preBool = null, compelete;
            if( _.isExpr(value) || typeof value === "string"){
              this.$watch(value, function(nvalue){
                var bool = !!nvalue;
                if(bool === preBool) return;
                preBool = bool;
                if(bool){
                  if(elem.onleave){
                    compelete = elem.onleave(function(){
                      elem.style.display = "none"
                      compelete = null;
                    })
                  }else{
                    elem.style.display = "none"
                  }

                }else{
                  if(compelete) compelete();
                  elem.style.display = "";
                  if(elem.onenter){
                    elem.onenter();
                  }
                }
              }, STABLE);
            }else if(!!value){
              elem.style.display = "none";
            }
          },
          ssr: function(value){
            return value? 'style="display:none"': ''
          }
        },
        'r-html': {
          ssr: function(value, tag){
            tag.body = value;
            return "";
          },
          link: function(elem, value){
            this.$watch(value, function(nvalue){
              nvalue = nvalue || "";
              dom.html(elem, nvalue)
            }, {force: true, stable: true});
          }
        },
        'ref': {
          accept: consts.COMPONENT_TYPE + consts.ELEMENT_TYPE,
          link: function( elem, value ){
            var refs = this.$refs || (this.$refs = {});
            var cval;
            if(_.isExpr(value)){
              this.$watch(value, function(nval, oval){
                cval = nval;
                if(refs[oval] === elem) refs[oval] = null;
                if(cval) refs[cval] = elem;
              }, STABLE)
            }else{
              refs[cval = value] = elem;
            }
            return function(){
              refs[cval] = null;
            }
          }
        }
      }

      Regular.directive(module.exports);












      /***/ },
    /* 27 */
    /***/ function(module, exports, __webpack_require__) {

      /**
       * event directive  bundle
       *
       */
      var _ = __webpack_require__(3);
      var dom = __webpack_require__(15);
      var Regular = __webpack_require__(8);

      Regular._addProtoInheritCache("event");

      Regular.directive( /^on-\w+$/, function( elem, value, name , attrs) {
        if ( !name || !value ) return;
        var type = name.split("-")[1];
        return this._handleEvent( elem, type, value, attrs );
      });
      // TODO.
      /**
       - $('dx').delegate()
       */
      Regular.directive( /^(delegate|de)-\w+$/, function( elem, value, name ) {
        var root = this.$root;
        var _delegates = root._delegates || ( root._delegates = {} );
        if ( !name || !value ) return;
        var type = name.split("-")[1];
        var fire = _.handleEvent.call(this, value, type);

        function delegateEvent(ev){
          matchParent(ev, _delegates[type], root.parentNode);
        }

        if( !_delegates[type] ){
          _delegates[type] = [];

          if(root.parentNode){
            dom.on(root.parentNode, type, delegateEvent);
          }else{
            root.$on( "$inject", function( node, position, preParent ){
              var newParent = this.parentNode;
              if( preParent ){
                dom.off(preParent, type, delegateEvent);
              }
              if(newParent) dom.on(this.parentNode, type, delegateEvent);
            })
          }
          root.$on("$destroy", function(){
            if(root.parentNode) dom.off(root.parentNode, type, delegateEvent)
            _delegates[type] = null;
          })
        }
        var delegate = {
          element: elem,
          fire: fire
        }
        _delegates[type].push( delegate );

        return function(){
          var delegates = _delegates[type];
          if(!delegates || !delegates.length) return;
          for( var i = 0, len = delegates.length; i < len; i++ ){
            if( delegates[i] === delegate ) delegates.splice(i, 1);
          }
        }

      });


      function matchParent(ev , delegates, stop){
        if(!stop) return;
        var target = ev.target, pair;
        while(target && target !== stop){
          for( var i = 0, len = delegates.length; i < len; i++ ){
            pair = delegates[i];
            if(pair && pair.element === target){
              pair.fire(ev)
            }
          }
          target = target.parentNode;
        }
      }

      /***/ },
    /* 28 */
    /***/ function(module, exports, __webpack_require__) {

      // Regular
      var _ = __webpack_require__(3);
      var dom = __webpack_require__(15);
      var OPTIONS = __webpack_require__(16).OPTIONS
      var STABLE = OPTIONS.STABLE;
      var hasInput;
      var Regular = __webpack_require__(8);

      var modelHandlers = {
        "text": initText,
        "select": initSelect,
        "checkbox": initCheckBox,
        "radio": initRadio
      }


      // @TODO


      // autoUpdate directive for select element
      // to fix r-model issue , when handle dynamic options


      /**
       * <select r-model={name}>
       *   <r-option value={value} ></r-option>
       * </select>
       */


      // two-way binding with r-model
      // works on input, textarea, checkbox, radio, select


      Regular.directive("r-model", {
        param: ['throttle', 'lazy'],
        link: function( elem, value, name, extra ){
          var tag = elem.tagName.toLowerCase();
          var sign = tag;
          if(sign === "input") sign = elem.type || "text";
          else if(sign === "textarea") sign = "text";
          if(typeof value === "string") value = this.$expression(value);

          if( modelHandlers[sign] ) return modelHandlers[sign].call(this, elem, value, extra);
          else if(tag === "input"){
            return modelHandlers.text.call(this, elem, value, extra);
          }
        }
        //@TODO
        // ssr: function(name, value){
        //   return value? "value=" + value: ""
        // }
      });





      // binding <select>

      function initSelect( elem, parsed, extra){
        var self = this;
        var wc = this.$watch(parsed, function(newValue){
          var children = elem.getElementsByTagName('option');
          for(var i =0, len = children.length ; i < len; i++){
            if(children[i].value == newValue){
              elem.selectedIndex = i;
              break;
            }
          }
        }, STABLE);

        function handler(){
          parsed.set(self, this.value);
          wc.last = this.value;
          self.$update();
        }
        var isChanging = true
        elem.__change = function(){
          if(isChanging) return;
          isChanging = true;
          setTimeout(handler,0)
        }

        dom.on( elem, "change", handler );

        if(parsed.get(self) === undefined && elem.value){
          parsed.set(self, elem.value);
        }

        return function destroy(){
          dom.off(elem, "change", handler);
          // remove __change function
          delete elem.__change;
        }
      }

      // input,textarea binding
      function initText(elem, parsed, extra){
        var param = extra.param;
        var throttle, lazy = param.lazy

        if('throttle' in param){
          // <input throttle r-model>
          if(param[throttle] === true){
            throttle = 400;
          }else{
            throttle = parseInt(param.throttle , 10)
          }
        }

        var self = this;
        var wc = this.$watch(parsed, function(newValue){
          if(elem.value !== newValue) elem.value = newValue == null? "": "" + newValue;
        }, STABLE);

        // @TODO to fixed event
        var handler = function (ev){
          var that = this;
          if(ev.type==='cut' || ev.type==='paste'){
            _.nextTick(function(){
              var value = that.value
              parsed.set(self, value);
              wc.last = value;
              self.$update();
            })
          }else{
            var value = that.value
            parsed.set(self, value);
            wc.last = value;
            self.$update();
          }
        };

        if(throttle && !lazy){
          var preHandle = handler, tid;
          handler = _.throttle(handler, throttle);
        }

        if(hasInput === undefined){
          hasInput = dom.msie !== 9 && "oninput" in document.createElement('input')
        }

        if(lazy){
          dom.on(elem, 'change', handler)
        }else{
          if( hasInput){
            elem.addEventListener("input", handler );
          }else{
            dom.on(elem, "paste keyup cut change", handler)
          }
        }
        if(parsed.get(self) === undefined && elem.value){
          parsed.set(self, elem.value);
        }
        return function (){
          if(lazy) return dom.off(elem, "change", handler);
          if( hasInput ){
            elem.removeEventListener("input", handler );
          }else{
            dom.off(elem, "paste keyup cut change", handler)
          }
        }
      }


      // input:checkbox  binding

      function initCheckBox(elem, parsed){
        var self = this;
        var watcher = this.$watch(parsed, function(newValue){
          dom.attr(elem, 'checked', !!newValue);
        }, STABLE);

        var handler = function handler(){
          var value = this.checked;
          parsed.set(self, value);
          watcher.last = value;
          self.$update();
        }
        if(parsed.set) dom.on(elem, "change", handler)

        if(parsed.get(self) === undefined){
          parsed.set(self, !!elem.checked);
        }

        return function destroy(){
          if(parsed.set) dom.off(elem, "change", handler)
        }
      }


      // input:radio binding

      function initRadio(elem, parsed){
        var self = this;
        var wc = this.$watch(parsed, function( newValue ){
          if(newValue == elem.value) elem.checked = true;
          else elem.checked = false;
        }, STABLE);


        var handler = function handler(){
          var value = this.value;
          parsed.set(self, value);
          self.$update();
        }
        if(parsed.set) dom.on(elem, "change", handler)
        // beacuse only after compile(init), the dom structrue is exsit.
        if(parsed.get(self) === undefined){
          if(elem.checked) {
            parsed.set(self, elem.value);
          }
        }

        return function destroy(){
          if(parsed.set) dom.off(elem, "change", handler)
        }
      }





      /***/ },
    /* 29 */
    /***/ function(module, exports, __webpack_require__) {

      var // packages
        _ = __webpack_require__(3),
        animate = __webpack_require__(20),
        dom = __webpack_require__(15),
        Regular = __webpack_require__(8);


      var // variables
        rClassName = /^[-\w]+(\s[-\w]+)*$/,
        rCommaSep = /[\r\n\f ]*,[\r\n\f ]*(?=\w+\:)/, //  dont split comma in  Expression
        rStyles = /^\{.*\}$/, //  for Simpilfy
        rSpace = /\s+/, //  for Simpilfy
        WHEN_COMMAND = "when",
        EVENT_COMMAND = "on",
        THEN_COMMAND = "then";

      /**
       * Animation Plugin
       * @param {Component} Component
       */


      function createSeed(type){

        var steps = [], current = 0, callback = _.noop;
        var key;

        var out = {
          type: type,
          start: function(cb){
            key = _.uid();
            if(typeof cb === "function") callback = cb;
            if(current> 0 ){
              current = 0 ;
            }else{
              out.step();
            }
            return out.compelete;
          },
          compelete: function(){
            key = null;
            callback && callback();
            callback = _.noop;
            current = 0;
          },
          step: function(){
            if(steps[current]) steps[current ]( out.done.bind(out, key) );
          },
          done: function(pkey){
            if(pkey !== key) return; // means the loop is down
            if( current < steps.length - 1 ) {
              current++;
              out.step();
            }else{
              out.compelete();
            }
          },
          push: function(step){
            steps.push(step)
          }
        }

        return out;
      }

      Regular._addProtoInheritCache("animation")


      // builtin animation
      Regular.animation({
        "wait": function( step ){
          var timeout = parseInt( step.param ) || 0
          return function(done){
            // _.log("delay " + timeout)
            setTimeout( done, timeout );
          }
        },
        "class": function(step){
          var tmp = step.param.split(","),
            className = tmp[0] || "",
            mode = parseInt(tmp[1]) || 1;

          return function(done){
            // _.log(className)
            animate.startClassAnimate( step.element, className , done, mode );
          }
        },
        "call": function(step){
          var fn = this.$expression(step.param).get, self = this;
          return function(done){
            // _.log(step.param, 'call')
            fn(self);
            self.$update();
            done()
          }
        },
        "emit": function(step){
          var param = step.param;
          var tmp = param.split(","),
            evt = tmp[0] || "",
            args = tmp[1]? this.$expression(tmp[1]).get: null;

          if(!evt) throw Error("you shoud specified a eventname in emit command");

          var self = this;
          return function(done){
            self.$emit(evt, args? args(self) : undefined);
            done();
          }
        },
        // style: left {10}px,
        style: function(step){
          var styles = {},
            param = step.param,
            pairs = param.split(","), valid;
          pairs.forEach(function(pair){
            pair = pair.trim();
            if(pair){
              var tmp = pair.split( rSpace ),
                name = tmp.shift(),
                value = tmp.join(" ");

              if( !name || !value ) throw Error("invalid style in command: style");
              styles[name] = value;
              valid = true;
            }
          })

          return function(done){
            if(valid){
              animate.startStyleAnimate(step.element, styles, done);
            }else{
              done();
            }
          }
        }
      })



      // hancdle the r-animation directive
      // el : the element to process
      // value: the directive value
      function processAnimate( element, value ){
        var Component = this.constructor;

        if(_.isExpr(value)){
          value = value.get(this);
        }

        value = value.trim();

        var composites = value.split(";"),
          composite, context = this, seeds = [], seed, destroies = [], destroy,
          command, param , current = 0, tmp, animator, self = this;

        function reset( type ){
          seed && seeds.push( seed )
          seed = createSeed( type );
        }

        function whenCallback(start, value){
          if( !!value ) start()
        }

        function animationDestroy(element){
          return function(){
            element.onenter = null;
            element.onleave = null;
          }
        }

        for( var i = 0, len = composites.length; i < len; i++ ){

          composite = composites[i];
          tmp = composite.split(":");
          command = tmp[0] && tmp[0].trim();
          param = tmp[1] && tmp[1].trim();

          if( !command ) continue;

          if( command === WHEN_COMMAND ){
            reset("when");
            this.$watch(param, whenCallback.bind( this, seed.start ) );
            continue;
          }

          if( command === EVENT_COMMAND){
            reset(param);
            if( param === "leave" ){
              element.onleave = seed.start;
              destroies.push( animationDestroy(element) );
            }else if( param === "enter" ){
              element.onenter = seed.start;
              destroies.push( animationDestroy(element) );
            }else{
              if( ("on" + param) in element){ // if dom have the event , we use dom event
                destroies.push(this._handleEvent( element, param, seed.start ));
              }else{ // otherwise, we use component event
                this.$on(param, seed.start);
                destroies.push(this.$off.bind(this, param, seed.start));
              }
            }
            continue;
          }

          var animator =  Component.animation(command)
          if( animator && seed ){
            seed.push(
              animator.call(this,{
                element: element,
                done: seed.done,
                param: param
              })
            )
          }else{
            throw Error( animator? "you should start with `on` or `event` in animation" : ("undefined animator 【" + command +"】" ));
          }
        }

        if(destroies.length){
          return function(){
            destroies.forEach(function(destroy){
              destroy();
            })
          }
        }
      }


      Regular.directive( "r-animation", processAnimate)
      Regular.directive( "r-anim", processAnimate)



      /***/ },
    /* 30 */
    /***/ function(module, exports, __webpack_require__) {

      var Regular = __webpack_require__(8);

      /**
       * Timeout Module
       * @param {Component} Component
       */
      function TimeoutModule(Component){

        Component.implement({
          /**
           * just like setTimeout, but will enter digest automately
           * @param  {Function} fn
           * @param  {Number}   delay
           * @return {Number}   timeoutid
           */
          $timeout: function(fn, delay){
            delay = delay || 0;
            return setTimeout(function(){
              fn.call(this);
              this.$update(); //enter digest
            }.bind(this), delay);
          },
          /**
           * just like setInterval, but will enter digest automately
           * @param  {Function} fn
           * @param  {Number}   interval
           * @return {Number}   intervalid
           */
          $interval: function(fn, interval){
            interval = interval || 1000/60;
            return setInterval(function(){
              fn.call(this);
              this.$update(); //enter digest
            }.bind(this), interval);
          }
        });
      }


      Regular.plugin('timeout', TimeoutModule);
      Regular.plugin('$timeout', TimeoutModule);

      /***/ }
    /******/ ])
});
;
},{}],2:[function(require,module,exports){
const Regular = require("../lib/regular")

const BroadCastor = Regular.extend({
  name: 'BroadCastor',
  template: `{#include this.$body}`,
  config( data ) {
    console.log("BroadCastor config");
    const emitter = data.emitter;
    this._broadcast = emitter.$emit.bind(emitter)
    this._subscribe = emitter.$on.bind(emitter)
  },
  init() {
    console.log("BroadCastor init");
  },
  modifyBodyComponent( component, next ) {
    console.log("BroadCastor modifyBodyComponent");
    component.$broadcast = this._broadcast;
    component.$subscribe = this._subscribe;

    next(component);
  }
})

module.exports = BroadCastor
},{"../lib/regular":1}],3:[function(require,module,exports){
const broadcator = require('./broadcastor')
const top = require('./top')
const Regular = require("../lib/regular")

const App = new Regular({
  template: `
    <BroadCastor emitter={ aa }>
        <Top />Test
    </BroadCastor> 
  `,
  data: {
    aa: new Regular
  }
})

App.$inject(document.body)

},{"../lib/regular":1,"./broadcastor":2,"./top":5}],4:[function(require,module,exports){
// const { broadcast, subscribe } = require('./mediator')
const Regular = require("../lib/regular")

const LeafNode = Regular.extend({
  name: 'LeafNode',
  template: `<div on-click={ this.onClick() }> click me </div>`,
  config() {
    console.log("LeafNode config");
  },
  init() {
    console.log("LeafNode init");
  },
  onClick() {
    this.$broadcast('check', { type: 'leafnode' })
  }
})

module.exports = LeafNode
},{"../lib/regular":1}],5:[function(require,module,exports){
// const { broadcast, subscribe } = require('./mediator');
const Regular = require('../lib/regular');
const leafNode = require('./leafNode');

const Top = Regular.extend({
  name: 'Top',
  template: '<LeafNode> </LeafNode>',
  config() {
    console.log("Top config");
  },
  init() {
    console.log("Top init");
    this.$subscribe('check', ev => {
      console.log(`accepted emit event:${JSON.stringify(ev)}`);
    })
  }
})

module.exports = Top
},{"../lib/regular":1,"./leafNode":4}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvcmVndWxhci5qcyIsInNyYy9icm9hZGNhc3Rvci5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9sZWFmTm9kZS5qcyIsInNyYy90b3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbDFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcclxuIEBhdXRob3JcdGxlZWx1b2xlZVxyXG4gQHZlcnNpb25cdDAuNi4wLWJldGEuNlxyXG4gQGhvbWVwYWdlXHRodHRwOi8vcmVndWxhcmpzLmdpdGh1Yi5pb1xyXG4gKi9cclxuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcclxuICBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcclxuICBlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcclxuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XHJcbiAgZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXHJcbiAgICBleHBvcnRzW1wiUmVndWxhclwiXSA9IGZhY3RvcnkoKTtcclxuICBlbHNlXHJcbiAgICByb290W1wiUmVndWxhclwiXSA9IGZhY3RvcnkoKTtcclxufSkodGhpcywgZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcclxuICAgIC8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxyXG4gICAgLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xyXG5cclxuICAgIC8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cclxuICAgIC8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xyXG5cclxuICAgICAgLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxyXG4gICAgICAvKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXHJcbiAgICAgIC8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xyXG5cclxuICAgICAgLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXHJcbiAgICAgIC8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XHJcbiAgICAgICAgLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXHJcbiAgICAgICAgLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxyXG4gICAgICAgIC8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2VcclxuICAgICAgICAvKioqKioqLyBcdFx0fTtcclxuXHJcbiAgICAgIC8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cclxuICAgICAgLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xyXG5cclxuICAgICAgLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcclxuICAgICAgLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXHJcbiAgICAgIC8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XHJcbiAgICAgIC8qKioqKiovIFx0fVxyXG5cclxuXHJcbiAgICAvKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXHJcbiAgICAvKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XHJcblxyXG4gICAgLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxyXG4gICAgLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xyXG5cclxuICAgIC8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cclxuICAgIC8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcclxuXHJcbiAgICAvKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xyXG4gICAgLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcclxuICAgIC8qKioqKiovIH0pXHJcbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAvKioqKioqLyAoW1xyXG4gICAgLyogMCAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICB2YXIgZW52ID0gIF9fd2VicGFja19yZXF1aXJlX18oMSk7XHJcbiAgICAgIHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xyXG4gICAgICB2YXIgUmVndWxhciA9IG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcclxuICAgICAgdmFyIFBhcnNlciA9IFJlZ3VsYXIuUGFyc2VyO1xyXG4gICAgICB2YXIgTGV4ZXIgPSBSZWd1bGFyLkxleGVyO1xyXG5cclxuICAgICAgLy8gaWYoZW52LmJyb3dzZXIpe1xyXG4gICAgICBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KTtcclxuICAgICAgX193ZWJwYWNrX3JlcXVpcmVfXygyOSk7XHJcbiAgICAgIF9fd2VicGFja19yZXF1aXJlX18oMzApO1xyXG4gICAgICBSZWd1bGFyLmRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xyXG4gICAgICAvLyB9XHJcbiAgICAgIFJlZ3VsYXIuZW52ID0gZW52O1xyXG4gICAgICBSZWd1bGFyLnV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xyXG4gICAgICBSZWd1bGFyLnBhcnNlID0gZnVuY3Rpb24oc3RyLCBvcHRpb25zKXtcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAgICAgaWYob3B0aW9ucy5CRUdJTiB8fCBvcHRpb25zLkVORCl7XHJcbiAgICAgICAgICBpZihvcHRpb25zLkJFR0lOKSBjb25maWcuQkVHSU4gPSBvcHRpb25zLkJFR0lOO1xyXG4gICAgICAgICAgaWYob3B0aW9ucy5FTkQpIGNvbmZpZy5FTkQgPSBvcHRpb25zLkVORDtcclxuICAgICAgICAgIExleGVyLnNldHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhc3QgPSBuZXcgUGFyc2VyKHN0cikucGFyc2UoKTtcclxuICAgICAgICByZXR1cm4gIW9wdGlvbnMuc3RyaW5naWZ5PyBhc3QgOiBKU09OLnN0cmluZ2lmeShhc3QpO1xyXG4gICAgICB9XHJcbiAgICAgIFJlZ3VsYXIuQ3Vyc29yID1fX3dlYnBhY2tfcmVxdWlyZV9fKDIyKVxyXG5cclxuICAgICAgUmVndWxhci5pc1NlcnZlciA9IGVudi5ub2RlO1xyXG4gICAgICBSZWd1bGFyLmlzUmVndWxhciA9IGZ1bmN0aW9uKCBDb21wICl7XHJcbiAgICAgICAgcmV0dXJuICBDb21wLnByb3RvdHlwZSBpbnN0YW5jZW9mIFJlZ3VsYXI7XHJcbiAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAxICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihwcm9jZXNzKSB7Ly8gc29tZSBmaXh0dXJlIHRlc3Q7XHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xyXG4gICAgICAgIGV4cG9ydHMuc3ZnID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoIFwiaHR0cDovL3d3dy53My5vcmcvVFIvU1ZHMTEvZmVhdHVyZSNCYXNpY1N0cnVjdHVyZVwiLCBcIjEuMVwiICk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcblxyXG4gICAgICAgIGV4cG9ydHMuYnJvd3NlciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudC5ub2RlVHlwZTtcclxuICAgICAgICAvLyB3aGV0aGVyIGhhdmUgY29tcG9uZW50IGluIGluaXRpYWxpemluZ1xyXG4gICAgICAgIGV4cG9ydHMuZXhwckNhY2hlID0gXy5jYWNoZSgxMDAwKTtcclxuICAgICAgICBleHBvcnRzLm5vZGUgPSB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiAoICcnICsgcHJvY2VzcyApID09PSAnW29iamVjdCBwcm9jZXNzXSc7XHJcbiAgICAgICAgZXhwb3J0cy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18oMikpKVxyXG5cclxuICAgICAgLyoqKi8gfSxcclxuICAgIC8qIDIgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG5cclxuICAgICAgLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXHJcbiAgICAgIHZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXHJcbiAgICAgIC8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxyXG4gICAgICAvLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcclxuICAgICAgLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxyXG4gICAgICAvLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxyXG5cclxuICAgICAgdmFyIGNhY2hlZFNldFRpbWVvdXQ7XHJcbiAgICAgIHZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XHJcblxyXG4gICAgICBmdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XHJcbiAgICAgIH1cclxuICAgICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ICgpKVxyXG4gICAgICBmdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xyXG4gICAgICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XHJcbiAgICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcclxuICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICAgICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XHJcbiAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcclxuICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xyXG4gICAgICAgIH0gY2F0Y2goZSl7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xyXG4gICAgICAgICAgfSBjYXRjaChlKXtcclxuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB9XHJcbiAgICAgIGZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcclxuICAgICAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcclxuICAgICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xyXG4gICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXHJcbiAgICAgICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XHJcbiAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XHJcbiAgICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXHJcbiAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XHJcbiAgICAgICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSl7XHJcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxyXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgfVxyXG4gICAgICB2YXIgcXVldWUgPSBbXTtcclxuICAgICAgdmFyIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICAgIHZhciBjdXJyZW50UXVldWU7XHJcbiAgICAgIHZhciBxdWV1ZUluZGV4ID0gLTE7XHJcblxyXG4gICAgICBmdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XHJcbiAgICAgICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyYWluaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgZHJhaW5RdWV1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcclxuICAgICAgICBpZiAoZHJhaW5pbmcpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XHJcbiAgICAgICAgZHJhaW5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlKGxlbikge1xyXG4gICAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XHJcbiAgICAgICAgICBxdWV1ZSA9IFtdO1xyXG4gICAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XHJcbiAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XHJcbiAgICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XHJcbiAgICAgICAgZHJhaW5pbmcgPSBmYWxzZTtcclxuICAgICAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XHJcbiAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcclxuICAgICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xyXG4gICAgICBmdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcclxuICAgICAgICB0aGlzLmZ1biA9IGZ1bjtcclxuICAgICAgICB0aGlzLmFycmF5ID0gYXJyYXk7XHJcbiAgICAgIH1cclxuICAgICAgSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xyXG4gICAgICB9O1xyXG4gICAgICBwcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xyXG4gICAgICBwcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xyXG4gICAgICBwcm9jZXNzLmVudiA9IHt9O1xyXG4gICAgICBwcm9jZXNzLmFyZ3YgPSBbXTtcclxuICAgICAgcHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXHJcbiAgICAgIHByb2Nlc3MudmVyc2lvbnMgPSB7fTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxuICAgICAgcHJvY2Vzcy5vbiA9IG5vb3A7XHJcbiAgICAgIHByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xyXG4gICAgICBwcm9jZXNzLm9uY2UgPSBub29wO1xyXG4gICAgICBwcm9jZXNzLm9mZiA9IG5vb3A7XHJcbiAgICAgIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xyXG4gICAgICBwcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XHJcbiAgICAgIHByb2Nlc3MuZW1pdCA9IG5vb3A7XHJcblxyXG4gICAgICBwcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XHJcbiAgICAgIHByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgfTtcclxuICAgICAgcHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMyAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICAvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsLCBzZXRJbW1lZGlhdGUpIHtfX3dlYnBhY2tfcmVxdWlyZV9fKDUpKCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIF8gID0gbW9kdWxlLmV4cG9ydHM7XHJcbiAgICAgICAgdmFyIGVudGl0aWVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcclxuICAgICAgICB2YXIgbzJzdHIgPSAoe30pLnRvU3RyaW5nO1xyXG4gICAgICAgIHZhciB3aW4gPSB0eXBlb2Ygd2luZG93ICE9PSd1bmRlZmluZWQnPyB3aW5kb3c6IGdsb2JhbDtcclxuICAgICAgICB2YXIgTUFYX1BSSU9SSVRZID0gOTk5OTtcclxuICAgICAgICB2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcclxuXHJcblxyXG4gICAgICAgIF8ubm9vcCA9IGZ1bmN0aW9uKCl7fTtcclxuICAgICAgICBfLnVpZCA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIF91aWQ9MDtcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gX3VpZCsrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIF8uZXh0ZW5kID0gZnVuY3Rpb24oIG8xLCBvMiwgb3ZlcnJpZGUgKXtcclxuICAgICAgICAgIGZvcih2YXIgaSBpbiBvMikgaWYgKG8yLmhhc093blByb3BlcnR5KGkpKXtcclxuICAgICAgICAgICAgaWYoIG8xW2ldID09PSB1bmRlZmluZWQgfHwgb3ZlcnJpZGUgPT09IHRydWUgKXtcclxuICAgICAgICAgICAgICBvMVtpXSA9IG8yW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBvMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF8ua2V5cyA9IE9iamVjdC5rZXlzPyBPYmplY3Qua2V5czogZnVuY3Rpb24ob2JqKXtcclxuICAgICAgICAgIHZhciByZXMgPSBbXTtcclxuICAgICAgICAgIGZvcih2YXIgaSBpbiBvYmopIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSl7XHJcbiAgICAgICAgICAgIHJlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF8uc29tZSA9IGZ1bmN0aW9uKGxpc3QsIGZuKXtcclxuICAgICAgICAgIGZvcih2YXIgaSA9MCxsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgaWYoZm4obGlzdFtpXSkpIHJldHVybiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfLnZhck5hbWUgPSAnZCc7XHJcbiAgICAgICAgXy5zZXROYW1lID0gJ3BfJztcclxuICAgICAgICBfLmN0eE5hbWUgPSAnYyc7XHJcbiAgICAgICAgXy5leHROYW1lID0gJ2UnO1xyXG5cclxuICAgICAgICBfLnJXb3JkID0gL15bXFwkXFx3XSskLztcclxuICAgICAgICBfLnJTaW1wbGVBY2Nlc3NvciA9IC9eW1xcJFxcd10rKFxcLltcXCRcXHddKykqJC87XHJcblxyXG4gICAgICAgIF8ubmV4dFRpY2sgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSAnZnVuY3Rpb24nP1xyXG4gICAgICAgICAgc2V0SW1tZWRpYXRlLmJpbmQod2luKSA6XHJcbiAgICAgICAgICBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKVxyXG4gICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIF8ucHJlZml4ID0gXCIndXNlIHN0cmljdCc7dmFyIFwiICsgXy52YXJOYW1lICsgXCI9XCIgKyBfLmN0eE5hbWUgKyBcIi5kYXRhO1wiICsgIF8uZXh0TmFtZSAgKyBcIj1cIiArIF8uZXh0TmFtZSArIFwifHwnJztcIjtcclxuXHJcblxyXG4gICAgICAgIF8uc2xpY2UgPSBmdW5jdGlvbihvYmosIHN0YXJ0LCBlbmQpe1xyXG4gICAgICAgICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gc3RhcnQgfHwgMCwgbGVuID0gZW5kIHx8IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIHJlcy5wdXNoKG9ialtpXSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBiZWFjdXNlIHNsaWNlIGFuZCB0b0xvd2VyQ2FzZSBpcyBleHBlbnNpdmUuIHdlIGhhbmRsZSB1bmRlZmluZWQgYW5kIG51bGwgaW4gYW5vdGhlciB3YXlcclxuICAgICAgICBfLnR5cGVPZiA9IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICByZXR1cm4gbyA9PSBudWxsID8gU3RyaW5nKG8pIDpvMnN0ci5jYWxsKG8pLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgXy5tYWtlUHJlZGljYXRlID0gZnVuY3Rpb24gbWFrZVByZWRpY2F0ZSh3b3JkcywgcHJlZml4KSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHdvcmRzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHdvcmRzID0gd29yZHMuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGYgPSBcIlwiLFxyXG4gICAgICAgICAgICBjYXRzID0gW107XHJcbiAgICAgICAgICBvdXQ6IGZvciAodmFyIGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjYXRzLmxlbmd0aDsgKytqKXtcclxuICAgICAgICAgICAgICBpZiAoY2F0c1tqXVswXS5sZW5ndGggPT09IHdvcmRzW2ldLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY2F0c1tqXS5wdXNoKHdvcmRzW2ldKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0cy5wdXNoKFt3b3Jkc1tpXV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gY29tcGFyZVRvKGFycikge1xyXG4gICAgICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMSkgcmV0dXJuIGYgKz0gXCJyZXR1cm4gc3RyID09PSAnXCIgKyBhcnJbMF0gKyBcIic7XCI7XHJcbiAgICAgICAgICAgIGYgKz0gXCJzd2l0Y2goc3RyKXtcIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpe1xyXG4gICAgICAgICAgICAgIGYgKz0gXCJjYXNlICdcIiArIGFycltpXSArIFwiJzpcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmICs9IFwicmV0dXJuIHRydWV9cmV0dXJuIGZhbHNlO1wiO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFdoZW4gdGhlcmUgYXJlIG1vcmUgdGhhbiB0aHJlZSBsZW5ndGggY2F0ZWdvcmllcywgYW4gb3V0ZXJcclxuICAgICAgICAgIC8vIHN3aXRjaCBmaXJzdCBkaXNwYXRjaGVzIG9uIHRoZSBsZW5ndGhzLCB0byBzYXZlIG9uIGNvbXBhcmlzb25zLlxyXG4gICAgICAgICAgaWYgKGNhdHMubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICBjYXRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZiArPSBcInN3aXRjaChzdHIubGVuZ3RoKXtcIjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGNhdCA9IGNhdHNbaV07XHJcbiAgICAgICAgICAgICAgZiArPSBcImNhc2UgXCIgKyBjYXRbMF0ubGVuZ3RoICsgXCI6XCI7XHJcbiAgICAgICAgICAgICAgY29tcGFyZVRvKGNhdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZiArPSBcIn1cIjtcclxuXHJcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgc2ltcGx5IGdlbmVyYXRlIGEgZmxhdCBgc3dpdGNoYCBzdGF0ZW1lbnQuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb21wYXJlVG8od29yZHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbihcInN0clwiLCBmKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBfLnRyYWNrRXJyb3JQb3MgPSAoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAvLyBsaW5lYnJlYWtcclxuICAgICAgICAgIHZhciBsYiA9IC9cXHJcXG58W1xcblxcclxcdTIwMjhcXHUyMDI5XS9nO1xyXG4gICAgICAgICAgdmFyIG1pblJhbmdlID0gMjAsIG1heFJhbmdlID0gMjA7XHJcbiAgICAgICAgICBmdW5jdGlvbiBmaW5kTGluZShsaW5lcywgcG9zKXtcclxuICAgICAgICAgICAgdmFyIHRtcExlbiA9IDA7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xyXG4gICAgICAgICAgICAgIHZhciBsaW5lTGVuID0gKGxpbmVzW2ldIHx8IFwiXCIpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgaWYodG1wTGVuICsgbGluZUxlbiA+IHBvcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtudW06IGksIGxpbmU6IGxpbmVzW2ldLCBzdGFydDogcG9zIC0gaSAtIHRtcExlbiAsIHByZXY6bGluZXNbaS0xXSwgbmV4dDogbGluZXNbaSsxXSB9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAvLyAxIGlzIGZvciB0aGUgbGluZWJyZWFrXHJcbiAgICAgICAgICAgICAgdG1wTGVuID0gdG1wTGVuICsgbGluZUxlbiA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdExpbmUoc3RyLCAgc3RhcnQsIG51bSwgdGFyZ2V0KXtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHN0ci5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBzdGFydCAtIG1pblJhbmdlO1xyXG4gICAgICAgICAgICBpZihtaW4gPCAwKSBtaW4gPSAwO1xyXG4gICAgICAgICAgICB2YXIgbWF4ID0gc3RhcnQgKyBtYXhSYW5nZTtcclxuICAgICAgICAgICAgaWYobWF4ID4gbGVuKSBtYXggPSBsZW47XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVtYWluID0gc3RyLnNsaWNlKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgdmFyIHByZWZpeCA9IFwiW1wiICsobnVtKzEpICsgXCJdIFwiICsgKG1pbiA+IDA/IFwiLi5cIiA6IFwiXCIpXHJcbiAgICAgICAgICAgIHZhciBwb3N0Zml4ID0gbWF4IDwgbGVuID8gXCIuLlwiOiBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gcHJlZml4ICsgcmVtYWluICsgcG9zdGZpeDtcclxuICAgICAgICAgICAgaWYodGFyZ2V0KSByZXMgKz0gXCJcXG5cIiArIG5ldyBBcnJheShzdGFydC1taW4gKyBwcmVmaXgubGVuZ3RoICsgMSkuam9pbihcIiBcIikgKyBcIl5eXlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBwb3Mpe1xyXG4gICAgICAgICAgICBpZihwb3MgPiBpbnB1dC5sZW5ndGgtMSkgcG9zID0gaW5wdXQubGVuZ3RoLTE7XHJcbiAgICAgICAgICAgIGxiLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHZhciBsaW5lcyA9IGlucHV0LnNwbGl0KGxiKTtcclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBmaW5kTGluZShsaW5lcyxwb3MpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBsaW5lLnN0YXJ0LCBudW0gPSBsaW5lLm51bTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAobGluZS5wcmV2PyBmb3JtYXRMaW5lKGxpbmUucHJldiwgc3RhcnQsIG51bS0xICkgKyAnXFxuJzogJycgKSArXHJcbiAgICAgICAgICAgICAgZm9ybWF0TGluZShsaW5lLmxpbmUsIHN0YXJ0LCBudW0sIHRydWUpICsgJ1xcbicgK1xyXG4gICAgICAgICAgICAgIChsaW5lLm5leHQ/IGZvcm1hdExpbmUobGluZS5uZXh0LCBzdGFydCwgbnVtKzEgKSArICdcXG4nOiAnJyApO1xyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSgpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGlnbm9yZWRSZWYgPSAvXFwoKFxcP1xcIXxcXD9cXDp8XFw/XFw9KS9nO1xyXG4gICAgICAgIF8uZmluZFN1YkNhcHR1cmUgPSBmdW5jdGlvbiAocmVnU3RyKSB7XHJcbiAgICAgICAgICB2YXIgbGVmdCA9IDAsXHJcbiAgICAgICAgICAgIHJpZ2h0ID0gMCxcclxuICAgICAgICAgICAgbGVuID0gcmVnU3RyLmxlbmd0aCxcclxuICAgICAgICAgICAgaWdub3JlZCA9IHJlZ1N0ci5tYXRjaChpZ25vcmVkUmVmKTsgLy8gaWdub3JlZCB1bmNhcHR1cmVcclxuICAgICAgICAgIGlmKGlnbm9yZWQpIGlnbm9yZWQgPSBpZ25vcmVkLmxlbmd0aFxyXG4gICAgICAgICAgZWxzZSBpZ25vcmVkID0gMDtcclxuICAgICAgICAgIGZvciAoOyBsZW4tLTspIHtcclxuICAgICAgICAgICAgdmFyIGxldHRlciA9IHJlZ1N0ci5jaGFyQXQobGVuKTtcclxuICAgICAgICAgICAgaWYgKGxlbiA9PT0gMCB8fCByZWdTdHIuY2hhckF0KGxlbiAtIDEpICE9PSBcIlxcXFxcIiApIHtcclxuICAgICAgICAgICAgICBpZiAobGV0dGVyID09PSBcIihcIikgbGVmdCsrO1xyXG4gICAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09IFwiKVwiKSByaWdodCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobGVmdCAhPT0gcmlnaHQpIHRocm93IFwiUmVnRXhwOiBcIisgcmVnU3RyICsgXCIncyBicmFja2V0IGlzIG5vdCBtYXJjaGVkXCI7XHJcbiAgICAgICAgICBlbHNlIHJldHVybiBsZWZ0IC0gaWdub3JlZDtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgXy5lc2NhcGVSZWdFeHAgPSBmdW5jdGlvbiggc3RyKXsvLyBDcmVkaXQ6IFhSZWdFeHAgMC42LjEgKGMpIDIwMDctMjAwOCBTdGV2ZW4gTGV2aXRoYW4gPGh0dHA6Ly9zdGV2ZW5sZXZpdGhhbi5jb20vcmVnZXgveHJlZ2V4cC8+IE1JVCBMaWNlbnNlXHJcbiAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uXFxcXF4kfCwjXFxzXS9nLCBmdW5jdGlvbihtYXRjaCl7XHJcbiAgICAgICAgICAgIHJldHVybiAnXFxcXCcgKyBtYXRjaDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB2YXIgckVudGl0eSA9IG5ldyBSZWdFeHAoXCImKD86KCN4WzAtOWEtZkEtRl0rKXwoI1swLTldKyl8KFwiICsgXy5rZXlzKGVudGl0aWVzKS5qb2luKCd8JykgKyAnKSk7JywgJ2dpJyk7XHJcblxyXG4gICAgICAgIF8uY29udmVydEVudGl0eSA9IGZ1bmN0aW9uKGNocil7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIChcIlwiICsgY2hyKS5yZXBsYWNlKHJFbnRpdHksIGZ1bmN0aW9uKGFsbCwgaGV4LCBkZWMsIGNhcHR1cmUpe1xyXG4gICAgICAgICAgICB2YXIgY2hhckNvZGU7XHJcbiAgICAgICAgICAgIGlmKCBkZWMgKSBjaGFyQ29kZSA9IHBhcnNlSW50KCBkZWMuc2xpY2UoMSksIDEwICk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYoIGhleCApIGNoYXJDb2RlID0gcGFyc2VJbnQoIGhleC5zbGljZSgyKSwgMTYgKTtcclxuICAgICAgICAgICAgZWxzZSBjaGFyQ29kZSA9IGVudGl0aWVzW2NhcHR1cmVdXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSggY2hhckNvZGUgKVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHNpbXBsZSBnZXQgYWNjZXNzb3JcclxuXHJcbiAgICAgICAgXy5jcmVhdGVPYmplY3QgPSBPYmplY3QuY3JlYXRlPyBmdW5jdGlvbihvKXtcclxuICAgICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG8gfHwgbnVsbClcclxuICAgICAgICB9OiAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGZ1bmN0aW9uIFRlbXAoKSB7fVxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG8pe1xyXG4gICAgICAgICAgICBpZighbykgcmV0dXJuIHt9XHJcbiAgICAgICAgICAgIFRlbXAucHJvdG90eXBlID0gbztcclxuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyBUZW1wKCk7XHJcbiAgICAgICAgICAgIFRlbXAucHJvdG90eXBlID0gbnVsbDsgLy8g5LiN6KaB5L+d5oyB5LiA5LiqIE8g55qE5p2C5pWj5byV55So77yIYSBzdHJheSByZWZlcmVuY2XvvIkuLi5cclxuICAgICAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIF8uY3JlYXRlUHJvdG8gPSBmdW5jdGlvbihmbiwgbyl7XHJcbiAgICAgICAgICBmdW5jdGlvbiBGb28oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBmbjt9XHJcbiAgICAgICAgICBGb28ucHJvdG90eXBlID0gbztcclxuICAgICAgICAgIHJldHVybiAoZm4ucHJvdG90eXBlID0gbmV3IEZvbygpKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBfLnJlbW92ZU9uZSA9IGZ1bmN0aW9uKGxpc3QgLCBmaWx0ZXIpe1xyXG4gICAgICAgICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgZm9yKDtsZW4tLTspe1xyXG4gICAgICAgICAgICBpZihmaWx0ZXIobGlzdFtsZW5dKSkge1xyXG4gICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGxlbiwgMSlcclxuICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgY2xvbmVcclxuICAgICAgICAgKi9cclxuICAgICAgICBfLmNsb25lID0gZnVuY3Rpb24gY2xvbmUob2JqKXtcclxuICAgICAgICAgIGlmKCFvYmogfHwgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICkpIHJldHVybiBvYmo7XHJcbiAgICAgICAgICBpZihBcnJheS5pc0FycmF5KG9iaikpe1xyXG4gICAgICAgICAgICB2YXIgY2xvbmVkID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wLGxlbiA9IG9iai5sZW5ndGg7IGk8IGxlbjtpKyspe1xyXG4gICAgICAgICAgICAgIGNsb25lZFtpXSA9IG9ialtpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9uZWQ7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmFyIGNsb25lZCA9IHt9O1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gb2JqKSBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpe1xyXG4gICAgICAgICAgICAgIGNsb25lZFtpXSA9IG9ialtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXy5lcXVhbHMgPSBmdW5jdGlvbihub3csIG9sZCl7XHJcbiAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBub3c7XHJcbiAgICAgICAgICBpZih0eXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygb2xkID09PSAnbnVtYmVyJyYmIGlzTmFOKG5vdykgJiYgaXNOYU4ob2xkKSkgcmV0dXJuIHRydWVcclxuICAgICAgICAgIHJldHVybiBub3cgPT09IG9sZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkYXNoID0gLy0oW2Etel0pL2c7XHJcbiAgICAgICAgXy5jYW1lbENhc2UgPSBmdW5jdGlvbihzdHIpe1xyXG4gICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKGRhc2gsIGZ1bmN0aW9uKGFsbCwgY2FwdHVyZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBjYXB0dXJlLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBfLnRocm90dGxlID0gZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCl7XHJcbiAgICAgICAgICB2YXIgd2FpdCA9IHdhaXQgfHwgMTAwO1xyXG4gICAgICAgICAgdmFyIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcclxuICAgICAgICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgICAgIHZhciBwcmV2aW91cyA9IDA7XHJcbiAgICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHJldmlvdXMgPSArbmV3IERhdGU7XHJcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbm93ID0gKyBuZXcgRGF0ZTtcclxuICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcclxuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBob2dhbiBlc2NhcGVcclxuICAgICAgICAvLyA9PT09PT09PT09PT09PVxyXG4gICAgICAgIF8uZXNjYXBlID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgckFtcCA9IC8mL2csXHJcbiAgICAgICAgICAgIHJMdCA9IC88L2csXHJcbiAgICAgICAgICAgIHJHdCA9IC8+L2csXHJcbiAgICAgICAgICAgIHJBcG9zID0gL1xcJy9nLFxyXG4gICAgICAgICAgICByUXVvdCA9IC9cXFwiL2csXHJcbiAgICAgICAgICAgIGhDaGFycyA9IC9bJjw+XFxcIlxcJ10vO1xyXG5cclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhDaGFycy50ZXN0KHN0cikgP1xyXG4gICAgICAgICAgICAgIHN0clxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UockFtcCwgJyZhbXA7JylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHJMdCwgJyZsdDsnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2Uockd0LCAnJmd0OycpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZShyQXBvcywgJyYjMzk7JylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHJRdW90LCAnJnF1b3Q7JykgOlxyXG4gICAgICAgICAgICAgIHN0cjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICBfLmNhY2hlID0gZnVuY3Rpb24obWF4KXtcclxuICAgICAgICAgIG1heCA9IG1heCB8fCAxMDAwO1xyXG4gICAgICAgICAgdmFyIGtleXMgPSBbXSxcclxuICAgICAgICAgICAgY2FjaGUgPSB7fTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZVtrZXlzLnNoaWZ0KCldID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgIGlmKGNhY2hlW2tleV0gPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2FjaGVba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHJldHVybiBjYWNoZTtcclxuICAgICAgICAgICAgICByZXR1cm4gY2FjaGVba2V5XTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWF4OiBtYXgsXHJcbiAgICAgICAgICAgIGxlbjpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBrZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC8vIHNldHVwIHRoZSByYXcgRXhwcmVzc2lvblxyXG5cclxuXHJcbiAgICAgICAgLy8gaGFuZGxlIHRoZSBzYW1lIGxvZ2ljIG9uIGNvbXBvbmVudCdzIGBvbi0qYCBhbmQgZWxlbWVudCdzIGBvbi0qYFxyXG4gICAgICAgIC8vIHJldHVybiB0aGUgZmlyZSBvYmplY3RcclxuICAgICAgICBfLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24odmFsdWUsIHR5cGUgKXtcclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcywgZXZhbHVhdGU7XHJcbiAgICAgICAgICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicpeyAvLyBpZiBpcyBleHByZXNzaW9uLCBnbyBldmFsdWF0ZWQgd2F5XHJcbiAgICAgICAgICAgIGV2YWx1YXRlID0gdmFsdWUuZ2V0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoZXZhbHVhdGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gZmlyZShvYmope1xyXG4gICAgICAgICAgICAgIHNlbGYuJHVwZGF0ZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBkYXRhLiRldmVudCA9IG9iajtcclxuICAgICAgICAgICAgICAgIHZhciByZXMgPSBldmFsdWF0ZShzZWxmKTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcyA9PT0gZmFsc2UgJiYgb2JqICYmIG9iai5wcmV2ZW50RGVmYXVsdCkgb2JqLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLiRldmVudCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBmaXJlKCl7XHJcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBfLnNsaWNlKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgYXJncy51bnNoaWZ0KHZhbHVlKTtcclxuICAgICAgICAgICAgICBzZWxmLiR1cGRhdGUoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuJGVtaXQuYXBwbHkoc2VsZiwgYXJncyk7XHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb25seSBjYWxsIG9uY2VcclxuICAgICAgICBfLm9uY2UgPSBmdW5jdGlvbihmbil7XHJcbiAgICAgICAgICB2YXIgdGltZSA9IDA7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoIHRpbWUrKyA9PT0gMCkgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF8uZml4T2JqU3RyID0gZnVuY3Rpb24oc3RyKXtcclxuICAgICAgICAgIGlmKHN0ci50cmltKCkuaW5kZXhPZigneycpICE9PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuICd7JyArIHN0ciArICd9JztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdHI7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgXy5tYXA9IGZ1bmN0aW9uKGFycmF5LCBjYWxsYmFjayl7XHJcbiAgICAgICAgICB2YXIgcmVzID0gW107XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzLnB1c2goY2FsbGJhY2soYXJyYXlbaV0sIGkpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb2cobXNnLCB0eXBlKXtcclxuICAgICAgICAgIGlmKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSAgY29uc29sZVt0eXBlIHx8IFwibG9nXCJdKG1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfLmxvZyA9IGxvZztcclxuXHJcblxyXG4gICAgICAgIF8ubm9ybUxpc3RlbmVyID0gZnVuY3Rpb24oIGV2ZW50cyAgKXtcclxuICAgICAgICAgIHZhciBldmVudExpc3RlbmVycyA9IFtdO1xyXG4gICAgICAgICAgdmFyIHBUeXBlID0gXy50eXBlT2YoIGV2ZW50cyApO1xyXG4gICAgICAgICAgaWYoIHBUeXBlID09PSAnYXJyYXknICl7XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudHM7XHJcbiAgICAgICAgICB9ZWxzZSBpZiAoIHBUeXBlID09PSAnb2JqZWN0JyApe1xyXG4gICAgICAgICAgICBmb3IoIHZhciBpIGluIGV2ZW50cyApIGlmICggZXZlbnRzLmhhc093blByb3BlcnR5KGkpICl7XHJcbiAgICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBpLFxyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXI6IGV2ZW50c1tpXVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBldmVudExpc3RlbmVycztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL2h0dHA6Ly93d3cudzMub3JnL2h0bWwvd2cvZHJhZnRzL2h0bWwvbWFzdGVyL3NpbmdsZS1wYWdlLmh0bWwjdm9pZC1lbGVtZW50c1xyXG4gICAgICAgIF8uaXNWb2lkVGFnID0gXy5tYWtlUHJlZGljYXRlKFwiYXJlYSBiYXNlIGJyIGNvbCBlbWJlZCBociBpbWcgaW5wdXQga2V5Z2VuIGxpbmsgbWVudWl0ZW0gbWV0YSBwYXJhbSBzb3VyY2UgdHJhY2sgd2JyIHItY29udGVudFwiKTtcclxuICAgICAgICBfLmlzQm9vbGVhbkF0dHIgPSBfLm1ha2VQcmVkaWNhdGUoJ3NlbGVjdGVkIGNoZWNrZWQgZGlzYWJsZWQgcmVhZG9ubHkgcmVxdWlyZWQgb3BlbiBhdXRvZm9jdXMgY29udHJvbHMgYXV0b3BsYXkgY29tcGFjdCBsb29wIGRlZmVyIG11bHRpcGxlJyk7XHJcblxyXG5cclxuICAgICAgICBfLmlzRXhwciA9IGZ1bmN0aW9uKGV4cHIpe1xyXG4gICAgICAgICAgcmV0dXJuIGV4cHIgJiYgZXhwci50eXBlID09PSAnZXhwcmVzc2lvbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEBUT0RPOiBtYWtlIGl0IG1vcmUgc3RyaWN0XHJcbiAgICAgICAgXy5pc0dyb3VwID0gZnVuY3Rpb24oZ3JvdXApe1xyXG4gICAgICAgICAgcmV0dXJuIGdyb3VwLmluamVjdCB8fCBncm91cC4kaW5qZWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXy5ibGFua1JlZyA9IC9cXHMrLztcclxuXHJcbiAgICAgICAgXy5nZXRDb21waWxlRm4gPSBmdW5jdGlvbihzb3VyY2UsIGN0eCwgb3B0aW9ucyl7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oIHBhc3NlZE9wdGlvbnMgKXtcclxuICAgICAgICAgICAgaWYoIHBhc3NlZE9wdGlvbnMgJiYgb3B0aW9ucyApIF8uZXh0ZW5kKCBwYXNzZWRPcHRpb25zICwgb3B0aW9ucyApO1xyXG4gICAgICAgICAgICBlbHNlIHBhc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgICAgICByZXR1cm4gY3R4LiRjb21waWxlKHNvdXJjZSwgcGFzc2VkT3B0aW9ucyApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY3R4LiRjb21waWxlLmJpbmQoY3R4LHNvdXJjZSwgb3B0aW9ucylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBkaXJlY3RpdmUgcGFyYW0gZnJvbSBBU1RcclxuICAgICAgICBfLmZpeFRhZ0FTVCA9IGZ1bmN0aW9uKCB0YWdBU1QsIENvbXBvbmVudCApe1xyXG5cclxuICAgICAgICAgIGlmKCB0YWdBU1QudG91Y2hlZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgICB2YXIgYXR0cnMgPSB0YWdBU1QuYXR0cnM7XHJcblxyXG4gICAgICAgICAgaWYoICFhdHRycyApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAvLyBNYXliZSBtdWx0aXBsZSBkaXJlY3RpdmUgbmVlZCBzYW1lIHBhcmFtLFxyXG4gICAgICAgICAgLy8gV2UgcGxhY2UgYWxsIHBhcmFtIGluIHRvdGFsUGFyYW1NYXBcclxuICAgICAgICAgIHZhciBsZW4gPSBhdHRycy5sZW5ndGg7XHJcbiAgICAgICAgICBpZighbGVuKSByZXR1cm47XHJcbiAgICAgICAgICB2YXIgZGlyZWN0aXZlcz1bXSwgb3RoZXJBdHRyTWFwID0ge307XHJcbiAgICAgICAgICBmb3IoO2xlbi0tOyl7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXR0ciA9IGF0dHJzWyBsZW4gXTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBASUUgZml4IElFOS0gaW5wdXQgdHlwZSBjYW4ndCBhc3NpZ24gYWZ0ZXIgdmFsdWVcclxuICAgICAgICAgICAgaWYoYXR0ci5uYW1lID09PSAndHlwZScpIGF0dHIucHJpb3JpdHkgPSBNQVhfUFJJT1JJVFkgKyAxO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IENvbXBvbmVudC5kaXJlY3RpdmUoIGF0dHIubmFtZSApO1xyXG4gICAgICAgICAgICBpZiggZGlyZWN0aXZlICkge1xyXG5cclxuICAgICAgICAgICAgICBhdHRyLnByaW9yaXR5ID0gZGlyZWN0aXZlLnByaW9yaXR5IHx8IDE7XHJcbiAgICAgICAgICAgICAgYXR0ci5kaXJlY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGRpcmVjdGl2ZXMucHVzaChhdHRyKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGF0dHIudHlwZSA9PT0gJ2F0dHJpYnV0ZScpe1xyXG4gICAgICAgICAgICAgIG90aGVyQXR0ck1hcFthdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGRpcmVjdGl2ZXMuZm9yRWFjaCggZnVuY3Rpb24oIGF0dHIgKXtcclxuICAgICAgICAgICAgdmFyIGRpcmVjdGl2ZSA9IENvbXBvbmVudC5kaXJlY3RpdmUoYXR0ci5uYW1lKTtcclxuICAgICAgICAgICAgdmFyIHBhcmFtID0gZGlyZWN0aXZlLnBhcmFtO1xyXG4gICAgICAgICAgICBpZihwYXJhbSAmJiBwYXJhbS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgIGF0dHIucGFyYW0gPSB7fTtcclxuICAgICAgICAgICAgICBwYXJhbS5mb3JFYWNoKGZ1bmN0aW9uKCBuYW1lICl7XHJcbiAgICAgICAgICAgICAgICBpZiggbmFtZSBpbiBvdGhlckF0dHJNYXAgKXtcclxuICAgICAgICAgICAgICAgICAgYXR0ci5wYXJhbVtuYW1lXSA9IG90aGVyQXR0ck1hcFtuYW1lXSA9PT0gdW5kZWZpbmVkPyB0cnVlOiBvdGhlckF0dHJNYXBbbmFtZV1cclxuICAgICAgICAgICAgICAgICAgXy5yZW1vdmVPbmUoYXR0cnMsIGZ1bmN0aW9uKGF0dHIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhdHRyLm5hbWUgPT09IG5hbWVcclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBhdHRycy5zb3J0KGZ1bmN0aW9uKGExLCBhMil7XHJcblxyXG4gICAgICAgICAgICB2YXIgcDEgPSBhMS5wcmlvcml0eTtcclxuICAgICAgICAgICAgdmFyIHAyID0gYTIucHJpb3JpdHk7XHJcblxyXG4gICAgICAgICAgICBpZiggcDEgPT0gbnVsbCApIHAxID0gTUFYX1BSSU9SSVRZO1xyXG4gICAgICAgICAgICBpZiggcDIgPT0gbnVsbCApIHAyID0gTUFYX1BSSU9SSVRZO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHAyIC0gcDE7XHJcblxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICB0YWdBU1QudG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfLmZpbmRJdGVtID0gZnVuY3Rpb24obGlzdCwgZmlsdGVyKXtcclxuICAgICAgICAgIGlmKCFsaXN0IHx8ICFsaXN0Lmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgd2hpbGUobGVuLS0pe1xyXG4gICAgICAgICAgICBpZihmaWx0ZXIobGlzdFtsZW5dKSkgcmV0dXJuIGxpc3RbbGVuXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXy5nZXRQYXJhbU9iaiA9IGZ1bmN0aW9uKGNvbXBvbmVudCwgcGFyYW0pe1xyXG4gICAgICAgICAgdmFyIHBhcmFtT2JqID0ge307XHJcbiAgICAgICAgICBpZihwYXJhbSkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gcGFyYW0pIGlmKHBhcmFtLmhhc093blByb3BlcnR5KGkpKXtcclxuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJhbVtpXTtcclxuICAgICAgICAgICAgICBwYXJhbU9ialtpXSA9ICB2YWx1ZSAmJiB2YWx1ZS50eXBlPT09J2V4cHJlc3Npb24nPyBjb21wb25lbnQuJGdldCh2YWx1ZSk6IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcGFyYW1PYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF8uZXZlbnRSZWcgPSAvXm9uLShcXHdbLVxcd10rKSQvO1xyXG5cclxuICAgICAgICBfLnRvVGV4dCA9IGZ1bmN0aW9uKG9iail7XHJcbiAgICAgICAgICByZXR1cm4gb2JqID09IG51bGwgPyBcIlwiOiBcIlwiICsgb2JqO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGhvZ2FuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3aXR0ZXIvaG9nYW4uanNcclxuICAgICAgICAvLyBNSVRcclxuICAgICAgICBfLmVzY2FwZSA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHJBbXAgPSAvJi9nLFxyXG4gICAgICAgICAgICByTHQgPSAvPC9nLFxyXG4gICAgICAgICAgICByR3QgPSAvPi9nLFxyXG4gICAgICAgICAgICByQXBvcyA9IC9cXCcvZyxcclxuICAgICAgICAgICAgclF1b3QgPSAvXFxcIi9nLFxyXG4gICAgICAgICAgICBoQ2hhcnMgPSAvWyY8PlxcXCJcXCddLztcclxuXHJcbiAgICAgICAgICBmdW5jdGlvbiBpZ25vcmVOdWxsVmFsKHZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKCh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT0gbnVsbCkgPyAnJyA6IHZhbCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAgICAgc3RyID0gaWdub3JlTnVsbFZhbChzdHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gaENoYXJzLnRlc3Qoc3RyKSA/XHJcbiAgICAgICAgICAgICAgc3RyXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZShyQW1wLCAnJmFtcDsnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2Uockx0LCAnJmx0OycpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZShyR3QsICcmZ3Q7JylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKHJBcG9zLCAnJiMzOTsnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoclF1b3QsICcmcXVvdDsnKSA6XHJcbiAgICAgICAgICAgICAgc3RyO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KSgpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovfS5jYWxsKGV4cG9ydHMsIChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0oKSksIF9fd2VicGFja19yZXF1aXJlX18oNCkuc2V0SW1tZWRpYXRlKSlcclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiA0ICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihzZXRJbW1lZGlhdGUsIGNsZWFySW1tZWRpYXRlKSB7dmFyIG5leHRUaWNrID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKS5uZXh0VGljaztcclxuICAgICAgICB2YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XHJcbiAgICAgICAgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xyXG4gICAgICAgIHZhciBpbW1lZGlhdGVJZHMgPSB7fTtcclxuICAgICAgICB2YXIgbmV4dEltbWVkaWF0ZUlkID0gMDtcclxuXHJcbiAgICAgICAgLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcclxuXHJcbiAgICAgICAgZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBleHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cclxuICAgICAgICAgIGV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XHJcbiAgICAgICAgICB0aGlzLl9pZCA9IGlkO1xyXG4gICAgICAgICAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgICBUaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxyXG4gICAgICAgIGV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcclxuICAgICAgICAgIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcclxuICAgICAgICAgIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcclxuXHJcbiAgICAgICAgICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcclxuICAgICAgICAgIGlmIChtc2VjcyA+PSAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcclxuICAgICAgICAgICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxyXG4gICAgICAgICAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XHJcbiAgICAgICAgICAgIH0sIG1zZWNzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBUaGF0J3Mgbm90IGhvdyBub2RlLmpzIGltcGxlbWVudHMgaXQgYnV0IHRoZSBleHBvc2VkIGFwaSBpcyB0aGUgc2FtZS5cclxuICAgICAgICBleHBvcnRzLnNldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcclxuICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBmYWxzZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHJcbiAgICAgICAgICBpbW1lZGlhdGVJZHNbaWRdID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBuZXh0VGljayhmdW5jdGlvbiBvbk5leHRUaWNrKCkge1xyXG4gICAgICAgICAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xyXG4gICAgICAgICAgICAgIC8vIGZuLmNhbGwoKSBpcyBmYXN0ZXIgc28gd2Ugb3B0aW1pemUgZm9yIHRoZSBjb21tb24gdXNlLWNhc2VcclxuICAgICAgICAgICAgICAvLyBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2NhbGwtYXBwbHktc2VndVxyXG4gICAgICAgICAgICAgIGlmIChhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChudWxsKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLy8gUHJldmVudCBpZHMgZnJvbSBsZWFraW5nXHJcbiAgICAgICAgICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBleHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpLnNldEltbWVkaWF0ZSwgX193ZWJwYWNrX3JlcXVpcmVfXyg0KS5jbGVhckltbWVkaWF0ZSkpXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogNSAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG4gICAgICAvLyBzaGltIGZvciBlczVcclxuICAgICAgdmFyIHNsaWNlID0gW10uc2xpY2U7XHJcbiAgICAgIHZhciB0c3RyID0gKHt9KS50b1N0cmluZztcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGV4dGVuZChvMSwgbzIgKXtcclxuICAgICAgICBmb3IodmFyIGkgaW4gbzIpIGlmKCBvMVtpXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIG8xW2ldID0gbzJbaV1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG8yO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIFN0cmluZyBwcm90byA7XHJcbiAgICAgICAgZXh0ZW5kKFN0cmluZy5wcm90b3R5cGUsIHtcclxuICAgICAgICAgIHRyaW06IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vIEFycmF5IHByb3RvO1xyXG4gICAgICAgIGV4dGVuZChBcnJheS5wcm90b3R5cGUsIHtcclxuICAgICAgICAgIGluZGV4T2Y6IGZ1bmN0aW9uKG9iaiwgZnJvbSl7XHJcbiAgICAgICAgICAgIGZyb20gPSBmcm9tIHx8IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBmcm9tLCBsZW4gPSB0aGlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXNbaV0gPT09IG9iaikgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIC8vIHBvbHlmaWxsIGZyb20gTUROXHJcbiAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy96aC1DTi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mb3JFYWNoXHJcbiAgICAgICAgICBmb3JFYWNoOiBmdW5jdGlvbihjYWxsYmFjaywgY3R4KXtcclxuICAgICAgICAgICAgdmFyIGsgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gMS4gTGV0IE8gYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIFRvT2JqZWN0IHBhc3NpbmcgdGhlIHx0aGlzfCB2YWx1ZSBhcyB0aGUgYXJndW1lbnQuXHJcbiAgICAgICAgICAgIHZhciBPID0gT2JqZWN0KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlbiA9IE8ubGVuZ3RoID4+PiAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIiApIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCBjYWxsYmFjayArIFwiIGlzIG5vdCBhIGZ1bmN0aW9uXCIgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVuXHJcbiAgICAgICAgICAgIHdoaWxlKCBrIDwgbGVuICkge1xyXG5cclxuICAgICAgICAgICAgICB2YXIga1ZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICBpZiAoIGsgaW4gTyApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBrVmFsdWUgPSBPWyBrIF07XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCggY3R4LCBrVmFsdWUsIGssIE8gKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8gQGRlcHJlY2F0ZWRcclxuICAgICAgICAgIC8vICB3aWxsIGJlIHJlbW92ZWQgYXQgMC41LjBcclxuICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24oZnVuLCBjb250ZXh0KXtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ID0gT2JqZWN0KHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdC5sZW5ndGggPj4+IDA7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZnVuICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWYgKGkgaW4gdClcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChmdW4uY2FsbChjb250ZXh0LCB2YWwsIGksIHQpKVxyXG4gICAgICAgICAgICAgICAgICByZXMucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRnVuY3Rpb24gcHJvdG87XHJcbiAgICAgICAgZXh0ZW5kKEZ1bmN0aW9uLnByb3RvdHlwZSwge1xyXG4gICAgICAgICAgYmluZDogZnVuY3Rpb24oY29udGV4dCl7XHJcbiAgICAgICAgICAgIHZhciBmbiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcmVBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICB2YXIgYXJncyA9IHByZUFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy9ARklYSVRcclxuICAgICAgICAgIF9fYmluZF9fOiBmdW5jdGlvbihjb250ZXh0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5fX2JpbmRpbmdfXyl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19iaW5kaW5nX19cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9fYmluZGluZ19fID0gdGhpcy5iaW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBBcnJheVxyXG4gICAgICAgIGV4dGVuZChBcnJheSwge1xyXG4gICAgICAgICAgaXNBcnJheTogZnVuY3Rpb24oYXJyKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRzdHIuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJyYXldXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogNiAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG4gICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzNTQwNjQvaG93LXRvLWNvbnZlcnQtY2hhcmFjdGVycy10by1odG1sLWVudGl0aWVzLXVzaW5nLXBsYWluLWphdmFzY3JpcHRcclxuICAgICAgdmFyIGVudGl0aWVzID0ge1xyXG4gICAgICAgICdxdW90JzozNCxcclxuICAgICAgICAnYW1wJzozOCxcclxuICAgICAgICAnYXBvcyc6MzksXHJcbiAgICAgICAgJ2x0Jzo2MCxcclxuICAgICAgICAnZ3QnOjYyLFxyXG4gICAgICAgICduYnNwJzoxNjAsXHJcbiAgICAgICAgJ2lleGNsJzoxNjEsXHJcbiAgICAgICAgJ2NlbnQnOjE2MixcclxuICAgICAgICAncG91bmQnOjE2MyxcclxuICAgICAgICAnY3VycmVuJzoxNjQsXHJcbiAgICAgICAgJ3llbic6MTY1LFxyXG4gICAgICAgICdicnZiYXInOjE2NixcclxuICAgICAgICAnc2VjdCc6MTY3LFxyXG4gICAgICAgICd1bWwnOjE2OCxcclxuICAgICAgICAnY29weSc6MTY5LFxyXG4gICAgICAgICdvcmRmJzoxNzAsXHJcbiAgICAgICAgJ2xhcXVvJzoxNzEsXHJcbiAgICAgICAgJ25vdCc6MTcyLFxyXG4gICAgICAgICdzaHknOjE3MyxcclxuICAgICAgICAncmVnJzoxNzQsXHJcbiAgICAgICAgJ21hY3InOjE3NSxcclxuICAgICAgICAnZGVnJzoxNzYsXHJcbiAgICAgICAgJ3BsdXNtbic6MTc3LFxyXG4gICAgICAgICdzdXAyJzoxNzgsXHJcbiAgICAgICAgJ3N1cDMnOjE3OSxcclxuICAgICAgICAnYWN1dGUnOjE4MCxcclxuICAgICAgICAnbWljcm8nOjE4MSxcclxuICAgICAgICAncGFyYSc6MTgyLFxyXG4gICAgICAgICdtaWRkb3QnOjE4MyxcclxuICAgICAgICAnY2VkaWwnOjE4NCxcclxuICAgICAgICAnc3VwMSc6MTg1LFxyXG4gICAgICAgICdvcmRtJzoxODYsXHJcbiAgICAgICAgJ3JhcXVvJzoxODcsXHJcbiAgICAgICAgJ2ZyYWMxNCc6MTg4LFxyXG4gICAgICAgICdmcmFjMTInOjE4OSxcclxuICAgICAgICAnZnJhYzM0JzoxOTAsXHJcbiAgICAgICAgJ2lxdWVzdCc6MTkxLFxyXG4gICAgICAgICdBZ3JhdmUnOjE5MixcclxuICAgICAgICAnQWFjdXRlJzoxOTMsXHJcbiAgICAgICAgJ0FjaXJjJzoxOTQsXHJcbiAgICAgICAgJ0F0aWxkZSc6MTk1LFxyXG4gICAgICAgICdBdW1sJzoxOTYsXHJcbiAgICAgICAgJ0FyaW5nJzoxOTcsXHJcbiAgICAgICAgJ0FFbGlnJzoxOTgsXHJcbiAgICAgICAgJ0NjZWRpbCc6MTk5LFxyXG4gICAgICAgICdFZ3JhdmUnOjIwMCxcclxuICAgICAgICAnRWFjdXRlJzoyMDEsXHJcbiAgICAgICAgJ0VjaXJjJzoyMDIsXHJcbiAgICAgICAgJ0V1bWwnOjIwMyxcclxuICAgICAgICAnSWdyYXZlJzoyMDQsXHJcbiAgICAgICAgJ0lhY3V0ZSc6MjA1LFxyXG4gICAgICAgICdJY2lyYyc6MjA2LFxyXG4gICAgICAgICdJdW1sJzoyMDcsXHJcbiAgICAgICAgJ0VUSCc6MjA4LFxyXG4gICAgICAgICdOdGlsZGUnOjIwOSxcclxuICAgICAgICAnT2dyYXZlJzoyMTAsXHJcbiAgICAgICAgJ09hY3V0ZSc6MjExLFxyXG4gICAgICAgICdPY2lyYyc6MjEyLFxyXG4gICAgICAgICdPdGlsZGUnOjIxMyxcclxuICAgICAgICAnT3VtbCc6MjE0LFxyXG4gICAgICAgICd0aW1lcyc6MjE1LFxyXG4gICAgICAgICdPc2xhc2gnOjIxNixcclxuICAgICAgICAnVWdyYXZlJzoyMTcsXHJcbiAgICAgICAgJ1VhY3V0ZSc6MjE4LFxyXG4gICAgICAgICdVY2lyYyc6MjE5LFxyXG4gICAgICAgICdVdW1sJzoyMjAsXHJcbiAgICAgICAgJ1lhY3V0ZSc6MjIxLFxyXG4gICAgICAgICdUSE9STic6MjIyLFxyXG4gICAgICAgICdzemxpZyc6MjIzLFxyXG4gICAgICAgICdhZ3JhdmUnOjIyNCxcclxuICAgICAgICAnYWFjdXRlJzoyMjUsXHJcbiAgICAgICAgJ2FjaXJjJzoyMjYsXHJcbiAgICAgICAgJ2F0aWxkZSc6MjI3LFxyXG4gICAgICAgICdhdW1sJzoyMjgsXHJcbiAgICAgICAgJ2FyaW5nJzoyMjksXHJcbiAgICAgICAgJ2FlbGlnJzoyMzAsXHJcbiAgICAgICAgJ2NjZWRpbCc6MjMxLFxyXG4gICAgICAgICdlZ3JhdmUnOjIzMixcclxuICAgICAgICAnZWFjdXRlJzoyMzMsXHJcbiAgICAgICAgJ2VjaXJjJzoyMzQsXHJcbiAgICAgICAgJ2V1bWwnOjIzNSxcclxuICAgICAgICAnaWdyYXZlJzoyMzYsXHJcbiAgICAgICAgJ2lhY3V0ZSc6MjM3LFxyXG4gICAgICAgICdpY2lyYyc6MjM4LFxyXG4gICAgICAgICdpdW1sJzoyMzksXHJcbiAgICAgICAgJ2V0aCc6MjQwLFxyXG4gICAgICAgICdudGlsZGUnOjI0MSxcclxuICAgICAgICAnb2dyYXZlJzoyNDIsXHJcbiAgICAgICAgJ29hY3V0ZSc6MjQzLFxyXG4gICAgICAgICdvY2lyYyc6MjQ0LFxyXG4gICAgICAgICdvdGlsZGUnOjI0NSxcclxuICAgICAgICAnb3VtbCc6MjQ2LFxyXG4gICAgICAgICdkaXZpZGUnOjI0NyxcclxuICAgICAgICAnb3NsYXNoJzoyNDgsXHJcbiAgICAgICAgJ3VncmF2ZSc6MjQ5LFxyXG4gICAgICAgICd1YWN1dGUnOjI1MCxcclxuICAgICAgICAndWNpcmMnOjI1MSxcclxuICAgICAgICAndXVtbCc6MjUyLFxyXG4gICAgICAgICd5YWN1dGUnOjI1MyxcclxuICAgICAgICAndGhvcm4nOjI1NCxcclxuICAgICAgICAneXVtbCc6MjU1LFxyXG4gICAgICAgICdmbm9mJzo0MDIsXHJcbiAgICAgICAgJ0FscGhhJzo5MTMsXHJcbiAgICAgICAgJ0JldGEnOjkxNCxcclxuICAgICAgICAnR2FtbWEnOjkxNSxcclxuICAgICAgICAnRGVsdGEnOjkxNixcclxuICAgICAgICAnRXBzaWxvbic6OTE3LFxyXG4gICAgICAgICdaZXRhJzo5MTgsXHJcbiAgICAgICAgJ0V0YSc6OTE5LFxyXG4gICAgICAgICdUaGV0YSc6OTIwLFxyXG4gICAgICAgICdJb3RhJzo5MjEsXHJcbiAgICAgICAgJ0thcHBhJzo5MjIsXHJcbiAgICAgICAgJ0xhbWJkYSc6OTIzLFxyXG4gICAgICAgICdNdSc6OTI0LFxyXG4gICAgICAgICdOdSc6OTI1LFxyXG4gICAgICAgICdYaSc6OTI2LFxyXG4gICAgICAgICdPbWljcm9uJzo5MjcsXHJcbiAgICAgICAgJ1BpJzo5MjgsXHJcbiAgICAgICAgJ1Jobyc6OTI5LFxyXG4gICAgICAgICdTaWdtYSc6OTMxLFxyXG4gICAgICAgICdUYXUnOjkzMixcclxuICAgICAgICAnVXBzaWxvbic6OTMzLFxyXG4gICAgICAgICdQaGknOjkzNCxcclxuICAgICAgICAnQ2hpJzo5MzUsXHJcbiAgICAgICAgJ1BzaSc6OTM2LFxyXG4gICAgICAgICdPbWVnYSc6OTM3LFxyXG4gICAgICAgICdhbHBoYSc6OTQ1LFxyXG4gICAgICAgICdiZXRhJzo5NDYsXHJcbiAgICAgICAgJ2dhbW1hJzo5NDcsXHJcbiAgICAgICAgJ2RlbHRhJzo5NDgsXHJcbiAgICAgICAgJ2Vwc2lsb24nOjk0OSxcclxuICAgICAgICAnemV0YSc6OTUwLFxyXG4gICAgICAgICdldGEnOjk1MSxcclxuICAgICAgICAndGhldGEnOjk1MixcclxuICAgICAgICAnaW90YSc6OTUzLFxyXG4gICAgICAgICdrYXBwYSc6OTU0LFxyXG4gICAgICAgICdsYW1iZGEnOjk1NSxcclxuICAgICAgICAnbXUnOjk1NixcclxuICAgICAgICAnbnUnOjk1NyxcclxuICAgICAgICAneGknOjk1OCxcclxuICAgICAgICAnb21pY3Jvbic6OTU5LFxyXG4gICAgICAgICdwaSc6OTYwLFxyXG4gICAgICAgICdyaG8nOjk2MSxcclxuICAgICAgICAnc2lnbWFmJzo5NjIsXHJcbiAgICAgICAgJ3NpZ21hJzo5NjMsXHJcbiAgICAgICAgJ3RhdSc6OTY0LFxyXG4gICAgICAgICd1cHNpbG9uJzo5NjUsXHJcbiAgICAgICAgJ3BoaSc6OTY2LFxyXG4gICAgICAgICdjaGknOjk2NyxcclxuICAgICAgICAncHNpJzo5NjgsXHJcbiAgICAgICAgJ29tZWdhJzo5NjksXHJcbiAgICAgICAgJ3RoZXRhc3ltJzo5NzcsXHJcbiAgICAgICAgJ3Vwc2loJzo5NzgsXHJcbiAgICAgICAgJ3Bpdic6OTgyLFxyXG4gICAgICAgICdidWxsJzo4MjI2LFxyXG4gICAgICAgICdoZWxsaXAnOjgyMzAsXHJcbiAgICAgICAgJ3ByaW1lJzo4MjQyLFxyXG4gICAgICAgICdQcmltZSc6ODI0MyxcclxuICAgICAgICAnb2xpbmUnOjgyNTQsXHJcbiAgICAgICAgJ2ZyYXNsJzo4MjYwLFxyXG4gICAgICAgICd3ZWllcnAnOjg0NzIsXHJcbiAgICAgICAgJ2ltYWdlJzo4NDY1LFxyXG4gICAgICAgICdyZWFsJzo4NDc2LFxyXG4gICAgICAgICd0cmFkZSc6ODQ4MixcclxuICAgICAgICAnYWxlZnN5bSc6ODUwMSxcclxuICAgICAgICAnbGFycic6ODU5MixcclxuICAgICAgICAndWFycic6ODU5MyxcclxuICAgICAgICAncmFycic6ODU5NCxcclxuICAgICAgICAnZGFycic6ODU5NSxcclxuICAgICAgICAnaGFycic6ODU5NixcclxuICAgICAgICAnY3JhcnInOjg2MjksXHJcbiAgICAgICAgJ2xBcnInOjg2NTYsXHJcbiAgICAgICAgJ3VBcnInOjg2NTcsXHJcbiAgICAgICAgJ3JBcnInOjg2NTgsXHJcbiAgICAgICAgJ2RBcnInOjg2NTksXHJcbiAgICAgICAgJ2hBcnInOjg2NjAsXHJcbiAgICAgICAgJ2ZvcmFsbCc6ODcwNCxcclxuICAgICAgICAncGFydCc6ODcwNixcclxuICAgICAgICAnZXhpc3QnOjg3MDcsXHJcbiAgICAgICAgJ2VtcHR5Jzo4NzA5LFxyXG4gICAgICAgICduYWJsYSc6ODcxMSxcclxuICAgICAgICAnaXNpbic6ODcxMixcclxuICAgICAgICAnbm90aW4nOjg3MTMsXHJcbiAgICAgICAgJ25pJzo4NzE1LFxyXG4gICAgICAgICdwcm9kJzo4NzE5LFxyXG4gICAgICAgICdzdW0nOjg3MjEsXHJcbiAgICAgICAgJ21pbnVzJzo4NzIyLFxyXG4gICAgICAgICdsb3dhc3QnOjg3MjcsXHJcbiAgICAgICAgJ3JhZGljJzo4NzMwLFxyXG4gICAgICAgICdwcm9wJzo4NzMzLFxyXG4gICAgICAgICdpbmZpbic6ODczNCxcclxuICAgICAgICAnYW5nJzo4NzM2LFxyXG4gICAgICAgICdhbmQnOjg3NDMsXHJcbiAgICAgICAgJ29yJzo4NzQ0LFxyXG4gICAgICAgICdjYXAnOjg3NDUsXHJcbiAgICAgICAgJ2N1cCc6ODc0NixcclxuICAgICAgICAnaW50Jzo4NzQ3LFxyXG4gICAgICAgICd0aGVyZTQnOjg3NTYsXHJcbiAgICAgICAgJ3NpbSc6ODc2NCxcclxuICAgICAgICAnY29uZyc6ODc3MyxcclxuICAgICAgICAnYXN5bXAnOjg3NzYsXHJcbiAgICAgICAgJ25lJzo4ODAwLFxyXG4gICAgICAgICdlcXVpdic6ODgwMSxcclxuICAgICAgICAnbGUnOjg4MDQsXHJcbiAgICAgICAgJ2dlJzo4ODA1LFxyXG4gICAgICAgICdzdWInOjg4MzQsXHJcbiAgICAgICAgJ3N1cCc6ODgzNSxcclxuICAgICAgICAnbnN1Yic6ODgzNixcclxuICAgICAgICAnc3ViZSc6ODgzOCxcclxuICAgICAgICAnc3VwZSc6ODgzOSxcclxuICAgICAgICAnb3BsdXMnOjg4NTMsXHJcbiAgICAgICAgJ290aW1lcyc6ODg1NSxcclxuICAgICAgICAncGVycCc6ODg2OSxcclxuICAgICAgICAnc2RvdCc6ODkwMSxcclxuICAgICAgICAnbGNlaWwnOjg5NjgsXHJcbiAgICAgICAgJ3JjZWlsJzo4OTY5LFxyXG4gICAgICAgICdsZmxvb3InOjg5NzAsXHJcbiAgICAgICAgJ3JmbG9vcic6ODk3MSxcclxuICAgICAgICAnbGFuZyc6OTAwMSxcclxuICAgICAgICAncmFuZyc6OTAwMixcclxuICAgICAgICAnbG96Jzo5Njc0LFxyXG4gICAgICAgICdzcGFkZXMnOjk4MjQsXHJcbiAgICAgICAgJ2NsdWJzJzo5ODI3LFxyXG4gICAgICAgICdoZWFydHMnOjk4MjksXHJcbiAgICAgICAgJ2RpYW1zJzo5ODMwLFxyXG4gICAgICAgICdPRWxpZyc6MzM4LFxyXG4gICAgICAgICdvZWxpZyc6MzM5LFxyXG4gICAgICAgICdTY2Fyb24nOjM1MixcclxuICAgICAgICAnc2Nhcm9uJzozNTMsXHJcbiAgICAgICAgJ1l1bWwnOjM3NixcclxuICAgICAgICAnY2lyYyc6NzEwLFxyXG4gICAgICAgICd0aWxkZSc6NzMyLFxyXG4gICAgICAgICdlbnNwJzo4MTk0LFxyXG4gICAgICAgICdlbXNwJzo4MTk1LFxyXG4gICAgICAgICd0aGluc3AnOjgyMDEsXHJcbiAgICAgICAgJ3p3bmonOjgyMDQsXHJcbiAgICAgICAgJ3p3aic6ODIwNSxcclxuICAgICAgICAnbHJtJzo4MjA2LFxyXG4gICAgICAgICdybG0nOjgyMDcsXHJcbiAgICAgICAgJ25kYXNoJzo4MjExLFxyXG4gICAgICAgICdtZGFzaCc6ODIxMixcclxuICAgICAgICAnbHNxdW8nOjgyMTYsXHJcbiAgICAgICAgJ3JzcXVvJzo4MjE3LFxyXG4gICAgICAgICdzYnF1byc6ODIxOCxcclxuICAgICAgICAnbGRxdW8nOjgyMjAsXHJcbiAgICAgICAgJ3JkcXVvJzo4MjIxLFxyXG4gICAgICAgICdiZHF1byc6ODIyMixcclxuICAgICAgICAnZGFnZ2VyJzo4MjI0LFxyXG4gICAgICAgICdEYWdnZXInOjgyMjUsXHJcbiAgICAgICAgJ3Blcm1pbCc6ODI0MCxcclxuICAgICAgICAnbHNhcXVvJzo4MjQ5LFxyXG4gICAgICAgICdyc2FxdW8nOjgyNTAsXHJcbiAgICAgICAgJ2V1cm8nOjgzNjRcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICBtb2R1bGUuZXhwb3J0cyAgPSBlbnRpdGllcztcclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiA3ICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcblxyXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgICAgICAnQkVHSU4nOiAneycsXHJcbiAgICAgICAgJ0VORCc6ICd9JyxcclxuICAgICAgICAnUFJFQ09NUElMRSc6IGZhbHNlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiA4ICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiByZW5kZXIgZm9yIGNvbXBvbmVudCBpbiBicm93c2Vyc1xyXG4gICAgICAgKi9cclxuXHJcbiAgICAgIHZhciBlbnYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xyXG4gICAgICB2YXIgTGV4ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xyXG4gICAgICB2YXIgUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XHJcbiAgICAgIHZhciBjb25maWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xyXG4gICAgICB2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XHJcbiAgICAgIHZhciBleHRlbmQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcclxuICAgICAgdmFyIHNoYXJlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xyXG4gICAgICB2YXIgY29tYmluZSA9IHt9O1xyXG4gICAgICBpZihlbnYuYnJvd3Nlcil7XHJcbiAgICAgICAgdmFyIGRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xyXG4gICAgICAgIHZhciB3YWxrZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XHJcbiAgICAgICAgdmFyIEdyb3VwID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XHJcbiAgICAgICAgdmFyIGRvYyA9IGRvbS5kb2M7XHJcbiAgICAgICAgY29tYmluZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBldmVudHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcclxuICAgICAgdmFyIFdhdGNoZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcclxuICAgICAgdmFyIHBhcnNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XHJcbiAgICAgIHZhciBmaWx0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcclxuICAgICAgdmFyIEVSUk9SID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNikuRVJST1I7XHJcbiAgICAgIHZhciBub2RlQ3Vyc29yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7XHJcbiAgICAgIHZhciBzaGFyZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcclxuICAgICAgdmFyIE5PT1AgPSBmdW5jdGlvbigpe307XHJcblxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIGBSZWd1bGFyYCBpcyByZWd1bGFyanMncyBOYW1lU3BhY2UgYW5kIEJhc2VDbGFzcy4gRXZlcnkgQ29tcG9uZW50IGlzIGluaGVyaXRlZCBmcm9tIGl0XHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBjbGFzcyBSZWd1bGFyXHJcbiAgICAgICAqIEBtb2R1bGUgUmVndWxhclxyXG4gICAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgc3BlY2lmaWNhdGlvbiBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAgICAqL1xyXG4gICAgICB2YXIgUmVndWxhciA9IGZ1bmN0aW9uKGRlZmluaXRpb24sIG9wdGlvbnMpe1xyXG4gICAgICAgIHZhciBwcmV2UnVubmluZyA9IGVudi5pc1J1bm5pbmc7XHJcbiAgICAgICAgZW52LmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdmFyIG5vZGUsIHRlbXBsYXRlLCBjdXJzb3IsIGNvbnRleHQgPSB0aGlzLCBib2R5LCBtb3VudE5vZGU7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24gfHwge307XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIGR0ZW1wbGF0ZSA9IGRlZmluaXRpb24udGVtcGxhdGU7XHJcblxyXG4gICAgICAgIGlmKGVudi5icm93c2VyKSB7XHJcblxyXG4gICAgICAgICAgaWYoIG5vZGUgPSB0cnlHZXRTZWxlY3RvciggZHRlbXBsYXRlICkgKXtcclxuICAgICAgICAgICAgZHRlbXBsYXRlID0gbm9kZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCBkdGVtcGxhdGUgJiYgZHRlbXBsYXRlLm5vZGVUeXBlICl7XHJcbiAgICAgICAgICAgIGRlZmluaXRpb24udGVtcGxhdGUgPSBkdGVtcGxhdGUuaW5uZXJIVE1MXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbW91bnROb2RlID0gZGVmaW5pdGlvbi5tb3VudE5vZGU7XHJcbiAgICAgICAgICBpZih0eXBlb2YgbW91bnROb2RlID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgIG1vdW50Tm9kZSA9IGRvbS5maW5kKCBtb3VudE5vZGUgKTtcclxuICAgICAgICAgICAgaWYoIW1vdW50Tm9kZSkgdGhyb3cgRXJyb3IoJ21vdW50Tm9kZSAnICsgbW91bnROb2RlICsgJyBpcyBub3QgZm91bmQnKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKG1vdW50Tm9kZSl7XHJcbiAgICAgICAgICAgIGN1cnNvciA9IG5vZGVDdXJzb3IobW91bnROb2RlLmZpcnN0Q2hpbGQpXHJcbiAgICAgICAgICAgIGRlbGV0ZSBkZWZpbml0aW9uLm1vdW50Tm9kZVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGN1cnNvciA9IG9wdGlvbnMuY3Vyc29yXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHRlbXBsYXRlID0gc2hhcmVkLmluaXREZWZpbml0aW9uKGNvbnRleHQsIGRlZmluaXRpb24pXHJcblxyXG5cclxuICAgICAgICBpZihjb250ZXh0LiRwYXJlbnQpe1xyXG4gICAgICAgICAgY29udGV4dC4kcGFyZW50Ll9hcHBlbmQoY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHQuX2NoaWxkcmVuID0gW107XHJcbiAgICAgICAgY29udGV4dC4kcmVmcyA9IHt9O1xyXG4gICAgICAgIGNvbnRleHQuJHJvb3QgPSBjb250ZXh0LiRyb290IHx8IGNvbnRleHQ7XHJcblxyXG4gICAgICAgIHZhciBleHRyYSA9IG9wdGlvbnMuZXh0cmE7XHJcbiAgICAgICAgdmFyIG9sZE1vZGlmeSA9IGV4dHJhICYmIGV4dHJhLiQkbW9kaWZ5O1xyXG5cclxuXHJcbiAgICAgICAgdmFyIG5ld0V4dHJhO1xyXG4gICAgICAgIGlmKCBib2R5ID0gY29udGV4dC5fYm9keSApe1xyXG4gICAgICAgICAgY29udGV4dC5fYm9keSA9IG51bGxcclxuICAgICAgICAgIHZhciBtb2RpZnlCb2R5Q29tcG9uZW50ID0gY29udGV4dC5tb2RpZnlCb2R5Q29tcG9uZW50O1xyXG4gICAgICAgICAgaWYoIHR5cGVvZiBtb2RpZnlCb2R5Q29tcG9uZW50ICA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgIG1vZGlmeUJvZHlDb21wb25lbnQgPSBtb2RpZnlCb2R5Q29tcG9uZW50LmJpbmQodGhpcylcclxuICAgICAgICAgICAgbmV3RXh0cmEgPSBfLmNyZWF0ZU9iamVjdChleHRyYSk7XHJcbiAgICAgICAgICAgIG5ld0V4dHJhLiQkbW9kaWZ5ID0gZnVuY3Rpb24oIGNvbXAgKXtcclxuICAgICAgICAgICAgICByZXR1cm4gbW9kaWZ5Qm9keUNvbXBvbmVudChjb21wLCBvbGRNb2RpZnk/IG9sZE1vZGlmeTogTk9PUClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7IC8vQEZJWElUOiBtdWx0aXBseSBtb2RpZmllclxyXG4gICAgICAgICAgICBuZXdFeHRyYSA9IGV4dHJhXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihib2R5LmFzdCAmJiBib2R5LmFzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjb250ZXh0LiRib2R5ID0gXy5nZXRDb21waWxlRm4oYm9keS5hc3QsIGJvZHkuY3R4ICwge1xyXG4gICAgICAgICAgICAgIG91dGVyOiBjb250ZXh0LFxyXG4gICAgICAgICAgICAgIG5hbWVzcGFjZTogb3B0aW9ucy5uYW1lc3BhY2UsXHJcbiAgICAgICAgICAgICAgZXh0cmE6IG5ld0V4dHJhLFxyXG4gICAgICAgICAgICAgIHJlY29yZDogdHJ1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaGFuZGxlIGNvbXB1dGVkXHJcbiAgICAgICAgaWYodGVtcGxhdGUpe1xyXG4gICAgICAgICAgdmFyIGNwbE9wdCA9IHtcclxuICAgICAgICAgICAgbmFtZXNwYWNlOiBvcHRpb25zLm5hbWVzcGFjZSxcclxuICAgICAgICAgICAgY3Vyc29yOiBjdXJzb3JcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIGlmKGV4dHJhICYmIGV4dHJhLiQkbW9kaWZ5KXtcclxuICAgICAgICAgIGNwbE9wdC5leHRyYSA9IHskJG1vZGlmeSA6IGV4dHJhJiYgZXh0cmEuJCRtb2RpZnl9XHJcbiAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICBjb250ZXh0Lmdyb3VwID0gY29udGV4dC4kY29tcGlsZSh0ZW1wbGF0ZSwgY3BsT3B0KTtcclxuICAgICAgICAgIGNvbWJpbmUubm9kZShjb250ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gbW9kaWZ55ZyoY29tcGlsZeS5i+WQjuiwg+eUqO+8jCDov5nmoLflsLHml6DpnIDlpITnkIZTU1Lnm7jlhbPpgLvovpFcclxuXHJcbiAgICAgICAgaWYoIG9sZE1vZGlmeSApe1xyXG4gICAgICAgICAgb2xkTW9kaWZ5KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdGhpcyBpcyBvdXRlc3QgY29tcG9uZW50XHJcbiAgICAgICAgaWYoICFjb250ZXh0LiRwYXJlbnQgKSBjb250ZXh0LiR1cGRhdGUoKTtcclxuICAgICAgICBjb250ZXh0LiRyZWFkeSA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnRleHQuJGVtaXQoXCIkaW5pdFwiKTtcclxuICAgICAgICBpZiggY29udGV4dC5pbml0ICkgY29udGV4dC5pbml0KCBjb250ZXh0LmRhdGEgKTtcclxuICAgICAgICBjb250ZXh0LiRlbWl0KFwiJGFmdGVySW5pdFwiKTtcclxuXHJcbiAgICAgICAgZW52LmlzUnVubmluZyA9IHByZXZSdW5uaW5nO1xyXG5cclxuICAgICAgICAvLyBjaGlsZHJlbiBpcyBub3QgcmVxdWlyZWQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRldnRvb2xzKSB7XHJcbiAgICAgICAgICB0aGlzLmRldnRvb2xzLmVtaXQoXCJpbml0XCIsIHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiByZWd1bGFyIGRldnRvb2xzIGhvb2sgZXhpc3RzXHJcbiAgICAgIGlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICB2YXIgZGV2dG9vbHMgPSB3aW5kb3cuX19SRUdVTEFSX0RFVlRPT0xTX0dMT0JBTF9IT09LX187XHJcbiAgICAgICAgaWYgKGRldnRvb2xzKSB7XHJcbiAgICAgICAgICBSZWd1bGFyLnByb3RvdHlwZS5kZXZ0b29scyA9IGRldnRvb2xzO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgd2Fsa2VycyAmJiAod2Fsa2Vycy5SZWd1bGFyID0gUmVndWxhcik7XHJcblxyXG5cclxuICAgICAgLy8gZGVzY3JpcHRpb25cclxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAvLyAxLiBSZWd1bGFyIGFuZCBkZXJpdmVkIENsYXNzIHVzZSBzYW1lIGZpbHRlclxyXG4gICAgICBfLmV4dGVuZChSZWd1bGFyLCB7XHJcbiAgICAgICAgLy8gcHJpdmF0ZSBkYXRhIHN0dWZmXHJcbiAgICAgICAgX2RpcmVjdGl2ZXM6IHsgX19yZWdleHBfXzpbXSB9LFxyXG4gICAgICAgIF9wbHVnaW5zOiB7fSxcclxuICAgICAgICBfcHJvdG9Jbmhlcml0Q2FjaGU6IFsgJ2RpcmVjdGl2ZScsICd1c2UnXSAsXHJcbiAgICAgICAgX19hZnRlcl9fOiBmdW5jdGlvbihzdXByLCBvKSB7XHJcblxyXG4gICAgICAgICAgdmFyIHRlbXBsYXRlO1xyXG4gICAgICAgICAgdGhpcy5fX2FmdGVyX18gPSBzdXByLl9fYWZ0ZXJfXztcclxuXHJcbiAgICAgICAgICAvLyB1c2UgbmFtZSBtYWtlIHRoZSBjb21wb25lbnQgZ2xvYmFsLlxyXG4gICAgICAgICAgaWYoby5uYW1lKSBSZWd1bGFyLmNvbXBvbmVudChvLm5hbWUsIHRoaXMpO1xyXG4gICAgICAgICAgLy8gdGhpcy5wcm90b3R5cGUudGVtcGxhdGUgPSBkb20uaW5pdFRlbXBsYXRlKG8pXHJcbiAgICAgICAgICBpZih0ZW1wbGF0ZSA9IG8udGVtcGxhdGUpe1xyXG4gICAgICAgICAgICB2YXIgbm9kZSwgbmFtZTtcclxuICAgICAgICAgICAgaWYoIGVudi5icm93c2VyICl7XHJcbiAgICAgICAgICAgICAgaWYoIG5vZGUgPSB0cnlHZXRTZWxlY3Rvcih0ZW1wbGF0ZSkgKSB0ZW1wbGF0ZSA9IG5vZGUgO1xyXG4gICAgICAgICAgICAgIGlmKCB0ZW1wbGF0ZSAmJiB0ZW1wbGF0ZS5ub2RlVHlwZSApe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPSBkb20uYXR0cih0ZW1wbGF0ZSwgJ25hbWUnKSkgUmVndWxhci5jb21wb25lbnQobmFtZSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YgdGVtcGxhdGUgPT09ICdzdHJpbmcnICl7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm90b3R5cGUudGVtcGxhdGUgPSBjb25maWcuUFJFQ09NUElMRT8gbmV3IFBhcnNlcih0ZW1wbGF0ZSkucGFyc2UoKTogdGVtcGxhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZihvLmNvbXB1dGVkKSB0aGlzLnByb3RvdHlwZS5jb21wdXRlZCA9IHNoYXJlZC5oYW5kbGVDb21wdXRlZChvLmNvbXB1dGVkKTtcclxuICAgICAgICAgIC8vIGluaGVyaXQgZGlyZWN0aXZlIGFuZCBvdGhlciBjb25maWcgZnJvbSBzdXByXHJcbiAgICAgICAgICBSZWd1bGFyLl9pbmhlcml0Q29uZmlnKHRoaXMsIHN1cHIpO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluZSBhIGRpcmVjdGl2ZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1ldGhvZCBkaXJlY3RpdmVcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IENvcHkgb2YgLi4uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGlyZWN0aXZlOiBmdW5jdGlvbihuYW1lLCBjZmcpe1xyXG4gICAgICAgICAgaWYoIW5hbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBuYW1lO1xyXG4gICAgICAgICAgaWYodHlwZSA9PT0gJ29iamVjdCcgJiYgIWNmZyl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgayBpbiBuYW1lKXtcclxuICAgICAgICAgICAgICBpZihuYW1lLmhhc093blByb3BlcnR5KGspKSB0aGlzLmRpcmVjdGl2ZShrLCBuYW1lW2tdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBkaXJlY3RpdmVzID0gdGhpcy5fZGlyZWN0aXZlcywgZGlyZWN0aXZlO1xyXG4gICAgICAgICAgaWYoY2ZnID09IG51bGwpe1xyXG4gICAgICAgICAgICBpZiggdHlwZSA9PT0gJ3N0cmluZycgKXtcclxuICAgICAgICAgICAgICBpZihkaXJlY3RpdmUgPSBkaXJlY3RpdmVzW25hbWVdKSByZXR1cm4gZGlyZWN0aXZlO1xyXG4gICAgICAgICAgICAgIGVsc2V7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4cCA9IGRpcmVjdGl2ZXMuX19yZWdleHBfXztcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHJlZ2V4cC5sZW5ndGg7IGkgPCBsZW4gOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICBkaXJlY3RpdmUgPSByZWdleHBbaV07XHJcbiAgICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gZGlyZWN0aXZlLnJlZ2V4cC50ZXN0KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICBpZih0ZXN0KSByZXR1cm4gZGlyZWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKCB0eXBlb2YgY2ZnID09PSAnZnVuY3Rpb24nKSBjZmcgPSB7IGxpbms6IGNmZyB9XHJcbiAgICAgICAgICAgIGlmKCB0eXBlID09PSAnc3RyaW5nJyApIGRpcmVjdGl2ZXNbbmFtZV0gPSBjZmc7XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgY2ZnLnJlZ2V4cCA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aXZlcy5fX3JlZ2V4cF9fLnB1c2goY2ZnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbHVnaW46IGZ1bmN0aW9uKG5hbWUsIGZuKXtcclxuICAgICAgICAgIHZhciBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcclxuICAgICAgICAgIGlmKGZuID09IG51bGwpIHJldHVybiBwbHVnaW5zW25hbWVdO1xyXG4gICAgICAgICAgcGx1Z2luc1tuYW1lXSA9IGZuO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1c2U6IGZ1bmN0aW9uKGZuKXtcclxuICAgICAgICAgIGlmKHR5cGVvZiBmbiA9PT0gXCJzdHJpbmdcIikgZm4gPSBSZWd1bGFyLnBsdWdpbihmbik7XHJcbiAgICAgICAgICBpZih0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICBmbih0aGlzLCBSZWd1bGFyKTtcclxuICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gY29uZmlnIHRoZSBSZWd1bGFyanMncyBnbG9iYWxcclxuICAgICAgICBjb25maWc6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKXtcclxuICAgICAgICAgIHZhciBuZWVkR2VuTGV4ZXIgPSBmYWxzZTtcclxuICAgICAgICAgIGlmKHR5cGVvZiBuYW1lID09PSBcIm9iamVjdFwiKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpIGluIG5hbWUpe1xyXG4gICAgICAgICAgICAgIC8vIGlmIHlvdSBjb25maWdcclxuICAgICAgICAgICAgICBpZiggaSA9PT1cIkVORFwiIHx8IGk9PT0nQkVHSU4nICkgIG5lZWRHZW5MZXhlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgY29uZmlnW2ldID0gbmFtZVtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYobmVlZEdlbkxleGVyKSBMZXhlci5zZXR1cCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXhwcmVzc2lvbjogcGFyc2UuZXhwcmVzc2lvbixcclxuICAgICAgICBQYXJzZXI6IFBhcnNlcixcclxuICAgICAgICBMZXhlcjogTGV4ZXIsXHJcbiAgICAgICAgX2FkZFByb3RvSW5oZXJpdENhY2hlOiBmdW5jdGlvbihuYW1lLCB0cmFuc2Zvcm0pe1xyXG4gICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoIG5hbWUgKSApe1xyXG4gICAgICAgICAgICByZXR1cm4gbmFtZS5mb3JFYWNoKFJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBjYWNoZUtleSA9IFwiX1wiICsgbmFtZSArIFwic1wiXHJcbiAgICAgICAgICBSZWd1bGFyLl9wcm90b0luaGVyaXRDYWNoZS5wdXNoKG5hbWUpXHJcbiAgICAgICAgICBSZWd1bGFyW2NhY2hlS2V5XSA9IHt9O1xyXG4gICAgICAgICAgaWYoUmVndWxhcltuYW1lXSkgcmV0dXJuO1xyXG4gICAgICAgICAgUmVndWxhcltuYW1lXSA9IGZ1bmN0aW9uKGtleSwgY2ZnKXtcclxuICAgICAgICAgICAgdmFyIGNhY2hlID0gdGhpc1tjYWNoZUtleV07XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiKXtcclxuICAgICAgICAgICAgICBmb3IodmFyIGkgaW4ga2V5KXtcclxuICAgICAgICAgICAgICAgIGlmKGtleS5oYXNPd25Qcm9wZXJ0eShpKSkgdGhpc1tuYW1lXShpLCBrZXlbaV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjZmcgPT0gbnVsbCkgcmV0dXJuIGNhY2hlW2tleV07XHJcbiAgICAgICAgICAgIGNhY2hlW2tleV0gPSB0cmFuc2Zvcm0/IHRyYW5zZm9ybShjZmcpIDogY2ZnO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIF9pbmhlcml0Q29uZmlnOiBmdW5jdGlvbihzZWxmLCBzdXByKXtcclxuXHJcbiAgICAgICAgICAvLyBwcm90b3R5cGUgaW5oZXJpdCBzb21lIFJlZ3VsYXIgcHJvcGVydHlcclxuICAgICAgICAgIC8vIHNvIGV2ZXJ5IENvbXBvbmVudCB3aWxsIGhhdmUgb3duIGNvbnRhaW5lciB0byBzZXJ2ZSBkaXJlY3RpdmUsIGZpbHRlciBldGMuLlxyXG4gICAgICAgICAgdmFyIGRlZnMgPSBSZWd1bGFyLl9wcm90b0luaGVyaXRDYWNoZTtcclxuICAgICAgICAgIHZhciBrZXlzID0gXy5zbGljZShkZWZzKTtcclxuICAgICAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgICAgICBzZWxmW2tleV0gPSBzdXByW2tleV07XHJcbiAgICAgICAgICAgIHZhciBjYWNoZUtleSA9ICdfJyArIGtleSArICdzJztcclxuICAgICAgICAgICAgaWYoc3VwcltjYWNoZUtleV0pIHNlbGZbY2FjaGVLZXldID0gXy5jcmVhdGVPYmplY3Qoc3VwcltjYWNoZUtleV0pO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZXh0ZW5kKFJlZ3VsYXIpO1xyXG5cclxuICAgICAgUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUoXCJjb21wb25lbnRcIilcclxuXHJcbiAgICAgIFJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiZmlsdGVyXCIsIGZ1bmN0aW9uKGNmZyl7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjZmcgPT09IFwiZnVuY3Rpb25cIj8ge2dldDogY2ZnfTogY2ZnO1xyXG4gICAgICB9KVxyXG5cclxuXHJcbiAgICAgIGV2ZW50cy5taXhUbyhSZWd1bGFyKTtcclxuICAgICAgV2F0Y2hlci5taXhUbyhSZWd1bGFyKTtcclxuXHJcbiAgICAgIFJlZ3VsYXIuaW1wbGVtZW50KHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpe30sXHJcbiAgICAgICAgY29uZmlnOiBmdW5jdGlvbigpe30sXHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIC8vIGRlc3Ryb3kgZXZlbnQgd29udCBwcm9wZ2F0aW9uO1xyXG4gICAgICAgICAgdGhpcy4kZW1pdChcIiRkZXN0cm95XCIpO1xyXG4gICAgICAgICAgdGhpcy5fd2F0Y2hlcnMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5fd2F0Y2hlcnNGb3JTdGFibGUgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy5ncm91cCAmJiB0aGlzLmdyb3VwLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLmdyb3VwID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMucGFyZW50Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IG51bGw7XHJcbiAgICAgICAgICB0aGlzLiRyb290ID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuX2hhbmRsZXMgPSBudWxsO1xyXG4gICAgICAgICAgdGhpcy4kcmVmcyA9IG51bGw7XHJcbiAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy4kcGFyZW50O1xyXG4gICAgICAgICAgaWYocGFyZW50ICYmIHBhcmVudC5fY2hpbGRyZW4pe1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcyk7XHJcbiAgICAgICAgICAgIHBhcmVudC5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy4kcGFyZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5kZXZ0b29scykge1xyXG4gICAgICAgICAgICB0aGlzLmRldnRvb2xzLmVtaXQoXCJkZXN0cm95XCIsIHRoaXMpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLl9oYW5kbGVzID0gbnVsbDtcclxuICAgICAgICAgIHRoaXMuJHBoYXNlID0gXCJkZXN0cm95ZWRcIjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjb21waWxlIGEgYmxvY2sgYXN0IDsgcmV0dXJuIGEgZ3JvdXA7XHJcbiAgICAgICAgICogQHBhcmFtICB7QXJyYXl9IHBhcnNlZCBhc3RcclxuICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IHJlY29yZFxyXG4gICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICAkY29tcGlsZTogZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcclxuICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgICAgaWYodHlwZW9mIGFzdCA9PT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICBhc3QgPSBuZXcgUGFyc2VyKGFzdCkucGFyc2UoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIHByZUV4dCA9IHRoaXMuX19leHRfXyxcclxuICAgICAgICAgICAgcmVjb3JkID0gb3B0aW9ucy5yZWNvcmQsXHJcbiAgICAgICAgICAgIHJlY29yZHM7XHJcblxyXG4gICAgICAgICAgaWYob3B0aW9ucy5leHRyYSkgdGhpcy5fX2V4dF9fID0gb3B0aW9ucy5leHRyYTtcclxuXHJcblxyXG4gICAgICAgICAgaWYocmVjb3JkKSB0aGlzLl9yZWNvcmQoKTtcclxuICAgICAgICAgIHZhciBncm91cCA9IHRoaXMuX3dhbGsoYXN0LCBvcHRpb25zKTtcclxuICAgICAgICAgIGlmKHJlY29yZCl7XHJcbiAgICAgICAgICAgIHJlY29yZHMgPSB0aGlzLl9yZWxlYXNlKCk7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYoIHJlY29yZHMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgICAgLy8gYXV0byBkZXN0cm95IGFsbCB3YXRoZXI7XHJcbiAgICAgICAgICAgICAgZ3JvdXAub25kZXN0cm95ID0gZnVuY3Rpb24oKXsgc2VsZi4kdW53YXRjaChyZWNvcmRzKTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihvcHRpb25zLmV4dHJhKSB0aGlzLl9fZXh0X18gPSBwcmVFeHQ7XHJcbiAgICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGNyZWF0ZSB0d28td2F5IGJpbmRpbmcgd2l0aCBhbm90aGVyIGNvbXBvbmVudDtcclxuICAgICAgICAgKiAqd2Fybio6XHJcbiAgICAgICAgICogICBleHByMSBhbmQgZXhwcjIgbXVzdCBjYW4gb3BlcmF0ZSBzZXQmZ2V0LCBmb3IgZXhhbXBsZTogdGhlICdhLmInIG9yICdhW2IgKyAxXScgaXMgc2V0LWFibGUsIGJ1dCAnYS5iICsgMScgaXMgbm90LFxyXG4gICAgICAgICAqICAgYmVhY3VzZSBSZWd1bGFyIGRvbnQga25vdyBob3cgdG8gaW52ZXJzZSBzZXQgdGhyb3VnaCB0aGUgZXhwcmVzc2lvbjtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgaWYgYmVmb3JlICRiaW5kLCB0d28gY29tcG9uZW50J3Mgc3RhdGUgaXMgbm90IHN5bmMsIHRoZSBjb21wb25lbnQocGFzc2VkIHBhcmFtKSB3aWxsIHN5bmMgd2l0aCB0aGUgY2FsbGVkIGNvbXBvbmVudDtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICpleGFtcGxlOiAqXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBgYGBqYXZhc2NyaXB0XHJcbiAgICAgICAgICogLy8gaW4gdGhpcyBleGFtcGxlLCB3ZSBuZWVkIHRvIGxpbmsgdHdvIHBhZ2VyIGNvbXBvbmVudFxyXG4gICAgICAgICAqIHZhciBwYWdlciA9IG5ldyBQYWdlcih7fSkgLy8gcGFnZXIgY29tcG9lbm50XHJcbiAgICAgICAgICogdmFyIHBhZ2VyMiA9IG5ldyBQYWdlcih7fSkgLy8gYW5vdGhlciBwYWdlciBjb21wb25lbnRcclxuICAgICAgICAgKiBwYWdlci4kYmluZChwYWdlcjIsICdjdXJyZW50Jyk7IC8vIHR3byB3YXkgYmluZCB0aHJvdyB0d28gY29tcG9uZW50XHJcbiAgICAgICAgICogcGFnZXIuJGJpbmQocGFnZXIyLCAndG90YWwnKTsgICAvL1xyXG4gICAgICAgICAqIC8vIG9yIGp1c3RcclxuICAgICAgICAgKiBwYWdlci4kYmluZChwYWdlcjIsIHtcImN1cnJlbnRcIjogXCJjdXJyZW50XCIsIFwidG90YWxcIjogXCJ0b3RhbFwifSlcclxuICAgICAgICAgKiBgYGBcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSAge1JlZ3VsYXJ9IGNvbXBvbmVudCB0aGVcclxuICAgICAgICAgKiBAcGFyYW0gIHtTdHJpbmd8RXhwcmVzc2lvbn0gZXhwcjEgICAgIHJlcXVpcmVkLCBzZWxmIGV4cHIxIHRvIG9wZXJhdGUgYmluZGluZ1xyXG4gICAgICAgICAqIEBwYXJhbSAge1N0cmluZ3xFeHByZXNzaW9ufSBleHByMiAgICAgb3B0aW9uYWwsIG90aGVyIGNvbXBvbmVudCdzIGV4cHIgdG8gYmluZCB3aXRoLCBpZiBub3QgcGFzc2VkLCB0aGUgZXhwcjIgd2lsbCB1c2UgdGhlIGV4cHIxO1xyXG4gICAgICAgICAqIEByZXR1cm4gICAgICAgICAgdGhpcztcclxuICAgICAgICAgKi9cclxuICAgICAgICAkYmluZDogZnVuY3Rpb24oY29tcG9uZW50LCBleHByMSwgZXhwcjIpe1xyXG4gICAgICAgICAgdmFyIHR5cGUgPSBfLnR5cGVPZihleHByMSk7XHJcbiAgICAgICAgICBpZiggZXhwcjEudHlwZSA9PT0gJ2V4cHJlc3Npb24nIHx8IHR5cGUgPT09ICdzdHJpbmcnICl7XHJcbiAgICAgICAgICAgIHRoaXMuX2JpbmQoY29tcG9uZW50LCBleHByMSwgZXhwcjIpXHJcbiAgICAgICAgICB9ZWxzZSBpZiggdHlwZSA9PT0gXCJhcnJheVwiICl7IC8vIG11bHRpcGx5IHNhbWUgcGF0aCBiaW5kaW5nIHRocm91Z2ggYXJyYXlcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gZXhwcjEubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xyXG4gICAgICAgICAgICAgIHRoaXMuX2JpbmQoY29tcG9uZW50LCBleHByMVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1lbHNlIGlmKHR5cGUgPT09IFwib2JqZWN0XCIpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gZXhwcjEpIGlmKGV4cHIxLmhhc093blByb3BlcnR5KGkpKXtcclxuICAgICAgICAgICAgICB0aGlzLl9iaW5kKGNvbXBvbmVudCwgaSwgZXhwcjFbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBkaWdlc3RcclxuICAgICAgICAgIGNvbXBvbmVudC4kdXBkYXRlKCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHVuYmluZCBvbmUgY29tcG9uZW50KCBzZWUgJGJpbmQgYWxzbylcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIHVuYmluZCB3aWxsIHVuYmluZCBhbGwgcmVsYXRpb24gYmV0d2VlbiB0d28gY29tcG9uZW50XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gIHtSZWd1bGFyfSBjb21wb25lbnQgW2Rlc2NyaXB0aW9uZWd1bGFyXHJcbiAgICAgICAgICogQHJldHVybiB7VGhpc30gICAgdGhpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgICR1bmJpbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAvLyB0b2RvXHJcbiAgICAgICAgfSxcclxuICAgICAgICAkaW5qZWN0OiBjb21iaW5lLmluamVjdCxcclxuICAgICAgICAkbXV0ZTogZnVuY3Rpb24oaXNNdXRlKXtcclxuXHJcbiAgICAgICAgICBpc011dGUgPSAhIWlzTXV0ZTtcclxuXHJcbiAgICAgICAgICB2YXIgbmVlZHVwZGF0ZSA9IGlzTXV0ZSA9PT0gZmFsc2UgJiYgdGhpcy5fbXV0ZTtcclxuXHJcbiAgICAgICAgICB0aGlzLl9tdXRlID0gISFpc011dGU7XHJcblxyXG4gICAgICAgICAgaWYobmVlZHVwZGF0ZSkgdGhpcy4kdXBkYXRlKCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHByaXZhdGUgYmluZCBsb2dpY1xyXG4gICAgICAgIF9iaW5kOiBmdW5jdGlvbihjb21wb25lbnQsIGV4cHIxLCBleHByMil7XHJcblxyXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgLy8gYmFzaWMgYmluZGluZ1xyXG5cclxuICAgICAgICAgIGlmKCFjb21wb25lbnQgfHwgIShjb21wb25lbnQgaW5zdGFuY2VvZiBSZWd1bGFyKSkgdGhyb3cgXCIkYmluZCgpIHNob3VsZCBwYXNzIFJlZ3VsYXIgY29tcG9uZW50IGFzIGZpcnN0IGFyZ3VtZW50XCI7XHJcbiAgICAgICAgICBpZighZXhwcjEpIHRocm93IFwiJGJpbmQoKSBzaG91bGQgIHBhc3MgYXMgbGVhc3Qgb25lIGV4cHJlc3Npb24gdG8gYmluZFwiO1xyXG5cclxuICAgICAgICAgIGlmKCFleHByMikgZXhwcjIgPSBleHByMTtcclxuXHJcbiAgICAgICAgICBleHByMSA9IHBhcnNlLmV4cHJlc3Npb24oIGV4cHIxICk7XHJcbiAgICAgICAgICBleHByMiA9IHBhcnNlLmV4cHJlc3Npb24oIGV4cHIyICk7XHJcblxyXG4gICAgICAgICAgLy8gc2V0IGlzIG5lZWQgdG8gb3BlcmF0ZSBzZXR0aW5nIDtcclxuICAgICAgICAgIGlmKGV4cHIyLnNldCl7XHJcbiAgICAgICAgICAgIHZhciB3aWQxID0gdGhpcy4kd2F0Y2goIGV4cHIxLCBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgY29tcG9uZW50LiR1cGRhdGUoZXhwcjIsIHZhbHVlKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29tcG9uZW50LiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIHNlbGYuJHVud2F0Y2god2lkMSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGV4cHIxLnNldCl7XHJcbiAgICAgICAgICAgIHZhciB3aWQyID0gY29tcG9uZW50LiR3YXRjaChleHByMiwgZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgICAgICAgICAgIHNlbGYuJHVwZGF0ZShleHByMSwgdmFsdWUpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyB3aGVuIGJyb3RoZXIgZGVzdHJveSwgd2UgdW5saW5rIHRoaXMgd2F0Y2hlclxyXG4gICAgICAgICAgICB0aGlzLiRvbignJGRlc3Ryb3knLCBjb21wb25lbnQuJHVud2F0Y2guYmluZChjb21wb25lbnQsd2lkMikpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBzeW5jIHRoZSBjb21wb25lbnQncyBzdGF0ZSB0byBjYWxsZWQncyBzdGF0ZVxyXG4gICAgICAgICAgZXhwcjIuc2V0KGNvbXBvbmVudCwgZXhwcjEuZ2V0KHRoaXMpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF93YWxrOiBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xyXG4gICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoYXN0KSApe1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xyXG4gICAgICAgICAgICAgIHZhciByZXQgPSB0aGlzLl93YWxrKGFzdFtpXSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgaWYocmV0ICYmIHJldC5jb2RlID09PSBFUlJPUi5VTk1BVENIRURfQVNUKXtcclxuICAgICAgICAgICAgICAgIGFzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICBsZW4tLTtcclxuICAgICAgICAgICAgICB9ZWxzZSByZXMucHVzaCggcmV0ICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHcm91cChyZXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYodHlwZW9mIGFzdCA9PT0gJ3N0cmluZycpIHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUoYXN0KVxyXG4gICAgICAgICAgcmV0dXJuIHdhbGtlcnNbYXN0LnR5cGUgfHwgXCJkZWZhdWx0XCJdLmNhbGwodGhpcywgYXN0LCBvcHRpb25zKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uKGNvbXBvbmVudCl7XHJcbiAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGNvbXBvbmVudCk7XHJcbiAgICAgICAgICBjb21wb25lbnQuJHBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfaGFuZGxlRXZlbnQ6IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIHZhbHVlLCBhdHRycyl7XHJcbiAgICAgICAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5jb25zdHJ1Y3RvcixcclxuICAgICAgICAgICAgZmlyZSA9IHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiPyBfLmhhbmRsZUV2ZW50LmNhbGwoIHRoaXMsIHZhbHVlLCB0eXBlICkgOiB2YWx1ZSxcclxuICAgICAgICAgICAgaGFuZGxlciA9IENvbXBvbmVudC5ldmVudCh0eXBlKSwgZGVzdHJveTtcclxuXHJcbiAgICAgICAgICBpZiAoIGhhbmRsZXIgKSB7XHJcbiAgICAgICAgICAgIGRlc3Ryb3kgPSBoYW5kbGVyLmNhbGwodGhpcywgZWxlbSwgZmlyZSwgYXR0cnMpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9tLm9uKGVsZW0sIHR5cGUsIGZpcmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZXIgPyBkZXN0cm95IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRvbS5vZmYoZWxlbSwgdHlwZSwgZmlyZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyAxLiDnlKjmnaXlpITnkIZleHByQm9keSAtPiBGdW5jdGlvblxyXG4gICAgICAgIC8vIDIuIGxpc3Tph4znmoTlvqrnjq9cclxuICAgICAgICBfdG91Y2hFeHByOiBmdW5jdGlvbihleHByLCBleHQpe1xyXG4gICAgICAgICAgdmFyIHJhd2dldCwgZXh0ID0gdGhpcy5fX2V4dF9fLCB0b3VjaGVkID0ge307XHJcbiAgICAgICAgICBpZihleHByLnR5cGUgIT09ICdleHByZXNzaW9uJyB8fCBleHByLnRvdWNoZWQpIHJldHVybiBleHByO1xyXG5cclxuICAgICAgICAgIHJhd2dldCA9IGV4cHIuZ2V0O1xyXG4gICAgICAgICAgaWYoIXJhd2dldCl7XHJcbiAgICAgICAgICAgIHJhd2dldCA9IGV4cHIuZ2V0ID0gbmV3IEZ1bmN0aW9uKF8uY3R4TmFtZSwgXy5leHROYW1lICwgXy5wcmVmaXgrIFwicmV0dXJuIChcIiArIGV4cHIuYm9keSArIFwiKVwiKTtcclxuICAgICAgICAgICAgZXhwci5ib2R5ID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRvdWNoZWQuZ2V0ID0gIWV4dD8gcmF3Z2V0OiBmdW5jdGlvbihjb250ZXh0LCBlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJhd2dldCggY29udGV4dCwgZSB8fCBleHQgKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKGV4cHIuc2V0Ym9keSAmJiAhZXhwci5zZXQpe1xyXG4gICAgICAgICAgICB2YXIgc2V0Ym9keSA9IGV4cHIuc2V0Ym9keTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcnMgPSBleHByLmZpbHRlcnM7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgaWYoIWZpbHRlcnMgfHwgIV8uc29tZShmaWx0ZXJzLCBmdW5jdGlvbihmaWx0ZXIpeyByZXR1cm4gIXNlbGYuX2ZfKGZpbHRlcikuc2V0IH0pICl7XHJcbiAgICAgICAgICAgICAgZXhwci5zZXQgPSBmdW5jdGlvbihjdHgsIHZhbHVlLCBleHQpe1xyXG4gICAgICAgICAgICAgICAgZXhwci5zZXQgPSBuZXcgRnVuY3Rpb24oXy5jdHhOYW1lLCBfLnNldE5hbWUgLCBfLmV4dE5hbWUsIF8ucHJlZml4ICsgc2V0Ym9keSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwci5zZXQoY3R4LCB2YWx1ZSwgZXh0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXhwci5maWx0ZXJzID0gZXhwci5zZXRib2R5ID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGV4cHIuc2V0KXtcclxuICAgICAgICAgICAgdG91Y2hlZC5zZXQgPSAhZXh0PyBleHByLnNldCA6IGZ1bmN0aW9uKGN0eCwgdmFsdWUpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBleHByLnNldChjdHgsIHZhbHVlLCBleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdG91Y2hlZC50eXBlID0gJ2V4cHJlc3Npb24nO1xyXG4gICAgICAgICAgdG91Y2hlZC50b3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHRvdWNoZWQub25jZSA9IGV4cHIub25jZSB8fCBleHByLmNvbnN0YW50O1xyXG4gICAgICAgICAgcmV0dXJuIHRvdWNoZWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGZpbmQgZmlsdGVyXHJcbiAgICAgICAgX2ZfOiBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICAgIHZhciBDb21wb25lbnQgPSB0aGlzLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgICAgdmFyIGZpbHRlciA9IENvbXBvbmVudC5maWx0ZXIobmFtZSk7XHJcbiAgICAgICAgICBpZighZmlsdGVyKSB0aHJvdyBFcnJvcignZmlsdGVyICcgKyBuYW1lICsgJyBpcyB1bmRlZmluZWQnKTtcclxuICAgICAgICAgIHJldHVybiBmaWx0ZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBzaW1wbGUgYWNjZXNzb3IgZ2V0XHJcbiAgICAgICAgX3NnXzpmdW5jdGlvbihwYXRoLCBkZWZhdWx0cywgZXh0KXtcclxuICAgICAgICAgIGlmKCBwYXRoID09PSB1bmRlZmluZWQgKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgaWYoZXh0ICYmIHR5cGVvZiBleHQgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgaWYoZXh0W3BhdGhdICE9PSB1bmRlZmluZWQpICByZXR1cm4gZXh0W3BhdGhdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGNvbXB1dGVkID0gdGhpcy5jb21wdXRlZCxcclxuICAgICAgICAgICAgY29tcHV0ZWRQcm9wZXJ0eSA9IGNvbXB1dGVkW3BhdGhdO1xyXG4gICAgICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eSl7XHJcbiAgICAgICAgICAgIGlmKGNvbXB1dGVkUHJvcGVydHkudHlwZT09PSdleHByZXNzaW9uJyAmJiAhY29tcHV0ZWRQcm9wZXJ0eS5nZXQpIHRoaXMuX3RvdWNoRXhwcihjb21wdXRlZFByb3BlcnR5KTtcclxuICAgICAgICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eS5nZXQpICByZXR1cm4gY29tcHV0ZWRQcm9wZXJ0eS5nZXQodGhpcyk7XHJcbiAgICAgICAgICAgIGVsc2UgXy5sb2coXCJ0aGUgY29tcHV0ZWQgJ1wiICsgcGF0aCArIFwiJyBkb24ndCBkZWZpbmUgdGhlIGdldCBmdW5jdGlvbiwgIGdldCBkYXRhLlwiK3BhdGggKyBcIiBhbHRuYXRlbHlcIiwgXCJ3YXJuXCIpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYoIGRlZmF1bHRzID09PSB1bmRlZmluZWQgICl7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdHNbcGF0aF07XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gc2ltcGxlIGFjY2Vzc29yIHNldFxyXG4gICAgICAgIF9zc186ZnVuY3Rpb24ocGF0aCwgdmFsdWUsIGRhdGEgLCBvcCwgY29tcHV0ZWQpe1xyXG4gICAgICAgICAgdmFyIGNvbXB1dGVkID0gdGhpcy5jb21wdXRlZCxcclxuICAgICAgICAgICAgb3AgPSBvcCB8fCBcIj1cIiwgcHJldixcclxuICAgICAgICAgICAgY29tcHV0ZWRQcm9wZXJ0eSA9IGNvbXB1dGVkPyBjb21wdXRlZFtwYXRoXTpudWxsO1xyXG5cclxuICAgICAgICAgIGlmKG9wICE9PSAnPScpe1xyXG4gICAgICAgICAgICBwcmV2ID0gY29tcHV0ZWRQcm9wZXJ0eT8gY29tcHV0ZWRQcm9wZXJ0eS5nZXQodGhpcyk6IGRhdGFbcGF0aF07XHJcbiAgICAgICAgICAgIHN3aXRjaChvcCl7XHJcbiAgICAgICAgICAgICAgY2FzZSBcIis9XCI6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHByZXYgKyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCItPVwiOlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwcmV2IC0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlIFwiKj1cIjpcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gcHJldiAqIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSBcIi89XCI6XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHByZXYgLyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCIlPVwiOlxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwcmV2ICUgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoY29tcHV0ZWRQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICBpZihjb21wdXRlZFByb3BlcnR5LnNldCkgcmV0dXJuIGNvbXB1dGVkUHJvcGVydHkuc2V0KHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgZWxzZSBfLmxvZyhcInRoZSBjb21wdXRlZCAnXCIgKyBwYXRoICsgXCInIGRvbid0IGRlZmluZSB0aGUgc2V0IGZ1bmN0aW9uLCAgYXNzaWduIGRhdGEuXCIrcGF0aCArIFwiIGFsdG5hdGVseVwiLCBcIndhcm5cIiApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYXRhW3BhdGhdID0gdmFsdWU7XHJcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIFJlZ3VsYXIucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXy5sb2coXCJ1c2UgJGluamVjdCBpbnN0ZWFkIG9mIGluamVjdFwiLCBcIndhcm5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluamVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLy8gb25seSBvbmUgYnVpbHRpbiBmaWx0ZXJcclxuXHJcbiAgICAgIFJlZ3VsYXIuZmlsdGVyKGZpbHRlcik7XHJcblxyXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IFJlZ3VsYXI7XHJcblxyXG5cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHRyeUdldFNlbGVjdG9yKHRwbCl7XHJcbiAgICAgICAgdmFyIG5vZGU7XHJcbiAgICAgICAgaWYoIHR5cGVvZiB0cGwgPT09ICdzdHJpbmcnICYmIHRwbC5sZW5ndGggPCAxNiAmJiAobm9kZSA9IGRvbS5maW5kKCB0cGwgKSkgKSB7XHJcbiAgICAgICAgICBfLmxvZyhcInBhc3Mgc2VsZWN0b3IgYXMgdGVtcGxhdGUgaGFzIGJlIGRlcHJlY2F0ZWQsIHBhc3Mgbm9kZSBvciB0ZW1wbGF0ZSBzdHJpbmcgaW5zdGVhZFwiLCAnd2FybicpXHJcbiAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiA5ICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuICAgICAgdmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcblxyXG4gICAgICAvLyBzb21lIGN1c3RvbSB0YWcgIHdpbGwgY29uZmxpY3Qgd2l0aCB0aGUgTGV4ZXIgcHJvZ3Jlc3NcclxuICAgICAgdmFyIGNvbmZsaWN0VGFnID0ge1wifVwiOiBcIntcIiwgXCJdXCI6IFwiW1wifSwgbWFwMSwgbWFwMjtcclxuICAgICAgLy8gc29tZSBtYWNybyBmb3IgbGV4ZXJcclxuICAgICAgdmFyIG1hY3JvID0ge1xyXG4gICAgICAgICdOQU1FJzogLyg/Ols6X0EtWmEtel1bLVxcLjpfMC05QS1aYS16XSopLyxcclxuICAgICAgICAnSURFTlQnOiAvW1xcJF9BLVphLXpdW18wLTlBLVphLXpcXCRdKi8sXHJcbiAgICAgICAgJ1NQQUNFJzogL1tcXHJcXG5cXHRcXGYgXS9cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHZhciB0ZXN0ID0gL2F8KGIpLy5leGVjKFwiYVwiKTtcclxuICAgICAgdmFyIHRlc3RTdWJDYXB1cmUgPSB0ZXN0ICYmIHRlc3RbMV0gPT09IHVuZGVmaW5lZD9cclxuICAgICAgICBmdW5jdGlvbihzdHIpeyByZXR1cm4gc3RyICE9PSB1bmRlZmluZWQgfVxyXG4gICAgICAgIDpmdW5jdGlvbihzdHIpe3JldHVybiAhIXN0cn07XHJcblxyXG4gICAgICBmdW5jdGlvbiB3cmFwSGFuZGVyKGhhbmRsZXIpe1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhbGwpe1xyXG4gICAgICAgICAgcmV0dXJuIHt0eXBlOiBoYW5kbGVyLCB2YWx1ZTogYWxsIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIExleGVyKGlucHV0LCBvcHRzKXtcclxuICAgICAgICBpZihjb25mbGljdFRhZ1tjb25maWcuRU5EXSl7XHJcbiAgICAgICAgICB0aGlzLm1hcmtTdGFydCA9IGNvbmZsaWN0VGFnW2NvbmZpZy5FTkRdO1xyXG4gICAgICAgICAgdGhpcy5tYXJrRW5kID0gY29uZmlnLkVORDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSAoaW5wdXR8fFwiXCIpLnRyaW0oKTtcclxuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xyXG4gICAgICAgIHRoaXMubWFwID0gdGhpcy5vcHRzLm1vZGUgIT09IDI/ICBtYXAxOiBtYXAyO1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0gW1wiSU5JVFwiXTtcclxuICAgICAgICBpZihvcHRzICYmIG9wdHMuZXhwcmVzc2lvbil7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKFwiSlNUXCIpO1xyXG4gICAgICAgICAgdGhpcy5leHByZXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBsbyA9IExleGVyLnByb3RvdHlwZVxyXG5cclxuXHJcbiAgICAgIGxvLmxleCA9IGZ1bmN0aW9uKHN0cil7XHJcbiAgICAgICAgc3RyID0gKHN0ciB8fCB0aGlzLmlucHV0KS50cmltKCk7XHJcbiAgICAgICAgdmFyIHRva2VucyA9IFtdLCBzcGxpdCwgdGVzdCxtbGVuLCB0b2tlbiwgc3RhdGU7XHJcbiAgICAgICAgdGhpcy5pbnB1dCA9IHN0cixcclxuICAgICAgICAgIHRoaXMubWFya3MgPSAwO1xyXG4gICAgICAgIC8vIGluaXQgdGhlIHBvcyBpbmRleFxyXG4gICAgICAgIHRoaXMuaW5kZXg9MDtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgd2hpbGUoc3RyKXtcclxuICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgc3RhdGUgPSB0aGlzLnN0YXRlKCk7XHJcbiAgICAgICAgICBzcGxpdCA9IHRoaXMubWFwW3N0YXRlXVxyXG4gICAgICAgICAgdGVzdCA9IHNwbGl0LlRSVU5LLmV4ZWMoc3RyKTtcclxuICAgICAgICAgIGlmKCF0ZXN0KXtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcignVW5yZWNvZ2luaXplZCBUb2tlbicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbWxlbiA9IHRlc3RbMF0ubGVuZ3RoO1xyXG4gICAgICAgICAgc3RyID0gc3RyLnNsaWNlKG1sZW4pXHJcbiAgICAgICAgICB0b2tlbiA9IHRoaXMuX3Byb2Nlc3MuY2FsbCh0aGlzLCB0ZXN0LCBzcGxpdCwgc3RyKVxyXG4gICAgICAgICAgaWYodG9rZW4pIHRva2Vucy5wdXNoKHRva2VuKVxyXG4gICAgICAgICAgdGhpcy5pbmRleCArPSBtbGVuO1xyXG4gICAgICAgICAgLy8gaWYoc3RhdGUgPT0gJ1RBRycgfHwgc3RhdGUgPT0gJ0pTVCcpIHN0ciA9IHRoaXMuc2tpcHNwYWNlKHN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2tlbnMucHVzaCh7dHlwZTogJ0VPRid9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRva2VucztcclxuICAgICAgfVxyXG5cclxuICAgICAgbG8uZXJyb3IgPSBmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgIHRocm93ICBFcnJvcihcIlBhcnNlIEVycm9yOiBcIiArIG1zZyArICAnOlxcbicgKyBfLnRyYWNrRXJyb3JQb3ModGhpcy5pbnB1dCwgdGhpcy5pbmRleCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsby5fcHJvY2VzcyA9IGZ1bmN0aW9uKGFyZ3MsIHNwbGl0LHN0cil7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJncy5qb2luKFwiLFwiKSwgdGhpcy5zdGF0ZSgpKVxyXG4gICAgICAgIHZhciBsaW5rcyA9IHNwbGl0LmxpbmtzLCBtYXJjaGVkID0gZmFsc2UsIHRva2VuO1xyXG5cclxuICAgICAgICBmb3IodmFyIGxlbiA9IGxpbmtzLmxlbmd0aCwgaT0wO2k8bGVuIDtpKyspe1xyXG4gICAgICAgICAgdmFyIGxpbmsgPSBsaW5rc1tpXSxcclxuICAgICAgICAgICAgaGFuZGxlciA9IGxpbmtbMl0sXHJcbiAgICAgICAgICAgIGluZGV4ID0gbGlua1swXTtcclxuICAgICAgICAgIC8vIGlmKGFyZ3NbNl0gPT09ICc+JyAmJiBpbmRleCA9PT0gNikgY29uc29sZS5sb2coJ2hhaGEnKVxyXG4gICAgICAgICAgaWYodGVzdFN1YkNhcHVyZShhcmdzW2luZGV4XSkpIHtcclxuICAgICAgICAgICAgbWFyY2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmKGhhbmRsZXIpe1xyXG4gICAgICAgICAgICAgIHRva2VuID0gaGFuZGxlci5hcHBseSh0aGlzLCBfLnNsaWNlKGFyZ3MsIGluZGV4LCBpbmRleCArIGxpbmtbMV0pKVxyXG4gICAgICAgICAgICAgIGlmKHRva2VuKSAgdG9rZW4ucG9zID0gdGhpcy5pbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIW1hcmNoZWQpeyAvLyBpbiBpZSBsdDggLiBzdWIgY2FwdHVyZSBpcyBcIlwiIGJ1dCBvbnRcclxuICAgICAgICAgIHN3aXRjaChzdHIuY2hhckF0KDApKXtcclxuICAgICAgICAgICAgY2FzZSBcIjxcIjpcclxuICAgICAgICAgICAgICB0aGlzLmVudGVyKFwiVEFHXCIpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIHRoaXMuZW50ZXIoXCJKU1RcIik7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgfVxyXG4gICAgICBsby5lbnRlciA9IGZ1bmN0aW9uKHN0YXRlKXtcclxuICAgICAgICB0aGlzLnN0YXRlcy5wdXNoKHN0YXRlKVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsby5zdGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xyXG4gICAgICAgIHJldHVybiBzdGF0ZXNbc3RhdGVzLmxlbmd0aC0xXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG8ubGVhdmUgPSBmdW5jdGlvbihzdGF0ZSl7XHJcbiAgICAgICAgdmFyIHN0YXRlcyA9IHRoaXMuc3RhdGVzO1xyXG4gICAgICAgIGlmKCFzdGF0ZSB8fCBzdGF0ZXNbc3RhdGVzLmxlbmd0aC0xXSA9PT0gc3RhdGUpIHN0YXRlcy5wb3AoKVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgTGV4ZXIuc2V0dXAgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIG1hY3JvLkVORCA9IGNvbmZpZy5FTkQ7XHJcbiAgICAgICAgbWFjcm8uQkVHSU4gPSBjb25maWcuQkVHSU47XHJcblxyXG4gICAgICAgIC8vIGxpdmluZyB0ZW1wbGF0ZSBsZXhlclxyXG4gICAgICAgIG1hcDEgPSBnZW5NYXAoW1xyXG4gICAgICAgICAgLy8gSU5JVFxyXG4gICAgICAgICAgcnVsZXMuQk9EWV9FTkQsXHJcbiAgICAgICAgICBydWxlcy5FTlRFUl9KU1QsXHJcbiAgICAgICAgICBydWxlcy5FTlRFUl9UQUcsXHJcbiAgICAgICAgICBydWxlcy5URVhULFxyXG5cclxuICAgICAgICAgIC8vVEFHXHJcbiAgICAgICAgICBydWxlcy5UQUdfTkFNRSxcclxuICAgICAgICAgIHJ1bGVzLlRBR19PUEVOLFxyXG4gICAgICAgICAgcnVsZXMuVEFHX0NMT1NFLFxyXG4gICAgICAgICAgcnVsZXMuVEFHX1BVTkNIT1IsXHJcbiAgICAgICAgICBydWxlcy5UQUdfRU5URVJfSlNULFxyXG4gICAgICAgICAgcnVsZXMuVEFHX1VOUV9WQUxVRSxcclxuICAgICAgICAgIHJ1bGVzLlRBR19TVFJJTkcsXHJcbiAgICAgICAgICBydWxlcy5UQUdfU1BBQ0UsXHJcbiAgICAgICAgICBydWxlcy5UQUdfQ09NTUVOVCxcclxuXHJcbiAgICAgICAgICAvLyBKU1RcclxuICAgICAgICAgIHJ1bGVzLkpTVF9PUEVOLFxyXG4gICAgICAgICAgcnVsZXMuSlNUX0JPRFlfT1BFTixcclxuICAgICAgICAgIHJ1bGVzLkpTVF9DTE9TRSxcclxuICAgICAgICAgIHJ1bGVzLkpTVF9FWFBSX09QRU4sXHJcbiAgICAgICAgICBydWxlcy5KU1RfSURFTlQsXHJcbiAgICAgICAgICBydWxlcy5KU1RfU1BBQ0UsXHJcbiAgICAgICAgICBydWxlcy5KU1RfTEVBVkUsXHJcbiAgICAgICAgICBydWxlcy5KU1RfTlVNQkVSLFxyXG4gICAgICAgICAgcnVsZXMuSlNUX1BVTkNIT1IsXHJcbiAgICAgICAgICBydWxlcy5KU1RfU1RSSU5HLFxyXG4gICAgICAgICAgcnVsZXMuSlNUX0NPTU1FTlRcclxuICAgICAgICBdKVxyXG5cclxuICAgICAgICAvLyBpZ25vcmVkIHRoZSB0YWctcmVsYXRpdmUgdG9rZW5cclxuICAgICAgICBtYXAyID0gZ2VuTWFwKFtcclxuICAgICAgICAgIC8vIElOSVQgbm8gPCByZXN0cmljdFxyXG4gICAgICAgICAgcnVsZXMuQk9EWV9FTkQsXHJcbiAgICAgICAgICBydWxlcy5FTlRFUl9KU1QyLFxyXG4gICAgICAgICAgcnVsZXMuVEVYVCxcclxuICAgICAgICAgIC8vIEpTVFxyXG4gICAgICAgICAgcnVsZXMuSlNUX09QRU4sXHJcbiAgICAgICAgICBydWxlcy5KU1RfQk9EWV9PUEVOLFxyXG4gICAgICAgICAgcnVsZXMuSlNUX0NMT1NFLFxyXG4gICAgICAgICAgcnVsZXMuSlNUX0VYUFJfT1BFTixcclxuICAgICAgICAgIHJ1bGVzLkpTVF9JREVOVCxcclxuICAgICAgICAgIHJ1bGVzLkpTVF9TUEFDRSxcclxuICAgICAgICAgIHJ1bGVzLkpTVF9MRUFWRSxcclxuICAgICAgICAgIHJ1bGVzLkpTVF9OVU1CRVIsXHJcbiAgICAgICAgICBydWxlcy5KU1RfUFVOQ0hPUixcclxuICAgICAgICAgIHJ1bGVzLkpTVF9TVFJJTkcsXHJcbiAgICAgICAgICBydWxlcy5KU1RfQ09NTUVOVFxyXG4gICAgICAgIF0pXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBmdW5jdGlvbiBnZW5NYXAocnVsZXMpe1xyXG4gICAgICAgIHZhciBydWxlLCBtYXAgPSB7fSwgc2lnbjtcclxuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBydWxlcy5sZW5ndGg7IGkgPCBsZW4gOyBpKyspe1xyXG4gICAgICAgICAgcnVsZSA9IHJ1bGVzW2ldO1xyXG4gICAgICAgICAgc2lnbiA9IHJ1bGVbMl0gfHwgJ0lOSVQnO1xyXG4gICAgICAgICAgKCBtYXBbc2lnbl0gfHwgKG1hcFtzaWduXSA9IHtydWxlczpbXSwgbGlua3M6W119KSApLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXR1cChtYXApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXR1cChtYXApe1xyXG4gICAgICAgIHZhciBzcGxpdCwgcnVsZXMsIHRydW5rcywgaGFuZGxlciwgcmVnLCByZXRhaW4sIHJ1bGU7XHJcbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZUZuKGFsbCwgb25lKXtcclxuICAgICAgICAgIHJldHVybiB0eXBlb2YgbWFjcm9bb25lXSA9PT0gJ3N0cmluZyc/XHJcbiAgICAgICAgICAgIF8uZXNjYXBlUmVnRXhwKG1hY3JvW29uZV0pXHJcbiAgICAgICAgICAgIDogU3RyaW5nKG1hY3JvW29uZV0pLnNsaWNlKDEsLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKHZhciBpIGluIG1hcCl7XHJcblxyXG4gICAgICAgICAgc3BsaXQgPSBtYXBbaV07XHJcbiAgICAgICAgICBzcGxpdC5jdXJJbmRleCA9IDE7XHJcbiAgICAgICAgICBydWxlcyA9IHNwbGl0LnJ1bGVzO1xyXG4gICAgICAgICAgdHJ1bmtzID0gW107XHJcblxyXG4gICAgICAgICAgZm9yKHZhciBqID0gMCxsZW4gPSBydWxlcy5sZW5ndGg7IGo8bGVuOyBqKyspe1xyXG4gICAgICAgICAgICBydWxlID0gcnVsZXNbal07XHJcbiAgICAgICAgICAgIHJlZyA9IHJ1bGVbMF07XHJcbiAgICAgICAgICAgIGhhbmRsZXIgPSBydWxlWzFdO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mIGhhbmRsZXIgPT09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgICBoYW5kbGVyID0gd3JhcEhhbmRlcihoYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfLnR5cGVPZihyZWcpID09PSAncmVnZXhwJykgcmVnID0gcmVnLnRvU3RyaW5nKCkuc2xpY2UoMSwgLTEpO1xyXG5cclxuICAgICAgICAgICAgcmVnID0gcmVnLnJlcGxhY2UoL1xceyhcXHcrKVxcfS9nLCByZXBsYWNlRm4pXHJcbiAgICAgICAgICAgIHJldGFpbiA9IF8uZmluZFN1YkNhcHR1cmUocmVnKSArIDE7XHJcbiAgICAgICAgICAgIHNwbGl0LmxpbmtzLnB1c2goW3NwbGl0LmN1ckluZGV4LCByZXRhaW4sIGhhbmRsZXJdKTtcclxuICAgICAgICAgICAgc3BsaXQuY3VySW5kZXggKz0gcmV0YWluO1xyXG4gICAgICAgICAgICB0cnVua3MucHVzaChyZWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3BsaXQuVFJVTksgPSBuZXcgUmVnRXhwKFwiXig/OihcIiArIHRydW5rcy5qb2luKFwiKXwoXCIpICsgXCIpKVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgcnVsZXMgPSB7XHJcblxyXG4gICAgICAgIC8vIDEuIElOSVRcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgLy8gbW9kZTEncyBKU1QgRU5URVIgUlVMRVxyXG4gICAgICAgIEVOVEVSX0pTVDogWy9bXlxceDAwPF0qPyg/PXtCRUdJTn0pLywgZnVuY3Rpb24oYWxsKXtcclxuICAgICAgICAgIHRoaXMuZW50ZXIoJ0pTVCcpO1xyXG4gICAgICAgICAgaWYoYWxsKSByZXR1cm4ge3R5cGU6ICdURVhUJywgdmFsdWU6IGFsbH1cclxuICAgICAgICB9XSxcclxuXHJcbiAgICAgICAgLy8gbW9kZTIncyBKU1QgRU5URVIgUlVMRVxyXG4gICAgICAgIEVOVEVSX0pTVDI6IFsvW15cXHgwMF0qPyg/PXtCRUdJTn0pLywgZnVuY3Rpb24oYWxsKXtcclxuICAgICAgICAgIHRoaXMuZW50ZXIoJ0pTVCcpO1xyXG4gICAgICAgICAgaWYoYWxsKSByZXR1cm4ge3R5cGU6ICdURVhUJywgdmFsdWU6IGFsbH1cclxuICAgICAgICB9XSxcclxuXHJcbiAgICAgICAgRU5URVJfVEFHOiBbL1teXFx4MDBdKj8oPz08W1xcd1xcL1xcIV0pLywgZnVuY3Rpb24oYWxsKXtcclxuICAgICAgICAgIHRoaXMuZW50ZXIoJ1RBRycpO1xyXG4gICAgICAgICAgaWYoYWxsKSByZXR1cm4ge3R5cGU6ICdURVhUJywgdmFsdWU6IGFsbH1cclxuICAgICAgICB9XSxcclxuXHJcbiAgICAgICAgLy8ge34gPGRpdj48L2Rpdj4gfVxyXG4gICAgICAgIEJPRFlfRU5EOiBbL3tTUEFDRX0qe0VORH0vLCAgZnVuY3Rpb24odmFsKXtcclxuXHJcbiAgICAgICAgICB2YXIgc3RhdGVzID0gdGhpcy5zdGF0ZXMsIHNsZW4gPSBzdGF0ZXMubGVuZ3RoO1xyXG5cclxuXHJcbiAgICAgICAgICBpZihzdGF0ZXNbc2xlbi0yXSA9PT0gJ0pTVCcgKXtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGVhdmUoJ0lOSVQnKTtcclxuICAgICAgICAgICAgdGhpcy5sZWF2ZSgnSlNUJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTogJ0VORCd9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ1RFWFQnLCB2YWx1ZTogdmFsIH1cclxuXHJcbiAgICAgICAgfSBdLFxyXG5cclxuICAgICAgICBURVhUOiBbL1teXFx4MDBdKy8sICdURVhUJyBdLFxyXG5cclxuICAgICAgICAvLyAyLiBUQUdcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIFRBR19OQU1FOiBbL3tOQU1FfS8sICdOQU1FJywgJ1RBRyddLFxyXG4gICAgICAgIFRBR19VTlFfVkFMVUU6IFsvW15cXHt9JlwiJz0+PGBcXHJcXG5cXGZcXHQgXSsvLCAnVU5RJywgJ1RBRyddLFxyXG5cclxuICAgICAgICBUQUdfT1BFTjogWy88KHtOQU1FfSlcXHMqLywgZnVuY3Rpb24oYWxsLCBvbmUpeyAvL1wiXHJcbiAgICAgICAgICByZXR1cm4ge3R5cGU6ICdUQUdfT1BFTicsIHZhbHVlOiBvbmV9XHJcbiAgICAgICAgfSwgJ1RBRyddLFxyXG4gICAgICAgIFRBR19DTE9TRTogWy88XFwvKHtOQU1FfSlbXFxyXFxuXFxmXFx0IF0qPi8sIGZ1bmN0aW9uKGFsbCwgb25lKXtcclxuICAgICAgICAgIHRoaXMubGVhdmUoKTtcclxuICAgICAgICAgIHJldHVybiB7dHlwZTogJ1RBR19DTE9TRScsIHZhbHVlOiBvbmUgfVxyXG4gICAgICAgIH0sICdUQUcnXSxcclxuXHJcbiAgICAgICAgLy8gbW9kZTIncyBKU1QgRU5URVIgUlVMRVxyXG4gICAgICAgIFRBR19FTlRFUl9KU1Q6IFsvKD89e0JFR0lOfSkvLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdGhpcy5lbnRlcignSlNUJyk7XHJcbiAgICAgICAgfSwgJ1RBRyddLFxyXG5cclxuXHJcbiAgICAgICAgVEFHX1BVTkNIT1I6IFsvW1xcPlxcLz0mXS8sIGZ1bmN0aW9uKGFsbCl7XHJcbiAgICAgICAgICBpZihhbGwgPT09ICc+JykgdGhpcy5sZWF2ZSgpO1xyXG4gICAgICAgICAgcmV0dXJuIHt0eXBlOiBhbGwsIHZhbHVlOiBhbGwgfVxyXG4gICAgICAgIH0sICdUQUcnXSxcclxuXHJcbiAgICAgICAgVEFHX1NUUklORzogIFsgLycoW14nXSopJ3xcIihbXlwiXSopXFxcIi8sIC8qJyovICBmdW5jdGlvbihhbGwsIG9uZSwgdHdvKXtcclxuICAgICAgICAgIHZhciB2YWx1ZSA9IG9uZSB8fCB0d28gfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICByZXR1cm4ge3R5cGU6ICdTVFJJTkcnLCB2YWx1ZTogdmFsdWV9XHJcbiAgICAgICAgfSwgJ1RBRyddLFxyXG5cclxuICAgICAgICBUQUdfU1BBQ0U6IFsve1NQQUNFfSsvLCBudWxsLCAnVEFHJ10sXHJcbiAgICAgICAgVEFHX0NPTU1FTlQ6IFsvPFxcIS0tKFteXFx4MDBdKj8pLS1cXD4vLCBmdW5jdGlvbihhbGwpe1xyXG4gICAgICAgICAgdGhpcy5sZWF2ZSgpXHJcbiAgICAgICAgICAvLyB0aGlzLmxlYXZlKCdUQUcnKVxyXG4gICAgICAgIH0gLCdUQUcnXSxcclxuXHJcbiAgICAgICAgLy8gMy4gSlNUXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIEpTVF9PUEVOOiBbJ3tCRUdJTn0je1NQQUNFfSooe0lERU5UfSknLCBmdW5jdGlvbihhbGwsIG5hbWUpe1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ09QRU4nLFxyXG4gICAgICAgICAgICB2YWx1ZTogbmFtZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sICdKU1QnXSxcclxuICAgICAgICAvLyB0aXRsZSA9IHt+IDxkaXY+PC9kaXY+fVxyXG4gICAgICAgIEpTVF9CT0RZX09QRU46IFsne0JFR0lOfX57U1BBQ0V9KicsIGZ1bmN0aW9uKGFsbCwgbmFtZSl7XHJcbiAgICAgICAgICB0aGlzLmVudGVyKCdJTklUJyk7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnQk9EWV9PUEVOJyxcclxuICAgICAgICAgICAgdmFsdWU6IG5hbWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAnSlNUJ10sXHJcbiAgICAgICAgSlNUX0xFQVZFOiBbL3tFTkR9LywgZnVuY3Rpb24oYWxsKXtcclxuICAgICAgICAgIGlmKHRoaXMubWFya0VuZCA9PT0gYWxsICYmIHRoaXMuZXhwcmVzc2lvbikgcmV0dXJuIHt0eXBlOiB0aGlzLm1hcmtFbmQsIHZhbHVlOiB0aGlzLm1hcmtFbmR9O1xyXG4gICAgICAgICAgaWYoIXRoaXMubWFya0VuZCB8fCAhdGhpcy5tYXJrcyApe1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RW50ZXJTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxlYXZlKCdKU1QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOiAnRU5EJ31cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtzLS07XHJcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTogdGhpcy5tYXJrRW5kLCB2YWx1ZTogdGhpcy5tYXJrRW5kfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sICdKU1QnXSxcclxuICAgICAgICBKU1RfQ0xPU0U6IFsve0JFR0lOfVxccypcXC8oe0lERU5UfSlcXHMqe0VORH0vLCBmdW5jdGlvbihhbGwsIG9uZSl7XHJcbiAgICAgICAgICB0aGlzLmxlYXZlKCdKU1QnKTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdDTE9TRScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBvbmVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCAnSlNUJ10sXHJcbiAgICAgICAgSlNUX0NPTU1FTlQ6IFsve0JFR0lOfVxcIShbXlxceDAwXSo/KVxcIXtFTkR9LywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHRoaXMubGVhdmUoKTtcclxuICAgICAgICB9LCAnSlNUJ10sXHJcbiAgICAgICAgSlNUX0VYUFJfT1BFTjogWyd7QkVHSU59JyxmdW5jdGlvbihhbGwsIG9uZSl7XHJcbiAgICAgICAgICBpZihhbGwgPT09IHRoaXMubWFya1N0YXJ0KXtcclxuICAgICAgICAgICAgaWYodGhpcy5leHByZXNzaW9uKSByZXR1cm4geyB0eXBlOiB0aGlzLm1hcmtTdGFydCwgdmFsdWU6IHRoaXMubWFya1N0YXJ0IH07XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmlyc3RFbnRlclN0YXJ0IHx8IHRoaXMubWFya3Mpe1xyXG4gICAgICAgICAgICAgIHRoaXMubWFya3MrK1xyXG4gICAgICAgICAgICAgIHRoaXMuZmlyc3RFbnRlclN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogdGhpcy5tYXJrU3RhcnQsIHZhbHVlOiB0aGlzLm1hcmtTdGFydCB9O1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0aGlzLmZpcnN0RW50ZXJTdGFydCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdFWFBSX09QRU4nLFxyXG4gICAgICAgICAgICBlc2NhcGU6IGZhbHNlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sICdKU1QnXSxcclxuICAgICAgICBKU1RfSURFTlQ6IFsne0lERU5UfScsICdJREVOVCcsICdKU1QnXSxcclxuICAgICAgICBKU1RfU1BBQ0U6IFsvWyBcXHJcXG5cXGZdKy8sIG51bGwsICdKU1QnXSxcclxuICAgICAgICBKU1RfUFVOQ0hPUjogWy9bPSFdPz09fFstPT48KypcXC8lXFwhXT9cXD18XFx8XFx8fCYmfFxcQFxcKHxcXC5cXC58WzxcXD5cXFtcXF1cXChcXClcXC1cXHxcXHt9XFwrXFwqXFwvJT86XFwuISxdLywgZnVuY3Rpb24oYWxsKXtcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6IGFsbCwgdmFsdWU6IGFsbCB9XHJcbiAgICAgICAgfSwnSlNUJ10sXHJcblxyXG4gICAgICAgIEpTVF9TVFJJTkc6ICBbIC8nKFteJ10qKSd8XCIoW15cIl0qKVwiLywgZnVuY3Rpb24oYWxsLCBvbmUsIHR3byl7IC8vXCInXHJcbiAgICAgICAgICByZXR1cm4ge3R5cGU6ICdTVFJJTkcnLCB2YWx1ZTogb25lIHx8IHR3byB8fCBcIlwifVxyXG4gICAgICAgIH0sICdKU1QnXSxcclxuICAgICAgICBKU1RfTlVNQkVSOiBbLyg/OlswLTldKlxcLlswLTldK3xbMC05XSspKGVcXGQrKT8vLCBmdW5jdGlvbihhbGwpe1xyXG4gICAgICAgICAgcmV0dXJuIHt0eXBlOiAnTlVNQkVSJywgdmFsdWU6IHBhcnNlRmxvYXQoYWxsLCAxMCl9O1xyXG4gICAgICAgIH0sICdKU1QnXVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLy8gc2V0dXAgd2hlbiBmaXJzdCBjb25maWdcclxuICAgICAgTGV4ZXIuc2V0dXAoKTtcclxuXHJcblxyXG5cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBMZXhlcjtcclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMTAgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuICAgICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xyXG5cclxuICAgICAgdmFyIGNvbmZpZyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XHJcbiAgICAgIHZhciBub2RlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XHJcbiAgICAgIHZhciBMZXhlciA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XHJcbiAgICAgIHZhciB2YXJOYW1lID0gXy52YXJOYW1lO1xyXG4gICAgICB2YXIgY3R4TmFtZSA9IF8uY3R4TmFtZTtcclxuICAgICAgdmFyIGV4dE5hbWUgPSBfLmV4dE5hbWU7XHJcbiAgICAgIHZhciBpc1BhdGggPSBfLm1ha2VQcmVkaWNhdGUoXCJTVFJJTkcgSURFTlQgTlVNQkVSXCIpO1xyXG4gICAgICB2YXIgaXNLZXlXb3JkID0gXy5tYWtlUHJlZGljYXRlKFwidHJ1ZSBmYWxzZSB1bmRlZmluZWQgbnVsbCB0aGlzIEFycmF5IERhdGUgSlNPTiBNYXRoIE5hTiBSZWdFeHAgZGVjb2RlVVJJIGRlY29kZVVSSUNvbXBvbmVudCBlbmNvZGVVUkkgZW5jb2RlVVJJQ29tcG9uZW50IHBhcnNlRmxvYXQgcGFyc2VJbnQgT2JqZWN0XCIpO1xyXG4gICAgICB2YXIgaXNJbnZhbGlkVGFnID0gXy5tYWtlUHJlZGljYXRlKFwic2NyaXB0IHN0eWxlXCIpO1xyXG4gICAgICB2YXIgaXNMYXN0QmluZCA9IC9cXC5iaW5kJC87XHJcblxyXG5cclxuXHJcbiAgICAgIGZ1bmN0aW9uIFBhcnNlcihpbnB1dCwgb3B0cyl7XHJcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLnRva2VucyA9IG5ldyBMZXhlcihpbnB1dCwgb3B0cykubGV4KCk7XHJcbiAgICAgICAgdGhpcy5wb3MgPSAwO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy50b2tlbnMubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgdmFyIG9wID0gUGFyc2VyLnByb3RvdHlwZTtcclxuXHJcblxyXG4gICAgICBvcC5wYXJzZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wb3MgPSAwO1xyXG4gICAgICAgIHZhciByZXM9IHRoaXMucHJvZ3JhbSgpO1xyXG4gICAgICAgIGlmKHRoaXMubGwoKS50eXBlID09PSAnVEFHX0NMT1NFJyl7XHJcbiAgICAgICAgICB0aGlzLmVycm9yKFwiWW91IG1heSBnb3QgYSB1bmNsb3NlZCBUYWdcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgb3AubGwgPSAgZnVuY3Rpb24oayl7XHJcbiAgICAgICAgayA9IGsgfHwgMTtcclxuICAgICAgICBpZihrIDwgMCkgayA9IGsgKyAxO1xyXG4gICAgICAgIHZhciBwb3MgPSB0aGlzLnBvcyArIGsgLSAxO1xyXG4gICAgICAgIGlmKHBvcyA+IHRoaXMubGVuZ3RoIC0gMSl7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5sZW5ndGgtMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2Vuc1twb3NdO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGxvb2thaGVhZFxyXG4gICAgICBvcC5sYSA9IGZ1bmN0aW9uKGspe1xyXG4gICAgICAgIHJldHVybiAodGhpcy5sbChrKSB8fCAnJykudHlwZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgb3AubWF0Y2ggPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSl7XHJcbiAgICAgICAgdmFyIGxsO1xyXG4gICAgICAgIGlmKCEobGwgPSB0aGlzLmVhdCh0eXBlLCB2YWx1ZSkpKXtcclxuICAgICAgICAgIGxsICA9IHRoaXMubGwoKTtcclxuICAgICAgICAgIHRoaXMuZXJyb3IoJ2V4cGVjdCBbJyArIHR5cGUgKyAodmFsdWUgPT0gbnVsbD8gJyc6JzonKyB2YWx1ZSkgKyAnXVwiIC0+IGdvdCBcIlsnICsgbGwudHlwZSArICh2YWx1ZT09bnVsbD8gJyc6JzonK2xsLnZhbHVlKSArICddJywgbGwucG9zKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcmV0dXJuIGxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgb3AuZXJyb3IgPSBmdW5jdGlvbihtc2csIHBvcyl7XHJcbiAgICAgICAgbXNnID0gIFwiXFxu44CQIHBhcnNlIGZhaWxlZCDjgJEgXCIgKyBtc2cgKyAgJzpcXG5cXG4nICsgXy50cmFja0Vycm9yUG9zKHRoaXMuaW5wdXQsIHR5cGVvZiBwb3MgPT09ICdudW1iZXInPyBwb3M6IHRoaXMubGwoKS5wb3N8fDApO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvcC5uZXh0ID0gZnVuY3Rpb24oayl7XHJcbiAgICAgICAgayA9IGsgfHwgMTtcclxuICAgICAgICB0aGlzLnBvcyArPSBrO1xyXG4gICAgICB9XHJcbiAgICAgIG9wLmVhdCA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKXtcclxuICAgICAgICB2YXIgbGwgPSB0aGlzLmxsKCk7XHJcbiAgICAgICAgaWYodHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKXtcclxuICAgICAgICAgIGZvcih2YXIgbGVuID0gdHlwZS5sZW5ndGggOyBsZW4tLTspe1xyXG4gICAgICAgICAgICBpZihsbC50eXBlID09PSB0eXBlW2xlbl0pIHtcclxuICAgICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgICByZXR1cm4gbGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGlmKCBsbC50eXBlID09PSB0eXBlICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IGxsLnZhbHVlID09PSB2YWx1ZSkgKXtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBwcm9ncmFtXHJcbiAgICAgIC8vICA6RU9GXHJcbiAgICAgIC8vICB8IChzdGF0ZW1lbnQpKiBFT0ZcclxuICAgICAgb3AucHJvZ3JhbSA9IGZ1bmN0aW9uKGlzQXR0cil7XHJcbiAgICAgICAgdmFyIHN0YXRlbWVudHMgPSBbXSwgIGxsID0gdGhpcy5sbCgpO1xyXG4gICAgICAgIHdoaWxlKGxsLnR5cGUgIT09ICdFT0YnICYmIGxsLnR5cGUgIT09J1RBR19DTE9TRScpe1xyXG5cclxuICAgICAgICAgIHN0YXRlbWVudHMucHVzaCh0aGlzLnN0YXRlbWVudCgpKTtcclxuICAgICAgICAgIGxsID0gdGhpcy5sbCgpO1xyXG4gICAgICAgICAgLy8ge34gPGRpdj48L2Rpdj59XHJcbiAgICAgICAgICBpZiggaXNBdHRyICYmIGxsLnR5cGUgPT09ICdFTkQnKXtcclxuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlLmJvZHkoc3RhdGVtZW50cylcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYobGwudHlwZSA9PT0gJ1RBR19DTE9TRScpIHRoaXMuZXJyb3IoXCJZb3UgbWF5IGhhdmUgdW5tYXRjaGVkIFRhZ1wiKVxyXG4gICAgICAgIHJldHVybiBzdGF0ZW1lbnRzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzdGF0ZW1lbnRcclxuICAgICAgLy8gIDogeG1sXHJcbiAgICAgIC8vICB8IGpzdFxyXG4gICAgICAvLyAgfCB0ZXh0XHJcbiAgICAgIHZhciByUk4gPSAvXFxyXFxuL2c7XHJcbiAgICAgIG9wLnN0YXRlbWVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxsID0gdGhpcy5sbCgpO1xyXG4gICAgICAgIHN3aXRjaChsbC50eXBlKXtcclxuICAgICAgICAgIGNhc2UgJ05BTUUnOlxyXG4gICAgICAgICAgY2FzZSAnVEVYVCc6XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gbGwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgICAgICB3aGlsZShsbCA9IHRoaXMuZWF0KFsnTkFNRScsICdURVhUJ10pKXtcclxuICAgICAgICAgICAgICB0ZXh0ICs9IGxsLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlLnRleHQodGV4dC5yZXBsYWNlKHJSTiwgJ1xcbicpKTtcclxuICAgICAgICAgIGNhc2UgJ1RBR19PUEVOJzpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueG1sKCk7XHJcbiAgICAgICAgICBjYXNlICdPUEVOJzpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aXZlKCk7XHJcbiAgICAgICAgICBjYXNlICdFWFBSX09QRU4nOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnBsYXRpb24oKTtcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IoJ1VuZXhwZWN0ZWQgdG9rZW46ICcrIHRoaXMubGEoKSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHhtbFxyXG4gICAgICAvLyBzdGFnIHN0YXRlbWVudCogVEFHX0NMT1NFPyhpZiBzZWxmLWNsb3NlZCB0YWcpXHJcbiAgICAgIG9wLnhtbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIG5hbWUsIGF0dHJzLCBjaGlsZHJlbiwgc2VsZkNsb3NlZDtcclxuICAgICAgICBuYW1lID0gdGhpcy5tYXRjaCgnVEFHX09QRU4nKS52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYoIGlzSW52YWxpZFRhZyhuYW1lKSl7XHJcbiAgICAgICAgICB0aGlzLmVycm9yKCdJbnZhbGlkIFRhZzogJyArIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhdHRycyA9IHRoaXMuYXR0cnMoKTtcclxuICAgICAgICBzZWxmQ2xvc2VkID0gdGhpcy5lYXQoJy8nKVxyXG4gICAgICAgIHRoaXMubWF0Y2goJz4nKTtcclxuICAgICAgICBpZiggIXNlbGZDbG9zZWQgJiYgIV8uaXNWb2lkVGFnKG5hbWUpICl7XHJcbiAgICAgICAgICBjaGlsZHJlbiA9IHRoaXMucHJvZ3JhbSgpO1xyXG4gICAgICAgICAgaWYoIXRoaXMuZWF0KCdUQUdfQ0xPU0UnLCBuYW1lKSkgdGhpcy5lcnJvcignZXhwZWN0IDwvJytuYW1lKyc+IGdvdCcrICdubyBtYXRjaGVkIGNsb3NlVGFnJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudChuYW1lLCBhdHRycywgY2hpbGRyZW4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB4ZW50aXR5XHJcbiAgICAgIC8vICAtcnVsZSh3cmFwIGF0dHJpYnV0ZSlcclxuICAgICAgLy8gIC1hdHRyaWJ1dGVcclxuICAgICAgLy9cclxuICAgICAgLy8gX19leGFtcGxlX19cclxuICAgICAgLy8gIG5hbWUgPSAxIHxcclxuICAgICAgLy8gIG5nLWhpZGUgfFxyXG4gICAgICAvLyAgb24tY2xpY2s9e3t9fSB8XHJcbiAgICAgIC8vICB7eyNpZiBuYW1lfX1vbi1jbGljaz17e3h4fX17eyNlbHNlfX1vbi10YXA9e3t9fXt7L2lmfX1cclxuXHJcbiAgICAgIG9wLnhlbnRpdHkgPSBmdW5jdGlvbihsbCl7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBsbC52YWx1ZSwgdmFsdWUsIG1vZGlmaWVyO1xyXG4gICAgICAgIGlmKGxsLnR5cGUgPT09ICdOQU1FJyl7XHJcbiAgICAgICAgICAvL0Agb25seSBmb3IgdGVzdFxyXG4gICAgICAgICAgaWYofm5hbWUuaW5kZXhPZignLicpKXtcclxuICAgICAgICAgICAgdmFyIHRtcCA9IG5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgbmFtZSA9IHRtcFswXTtcclxuICAgICAgICAgICAgbW9kaWZpZXIgPSB0bXBbMV1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiggdGhpcy5lYXQoXCI9XCIpICkgdmFsdWUgPSB0aGlzLmF0dHZhbHVlKG1vZGlmaWVyKTtcclxuICAgICAgICAgIHJldHVybiBub2RlLmF0dHJpYnV0ZSggbmFtZSwgdmFsdWUsIG1vZGlmaWVyICk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBpZiggbmFtZSAhPT0gJ2lmJykgdGhpcy5lcnJvcihcImN1cnJlbnQgdmVyc2lvbi4gT05MWSBSVUxFICNpZiAjZWxzZSAjZWxzZWlmIGlzIHZhbGlkIGluIHRhZywgdGhlIHJ1bGUgI1wiICsgbmFtZSArICcgaXMgaW52YWxpZCcpO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbJ2lmJ10odHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc3RhZyAgICAgOjo9ICAgICc8JyBOYW1lIChTIGF0dHIpKiBTPyAnPidcclxuICAgICAgLy8gYXR0ciAgICA6Oj0gICAgIE5hbWUgRXEgYXR0dmFsdWVcclxuICAgICAgb3AuYXR0cnMgPSBmdW5jdGlvbihpc0F0dHJpYnV0ZSl7XHJcbiAgICAgICAgdmFyIGVhdFxyXG4gICAgICAgIGlmKCFpc0F0dHJpYnV0ZSl7XHJcbiAgICAgICAgICBlYXQgPSBbXCJOQU1FXCIsIFwiT1BFTlwiXVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZWF0ID0gW1wiTkFNRVwiXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGF0dHJzID0gW10sIGxsO1xyXG4gICAgICAgIHdoaWxlIChsbCA9IHRoaXMuZWF0KGVhdCkpe1xyXG4gICAgICAgICAgYXR0cnMucHVzaCh0aGlzLnhlbnRpdHkoIGxsICkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdHRycztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXR0dmFsdWVcclxuICAgICAgLy8gIDogU1RSSU5HXHJcbiAgICAgIC8vICB8IE5BTUVcclxuICAgICAgb3AuYXR0dmFsdWUgPSBmdW5jdGlvbihtZGYpe1xyXG4gICAgICAgIHZhciBsbCA9IHRoaXMubGwoKTtcclxuICAgICAgICBzd2l0Y2gobGwudHlwZSl7XHJcbiAgICAgICAgICBjYXNlIFwiTkFNRVwiOlxyXG4gICAgICAgICAgY2FzZSBcIlVOUVwiOlxyXG4gICAgICAgICAgY2FzZSBcIlNUUklOR1wiOlxyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gbGwudmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgIGNhc2UgXCJFWFBSX09QRU5cIjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJwbGF0aW9uKCk7XHJcbiAgICAgICAgICBjYXNlIFwiQk9EWV9PUEVOXCI6XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9ncmFtKHRydWUpO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgdGhpcy5lcnJvcignVW5leHBlY3RlZCB0b2tlbjogJysgdGhpcy5sYSgpKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIHt7I319XHJcbiAgICAgIG9wLmRpcmVjdGl2ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmxsKCkudmFsdWU7XHJcbiAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXNbbmFtZV0gPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZV0oKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdGhpcy5lcnJvcignVW5kZWZpbmVkIGRpcmVjdGl2ZVsnKyBuYW1lICsnXScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgIC8vIHt7fX1cclxuICAgICAgb3AuaW50ZXJwbGF0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm1hdGNoKCdFWFBSX09QRU4nKTtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5leHByZXNzaW9uKHRydWUpO1xyXG4gICAgICAgIHRoaXMubWF0Y2goJ0VORCcpO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHt7fn19XHJcbiAgICAgIG9wLmluYyA9IG9wLmluY2x1ZGUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5leHByZXNzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5tYXRjaCgnRU5EJyk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUudGVtcGxhdGUoY29udGVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHt7I2lmfX1cclxuICAgICAgb3BbXCJpZlwiXSA9IGZ1bmN0aW9uKHRhZyl7XHJcbiAgICAgICAgdmFyIHRlc3QgPSB0aGlzLmV4cHJlc3Npb24oKTtcclxuICAgICAgICB2YXIgY29uc2VxdWVudCA9IFtdLCBhbHRlcm5hdGU9W107XHJcblxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSBjb25zZXF1ZW50O1xyXG4gICAgICAgIHZhciBzdGF0ZW1lbnQgPSAhdGFnPyBcInN0YXRlbWVudFwiIDogXCJhdHRyc1wiO1xyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKCdFTkQnKTtcclxuXHJcbiAgICAgICAgdmFyIGxsLCBjbG9zZTtcclxuICAgICAgICB3aGlsZSggISAoY2xvc2UgPSB0aGlzLmVhdCgnQ0xPU0UnKSkgKXtcclxuICAgICAgICAgIGxsID0gdGhpcy5sbCgpO1xyXG4gICAgICAgICAgaWYoIGxsLnR5cGUgPT09ICdPUEVOJyApe1xyXG4gICAgICAgICAgICBzd2l0Y2goIGxsLnZhbHVlICl7XHJcbiAgICAgICAgICAgICAgY2FzZSAnZWxzZSc6XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBhbHRlcm5hdGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2goICdFTkQnICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdlbHNlaWYnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGUucHVzaCggdGhpc1tcImlmXCJdKHRhZykgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlWydpZiddKCB0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUgKTtcclxuICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goIHRoaXNbc3RhdGVtZW50XSh0cnVlKSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29udGFpbmVyLnB1c2godGhpc1tzdGF0ZW1lbnRdKHRydWUpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgc3RhdGVtZW50IG5vdCBtYXRjaGVkXHJcbiAgICAgICAgaWYoY2xvc2UudmFsdWUgIT09IFwiaWZcIikgdGhpcy5lcnJvcignVW5tYXRjaGVkIGlmIGRpcmVjdGl2ZScpXHJcbiAgICAgICAgcmV0dXJuIG5vZGVbXCJpZlwiXSh0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLy8gQG1hcmsgICBtdXN0YWNoZSBzeW50YXggaGF2ZSBuYXRydXJlIGRpcywgY2Fub3Qgd2l0aCBleHByZXNzaW9uXHJcbiAgICAgIC8vIHt7I2xpc3R9fVxyXG4gICAgICBvcC5saXN0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBzZXF1ZW5jZSBjYW4gYmUgYSBsaXN0IG9yIGhhc2hcclxuICAgICAgICB2YXIgc2VxdWVuY2UgPSB0aGlzLmV4cHJlc3Npb24oKSwgdmFyaWFibGUsIGxsLCB0cmFjaztcclxuICAgICAgICB2YXIgY29uc2VxdWVudCA9IFtdLCBhbHRlcm5hdGU9W107XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGNvbnNlcXVlbnQ7XHJcblxyXG4gICAgICAgIHRoaXMubWF0Y2goJ0lERU5UJywgJ2FzJyk7XHJcblxyXG4gICAgICAgIHZhcmlhYmxlID0gdGhpcy5tYXRjaCgnSURFTlQnKS52YWx1ZTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5lYXQoJ0lERU5UJywgJ2J5Jykpe1xyXG4gICAgICAgICAgaWYodGhpcy5lYXQoJ0lERU5UJyx2YXJpYWJsZSArICdfaW5kZXgnKSl7XHJcbiAgICAgICAgICAgIHRyYWNrID0gdHJ1ZTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0cmFjayA9IHRoaXMuZXhwcmVzc2lvbigpO1xyXG4gICAgICAgICAgICBpZih0cmFjay5jb25zdGFudCl7XHJcbiAgICAgICAgICAgICAgLy8gdHJ1ZSBpcyBtZWFucyBjb25zdGFudCwgd2UgaGFuZGxlIGl0IGp1c3QgbGlrZSB4eHhfaW5kZXguXHJcbiAgICAgICAgICAgICAgdHJhY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hdGNoKCdFTkQnKTtcclxuXHJcbiAgICAgICAgd2hpbGUoICEobGwgPSB0aGlzLmVhdCgnQ0xPU0UnKSkgKXtcclxuICAgICAgICAgIGlmKHRoaXMuZWF0KCdPUEVOJywgJ2Vsc2UnKSl7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9ICBhbHRlcm5hdGU7XHJcbiAgICAgICAgICAgIHRoaXMubWF0Y2goJ0VORCcpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKHRoaXMuc3RhdGVtZW50KCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobGwudmFsdWUgIT09ICdsaXN0JykgdGhpcy5lcnJvcignZXhwZWN0ICcgKyAnbGlzdCBnb3QgJyArICcvJyArIGxsLnZhbHVlICsgJyAnLCBsbC5wb3MgKTtcclxuICAgICAgICByZXR1cm4gbm9kZS5saXN0KHNlcXVlbmNlLCB2YXJpYWJsZSwgY29uc2VxdWVudCwgYWx0ZXJuYXRlLCB0cmFjayk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICBvcC5leHByZXNzaW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZXhwcmVzc2lvbjtcclxuICAgICAgICBpZih0aGlzLmVhdCgnQCgnKSl7IC8vb25jZSBiaW5kXHJcbiAgICAgICAgICBleHByZXNzaW9uID0gdGhpcy5leHByKCk7XHJcbiAgICAgICAgICBleHByZXNzaW9uLm9uY2UgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5tYXRjaCgnKScpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBleHByZXNzaW9uID0gdGhpcy5leHByKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleHByZXNzaW9uO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvcC5leHByID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRlcGVuZCA9IFtdO1xyXG5cclxuICAgICAgICB2YXIgYnVmZmVyID0gdGhpcy5maWx0ZXIoKVxyXG5cclxuICAgICAgICB2YXIgYm9keSA9IGJ1ZmZlci5nZXQgfHwgYnVmZmVyO1xyXG4gICAgICAgIHZhciBzZXRib2R5ID0gYnVmZmVyLnNldDtcclxuICAgICAgICByZXR1cm4gbm9kZS5leHByZXNzaW9uKGJvZHksIHNldGJvZHksICF0aGlzLmRlcGVuZC5sZW5ndGgsIGJ1ZmZlci5maWx0ZXJzKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIGZpbHRlclxyXG4gICAgICAvLyBhc3NpZ24gKCd8JyBmaWx0ZXJuYW1lWyc6JyBhcmdzXSkgKlxyXG4gICAgICBvcC5maWx0ZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5hc3NpZ24oKTtcclxuICAgICAgICB2YXIgbGwgPSB0aGlzLmVhdCgnfCcpO1xyXG4gICAgICAgIHZhciBidWZmZXIgPSBbXSwgZmlsdGVycyxzZXRCdWZmZXIsIHByZWZpeCxcclxuICAgICAgICAgIGF0dHIgPSBcInRcIixcclxuICAgICAgICAgIHNldCA9IGxlZnQuc2V0LCBnZXQsXHJcbiAgICAgICAgICB0bXAgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZihsbCl7XHJcbiAgICAgICAgICBpZihzZXQpIHtcclxuICAgICAgICAgICAgc2V0QnVmZmVyID0gW107XHJcbiAgICAgICAgICAgIGZpbHRlcnMgPSBbXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBwcmVmaXggPSBcIihmdW5jdGlvbihcIiArIGF0dHIgKyBcIil7XCI7XHJcblxyXG4gICAgICAgICAgZG97XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJOYW1lID0gdGhpcy5tYXRjaCgnSURFTlQnKS52YWx1ZTtcclxuICAgICAgICAgICAgdG1wID0gYXR0ciArIFwiID0gXCIgKyBjdHhOYW1lICsgXCIuX2ZfKCdcIiArIGZpbHRlck5hbWUgKyBcIicgKS5nZXQuY2FsbCggXCIrXy5jdHhOYW1lICtcIixcIiArIGF0dHIgO1xyXG4gICAgICAgICAgICBpZih0aGlzLmVhdCgnOicpKXtcclxuICAgICAgICAgICAgICB0bXAgKz1cIiwgXCIrIHRoaXMuYXJndW1lbnRzKFwifFwiKS5qb2luKFwiLFwiKSArIFwiKTtcIlxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0bXAgKz0gJyk7J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmZlci5wdXNoKHRtcCk7XHJcblxyXG4gICAgICAgICAgICBpZihzZXQpe1xyXG4gICAgICAgICAgICAgIC8vIG9ubHkgaW4gcnVudGltZSAsd2UgY2FuIGRldGVjdCAgd2hldGhlciAgdGhlIGZpbHRlciBoYXMgYSBzZXQgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgICAgZmlsdGVycy5wdXNoKGZpbHRlck5hbWUpO1xyXG4gICAgICAgICAgICAgIHNldEJ1ZmZlci51bnNoaWZ0KCB0bXAucmVwbGFjZShcIiApLmdldC5jYWxsXCIsIFwiICkuc2V0LmNhbGxcIikgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH13aGlsZShsbCA9IHRoaXMuZWF0KCd8JykpO1xyXG4gICAgICAgICAgYnVmZmVyLnB1c2goXCJyZXR1cm4gXCIgKyBhdHRyICk7XHJcbiAgICAgICAgICBzZXRCdWZmZXIgJiYgc2V0QnVmZmVyLnB1c2goXCJyZXR1cm4gXCIgKyBhdHRyKTtcclxuXHJcbiAgICAgICAgICBnZXQgPSAgcHJlZml4ICsgYnVmZmVyLmpvaW4oXCJcIikgKyBcIn0pKFwiK2xlZnQuZ2V0K1wiKVwiO1xyXG4gICAgICAgICAgLy8gd2UgY2FsbCBiYWNrIHRvIHZhbHVlLlxyXG4gICAgICAgICAgaWYoc2V0QnVmZmVyKXtcclxuICAgICAgICAgICAgLy8gY2hhbmdlIF9zc19fKG5hbWUsIF9wXykgdG8gX3NfXyhuYW1lLCBmaWx0ZXJGbihfcF8pKTtcclxuICAgICAgICAgICAgc2V0ID0gc2V0LnJlcGxhY2UoXy5zZXROYW1lLFxyXG4gICAgICAgICAgICAgIHByZWZpeCArIHNldEJ1ZmZlci5qb2luKFwiXCIpICsgXCJ9KShcIivjgIBfLnNldE5hbWXjgIArXCIpXCIgKTtcclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyB0aGUgc2V0IGZ1bmN0aW9uIGlzIGRlcGVuZCBvbiB0aGUgZmlsdGVyIGRlZmluaXRpb24uIGlmIGl0IGhhdmUgc2V0IG1ldGhvZCwgdGhlIHNldCB3aWxsIHdvcmtcclxuICAgICAgICAgIHZhciByZXQgPSBnZXRzZXQoZ2V0LCBzZXQpO1xyXG4gICAgICAgICAgcmV0LmZpbHRlcnMgPSBmaWx0ZXJzO1xyXG4gICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGFzc2lnblxyXG4gICAgICAvLyBsZWZ0LWhhbmQtZXhwciA9IGNvbmRpdGlvblxyXG4gICAgICBvcC5hc3NpZ24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5jb25kaXRpb24oKSwgbGw7XHJcbiAgICAgICAgaWYobGwgPSB0aGlzLmVhdChbJz0nLCAnKz0nLCAnLT0nLCAnKj0nLCAnLz0nLCAnJT0nXSkpe1xyXG4gICAgICAgICAgaWYoIWxlZnQuc2V0KSB0aGlzLmVycm9yKCdpbnZhbGlkIGxlZnRoYW5kIGV4cHJlc3Npb24gaW4gYXNzaWdubWVudCBleHByZXNzaW9uJyk7XHJcbiAgICAgICAgICByZXR1cm4gZ2V0c2V0KCBsZWZ0LnNldC5yZXBsYWNlKCBcIixcIiArIF8uc2V0TmFtZSwgXCIsXCIgKyB0aGlzLmNvbmRpdGlvbigpLmdldCApLnJlcGxhY2UoXCInPSdcIiwgXCInXCIrbGwudHlwZStcIidcIiksIGxlZnQuc2V0KTtcclxuICAgICAgICAgIC8vIHJldHVybiBnZXRzZXQoJygnICsgbGVmdC5nZXQgKyBsbC50eXBlICArIHRoaXMuY29uZGl0aW9uKCkuZ2V0ICsgJyknLCBsZWZ0LnNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBvclxyXG4gICAgICAvLyBvciA/IGFzc2lnbiA6IGFzc2lnblxyXG4gICAgICBvcC5jb25kaXRpb24gPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgdGVzdCA9IHRoaXMub3IoKTtcclxuICAgICAgICBpZih0aGlzLmVhdCgnPycpKXtcclxuICAgICAgICAgIHJldHVybiBnZXRzZXQoW3Rlc3QuZ2V0ICsgXCI/XCIsXHJcbiAgICAgICAgICAgIHRoaXMuYXNzaWduKCkuZ2V0LFxyXG4gICAgICAgICAgICB0aGlzLm1hdGNoKFwiOlwiKS50eXBlLFxyXG4gICAgICAgICAgICB0aGlzLmFzc2lnbigpLmdldF0uam9pbihcIlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGVzdDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYW5kXHJcbiAgICAgIC8vIGFuZCAmJiBvclxyXG4gICAgICBvcC5vciA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5hbmQoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5lYXQoJ3x8Jykpe1xyXG4gICAgICAgICAgcmV0dXJuIGdldHNldChsZWZ0LmdldCArICd8fCcgKyB0aGlzLm9yKCkuZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGVxdWFsXHJcbiAgICAgIC8vIGVxdWFsICYmIGFuZFxyXG4gICAgICBvcC5hbmQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgbGVmdCA9IHRoaXMuZXF1YWwoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5lYXQoJyYmJykpe1xyXG4gICAgICAgICAgcmV0dXJuIGdldHNldChsZWZ0LmdldCArICcmJicgKyB0aGlzLmFuZCgpLmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZWZ0O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJlbGF0aW9uXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIGVxdWFsID09IHJlbGF0aW9uXHJcbiAgICAgIC8vIGVxdWFsICE9IHJlbGF0aW9uXHJcbiAgICAgIC8vIGVxdWFsID09PSByZWxhdGlvblxyXG4gICAgICAvLyBlcXVhbCAhPT0gcmVsYXRpb25cclxuICAgICAgb3AuZXF1YWwgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5yZWxhdGlvbigpLCBsbDtcclxuICAgICAgICAvLyBAcGVyZjtcclxuICAgICAgICBpZiggbGwgPSB0aGlzLmVhdChbJz09JywnIT0nLCAnPT09JywgJyE9PSddKSl7XHJcbiAgICAgICAgICByZXR1cm4gZ2V0c2V0KGxlZnQuZ2V0ICsgbGwudHlwZSArIHRoaXMuZXF1YWwoKS5nZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdFxyXG4gICAgICB9XHJcbiAgICAgIC8vIHJlbGF0aW9uIDwgYWRkaXRpdmVcclxuICAgICAgLy8gcmVsYXRpb24gPiBhZGRpdGl2ZVxyXG4gICAgICAvLyByZWxhdGlvbiA8PSBhZGRpdGl2ZVxyXG4gICAgICAvLyByZWxhdGlvbiA+PSBhZGRpdGl2ZVxyXG4gICAgICAvLyByZWxhdGlvbiBpbiBhZGRpdGl2ZVxyXG4gICAgICBvcC5yZWxhdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxlZnQgPSB0aGlzLmFkZGl0aXZlKCksIGxsO1xyXG4gICAgICAgIC8vIEBwZXJmXHJcbiAgICAgICAgaWYobGwgPSAodGhpcy5lYXQoWyc8JywgJz4nLCAnPj0nLCAnPD0nXSkgfHwgdGhpcy5lYXQoJ0lERU5UJywgJ2luJykgKSl7XHJcbiAgICAgICAgICByZXR1cm4gZ2V0c2V0KGxlZnQuZ2V0ICsgbGwudmFsdWUgKyB0aGlzLnJlbGF0aW9uKCkuZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlZnRcclxuICAgICAgfVxyXG4gICAgICAvLyBhZGRpdGl2ZSA6XHJcbiAgICAgIC8vIG11bHRpdmVcclxuICAgICAgLy8gYWRkaXRpdmUgKyBtdWx0aXZlXHJcbiAgICAgIC8vIGFkZGl0aXZlIC0gbXVsdGl2ZVxyXG4gICAgICBvcC5hZGRpdGl2ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxlZnQgPSB0aGlzLm11bHRpdmUoKSAsbGw7XHJcbiAgICAgICAgaWYobGw9IHRoaXMuZWF0KFsnKycsJy0nXSkgKXtcclxuICAgICAgICAgIHJldHVybiBnZXRzZXQobGVmdC5nZXQgKyBsbC52YWx1ZSArIHRoaXMuYWRkaXRpdmUoKS5nZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdFxyXG4gICAgICB9XHJcbiAgICAgIC8vIG11bHRpdmUgOlxyXG4gICAgICAvLyB1bmFyeVxyXG4gICAgICAvLyBtdWx0aXZlICogdW5hcnlcclxuICAgICAgLy8gbXVsdGl2ZSAvIHVuYXJ5XHJcbiAgICAgIC8vIG11bHRpdmUgJSB1bmFyeVxyXG4gICAgICBvcC5tdWx0aXZlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbGVmdCA9IHRoaXMucmFuZ2UoKSAsbGw7XHJcbiAgICAgICAgaWYoIGxsID0gdGhpcy5lYXQoWycqJywgJy8nICwnJSddKSApe1xyXG4gICAgICAgICAgcmV0dXJuIGdldHNldChsZWZ0LmdldCArIGxsLnR5cGUgKyB0aGlzLm11bHRpdmUoKS5nZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgICAgfVxyXG5cclxuICAgICAgb3AucmFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy51bmFyeSgpLCBsbCwgcmlnaHQ7XHJcblxyXG4gICAgICAgIGlmKGxsID0gdGhpcy5lYXQoJy4uJykpe1xyXG4gICAgICAgICAgcmlnaHQgPSB0aGlzLnVuYXJ5KCk7XHJcbiAgICAgICAgICB2YXIgYm9keSA9XHJcbiAgICAgICAgICAgIFwiKGZ1bmN0aW9uKHN0YXJ0LGVuZCl7dmFyIHJlcyA9IFtdLHN0ZXA9ZW5kPnN0YXJ0PzE6LTE7IGZvcih2YXIgaSA9IHN0YXJ0OyBlbmQ+c3RhcnQ/aSA8PSBlbmQ6IGk+PWVuZDsgaT1pK3N0ZXApe3Jlcy5wdXNoKGkpOyB9IHJldHVybiByZXMgfSkoXCIrbGVmdC5nZXQrXCIsXCIrcmlnaHQuZ2V0K1wiKVwiXHJcbiAgICAgICAgICByZXR1cm4gZ2V0c2V0KGJvZHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxlZnQ7XHJcbiAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgLy8gbGVmdGhhbmRcclxuICAgICAgLy8gKyB1bmFyeVxyXG4gICAgICAvLyAtIHVuYXJ5XHJcbiAgICAgIC8vIH4gdW5hcnlcclxuICAgICAgLy8gISB1bmFyeVxyXG4gICAgICBvcC51bmFyeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxsO1xyXG4gICAgICAgIGlmKGxsID0gdGhpcy5lYXQoWycrJywnLScsJ34nLCAnISddKSl7XHJcbiAgICAgICAgICByZXR1cm4gZ2V0c2V0KCcoJyArIGxsLnR5cGUgKyB0aGlzLnVuYXJ5KCkuZ2V0ICsgJyknKSA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5tZW1iZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY2FsbFtsZWZ0aGFuZF0gOlxyXG4gICAgICAvLyBtZW1iZXIgYXJnc1xyXG4gICAgICAvLyBtZW1iZXIgWyBleHByZXNzaW9uIF1cclxuICAgICAgLy8gbWVtYmVyIC4gaWRlbnRcclxuXHJcbiAgICAgIG9wLm1lbWJlciA9IGZ1bmN0aW9uKGJhc2UsIGxhc3QsIHBhdGhlcywgcHJldkJhc2Upe1xyXG4gICAgICAgIHZhciBsbCwgcGF0aDtcclxuXHJcblxyXG4gICAgICAgIHZhciBvbmx5U2ltcGxlQWNjZXNzb3IgPSBmYWxzZTtcclxuICAgICAgICBpZighYmFzZSl7IC8vZmlyc3RcclxuICAgICAgICAgIHBhdGggPSB0aGlzLnByaW1hcnkoKTtcclxuICAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIHBhdGg7XHJcbiAgICAgICAgICBpZih0eXBlID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgIHBhdGhlcyA9IFtdO1xyXG4gICAgICAgICAgICBwYXRoZXMucHVzaCggcGF0aCApO1xyXG4gICAgICAgICAgICBsYXN0ID0gcGF0aDtcclxuICAgICAgICAgICAgYmFzZSA9IGN0eE5hbWUgKyBcIi5fc2dfKCdcIiArIHBhdGggKyBcIicsIFwiICsgdmFyTmFtZSArIFwiLCBcIiArIGV4dE5hbWUgKyBcIilcIjtcclxuICAgICAgICAgICAgb25seVNpbXBsZUFjY2Vzc29yID0gdHJ1ZTtcclxuICAgICAgICAgIH1lbHNleyAvL1ByaW1hdGl2ZSBUeXBlXHJcbiAgICAgICAgICAgIGlmKHBhdGguZ2V0ID09PSAndGhpcycpe1xyXG4gICAgICAgICAgICAgIGJhc2UgPSBjdHhOYW1lO1xyXG4gICAgICAgICAgICAgIHBhdGhlcyA9IFsndGhpcyddO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBwYXRoZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgIGJhc2UgPSBwYXRoLmdldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNleyAvLyBub3QgZmlyc3QgZW50ZXJcclxuICAgICAgICAgIGlmKHR5cGVvZiBsYXN0ID09PSAnc3RyaW5nJyAmJiBpc1BhdGgoIGxhc3QpICl7IC8vIGlzIHZhbGlkIHBhdGhcclxuICAgICAgICAgICAgcGF0aGVzLnB1c2gobGFzdCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYocGF0aGVzICYmIHBhdGhlcy5sZW5ndGgpIHRoaXMuZGVwZW5kLnB1c2gocGF0aGVzKTtcclxuICAgICAgICAgICAgcGF0aGVzID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobGwgPSB0aGlzLmVhdChbJ1snLCAnLicsICcoJ10pKXtcclxuICAgICAgICAgIHN3aXRjaChsbC50eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAnLic6XHJcbiAgICAgICAgICAgICAgLy8gbWVtYmVyKG9iamVjdCwgcHJvcGVydHksIGNvbXB1dGVkKVxyXG4gICAgICAgICAgICAgIHZhciB0bXBOYW1lID0gdGhpcy5tYXRjaCgnSURFTlQnKS52YWx1ZTtcclxuICAgICAgICAgICAgICBwcmV2QmFzZSA9IGJhc2U7XHJcbiAgICAgICAgICAgICAgaWYoIHRoaXMubGEoKSAhPT0gXCIoXCIgKXtcclxuICAgICAgICAgICAgICAgIGJhc2UgPSBjdHhOYW1lICsgXCIuX3NnXygnXCIgKyB0bXBOYW1lICsgXCInLCBcIiArIGJhc2UgKyBcIilcIjtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGJhc2UgKz0gXCIuXCIgKyB0bXBOYW1lIDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVyKCBiYXNlLCB0bXBOYW1lLCBwYXRoZXMsICBwcmV2QmFzZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJ1snOlxyXG4gICAgICAgICAgICAgIC8vIG1lbWJlcihvYmplY3QsIHByb3BlcnR5LCBjb21wdXRlZClcclxuICAgICAgICAgICAgICBwYXRoID0gdGhpcy5hc3NpZ24oKTtcclxuICAgICAgICAgICAgICBwcmV2QmFzZSA9IGJhc2U7XHJcbiAgICAgICAgICAgICAgaWYoIHRoaXMubGEoKSAhPT0gXCIoXCIgKXtcclxuICAgICAgICAgICAgICAgIC8vIG1lYW5zIGZ1bmN0aW9uIGNhbGwsIHdlIG5lZWQgdGhyb3cgdW5kZWZpbmVkIGVycm9yIHdoZW4gY2FsbCBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgLy8gYW5kIGNvbmZpcm0gdGhhdCB0aGUgZnVuY3Rpb24gY2FsbCB3b250IGxvc2UgaXRzIGNvbnRleHRcclxuICAgICAgICAgICAgICAgIGJhc2UgPSBjdHhOYW1lICsgXCIuX3NnXyhcIiArIHBhdGguZ2V0ICsgXCIsIFwiICsgYmFzZSArIFwiKVwiO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYmFzZSArPSBcIltcIiArIHBhdGguZ2V0ICsgXCJdXCI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMubWF0Y2goJ10nKVxyXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbWJlcihiYXNlLCBwYXRoLCBwYXRoZXMsIHByZXZCYXNlKTtcclxuICAgICAgICAgICAgY2FzZSAnKCc6XHJcbiAgICAgICAgICAgICAgLy8gY2FsbChjYWxsZWUsIGFyZ3MpXHJcblxyXG4gICAgICAgICAgICAgIGJhc2UgPSBiYXNlLnJlcGxhY2UoaXNMYXN0QmluZCwgJy5fX2JpbmRfXycpXHJcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSB0aGlzLmFyZ3VtZW50cygpLmpvaW4oJywnKTtcclxuXHJcbiAgICAgICAgICAgICAgYmFzZSA9ICBiYXNlK1wiKFwiICsgYXJncyArXCIpXCI7XHJcbiAgICAgICAgICAgICAgdGhpcy5tYXRjaCgnKScpXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVtYmVyKGJhc2UsIG51bGwsIHBhdGhlcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBwYXRoZXMgJiYgcGF0aGVzLmxlbmd0aCApIHRoaXMuZGVwZW5kLnB1c2goIHBhdGhlcyApO1xyXG4gICAgICAgIHZhciByZXMgPSAge2dldDogYmFzZX07XHJcbiAgICAgICAgaWYobGFzdCl7XHJcbiAgICAgICAgICByZXMuc2V0ID0gY3R4TmFtZSArIFwiLl9zc18oXCIgK1xyXG4gICAgICAgICAgICAobGFzdC5nZXQ/IGxhc3QuZ2V0IDogXCInXCIrIGxhc3QgKyBcIidcIikgK1xyXG4gICAgICAgICAgICBcIixcIisgXy5zZXROYW1lICsgXCIsXCIrXHJcbiAgICAgICAgICAgIChwcmV2QmFzZT9wcmV2QmFzZTpfLnZhck5hbWUpICtcclxuICAgICAgICAgICAgXCIsICc9JywgXCIrICggb25seVNpbXBsZUFjY2Vzc29yPyAxIDogMCApICsgXCIpXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICpcclxuICAgICAgICovXHJcbiAgICAgIG9wLmFyZ3VtZW50cyA9IGZ1bmN0aW9uKGVuZCl7XHJcbiAgICAgICAgZW5kID0gZW5kIHx8ICcpJ1xyXG4gICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgZG97XHJcbiAgICAgICAgICBpZih0aGlzLmxhKCkgIT09IGVuZCl7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmFzc2lnbigpLmdldClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9d2hpbGUoIHRoaXMuZWF0KCcsJykpO1xyXG4gICAgICAgIHJldHVybiBhcmdzXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvLyBwcmltYXJ5IDpcclxuICAgICAgLy8gdGhpc1xyXG4gICAgICAvLyBpZGVudFxyXG4gICAgICAvLyBsaXRlcmFsXHJcbiAgICAgIC8vIGFycmF5XHJcbiAgICAgIC8vIG9iamVjdFxyXG4gICAgICAvLyAoIGV4cHJlc3Npb24gKVxyXG5cclxuICAgICAgb3AucHJpbWFyeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGxsID0gdGhpcy5sbCgpO1xyXG4gICAgICAgIHN3aXRjaChsbC50eXBlKXtcclxuICAgICAgICAgIGNhc2UgXCJ7XCI6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdCgpO1xyXG4gICAgICAgICAgY2FzZSBcIltcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXkoKTtcclxuICAgICAgICAgIGNhc2UgXCIoXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVuKCk7XHJcbiAgICAgICAgICAvLyBsaXRlcmFsIG9yIGlkZW50XHJcbiAgICAgICAgICBjYXNlICdTVFJJTkcnOlxyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gXCJcIiArIGxsLnZhbHVlO1xyXG4gICAgICAgICAgICB2YXIgcXVvdGEgPSB+dmFsdWUuaW5kZXhPZihcIidcIik/IFwiXFxcIlwiOiBcIidcIiA7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRzZXQocXVvdGEgKyB2YWx1ZSArIHF1b3RhKTtcclxuICAgICAgICAgIGNhc2UgJ05VTUJFUic6XHJcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0c2V0KCBcIlwiICsgbGwudmFsdWUgKTtcclxuICAgICAgICAgIGNhc2UgXCJJREVOVFwiOlxyXG4gICAgICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgICAgICAgICAgaWYoaXNLZXlXb3JkKGxsLnZhbHVlKSl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGdldHNldCggbGwudmFsdWUgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGwudmFsdWU7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICB0aGlzLmVycm9yKCdVbmV4cGVjdGVkIFRva2VuOiAnICsgbGwudHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBvYmplY3RcclxuICAgICAgLy8gIHtwcm9wQXNzaWduIFssIHByb3BBc3NpZ25dICogWyxdfVxyXG5cclxuICAgICAgLy8gcHJvcEFzc2lnblxyXG4gICAgICAvLyAgcHJvcCA6IGFzc2lnblxyXG5cclxuICAgICAgLy8gcHJvcFxyXG4gICAgICAvLyAgU1RSSU5HXHJcbiAgICAgIC8vICBJREVOVFxyXG4gICAgICAvLyAgTlVNQkVSXHJcblxyXG4gICAgICBvcC5vYmplY3QgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjb2RlID0gW3RoaXMubWF0Y2goJ3snKS50eXBlXTtcclxuXHJcbiAgICAgICAgdmFyIGxsID0gdGhpcy5lYXQoIFsnU1RSSU5HJywgJ0lERU5UJywgJ05VTUJFUiddICk7XHJcbiAgICAgICAgd2hpbGUobGwpe1xyXG4gICAgICAgICAgY29kZS5wdXNoKFwiJ1wiICsgbGwudmFsdWUgKyBcIidcIiArIHRoaXMubWF0Y2goJzonKS50eXBlKTtcclxuICAgICAgICAgIHZhciBnZXQgPSB0aGlzLmFzc2lnbigpLmdldDtcclxuICAgICAgICAgIGNvZGUucHVzaChnZXQpO1xyXG4gICAgICAgICAgbGwgPSBudWxsO1xyXG4gICAgICAgICAgaWYodGhpcy5lYXQoXCIsXCIpICYmIChsbCA9IHRoaXMuZWF0KFsnU1RSSU5HJywgJ0lERU5UJywgJ05VTUJFUiddKSkgKSBjb2RlLnB1c2goXCIsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2RlLnB1c2godGhpcy5tYXRjaCgnfScpLnR5cGUpO1xyXG4gICAgICAgIHJldHVybiB7Z2V0OiBjb2RlLmpvaW4oXCJcIil9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGFycmF5XHJcbiAgICAgIC8vIFsgYXNzaWduWyxhc3NpZ25dKl1cclxuICAgICAgb3AuYXJyYXkgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBjb2RlID0gW3RoaXMubWF0Y2goJ1snKS50eXBlXSwgaXRlbTtcclxuICAgICAgICBpZiggdGhpcy5lYXQoXCJdXCIpICl7XHJcblxyXG4gICAgICAgICAgY29kZS5wdXNoKFwiXVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2hpbGUoaXRlbSA9IHRoaXMuYXNzaWduKCkpe1xyXG4gICAgICAgICAgICBjb2RlLnB1c2goaXRlbS5nZXQpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmVhdCgnLCcpKSBjb2RlLnB1c2goXCIsXCIpO1xyXG4gICAgICAgICAgICBlbHNlIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29kZS5wdXNoKHRoaXMubWF0Y2goJ10nKS50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtnZXQ6IGNvZGUuam9pbihcIlwiKX07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vICcoJyBleHByZXNzaW9uICcpJ1xyXG4gICAgICBvcC5wYXJlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5tYXRjaCgnKCcpO1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLmZpbHRlcigpXHJcbiAgICAgICAgcmVzLmdldCA9ICcoJyArIHJlcy5nZXQgKyAnKSc7XHJcbiAgICAgICAgcmVzLnNldCA9IHJlcy5zZXQ7XHJcbiAgICAgICAgdGhpcy5tYXRjaCgnKScpO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIGdldHNldChnZXQsIHNldCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGdldDogZ2V0LFxyXG4gICAgICAgICAgc2V0OiBzZXRcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XHJcblxyXG5cclxuICAgICAgLyoqKi8gfSxcclxuICAgIC8qIDExICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcbiAgICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgICAgIGVsZW1lbnQ6IGZ1bmN0aW9uKG5hbWUsIGF0dHJzLCBjaGlsZHJlbil7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnZWxlbWVudCcsXHJcbiAgICAgICAgICAgIHRhZzogbmFtZSxcclxuICAgICAgICAgICAgYXR0cnM6IGF0dHJzLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGF0dHJpYnV0ZTogZnVuY3Rpb24obmFtZSwgdmFsdWUsIG1kZil7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnYXR0cmlidXRlJyxcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBtZGY6IG1kZlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJpZlwiOiBmdW5jdGlvbih0ZXN0LCBjb25zZXF1ZW50LCBhbHRlcm5hdGUpe1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2lmJyxcclxuICAgICAgICAgICAgdGVzdDogdGVzdCxcclxuICAgICAgICAgICAgY29uc2VxdWVudDogY29uc2VxdWVudCxcclxuICAgICAgICAgICAgYWx0ZXJuYXRlOiBhbHRlcm5hdGVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpc3Q6IGZ1bmN0aW9uKHNlcXVlbmNlLCB2YXJpYWJsZSwgYm9keSwgYWx0ZXJuYXRlLCB0cmFjayl7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnbGlzdCcsXHJcbiAgICAgICAgICAgIHNlcXVlbmNlOiBzZXF1ZW5jZSxcclxuICAgICAgICAgICAgYWx0ZXJuYXRlOiBhbHRlcm5hdGUsXHJcbiAgICAgICAgICAgIHZhcmlhYmxlOiB2YXJpYWJsZSxcclxuICAgICAgICAgICAgYm9keTogYm9keSxcclxuICAgICAgICAgICAgdHJhY2s6IHRyYWNrXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBleHByZXNzaW9uOiBmdW5jdGlvbiggYm9keSwgc2V0Ym9keSwgY29uc3RhbnQsIGZpbHRlcnMgKXtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiZXhwcmVzc2lvblwiLFxyXG4gICAgICAgICAgICBib2R5OiBib2R5LFxyXG4gICAgICAgICAgICBjb25zdGFudDogY29uc3RhbnQgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIHNldGJvZHk6IHNldGJvZHkgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlcnNcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHt+IDxkaXY+e25hbWV9PC9kaXY+fVxyXG4gICAgICAgIGJvZHk6IGZ1bmN0aW9uKCBib2R5ICl7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiBcImJvZHlcIixcclxuICAgICAgICAgICAgYm9keTogYm9keVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGV4dDogZnVuY3Rpb24odGV4dCl7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiBcInRleHRcIixcclxuICAgICAgICAgICAgdGV4dDogdGV4dFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uKHRlbXBsYXRlKXtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZW1wbGF0ZScsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHRlbXBsYXRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLyoqKi8gfSxcclxuICAgIC8qIDEyICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIC8vIChjKSAyMDEwLTIwMTQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuICAgICAgLy8gQmFja2JvbmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAgICAgIC8vIEZvciBhbGwgZGV0YWlscyBhbmQgZG9jdW1lbnRhdGlvbjpcclxuICAgICAgLy8gaHR0cDovL2JhY2tib25lanMub3JnXHJcblxyXG4gICAgICAvLyBrbGFzczogYSBjbGFzc2ljYWwgSlMgT09QIGZhw6dhZGVcclxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2RlZC9rbGFzc1xyXG4gICAgICAvLyBMaWNlbnNlIE1JVCAoYykgRHVzdGluIERpYXogMjAxNFxyXG5cclxuICAgICAgLy8gaW5zcGlyZWQgYnkgYmFja2JvbmUncyBleHRlbmQgYW5kIGtsYXNzXHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKSxcclxuICAgICAgICBmblRlc3QgPSAveHkvLnRlc3QoZnVuY3Rpb24oKXtcInh5XCI7fSkgPyAvXFxic3VwclxcYi86Ly4qLyxcclxuICAgICAgICBpc0ZuID0gZnVuY3Rpb24obyl7cmV0dXJuIHR5cGVvZiBvID09PSBcImZ1bmN0aW9uXCJ9O1xyXG5cclxuICAgICAgdmFyIGhvb2tzID0ge1xyXG4gICAgICAgIGV2ZW50czogZnVuY3Rpb24oIHByb3BlcnR5VmFsdWUsIHByb3RvICl7XHJcbiAgICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBwcm90by5fZXZlbnRMaXN0ZW5lcnMgfHwgW107XHJcbiAgICAgICAgICB2YXIgbm9ybWVkRXZlbnRzID0gXy5ub3JtTGlzdGVuZXIocHJvcGVydHlWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgaWYobm9ybWVkRXZlbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBwcm90by5fZXZlbnRMaXN0ZW5lcnMgPSBldmVudExpc3RlbmVycy5jb25jYXQoIG5vcm1lZEV2ZW50cyApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIHByb3RvLmV2ZW50cyA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgZnVuY3Rpb24gd3JhcCggaywgZm4sIHN1cHJvICkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICB2YXIgdG1wID0gdGhpcy5zdXByO1xyXG4gICAgICAgICAgdGhpcy5zdXByID0gc3Vwcm9ba107XHJcbiAgICAgICAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIHRoaXMuc3VwciA9IHRtcDtcclxuICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBwcm9jZXNzKCB3aGF0LCBvLCBzdXBybyApIHtcclxuICAgICAgICBmb3IgKCB2YXIgayBpbiBvICkge1xyXG4gICAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoaykpIHtcclxuICAgICAgICAgICAgaWYoaG9va3MuaGFzT3duUHJvcGVydHkoaykpIHtcclxuICAgICAgICAgICAgICBob29rc1trXShvW2tdLCB3aGF0LCBzdXBybylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGF0W2tdID0gaXNGbiggb1trXSApICYmIGlzRm4oIHN1cHJvW2tdICkgJiZcclxuICAgICAgICAgICAgZm5UZXN0LnRlc3QoIG9ba10gKSA/IHdyYXAoaywgb1trXSwgc3Vwcm8pIDogb1trXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBbXCJldmVudHNcIiwgXCJkYXRhXCIsIFwiY29tcHV0ZWRcIl0gLCB3ZSBzaG91bGQgbWVyZ2UgdGhlbVxyXG4gICAgICB2YXIgbWVyZ2VkID0gW1wiZGF0YVwiLCBcImNvbXB1dGVkXCJdLCBtbGVuID0gbWVyZ2VkLmxlbmd0aDtcclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQobyl7XHJcbiAgICAgICAgbyA9IG8gfHwge307XHJcbiAgICAgICAgdmFyIHN1cHIgPSB0aGlzLCBwcm90byxcclxuICAgICAgICAgIHN1cHJvID0gc3VwciAmJiBzdXByLnByb3RvdHlwZSB8fCB7fTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIG8gPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgcHJvdG8gPSBvLnByb3RvdHlwZTtcclxuICAgICAgICAgIG8uaW1wbGVtZW50ID0gaW1wbGVtZW50O1xyXG4gICAgICAgICAgby5leHRlbmQgPSBleHRlbmQ7XHJcbiAgICAgICAgICByZXR1cm4gbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZuKCkge1xyXG4gICAgICAgICAgc3Vwci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdG8gPSBfLmNyZWF0ZVByb3RvKGZuLCBzdXBybyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGltcGxlbWVudChvKXtcclxuICAgICAgICAgIC8vIHdlIG5lZWQgbWVyZ2UgdGhlIG1lcmdlZCBwcm9wZXJ0eVxyXG4gICAgICAgICAgdmFyIGxlbiA9IG1sZW47XHJcbiAgICAgICAgICBmb3IoO2xlbi0tOyl7XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gbWVyZ2VkW2xlbl07XHJcbiAgICAgICAgICAgIGlmKHByb3RvW3Byb3BdICYmIG8uaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvdG8uaGFzT3duUHJvcGVydHkocHJvcCkpe1xyXG4gICAgICAgICAgICAgIF8uZXh0ZW5kKHByb3RvW3Byb3BdLCBvW3Byb3BdLCB0cnVlKVxyXG4gICAgICAgICAgICAgIGRlbGV0ZSBvW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIHByb2Nlc3MocHJvdG8sIG8sIHN1cHJvKTtcclxuICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBmbi5pbXBsZW1lbnQgPSBpbXBsZW1lbnRcclxuICAgICAgICBmbi5pbXBsZW1lbnQobylcclxuICAgICAgICBpZihzdXByLl9fYWZ0ZXJfXykgc3Vwci5fX2FmdGVyX18uY2FsbChmbiwgc3Vwciwgbyk7XHJcbiAgICAgICAgZm4uZXh0ZW5kID0gZXh0ZW5kO1xyXG4gICAgICAgIHJldHVybiBmbjtcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMTMgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuICAgICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xyXG4gICAgICB2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcclxuICAgICAgdmFyIHBhcnNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XHJcbiAgICAgIHZhciBub2RlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XHJcblxyXG5cclxuICAgICAgZnVuY3Rpb24gaW5pdERlZmluaXRpb24oY29udGV4dCwgZGVmaW5pdGlvbiwgYmVmb3JlQ29uZmlnKXtcclxuXHJcbiAgICAgICAgdmFyIGV2ZW50Q29uZmlnLCBoYXNJbnN0YW5jZUNvbXB1dGVkID0gISFkZWZpbml0aW9uLmNvbXB1dGVkLCB0ZW1wbGF0ZTtcclxuICAgICAgICB2YXIgdXNlUHJvdG90eWVTdHJpbmcgPSB0eXBlb2YgY29udGV4dC50ZW1wbGF0ZSA9PT0gJ3N0cmluZycgJiYgIWRlZmluaXRpb24udGVtcGxhdGU7XHJcblxyXG4gICAgICAgIC8vIHRlbXBsYXRlIGlzIGEgc3RyaW5nIChsZW4gPCAxNikuIHdlIHdpbGwgZmluZCBpdCBjb250YWluZXIgZmlyc3RcclxuXHJcbiAgICAgICAgZGVmaW5pdGlvbi5kYXRhID0gZGVmaW5pdGlvbi5kYXRhIHx8IHt9O1xyXG4gICAgICAgIGRlZmluaXRpb24uY29tcHV0ZWQgPSBkZWZpbml0aW9uLmNvbXB1dGVkIHx8IHt9O1xyXG4gICAgICAgIGlmKCBjb250ZXh0LmRhdGEgKSBfLmV4dGVuZCggZGVmaW5pdGlvbi5kYXRhLCBjb250ZXh0LmRhdGEgKTtcclxuICAgICAgICBpZiggY29udGV4dC5jb21wdXRlZCApIF8uZXh0ZW5kKCBkZWZpbml0aW9uLmNvbXB1dGVkLCBjb250ZXh0LmNvbXB1dGVkICk7XHJcblxyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBjb250ZXh0Ll9ldmVudExpc3RlbmVycyB8fCBbXTtcclxuICAgICAgICB2YXIgbm9ybUxpc3RlbmVyO1xyXG4gICAgICAgIC8vIGhhbmxlIGluaXRpYWxpemVkIGV2ZW50IGJpbmRpbmdcclxuICAgICAgICBpZiggZGVmaW5pdGlvbi5ldmVudHMpe1xyXG4gICAgICAgICAgbm9ybUxpc3RlbmVyID0gXy5ub3JtTGlzdGVuZXIoZGVmaW5pdGlvbi5ldmVudHMpO1xyXG4gICAgICAgICAgaWYobm9ybUxpc3RlbmVyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQobm9ybUxpc3RlbmVyKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIGRlZmluaXRpb24uZXZlbnRzO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGRlZmluaXRpb24uZGF0YSA9IGRlZmluaXRpb24uZGF0YSB8fCB7fTtcclxuICAgICAgICBkZWZpbml0aW9uLmNvbXB1dGVkID0gZGVmaW5pdGlvbi5jb21wdXRlZCB8fCB7fTtcclxuICAgICAgICBpZihjb250ZXh0LmRhdGEpIF8uZXh0ZW5kKGRlZmluaXRpb24uZGF0YSwgY29udGV4dC5kYXRhKTtcclxuICAgICAgICBpZihjb250ZXh0LmNvbXB1dGVkKSBfLmV4dGVuZChkZWZpbml0aW9uLmNvbXB1dGVkLCBjb250ZXh0LmNvbXB1dGVkKTtcclxuXHJcbiAgICAgICAgdmFyIHVzZVByb3RvdHllU3RyaW5nID0gdHlwZW9mIGNvbnRleHQudGVtcGxhdGUgPT09ICdzdHJpbmcnICYmICFkZWZpbml0aW9uLnRlbXBsYXRlO1xyXG5cclxuICAgICAgICBfLmV4dGVuZChjb250ZXh0LCBkZWZpbml0aW9uLCB0cnVlKTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZihsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzLmxlbmd0aCl7XHJcbiAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApe1xyXG4gICAgICAgICAgICBjb250ZXh0LiRvbihpdGVtLnR5cGUsIGl0ZW0ubGlzdGVuZXIpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHdlIG5lZWQgYWRkIHNvbWUgbG9naWMgYXQgY2xpZW50LlxyXG4gICAgICAgIGJlZm9yZUNvbmZpZyAmJiBiZWZvcmVDb25maWcoKTtcclxuXHJcbiAgICAgICAgLy8gb25seSBoYXZlIGluc3RhbmNlIGNvbXB1dGVkLCB3ZSBuZWVkIHByZXBhcmUgdGhlIHByb3BlcnR5XHJcbiAgICAgICAgaWYoIGhhc0luc3RhbmNlQ29tcHV0ZWQgKSBjb250ZXh0LmNvbXB1dGVkID0gaGFuZGxlQ29tcHV0ZWQoY29udGV4dC5jb21wdXRlZCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQuJGVtaXQoIFwiJGNvbmZpZ1wiLCBjb250ZXh0LmRhdGEgKTtcclxuICAgICAgICBjb250ZXh0LmNvbmZpZyAmJiBjb250ZXh0LmNvbmZpZyggY29udGV4dC5kYXRhICk7XHJcbiAgICAgICAgY29udGV4dC4kZW1pdCggXCIkYWZ0ZXJDb25maWdcIiwgY29udGV4dC5kYXRhICk7XHJcblxyXG4gICAgICAgIHRlbXBsYXRlID0gY29udGV4dC50ZW1wbGF0ZTtcclxuXHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiB0ZW1wbGF0ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHRlbXBsYXRlID0gcGFyc2UucGFyc2UodGVtcGxhdGUpO1xyXG4gICAgICAgICAgaWYodXNlUHJvdG90eWVTdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gYXZvaWQgbXVsdGlwbHkgY29tcGlsZVxyXG4gICAgICAgICAgICBjb250ZXh0LmNvbnN0cnVjdG9yLnByb3RvdHlwZS50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb250ZXh0LnRlbXBsYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBoYW5kbGVDb21wdXRlZCA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIHdyYXAgdGhlIGNvbXB1dGVkIGdldHRlcjtcclxuICAgICAgICBmdW5jdGlvbiB3cmFwR2V0KGdldCl7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oY29udGV4dCl7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXQuY2FsbChjb250ZXh0LCBjb250ZXh0LmRhdGEgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gd3JhcCB0aGUgY29tcHV0ZWQgc2V0dGVyO1xyXG4gICAgICAgIGZ1bmN0aW9uIHdyYXBTZXQoc2V0KXtcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHNldC5jYWxsKCBjb250ZXh0LCB2YWx1ZSwgY29udGV4dC5kYXRhICk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiggY29tcHV0ZWQgKXtcclxuICAgICAgICAgIGlmKCFjb21wdXRlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgdmFyIHBhcnNlZENvbXB1dGVkID0ge30sIGhhbmRsZSwgcGFpciwgdHlwZTtcclxuICAgICAgICAgIGZvcih2YXIgaSBpbiBjb21wdXRlZCl7XHJcbiAgICAgICAgICAgIGhhbmRsZSA9IGNvbXB1dGVkW2ldXHJcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlb2YgaGFuZGxlO1xyXG5cclxuICAgICAgICAgICAgaWYoaGFuZGxlLnR5cGUgPT09ICdleHByZXNzaW9uJyl7XHJcbiAgICAgICAgICAgICAgcGFyc2VkQ29tcHV0ZWRbaV0gPSBoYW5kbGU7XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIHR5cGUgPT09IFwic3RyaW5nXCIgKXtcclxuICAgICAgICAgICAgICBwYXJzZWRDb21wdXRlZFtpXSA9IHBhcnNlLmV4cHJlc3Npb24oaGFuZGxlKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBwYWlyID0gcGFyc2VkQ29tcHV0ZWRbaV0gPSB7dHlwZTogJ2V4cHJlc3Npb24nfTtcclxuICAgICAgICAgICAgICBpZih0eXBlID09PSBcImZ1bmN0aW9uXCIgKXtcclxuICAgICAgICAgICAgICAgIHBhaXIuZ2V0ID0gd3JhcEdldChoYW5kbGUpO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlLmdldCkgcGFpci5nZXQgPSB3cmFwR2V0KGhhbmRsZS5nZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlLnNldCkgcGFpci5zZXQgPSB3cmFwU2V0KGhhbmRsZS5zZXQpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHBhcnNlZENvbXB1dGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkoKTtcclxuXHJcblxyXG4gICAgICBmdW5jdGlvbiBwcmVwYXJlQXR0ciAoIGFzdCAsZGlyZWN0aXZlICl7XHJcbiAgICAgICAgaWYoYXN0LnBhcnNlZCApIHJldHVybiBhc3Q7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gYXN0LnZhbHVlO1xyXG4gICAgICAgIHZhciBuYW1lPSAgYXN0Lm5hbWUsIGJvZHksIGNvbnN0YW50O1xyXG4gICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgfnZhbHVlLmluZGV4T2YoY29uZmlnLkJFR0lOKSAmJiB+dmFsdWUuaW5kZXhPZihjb25maWcuRU5EKSApe1xyXG4gICAgICAgICAgaWYoICFkaXJlY3RpdmUgfHwgIWRpcmVjdGl2ZS5ucHMgKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJzZWQgPSBwYXJzZS5wYXJzZSh2YWx1ZSwgeyBtb2RlOiAyIH0pO1xyXG4gICAgICAgICAgICBpZihwYXJzZWQubGVuZ3RoID09PSAxICYmIHBhcnNlZFswXS50eXBlID09PSAnZXhwcmVzc2lvbicpe1xyXG4gICAgICAgICAgICAgIGJvZHkgPSBwYXJzZWRbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICBjb25zdGFudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgYm9keSA9IFtdO1xyXG4gICAgICAgICAgICAgIHBhcnNlZC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgaWYoIWl0ZW0uY29uc3RhbnQpIGNvbnN0YW50PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gc2lsZW50IHRoZSBtdXRpcGxlIGludGVwbGF0aW9uXHJcbiAgICAgICAgICAgICAgICBib2R5LnB1c2goaXRlbS5ib2R5IHx8IFwiJ1wiICsgaXRlbS50ZXh0LnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKSArIFwiJ1wiKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBib2R5ID0gbm9kZS5leHByZXNzaW9uKFwiW1wiICsgYm9keS5qb2luKFwiLFwiKSArIFwiXS5qb2luKCcnKVwiLCBudWxsLCBjb25zdGFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXN0LnZhbHVlID0gYm9keTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXN0LnBhcnNlZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGFzdDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgLy8gc2hhcmUgbG9naWMgYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudFxyXG4gICAgICAgIGluaXREZWZpbml0aW9uOiBpbml0RGVmaW5pdGlvbixcclxuICAgICAgICBoYW5kbGVDb21wdXRlZDogaGFuZGxlQ29tcHV0ZWQsXHJcbiAgICAgICAgcHJlcGFyZUF0dHI6IHByZXBhcmVBdHRyXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAxNCAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICB2YXIgZXhwckNhY2hlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKS5leHByQ2FjaGU7XHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuICAgICAgdmFyIFBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xyXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgICAgICBleHByZXNzaW9uOiBmdW5jdGlvbihleHByLCBzaW1wbGUpe1xyXG4gICAgICAgICAgLy8gQFRPRE8gY2FjaGVcclxuICAgICAgICAgIGlmKCB0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycgJiYgKCBleHByID0gZXhwci50cmltKCkgKSApe1xyXG4gICAgICAgICAgICBleHByID0gZXhwckNhY2hlLmdldCggZXhwciApIHx8IGV4cHJDYWNoZS5zZXQoIGV4cHIsIG5ldyBQYXJzZXIoIGV4cHIsIHsgbW9kZTogMiwgZXhwcmVzc2lvbjogdHJ1ZSB9ICkuZXhwcmVzc2lvbigpIClcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGV4cHIpIHJldHVybiBleHByO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyc2U6IGZ1bmN0aW9uKHRlbXBsYXRlKXtcclxuICAgICAgICAgIHJldHVybiBuZXcgUGFyc2VyKHRlbXBsYXRlKS5wYXJzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMTUgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuICAgICAgLypqc2hpbnQgLVcwODIgKi9cclxuXHJcbiAgICAgIC8vIHRoYW5rcyBmb3IgYW5ndWxhciAmJiBtb290b29scyBmb3Igc29tZSBjb25jaXNlJmNyb3NzLXBsYXRmb3JtICBpbXBsZW1lbnRpb25cclxuICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgICAgLy8gVGhlIE1JVCBMaWNlbnNlXHJcbiAgICAgIC8vIENvcHlyaWdodCAoYykgMjAxMC0yMDE0IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xyXG5cclxuICAgICAgLy8gLS0tXHJcbiAgICAgIC8vIGxpY2Vuc2U6IE1JVC1zdHlsZSBsaWNlbnNlLiBodHRwOi8vbW9vdG9vbHMubmV0XHJcblxyXG5cclxuICAgICAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xyXG5cclxuICAgICAgICB2YXIgZG9tID0gbW9kdWxlLmV4cG9ydHM7XHJcbiAgICAgICAgdmFyIGVudiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XHJcbiAgICAgICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xyXG4gICAgICAgIHZhciBjb25zdHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcclxuICAgICAgICB2YXIgdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHZhciBhZGRFdmVudCwgcmVtb3ZlRXZlbnQ7XHJcbiAgICAgICAgdmFyIG5vb3AgPSBmdW5jdGlvbigpe31cclxuXHJcbiAgICAgICAgdmFyIG5hbWVzcGFjZXMgPSBjb25zdHMuTkFNRVNQQUNFO1xyXG5cclxuICAgICAgICBkb20uYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgZG9tLmRvYyA9IGRvY3VtZW50O1xyXG4gICAgICAgIGRvbS50Tm9kZSA9IHROb2RlO1xyXG5cclxuXHJcbiAgICAgICAgLy8gY2FtZWxDYXNlXHJcbiAgICAgICAgdmFyIGNhbWVsQ2FzZSA9IGZ1bmN0aW9uIChzdHIpe1xyXG4gICAgICAgICAgcmV0dXJuIChcIlwiICsgc3RyKS5yZXBsYWNlKC8tXFxEL2csIGZ1bmN0aW9uKG1hdGNoKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoLmNoYXJBdCgxKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmKHROb2RlLmFkZEV2ZW50TGlzdGVuZXIpe1xyXG4gICAgICAgICAgYWRkRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xyXG4gICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgZm4pIHtcclxuICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24obm9kZSwgdHlwZSwgZm4pIHtcclxuICAgICAgICAgICAgbm9kZS5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgZm4pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBmbikge1xyXG4gICAgICAgICAgICBub2RlLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBmbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZG9tLm1zaWUgPSBwYXJzZUludCgoL21zaWUgKFxcZCspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSkgfHwgW10pWzFdKTtcclxuICAgICAgICBpZiAoaXNOYU4oZG9tLm1zaWUpKSB7XHJcbiAgICAgICAgICBkb20ubXNpZSA9IHBhcnNlSW50KCgvdHJpZGVudFxcLy4qOyBydjooXFxkKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSB8fCBbXSlbMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9tLmZpbmQgPSBmdW5jdGlvbihzbCl7XHJcbiAgICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzbCk7XHJcbiAgICAgICAgICAgIH1jYXRjaChlKXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKHNsLmluZGV4T2YoJyMnKSE9PS0xKSByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIHNsLnNsaWNlKDEpICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZG9tLmluamVjdCA9IGZ1bmN0aW9uKG5vZGUsIHJlZmVyLCBwb3NpdGlvbil7XHJcblxyXG4gICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiB8fCAnYm90dG9tJztcclxuICAgICAgICAgIGlmKCFub2RlKSByZXR1cm4gO1xyXG4gICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShub2RlKSl7XHJcbiAgICAgICAgICAgIHZhciB0bXAgPSBub2RlO1xyXG4gICAgICAgICAgICBub2RlID0gZG9tLmZyYWdtZW50KCk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsbGVuID0gdG1wLmxlbmd0aDsgaSA8IGxlbiA7aSsrKXtcclxuICAgICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRtcFtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBmaXJzdENoaWxkLCBuZXh0O1xyXG4gICAgICAgICAgc3dpdGNoKHBvc2l0aW9uKXtcclxuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICAgICAgICByZWZlci5hcHBlbmRDaGlsZCggbm9kZSApO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgICAgICAgIGlmKCBmaXJzdENoaWxkID0gcmVmZXIuZmlyc3RDaGlsZCApe1xyXG4gICAgICAgICAgICAgICAgcmVmZXIuaW5zZXJ0QmVmb3JlKCBub2RlLCByZWZlci5maXJzdENoaWxkICk7XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZWZlci5hcHBlbmRDaGlsZCggbm9kZSApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWZ0ZXInOlxyXG4gICAgICAgICAgICAgIGlmKCBuZXh0ID0gcmVmZXIubmV4dFNpYmxpbmcgKXtcclxuICAgICAgICAgICAgICAgIG5leHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIG5vZGUsIG5leHQgKTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJlZmVyLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIG5vZGUgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JlZm9yZSc6XHJcbiAgICAgICAgICAgICAgcmVmZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIG5vZGUsIHJlZmVyICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZG9tLmlkID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZUVsZW1lbnRcclxuICAgICAgICBkb20uY3JlYXRlID0gZnVuY3Rpb24odHlwZSwgbnMpe1xyXG4gICAgICAgICAgaWYobnMgPT09ICdzdmcnKXtcclxuICAgICAgICAgICAgaWYoIWVudi5zdmcpIHRocm93IEVycm9yKCd0aGUgZW52IG5lZWQgc3ZnIHN1cHBvcnQnKVxyXG4gICAgICAgICAgICBucyA9IG5hbWVzcGFjZXMuc3ZnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICFucz8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLCB0eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRvY3VtZW50RnJhZ21lbnRcclxuICAgICAgICBkb20uZnJhZ21lbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIHZhciBzcGVjaWFsQXR0ciA9IHtcclxuICAgICAgICAgICdjbGFzcyc6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKXtcclxuICAgICAgICAgICAgKCdjbGFzc05hbWUnIGluIG5vZGUgJiYgKCFub2RlLm5hbWVzcGFjZVVSSSB8fCBub2RlLm5hbWVzcGFjZVVSSSA9PT0gbmFtZXNwYWNlcy5odG1sICApKSA/XHJcbiAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAodmFsdWUgfHwgJycpIDogbm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgdmFsdWUpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgICdmb3InOiBmdW5jdGlvbihub2RlLCB2YWx1ZSl7XHJcbiAgICAgICAgICAgICgnaHRtbEZvcicgaW4gbm9kZSkgPyBub2RlLmh0bWxGb3IgPSB2YWx1ZSA6IG5vZGUuc2V0QXR0cmlidXRlKCdmb3InLCB2YWx1ZSk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgJ3N0eWxlJzogZnVuY3Rpb24obm9kZSwgdmFsdWUpe1xyXG4gICAgICAgICAgICAobm9kZS5zdHlsZSkgPyBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZSA6IG5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHZhbHVlKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAndmFsdWUnOiBmdW5jdGlvbihub2RlLCB2YWx1ZSl7XHJcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAodmFsdWUgIT0gbnVsbCkgPyB2YWx1ZSA6ICcnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIGF0dHJpYnV0ZSBTZXR0ZXIgJiBHZXR0ZXJcclxuICAgICAgICBkb20uYXR0ciA9IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIHZhbHVlKXtcclxuICAgICAgICAgIGlmIChfLmlzQm9vbGVhbkF0dHIobmFtZSkpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICBpZiAoISF2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVtuYW1lXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIC8vIGx0IGllNyAuIHRoZSBqYXZhc2NyaXB0IGNoZWNrZWQgc2V0dGluZyBpcyBpbiB2YWxpZFxyXG4gICAgICAgICAgICAgICAgLy9odHRwOi8vYnl0ZXMuY29tL3RvcGljL2phdmFzY3JpcHQvaW5zaWdodHMvNzk5MTY3LWJyb3dzZXItcXVpcmstZHluYW1pY2FsbHktYXBwZW5kZWQtY2hlY2tlZC1jaGVja2JveC1kb2VzLW5vdC1hcHBlYXItY2hlY2tlZC1pZVxyXG4gICAgICAgICAgICAgICAgaWYoZG9tLm1zaWUgJiYgZG9tLm1zaWUgPD03ICYmIG5hbWUgPT09ICdjaGVja2VkJyApIG5vZGUuZGVmYXVsdENoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGVbbmFtZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gKG5vZGVbbmFtZV0gfHxcclxuICAgICAgICAgICAgICAgIChub2RlLmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKG5hbWUpfHwgbm9vcCkuc3BlY2lmaWVkKSA/IG5hbWUgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGluIHNwZWNpYWxBdHRyO1xyXG4gICAgICAgICAgICBpZihzcGVjaWFsQXR0cltuYW1lXSkgc3BlY2lhbEF0dHJbbmFtZV0obm9kZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHZhbHVlID09PSBudWxsKSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxyXG4gICAgICAgICAgICBlbHNlIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgLy8gdGhlIGV4dHJhIGFyZ3VtZW50IFwiMlwiIGlzIHRvIGdldCB0aGUgcmlnaHQgdGhpbmcgZm9yIGEuaHJlZiBpbiBJRSwgc2VlIGpRdWVyeSBjb2RlXHJcbiAgICAgICAgICAgIC8vIHNvbWUgZWxlbWVudHMgKGUuZy4gRG9jdW1lbnQpIGRvbid0IGhhdmUgZ2V0IGF0dHJpYnV0ZSwgc28gcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB2YXIgcmV0ID0gbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSwgMik7XHJcbiAgICAgICAgICAgIC8vIG5vcm1hbGl6ZSBub24tZXhpc3RpbmcgYXR0cmlidXRlcyB0byB1bmRlZmluZWQgKGFzIGpRdWVyeSlcclxuICAgICAgICAgICAgcmV0dXJuIHJldCA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJldDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkb20ub24gPSBmdW5jdGlvbihub2RlLCB0eXBlLCBoYW5kbGVyKXtcclxuICAgICAgICAgIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgIGhhbmRsZXIucmVhbCA9IGZ1bmN0aW9uKGV2KXtcclxuICAgICAgICAgICAgdmFyICRldmVudCA9IG5ldyBFdmVudChldik7XHJcbiAgICAgICAgICAgICRldmVudC5vcmlnaW4gPSBub2RlO1xyXG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwobm9kZSwgJGV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHR5cGVzLmZvckVhY2goZnVuY3Rpb24odHlwZSl7XHJcbiAgICAgICAgICAgIHR5cGUgPSBmaXhFdmVudE5hbWUobm9kZSwgdHlwZSk7XHJcbiAgICAgICAgICAgIGFkZEV2ZW50KG5vZGUsIHR5cGUsIGhhbmRsZXIucmVhbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybiBkb207XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvbS5vZmYgPSBmdW5jdGlvbihub2RlLCB0eXBlLCBoYW5kbGVyKXtcclxuICAgICAgICAgIHZhciB0eXBlcyA9IHR5cGUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgIGhhbmRsZXIgPSBoYW5kbGVyLnJlYWwgfHwgaGFuZGxlcjtcclxuICAgICAgICAgIHR5cGVzLmZvckVhY2goZnVuY3Rpb24odHlwZSl7XHJcbiAgICAgICAgICAgIHR5cGUgPSBmaXhFdmVudE5hbWUobm9kZSwgdHlwZSk7XHJcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50KG5vZGUsIHR5cGUsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBkb20udGV4dCA9IChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgIHZhciBtYXAgPSB7fTtcclxuICAgICAgICAgIGlmIChkb20ubXNpZSAmJiBkb20ubXNpZSA8IDkpIHtcclxuICAgICAgICAgICAgbWFwWzFdID0gJ2lubmVyVGV4dCc7XHJcbiAgICAgICAgICAgIG1hcFszXSA9ICdub2RlVmFsdWUnO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFwWzFdID0gbWFwWzNdID0gJ3RleHRDb250ZW50JztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5vZGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0UHJvcCA9IG1hcFtub2RlLm5vZGVUeXBlXTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdGV4dFByb3AgPyBub2RlW3RleHRQcm9wXSA6ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGVbdGV4dFByb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcblxyXG4gICAgICAgIGRvbS5odG1sID0gZnVuY3Rpb24oIG5vZGUsIGh0bWwgKXtcclxuICAgICAgICAgIGlmKHR5cGVvZiBodG1sID09PSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGUuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvbS5yZXBsYWNlID0gZnVuY3Rpb24obm9kZSwgcmVwbGFjZWQpe1xyXG4gICAgICAgICAgaWYocmVwbGFjZWQucGFyZW50Tm9kZSkgcmVwbGFjZWQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobm9kZSwgcmVwbGFjZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9tLnJlbW92ZSA9IGZ1bmN0aW9uKG5vZGUpe1xyXG4gICAgICAgICAgaWYobm9kZS5wYXJlbnROb2RlKSBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjc3MgU2V0dGxlICYgR2V0dGVyIGZyb20gYW5ndWxhclxyXG4gICAgICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgIC8vIGl0IGlzbnQgY29tcHV0ZWQgc3R5bGVcclxuICAgICAgICBkb20uY3NzID0gZnVuY3Rpb24obm9kZSwgbmFtZSwgdmFsdWUpe1xyXG4gICAgICAgICAgaWYoIHR5cGVvZiAobmFtZSkgPT09IFwib2JqZWN0XCIgJiYgbmFtZSApe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gbmFtZSl7XHJcbiAgICAgICAgICAgICAgaWYoIG5hbWUuaGFzT3duUHJvcGVydHkoaSkgKXtcclxuICAgICAgICAgICAgICAgIGRvbS5jc3MoIG5vZGUsIGksIG5hbWVbaV0gKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XHJcblxyXG4gICAgICAgICAgICBuYW1lID0gY2FtZWxDYXNlKG5hbWUpO1xyXG4gICAgICAgICAgICBpZihuYW1lKSBub2RlLnN0eWxlW25hbWVdID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWw7XHJcbiAgICAgICAgICAgIGlmIChkb20ubXNpZSA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgLy8gdGhpcyBpcyBzb21lIElFIHNwZWNpZmljIHdlaXJkbmVzcyB0aGF0IGpRdWVyeSAxLjYuNCBkb2VzIG5vdCBzdXJlIHdoeVxyXG4gICAgICAgICAgICAgIHZhbCA9IG5vZGUuY3VycmVudFN0eWxlICYmIG5vZGUuY3VycmVudFN0eWxlW25hbWVdO1xyXG4gICAgICAgICAgICAgIGlmICh2YWwgPT09ICcnKSB2YWwgPSAnYXV0byc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsID0gdmFsIHx8IG5vZGUuc3R5bGVbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChkb20ubXNpZSA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgdmFsID0gdmFsID09PSAnJyA/IHVuZGVmaW5lZCA6IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gIHZhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvbS5hZGRDbGFzcyA9IGZ1bmN0aW9uKG5vZGUsIGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICB2YXIgY3VycmVudCA9IG5vZGUuY2xhc3NOYW1lIHx8IFwiXCI7XHJcbiAgICAgICAgICBpZiAoKFwiIFwiICsgY3VycmVudCArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpID09PSAtMSkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IGN1cnJlbnQ/ICggY3VycmVudCArIFwiIFwiICsgY2xhc3NOYW1lICkgOiBjbGFzc05hbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb20uZGVsQ2xhc3MgPSBmdW5jdGlvbihub2RlLCBjbGFzc05hbWUpe1xyXG4gICAgICAgICAgdmFyIGN1cnJlbnQgPSBub2RlLmNsYXNzTmFtZSB8fCBcIlwiO1xyXG4gICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAoXCIgXCIgKyBjdXJyZW50ICsgXCIgXCIpLnJlcGxhY2UoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIiwgXCIgXCIpLnRyaW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvbS5oYXNDbGFzcyA9IGZ1bmN0aW9uKG5vZGUsIGNsYXNzTmFtZSl7XHJcbiAgICAgICAgICB2YXIgY3VycmVudCA9IG5vZGUuY2xhc3NOYW1lIHx8IFwiXCI7XHJcbiAgICAgICAgICByZXR1cm4gKFwiIFwiICsgY3VycmVudCArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpICE9PSAtMTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gc2ltcGxlIEV2ZW50IHdyYXBcclxuXHJcbiAgICAgICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzExMDY4MTk2L2llOC1pZTctb25jaGFuZ2UtZXZlbnQtaXMtZW1pdGVkLW9ubHktYWZ0ZXItcmVwZWF0ZWQtc2VsZWN0aW9uXHJcbiAgICAgICAgZnVuY3Rpb24gZml4RXZlbnROYW1lKGVsZW0sIG5hbWUpe1xyXG4gICAgICAgICAgcmV0dXJuIChuYW1lID09PSAnY2hhbmdlJyAgJiYgIGRvbS5tc2llIDwgOSAmJlxyXG4gICAgICAgICAgICAoZWxlbSAmJiBlbGVtLnRhZ05hbWUgJiYgZWxlbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk9PT0naW5wdXQnICYmXHJcbiAgICAgICAgICAgICAgKGVsZW0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBlbGVtLnR5cGUgPT09ICdyYWRpbycpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk/ICdjbGljayc6IG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgck1vdXNlRXZlbnQgPSAvXig/OmNsaWNrfGRibGNsaWNrfGNvbnRleHRtZW51fERPTU1vdXNlU2Nyb2xsfG1vdXNlKD86XFx3KykpJC9cclxuICAgICAgICB2YXIgZG9jID0gZG9jdW1lbnQ7XHJcbiAgICAgICAgZG9jID0gKCFkb2MuY29tcGF0TW9kZSB8fCBkb2MuY29tcGF0TW9kZSA9PT0gJ0NTUzFDb21wYXQnKSA/IGRvYy5kb2N1bWVudEVsZW1lbnQgOiBkb2MuYm9keTtcclxuICAgICAgICBmdW5jdGlvbiBFdmVudChldil7XHJcbiAgICAgICAgICBldiA9IGV2IHx8IHdpbmRvdy5ldmVudDtcclxuICAgICAgICAgIGlmKGV2Ll9maXhlZCkgcmV0dXJuIGV2O1xyXG4gICAgICAgICAgdGhpcy5ldmVudCA9IGV2O1xyXG4gICAgICAgICAgdGhpcy50YXJnZXQgPSBldi50YXJnZXQgfHwgZXYuc3JjRWxlbWVudDtcclxuXHJcbiAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMudHlwZSA9IGV2LnR5cGU7XHJcbiAgICAgICAgICB2YXIgYnV0dG9uID0gdGhpcy5idXR0b24gPSBldi5idXR0b247XHJcblxyXG4gICAgICAgICAgLy8gaWYgaXMgbW91c2UgZXZlbnQgcGF0Y2ggcGFnZVhcclxuICAgICAgICAgIGlmKHJNb3VzZUV2ZW50LnRlc3QodHlwZSkpeyAvL2ZpeCBwYWdlWFxyXG4gICAgICAgICAgICB0aGlzLnBhZ2VYID0gKGV2LnBhZ2VYICE9IG51bGwpID8gZXYucGFnZVggOiBldi5jbGllbnRYICsgZG9jLnNjcm9sbExlZnQ7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVkgPSAoZXYucGFnZVggIT0gbnVsbCkgPyBldi5wYWdlWSA6IGV2LmNsaWVudFkgKyBkb2Muc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ21vdXNlb3ZlcicgfHwgdHlwZSA9PT0gJ21vdXNlb3V0Jyl7Ly8gZml4IHJlbGF0ZWRUYXJnZXRcclxuICAgICAgICAgICAgICB2YXIgcmVsYXRlZCA9IGV2LnJlbGF0ZWRUYXJnZXQgfHwgZXZbKHR5cGUgPT09ICdtb3VzZW92ZXInID8gJ2Zyb20nIDogJ3RvJykgKyAnRWxlbWVudCddO1xyXG4gICAgICAgICAgICAgIHdoaWxlIChyZWxhdGVkICYmIHJlbGF0ZWQubm9kZVR5cGUgPT09IDMpIHJlbGF0ZWQgPSByZWxhdGVkLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWxhdGVkVGFyZ2V0ID0gcmVsYXRlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gaWYgaXMgbW91c2VzY3JvbGxcclxuICAgICAgICAgIGlmICh0eXBlID09PSAnRE9NTW91c2VTY3JvbGwnIHx8IHR5cGUgPT09ICdtb3VzZXdoZWVsJyl7XHJcbiAgICAgICAgICAgIC8vIGZmIGV2LmRldGFpbDogMyAgICBvdGhlciBldi53aGVlbERlbHRhOiAtMTIwXHJcbiAgICAgICAgICAgIHRoaXMud2hlZWxEZWx0YSA9IChldi53aGVlbERlbHRhKSA/IGV2LndoZWVsRGVsdGEgLyAxMjAgOiAtKGV2LmRldGFpbCB8fCAwKSAvIDM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gZml4IHdoaWNoXHJcbiAgICAgICAgICB0aGlzLndoaWNoID0gZXYud2hpY2ggfHwgZXYua2V5Q29kZTtcclxuICAgICAgICAgIGlmKCAhdGhpcy53aGljaCAmJiBidXR0b24gIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9ldmVudC53aGljaC8gdXNlIHdoaWNoXHJcbiAgICAgICAgICAgIHRoaXMud2hpY2ggPSAoIGJ1dHRvbiAmIDEgPyAxIDogKCBidXR0b24gJiAyID8gMyA6ICggYnV0dG9uICYgNCA/IDIgOiAwICkgKSApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5fZml4ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXy5leHRlbmQoRXZlbnQucHJvdG90eXBlLCB7XHJcbiAgICAgICAgICBzdG9wOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnByZXZlbnREZWZhdWx0KCkuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50LnByZXZlbnREZWZhdWx0KSB0aGlzLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5ldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbikgdGhpcy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLmV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5ldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHRoaXMuZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIGRvbS5uZXh0RnJhbWUgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciByZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDE2KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIGNhbmNlbCA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24odGlkKXtcclxuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGlkKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICAgICAgdmFyIGlkID0gcmVxdWVzdChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpeyBjYW5jZWwoaWQpOyB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gM2tzIGZvciBhbmd1bGFyJ3MgcmFmICBzZXJ2aWNlXHJcbiAgICAgICAgdmFyIGtcclxuICAgICAgICBkb20ubmV4dFJlZmxvdyA9IGRvbS5tc2llPyBmdW5jdGlvbihjYWxsYmFjayl7XHJcbiAgICAgICAgICByZXR1cm4gZG9tLm5leHRGcmFtZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBrID0gZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfTogZG9tLm5leHRGcmFtZTtcclxuXHJcbiAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMTYgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xyXG5cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAgICAgJ0NPTVBPTkVOVF9UWVBFJzogMSxcclxuICAgICAgICAnRUxFTUVOVF9UWVBFJzogMixcclxuICAgICAgICAnRVJST1InOiB7XHJcbiAgICAgICAgICAnVU5NQVRDSEVEX0FTVCc6IDEwMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJNU0dcIjoge1xyXG4gICAgICAgICAgMTAxOiBcIlVubWF0Y2hlZCBhc3QgYW5kIG1vdW50Tm9kZSwgcmVwb3J0IGlzc3VlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWd1bGFyanMvcmVndWxhci9pc3N1ZXNcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ05BTUVTUEFDRSc6IHtcclxuICAgICAgICAgIGh0bWw6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiLFxyXG4gICAgICAgICAgc3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgICdPUFRJT05TJzoge1xyXG4gICAgICAgICAgJ1NUQUJMRV9JTklUJzogeyBzdGFibGU6ICEwLCBpbml0OiAhMCB9LFxyXG4gICAgICAgICAgJ0ZPUkNFX0lOSVQnOiB7IGZvcmNlOiAhMCwgaW5pdDogITAgfSxcclxuICAgICAgICAgICdTVEFCTEUnOiB7c3RhYmxlOiAhMH0sXHJcbiAgICAgICAgICAnSU5JVCc6IHsgaW5pdDogITAgfSxcclxuICAgICAgICAgICdTWU5DJzogeyBzeW5jOiAhMCB9LFxyXG4gICAgICAgICAgJ0ZPUkNFJzogeyBmb3JjZTogITAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAxNyAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICB2YXIgZGlmZkFycmF5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCkuZGlmZkFycmF5O1xyXG4gICAgICB2YXIgY29tYmluZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xyXG4gICAgICB2YXIgYW5pbWF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjApO1xyXG4gICAgICB2YXIgUGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XHJcbiAgICAgIHZhciBub2RlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XHJcbiAgICAgIHZhciBHcm91cCA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xyXG4gICAgICB2YXIgZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuICAgICAgdmFyIGNvbnN0cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xyXG4gICAgICB2YXIgT1BUSU9OUyA9IGNvbnN0cy5PUFRJT05TO1xyXG4gICAgICB2YXIgRVJST1IgPSBjb25zdHMuRVJST1I7XHJcbiAgICAgIHZhciBNU0cgPSBjb25zdHMuTVNHO1xyXG4gICAgICB2YXIgbm9kZUN1cnNvciA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xyXG4gICAgICB2YXIgY29uZmlnID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KVxyXG4gICAgICB2YXIgc2hhcmVkID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XHJcblxyXG5cclxuXHJcbiAgICAgIHZhciB3YWxrZXJzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXHJcblxyXG5cclxuICAgICAgLy8gdXNlZCBpbiB3YWxrZXJzLmxpc3RcclxuICAgICAgLy8gcmVtb3ZlIGJsb2NrIGluIGdyb3VwXHJcbiAgICAgIGZ1bmN0aW9uIHJlbW92ZVJhbmdlKGluZGV4LCBybGVuLCBjaGlsZHJlbil7XHJcbiAgICAgICAgZm9yKHZhciBqID0gMTsgaiA8PSBybGVuOyBqKyspeyAvL3JlbW92ZWRcclxuICAgICAgICAgIHZhciByZW1vdmVkID0gY2hpbGRyZW5bIGluZGV4ICsgaiBdO1xyXG4gICAgICAgICAgaWYocmVtb3ZlZCkgcmVtb3ZlZC5kZXN0cm95KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjaGlsZHJlbi5zcGxpY2UoaW5kZXgrMSwgcmxlbik7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB3YWxrZXJzLmxpc3QgPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xyXG5cclxuICAgICAgICB2YXIgUmVndWxhciA9IHdhbGtlcnMuUmVndWxhcjtcclxuICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KFwiUmVndWxhciBsaXN0XCIpLFxyXG4gICAgICAgICAgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsXHJcbiAgICAgICAgICBleHRyYSA9IG9wdGlvbnMuZXh0cmE7XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoW3BsYWNlaG9sZGVyXSk7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gZ3JvdXAuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIHZhciBpbmRleE5hbWUgPSBhc3QudmFyaWFibGUgKyAnX2luZGV4JztcclxuICAgICAgICB2YXIga2V5TmFtZSA9IGFzdC52YXJpYWJsZSArICdfa2V5JztcclxuICAgICAgICB2YXIgdmFyaWFibGUgPSBhc3QudmFyaWFibGU7XHJcbiAgICAgICAgdmFyIGFsdGVybmF0ZSA9IGFzdC5hbHRlcm5hdGU7XHJcbiAgICAgICAgdmFyIHRyYWNrID0gYXN0LnRyYWNrLCBrZXlPZiwgZXh0cmFPYmo7XHJcbiAgICAgICAgdmFyIGN1cnNvciA9IG9wdGlvbnMuY3Vyc29yO1xyXG5cclxuICAgICAgICBpbnNlcnRQbGFjZUhvbGRlcihwbGFjZWhvbGRlciwgY3Vyc29yKVxyXG5cclxuXHJcbiAgICAgICAgaWYoIHRyYWNrICYmIHRyYWNrICE9PSB0cnVlICl7XHJcblxyXG4gICAgICAgICAgdHJhY2sgPSB0aGlzLl90b3VjaEV4cHIodHJhY2spO1xyXG4gICAgICAgICAgZXh0cmFPYmogPSBfLmNyZWF0ZU9iamVjdChleHRyYSk7XHJcbiAgICAgICAgICBrZXlPZiA9IGZ1bmN0aW9uKCBpdGVtLCBpbmRleCApe1xyXG4gICAgICAgICAgICBleHRyYU9ialsgdmFyaWFibGUgXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIGV4dHJhT2JqWyBpbmRleE5hbWUgXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAvLyBARklYIGtleU5hbWVcclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrLmdldCggc2VsZiwgZXh0cmFPYmogKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFJhbmdlKGluZGV4LCBlbmQsIG5ld0xpc3QsIHJhd05ld1ZhbHVlKXtcclxuICAgICAgICAgIGZvcih2YXIgbyA9IGluZGV4OyBvIDwgZW5kOyBvKyspeyAvL2FkZFxyXG4gICAgICAgICAgICAvLyBwcm90b3R5cGUgaW5oZXJpdFxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ld0xpc3Rbb107XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gXy5jcmVhdGVPYmplY3QoZXh0cmEpO1xyXG4gICAgICAgICAgICB1cGRhdGVUYXJnZXQoZGF0YSwgbywgaXRlbSwgcmF3TmV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlY3Rpb24gPSBzZWxmLiRjb21waWxlKGFzdC5ib2R5LCB7XHJcbiAgICAgICAgICAgICAgZXh0cmE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgbmFtZXNwYWNlOm5hbWVzcGFjZSxcclxuICAgICAgICAgICAgICByZWNvcmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXIsXHJcbiAgICAgICAgICAgICAgY3Vyc29yOiBjdXJzb3JcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgc2VjdGlvbi5kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgLy8gYXV0b2xpbmtcclxuICAgICAgICAgICAgdmFyIGluc2VydCA9ICBjb21iaW5lLmxhc3QoZ3JvdXAuZ2V0KG8pKTtcclxuICAgICAgICAgICAgaWYoaW5zZXJ0LnBhcmVudE5vZGUgJiYgIWN1cnNvciApe1xyXG4gICAgICAgICAgICAgIGFuaW1hdGUuaW5qZWN0KGNvbWJpbmUubm9kZShzZWN0aW9uKSxpbnNlcnQsICdhZnRlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGluc2VydC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb21iaW5lLm5vZGUoc2VjdGlvbiksIGluc2VydC5uZXh0U2libGluZyk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLnNwbGljZSggbyArIDEgLCAwLCBzZWN0aW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVRhcmdldCh0YXJnZXQsIGluZGV4LCBpdGVtLCByYXdOZXdWYWx1ZSl7XHJcbiAgICAgICAgICB0YXJnZXRbIGluZGV4TmFtZSBdID0gaW5kZXg7XHJcbiAgICAgICAgICBpZiggcmF3TmV3VmFsdWUgKXtcclxuICAgICAgICAgICAgdGFyZ2V0WyBrZXlOYW1lIF0gPSBpdGVtO1xyXG4gICAgICAgICAgICB0YXJnZXRbIHZhcmlhYmxlIF0gPSByYXdOZXdWYWx1ZVsgaXRlbSBdO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRhcmdldFsgdmFyaWFibGUgXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXlOYW1lXSA9IG51bGxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVSYW5nZShzdGFydCwgZW5kLCBuZXdMaXN0LCByYXdOZXdWYWx1ZSl7XHJcbiAgICAgICAgICBmb3IodmFyIGsgPSBzdGFydDsgayA8IGVuZDsgaysrKXsgLy8gbm8gY2hhbmdlXHJcbiAgICAgICAgICAgIHZhciBzZWN0ID0gZ3JvdXAuZ2V0KCBrICsgMSApLCBpdGVtID0gbmV3TGlzdFsgayBdO1xyXG4gICAgICAgICAgICB1cGRhdGVUYXJnZXQoc2VjdC5kYXRhLCBrLCBpdGVtLCByYXdOZXdWYWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVMRChuZXdMaXN0LCBvbGRMaXN0LCBzcGxpY2VzICwgcmF3TmV3VmFsdWUgKXtcclxuXHJcbiAgICAgICAgICB2YXIgY3VyID0gcGxhY2Vob2xkZXI7XHJcbiAgICAgICAgICB2YXIgbSA9IDAsIGxlbiA9IG5ld0xpc3QubGVuZ3RoO1xyXG5cclxuICAgICAgICAgIGlmKCFzcGxpY2VzICYmIChsZW4gIT09MCB8fCBvbGRMaXN0Lmxlbmd0aCAhPT0wKSAgKXtcclxuICAgICAgICAgICAgc3BsaWNlcyA9IGRpZmZBcnJheShuZXdMaXN0LCBvbGRMaXN0LCB0cnVlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZighc3BsaWNlcyB8fCAhc3BsaWNlcy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3BsaWNlcy5sZW5ndGg7IGkrKyl7IC8vaW5pdFxyXG4gICAgICAgICAgICB2YXIgc3BsaWNlID0gc3BsaWNlc1tpXTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3BsaWNlLmluZGV4OyAvLyBiZWFjdXNlIHdlIHVzZSBhIGNvbW1lbnQgZm9yIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgICAgIHZhciByZW1vdmVkID0gc3BsaWNlLnJlbW92ZWQ7XHJcbiAgICAgICAgICAgIHZhciBhZGQgPSBzcGxpY2UuYWRkO1xyXG4gICAgICAgICAgICB2YXIgcmxlbiA9IHJlbW92ZWQubGVuZ3RoO1xyXG4gICAgICAgICAgICAvLyBmb3IgdHJhY2tcclxuICAgICAgICAgICAgaWYoIHRyYWNrICYmIHJsZW4gJiYgYWRkICl7XHJcbiAgICAgICAgICAgICAgdmFyIG1pbmFyID0gTWF0aC5taW4ocmxlbiwgYWRkKTtcclxuICAgICAgICAgICAgICB2YXIgdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICB3aGlsZSh0SW5kZXggPCBtaW5hcil7XHJcbiAgICAgICAgICAgICAgICBpZigga2V5T2YobmV3TGlzdFtpbmRleF0sIGluZGV4KSAhPT0ga2V5T2YoIHJlbW92ZWRbMF0sIGluZGV4ICkgKXtcclxuICAgICAgICAgICAgICAgICAgcmVtb3ZlUmFuZ2UoaW5kZXgsIDEsIGNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgICBhZGRSYW5nZShpbmRleCwgaW5kZXgrMSwgbmV3TGlzdCwgcmF3TmV3VmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZW1vdmVkLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICBhZGQtLTtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB0SW5kZXgrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmxlbiA9IHJlbW92ZWQubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZVxyXG4gICAgICAgICAgICB1cGRhdGVSYW5nZShtLCBpbmRleCwgbmV3TGlzdCwgcmF3TmV3VmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlUmFuZ2UoIGluZGV4ICxybGVuLCBjaGlsZHJlbilcclxuXHJcbiAgICAgICAgICAgIGFkZFJhbmdlKGluZGV4LCBpbmRleCthZGQsIG5ld0xpc3QsIHJhd05ld1ZhbHVlKVxyXG5cclxuICAgICAgICAgICAgbSA9IGluZGV4ICsgYWRkIC0gcmxlbjtcclxuICAgICAgICAgICAgbSAgPSBtIDwgMD8gMCA6IG07XHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYobSA8IGxlbil7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IG07IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICAgICAgdmFyIHBhaXIgPSBncm91cC5nZXQoaSArIDEpO1xyXG4gICAgICAgICAgICAgIHBhaXIuZGF0YVtpbmRleE5hbWVdID0gaTtcclxuICAgICAgICAgICAgICAvLyBAVE9ETyBmaXgga2V5c1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiB0aGUgdHJhY2sgaXMgY29uc3RhbnQgdGVzdC5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVTaW1wbGUobmV3TGlzdCwgb2xkTGlzdCwgcmF3TmV3VmFsdWUgKXtcclxuXHJcbiAgICAgICAgICB2YXIgbmxlbiA9IG5ld0xpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgdmFyIG9sZW4gPSBvbGRMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgIHZhciBtbGVuID0gTWF0aC5taW4obmxlbiwgb2xlbik7XHJcblxyXG4gICAgICAgICAgdXBkYXRlUmFuZ2UoMCwgbWxlbiwgbmV3TGlzdCwgcmF3TmV3VmFsdWUpXHJcbiAgICAgICAgICBpZihubGVuIDwgb2xlbil7IC8vbmVlZCBhZGRcclxuICAgICAgICAgICAgcmVtb3ZlUmFuZ2Uobmxlbiwgb2xlbi1ubGVuLCBjaGlsZHJlbik7XHJcbiAgICAgICAgICB9ZWxzZSBpZihubGVuID4gb2xlbil7XHJcbiAgICAgICAgICAgIGFkZFJhbmdlKG9sZW4sIG5sZW4sIG5ld0xpc3QsIHJhd05ld1ZhbHVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZShuZXdWYWx1ZSwgb2xkVmFsdWUsIHNwbGljZXMpe1xyXG5cclxuICAgICAgICAgIHZhciBuVHlwZSA9IF8udHlwZU9mKCBuZXdWYWx1ZSApO1xyXG4gICAgICAgICAgdmFyIG9UeXBlID0gXy50eXBlT2YoIG9sZFZhbHVlICk7XHJcblxyXG4gICAgICAgICAgdmFyIG5ld0xpc3QgPSBnZXRMaXN0RnJvbVZhbHVlKCBuZXdWYWx1ZSwgblR5cGUgKTtcclxuICAgICAgICAgIHZhciBvbGRMaXN0ID0gZ2V0TGlzdEZyb21WYWx1ZSggb2xkVmFsdWUsIG9UeXBlICk7XHJcblxyXG4gICAgICAgICAgdmFyIHJhd05ld1ZhbHVlO1xyXG5cclxuXHJcbiAgICAgICAgICB2YXIgbmxlbiA9IG5ld0xpc3QgJiYgbmV3TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICB2YXIgb2xlbiA9IG9sZExpc3QgJiYgb2xkTGlzdC5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgLy8gaWYgcHJldmlvdXMgbGlzdCBoYXMgLCB3ZSBuZWVkIHRvIHJlbW92ZSB0aGUgYWx0bmF0ZWQgc2VjdGlvbi5cclxuICAgICAgICAgIGlmKCAhb2xlbiAmJiBubGVuICYmIGdyb3VwLmdldCgxKSApe1xyXG4gICAgICAgICAgICB2YXIgYWx0R3JvdXAgPSBjaGlsZHJlbi5wb3AoKTtcclxuICAgICAgICAgICAgaWYoYWx0R3JvdXAuZGVzdHJveSkgIGFsdEdyb3VwLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYoIG5UeXBlID09PSAnb2JqZWN0JyApIHJhd05ld1ZhbHVlID0gbmV3VmFsdWU7XHJcblxyXG4gICAgICAgICAgaWYodHJhY2sgPT09IHRydWUpe1xyXG4gICAgICAgICAgICB1cGRhdGVTaW1wbGUoIG5ld0xpc3QsIG9sZExpc3QsICByYXdOZXdWYWx1ZSApO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHVwZGF0ZUxEKCBuZXdMaXN0LCBvbGRMaXN0LCBzcGxpY2VzLCByYXdOZXdWYWx1ZSApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEAgeyNsaXN0fSB7I2Vsc2V9XHJcbiAgICAgICAgICBpZiggIW5sZW4gJiYgYWx0ZXJuYXRlICYmIGFsdGVybmF0ZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICB2YXIgc2VjdGlvbiA9IHNlbGYuJGNvbXBpbGUoYWx0ZXJuYXRlLCB7XHJcbiAgICAgICAgICAgICAgZXh0cmE6IGV4dHJhLFxyXG4gICAgICAgICAgICAgIHJlY29yZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBvdXRlcjogb3B0aW9ucy5vdXRlcixcclxuICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHNlY3Rpb24pO1xyXG4gICAgICAgICAgICBpZihwbGFjZWhvbGRlci5wYXJlbnROb2RlKXtcclxuICAgICAgICAgICAgICBhbmltYXRlLmluamVjdChjb21iaW5lLm5vZGUoc2VjdGlvbiksIHBsYWNlaG9sZGVyLCAnYWZ0ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kd2F0Y2goYXN0LnNlcXVlbmNlLCB1cGRhdGUsIHtcclxuICAgICAgICAgIGluaXQ6IHRydWUsXHJcbiAgICAgICAgICBkaWZmOiB0cmFjayAhPT0gdHJ1ZSAsXHJcbiAgICAgICAgICBkZWVwOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9ARklYSVQsIGJlYWN1c2UgaXQgaXMgc3luYyBwcm9jZXNzLCB3ZSBjYW5cclxuICAgICAgICBjdXJzb3IgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBncm91cDtcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAvLyB7I2luY2x1ZGUgfSBvciB7I2luYyB0ZW1wbGF0ZX1cclxuICAgICAgd2Fsa2Vycy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBhc3QuY29udGVudCwgY29tcGlsZWQ7XHJcbiAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnaW5sY3VkZScpO1xyXG4gICAgICAgIHZhciBjb21waWxlZCwgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsIGV4dHJhID0gb3B0aW9ucy5leHRyYTtcclxuICAgICAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoW3BsYWNlaG9sZGVyXSk7XHJcbiAgICAgICAgdmFyIGN1cnNvciA9IG9wdGlvbnMuY3Vyc29yO1xyXG5cclxuICAgICAgICBpbnNlcnRQbGFjZUhvbGRlcihwbGFjZWhvbGRlciwgY3Vyc29yKTtcclxuXHJcbiAgICAgICAgaWYoY29udGVudCl7XHJcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICB0aGlzLiR3YXRjaChjb250ZW50LCBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgICAgICAgICAgIHZhciByZW1vdmVkID0gZ3JvdXAuZ2V0KDEpLCB0eXBlPSB0eXBlb2YgdmFsdWU7XHJcbiAgICAgICAgICAgIGlmKCByZW1vdmVkKXtcclxuICAgICAgICAgICAgICByZW1vdmVkLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgZ3JvdXAuY2hpbGRyZW4ucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBncm91cC5wdXNoKCBjb21waWxlZCA9IHR5cGUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZShjdXJzb3I/IHtjdXJzb3I6IGN1cnNvcn06IG51bGwpOiBzZWxmLiRjb21waWxlKCB0eXBlICE9PSAnb2JqZWN0Jz8gU3RyaW5nKHZhbHVlKTogdmFsdWUsIHtcclxuICAgICAgICAgICAgICByZWNvcmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXIsXHJcbiAgICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2UsXHJcbiAgICAgICAgICAgICAgY3Vyc29yOiBjdXJzb3IsXHJcbiAgICAgICAgICAgICAgZXh0cmE6IGV4dHJhfSkgKTtcclxuICAgICAgICAgICAgaWYocGxhY2Vob2xkZXIucGFyZW50Tm9kZSAmJiAhY3Vyc29yKSB7XHJcbiAgICAgICAgICAgICAgY29tcGlsZWQuJGluamVjdChwbGFjZWhvbGRlciwgJ2JlZm9yZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sIE9QVElPTlMuSU5JVCk7XHJcbiAgICAgICAgICBjdXJzb3IgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmdW5jdGlvbiBnZXRMaXN0RnJvbVZhbHVlKHZhbHVlLCB0eXBlKXtcclxuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2FycmF5Jz8gdmFsdWU6ICh0eXBlID09PSAnb2JqZWN0Jz8gXy5rZXlzKHZhbHVlKSA6ICBbXSk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvLyBob3cgdG8gcmVzb2x2ZSB0aGlzIHByb2JsZW1cclxuICAgICAgdmFyIGlpID0gMDtcclxuICAgICAgd2Fsa2Vyc1snaWYnXSA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLCBjb25zZXF1ZW50LCBhbHRlcm5hdGUsIGV4dHJhID0gb3B0aW9ucy5leHRyYTtcclxuICAgICAgICBpZihvcHRpb25zICYmIG9wdGlvbnMuZWxlbWVudCl7IC8vIGF0dHJpYnV0ZSBpbnRlcGxhdGlvblxyXG4gICAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKG52YWx1ZSl7XHJcbiAgICAgICAgICAgIGlmKCEhbnZhbHVlKXtcclxuICAgICAgICAgICAgICBpZihhbHRlcm5hdGUpIGNvbWJpbmUuZGVzdHJveShhbHRlcm5hdGUpXHJcbiAgICAgICAgICAgICAgaWYoYXN0LmNvbnNlcXVlbnQpIGNvbnNlcXVlbnQgPSBzZWxmLiRjb21waWxlKGFzdC5jb25zZXF1ZW50LCB7XHJcbiAgICAgICAgICAgICAgICByZWNvcmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBvcHRpb25zLmVsZW1lbnQgLFxyXG4gICAgICAgICAgICAgICAgZXh0cmE6ZXh0cmFcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgaWYoIGNvbnNlcXVlbnQgKSBjb21iaW5lLmRlc3Ryb3koY29uc2VxdWVudClcclxuICAgICAgICAgICAgICBpZiggYXN0LmFsdGVybmF0ZSApIGFsdGVybmF0ZSA9IHNlbGYuJGNvbXBpbGUoYXN0LmFsdGVybmF0ZSwge3JlY29yZDogdHJ1ZSwgZWxlbWVudDogb3B0aW9ucy5lbGVtZW50LCBleHRyYTogZXh0cmF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy4kd2F0Y2goYXN0LnRlc3QsIHVwZGF0ZSwgT1BUSU9OUy5GT1JDRSk7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGlmKGNvbnNlcXVlbnQpIGNvbWJpbmUuZGVzdHJveShjb25zZXF1ZW50KTtcclxuICAgICAgICAgICAgICBlbHNlIGlmKGFsdGVybmF0ZSkgY29tYmluZS5kZXN0cm95KGFsdGVybmF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0ZXN0LCBub2RlO1xyXG4gICAgICAgIHZhciBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCJSZWd1bGFyIGlmXCIgKyBpaSsrKTtcclxuICAgICAgICB2YXIgZ3JvdXAgPSBuZXcgR3JvdXAoKTtcclxuICAgICAgICBncm91cC5wdXNoKHBsYWNlaG9sZGVyKTtcclxuICAgICAgICB2YXIgcHJlVmFsdWUgPSBudWxsLCBuYW1lc3BhY2U9IG9wdGlvbnMubmFtZXNwYWNlO1xyXG4gICAgICAgIHZhciBjdXJzb3IgPSBvcHRpb25zLmN1cnNvcjtcclxuICAgICAgICBpbnNlcnRQbGFjZUhvbGRlcihwbGFjZWhvbGRlciwgY3Vyc29yKVxyXG5cclxuICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKG52YWx1ZSwgb2xkKXtcclxuICAgICAgICAgIHZhciB2YWx1ZSA9ICEhbnZhbHVlLCBjb21waWxlZFNlY3Rpb247XHJcbiAgICAgICAgICBpZih2YWx1ZSA9PT0gcHJlVmFsdWUpIHJldHVybjtcclxuICAgICAgICAgIHByZVZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICBpZihncm91cC5jaGlsZHJlblsxXSl7XHJcbiAgICAgICAgICAgIGdyb3VwLmNoaWxkcmVuWzFdLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgICAgICAgIGdyb3VwLmNoaWxkcmVuLnBvcCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGN1ck9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHJlY29yZDogdHJ1ZSxcclxuICAgICAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXIsXHJcbiAgICAgICAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlLFxyXG4gICAgICAgICAgICBleHRyYTogZXh0cmEsXHJcbiAgICAgICAgICAgIGN1cnNvcjogY3Vyc29yXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZih2YWx1ZSl7IC8vdHJ1ZVxyXG5cclxuICAgICAgICAgICAgaWYoYXN0LmNvbnNlcXVlbnQgJiYgYXN0LmNvbnNlcXVlbnQubGVuZ3RoKXtcclxuICAgICAgICAgICAgICBjb21waWxlZFNlY3Rpb24gPSBzZWxmLiRjb21waWxlKCBhc3QuY29uc2VxdWVudCAsIGN1ck9wdGlvbnMgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7IC8vZmFsc2VcclxuICAgICAgICAgICAgaWYoYXN0LmFsdGVybmF0ZSAmJiBhc3QuYWx0ZXJuYXRlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgY29tcGlsZWRTZWN0aW9uID0gc2VsZi4kY29tcGlsZShhc3QuYWx0ZXJuYXRlLCBjdXJPcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gcGxhY2Vob2xkZXIucGFyZW50Tm9kZSAmJiBwbGFjZWhvbGRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggbm9kZSwgcGxhY2Vob2xkZXIgKTtcclxuICAgICAgICAgIGlmKGNvbXBpbGVkU2VjdGlvbil7XHJcbiAgICAgICAgICAgIGdyb3VwLnB1c2goY29tcGlsZWRTZWN0aW9uICk7XHJcbiAgICAgICAgICAgIGlmKHBsYWNlaG9sZGVyLnBhcmVudE5vZGUgJiYgIWN1cnNvcil7XHJcbiAgICAgICAgICAgICAgYW5pbWF0ZS5pbmplY3QoY29tYmluZS5ub2RlKGNvbXBpbGVkU2VjdGlvbiksIHBsYWNlaG9sZGVyLCAnYmVmb3JlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGN1cnNvciA9IG51bGw7XHJcbiAgICAgICAgICAvLyBhZnRlciBmaXJzdCBtb3VudCAsIHdlIG5lZWQgY2xlYXIgdGhpcyBmbGF0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiR3YXRjaChhc3QudGVzdCwgdXBkYXRlLCBPUFRJT05TLkZPUkNFX0lOSVQpO1xyXG5cclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB3YWxrZXJzLl9oYW5kbGVNb3VudFRleHQgPSBmdW5jdGlvbihjdXJzb3IsIGFzdFRleHQpe1xyXG4gICAgICAgIHZhciBub2RlLCBtb3VudE5vZGUgPSBjdXJzb3Iubm9kZTtcclxuICAgICAgICAvLyBmaXggdW51c2VkIGJsYWNrIGluIGFzdFRleHQ7XHJcbiAgICAgICAgdmFyIG5vZGVUZXh0ID0gZG9tLnRleHQobW91bnROb2RlKTtcclxuXHJcbiAgICAgICAgaWYoIG5vZGVUZXh0ID09PSBhc3RUZXh0ICl7XHJcbiAgICAgICAgICBub2RlID0gbW91bnROb2RlO1xyXG4gICAgICAgICAgY3Vyc29yLm5leHQoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIC8vIG1heWJlIGhhdmUgc29tZSByZWR1bmRhbmN5ICBibGFua1xyXG4gICAgICAgICAgdmFyIGluZGV4ID0gbm9kZVRleHQuaW5kZXhPZihhc3RUZXh0KTtcclxuICAgICAgICAgIGlmKH5pbmRleCl7XHJcbiAgICAgICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhc3RUZXh0KTtcclxuICAgICAgICAgICAgZG9tLnRleHQoIG1vdW50Tm9kZSwgbm9kZVRleHQuc2xpY2UoaW5kZXggKyBhc3RUZXh0Lmxlbmd0aCkgKTtcclxuICAgICAgICAgICAgZG9tLmluamVjdChub2RlLCBtb3VudE5vZGUsICdiZWZvcmUnKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlmKCBfLmJsYW5rUmVnLnRlc3QoIGFzdFRleHQgKSApeyB9XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCBNU0dbRVJST1IuVU5NQVRDSEVEX0FTVF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB3YWxrZXJzLmV4cHJlc3Npb24gPSBmdW5jdGlvbihhc3QsIG9wdGlvbnMpe1xyXG5cclxuICAgICAgICB2YXIgY3Vyc29yID0gb3B0aW9ucy5jdXJzb3IsIG5vZGUsXHJcbiAgICAgICAgICBtb3VudE5vZGUgPSBjdXJzb3IgJiYgY3Vyc29yLm5vZGU7XHJcblxyXG4gICAgICAgIGlmKG1vdW50Tm9kZSl7XHJcbiAgICAgICAgICAvL0BCVUc6IGlmIHNlcnZlciByZW5kZXIgJmd0OyBpbiBFeHByZXNzaW9uIHdpbGwgY2F1c2UgZXJyb3JcclxuICAgICAgICAgIHZhciBhc3RUZXh0ID0gXy50b1RleHQoIHRoaXMuJGdldChhc3QpICk7XHJcbiAgICAgICAgICBub2RlID0gd2Fsa2Vycy5faGFuZGxlTW91bnRUZXh0KGN1cnNvciwgYXN0VGV4dCk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kd2F0Y2goYXN0LCBmdW5jdGlvbihuZXd2YWwpe1xyXG4gICAgICAgICAgZG9tLnRleHQobm9kZSwgXy50b1RleHQobmV3dmFsKSk7XHJcbiAgICAgICAgfSwgT1BUSU9OUy5TVEFCTEVfSU5JVCApXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcblxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgd2Fsa2Vycy50ZXh0ID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcclxuICAgICAgICB2YXIgY3Vyc29yID0gb3B0aW9ucy5jdXJzb3IgLCBub2RlO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gYXN0LnRleHQ7XHJcbiAgICAgICAgdmFyIGFzdFRleHQgPSB0ZXh0LmluZGV4T2YoJyYnKSAhPT0gLTE/IF8uY29udmVydEVudGl0eSh0ZXh0KTogdGV4dDtcclxuXHJcbiAgICAgICAgaWYoY3Vyc29yICYmIGN1cnNvci5ub2RlKSB7XHJcbiAgICAgICAgICB2YXIgbW91bnROb2RlID0gY3Vyc29yLm5vZGU7XHJcbiAgICAgICAgICAvLyBtYXliZSByZWd1bGFyanMgcGFyc2VyIGhhdmUgc29tZSBkaWZmZXJlbmNlIHdpdGggaHRtbCBidWlsdGluIHBhcnNlciB3aGVuIHByb2Nlc3MgIGVtcHR5IHRleHRcclxuICAgICAgICAgIC8vIEB0b2RvIGVycm9yIHJlcG9ydFxyXG4gICAgICAgICAgaWYobW91bnROb2RlLm5vZGVUeXBlICE9PSAzICl7XHJcblxyXG4gICAgICAgICAgICBpZiggXy5ibGFua1JlZy50ZXN0KGFzdFRleHQpICkgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBjb2RlOiAgRVJST1IuVU5NQVRDSEVEX0FTVFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG5vZGUgPSB3YWxrZXJzLl9oYW5kbGVNb3VudFRleHQoIGN1cnNvciwgYXN0VGV4dCApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGUgfHwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoIGFzdFRleHQgKTtcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIHdhbGtlcnMgZWxlbWVudCAoY29udGFpbnMgY29tcG9uZW50KVxyXG4gICAgICAgKi9cclxuICAgICAgd2Fsa2Vycy5lbGVtZW50ID0gZnVuY3Rpb24oYXN0LCBvcHRpb25zKXtcclxuXHJcbiAgICAgICAgdmFyIGF0dHJzID0gYXN0LmF0dHJzLCBzZWxmID0gdGhpcyxcclxuICAgICAgICAgIENvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcixcclxuICAgICAgICAgIGNoaWxkcmVuID0gYXN0LmNoaWxkcmVuLFxyXG4gICAgICAgICAgbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsXHJcbiAgICAgICAgICBleHRyYSA9IG9wdGlvbnMuZXh0cmEsXHJcbiAgICAgICAgICBjdXJzb3IgPSBvcHRpb25zLmN1cnNvcixcclxuICAgICAgICAgIHRhZyA9IGFzdC50YWcsXHJcbiAgICAgICAgICBDb21wb25lbnQgPSBDb25zdHJ1Y3Rvci5jb21wb25lbnQodGFnKSxcclxuICAgICAgICAgIHJlZiwgZ3JvdXAsIGVsZW1lbnQsIG1vdW50Tm9kZTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYoIHRhZyA9PT0gJ3ItY29udGVudCcgKXtcclxuICAgICAgICAgIF8ubG9nKCdyLWNvbnRlbnQgaXMgZGVwcmVjYXRlZCwgdXNlIHsjaW5jIHRoaXMuJGJvZHl9IGluc3RlYWQgKGB7I2luY2x1ZGV9YCBhcyBzYW1lKScsICd3YXJuJyk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kYm9keSAmJiB0aGlzLiRib2R5KGN1cnNvcj8ge2N1cnNvcjogY3Vyc29yfTogbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gaWYgaW5pdGl0YWxpemVkIHdpdGggbW91bnQgbW9kZSwgc29tZXRpbWUsXHJcbiAgICAgICAgLy8gYnJvd3NlciB3aWxsIGlnbm9yZSB0aGUgd2hpdGVzcGFjZSBiZXR3ZWVuIG5vZGUsIGFuZCBzb21ldGltZXMgaXQgd29uJ3RcclxuICAgICAgICBpZihjdXJzb3IgKXtcclxuICAgICAgICAgIC8vIHRleHRDT250ZW50IHdpdGggRW1wdHkgdGV4dFxyXG4gICAgICAgICAgaWYoY3Vyc29yLm5vZGUgJiYgY3Vyc29yLm5vZGUubm9kZVR5cGUgPT09IDMpe1xyXG4gICAgICAgICAgICBpZihfLmJsYW5rUmVnLnRlc3QoZG9tLnRleHQoY3Vyc29yLm5vZGUpICkgKSBjdXJzb3IubmV4dCgpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKCAhQ29tcG9uZW50ICYmIHRhZyAhPT0gJ3ItY29tcG9uZW50JyApIHtcclxuICAgICAgICAgICAgICB0aHJvdyBFcnJvcihNU0dbRVJST1IuVU5NQVRDSEVEX0FTVF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihDb21wb25lbnQgfHwgdGFnID09PSAnci1jb21wb25lbnQnKXtcclxuICAgICAgICAgIG9wdGlvbnMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xyXG4gICAgICAgICAgcmV0dXJuIHdhbGtlcnMuY29tcG9uZW50LmNhbGwodGhpcywgYXN0LCBvcHRpb25zKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY3Vyc29yKSBtb3VudE5vZGUgPSBjdXJzb3Iubm9kZTtcclxuXHJcbiAgICAgICAgaWYodGFnID09PSAnc3ZnJykgbmFtZXNwYWNlID0gXCJzdmdcIjtcclxuICAgICAgICAvLyBARGVwcmVjYXRlZDogbWF5IGJlIHJlbW92ZWQgaW4gbmV4dCB2ZXJzaW9uLCB1c2UgeyNpbmMgfSBpbnN0ZWFkXHJcblxyXG4gICAgICAgIGlmKCBjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggKXtcclxuXHJcbiAgICAgICAgICB2YXIgc3ViTW91bnROb2RlID0gbW91bnROb2RlPyBtb3VudE5vZGUuZmlyc3RDaGlsZDogbnVsbDtcclxuICAgICAgICAgIGdyb3VwID0gdGhpcy4kY29tcGlsZShjaGlsZHJlbiwge1xyXG4gICAgICAgICAgICBleHRyYTogZXh0cmEgLFxyXG4gICAgICAgICAgICBvdXRlcjogb3B0aW9ucy5vdXRlcixcclxuICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2UsXHJcbiAgICAgICAgICAgIGN1cnNvcjogbm9kZUN1cnNvcihzdWJNb3VudE5vZGUsIG1vdW50Tm9kZSlcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmKG1vdW50Tm9kZSl7XHJcbiAgICAgICAgICBlbGVtZW50ID0gbW91bnROb2RlXHJcbiAgICAgICAgICBjdXJzb3IubmV4dCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZWxlbWVudCA9IGRvbS5jcmVhdGUoIHRhZywgbmFtZXNwYWNlLCBhdHRycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihncm91cCAmJiAhXy5pc1ZvaWRUYWcoIHRhZyApICYmICFtb3VudE5vZGUgKXsgLy8gaWYgbm90IGluaXQgd2l0aCBtb3VudCBtb2RlXHJcbiAgICAgICAgICBhbmltYXRlLmluamVjdCggY29tYmluZS5ub2RlKCBncm91cCApICwgZWxlbWVudClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZpeCB0YWcgYXN0LCBzb21lIGluZm9tYXRpb24gb25seSBhdmFsaWFibGUgYXQgcnVudGltZSAoZGlyZWN0aXZlIGV0Yy4uKVxyXG4gICAgICAgIF8uZml4VGFnQVNUKGFzdCwgQ29uc3RydWN0b3IpXHJcblxyXG4gICAgICAgIHZhciBkZXN0cm9pZXMgPSB3YWxrQXR0cmlidXRlcy5jYWxsKHRoaXMsIGF0dHJzLCBlbGVtZW50LCBleHRyYSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiBcImVsZW1lbnRcIixcclxuICAgICAgICAgIGdyb3VwOiBncm91cCxcclxuICAgICAgICAgIG5vZGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGxhc3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKGZpcnN0KXtcclxuICAgICAgICAgICAgaWYoIGZpcnN0ICl7XHJcbiAgICAgICAgICAgICAgYW5pbWF0ZS5yZW1vdmUoIGVsZW1lbnQsIGdyb3VwPyBncm91cC5kZXN0cm95LmJpbmQoIGdyb3VwICk6IF8ubm9vcCApO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihncm91cCkge1xyXG4gICAgICAgICAgICAgIGdyb3VwLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBkZXN0cm95IHJlZlxyXG4gICAgICAgICAgICBpZiggZGVzdHJvaWVzLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICBkZXN0cm9pZXMuZm9yRWFjaChmdW5jdGlvbiggZGVzdHJveSApe1xyXG4gICAgICAgICAgICAgICAgaWYoIGRlc3Ryb3kgKXtcclxuICAgICAgICAgICAgICAgICAgaWYoIHR5cGVvZiBkZXN0cm95LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicgKXtcclxuICAgICAgICAgICAgICAgICAgICBkZXN0cm95LmRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB3YWxrZXJzLmNvbXBvbmVudCA9IGZ1bmN0aW9uKGFzdCwgb3B0aW9ucyl7XHJcbiAgICAgICAgdmFyIGF0dHJzID0gYXN0LmF0dHJzLFxyXG4gICAgICAgICAgQ29tcG9uZW50ID0gb3B0aW9ucy5Db21wb25lbnQsXHJcbiAgICAgICAgICBjdXJzb3IgPSBvcHRpb25zLmN1cnNvcixcclxuICAgICAgICAgIENvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcixcclxuICAgICAgICAgIGlzb2xhdGUsXHJcbiAgICAgICAgICBleHRyYSA9IG9wdGlvbnMuZXh0cmEsXHJcbiAgICAgICAgICBuYW1lc3BhY2UgPSBvcHRpb25zLm5hbWVzcGFjZSxcclxuICAgICAgICAgIHJlZkRpcmVjdGl2ZSA9IHdhbGtlcnMuUmVndWxhci5kaXJlY3RpdmUoJ3JlZicpLFxyXG4gICAgICAgICAgcmVmLCBzZWxmID0gdGhpcywgaXM7XHJcblxyXG4gICAgICAgIHZhciBkYXRhID0ge30sIGV2ZW50cztcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gYXR0cnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xyXG4gICAgICAgICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcclxuICAgICAgICAgIC8vIGNvbnNpZGVyIGRpc2FibGVkICAgZXF1bGFzdG8gIGRpc2FibGVkPXt0cnVlfVxyXG5cclxuICAgICAgICAgIHNoYXJlZC5wcmVwYXJlQXR0ciggYXR0ciwgYXR0ci5uYW1lID09PSAncmVmJyAmJiByZWZEaXJlY3RpdmUgKTtcclxuXHJcbiAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl90b3VjaEV4cHIoYXR0ci52YWx1ZSA9PT0gdW5kZWZpbmVkPyB0cnVlOiBhdHRyLnZhbHVlKTtcclxuICAgICAgICAgIGlmKHZhbHVlLmNvbnN0YW50KSB2YWx1ZSA9IGF0dHIudmFsdWUgPSB2YWx1ZS5nZXQodGhpcyk7XHJcbiAgICAgICAgICBpZihhdHRyLnZhbHVlICYmIGF0dHIudmFsdWUuY29uc3RhbnQgPT09IHRydWUpe1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmdldCh0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lO1xyXG4gICAgICAgICAgaWYoIWF0dHIuZXZlbnQpe1xyXG4gICAgICAgICAgICB2YXIgZXRlc3QgPSBuYW1lLm1hdGNoKF8uZXZlbnRSZWcpO1xyXG4gICAgICAgICAgICAvLyBldmVudDogJ25hdidcclxuICAgICAgICAgICAgaWYoZXRlc3QpIGF0dHIuZXZlbnQgPSBldGVzdFsxXTtcclxuICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgLy8gQGRlcHJlY2F0ZWQgIHVzZVxyXG4gICAgICAgICAgaWYoYXR0ci5tZGYgPT09ICdjbXBsJyl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXy5nZXRDb21waWxlRm4odmFsdWUsIHRoaXMsIHtcclxuICAgICAgICAgICAgICByZWNvcmQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgbmFtZXNwYWNlOm5hbWVzcGFjZSxcclxuICAgICAgICAgICAgICBleHRyYTogZXh0cmEsXHJcbiAgICAgICAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB0aXRsZSA9IHt+IDxoMj57bmFtZX08L2gyPn1cclxuICAgICAgICAgIGlmKHZhbHVlLnR5cGUgPT09ICdib2R5Jyl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXy5nZXRDb21waWxlRm4odmFsdWUuYm9keSwgdGhpcywge1xyXG4gICAgICAgICAgICAgIHJlY29yZDogdHJ1ZSxcclxuICAgICAgICAgICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZSxcclxuICAgICAgICAgICAgICBleHRyYTogZXh0cmEsXHJcbiAgICAgICAgICAgICAgb3V0ZXI6IG9wdGlvbnMub3V0ZXJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBAaWYgaXMgci1jb21wb25lbnQgLiB3ZSBuZWVkIHRvIGZpbmQgdGhlIHRhcmdldCBDb21wb25lbnRcclxuICAgICAgICAgIGlmKG5hbWUgPT09ICdpcycgJiYgIUNvbXBvbmVudCl7XHJcbiAgICAgICAgICAgIGlzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBjb21wb25lbnROYW1lID0gdGhpcy4kZ2V0KHZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgQ29tcG9uZW50ID0gQ29uc3RydWN0b3IuY29tcG9uZW50KGNvbXBvbmVudE5hbWUpXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBDb21wb25lbnQgIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBFcnJvcihcImNvbXBvbmVudCBcIiArIGNvbXBvbmVudE5hbWUgKyBcIiBoYXMgbm90IHJlZ2lzdGVkIVwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIGJpbmQgZXZlbnQgcHJveHlcclxuICAgICAgICAgIHZhciBldmVudE5hbWU7XHJcbiAgICAgICAgICBpZihldmVudE5hbWUgPSBhdHRyLmV2ZW50KXtcclxuICAgICAgICAgICAgZXZlbnRzID0gZXZlbnRzIHx8IHt9O1xyXG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IF8uaGFuZGxlRXZlbnQuY2FsbCh0aGlzLCB2YWx1ZSwgZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIG5hbWUgPSBhdHRyLm5hbWUgPSBfLmNhbWVsQ2FzZSggbmFtZSApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKCF2YWx1ZSB8fCB2YWx1ZS50eXBlICE9PSAnZXhwcmVzc2lvbicpe1xyXG4gICAgICAgICAgICBkYXRhW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZGF0YVtuYW1lXSA9IHZhbHVlLmdldChzZWxmKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCBuYW1lID09PSAncmVmJyAgJiYgdmFsdWUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJlZiA9IHZhbHVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiggbmFtZSA9PT0gJ2lzb2xhdGUnKXtcclxuICAgICAgICAgICAgLy8gMTogc3RvcDogY29tcG9zaXRlIC0+IHBhcmVudFxyXG4gICAgICAgICAgICAvLyAyLiBzdG9wOiBjb21wb3NpdGUgPC0gcGFyZW50XHJcbiAgICAgICAgICAgIC8vIDMuIHN0b3AgMSBhbmQgMjogY29tcG9zaXRlIDwtPiBwYXJlbnRcclxuICAgICAgICAgICAgLy8gMC4gc3RvcCBub3RoaW5nIChkZWZ1YWx0KVxyXG4gICAgICAgICAgICBpc29sYXRlID0gdmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nPyB2YWx1ZS5nZXQoc2VsZik6IHBhcnNlSW50KHZhbHVlID09PSB0cnVlPyAzOiB2YWx1ZSwgMTApO1xyXG4gICAgICAgICAgICBkYXRhLmlzb2xhdGUgPSBpc29sYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgZXZlbnRzOiBldmVudHMsXHJcbiAgICAgICAgICAkcGFyZW50OiAoaXNvbGF0ZSAmIDIpPyBudWxsOiB0aGlzLFxyXG4gICAgICAgICAgJHJvb3Q6IHRoaXMuJHJvb3QsXHJcbiAgICAgICAgICAkb3V0ZXI6IG9wdGlvbnMub3V0ZXIsXHJcbiAgICAgICAgICBfYm9keToge1xyXG4gICAgICAgICAgICBjdHg6IHRoaXMsXHJcbiAgICAgICAgICAgIGFzdDogYXN0LmNoaWxkcmVuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2UsXHJcbiAgICAgICAgICBjdXJzb3I6IGN1cnNvcixcclxuICAgICAgICAgIGV4dHJhOiBvcHRpb25zLmV4dHJhXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQoZGVmaW5pdGlvbiwgb3B0aW9ucyksIHJlZmxpbms7XHJcblxyXG5cclxuICAgICAgICBpZihyZWYgJiYgdGhpcy4kcmVmcyl7XHJcbiAgICAgICAgICByZWZsaW5rID0gcmVmRGlyZWN0aXZlLmxpbms7XHJcbiAgICAgICAgICB2YXIgcmVmRGVzdHJveSA9IHJlZmxpbmsuY2FsbCh0aGlzLCBjb21wb25lbnQsIHJlZik7XHJcbiAgICAgICAgICBjb21wb25lbnQuJG9uKCckZGVzdHJveScsIHJlZkRlc3Ryb3kpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhdHRycy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICB2YXIgYXR0ciA9IGF0dHJzW2ldO1xyXG4gICAgICAgICAgdmFyIHZhbHVlID0gYXR0ci52YWx1ZXx8dHJ1ZTtcclxuICAgICAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lO1xyXG4gICAgICAgICAgLy8gbmVlZCBjb21waWxlZFxyXG4gICAgICAgICAgaWYodmFsdWUudHlwZSA9PT0gJ2V4cHJlc3Npb24nICYmICFhdHRyLmV2ZW50KXtcclxuICAgICAgICAgICAgdmFsdWUgPSBzZWxmLl90b3VjaEV4cHIodmFsdWUpO1xyXG4gICAgICAgICAgICAvLyB1c2UgYml0IG9wZXJhdGUgdG8gY29udHJvbCBzY29wZVxyXG4gICAgICAgICAgICBpZiggIShpc29sYXRlICYgMikgKVxyXG4gICAgICAgICAgICAgIHRoaXMuJHdhdGNoKHZhbHVlLCAoZnVuY3Rpb24obmFtZSwgdmFsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVtuYW1lXSA9IHZhbDtcclxuICAgICAgICAgICAgICB9KS5iaW5kKGNvbXBvbmVudCwgbmFtZSksIE9QVElPTlMuU1lOQylcclxuICAgICAgICAgICAgaWYoIHZhbHVlLnNldCAmJiAhKGlzb2xhdGUgJiAxICkgKVxyXG4gICAgICAgICAgICAvLyBzeW5jIHRoZSBkYXRhLiBpdCBmb3JjZSB0aGUgY29tcG9uZW50IGRvbid0IHRyaWdnZXIgYXR0ci5uYW1lJ3MgZmlyc3QgZGlydHkgZWNoZWNrXHJcbiAgICAgICAgICAgICAgY29tcG9uZW50LiR3YXRjaChuYW1lLCBzZWxmLiR1cGRhdGUuYmluZChzZWxmLCB2YWx1ZSksIE9QVElPTlMuSU5JVCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzICYmIGlzLnR5cGUgPT09ICdleHByZXNzaW9uJyAgKXtcclxuICAgICAgICAgIHZhciBncm91cCA9IG5ldyBHcm91cCgpO1xyXG4gICAgICAgICAgZ3JvdXAucHVzaChjb21wb25lbnQpO1xyXG4gICAgICAgICAgdGhpcy4kd2F0Y2goaXMsIGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgICAgICAgLy8gZm91bmQgdGhlIG5ldyBjb21wb25lbnRcclxuICAgICAgICAgICAgdmFyIENvbXBvbmVudCA9IENvbnN0cnVjdG9yLmNvbXBvbmVudCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmKCFDb21wb25lbnQpIHRocm93IG5ldyBFcnJvcihcImNvbXBvbmVudCBcIiArIHZhbHVlICsgXCIgaGFzIG5vdCByZWdpc3RlZCFcIik7XHJcbiAgICAgICAgICAgIHZhciBuY29tcG9uZW50ID0gbmV3IENvbXBvbmVudChkZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IGdyb3VwLmNoaWxkcmVuLnBvcCgpO1xyXG4gICAgICAgICAgICBncm91cC5wdXNoKG5jb21wb25lbnQpO1xyXG4gICAgICAgICAgICBuY29tcG9uZW50LiRpbmplY3QoY29tYmluZS5sYXN0KGNvbXBvbmVudCksICdhZnRlcicpXHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIC8vIEBUT0RPICBpZiBjb21wb25lbnQgY2hhbmdlZCAsIHdlIG5lZWQgdXBkYXRlIHJlZlxyXG4gICAgICAgICAgICBpZihyZWYpe1xyXG4gICAgICAgICAgICAgIHZhciByZWZOYW1lID0gcmVmLmdldD8gcmVmLmdldCh0aGlzKTogcmVmO1xyXG4gICAgICAgICAgICAgIHNlbGYuJHJlZnNbcmVmTmFtZV0gPSBuY29tcG9uZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCBPUFRJT05TLlNZTkMpXHJcbiAgICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHdhbGtBdHRyaWJ1dGVzKGF0dHJzLCBlbGVtZW50LCBleHRyYSl7XHJcbiAgICAgICAgdmFyIGJpbmRpbmdzID0gW11cclxuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBhdHRycy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICB2YXIgYmluZGluZyA9IHRoaXMuX3dhbGsoYXR0cnNbaV0sIHtlbGVtZW50OiBlbGVtZW50LCBmcm9tRWxlbWVudDogdHJ1ZSwgYXR0cnM6IGF0dHJzLCBleHRyYTogZXh0cmF9KVxyXG4gICAgICAgICAgaWYoYmluZGluZykgYmluZGluZ3MucHVzaChiaW5kaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJpbmRpbmdzO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgd2Fsa2Vycy5hdHRyaWJ1dGUgPSBmdW5jdGlvbihhc3QgLG9wdGlvbnMpe1xyXG5cclxuICAgICAgICB2YXIgYXR0ciA9IGFzdDtcclxuICAgICAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuICAgICAgICB2YXIgbmFtZSA9IGF0dHIubmFtZTtcclxuICAgICAgICB2YXIgZGlyZWN0aXZlID0gQ29tcG9uZW50LmRpcmVjdGl2ZShuYW1lKTtcclxuXHJcbiAgICAgICAgc2hhcmVkLnByZXBhcmVBdHRyKGFzdCwgZGlyZWN0aXZlKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbHVlID0gYXR0ci52YWx1ZSB8fCBcIlwiO1xyXG4gICAgICAgIHZhciBjb25zdGFudCA9IHZhbHVlLmNvbnN0YW50O1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50O1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblxyXG5cclxuICAgICAgICB2YWx1ZSA9IHRoaXMuX3RvdWNoRXhwcih2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmKGNvbnN0YW50KSB2YWx1ZSA9IHZhbHVlLmdldCh0aGlzKTtcclxuXHJcbiAgICAgICAgaWYoZGlyZWN0aXZlICYmIGRpcmVjdGl2ZS5saW5rKXtcclxuICAgICAgICAgIHZhciBleHRyYSA9IHtcclxuICAgICAgICAgICAgYXR0cnM6IG9wdGlvbnMuYXR0cnMsXHJcbiAgICAgICAgICAgIHBhcmFtOiBfLmdldFBhcmFtT2JqKHRoaXMsIGF0dHIucGFyYW0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgYmluZGluZyA9IGRpcmVjdGl2ZS5saW5rLmNhbGwoc2VsZiwgZWxlbWVudCwgdmFsdWUsIG5hbWUsIGV4dHJhKTtcclxuICAgICAgICAgIC8vIGlmIHVwZGF0ZSBoYXMgYmVlbiBwYXNzZWQgaW4gLCB3ZSB3aWxsICBhdXRvbWF0ZWx5IHdhdGNoIHZhbHVlIGZvciB1c2VyXHJcbiAgICAgICAgICBpZiggdHlwZW9mIGRpcmVjdGl2ZS51cGRhdGUgPT09ICdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICBpZihfLmlzRXhwcih2YWx1ZSkpe1xyXG4gICAgICAgICAgICAgIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbih2YWwsIG9sZCl7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmUudXBkYXRlLmNhbGwoc2VsZiwgZWxlbWVudCwgdmFsLCBvbGQsIGV4dHJhKTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBkaXJlY3RpdmUudXBkYXRlLmNhbGwoc2VsZiwgZWxlbWVudCwgdmFsdWUsIHVuZGVmaW5lZCwgZXh0cmEgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYodHlwZW9mIGJpbmRpbmcgPT09ICdmdW5jdGlvbicpIGJpbmRpbmcgPSB7ZGVzdHJveTogYmluZGluZ307XHJcbiAgICAgICAgICByZXR1cm4gYmluZGluZztcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICBpZih2YWx1ZS50eXBlID09PSAnZXhwcmVzc2lvbicgKXtcclxuICAgICAgICAgICAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWx1ZSwgb2xkKXtcclxuICAgICAgICAgICAgICBkb20uYXR0cihlbGVtZW50LCBuYW1lLCBudmFsdWUpO1xyXG4gICAgICAgICAgICB9LCBPUFRJT05TLlNUQUJMRV9JTklUKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZihfLmlzQm9vbGVhbkF0dHIobmFtZSkpe1xyXG4gICAgICAgICAgICAgIGRvbS5hdHRyKGVsZW1lbnQsIG5hbWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBkb20uYXR0cihlbGVtZW50LCBuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCFvcHRpb25zLmZyb21FbGVtZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgZG9tLmF0dHIoZWxlbWVudCwgbmFtZSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gaW5zZXJ0UGxhY2VIb2xkZXIocGxhY2Vob2xkZXIsIGN1cnNvcil7XHJcbiAgICAgICAgaWYoY3Vyc29yKXtcclxuICAgICAgICAgIGlmKGN1cnNvci5ub2RlKSBkb20uaW5qZWN0KCBwbGFjZWhvbGRlciAsIGN1cnNvci5ub2RlLCdiZWZvcmUnKVxyXG4gICAgICAgICAgZWxzZSBpZihjdXJzb3IucHJldikge1xyXG4gICAgICAgICAgICBkb20uaW5qZWN0KCBwbGFjZWhvbGRlciAsIGN1cnNvci5wcmV2LCdhZnRlcicpXHJcbiAgICAgICAgICAgIGN1cnNvci5wcmV2ID0gcGxhY2Vob2xkZXI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLyoqKi8gfSxcclxuICAgIC8qIDE4ICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNpbXBsZURpZmYobm93LCBvbGQpe1xyXG4gICAgICAgIHZhciBubGVuID0gbm93Lmxlbmd0aDtcclxuICAgICAgICB2YXIgb2xlbiA9IG9sZC5sZW5ndGg7XHJcbiAgICAgICAgaWYobmxlbiAhPT0gb2xlbil7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG5sZW4gOyBpKyspe1xyXG4gICAgICAgICAgaWYobm93W2ldICE9PSBvbGRbaV0pIHJldHVybiAgdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBlcXVhbHMoYSxiKXtcclxuICAgICAgICByZXR1cm4gYSA9PT0gYjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXJyYXkxIC0gb2xkIGFycmF5XHJcbiAgICAgIC8vIGFycmF5MiAtIG5ldyBhcnJheVxyXG4gICAgICBmdW5jdGlvbiBsZChhcnJheTEsIGFycmF5MiwgZXF1YWxGbil7XHJcbiAgICAgICAgdmFyIG4gPSBhcnJheTEubGVuZ3RoO1xyXG4gICAgICAgIHZhciBtID0gYXJyYXkyLmxlbmd0aDtcclxuICAgICAgICB2YXIgZXF1YWxGbiA9IGVxdWFsRm4gfHwgZXF1YWxzO1xyXG4gICAgICAgIHZhciBtYXRyaXggPSBbXTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDw9IG47IGkrKyl7XHJcbiAgICAgICAgICBtYXRyaXgucHVzaChbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGo9MTtqPD1tO2orKyl7XHJcbiAgICAgICAgICBtYXRyaXhbMF1bal09ajtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8PSBuOyBpKyspe1xyXG4gICAgICAgICAgZm9yKHZhciBqID0gMTsgaiA8PSBtOyBqKyspe1xyXG4gICAgICAgICAgICBpZihlcXVhbEZuKGFycmF5MVtpLTFdLCBhcnJheTJbai0xXSkpe1xyXG4gICAgICAgICAgICAgIG1hdHJpeFtpXVtqXSA9IG1hdHJpeFtpLTFdW2otMV07XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIG1hdHJpeFtpXVtqXSA9IE1hdGgubWluKFxyXG4gICAgICAgICAgICAgICAgbWF0cml4W2ktMV1bal0rMSwgLy9kZWxldGVcclxuICAgICAgICAgICAgICAgIG1hdHJpeFtpXVtqLTFdKzEvL2FkZFxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF0cml4O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGFycjIgLSBuZXcgYXJyYXlcclxuICAgICAgLy8gYXJyMSAtIG9sZCBhcnJheVxyXG4gICAgICBmdW5jdGlvbiBkaWZmQXJyYXkoYXJyMiwgYXJyMSwgZGlmZiwgZGlmZkZuKSB7XHJcbiAgICAgICAgaWYoIWRpZmYpIHJldHVybiBzaW1wbGVEaWZmKGFycjIsIGFycjEpO1xyXG4gICAgICAgIHZhciBtYXRyaXggPSBsZChhcnIxLCBhcnIyLCBkaWZmRm4pXHJcbiAgICAgICAgdmFyIG4gPSBhcnIxLmxlbmd0aDtcclxuICAgICAgICB2YXIgaSA9IG47XHJcbiAgICAgICAgdmFyIG0gPSBhcnIyLmxlbmd0aDtcclxuICAgICAgICB2YXIgaiA9IG07XHJcbiAgICAgICAgdmFyIGVkaXRzID0gW107XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBtYXRyaXhbaV1bal07XHJcbiAgICAgICAgd2hpbGUoaT4wIHx8IGo+MCl7XHJcbiAgICAgICAgICAvLyB0aGUgbGFzdCBsaW5lXHJcbiAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICBlZGl0cy51bnNoaWZ0KDMpO1xyXG4gICAgICAgICAgICBqLS07XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gdGhlIGxhc3QgY29sXHJcbiAgICAgICAgICBpZiAoaiA9PT0gMCkge1xyXG4gICAgICAgICAgICBlZGl0cy51bnNoaWZ0KDIpO1xyXG4gICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIG5vcnRoV2VzdCA9IG1hdHJpeFtpIC0gMV1baiAtIDFdO1xyXG4gICAgICAgICAgdmFyIHdlc3QgPSBtYXRyaXhbaSAtIDFdW2pdO1xyXG4gICAgICAgICAgdmFyIG5vcnRoID0gbWF0cml4W2ldW2ogLSAxXTtcclxuXHJcbiAgICAgICAgICB2YXIgbWluID0gTWF0aC5taW4obm9ydGgsIHdlc3QsIG5vcnRoV2VzdCk7XHJcblxyXG4gICAgICAgICAgaWYgKG1pbiA9PT0gd2VzdCkge1xyXG4gICAgICAgICAgICBlZGl0cy51bnNoaWZ0KDIpOyAvL2RlbGV0ZVxyXG4gICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSB3ZXN0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChtaW4gPT09IG5vcnRoV2VzdCApIHtcclxuICAgICAgICAgICAgaWYgKG5vcnRoV2VzdCA9PT0gY3VycmVudCkge1xyXG4gICAgICAgICAgICAgIGVkaXRzLnVuc2hpZnQoMCk7IC8vbm8gY2hhbmdlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZWRpdHMudW5zaGlmdCgxKTsgLy91cGRhdGVcclxuICAgICAgICAgICAgICBjdXJyZW50ID0gbm9ydGhXZXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgai0tO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWRpdHMudW5zaGlmdCgzKTsgLy9hZGRcclxuICAgICAgICAgICAgai0tO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gbm9ydGg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBMRUFWRSA9IDA7XHJcbiAgICAgICAgdmFyIEFERCA9IDM7XHJcbiAgICAgICAgdmFyIERFTEVMRSA9IDI7XHJcbiAgICAgICAgdmFyIFVQREFURSA9IDE7XHJcbiAgICAgICAgdmFyIG4gPSAwO209MDtcclxuICAgICAgICB2YXIgc3RlcHMgPSBbXTtcclxuICAgICAgICB2YXIgc3RlcCA9IHsgaW5kZXg6IG51bGwsIGFkZDowLCByZW1vdmVkOltdIH07XHJcblxyXG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZWRpdHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICBpZihlZGl0c1tpXSA+IDAgKXsgLy8gTk9UIExFQVZFXHJcbiAgICAgICAgICAgIGlmKHN0ZXAuaW5kZXggPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgIHN0ZXAuaW5kZXggPSBtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgeyAvL0xFQVZFXHJcbiAgICAgICAgICAgIGlmKHN0ZXAuaW5kZXggIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgc3RlcHMucHVzaChzdGVwKVxyXG4gICAgICAgICAgICAgIHN0ZXAgPSB7aW5kZXg6IG51bGwsIGFkZDowLCByZW1vdmVkOltdfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc3dpdGNoKGVkaXRzW2ldKXtcclxuICAgICAgICAgICAgY2FzZSBMRUFWRTpcclxuICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgbSsrO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFERDpcclxuICAgICAgICAgICAgICBzdGVwLmFkZCsrO1xyXG4gICAgICAgICAgICAgIG0rKztcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBERUxFTEU6XHJcbiAgICAgICAgICAgICAgc3RlcC5yZW1vdmVkLnB1c2goYXJyMVtuXSlcclxuICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVVBEQVRFOlxyXG4gICAgICAgICAgICAgIHN0ZXAuYWRkKys7XHJcbiAgICAgICAgICAgICAgc3RlcC5yZW1vdmVkLnB1c2goYXJyMVtuXSlcclxuICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgbSsrO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGVwLmluZGV4ICE9IG51bGwpe1xyXG4gICAgICAgICAgc3RlcHMucHVzaChzdGVwKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RlcHNcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAvLyBkaWZmT2JqZWN0XHJcbiAgICAgIC8vIC0tLS1cclxuICAgICAgLy8gdGVzdCBpZiBvYmoxIGRlZXBFcXVhbCBvYmoyXHJcbiAgICAgIGZ1bmN0aW9uIGRpZmZPYmplY3QoIG5vdywgbGFzdCwgZGlmZiApe1xyXG5cclxuXHJcbiAgICAgICAgaWYoIWRpZmYpe1xyXG5cclxuICAgICAgICAgIGZvciggdmFyIGogaW4gbm93ICl7XHJcbiAgICAgICAgICAgIGlmKCBsYXN0W2pdICE9PSBub3dbal0gKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciggdmFyIG4gaW4gbGFzdCApe1xyXG4gICAgICAgICAgICBpZihsYXN0W25dICE9PSBub3dbbl0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICB2YXIgbktleXMgPSBfLmtleXMobm93KTtcclxuICAgICAgICAgIHZhciBsS2V5cyA9IF8ua2V5cyhsYXN0KTtcclxuXHJcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gYSAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGIpeyAgICAgICAgICAgICAgICAgICByZXR1cm4gbm93W2JdIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIHJldHVybiBkaWZmQXJyYXkobktleXMsIGxLZXlzLCBkaWZmLCBmdW5jdGlvbihhLCBiKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vd1tiXSA9PT0gbGFzdFthXTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgICAgICBkaWZmQXJyYXk6IGRpZmZBcnJheSxcclxuICAgICAgICBkaWZmT2JqZWN0OiBkaWZmT2JqZWN0XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAxOSAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICAvLyBzb21lIG5lc3RlZCAgb3BlcmF0aW9uIGluIGFzdFxyXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgdmFyIGRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xyXG4gICAgICB2YXIgYW5pbWF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjApO1xyXG5cclxuICAgICAgdmFyIGNvbWJpbmUgPSBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgICAgICAgLy8gZ2V0IHRoZSBpbml0aWFsIGRvbSBpbiBvYmplY3RcclxuICAgICAgICBub2RlOiBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIHZhciBjaGlsZHJlbixub2RlLCBub2RlcztcclxuICAgICAgICAgIGlmKCFpdGVtKSByZXR1cm47XHJcbiAgICAgICAgICBpZih0eXBlb2YgaXRlbS5ub2RlID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBpdGVtLm5vZGUoKTtcclxuICAgICAgICAgIGlmKHR5cGVvZiBpdGVtLm5vZGVUeXBlID09PSBcIm51bWJlclwiKSByZXR1cm4gaXRlbTtcclxuICAgICAgICAgIGlmKGl0ZW0uZ3JvdXApIHJldHVybiBjb21iaW5lLm5vZGUoaXRlbS5ncm91cClcclxuXHJcbiAgICAgICAgICBpdGVtID0gaXRlbS5jaGlsZHJlbiB8fCBpdGVtO1xyXG4gICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoaXRlbSApKXtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IGl0ZW0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihsZW4gPT09IDEpe1xyXG4gICAgICAgICAgICAgIHJldHVybiBjb21iaW5lLm5vZGUoaXRlbVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gaXRlbS5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xyXG4gICAgICAgICAgICAgIG5vZGUgPSBjb21iaW5lLm5vZGUoaXRlbVtpXSk7XHJcbiAgICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShub2RlKSl7XHJcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoLmFwcGx5KG5vZGVzLCBub2RlKVxyXG4gICAgICAgICAgICAgIH1lbHNlIGlmKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIEBUT0RPIHJlbW92ZSBfZ3JhZ0NvbnRhaW5lclxyXG4gICAgICAgIGluamVjdDogZnVuY3Rpb24obm9kZSwgcG9zICl7XHJcbiAgICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzO1xyXG4gICAgICAgICAgdmFyIGZyYWdtZW50ID0gY29tYmluZS5ub2RlKGdyb3VwLmdyb3VwIHx8IGdyb3VwKTtcclxuICAgICAgICAgIGlmKG5vZGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGUucmVtb3ZlKGZyYWdtZW50KVxyXG4gICAgICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoIWZyYWdtZW50KSByZXR1cm4gZ3JvdXA7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykgbm9kZSA9IGRvbS5maW5kKG5vZGUpO1xyXG4gICAgICAgICAgICBpZighbm9kZSkgdGhyb3cgRXJyb3IoJ2luamVjdGVkIG5vZGUgaXMgbm90IGZvdW5kJyk7XHJcbiAgICAgICAgICAgIC8vIHVzZSBhbmltYXRlIHRvIGFuaW1hdGUgZmlyc3RjaGlsZHJlblxyXG4gICAgICAgICAgICBhbmltYXRlLmluamVjdChmcmFnbWVudCwgbm9kZSwgcG9zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIGlmIGl0IGlzIGEgY29tcG9uZW50XHJcbiAgICAgICAgICBpZihncm91cC4kZW1pdCkge1xyXG4gICAgICAgICAgICB2YXIgcHJlUGFyZW50ID0gZ3JvdXAucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgdmFyIG5ld1BhcmVudCA9IChwb3MgPT09J2FmdGVyJyB8fCBwb3MgPT09ICdiZWZvcmUnKT8gbm9kZS5wYXJlbnROb2RlIDogbm9kZTtcclxuICAgICAgICAgICAgZ3JvdXAucGFyZW50Tm9kZSA9IG5ld1BhcmVudDtcclxuICAgICAgICAgICAgZ3JvdXAuJGVtaXQoXCIkaW5qZWN0XCIsIG5vZGUsIHBvcywgcHJlUGFyZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBncm91cDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBnZXQgdGhlIGxhc3QgZG9tIGluIG9iamVjdChmb3IgaW5zZXJ0aW9uIG9wZXJhdGlvbilcclxuICAgICAgICBsYXN0OiBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW47XHJcblxyXG4gICAgICAgICAgaWYodHlwZW9mIGl0ZW0ubGFzdCA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gaXRlbS5sYXN0KCk7XHJcbiAgICAgICAgICBpZih0eXBlb2YgaXRlbS5ub2RlVHlwZSA9PT0gXCJudW1iZXJcIikgcmV0dXJuIGl0ZW07XHJcblxyXG4gICAgICAgICAgaWYoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gY29tYmluZS5sYXN0KGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgIGlmKGl0ZW0uZ3JvdXApIHJldHVybiBjb21iaW5lLmxhc3QoaXRlbS5ncm91cCk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKGl0ZW0sIGZpcnN0KXtcclxuICAgICAgICAgIGlmKCFpdGVtKSByZXR1cm47XHJcbiAgICAgICAgICBpZiggdHlwZW9mIGl0ZW0ubm9kZVR5cGUgPT09IFwibnVtYmVyXCIgICkgcmV0dXJuIGZpcnN0ICYmIGRvbS5yZW1vdmUoaXRlbSlcclxuICAgICAgICAgIGlmKCB0eXBlb2YgaXRlbS5kZXN0cm95ID09PSBcImZ1bmN0aW9uXCIgKSByZXR1cm4gaXRlbS5kZXN0cm95KGZpcnN0KTtcclxuXHJcbiAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheShpdGVtKSl7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IGl0ZW0ubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcclxuICAgICAgICAgICAgICBjb21iaW5lLmRlc3Ryb3koaXRlbVtpXSwgZmlyc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIEBUT0RPOiBuZWVkIG1vdmUgdG8gZG9tLmpzXHJcbiAgICAgIGRvbS5lbGVtZW50ID0gZnVuY3Rpb24oIGNvbXBvbmVudCwgYWxsICl7XHJcbiAgICAgICAgaWYoIWNvbXBvbmVudCkgcmV0dXJuICFhbGw/IG51bGw6IFtdO1xyXG4gICAgICAgIHZhciBub2RlcyA9IGNvbWJpbmUubm9kZSggY29tcG9uZW50ICk7XHJcbiAgICAgICAgaWYoIG5vZGVzLm5vZGVUeXBlID09PSAxICkgcmV0dXJuIGFsbD8gW25vZGVzXTogbm9kZXM7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaTxub2Rlcy5sZW5ndGggO2krKyl7XHJcbiAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVzW2ldO1xyXG4gICAgICAgICAgaWYoIG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMSl7XHJcbiAgICAgICAgICAgIGlmKCFhbGwpIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIWFsbD8gZWxlbWVudHNbMF06IGVsZW1lbnRzO1xyXG4gICAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgLyoqKi8gfSxcclxuICAgIC8qIDIwICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuICAgICAgdmFyIGRvbSAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcclxuICAgICAgdmFyIGFuaW1hdGUgPSB7fTtcclxuICAgICAgdmFyIGVudiA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XHJcblxyXG5cclxuICAgICAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgdHJhbnNpdGlvbkVuZCA9ICd0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICAgIGFuaW1hdGlvbkVuZCA9ICdhbmltYXRpb25lbmQnLFxyXG4gICAgICAgICAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ3RyYW5zaXRpb24nLFxyXG4gICAgICAgICAgYW5pbWF0aW9uUHJvcGVydHkgPSAnYW5pbWF0aW9uJztcclxuXHJcbiAgICAgICAgaWYoISgnb250cmFuc2l0aW9uZW5kJyBpbiB3aW5kb3cpKXtcclxuICAgICAgICAgIGlmKCdvbndlYmtpdHRyYW5zaXRpb25lbmQnIGluIHdpbmRvdykge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hyb21lL1NhZiAoKyBNb2JpbGUgU2FmKS9BbmRyb2lkXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25FbmQgKz0gJyB3ZWJraXRUcmFuc2l0aW9uRW5kJztcclxuICAgICAgICAgICAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ3dlYmtpdFRyYW5zaXRpb24nXHJcbiAgICAgICAgICB9IGVsc2UgaWYoJ29ub3RyYW5zaXRpb25lbmQnIGluIGRvbS50Tm9kZSB8fCBuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ09wZXJhJykge1xyXG5cclxuICAgICAgICAgICAgLy8gT3BlcmFcclxuICAgICAgICAgICAgdHJhbnNpdGlvbkVuZCArPSAnIG9UcmFuc2l0aW9uRW5kJztcclxuICAgICAgICAgICAgdHJhbnNpdGlvblByb3BlcnR5ID0gJ29UcmFuc2l0aW9uJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoISgnb25hbmltYXRpb25lbmQnIGluIHdpbmRvdykpe1xyXG4gICAgICAgICAgaWYgKCdvbndlYmtpdGFuaW1hdGlvbmVuZCcgaW4gd2luZG93KXtcclxuICAgICAgICAgICAgLy8gQ2hyb21lL1NhZiAoKyBNb2JpbGUgU2FmKS9BbmRyb2lkXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZCArPSAnIHdlYmtpdEFuaW1hdGlvbkVuZCc7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvblByb3BlcnR5ID0gJ3dlYmtpdEFuaW1hdGlvbic7XHJcblxyXG4gICAgICAgICAgfWVsc2UgaWYgKCdvbm9hbmltYXRpb25lbmQnIGluIGRvbS50Tm9kZSl7XHJcbiAgICAgICAgICAgIC8vIE9wZXJhXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZCArPSAnIG9BbmltYXRpb25FbmQnO1xyXG4gICAgICAgICAgICBhbmltYXRpb25Qcm9wZXJ0eSA9ICdvQW5pbWF0aW9uJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBpbmplY3Qgbm9kZSB3aXRoIGFuaW1hdGlvblxyXG4gICAgICAgKiBAcGFyYW0gIHtbdHlwZV19IG5vZGUgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gcmVmZXIgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICogQHBhcmFtICB7W3R5cGVdfSBkaXJlY3Rpb24gW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICAqL1xyXG4gICAgICBhbmltYXRlLmluamVjdCA9IGZ1bmN0aW9uKCBub2RlLCByZWZlciAsZGlyZWN0aW9uLCBjYWxsYmFjayApe1xyXG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgXy5ub29wO1xyXG4gICAgICAgIGlmKCBBcnJheS5pc0FycmF5KG5vZGUpICl7XHJcbiAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb20uZnJhZ21lbnQoKTtcclxuICAgICAgICAgIHZhciBjb3VudD0wO1xyXG5cclxuICAgICAgICAgIGZvcih2YXIgaSA9IDAsbGVuID0gbm9kZS5sZW5ndGg7aSA8IGxlbjsgaSsrICl7XHJcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5vZGVbaV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZG9tLmluamVjdChmcmFnbWVudCwgcmVmZXIsIGRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgLy8gaWYgYWxsIG5vZGVzIGlzIGRvbmUsIHdlIGNhbGwgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICB2YXIgZW50ZXJDYWxsYmFjayA9IGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICBpZiggY291bnQgPT09IGxlbiApIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihsZW4gPT09IGNvdW50KSBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgZm9yKCBpID0gMDsgaSA8IGxlbjsgaSsrICl7XHJcbiAgICAgICAgICAgIGlmKG5vZGVbaV0ub25lbnRlcil7XHJcbiAgICAgICAgICAgICAgbm9kZVtpXS5vbmVudGVyKGVudGVyQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBlbnRlckNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGlmKCFub2RlKSByZXR1cm47XHJcbiAgICAgICAgICBkb20uaW5qZWN0KCBub2RlLCByZWZlciwgZGlyZWN0aW9uICk7XHJcbiAgICAgICAgICBpZihub2RlLm9uZW50ZXIpe1xyXG4gICAgICAgICAgICBub2RlLm9uZW50ZXIoY2FsbGJhY2spXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiByZW1vdmUgbm9kZSB3aXRoIGFuaW1hdGlvblxyXG4gICAgICAgKiBAcGFyYW0gIHtbdHlwZV19ICAgbm9kZSAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAgICAgKi9cclxuXHJcbiAgICAgIGFuaW1hdGUucmVtb3ZlID0gZnVuY3Rpb24obm9kZSwgY2FsbGJhY2spe1xyXG4gICAgICAgIGlmKCFub2RlKSByZXR1cm47XHJcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcclxuICAgICAgICBmdW5jdGlvbiBsb29wKCl7XHJcbiAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgaWYoY291bnQgPT09IGxlbikgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggQXJyYXkuaXNBcnJheShub2RlKSApe1xyXG4gICAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gbm9kZS5sZW5ndGg7IGkgPCBsZW4gOyBpKyspe1xyXG4gICAgICAgICAgICBhbmltYXRlLnJlbW92ZShub2RlW2ldLCBsb29wKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlb2Ygbm9kZS5vbmxlYXZlID09PSdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgbm9kZS5vbmxlYXZlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJlbW92ZURvbmUobm9kZSwgY2FsbGJhY2spXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcmVtb3ZlRG9uZShub2RlLCBjYWxsYmFjaylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHJlbW92ZURvbmUobm9kZSwgY2FsbGJhY2spe1xyXG4gICAgICAgIGRvbS5yZW1vdmUobm9kZSk7XHJcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICBhbmltYXRlLnN0YXJ0Q2xhc3NBbmltYXRlID0gZnVuY3Rpb24gKCBub2RlLCBjbGFzc05hbWUsICBjYWxsYmFjaywgbW9kZSApe1xyXG4gICAgICAgIHZhciBhY3RpdmVDbGFzc05hbWUsIHRpbWVvdXQsIHRpZCwgb25jZUFuaW07XHJcbiAgICAgICAgaWYoICghYW5pbWF0aW9uRW5kICYmICF0cmFuc2l0aW9uRW5kKSB8fCBlbnYuaXNSdW5uaW5nICl7XHJcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1vZGUgIT09IDQpe1xyXG4gICAgICAgICAgb25jZUFuaW0gPSBfLm9uY2UoZnVuY3Rpb24gb25BbmltYXRlRW5kKCl7XHJcbiAgICAgICAgICAgIGlmKHRpZCkgY2xlYXJUaW1lb3V0KHRpZCk7XHJcblxyXG4gICAgICAgICAgICBpZihtb2RlID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgZG9tLmRlbENsYXNzKG5vZGUsIGFjdGl2ZUNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobW9kZSAhPT0gMyl7IC8vIG1vZGUgaG9sZCB0aGUgY2xhc3NcclxuICAgICAgICAgICAgICBkb20uZGVsQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb20ub2ZmKG5vZGUsIGFuaW1hdGlvbkVuZCwgb25jZUFuaW0pXHJcbiAgICAgICAgICAgIGRvbS5vZmYobm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0pXHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgb25jZUFuaW0gPSBfLm9uY2UoZnVuY3Rpb24gb25BbmltYXRlRW5kKCl7XHJcbiAgICAgICAgICAgIGlmKHRpZCkgY2xlYXJUaW1lb3V0KHRpZCk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobW9kZSA9PT0gMil7IC8vIGF1dG8gcmVtb3ZlZFxyXG4gICAgICAgICAgZG9tLmFkZENsYXNzKCBub2RlLCBjbGFzc05hbWUgKTtcclxuXHJcbiAgICAgICAgICBhY3RpdmVDbGFzc05hbWUgPSBfLm1hcChjbGFzc05hbWUuc3BsaXQoL1xccysvKSwgZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lICsgJy1hY3RpdmUnO1xyXG4gICAgICAgICAgfSkuam9pbihcIiBcIik7XHJcblxyXG4gICAgICAgICAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZG9tLmFkZENsYXNzKCBub2RlLCBhY3RpdmVDbGFzc05hbWUgKTtcclxuICAgICAgICAgICAgdGltZW91dCA9IGdldE1heFRpbWVvdXQoIG5vZGUgKTtcclxuICAgICAgICAgICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9ZWxzZSBpZihtb2RlPT09NCl7XHJcbiAgICAgICAgICBkb20ubmV4dFJlZmxvdyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBkb20uZGVsQ2xhc3MoIG5vZGUsIGNsYXNzTmFtZSApO1xyXG4gICAgICAgICAgICB0aW1lb3V0ID0gZ2V0TWF4VGltZW91dCggbm9kZSApO1xyXG4gICAgICAgICAgICB0aWQgPSBzZXRUaW1lb3V0KCBvbmNlQW5pbSwgdGltZW91dCApO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZG9tLmFkZENsYXNzKCBub2RlLCBjbGFzc05hbWUgKTtcclxuICAgICAgICAgICAgdGltZW91dCA9IGdldE1heFRpbWVvdXQoIG5vZGUgKTtcclxuICAgICAgICAgICAgdGlkID0gc2V0VGltZW91dCggb25jZUFuaW0sIHRpbWVvdXQgKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBkb20ub24oIG5vZGUsIGFuaW1hdGlvbkVuZCwgb25jZUFuaW0gKVxyXG4gICAgICAgIGRvbS5vbiggbm9kZSwgdHJhbnNpdGlvbkVuZCwgb25jZUFuaW0gKVxyXG4gICAgICAgIHJldHVybiBvbmNlQW5pbTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGFuaW1hdGUuc3RhcnRTdHlsZUFuaW1hdGUgPSBmdW5jdGlvbihub2RlLCBzdHlsZXMsIGNhbGxiYWNrKXtcclxuICAgICAgICB2YXIgdGltZW91dCwgb25jZUFuaW0sIHRpZDtcclxuXHJcbiAgICAgICAgZG9tLm5leHRSZWZsb3coZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGRvbS5jc3MoIG5vZGUsIHN0eWxlcyApO1xyXG4gICAgICAgICAgdGltZW91dCA9IGdldE1heFRpbWVvdXQoIG5vZGUgKTtcclxuICAgICAgICAgIHRpZCA9IHNldFRpbWVvdXQoIG9uY2VBbmltLCB0aW1lb3V0ICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBvbmNlQW5pbSA9IF8ub25jZShmdW5jdGlvbiBvbkFuaW1hdGVFbmQoKXtcclxuICAgICAgICAgIGlmKHRpZCkgY2xlYXJUaW1lb3V0KHRpZCk7XHJcblxyXG4gICAgICAgICAgZG9tLm9mZihub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltKVxyXG4gICAgICAgICAgZG9tLm9mZihub2RlLCB0cmFuc2l0aW9uRW5kLCBvbmNlQW5pbSlcclxuXHJcbiAgICAgICAgICBjYWxsYmFjaygpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9tLm9uKCBub2RlLCBhbmltYXRpb25FbmQsIG9uY2VBbmltIClcclxuICAgICAgICBkb20ub24oIG5vZGUsIHRyYW5zaXRpb25FbmQsIG9uY2VBbmltIClcclxuXHJcbiAgICAgICAgcmV0dXJuIG9uY2VBbmltO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIGdldCBtYXh0aW1lb3V0XHJcbiAgICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGVcclxuICAgICAgICogQHJldHVybiB7W3R5cGVdfSAgIFtkZXNjcmlwdGlvbl1cclxuICAgICAgICovXHJcbiAgICAgIGZ1bmN0aW9uIGdldE1heFRpbWVvdXQobm9kZSl7XHJcbiAgICAgICAgdmFyIHRpbWVvdXQgPSAwLFxyXG4gICAgICAgICAgdER1cmF0aW9uID0gMCxcclxuICAgICAgICAgIHREZWxheSA9IDAsXHJcbiAgICAgICAgICBhRHVyYXRpb24gPSAwLFxyXG4gICAgICAgICAgYURlbGF5ID0gMCxcclxuICAgICAgICAgIHJhdGlvID0gNSAvIDMsXHJcbiAgICAgICAgICBzdHlsZXMgO1xyXG5cclxuICAgICAgICBpZih3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSl7XHJcblxyXG4gICAgICAgICAgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSksXHJcbiAgICAgICAgICAgIHREdXJhdGlvbiA9IGdldE1heFRpbWUoIHN0eWxlc1t0cmFuc2l0aW9uUHJvcGVydHkgKyAnRHVyYXRpb24nXSkgfHwgdER1cmF0aW9uO1xyXG4gICAgICAgICAgdERlbGF5ID0gZ2V0TWF4VGltZSggc3R5bGVzW3RyYW5zaXRpb25Qcm9wZXJ0eSArICdEZWxheSddKSB8fCB0RGVsYXk7XHJcbiAgICAgICAgICBhRHVyYXRpb24gPSBnZXRNYXhUaW1lKCBzdHlsZXNbYW5pbWF0aW9uUHJvcGVydHkgKyAnRHVyYXRpb24nXSkgfHwgYUR1cmF0aW9uO1xyXG4gICAgICAgICAgYURlbGF5ID0gZ2V0TWF4VGltZSggc3R5bGVzW2FuaW1hdGlvblByb3BlcnR5ICsgJ0RlbGF5J10pIHx8IGFEZWxheTtcclxuICAgICAgICAgIHRpbWVvdXQgPSBNYXRoLm1heCggdER1cmF0aW9uK3REZWxheSwgYUR1cmF0aW9uICsgYURlbGF5ICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZW91dCAqIDEwMDAgKiByYXRpbztcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gZ2V0TWF4VGltZShzdHIpe1xyXG5cclxuICAgICAgICB2YXIgbWF4VGltZW91dCA9IDAsIHRpbWU7XHJcblxyXG4gICAgICAgIGlmKCFzdHIpIHJldHVybiAwO1xyXG5cclxuICAgICAgICBzdHIuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24oc3RyKXtcclxuXHJcbiAgICAgICAgICB0aW1lID0gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgICAgICAgaWYoIHRpbWUgPiBtYXhUaW1lb3V0ICkgbWF4VGltZW91dCA9IHRpbWU7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWF4VGltZW91dDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBhbmltYXRlO1xyXG5cclxuICAgICAgLyoqKi8gfSxcclxuICAgIC8qIDIxICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuXHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuICAgICAgdmFyIGNvbWJpbmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KVxyXG5cclxuICAgICAgZnVuY3Rpb24gR3JvdXAobGlzdCl7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGxpc3QgfHwgW107XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB2YXIgbyA9IF8uZXh0ZW5kKEdyb3VwLnByb3RvdHlwZSwge1xyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKGZpcnN0KXtcclxuICAgICAgICAgIGNvbWJpbmUuZGVzdHJveSh0aGlzLmNoaWxkcmVuLCBmaXJzdCk7XHJcbiAgICAgICAgICBpZih0aGlzLm9uZGVzdHJveSkgdGhpcy5vbmRlc3Ryb3koKTtcclxuICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbihpKXtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2ldXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwdXNoOiBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaCggaXRlbSApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgby5pbmplY3QgPSBvLiRpbmplY3QgPSBjb21iaW5lLmluamVjdFxyXG5cclxuXHJcblxyXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IEdyb3VwO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgLyoqKi8gfSxcclxuICAgIC8qIDIyICovXHJcbiAgICAvKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIE5vZGVDdXJzb3Iobm9kZSwgcGFyZW50Tm9kZSl7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudE5vZGU7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB2YXIgbm8gPSBOb2RlQ3Vyc29yLnByb3RvdHlwZTtcclxuXHJcbiAgICAgIG5vLm5leHQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucHJldiA9IHRoaXMubm9kZTtcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLm5vZGUubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obil7IHJldHVybiBuZXcgTm9kZUN1cnNvcihuKX1cclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMjMgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuICAgICAgLy8gc2ltcGxlc3QgZXZlbnQgZW1pdHRlciA2MCBsaW5lc1xyXG4gICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuICAgICAgdmFyIGZhbGxiYWNrRXZlbnQgPSB7XHJcbiAgICAgICAgZGVzdG9yeTogJyRkZXN0b3J5JyxcclxuICAgICAgICB1cGRhdGU6ICckdXBkYXRlJyxcclxuICAgICAgICBpbml0OiAnJGluaXQnLFxyXG4gICAgICAgIGNvbmZpZzogJyRjb25maWcnXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRvIGZpeCAwLjIueCB2ZXJzaW9uIGV2ZW50XHJcbiAgICAgIC8vIG1hcCBpbml0IHRvICRpbml0O1xyXG4gICAgICAvLyBARklYSVQgYWZ0ZXIgdmVyc2lvbiAxLjBcclxuICAgICAgZnVuY3Rpb24gZml4KHR5cGUpe1xyXG4gICAgICAgIHJldHVybiBmYWxsYmFja0V2ZW50W3R5cGVdIHx8IHR5cGVcclxuICAgICAgfVxyXG4gICAgICB2YXIgQVBJID0ge1xyXG4gICAgICAgICRvbjogZnVuY3Rpb24oZXZlbnQsIGZuLCBkZXNjKSB7XHJcbiAgICAgICAgICBpZih0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIgJiYgZXZlbnQpe1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgdGhpcy4kb24oaSwgZXZlbnRbaV0sIGZuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRlc2MgPSBkZXNjIHx8IHt9O1xyXG4gICAgICAgICAgICAvLyBAcGF0Y2g6IGZvciBsaXN0XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcclxuICAgICAgICAgICAgZXZlbnQgPSBmaXgoZXZlbnQpO1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlcyA9IGNvbnRleHQuX2hhbmRsZXMgfHwgKGNvbnRleHQuX2hhbmRsZXMgPSB7fSksXHJcbiAgICAgICAgICAgICAgY2FsbHMgPSBoYW5kbGVzW2V2ZW50XSB8fCAoaGFuZGxlc1tldmVudF0gPSBbXSk7XHJcbiAgICAgICAgICAgIHZhciByZWFsRm47XHJcbiAgICAgICAgICAgIGlmKGRlc2Mub25jZSl7XHJcbiAgICAgICAgICAgICAgcmVhbEZuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKVxyXG4gICAgICAgICAgICAgICAgdGhpcy4kb2ZmKGV2ZW50LCBmbik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8vIEBGSVg6IGlmICBzYW1lIGZuXHJcbiAgICAgICAgICAgICAgZm4ucmVhbCA9IHJlYWxGbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxscy5wdXNoKCByZWFsRm4gfHwgZm4gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJG9mZjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XHJcbiAgICAgICAgICBpZighY29udGV4dC5faGFuZGxlcykgcmV0dXJuO1xyXG4gICAgICAgICAgaWYoIWV2ZW50KSB0aGlzLl9oYW5kbGVzID0ge307XHJcbiAgICAgICAgICB2YXIgaGFuZGxlcyA9IGNvbnRleHQuX2hhbmRsZXMsXHJcbiAgICAgICAgICAgIGNhbGxzO1xyXG5cclxuICAgICAgICAgIGV2ZW50ID0gZml4KGV2ZW50KTtcclxuICAgICAgICAgIGlmIChjYWxscyA9IGhhbmRsZXNbZXZlbnRdKSB7XHJcbiAgICAgICAgICAgIGlmICghZm4pIHtcclxuICAgICAgICAgICAgICBoYW5kbGVzW2V2ZW50XSA9IFtdO1xyXG4gICAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZuID0gZm4ucmVhbCB8fCBmbjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGZuID09PSBjYWxsc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbHMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29udGV4dDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGJ1YmJsZSBldmVudFxyXG4gICAgICAgICRlbWl0OiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAvLyBAcGF0Y2g6IGZvciBsaXN0XHJcbiAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXM7XHJcbiAgICAgICAgICB2YXIgaGFuZGxlcyA9IGNvbnRleHQuX2hhbmRsZXMsIGNhbGxzLCBhcmdzLCB0eXBlO1xyXG4gICAgICAgICAgaWYoIWV2ZW50KSByZXR1cm47XHJcbiAgICAgICAgICB2YXIgYXJncyA9IF8uc2xpY2UoYXJndW1lbnRzLCAxKTtcclxuICAgICAgICAgIHZhciB0eXBlID0gZml4KGV2ZW50KTtcclxuXHJcbiAgICAgICAgICBpZighaGFuZGxlcykgcmV0dXJuIGNvbnRleHQ7XHJcbiAgICAgICAgICBpZiAoIShjYWxscyA9IGhhbmRsZXNbdHlwZV0pKSByZXR1cm4gY29udGV4dDtcclxuXHJcbiAgICAgICAgICBpZihjYWxscy5sZW5ndGggPiAxKXsgLy8gaGFuZGxlLCB3aGVuIGZpcnN0IGlzIG9mZiB0aGUgZXZlbnRcclxuICAgICAgICAgICAgY2FsbHMgPSBjYWxscy5zbGljZSgpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgY2FsbHNbaV0gPT09ICdmdW5jdGlvbicpIGNhbGxzW2ldLmFwcGx5KGNvbnRleHQsIGFyZ3MpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gY29udGV4dDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGNhcHR1cmUgIGV2ZW50XHJcbiAgICAgICAgJG9uY2U6IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgICAgICAgICB2YXIgYXJncyA9IF8uc2xpY2UoYXJndW1lbnRzKTtcclxuICAgICAgICAgIGFyZ3MucHVzaCh7b25jZTogdHJ1ZX0pXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy4kb24uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnRhaW5lciBjbGFzc1xyXG4gICAgICBmdW5jdGlvbiBFdmVudCgpIHt9XHJcbiAgICAgIF8uZXh0ZW5kKEV2ZW50LnByb3RvdHlwZSwgQVBJKVxyXG5cclxuICAgICAgRXZlbnQubWl4VG8gPSBmdW5jdGlvbihvYmope1xyXG4gICAgICAgIG9iaiA9IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/IG9iai5wcm90b3R5cGUgOiBvYmo7XHJcbiAgICAgICAgXy5leHRlbmQob2JqLCBBUEkpXHJcbiAgICAgIH1cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudDtcclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMjQgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuICAgICAgdmFyIF8gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xyXG4gICAgICB2YXIgcGFyc2VFeHByZXNzaW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCkuZXhwcmVzc2lvbjtcclxuICAgICAgdmFyIGRpZmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcclxuICAgICAgdmFyIGRpZmZBcnJheSA9IGRpZmYuZGlmZkFycmF5O1xyXG4gICAgICB2YXIgZGlmZk9iamVjdCA9IGRpZmYuZGlmZk9iamVjdDtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIFdhdGNoZXIoKXt9XHJcblxyXG4gICAgICB2YXIgbWV0aG9kcyA9IHtcclxuICAgICAgICAkd2F0Y2g6IGZ1bmN0aW9uKGV4cHIsIGZuLCBvcHRpb25zKXtcclxuICAgICAgICAgIHZhciBnZXQsIG9uY2UsIHRlc3QsIHJsZW4sIGV4dHJhID0gdGhpcy5fX2V4dF9fOyAvL3JlY29yZHMgbGVuZ3RoXHJcbiAgICAgICAgICBpZighdGhpcy5fd2F0Y2hlcnMpIHRoaXMuX3dhdGNoZXJzID0gW107XHJcbiAgICAgICAgICBpZighdGhpcy5fd2F0Y2hlcnNGb3JTdGFibGUpIHRoaXMuX3dhdGNoZXJzRm9yU3RhYmxlID0gW107XHJcblxyXG4gICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgICBpZihvcHRpb25zID09PSB0cnVlKXtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHsgZGVlcDogdHJ1ZSB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgdWlkID0gXy51aWQoJ3dfJyk7XHJcbiAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGV4cHIpKXtcclxuICAgICAgICAgICAgdmFyIHRlc3RzID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsbGVuID0gZXhwci5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICAgICAgdGVzdHMucHVzaCh0aGlzLiRleHByZXNzaW9uKGV4cHJbaV0pLmdldClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJldiA9IFtdO1xyXG4gICAgICAgICAgICB0ZXN0ID0gZnVuY3Rpb24oY29udGV4dCl7XHJcbiAgICAgICAgICAgICAgdmFyIGVxdWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBmb3IodmFyIGkgPTAsIGxlbiA9IHRlc3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciBzcGxpY2UgPSB0ZXN0c1tpXShjb250ZXh0LCBleHRyYSk7XHJcbiAgICAgICAgICAgICAgICBpZighXy5lcXVhbHMoc3BsaWNlLCBwcmV2W2ldKSl7XHJcbiAgICAgICAgICAgICAgICAgIGVxdWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgIHByZXZbaV0gPSBzcGxpY2U7Ly9fLmNsb25lKHNwbGljZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBlcXVhbD8gZmFsc2U6IHByZXY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgZXhwciA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgZ2V0ID0gZXhwci5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBleHByID0gdGhpcy4kZXhwcmVzc2lvbihleHByKTtcclxuICAgICAgICAgICAgICBnZXQgPSBleHByLmdldDtcclxuICAgICAgICAgICAgICBvbmNlID0gZXhwci5vbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIHdhdGNoZXIgPSB7XHJcbiAgICAgICAgICAgIGlkOiB1aWQsXHJcbiAgICAgICAgICAgIGdldDogZ2V0LFxyXG4gICAgICAgICAgICBmbjogZm4sXHJcbiAgICAgICAgICAgIG9uY2U6IG9uY2UsXHJcbiAgICAgICAgICAgIGZvcmNlOiBvcHRpb25zLmZvcmNlLFxyXG4gICAgICAgICAgICAvLyBkb24ndCB1c2UgbGQgdG8gcmVzb2x2ZSBhcnJheSBkaWZmXHJcbiAgICAgICAgICAgIGRpZmY6IG9wdGlvbnMuZGlmZixcclxuICAgICAgICAgICAgdGVzdDogdGVzdCxcclxuICAgICAgICAgICAgZGVlcDogb3B0aW9ucy5kZWVwLFxyXG4gICAgICAgICAgICBsYXN0OiBvcHRpb25zLnN5bmM/IGdldCh0aGlzKTogb3B0aW9ucy5sYXN0XHJcbiAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgIHRoaXNbb3B0aW9ucy5zdGFibGU/ICdfd2F0Y2hlcnNGb3JTdGFibGUnOiAnX3dhdGNoZXJzJ10ucHVzaCh3YXRjaGVyKTtcclxuXHJcbiAgICAgICAgICBybGVuID0gdGhpcy5fcmVjb3JkcyAmJiB0aGlzLl9yZWNvcmRzLmxlbmd0aDtcclxuICAgICAgICAgIGlmKHJsZW4pIHRoaXMuX3JlY29yZHNbcmxlbi0xXS5wdXNoKHdhdGNoZXIpXHJcbiAgICAgICAgICAvLyBpbml0IHN0YXRlLlxyXG4gICAgICAgICAgaWYob3B0aW9ucy5pbml0ID09PSB0cnVlKXtcclxuICAgICAgICAgICAgdmFyIHByZXBoYXNlID0gdGhpcy4kcGhhc2U7XHJcbiAgICAgICAgICAgIHRoaXMuJHBoYXNlID0gJ2RpZ2VzdCc7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrU2luZ2xlV2F0Y2goIHdhdGNoZXIpO1xyXG4gICAgICAgICAgICB0aGlzLiRwaGFzZSA9IHByZXBoYXNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHdhdGNoZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAkdW53YXRjaDogZnVuY3Rpb24oIHdhdGNoZXIgKXtcclxuICAgICAgICAgIGlmKCF0aGlzLl93YXRjaGVycyB8fCAhd2F0Y2hlcikgcmV0dXJuO1xyXG4gICAgICAgICAgdmFyIHdhdGNoZXJzID0gdGhpcy5fd2F0Y2hlcnM7XHJcbiAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiB3YXRjaGVyO1xyXG5cclxuICAgICAgICAgIGlmKHR5cGUgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHdhdGNoZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZighbGVuKXtcclxuICAgICAgICAgICAgICB3YXRjaGVyLnJlbW92ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHdoaWxlKCAobGVuLS0pID49IDAgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHVud2F0Y2god2F0Y2hlcltsZW5dKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2UgaWYodHlwZSA9PT0gJ251bWJlcicpe1xyXG4gICAgICAgICAgICB2YXIgaWQgPSB3YXRjaGVyO1xyXG4gICAgICAgICAgICB3YXRjaGVyID0gIF8uZmluZEl0ZW0oIHdhdGNoZXJzLCBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gaWQ7XHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgaWYoIXdhdGNoZXIpIHdhdGNoZXIgPSBfLmZpbmRJdGVtKHRoaXMuX3dhdGNoZXJzRm9yU3RhYmxlLCBmdW5jdGlvbiggaXRlbSApe1xyXG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kdW53YXRjaCh3YXRjaGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJGV4cHJlc3Npb246IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl90b3VjaEV4cHIocGFyc2VFeHByZXNzaW9uKHZhbHVlKSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRoZSB3aG9sZSBkaWdlc3QgbG9vcCAsanVzdCBsaWtlIGFuZ3VsYXIsIGl0IGp1c3QgYSBkaXJ0eS1jaGVjayBsb29wO1xyXG4gICAgICAgICAqIEBwYXJhbSAge1N0cmluZ30gcGF0aCAgbm93IHJlZ3VsYXIgcHJvY2VzcyBhIHB1cmUgZGlydHktY2hlY2sgbG9vcCwgYnV0IGluIHBhcnNlIHBoYXNlLFxyXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgUmVndWxhcidzIHBhcnNlciBleHRyYWN0IHRoZSBkZXBlbmRlbmNpZXMsIGluIGZ1dHVyZSBtYXliZSBpdCB3aWxsIGNoYW5nZSB0byBkaXJ0eS1jaGVjayBjb21iaW5lIHdpdGggcGF0aC1hd2FyZSB1cGRhdGU7XHJcbiAgICAgICAgICogQHJldHVybiB7Vm9pZH1cclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgJGRpZ2VzdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGlmKHRoaXMuJHBoYXNlID09PSAnZGlnZXN0JyB8fCB0aGlzLl9tdXRlKSByZXR1cm47XHJcbiAgICAgICAgICB0aGlzLiRwaGFzZSA9ICdkaWdlc3QnO1xyXG4gICAgICAgICAgdmFyIGRpcnR5ID0gZmFsc2UsIG4gPTA7XHJcbiAgICAgICAgICB3aGlsZShkaXJ0eSA9IHRoaXMuX2RpZ2VzdCgpKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCgrK24pID4gMjApeyAvLyBtYXggbG9vcFxyXG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCd0aGVyZSBtYXkgYSBjaXJjdWxhciBkZXBlbmRlbmNpZXMgcmVhY2hlcycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIHN0YWJsZSB3YXRjaCBpcyBkaXJ0eVxyXG4gICAgICAgICAgdmFyIHN0YWJsZURpcnR5ID0gIHRoaXMuX2RpZ2VzdCh0cnVlKTtcclxuXHJcbiAgICAgICAgICBpZiggKG4gPiAwIHx8IHN0YWJsZURpcnR5KSAmJiB0aGlzLiRlbWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoXCIkdXBkYXRlXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kZXZ0b29scykge1xyXG4gICAgICAgICAgICAgIHRoaXMuZGV2dG9vbHMuZW1pdChcImZsdXNoXCIsIHRoaXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuJHBoYXNlID0gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHByaXZhdGUgZGlnZXN0IGxvZ2ljXHJcbiAgICAgICAgX2RpZ2VzdDogZnVuY3Rpb24oc3RhYmxlKXtcclxuICAgICAgICAgIGlmKHRoaXMuX211dGUpIHJldHVybjtcclxuICAgICAgICAgIHZhciB3YXRjaGVycyA9ICFzdGFibGU/IHRoaXMuX3dhdGNoZXJzOiB0aGlzLl93YXRjaGVyc0ZvclN0YWJsZTtcclxuICAgICAgICAgIHZhciBkaXJ0eSA9IGZhbHNlLCBjaGlsZHJlbiwgd2F0Y2hlciwgd2F0Y2hlckRpcnR5O1xyXG4gICAgICAgICAgdmFyIGxlbiA9IHdhdGNoZXJzICYmIHdhdGNoZXJzLmxlbmd0aDtcclxuICAgICAgICAgIGlmKGxlbil7XHJcbiAgICAgICAgICAgIHZhciBtYXJrID0gMCwgbmVlZFJlbW92ZWQ9MDtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0wOyBpIDwgbGVuOyBpKysgKXtcclxuICAgICAgICAgICAgICB3YXRjaGVyID0gd2F0Y2hlcnNbaV07XHJcbiAgICAgICAgICAgICAgdmFyIHNob3VsZFJlbW92ZSA9ICF3YXRjaGVyIHx8ICB3YXRjaGVyLnJlbW92ZWQ7XHJcbiAgICAgICAgICAgICAgaWYoIHNob3VsZFJlbW92ZSApe1xyXG4gICAgICAgICAgICAgICAgbmVlZFJlbW92ZWQgKz0gMTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHdhdGNoZXJEaXJ0eSA9IHRoaXMuX2NoZWNrU2luZ2xlV2F0Y2god2F0Y2hlcik7XHJcbiAgICAgICAgICAgICAgICBpZih3YXRjaGVyRGlydHkpIGRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLy8gcmVtb3ZlIHdoZW4gZW5jb3VudGVyIGZpcnN0IHVubW92ZWQgaXRlbSBvciB0b3VjaCB0aGUgZW5kXHJcbiAgICAgICAgICAgICAgaWYoICFzaG91bGRSZW1vdmUgfHwgaSA9PT0gbGVuLTEgKXtcclxuICAgICAgICAgICAgICAgIGlmKCBuZWVkUmVtb3ZlZCApe1xyXG4gICAgICAgICAgICAgICAgICB3YXRjaGVycy5zcGxpY2UobWFyaywgbmVlZFJlbW92ZWQgKTtcclxuICAgICAgICAgICAgICAgICAgbGVuIC09IG5lZWRSZW1vdmVkO1xyXG4gICAgICAgICAgICAgICAgICBpIC09IG5lZWRSZW1vdmVkO1xyXG4gICAgICAgICAgICAgICAgICBuZWVkUmVtb3ZlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtYXJrID0gaSsxO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gY2hlY2sgY2hpbGRyZW4ncyBkaXJ0eS5cclxuICAgICAgICAgIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XHJcbiAgICAgICAgICBpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xyXG4gICAgICAgICAgICBmb3IodmFyIG0gPSAwLCBtbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBtIDwgbWxlbjsgbSsrKXtcclxuICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlblttXTtcclxuICAgICAgICAgICAgICBpZihjaGlsZCAmJiBjaGlsZC5fZGlnZXN0KHN0YWJsZSkpIGRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGRpcnR5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gY2hlY2sgYSBzaW5nbGUgb25lIHdhdGNoZXJcclxuICAgICAgICBfY2hlY2tTaW5nbGVXYXRjaDogZnVuY3Rpb24od2F0Y2hlcil7XHJcbiAgICAgICAgICB2YXIgZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgIGlmKCF3YXRjaGVyKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgdmFyIG5vdywgbGFzdCwgdGxhc3QsIHRub3csICBlcSwgZGlmZjtcclxuXHJcbiAgICAgICAgICBpZighd2F0Y2hlci50ZXN0KXtcclxuXHJcbiAgICAgICAgICAgIG5vdyA9IHdhdGNoZXIuZ2V0KHRoaXMpO1xyXG4gICAgICAgICAgICBsYXN0ID0gd2F0Y2hlci5sYXN0O1xyXG5cclxuICAgICAgICAgICAgaWYobm93ICE9PSBsYXN0IHx8IHdhdGNoZXIuZm9yY2Upe1xyXG4gICAgICAgICAgICAgIHRsYXN0ID0gXy50eXBlT2YobGFzdCk7XHJcbiAgICAgICAgICAgICAgdG5vdyA9IF8udHlwZU9mKG5vdyk7XHJcbiAgICAgICAgICAgICAgZXEgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAvLyAhT2JqZWN0XHJcbiAgICAgICAgICAgICAgaWYoICEodG5vdyA9PT0gJ29iamVjdCcgJiYgdGxhc3Q9PT0nb2JqZWN0JyAmJiB3YXRjaGVyLmRlZXApICl7XHJcbiAgICAgICAgICAgICAgICAvLyBBcnJheVxyXG4gICAgICAgICAgICAgICAgaWYoIHRub3cgPT09ICdhcnJheScgJiYgKCB0bGFzdD09J3VuZGVmaW5lZCcgfHwgdGxhc3QgPT09ICdhcnJheScpICl7XHJcbiAgICAgICAgICAgICAgICAgIGRpZmYgPSBkaWZmQXJyYXkobm93LCB3YXRjaGVyLmxhc3QgfHwgW10sIHdhdGNoZXIuZGlmZilcclxuICAgICAgICAgICAgICAgICAgaWYoIHRsYXN0ICE9PSAnYXJyYXknIHx8IGRpZmYgPT09IHRydWUgfHwgZGlmZi5sZW5ndGggKSBkaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgZXEgPSBfLmVxdWFscyggbm93LCBsYXN0ICk7XHJcbiAgICAgICAgICAgICAgICAgIGlmKCAhZXEgfHwgd2F0Y2hlci5mb3JjZSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHdhdGNoZXIuZm9yY2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZGlmZiA9ICBkaWZmT2JqZWN0KCBub3csIGxhc3QsIHdhdGNoZXIuZGlmZiApO1xyXG4gICAgICAgICAgICAgICAgaWYoIGRpZmYgPT09IHRydWUgfHwgZGlmZi5sZW5ndGggKSBkaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAvLyBAVE9ETyDmmK/lkKbmiorlpJrph43mlLnmjolcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHdhdGNoZXIudGVzdCh0aGlzKTtcclxuICAgICAgICAgICAgaWYocmVzdWx0KXtcclxuICAgICAgICAgICAgICBkaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgd2F0Y2hlci5mbi5hcHBseSh0aGlzLCByZXN1bHQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKGRpcnR5ICYmICF3YXRjaGVyLnRlc3Qpe1xyXG4gICAgICAgICAgICBpZih0bm93ID09PSAnb2JqZWN0JyAmJiB3YXRjaGVyLmRlZXAgfHwgdG5vdyA9PT0gJ2FycmF5Jyl7XHJcbiAgICAgICAgICAgICAgd2F0Y2hlci5sYXN0ID0gXy5jbG9uZShub3cpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB3YXRjaGVyLmxhc3QgPSBub3c7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2F0Y2hlci5mbi5jYWxsKHRoaXMsIG5vdywgbGFzdCwgZGlmZilcclxuICAgICAgICAgICAgaWYod2F0Y2hlci5vbmNlKSB0aGlzLiR1bndhdGNoKHdhdGNoZXIpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGRpcnR5O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICoqdGlwcyoqOiB3aGF0ZXZlciBwYXJhbSB5b3UgcGFzc2VkIGluICR1cGRhdGUsIGFmdGVyIHRoZSBmdW5jdGlvbiBjYWxsZWQsIGRpcnR5LWNoZWNrKGRpZ2VzdCkgcGhhc2Ugd2lsbCBlbnRlcjtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufFN0cmluZ3xFeHByZXNzaW9ufSBwYXRoXHJcbiAgICAgICAgICogQHBhcmFtICB7V2hhdGV2ZXJ9IHZhbHVlIG9wdGlvbmFsLCB3aGVuIHBhdGggaXMgRnVuY3Rpb24sIHRoZSB2YWx1ZSBpcyBpZ25vcmVkXHJcbiAgICAgICAgICogQHJldHVybiB7dGhpc30gICAgIHRoaXNcclxuICAgICAgICAgKi9cclxuICAgICAgICAkc2V0OiBmdW5jdGlvbihwYXRoLCB2YWx1ZSl7XHJcbiAgICAgICAgICBpZihwYXRoICE9IG51bGwpe1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiAocGF0aCk7XHJcbiAgICAgICAgICAgIGlmKCB0eXBlID09PSAnc3RyaW5nJyB8fCBwYXRoLnR5cGUgPT09ICdleHByZXNzaW9uJyApe1xyXG4gICAgICAgICAgICAgIHBhdGggPSB0aGlzLiRleHByZXNzaW9uKHBhdGgpO1xyXG4gICAgICAgICAgICAgIHBhdGguc2V0KHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYodHlwZSA9PT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgICAgICAgcGF0aC5jYWxsKHRoaXMsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGZvcih2YXIgaSBpbiBwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzZXQoaSwgcGF0aFtpXSlcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIDEuIGV4cHIgY2FuYmUgc3RyaW5nIG9yIGEgRXhwcmVzc2lvblxyXG4gICAgICAgIC8vIDIuIGRldGVjdDogaWYgdHJ1ZSwgaWYgZXhwciBpcyBhIHN0cmluZyB3aWxsIGRpcmVjdGx5IHJldHVybjtcclxuICAgICAgICAkZ2V0OiBmdW5jdGlvbihleHByLCBkZXRlY3QpICB7XHJcbiAgICAgICAgICBpZihkZXRlY3QgJiYgdHlwZW9mIGV4cHIgPT09ICdzdHJpbmcnKSByZXR1cm4gZXhwcjtcclxuICAgICAgICAgIHJldHVybiB0aGlzLiRleHByZXNzaW9uKGV4cHIpLmdldCh0aGlzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICR1cGRhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgcm9vdFBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgICBkb3tcclxuICAgICAgICAgICAgaWYocm9vdFBhcmVudC5kYXRhLmlzb2xhdGUgfHwgIXJvb3RQYXJlbnQuJHBhcmVudCkgYnJlYWs7XHJcbiAgICAgICAgICAgIHJvb3RQYXJlbnQgPSByb290UGFyZW50LiRwYXJlbnQ7XHJcbiAgICAgICAgICB9IHdoaWxlKHJvb3RQYXJlbnQpXHJcblxyXG4gICAgICAgICAgdmFyIHByZXBoYXNlID1yb290UGFyZW50LiRwaGFzZTtcclxuICAgICAgICAgIHJvb3RQYXJlbnQuJHBoYXNlID0gJ2RpZ2VzdCdcclxuXHJcbiAgICAgICAgICB0aGlzLiRzZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgICByb290UGFyZW50LiRwaGFzZSA9IHByZXBoYXNlXHJcblxyXG4gICAgICAgICAgcm9vdFBhcmVudC4kZGlnZXN0KCk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGF1dG8gY29sbGVjdCB3YXRjaGVycyBmb3IgbG9naWMtY29udHJvbC5cclxuICAgICAgICBfcmVjb3JkOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgaWYoIXRoaXMuX3JlY29yZHMpIHRoaXMuX3JlY29yZHMgPSBbXTtcclxuICAgICAgICAgIHRoaXMuX3JlY29yZHMucHVzaChbXSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBfcmVsZWFzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvcmRzLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIF8uZXh0ZW5kKFdhdGNoZXIucHJvdG90eXBlLCBtZXRob2RzKVxyXG5cclxuXHJcbiAgICAgIFdhdGNoZXIubWl4VG8gPSBmdW5jdGlvbihvYmope1xyXG4gICAgICAgIG9iaiA9IHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIiA/IG9iai5wcm90b3R5cGUgOiBvYmo7XHJcbiAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKG9iaiwgbWV0aG9kcylcclxuICAgICAgfVxyXG5cclxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBXYXRjaGVyO1xyXG5cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAyNSAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XHJcblxyXG5cclxuICAgICAgdmFyIGYgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xyXG5cclxuICAgICAgLy8ganNvbjogIHR3byB3YXlcclxuICAgICAgLy8gIC0gZ2V0OiBKU09OLnN0cmluZ2lmeVxyXG4gICAgICAvLyAgLSBzZXQ6IEpTT04ucGFyc2VcclxuICAgICAgLy8gIC0gZXhhbXBsZTogYHsgdGl0bGV8anNvbiB9YFxyXG4gICAgICBmLmpzb24gPSB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiggdmFsdWUgKXtcclxuICAgICAgICAgIHJldHVybiB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCc/IEpTT04uc3RyaW5naWZ5KHZhbHVlKTogdmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApe1xyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJz8gSlNPTi5wYXJzZSh2YWx1ZSkgOiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGxhc3Q6IG9uZS13YXlcclxuICAgICAgLy8gIC0gZ2V0OiByZXR1cm4gdGhlIGxhc3QgaXRlbSBpbiBsaXN0XHJcbiAgICAgIC8vICAtIGV4YW1wbGU6IGB7IGxpc3R8bGFzdCB9YFxyXG4gICAgICBmLmxhc3QgPSBmdW5jdGlvbihhcnIpe1xyXG4gICAgICAgIHJldHVybiBhcnIgJiYgYXJyW2Fyci5sZW5ndGggLSAxXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYXZlcmFnZTogb25lLXdheVxyXG4gICAgICAvLyAgLSBnZXQ6IGNvcHV0ZSB0aGUgYXZlcmFnZSBvZiB0aGUgbGlzdFxyXG4gICAgICAvLyAgLSBleGFtcGxlOiBgeyBsaXN0fCBhdmVyYWdlOiBcInNjb3JlXCIgfWBcclxuICAgICAgZi5hdmVyYWdlID0gZnVuY3Rpb24oYXJyYXksIGtleSl7XHJcbiAgICAgICAgYXJyYXkgPSBhcnJheSB8fCBbXTtcclxuICAgICAgICByZXR1cm4gYXJyYXkubGVuZ3RoPyBmLnRvdGFsKGFycmF5LCBrZXkpLyBhcnJheS5sZW5ndGggOiAwO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgLy8gdG90YWw6IG9uZS13YXlcclxuICAgICAgLy8gIC0gZ2V0OiBjb3B1dGUgdGhlIHRvdGFsIG9mIHRoZSBsaXN0XHJcbiAgICAgIC8vICAtIGV4YW1wbGU6IGB7IGxpc3R8IHRvdGFsOiBcInNjb3JlXCIgfWBcclxuICAgICAgZi50b3RhbCA9IGZ1bmN0aW9uKGFycmF5LCBrZXkpe1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDA7XHJcbiAgICAgICAgaWYoIWFycmF5KSByZXR1cm47XHJcbiAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiggaXRlbSApe1xyXG4gICAgICAgICAgdG90YWwgKz0ga2V5PyBpdGVtW2tleV0gOiBpdGVtO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xyXG4gICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMjYgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuICAgICAgLy8gUmVndWxhclxyXG4gICAgICB2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XHJcbiAgICAgIHZhciBkb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcclxuICAgICAgdmFyIGFuaW1hdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcclxuICAgICAgdmFyIFJlZ3VsYXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xyXG4gICAgICB2YXIgY29uc3RzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XHJcbiAgICAgIHZhciBuYW1lc3BhY2VzID0gY29uc3RzLk5BTUVTUEFDRTtcclxuICAgICAgdmFyIE9QVElPTlMgPSBjb25zdHMuT1BUSU9OU1xyXG4gICAgICB2YXIgU1RBQkxFID0gT1BUSU9OUy5TVEFCTEU7XHJcbiAgICAgIHZhciBERUVQX1NUQUJMRSA9IHtkZWVwOiB0cnVlLCBzdGFibGU6IHRydWV9O1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgX193ZWJwYWNrX3JlcXVpcmVfXygyNyk7XHJcbiAgICAgIF9fd2VicGFja19yZXF1aXJlX18oMjgpO1xyXG5cclxuXHJcbiAgICAgIG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgICAgIC8vICoqd2FybioqOiBjbGFzcyBpbnRlcGxhdGlvbiB3aWxsIG92ZXJyaWRlIHRoaXMgZGlyZWN0aXZlXHJcbiAgICAgICAgJ3ItY2xhc3MnOiBmdW5jdGlvbihlbGVtLCB2YWx1ZSl7XHJcblxyXG4gICAgICAgICAgaWYodHlwZW9mIHZhbHVlPT09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgdmFsdWUgPSBfLmZpeE9ialN0cih2YWx1ZSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBpc05vdEh0bWwgPSBlbGVtLm5hbWVzcGFjZVVSSSAmJiBlbGVtLm5hbWVzcGFjZVVSSSAhPT0gbmFtZXNwYWNlcy5odG1sIDtcclxuICAgICAgICAgIHRoaXMuJHdhdGNoKHZhbHVlLCBmdW5jdGlvbihudmFsdWUpe1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gaXNOb3RIdG1sPyBlbGVtLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTogZWxlbS5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9ICcgJysgKGNsYXNzTmFtZXx8JycpLnJlcGxhY2UoL1xccysvZywgJyAnKSArJyAnO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgaW4gbnZhbHVlKSBpZihudmFsdWUuaGFzT3duUHJvcGVydHkoaSkpe1xyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS5yZXBsYWNlKCcgJyArIGkgKyAnICcsJyAnKTtcclxuICAgICAgICAgICAgICBpZihudmFsdWVbaV0gPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lICs9IGkrJyAnO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZihpc05vdEh0bWwpe1xyXG4gICAgICAgICAgICAgIGRvbS5hdHRyKGVsZW0sICdjbGFzcycsIGNsYXNzTmFtZSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSBjbGFzc05hbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgREVFUF9TVEFCTEUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gKip3YXJuKio6IHN0eWxlIGludGVwbGF0aW9uIHdpbGwgb3ZlcnJpZGUgdGhpcyBkaXJlY3RpdmVcclxuICAgICAgICAnci1zdHlsZSc6IGZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcclxuICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZT09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXy5maXhPYmpTdHIodmFsdWUpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpIGluIG52YWx1ZSkgaWYobnZhbHVlLmhhc093blByb3BlcnR5KGkpKXtcclxuICAgICAgICAgICAgICBkb20uY3NzKGVsZW0sIGksIG52YWx1ZVtpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sREVFUF9TVEFCTEUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gd2hlbiBleHByZXNzaW9uIGlzIGV2YWx1YXRlIHRvIHRydWUsIHRoZSBlbGVtIHdpbGwgYWRkIGRpc3BsYXk6bm9uZVxyXG4gICAgICAgIC8vIEV4YW1wbGU6IDxkaXYgci1oaWRlPXt7aXRlbXMubGVuZ3RoID4gMH19PjwvZGl2PlxyXG4gICAgICAgICdyLWhpZGUnOiB7XHJcbiAgICAgICAgICBsaW5rOmZ1bmN0aW9uKGVsZW0sIHZhbHVlKXtcclxuICAgICAgICAgICAgdmFyIHByZUJvb2wgPSBudWxsLCBjb21wZWxldGU7XHJcbiAgICAgICAgICAgIGlmKCBfLmlzRXhwcih2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKXtcclxuICAgICAgICAgICAgICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHZhciBib29sID0gISFudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZihib29sID09PSBwcmVCb29sKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBwcmVCb29sID0gYm9vbDtcclxuICAgICAgICAgICAgICAgIGlmKGJvb2wpe1xyXG4gICAgICAgICAgICAgICAgICBpZihlbGVtLm9ubGVhdmUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBlbGV0ZSA9IGVsZW0ub25sZWF2ZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbXBlbGV0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICBpZihjb21wZWxldGUpIGNvbXBlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICBpZihlbGVtLm9uZW50ZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ub25lbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSwgU1RBQkxFKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoISF2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzc3I6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlPyAnc3R5bGU9XCJkaXNwbGF5Om5vbmVcIic6ICcnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAnci1odG1sJzoge1xyXG4gICAgICAgICAgc3NyOiBmdW5jdGlvbih2YWx1ZSwgdGFnKXtcclxuICAgICAgICAgICAgdGFnLmJvZHkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbGluazogZnVuY3Rpb24oZWxlbSwgdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLiR3YXRjaCh2YWx1ZSwgZnVuY3Rpb24obnZhbHVlKXtcclxuICAgICAgICAgICAgICBudmFsdWUgPSBudmFsdWUgfHwgXCJcIjtcclxuICAgICAgICAgICAgICBkb20uaHRtbChlbGVtLCBudmFsdWUpXHJcbiAgICAgICAgICAgIH0sIHtmb3JjZTogdHJ1ZSwgc3RhYmxlOiB0cnVlfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAncmVmJzoge1xyXG4gICAgICAgICAgYWNjZXB0OiBjb25zdHMuQ09NUE9ORU5UX1RZUEUgKyBjb25zdHMuRUxFTUVOVF9UWVBFLFxyXG4gICAgICAgICAgbGluazogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICl7XHJcbiAgICAgICAgICAgIHZhciByZWZzID0gdGhpcy4kcmVmcyB8fCAodGhpcy4kcmVmcyA9IHt9KTtcclxuICAgICAgICAgICAgdmFyIGN2YWw7XHJcbiAgICAgICAgICAgIGlmKF8uaXNFeHByKHZhbHVlKSl7XHJcbiAgICAgICAgICAgICAgdGhpcy4kd2F0Y2godmFsdWUsIGZ1bmN0aW9uKG52YWwsIG92YWwpe1xyXG4gICAgICAgICAgICAgICAgY3ZhbCA9IG52YWw7XHJcbiAgICAgICAgICAgICAgICBpZihyZWZzW292YWxdID09PSBlbGVtKSByZWZzW292YWxdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmKGN2YWwpIHJlZnNbY3ZhbF0gPSBlbGVtO1xyXG4gICAgICAgICAgICAgIH0sIFNUQUJMRSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgcmVmc1tjdmFsID0gdmFsdWVdID0gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICByZWZzW2N2YWxdID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgUmVndWxhci5kaXJlY3RpdmUobW9kdWxlLmV4cG9ydHMpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAvKioqLyB9LFxyXG4gICAgLyogMjcgKi9cclxuICAgIC8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIGV2ZW50IGRpcmVjdGl2ZSAgYnVuZGxlXHJcbiAgICAgICAqXHJcbiAgICAgICAqL1xyXG4gICAgICB2YXIgXyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XHJcbiAgICAgIHZhciBkb20gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcclxuICAgICAgdmFyIFJlZ3VsYXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xyXG5cclxuICAgICAgUmVndWxhci5fYWRkUHJvdG9Jbmhlcml0Q2FjaGUoXCJldmVudFwiKTtcclxuXHJcbiAgICAgIFJlZ3VsYXIuZGlyZWN0aXZlKCAvXm9uLVxcdyskLywgZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICwgYXR0cnMpIHtcclxuICAgICAgICBpZiAoICFuYW1lIHx8ICF2YWx1ZSApIHJldHVybjtcclxuICAgICAgICB2YXIgdHlwZSA9IG5hbWUuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVFdmVudCggZWxlbSwgdHlwZSwgdmFsdWUsIGF0dHJzICk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBUT0RPLlxyXG4gICAgICAvKipcclxuICAgICAgIC0gJCgnZHgnKS5kZWxlZ2F0ZSgpXHJcbiAgICAgICAqL1xyXG4gICAgICBSZWd1bGFyLmRpcmVjdGl2ZSggL14oZGVsZWdhdGV8ZGUpLVxcdyskLywgZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xyXG4gICAgICAgIHZhciByb290ID0gdGhpcy4kcm9vdDtcclxuICAgICAgICB2YXIgX2RlbGVnYXRlcyA9IHJvb3QuX2RlbGVnYXRlcyB8fCAoIHJvb3QuX2RlbGVnYXRlcyA9IHt9ICk7XHJcbiAgICAgICAgaWYgKCAhbmFtZSB8fCAhdmFsdWUgKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHR5cGUgPSBuYW1lLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICB2YXIgZmlyZSA9IF8uaGFuZGxlRXZlbnQuY2FsbCh0aGlzLCB2YWx1ZSwgdHlwZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGVnYXRlRXZlbnQoZXYpe1xyXG4gICAgICAgICAgbWF0Y2hQYXJlbnQoZXYsIF9kZWxlZ2F0ZXNbdHlwZV0sIHJvb3QucGFyZW50Tm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiggIV9kZWxlZ2F0ZXNbdHlwZV0gKXtcclxuICAgICAgICAgIF9kZWxlZ2F0ZXNbdHlwZV0gPSBbXTtcclxuXHJcbiAgICAgICAgICBpZihyb290LnBhcmVudE5vZGUpe1xyXG4gICAgICAgICAgICBkb20ub24ocm9vdC5wYXJlbnROb2RlLCB0eXBlLCBkZWxlZ2F0ZUV2ZW50KTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByb290LiRvbiggXCIkaW5qZWN0XCIsIGZ1bmN0aW9uKCBub2RlLCBwb3NpdGlvbiwgcHJlUGFyZW50ICl7XHJcbiAgICAgICAgICAgICAgdmFyIG5ld1BhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICBpZiggcHJlUGFyZW50ICl7XHJcbiAgICAgICAgICAgICAgICBkb20ub2ZmKHByZVBhcmVudCwgdHlwZSwgZGVsZWdhdGVFdmVudCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKG5ld1BhcmVudCkgZG9tLm9uKHRoaXMucGFyZW50Tm9kZSwgdHlwZSwgZGVsZWdhdGVFdmVudCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByb290LiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHJvb3QucGFyZW50Tm9kZSkgZG9tLm9mZihyb290LnBhcmVudE5vZGUsIHR5cGUsIGRlbGVnYXRlRXZlbnQpXHJcbiAgICAgICAgICAgIF9kZWxlZ2F0ZXNbdHlwZV0gPSBudWxsO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRlbGVnYXRlID0ge1xyXG4gICAgICAgICAgZWxlbWVudDogZWxlbSxcclxuICAgICAgICAgIGZpcmU6IGZpcmVcclxuICAgICAgICB9XHJcbiAgICAgICAgX2RlbGVnYXRlc1t0eXBlXS5wdXNoKCBkZWxlZ2F0ZSApO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBkZWxlZ2F0ZXMgPSBfZGVsZWdhdGVzW3R5cGVdO1xyXG4gICAgICAgICAgaWYoIWRlbGVnYXRlcyB8fCAhZGVsZWdhdGVzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgICAgICAgZm9yKCB2YXIgaSA9IDAsIGxlbiA9IGRlbGVnYXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApe1xyXG4gICAgICAgICAgICBpZiggZGVsZWdhdGVzW2ldID09PSBkZWxlZ2F0ZSApIGRlbGVnYXRlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgZnVuY3Rpb24gbWF0Y2hQYXJlbnQoZXYgLCBkZWxlZ2F0ZXMsIHN0b3Ape1xyXG4gICAgICAgIGlmKCFzdG9wKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2LnRhcmdldCwgcGFpcjtcclxuICAgICAgICB3aGlsZSh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBzdG9wKXtcclxuICAgICAgICAgIGZvciggdmFyIGkgPSAwLCBsZW4gPSBkZWxlZ2F0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKXtcclxuICAgICAgICAgICAgcGFpciA9IGRlbGVnYXRlc1tpXTtcclxuICAgICAgICAgICAgaWYocGFpciAmJiBwYWlyLmVsZW1lbnQgPT09IHRhcmdldCl7XHJcbiAgICAgICAgICAgICAgcGFpci5maXJlKGV2KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAyOCAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICAvLyBSZWd1bGFyXHJcbiAgICAgIHZhciBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcclxuICAgICAgdmFyIGRvbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xyXG4gICAgICB2YXIgT1BUSU9OUyA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpLk9QVElPTlNcclxuICAgICAgdmFyIFNUQUJMRSA9IE9QVElPTlMuU1RBQkxFO1xyXG4gICAgICB2YXIgaGFzSW5wdXQ7XHJcbiAgICAgIHZhciBSZWd1bGFyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcclxuXHJcbiAgICAgIHZhciBtb2RlbEhhbmRsZXJzID0ge1xyXG4gICAgICAgIFwidGV4dFwiOiBpbml0VGV4dCxcclxuICAgICAgICBcInNlbGVjdFwiOiBpbml0U2VsZWN0LFxyXG4gICAgICAgIFwiY2hlY2tib3hcIjogaW5pdENoZWNrQm94LFxyXG4gICAgICAgIFwicmFkaW9cIjogaW5pdFJhZGlvXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAvLyBAVE9ET1xyXG5cclxuXHJcbiAgICAgIC8vIGF1dG9VcGRhdGUgZGlyZWN0aXZlIGZvciBzZWxlY3QgZWxlbWVudFxyXG4gICAgICAvLyB0byBmaXggci1tb2RlbCBpc3N1ZSAsIHdoZW4gaGFuZGxlIGR5bmFtaWMgb3B0aW9uc1xyXG5cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiA8c2VsZWN0IHItbW9kZWw9e25hbWV9PlxyXG4gICAgICAgKiAgIDxyLW9wdGlvbiB2YWx1ZT17dmFsdWV9ID48L3Itb3B0aW9uPlxyXG4gICAgICAgKiA8L3NlbGVjdD5cclxuICAgICAgICovXHJcblxyXG5cclxuICAgICAgLy8gdHdvLXdheSBiaW5kaW5nIHdpdGggci1tb2RlbFxyXG4gICAgICAvLyB3b3JrcyBvbiBpbnB1dCwgdGV4dGFyZWEsIGNoZWNrYm94LCByYWRpbywgc2VsZWN0XHJcblxyXG5cclxuICAgICAgUmVndWxhci5kaXJlY3RpdmUoXCJyLW1vZGVsXCIsIHtcclxuICAgICAgICBwYXJhbTogWyd0aHJvdHRsZScsICdsYXp5J10sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lLCBleHRyYSApe1xyXG4gICAgICAgICAgdmFyIHRhZyA9IGVsZW0udGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgdmFyIHNpZ24gPSB0YWc7XHJcbiAgICAgICAgICBpZihzaWduID09PSBcImlucHV0XCIpIHNpZ24gPSBlbGVtLnR5cGUgfHwgXCJ0ZXh0XCI7XHJcbiAgICAgICAgICBlbHNlIGlmKHNpZ24gPT09IFwidGV4dGFyZWFcIikgc2lnbiA9IFwidGV4dFwiO1xyXG4gICAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB2YWx1ZSA9IHRoaXMuJGV4cHJlc3Npb24odmFsdWUpO1xyXG5cclxuICAgICAgICAgIGlmKCBtb2RlbEhhbmRsZXJzW3NpZ25dICkgcmV0dXJuIG1vZGVsSGFuZGxlcnNbc2lnbl0uY2FsbCh0aGlzLCBlbGVtLCB2YWx1ZSwgZXh0cmEpO1xyXG4gICAgICAgICAgZWxzZSBpZih0YWcgPT09IFwiaW5wdXRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbEhhbmRsZXJzLnRleHQuY2FsbCh0aGlzLCBlbGVtLCB2YWx1ZSwgZXh0cmEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL0BUT0RPXHJcbiAgICAgICAgLy8gc3NyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSl7XHJcbiAgICAgICAgLy8gICByZXR1cm4gdmFsdWU/IFwidmFsdWU9XCIgKyB2YWx1ZTogXCJcIlxyXG4gICAgICAgIC8vIH1cclxuICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgLy8gYmluZGluZyA8c2VsZWN0PlxyXG5cclxuICAgICAgZnVuY3Rpb24gaW5pdFNlbGVjdCggZWxlbSwgcGFyc2VkLCBleHRyYSl7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciB3YyA9IHRoaXMuJHdhdGNoKHBhcnNlZCwgZnVuY3Rpb24obmV3VmFsdWUpe1xyXG4gICAgICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJyk7XHJcbiAgICAgICAgICBmb3IodmFyIGkgPTAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aCA7IGkgPCBsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGNoaWxkcmVuW2ldLnZhbHVlID09IG5ld1ZhbHVlKXtcclxuICAgICAgICAgICAgICBlbGVtLnNlbGVjdGVkSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgU1RBQkxFKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlcigpe1xyXG4gICAgICAgICAgcGFyc2VkLnNldChzZWxmLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICAgIHdjLmxhc3QgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgICAgc2VsZi4kdXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpc0NoYW5naW5nID0gdHJ1ZVxyXG4gICAgICAgIGVsZW0uX19jaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgaWYoaXNDaGFuZ2luZykgcmV0dXJuO1xyXG4gICAgICAgICAgaXNDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZXIsMClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRvbS5vbiggZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlciApO1xyXG5cclxuICAgICAgICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQgJiYgZWxlbS52YWx1ZSl7XHJcbiAgICAgICAgICBwYXJzZWQuc2V0KHNlbGYsIGVsZW0udmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGRlc3Ryb3koKXtcclxuICAgICAgICAgIGRvbS5vZmYoZWxlbSwgXCJjaGFuZ2VcIiwgaGFuZGxlcik7XHJcbiAgICAgICAgICAvLyByZW1vdmUgX19jaGFuZ2UgZnVuY3Rpb25cclxuICAgICAgICAgIGRlbGV0ZSBlbGVtLl9fY2hhbmdlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaW5wdXQsdGV4dGFyZWEgYmluZGluZ1xyXG4gICAgICBmdW5jdGlvbiBpbml0VGV4dChlbGVtLCBwYXJzZWQsIGV4dHJhKXtcclxuICAgICAgICB2YXIgcGFyYW0gPSBleHRyYS5wYXJhbTtcclxuICAgICAgICB2YXIgdGhyb3R0bGUsIGxhenkgPSBwYXJhbS5sYXp5XHJcblxyXG4gICAgICAgIGlmKCd0aHJvdHRsZScgaW4gcGFyYW0pe1xyXG4gICAgICAgICAgLy8gPGlucHV0IHRocm90dGxlIHItbW9kZWw+XHJcbiAgICAgICAgICBpZihwYXJhbVt0aHJvdHRsZV0gPT09IHRydWUpe1xyXG4gICAgICAgICAgICB0aHJvdHRsZSA9IDQwMDtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aHJvdHRsZSA9IHBhcnNlSW50KHBhcmFtLnRocm90dGxlICwgMTApXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHdjID0gdGhpcy4kd2F0Y2gocGFyc2VkLCBmdW5jdGlvbihuZXdWYWx1ZSl7XHJcbiAgICAgICAgICBpZihlbGVtLnZhbHVlICE9PSBuZXdWYWx1ZSkgZWxlbS52YWx1ZSA9IG5ld1ZhbHVlID09IG51bGw/IFwiXCI6IFwiXCIgKyBuZXdWYWx1ZTtcclxuICAgICAgICB9LCBTVEFCTEUpO1xyXG5cclxuICAgICAgICAvLyBAVE9ETyB0byBmaXhlZCBldmVudFxyXG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKGV2KXtcclxuICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgIGlmKGV2LnR5cGU9PT0nY3V0JyB8fCBldi50eXBlPT09J3Bhc3RlJyl7XHJcbiAgICAgICAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGF0LnZhbHVlXHJcbiAgICAgICAgICAgICAgcGFyc2VkLnNldChzZWxmLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgd2MubGFzdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIHNlbGYuJHVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoYXQudmFsdWVcclxuICAgICAgICAgICAgcGFyc2VkLnNldChzZWxmLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHdjLmxhc3QgPSB2YWx1ZTtcclxuICAgICAgICAgICAgc2VsZi4kdXBkYXRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYodGhyb3R0bGUgJiYgIWxhenkpe1xyXG4gICAgICAgICAgdmFyIHByZUhhbmRsZSA9IGhhbmRsZXIsIHRpZDtcclxuICAgICAgICAgIGhhbmRsZXIgPSBfLnRocm90dGxlKGhhbmRsZXIsIHRocm90dGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGhhc0lucHV0ID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgaGFzSW5wdXQgPSBkb20ubXNpZSAhPT0gOSAmJiBcIm9uaW5wdXRcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihsYXp5KXtcclxuICAgICAgICAgIGRvbS5vbihlbGVtLCAnY2hhbmdlJywgaGFuZGxlcilcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGlmKCBoYXNJbnB1dCl7XHJcbiAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZXIgKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkb20ub24oZWxlbSwgXCJwYXN0ZSBrZXl1cCBjdXQgY2hhbmdlXCIsIGhhbmRsZXIpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhcnNlZC5nZXQoc2VsZikgPT09IHVuZGVmaW5lZCAmJiBlbGVtLnZhbHVlKXtcclxuICAgICAgICAgIHBhcnNlZC5zZXQoc2VsZiwgZWxlbS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKXtcclxuICAgICAgICAgIGlmKGxhenkpIHJldHVybiBkb20ub2ZmKGVsZW0sIFwiY2hhbmdlXCIsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgaWYoIGhhc0lucHV0ICl7XHJcbiAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGhhbmRsZXIgKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkb20ub2ZmKGVsZW0sIFwicGFzdGUga2V5dXAgY3V0IGNoYW5nZVwiLCBoYW5kbGVyKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIGlucHV0OmNoZWNrYm94ICBiaW5kaW5nXHJcblxyXG4gICAgICBmdW5jdGlvbiBpbml0Q2hlY2tCb3goZWxlbSwgcGFyc2VkKXtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHdhdGNoZXIgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKG5ld1ZhbHVlKXtcclxuICAgICAgICAgIGRvbS5hdHRyKGVsZW0sICdjaGVja2VkJywgISFuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSwgU1RBQkxFKTtcclxuXHJcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyKCl7XHJcbiAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmNoZWNrZWQ7XHJcbiAgICAgICAgICBwYXJzZWQuc2V0KHNlbGYsIHZhbHVlKTtcclxuICAgICAgICAgIHdhdGNoZXIubGFzdCA9IHZhbHVlO1xyXG4gICAgICAgICAgc2VsZi4kdXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhcnNlZC5zZXQpIGRvbS5vbihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxyXG5cclxuICAgICAgICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgcGFyc2VkLnNldChzZWxmLCAhIWVsZW0uY2hlY2tlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZGVzdHJveSgpe1xyXG4gICAgICAgICAgaWYocGFyc2VkLnNldCkgZG9tLm9mZihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIC8vIGlucHV0OnJhZGlvIGJpbmRpbmdcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGluaXRSYWRpbyhlbGVtLCBwYXJzZWQpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgd2MgPSB0aGlzLiR3YXRjaChwYXJzZWQsIGZ1bmN0aW9uKCBuZXdWYWx1ZSApe1xyXG4gICAgICAgICAgaWYobmV3VmFsdWUgPT0gZWxlbS52YWx1ZSkgZWxlbS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgIGVsc2UgZWxlbS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfSwgU1RBQkxFKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcigpe1xyXG4gICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgIHBhcnNlZC5zZXQoc2VsZiwgdmFsdWUpO1xyXG4gICAgICAgICAgc2VsZi4kdXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBhcnNlZC5zZXQpIGRvbS5vbihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxyXG4gICAgICAgIC8vIGJlYWN1c2Ugb25seSBhZnRlciBjb21waWxlKGluaXQpLCB0aGUgZG9tIHN0cnVjdHJ1ZSBpcyBleHNpdC5cclxuICAgICAgICBpZihwYXJzZWQuZ2V0KHNlbGYpID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgaWYoZWxlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHBhcnNlZC5zZXQoc2VsZiwgZWxlbS52YWx1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZGVzdHJveSgpe1xyXG4gICAgICAgICAgaWYocGFyc2VkLnNldCkgZG9tLm9mZihlbGVtLCBcImNoYW5nZVwiLCBoYW5kbGVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAyOSAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICB2YXIgLy8gcGFja2FnZXNcclxuICAgICAgICBfID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKSxcclxuICAgICAgICBhbmltYXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCksXHJcbiAgICAgICAgZG9tID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSksXHJcbiAgICAgICAgUmVndWxhciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XHJcblxyXG5cclxuICAgICAgdmFyIC8vIHZhcmlhYmxlc1xyXG4gICAgICAgIHJDbGFzc05hbWUgPSAvXlstXFx3XSsoXFxzWy1cXHddKykqJC8sXHJcbiAgICAgICAgckNvbW1hU2VwID0gL1tcXHJcXG5cXGYgXSosW1xcclxcblxcZiBdKig/PVxcdytcXDopLywgLy8gIGRvbnQgc3BsaXQgY29tbWEgaW4gIEV4cHJlc3Npb25cclxuICAgICAgICByU3R5bGVzID0gL15cXHsuKlxcfSQvLCAvLyAgZm9yIFNpbXBpbGZ5XHJcbiAgICAgICAgclNwYWNlID0gL1xccysvLCAvLyAgZm9yIFNpbXBpbGZ5XHJcbiAgICAgICAgV0hFTl9DT01NQU5EID0gXCJ3aGVuXCIsXHJcbiAgICAgICAgRVZFTlRfQ09NTUFORCA9IFwib25cIixcclxuICAgICAgICBUSEVOX0NPTU1BTkQgPSBcInRoZW5cIjtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBBbmltYXRpb24gUGx1Z2luXHJcbiAgICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fSBDb21wb25lbnRcclxuICAgICAgICovXHJcblxyXG5cclxuICAgICAgZnVuY3Rpb24gY3JlYXRlU2VlZCh0eXBlKXtcclxuXHJcbiAgICAgICAgdmFyIHN0ZXBzID0gW10sIGN1cnJlbnQgPSAwLCBjYWxsYmFjayA9IF8ubm9vcDtcclxuICAgICAgICB2YXIga2V5O1xyXG5cclxuICAgICAgICB2YXIgb3V0ID0ge1xyXG4gICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbihjYil7XHJcbiAgICAgICAgICAgIGtleSA9IF8udWlkKCk7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjYiA9PT0gXCJmdW5jdGlvblwiKSBjYWxsYmFjayA9IGNiO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50PiAwICl7XHJcbiAgICAgICAgICAgICAgY3VycmVudCA9IDAgO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBvdXQuc3RlcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQuY29tcGVsZXRlO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNvbXBlbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAga2V5ID0gbnVsbDtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBfLm5vb3A7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSAwO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHN0ZXBzW2N1cnJlbnRdKSBzdGVwc1tjdXJyZW50IF0oIG91dC5kb25lLmJpbmQob3V0LCBrZXkpICk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZG9uZTogZnVuY3Rpb24ocGtleSl7XHJcbiAgICAgICAgICAgIGlmKHBrZXkgIT09IGtleSkgcmV0dXJuOyAvLyBtZWFucyB0aGUgbG9vcCBpcyBkb3duXHJcbiAgICAgICAgICAgIGlmKCBjdXJyZW50IDwgc3RlcHMubGVuZ3RoIC0gMSApIHtcclxuICAgICAgICAgICAgICBjdXJyZW50Kys7XHJcbiAgICAgICAgICAgICAgb3V0LnN0ZXAoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgb3V0LmNvbXBlbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHVzaDogZnVuY3Rpb24oc3RlcCl7XHJcbiAgICAgICAgICAgIHN0ZXBzLnB1c2goc3RlcClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFJlZ3VsYXIuX2FkZFByb3RvSW5oZXJpdENhY2hlKFwiYW5pbWF0aW9uXCIpXHJcblxyXG5cclxuICAgICAgLy8gYnVpbHRpbiBhbmltYXRpb25cclxuICAgICAgUmVndWxhci5hbmltYXRpb24oe1xyXG4gICAgICAgIFwid2FpdFwiOiBmdW5jdGlvbiggc3RlcCApe1xyXG4gICAgICAgICAgdmFyIHRpbWVvdXQgPSBwYXJzZUludCggc3RlcC5wYXJhbSApIHx8IDBcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgLy8gXy5sb2coXCJkZWxheSBcIiArIHRpbWVvdXQpXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoIGRvbmUsIHRpbWVvdXQgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2xhc3NcIjogZnVuY3Rpb24oc3RlcCl7XHJcbiAgICAgICAgICB2YXIgdG1wID0gc3RlcC5wYXJhbS5zcGxpdChcIixcIiksXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IHRtcFswXSB8fCBcIlwiLFxyXG4gICAgICAgICAgICBtb2RlID0gcGFyc2VJbnQodG1wWzFdKSB8fCAxO1xyXG5cclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgLy8gXy5sb2coY2xhc3NOYW1lKVxyXG4gICAgICAgICAgICBhbmltYXRlLnN0YXJ0Q2xhc3NBbmltYXRlKCBzdGVwLmVsZW1lbnQsIGNsYXNzTmFtZSAsIGRvbmUsIG1vZGUgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiY2FsbFwiOiBmdW5jdGlvbihzdGVwKXtcclxuICAgICAgICAgIHZhciBmbiA9IHRoaXMuJGV4cHJlc3Npb24oc3RlcC5wYXJhbSkuZ2V0LCBzZWxmID0gdGhpcztcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihkb25lKXtcclxuICAgICAgICAgICAgLy8gXy5sb2coc3RlcC5wYXJhbSwgJ2NhbGwnKVxyXG4gICAgICAgICAgICBmbihzZWxmKTtcclxuICAgICAgICAgICAgc2VsZi4kdXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGRvbmUoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlbWl0XCI6IGZ1bmN0aW9uKHN0ZXApe1xyXG4gICAgICAgICAgdmFyIHBhcmFtID0gc3RlcC5wYXJhbTtcclxuICAgICAgICAgIHZhciB0bXAgPSBwYXJhbS5zcGxpdChcIixcIiksXHJcbiAgICAgICAgICAgIGV2dCA9IHRtcFswXSB8fCBcIlwiLFxyXG4gICAgICAgICAgICBhcmdzID0gdG1wWzFdPyB0aGlzLiRleHByZXNzaW9uKHRtcFsxXSkuZ2V0OiBudWxsO1xyXG5cclxuICAgICAgICAgIGlmKCFldnQpIHRocm93IEVycm9yKFwieW91IHNob3VkIHNwZWNpZmllZCBhIGV2ZW50bmFtZSBpbiBlbWl0IGNvbW1hbmRcIik7XHJcblxyXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgICAgICAgICBzZWxmLiRlbWl0KGV2dCwgYXJncz8gYXJncyhzZWxmKSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHN0eWxlOiBsZWZ0IHsxMH1weCxcclxuICAgICAgICBzdHlsZTogZnVuY3Rpb24oc3RlcCl7XHJcbiAgICAgICAgICB2YXIgc3R5bGVzID0ge30sXHJcbiAgICAgICAgICAgIHBhcmFtID0gc3RlcC5wYXJhbSxcclxuICAgICAgICAgICAgcGFpcnMgPSBwYXJhbS5zcGxpdChcIixcIiksIHZhbGlkO1xyXG4gICAgICAgICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihwYWlyKXtcclxuICAgICAgICAgICAgcGFpciA9IHBhaXIudHJpbSgpO1xyXG4gICAgICAgICAgICBpZihwYWlyKXtcclxuICAgICAgICAgICAgICB2YXIgdG1wID0gcGFpci5zcGxpdCggclNwYWNlICksXHJcbiAgICAgICAgICAgICAgICBuYW1lID0gdG1wLnNoaWZ0KCksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRtcC5qb2luKFwiIFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYoICFuYW1lIHx8ICF2YWx1ZSApIHRocm93IEVycm9yKFwiaW52YWxpZCBzdHlsZSBpbiBjb21tYW5kOiBzdHlsZVwiKTtcclxuICAgICAgICAgICAgICBzdHlsZXNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICB2YWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgICAgICAgICBpZih2YWxpZCl7XHJcbiAgICAgICAgICAgICAgYW5pbWF0ZS5zdGFydFN0eWxlQW5pbWF0ZShzdGVwLmVsZW1lbnQsIHN0eWxlcywgZG9uZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGRvbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgICAgLy8gaGFuY2RsZSB0aGUgci1hbmltYXRpb24gZGlyZWN0aXZlXHJcbiAgICAgIC8vIGVsIDogdGhlIGVsZW1lbnQgdG8gcHJvY2Vzc1xyXG4gICAgICAvLyB2YWx1ZTogdGhlIGRpcmVjdGl2ZSB2YWx1ZVxyXG4gICAgICBmdW5jdGlvbiBwcm9jZXNzQW5pbWF0ZSggZWxlbWVudCwgdmFsdWUgKXtcclxuICAgICAgICB2YXIgQ29tcG9uZW50ID0gdGhpcy5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICAgICAgaWYoXy5pc0V4cHIodmFsdWUpKXtcclxuICAgICAgICAgIHZhbHVlID0gdmFsdWUuZ2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgIHZhciBjb21wb3NpdGVzID0gdmFsdWUuc3BsaXQoXCI7XCIpLFxyXG4gICAgICAgICAgY29tcG9zaXRlLCBjb250ZXh0ID0gdGhpcywgc2VlZHMgPSBbXSwgc2VlZCwgZGVzdHJvaWVzID0gW10sIGRlc3Ryb3ksXHJcbiAgICAgICAgICBjb21tYW5kLCBwYXJhbSAsIGN1cnJlbnQgPSAwLCB0bXAsIGFuaW1hdG9yLCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzZXQoIHR5cGUgKXtcclxuICAgICAgICAgIHNlZWQgJiYgc2VlZHMucHVzaCggc2VlZCApXHJcbiAgICAgICAgICBzZWVkID0gY3JlYXRlU2VlZCggdHlwZSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2hlbkNhbGxiYWNrKHN0YXJ0LCB2YWx1ZSl7XHJcbiAgICAgICAgICBpZiggISF2YWx1ZSApIHN0YXJ0KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFuaW1hdGlvbkRlc3Ryb3koZWxlbWVudCl7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZWxlbWVudC5vbmVudGVyID0gbnVsbDtcclxuICAgICAgICAgICAgZWxlbWVudC5vbmxlYXZlID0gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciggdmFyIGkgPSAwLCBsZW4gPSBjb21wb3NpdGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICl7XHJcblxyXG4gICAgICAgICAgY29tcG9zaXRlID0gY29tcG9zaXRlc1tpXTtcclxuICAgICAgICAgIHRtcCA9IGNvbXBvc2l0ZS5zcGxpdChcIjpcIik7XHJcbiAgICAgICAgICBjb21tYW5kID0gdG1wWzBdICYmIHRtcFswXS50cmltKCk7XHJcbiAgICAgICAgICBwYXJhbSA9IHRtcFsxXSAmJiB0bXBbMV0udHJpbSgpO1xyXG5cclxuICAgICAgICAgIGlmKCAhY29tbWFuZCApIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgIGlmKCBjb21tYW5kID09PSBXSEVOX0NPTU1BTkQgKXtcclxuICAgICAgICAgICAgcmVzZXQoXCJ3aGVuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLiR3YXRjaChwYXJhbSwgd2hlbkNhbGxiYWNrLmJpbmQoIHRoaXMsIHNlZWQuc3RhcnQgKSApO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiggY29tbWFuZCA9PT0gRVZFTlRfQ09NTUFORCl7XHJcbiAgICAgICAgICAgIHJlc2V0KHBhcmFtKTtcclxuICAgICAgICAgICAgaWYoIHBhcmFtID09PSBcImxlYXZlXCIgKXtcclxuICAgICAgICAgICAgICBlbGVtZW50Lm9ubGVhdmUgPSBzZWVkLnN0YXJ0O1xyXG4gICAgICAgICAgICAgIGRlc3Ryb2llcy5wdXNoKCBhbmltYXRpb25EZXN0cm95KGVsZW1lbnQpICk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKCBwYXJhbSA9PT0gXCJlbnRlclwiICl7XHJcbiAgICAgICAgICAgICAgZWxlbWVudC5vbmVudGVyID0gc2VlZC5zdGFydDtcclxuICAgICAgICAgICAgICBkZXN0cm9pZXMucHVzaCggYW5pbWF0aW9uRGVzdHJveShlbGVtZW50KSApO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBpZiggKFwib25cIiArIHBhcmFtKSBpbiBlbGVtZW50KXsgLy8gaWYgZG9tIGhhdmUgdGhlIGV2ZW50ICwgd2UgdXNlIGRvbSBldmVudFxyXG4gICAgICAgICAgICAgICAgZGVzdHJvaWVzLnB1c2godGhpcy5faGFuZGxlRXZlbnQoIGVsZW1lbnQsIHBhcmFtLCBzZWVkLnN0YXJ0ICkpO1xyXG4gICAgICAgICAgICAgIH1lbHNleyAvLyBvdGhlcndpc2UsIHdlIHVzZSBjb21wb25lbnQgZXZlbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuJG9uKHBhcmFtLCBzZWVkLnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGRlc3Ryb2llcy5wdXNoKHRoaXMuJG9mZi5iaW5kKHRoaXMsIHBhcmFtLCBzZWVkLnN0YXJ0KSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBhbmltYXRvciA9ICBDb21wb25lbnQuYW5pbWF0aW9uKGNvbW1hbmQpXHJcbiAgICAgICAgICBpZiggYW5pbWF0b3IgJiYgc2VlZCApe1xyXG4gICAgICAgICAgICBzZWVkLnB1c2goXHJcbiAgICAgICAgICAgICAgYW5pbWF0b3IuY2FsbCh0aGlzLHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBkb25lOiBzZWVkLmRvbmUsXHJcbiAgICAgICAgICAgICAgICBwYXJhbTogcGFyYW1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoIGFuaW1hdG9yPyBcInlvdSBzaG91bGQgc3RhcnQgd2l0aCBgb25gIG9yIGBldmVudGAgaW4gYW5pbWF0aW9uXCIgOiAoXCJ1bmRlZmluZWQgYW5pbWF0b3Ig44CQXCIgKyBjb21tYW5kICtcIuOAkVwiICkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZGVzdHJvaWVzLmxlbmd0aCl7XHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZGVzdHJvaWVzLmZvckVhY2goZnVuY3Rpb24oZGVzdHJveSl7XHJcbiAgICAgICAgICAgICAgZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIFJlZ3VsYXIuZGlyZWN0aXZlKCBcInItYW5pbWF0aW9uXCIsIHByb2Nlc3NBbmltYXRlKVxyXG4gICAgICBSZWd1bGFyLmRpcmVjdGl2ZSggXCJyLWFuaW1cIiwgcHJvY2Vzc0FuaW1hdGUpXHJcblxyXG5cclxuXHJcbiAgICAgIC8qKiovIH0sXHJcbiAgICAvKiAzMCAqL1xyXG4gICAgLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcblxyXG4gICAgICB2YXIgUmVndWxhciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogVGltZW91dCBNb2R1bGVcclxuICAgICAgICogQHBhcmFtIHtDb21wb25lbnR9IENvbXBvbmVudFxyXG4gICAgICAgKi9cclxuICAgICAgZnVuY3Rpb24gVGltZW91dE1vZHVsZShDb21wb25lbnQpe1xyXG5cclxuICAgICAgICBDb21wb25lbnQuaW1wbGVtZW50KHtcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICoganVzdCBsaWtlIHNldFRpbWVvdXQsIGJ1dCB3aWxsIGVudGVyIGRpZ2VzdCBhdXRvbWF0ZWx5XHJcbiAgICAgICAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cclxuICAgICAgICAgICAqIEBwYXJhbSAge051bWJlcn0gICBkZWxheVxyXG4gICAgICAgICAgICogQHJldHVybiB7TnVtYmVyfSAgIHRpbWVvdXRpZFxyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICAkdGltZW91dDogZnVuY3Rpb24oZm4sIGRlbGF5KXtcclxuICAgICAgICAgICAgZGVsYXkgPSBkZWxheSB8fCAwO1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgIGZuLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgdGhpcy4kdXBkYXRlKCk7IC8vZW50ZXIgZGlnZXN0XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgZGVsYXkpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICoganVzdCBsaWtlIHNldEludGVydmFsLCBidXQgd2lsbCBlbnRlciBkaWdlc3QgYXV0b21hdGVseVxyXG4gICAgICAgICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuXHJcbiAgICAgICAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgaW50ZXJ2YWxcclxuICAgICAgICAgICAqIEByZXR1cm4ge051bWJlcn0gICBpbnRlcnZhbGlkXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgICRpbnRlcnZhbDogZnVuY3Rpb24oZm4sIGludGVydmFsKXtcclxuICAgICAgICAgICAgaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAxMDAwLzYwO1xyXG4gICAgICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICBmbi5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgIHRoaXMuJHVwZGF0ZSgpOyAvL2VudGVyIGRpZ2VzdFxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIGludGVydmFsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIFJlZ3VsYXIucGx1Z2luKCd0aW1lb3V0JywgVGltZW91dE1vZHVsZSk7XHJcbiAgICAgIFJlZ3VsYXIucGx1Z2luKCckdGltZW91dCcsIFRpbWVvdXRNb2R1bGUpO1xyXG5cclxuICAgICAgLyoqKi8gfVxyXG4gICAgLyoqKioqKi8gXSlcclxufSk7XHJcbjsiLCJjb25zdCBSZWd1bGFyID0gcmVxdWlyZShcIi4uL2xpYi9yZWd1bGFyXCIpXHJcblxyXG5jb25zdCBCcm9hZENhc3RvciA9IFJlZ3VsYXIuZXh0ZW5kKHtcclxuICBuYW1lOiAnQnJvYWRDYXN0b3InLFxyXG4gIHRlbXBsYXRlOiBgeyNpbmNsdWRlIHRoaXMuJGJvZHl9YCxcclxuICBjb25maWcoIGRhdGEgKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkJyb2FkQ2FzdG9yIGNvbmZpZ1wiKTtcclxuICAgIGNvbnN0IGVtaXR0ZXIgPSBkYXRhLmVtaXR0ZXI7XHJcbiAgICB0aGlzLl9icm9hZGNhc3QgPSBlbWl0dGVyLiRlbWl0LmJpbmQoZW1pdHRlcilcclxuICAgIHRoaXMuX3N1YnNjcmliZSA9IGVtaXR0ZXIuJG9uLmJpbmQoZW1pdHRlcilcclxuICB9LFxyXG4gIGluaXQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkJyb2FkQ2FzdG9yIGluaXRcIik7XHJcbiAgfSxcclxuICBtb2RpZnlCb2R5Q29tcG9uZW50KCBjb21wb25lbnQsIG5leHQgKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkJyb2FkQ2FzdG9yIG1vZGlmeUJvZHlDb21wb25lbnRcIik7XHJcbiAgICBjb21wb25lbnQuJGJyb2FkY2FzdCA9IHRoaXMuX2Jyb2FkY2FzdDtcclxuICAgIGNvbXBvbmVudC4kc3Vic2NyaWJlID0gdGhpcy5fc3Vic2NyaWJlO1xyXG5cclxuICAgIG5leHQoY29tcG9uZW50KTtcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJyb2FkQ2FzdG9yIiwiY29uc3QgYnJvYWRjYXRvciA9IHJlcXVpcmUoJy4vYnJvYWRjYXN0b3InKVxyXG5jb25zdCB0b3AgPSByZXF1aXJlKCcuL3RvcCcpXHJcbmNvbnN0IFJlZ3VsYXIgPSByZXF1aXJlKFwiLi4vbGliL3JlZ3VsYXJcIilcclxuXHJcbmNvbnN0IEFwcCA9IG5ldyBSZWd1bGFyKHtcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPEJyb2FkQ2FzdG9yIGVtaXR0ZXI9eyBhYSB9PlxyXG4gICAgICAgIDxUb3AgLz5UZXN0XHJcbiAgICA8L0Jyb2FkQ2FzdG9yPiBcclxuICBgLFxyXG4gIGRhdGE6IHtcclxuICAgIGFhOiBuZXcgUmVndWxhclxyXG4gIH1cclxufSlcclxuXHJcbkFwcC4kaW5qZWN0KGRvY3VtZW50LmJvZHkpXHJcbiIsIi8vIGNvbnN0IHsgYnJvYWRjYXN0LCBzdWJzY3JpYmUgfSA9IHJlcXVpcmUoJy4vbWVkaWF0b3InKVxyXG5jb25zdCBSZWd1bGFyID0gcmVxdWlyZShcIi4uL2xpYi9yZWd1bGFyXCIpXHJcblxyXG5jb25zdCBMZWFmTm9kZSA9IFJlZ3VsYXIuZXh0ZW5kKHtcclxuICBuYW1lOiAnTGVhZk5vZGUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBvbi1jbGljaz17IHRoaXMub25DbGljaygpIH0+IGNsaWNrIG1lIDwvZGl2PmAsXHJcbiAgY29uZmlnKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJMZWFmTm9kZSBjb25maWdcIik7XHJcbiAgfSxcclxuICBpbml0KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJMZWFmTm9kZSBpbml0XCIpO1xyXG4gIH0sXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMuJGJyb2FkY2FzdCgnY2hlY2snLCB7IHR5cGU6ICdsZWFmbm9kZScgfSlcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExlYWZOb2RlIiwiLy8gY29uc3QgeyBicm9hZGNhc3QsIHN1YnNjcmliZSB9ID0gcmVxdWlyZSgnLi9tZWRpYXRvcicpO1xyXG5jb25zdCBSZWd1bGFyID0gcmVxdWlyZSgnLi4vbGliL3JlZ3VsYXInKTtcclxuY29uc3QgbGVhZk5vZGUgPSByZXF1aXJlKCcuL2xlYWZOb2RlJyk7XHJcblxyXG5jb25zdCBUb3AgPSBSZWd1bGFyLmV4dGVuZCh7XHJcbiAgbmFtZTogJ1RvcCcsXHJcbiAgdGVtcGxhdGU6ICc8TGVhZk5vZGU+IDwvTGVhZk5vZGU+JyxcclxuICBjb25maWcoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlRvcCBjb25maWdcIik7XHJcbiAgfSxcclxuICBpbml0KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJUb3AgaW5pdFwiKTtcclxuICAgIHRoaXMuJHN1YnNjcmliZSgnY2hlY2snLCBldiA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBhY2NlcHRlZCBlbWl0IGV2ZW50OiR7SlNPTi5zdHJpbmdpZnkoZXYpfWApO1xyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRvcCJdfQ==
