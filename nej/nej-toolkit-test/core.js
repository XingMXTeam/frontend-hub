if (typeof EDU==="undefined"){EDU=(function() {
    var o = {},
        f = function() {return !1;},
        cache = {};
    var is = function(data,type){
        return o.toString.call(data)==='[object '+type+']';
    };
    return function(key,func) {
        var result = cache[key],
            isfunc = is(func,'Function');
        // func is data
        if (func!=null&&!isfunc){
            result = func;
        }
        // do function defined
        if (isfunc){
            var arr = [];
            for(var i=2,l=arguments.length;i<l;i++){
                arr.push(arguments.callee(arguments[i]));
            }
            var exports = {};
            arr.push.call(arr,exports,{},f,[]);
            var ret = func.apply(null,arr)||exports;
            if (!result||!is(ret,'Object')){
                // for non-object return
                result = ret;
            }else{
                // for namespace return
                // bad performance for-in in v8 for instance
                if (!!Object.keys){
                    for(var ls=Object.keys(ret),i=0,l=ls.length,x;i<l;i++){
                        x = ls[i];
                        result[x] = ret[x];
                    }
                }else{
                    for(var x in ret){
                        result[x] = ret[x];
                    }
                }
            }
        }
        // init data
        if (result==null){
            result = {};
        }
        cache[key] = result;
        // return
        return result;
    };
})();;}
cant read file D:/desktop/nej-toolkit-test/src/base/util.js for utf-8, cause:
{"errno":-4058,"code":"ENOENT","syscall":"open","path":"D:\\desktop\\nej-toolkit-test\\src\\base\\util.js"}
cant read file D:/desktop/nej-toolkit-test/src/base/event.js for utf-8, cause:
{"errno":-4058,"code":"ENOENT","syscall":"open","path":"D:\\desktop\\nej-toolkit-test\\src\\base\\event.js"}
cant read file D:/desktop/nej-toolkit-test/src/base/element.js for utf-8, cause:
{"errno":-4058,"code":"ENOENT","syscall":"open","path":"D:\\desktop\\nej-toolkit-test\\src\\base\\element.js"}
EDU('821cd4f505193fea8696661693b64d31',function (
    u,
    exports
){
    // setting cache
    var DT_SCOPE = {},
        DT_AUTH = {},
        DT_SETTING = {},
        DT_PERMISSION = {},
        CTRL_PERMISSION = {};
    /**
     * 批量添加配置信息
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      // 批量更新设置
     *      setting.batch({
     *          "component-ui-abc": {
     *              "funcABC": true
     *          },
     *          "component-ui-def": {
     *              "funcDEF": true
     *          }
     *      });
     *     // 取设置配置信息
     *     var set = setting.get("component-ui-abc");
     * });
     *
     * @method  module:pool/cache-base/src/setting.batch
     * @param   {Object} map - 配置信息
     * @returns {void}
     */
    exports.batch = function (map) {
        var func = function (value, key) {
            this.set(key,value);
        };
        u._$loop(map,func,this);
    };

    /**
     * 设置配置默认值
     *
     * @method  module:pool/cache-base/src/setting.$default
     * @param   {Object} map - 配置信息
     * @returns {void}
     */
    exports.$default = function (map) {
        // set default value
        var def = function (key, value) {
            var ret = u._$merge(
                value, exports.get(key)
            );
            DT_SETTING[key] = ret;
        };
        // use map or single setting
        if (typeof map==='string'){
            var ARG_START = 1;
            def(map,arguments[ARG_START]);
        }else{
            u._$loop(map, function(val, key){
                def(key, val);
            });
        }
    };

    /**
     * 添加单项配置信息，配置信息与已有配置进行合并
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      // 单项设置更新，设置项合并
     *      setting.set(
     *          "component-ui-abc", {
     *              "funcDEF": true
     *          }
     *     );
     *     // 取设置配置信息
     *     var set = setting.get("component-ui-abc");
     * });
     *
     * @method  module:pool/cache-base/src/setting.set
     * @param   {String} key - 配置标识
     * @param   {Object} map - 配置信息
     * @returns {void}
     */
    exports.set = function (key, map) {
        var ret = this.get(key);
        u._$merge(ret,map);
        DT_SETTING[key] = ret;
    };
    /**
     * 获取设置配置信息
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      // 单项设置更新，设置项合并
     *      setting.set(
     *          "component-ui-abc", {
     *              "funcDEF": true
     *          }
     *     );
     *     // 取设置配置信息
     *     var set = setting.get("component-ui-abc");
     *     // set.funcDEF
     * });
     *
     * @method  module:pool/cache-base/src/setting.get
     * @param   {String} key - 配置标识
     * @returns {Object}       设置信息
     */
    exports.get = function (key) {
        return DT_SETTING[key]||{};
    };

    /**
     * 设置权限并转换成所包含的功能map并保存
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      // 单项设置更新，设置项合并
     *      setting.setPermission(
     *          ['has_a_permission', 'has_b_permission'],
     *          {
     *              "has_a_permission": {
     *                  "component-key": {
     *                      "switch-a": true
     *                   }
     *              }
     *          }
     *     );
     * });
     *
     * @method  module:pool/cache-base/src/setting.setPermission
     * @param   {Array} arr - 权限，字符串数组。 ex: ['has_a_permission', 'has_b_permission']
     * @param   {Array} funcMap - 权限和功能的映射
     * @returns {void}
     */
    exports.setPermission = function (arr, funcMap) {
        u._$forIn(funcMap, function (map) {
            CTRL_PERMISSION = u._$merge(CTRL_PERMISSION, map);
        });

        u._$forEach(arr, function (permission) {
            // DT_PERMISSION = u._$merge(DT_PERMISSION, funcMap[permission]);
            u._$forIn(funcMap[permission], function(_it, _key){
                DT_PERMISSION[_key] = DT_PERMISSION[_key] || _it;
                DT_PERMISSION[_key] = u._$merge(DT_PERMISSION[_key], _it);
            });
        });
    };

    /**
     * 根据功能开关和权限查看是否显示
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      // 单项设置更新，设置项合并
     *      setting.isShow(
     *          "key": "module-backend-admin",
     *          "switcher": "SHOW_MODULE_OK"
     *     );
     * });
     *
     * @method  module:pool/cache-base/src/setting.isShow
     * @param   {Object} options
     * @param   {String} options.key           模块key
     * @param   {String} options.switcher      开关
     * @returns {Boolean}
     */
    exports.isShow = function (options) {
        // 判断业务线配置开关
        var hasSet = (DT_SETTING[options.key]||{})[options.switcher] !== false;  // 默认不配置就返回显示true

        // 判断是否有用户权限控制开关
        if(CTRL_PERMISSION[options.key]){
            hasSet = hasSet && ((DT_PERMISSION[options.key]||{})[options.switcher] === true)
        }
        return hasSet;
    };

    /**
     * 根据功能开关和权限查看是否显示
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      // 单项设置更新，设置项合并
     *      setting.isShow(
     *          "key": "module-backend-admin",
     *          "switcher": "SHOW_MODULE_OK"
     *     );
     * });
     *
     * @method  module:pool/cache-base/src/setting.isShow
     * @param   {Object} options
     * @param   {String} options.key           模块key
     * @param   {String} options.switcher      开关
     * @returns {Boolean}
     */
    exports.isShow2 = function (options,privilegeDefaultFalse) {
        if(!privilegeDefaultFalse){
            return exports.isShow(options);
        }

        // 判断业务线配置开关
        var hasSet = (DT_SETTING[options.key]||{})[options.switcher] !== false && !!CTRL_PERMISSION[options.key]; // 默认不配置返回false

        // 判断是否有用户权限控制开关
        if(CTRL_PERMISSION[options.key]){
            hasSet = hasSet && ((DT_PERMISSION[options.key]||{})[options.switcher] === true)
        }
        return hasSet;
    };

    /**
     * 设置场景信息，供爱多思模块统一使用
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      setting.setScope({
     *          "applicationId": 444444,
     *          "senceType": 1,
     *          "senceId": 2332434
     *     });
     * });
     *
     * @method  module:pool/cache-base/src/setting.setScope
     * @param   {Object} scope - 场景信息
     * @returns {void}
     */
    exports.setScope = function (scope) {
        DT_SCOPE._default = scope;
    };

    /**
     * 获取当前场景信息
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      //{
     *      //    "applicationId": 444444,
     *      //    "senceType": 1,
     *      //    "senceId": 2332434
     *      //}
     *      var scope = setting.getScope();
     * });
     *
     * @method  module:pool/cache-base/src/setting.getScope
     * @returns {Object} 场景信息
     */
    exports.getScope = function () {
        return DT_SCOPE._default;
    };

    /**
     * 设置认证信息，供爱多思模块统一使用
     * 当爱多思模块不经过业务认证，直接调用爱多思服务的接口时需要带上认证信息
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      setting.setAuth({'ASKDASYDOI28934IH123');
     * });
     *
     * @method  module:pool/cache-base/src/setting.setAuth
     * @param   {String} auth - 认证信息
     * @returns {void}
     */
    exports.setAuth = function (auth) {
        DT_AUTH._default = auth;
    };

    /**
     * 获取认证信息
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      var auth = setting.getAuth();
     * });
     *
     * @method  module:pool/cache-base/src/setting.getAuth
     * @returns {String} 认证信息
     */
    exports.getAuth = function () {
        return DT_AUTH._default;
    };

    /**
     * 设置当前登录用户信息
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      setting.setLoginUser({
     *          "id": 444444,
     *          "name": "test"
     *     });
     * });
     *
     * @method  module:pool/cache-base/src/setting.setLoginUser
     * @param   {Object} user - 用户信息
     * @returns {void}
     */
    exports.setLoginUser = function (user) {
        exports.set('global-login-user', user);
    };

    /**
     * 获取当前登陆用户信息
     *
     * @example
     *
     * NEJ.define([
     *      'pool/cache-base/src/setting'
     * ],function(setting){
     *      //{
     *      //    "id": 444444,
     *      //    "name": "test"
     *      //}
     *      var user = setting.getLoginUser();
     * });
     *
     * @method  module:pool/cache-base/src/setting.getLoginUser
     * @returns {Object} 用户信息
     */
    exports.getLoginUser = function () {
        return exports.get('global-login-user');
    };
},'7ae3ddb7d9de859c27d10baa0a62bb74');
EDU('0c384857cb008bb54aaa74334e5a414a',function (exports){
    /**
     * DOM 辅助功能接口集合，详情参阅 [Regular.dom]{@link https://regularjs.github.io/reference/#api-reference-other-regulardom}
     *
     * @member {Object}  module:pool/component-base/src/util.dom
     */
    exports.dom = Regular.dom;

    /**
     * 空函数
     *
     * @method  module:pool/component-base/src/util.noop
     * @returns {void}
     */
    exports.noop = Regular.util.noop;

    /**
     * 提取函数体内部注释内容
     *
     * @example
     *
     * var func = function(){/*
     *    <!doctype html>
     *    <html>
     *      <body>
     *        <h1>aaaaaa</h1>
     *      </body>
     *    </html>
     * * /};
     * var html = util.multiline(func.toString());
     *
     * @method  module:pool/component-base/src/util.multiline
     * @param   {String} func - 函数字符串
     * @returns {String} 函数体字符串
     */
    exports.multiline = function (func) {
        if (/^function\s*\(\)\s*\{\s*\/\*+\s*([\s\S]*)\s*\*+\/\s*\}$/.test(func)){
            return RegExp.$1;
        }
    };
    
    /*
     * rootClsRex 捕获组件bem class的正则
     * targetRex  要被替换的简写bem class目标
     *
     * @param  {String} htm     - 组件html模板
     * @param  {String} rootCls - 组件的bem class,可以传入组件name代替
     * @return {String}
     */
    var rootClsRex=/(^|[^<]+)<[\w\-]+\s*class="\s*([\w\-]+)[\s|"]/i; // 捕获 <first-root  class="root-bem-class
    var targetRex=/(\sclass="\s*)~/gi;  // 捕获 class="~
    var targetRex2=/(\sclass="\s*)&/gi;  // 捕获 class="&

    //var rclsRex=/r\-class={\s*\{[^}]+}\s*}/gi;
    exports.bemify = function (htm,rootCls,useAND){
        rootCls = rootCls || (htm.trim().match(rootClsRex)||'')[2];
        if(!rootCls){
            console.warn('there is no root-class here:\n', htm.slice(0,99));
            return htm;
        }
        return htm
            // r-class放于指令中实现
            //.replace(rclsRex,function($1){
            //    return $1.replace(/~/g,rootCls);
            //})
            .replace(useAND?targetRex2:targetRex,function($1,$2){
                return $2+rootCls;
            });
    };

    /**
     * 数据合并接口，直接修改 o1 的内容
     *
     * @method  module:pool/component-base/src/util.extend
     * @param  {Object}  o1             - 目标数据对象
     * @param  {Object}  o2             - 来源数据对象
     * @param  {Boolean} override       - 是否重写
     * @param  {Boolean} hasOwnProperty - 是否需要判断对象属性
     * @return {Object}  目标数据对象
     */
    exports.extend = function (o1, o2, override, hasOwnProperty) {
        for (var i in o2){
            if ((!hasOwnProperty || o2.hasOwnProperty(i)) &&
                (override || o1[i] === undefined)){
                o1[i] = o2[i];
            }
        }
        return o1;
    };

    /**
    *  从{ 304:'缓存', 404:'未找到'}这样的形式转为[ {id:304,name:'缓存'},{id:404,name:'未找到']的形式
    *  @author yaoyifeng
    *  @method map2list
    *  @param  {Object} map 键名或键名路径
    *  @param  {String} [keyAs] 对应key的键名
    *  @param  {Object} [valAs] 对应val的键名
    *  @return {Array}
    */
    exports.map2list = function(map,keyAs,valAs) {
        // var isRealMap = map && typeof(Map)==='function' && Object.prototype.toString.call(map)==='[object Map]';
        var list = [];
        var item;
        keyAs = keyAs || 'id';
        valAs = valAs || 'name';
        // if(isRealMap){
        //     for(var pair of map){
        //         item = {};
        //         item[keyAs]=pair[0];
        //         item[valAs]=pair[1];
        //         list.push(item);
        //     }
        // }else{
            for(var n in map){
                // for performance, hasOwnProperty not in use, it's must be a simple json obejct, promise yourself
                item = {};
                item[keyAs]=n;
                item[valAs]=map[n];
                list.push(item);
            }
        // }
        return list;
    };

    /**
     *  把hashList转成map  [{key:'a',value:1},{key:'b',value:0}]  => {a:1,b:0}
     *  @author yaoyifeng
     *  @method hashList2map
     *  @param  {Array} hashList 键名或键名路径
     *  @param  {Boolean} [useRealMap] 是否启用真正的es6数据结构
     *  @return {Object}
     */
    function hashList2map(hashList,useRealMap){
        var map=useRealMap ? new Map():{};
        hashList.forEach(function(hash){
            useRealMap ? map.set(hash.key,hash.value) : (map[hash.key]=hash.value);
        });
        return map;
    }
    exports.hashList2map=hashList2map;

    /**
     *  根据hashList,更新checkedList
     *  @author yaoyifeng
     *  @method updateCheckedListByHashList
     *  @param  {Array} checkedList 勾选框组对应的数据结构
     *  @param  {Array} hashList 用于更新的参照数据
     *  @return {Array}
     */
    function updateCheckedListByHashList(checkedList,hashList){
        var map = hashList2map(hashList);
        checkedList.forEach(function(opt) {
            opt.checked = map[opt.id]==1; // maybe backend give us "1"
        });
        return checkedList; // reference is changed, also return back
    }
    exports.updateCheckedListByHashList=updateCheckedListByHashList;
    /**
     * 从一个keyPath，追索到深层的键值
     *  @author yaoyifeng
     *  @method deepGet
     *  @param  {Object} obj 对象
     *  @param  {String} key 键名或键名路径
     *  @param  {?} [notFound] 当要提取属性未找到时, 给出的值
     *  @return {any}
     */
    function deepGet(obj,key,notFound){
        // for performance, check at top
        if(key === 'this'){
            return this && this.valueOf ? this.valueOf():this;
        }
        //// in default, backend wants null
        //if(arguments.length===2){
        //    notFound = null;
        //}
        // if obj is null or undefined, the nextVal must be notFound
        if(obj == null){
            return notFound;
        }
        var index=key.indexOf('.');
        var k=key.slice(0,index);
        var rest=key.slice(index+1);
        var firstObj= k==='this'?this:obj[k];
        if(index===-1){
            // in these case , null is null ,undefined is undefined
            if((!obj.hasOwnProperty && key in obj) || (obj.hasOwnProperty && obj.hasOwnProperty(key)) ){
                return obj[key];
            }
            // it is really notFound
            else{
                return notFound;
            }
        }
        else{
            return deepGet.call(this,firstObj,rest,notFound);
            //return arguments.length===2 ? deepGet.call(this,firstObj,rest) : deepGet.call(this,firstObj,rest,notFound);
        }
    }
    exports.deepGet = deepGet;



    // 适用于web接口的数据类型及空值转换
    exports.webTypeParserMap = {
        time: function(val){
            // 0 => ''
            return Number(val)||''
        },
        number :function(val){
            val = Number(val);
            // null,undefined,NaN => NaN = > ''
            return val!==val? '': val;
        },
        string: function(val){
            // null, undefined => ''
            return val==null? '':String(val);
        },
        boolean: function(val){
            // null, undefined ,'' => ''
            if(val==='' || val==null){
                return '';
            }
            return val!==false && val!==0 && val!=='0' && val!=='false' && val!=='FALSE';
        },
        array: function(val){
            return Array.isArray(val) ? val : [];
        },
        fullList: function(val){
            // remove item which is undefined or null or empty
            if(typeof val=='string'){
                return val.split(',').map(function(v){return v.trim()}).filter(function(v){return !!v});
            }
            //for(var i=0;i<val.length;i++){}
            return val.filter(function(v){return v!=null && v!==''});

        },
        checkedHashList:function(arr){
            var res =[];
            if(!arr){
                return res;
            }
            for(var i=0;i<arr.length;i++){
                res.push({key:arr[i].id, value:Number(arr[i].checked)})
            }
            return res;
        }
    };

    exports.addType = function(name,fn){
        if(exports.webTypeParserMap[name]){
            throw new Error(name + 'is exist!');
        }
        else{
            exports.webTypeParserMap[name]=fn;
        }
    };

    /**
     * 从现有对象中选出几个key，组成一个新对象
     *  @author yaoyifeng
     *  @method pick
     *  @param  {Object} obj 对象
     *  @param  {Array} keys 数组
     *  @param  {?} [notFound] 当要提取属性未找到时, 给出的值
     *  @return {Object}
     */
    exports.pick = function(obj,keys,notFound){
        var res={};
        var operator=' as ';
        var operator2='{';
        var typeOperator =':';
        var regex=/([\w:]+)\s*\{\s*([\w.]+)\s*}/g;
        var the = this===exports?obj:this; 
        var getSingleVal = typeof keys==='string';
        var key, val, path, exp, typeExp,type;

        if(keys==null){
            return res;
        }

        else if(getSingleVal){
            keys = [keys];
        }

        for(var i=0;i<keys.length;i++){
            key = keys[i].replace(/\[(\d)\]/g,function($,d){return '.'+d});
            if(key.indexOf(operator)>0){
                exp = key.split(operator);
            }
            else if(key.indexOf(operator2)>0){
                key.replace(regex, function($0,$1,$2){
                    exp = [$2, $1];
                });
            }
            if(exp){
                if(exp.length<2){
                    throw new Error('Params Error:there is no attr-path or key here!');
                }
                path = exp[0].trim();
                key = exp[1].trim();
            }
            if(key.indexOf(typeOperator)>0){
                typeExp = key.split(typeOperator);
                type = typeExp[1].trim();
                key = typeExp[0].trim();
            }
            path = path || key;
            val = arguments.length==2 ? deepGet.call(the,obj,path) : deepGet.call(the,obj,path,notFound);
            val = type ? exports.webTypeParserMap[type](val) : val;

            // for web common default case
            val = val==null? '':val;
            // get it!
            res[key] = val;
            // reset
            exp = path = key = val = type = typeExp =null;
        }

        if(getSingleVal){
            for(var n in res){
                return res[n];
            }
        }

        return res;
    };




    /**
     *   use it like this:
     *
     *   var obj = { target:1, targetType:2, productType:3, org:{name:4,id:5} }
     *   util.pick( obj, ['target','targetType','org.id as orgId'] )
     *
     *   or u like this?
     *   util.pick( obj, ['target','targetType','orgId{org.id}'] )
     * 
     *   util.pick( obj, ['target','targetType','productType:string','noExist'] )
     */
});
EDU('648093738b9aa6baa2e70ea35dcb0b4b',function (
    u,
    _p
){
    //打点
    var LOG_ID = 'log-id',
        DATA_LOG_ID = 'data-' + LOG_ID,
        LOG_ACT = 'log-act',
        DATA_LOG_ACT = 'data-' + LOG_ACT,
        LOG_DATA = 'log-data',
        DATA_LOG_DATA = 'data-'+LOG_DATA;


    /**
     * 生成打点函数
     * @param type  参数类型
     * @returns {Function}
     */
    function log(type){
        return function(elem, value){
            elem.setAttribute(type, value);
            this.$watch( value, function( nval ){
                elem.setAttribute(type, value);
            })
        }
    }

    /**
     * 生成 data-log-id
     * @type {Function}
     */
    _p[LOG_ID] = log(DATA_LOG_ID);

    /**
     * 生成 data-log-act  最里层打点使用act代替id
     * @type {Function}
     */
    _p[LOG_ACT] = log(DATA_LOG_ACT);

    /**
     * 生成data-log-data 打点data
     * @param elem
     * @param value
     */
    _p.setData = function(elem, value){
        function stringifyValue(value){
            if(u._$isObject(value, 'object')){
                try{
                    value =  JSON.stringify(value)
                }catch(e){
                    value = '{}';
                }
            }
            return value;
        }

        elem.setAttribute(DATA_LOG_DATA, stringifyValue(value));

    };

    _p[LOG_DATA] = function(elem, value){

        _p.setData(elem, value);

        this.$watch( value, function( nval ){
            _p.setData(elem, nval);
        })
    };

    function fixObjStr(str){
        if(str.trim().indexOf('{') !== 0){
            return '{' + str + '}';
        }
        return str;
    }

    _p['r-class'] = function(elem, value){
        if(typeof value=== 'string'){
            value = fixObjStr(value)
        }
        // context component bem-class
        var rootCls = this.name;
        // target element bem-class
        var elemCls = elem.getAttribute('class')||'';
        // for performance, only bemify, to tyr get Attr
        // when you using r-class={{'&_active':bol}}, and without attr bem-class, make sure firstClass is stands for bemCls
        var bemCls = this.bemify===true ? (elem.getAttribute('bem-class')||elemCls.trim().split(' ')[0].trim()) : '';

        var isNotHtml = elem.namespaceURI && elem.namespaceURI !== 'http://www.w3.org/1999/xhtml' ;

        this.$watch(value, function(nvalue){
            var className = elem.getAttribute('class');
            className = ' '+ (className||'').replace(/\s+/g, ' ') +' ';
            var clsKey;
            for(var i in nvalue) if(nvalue.hasOwnProperty(i)){
                // clsKey => bemify
                if(this.bemify===true){
                    clsKey = i.replace(/^~/,rootCls).replace(/^&/,bemCls);
                }else{
                    clsKey = i;
                }
                // remove clsKey
                className = className.replace(' ' + clsKey + ' ',' ');
                // add clsKey, if true
                if(nvalue[i] === true){
                    className += clsKey + ' ';
                }
            }
            className = className.trim();
            if(isNotHtml){
                elem.setAttribute('class', className)
            }else{
                elem.className = className
            }
        },true);
    };

    // _p['r-hub'] = function(){
    //     // listen broadcast
    // }
},'7ae3ddb7d9de859c27d10baa0a62bb74');
EDU('3861cff672ae0d39e4938ea06c9de7f7',function (
    u,
    _p
){
    return {
        asNumOrDash:function(val,holder) {
            if(val==null){
                return holder||'--'
            }
            return val;
        }
    };
},'7ae3ddb7d9de859c27d10baa0a62bb74');
EDU('d91c3cfca3f5b3a3d453b2963be19e78',"@font-face{font-family:\"ux-icon\";src:url(//icon.nosdn.127.net/aee33f5f455e2f4c3dad1b4f552ea1e2.eot);src:url(//icon.nosdn.127.net/aee33f5f455e2f4c3dad1b4f552ea1e2.eot) format(\"embedded-opentype\"), url(//icon.nosdn.127.net/6d118beb2f65a621c7586b08fab17189.ttf) format(\"truetype\"), url(//icon.nosdn.127.net/6ca6125d35110c5ac656820d3288cc5c.woff) format(\"woff\"), url(//icon.nosdn.127.net/4c9779b1d25c1dbfd8bc2c44311f1814.svg) format(\"svg\");font-weight:normal;font-style:normal;}[class^=\"ux-icon-\"],[class*=\" ux-icon-\"]{font-family:\"ux-icon\" !important;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-style:normal;font-variant:normal;font-weight:normal;text-decoration:none;text-transform:none;line-height:1;}.ux-icon-OJ-question:before{content:\"\\EA01\";}.ux-icon-QQ:before{content:\"\\EA02\";}.ux-icon-add-big:before{content:\"\\EA03\";}.ux-icon-angle-double-left:before{content:\"\\EA04\";}.ux-icon-angle-double-right:before{content:\"\\EA05\";}.ux-icon-answer-question:before{content:\"\\EA06\";}.ux-icon-arr-right-small:before{content:\"\\EA07\";}.ux-icon-arrange:before{content:\"\\EA08\";}.ux-icon-arrow-down:before{content:\"\\EA09\";}.ux-icon-arrow-left:before{content:\"\\EA0A\";}.ux-icon-arrow-top:before{content:\"\\EA0B\";}.ux-icon-attachment:before{content:\"\\EA0C\";}.ux-icon-attachment2:before{content:\"\\EA0D\";}.ux-icon-audio-text-1:before{content:\"\\EA0E\";}.ux-icon-audio-text:before{content:\"\\EA0F\";}.ux-icon-audio:before{content:\"\\EA10\";}.ux-icon-back:before{content:\"\\EA11\";}.ux-icon-blank-state:before{content:\"\\EA12\";}.ux-icon-blocked:before{content:\"\\EA13\";}.ux-icon-book-1:before{content:\"\\EA14\";}.ux-icon-book:before{content:\"\\EA15\";}.ux-icon-broswer-close-slim:before{content:\"\\EA16\";}.ux-icon-broswer-close:before{content:\"\\EA17\";}.ux-icon-broswer-max-slim:before{content:\"\\EA18\";}.ux-icon-broswer-max:before{content:\"\\EA19\";}.ux-icon-broswer-min-slim:before{content:\"\\EA1A\";}.ux-icon-broswer-min:before{content:\"\\EA1B\";}.ux-icon-broswer-refresh:before{content:\"\\EA1C\";}.ux-icon-broswer-setting:before{content:\"\\EA1D\";}.ux-icon-calculating-signs:before{content:\"\\EA1E\";}.ux-icon-caret-down:before{content:\"\\EA1F\";}.ux-icon-caret-left:before{content:\"\\EA20\";}.ux-icon-caret-right:before{content:\"\\EA21\";}.ux-icon-caret-up:before{content:\"\\EA22\";}.ux-icon-cart:before{content:\"\\EA23\";}.ux-icon-cart3:before{content:\"\\EA24\";}.ux-icon-cash:before{content:\"\\EA25\";}.ux-icon-cash2:before{content:\"\\EA26\";}.ux-icon-category-forum:before{content:\"\\EA27\";}.ux-icon-category-live:before{content:\"\\EA28\";}.ux-icon-category-pdf:before{content:\"\\EA29\";}.ux-icon-category-replay:before{content:\"\\EA2A\";}.ux-icon-category-scorm:before{content:\"\\EA2B\";}.ux-icon-category-test:before{content:\"\\EA2C\";}.ux-icon-category-text:before{content:\"\\EA2D\";}.ux-icon-category-unknown:before{content:\"\\EA2E\";}.ux-icon-category-video:before{content:\"\\EA2F\";}.ux-icon-cert-manage:before{content:\"\\EA30\";}.ux-icon-certification:before{content:\"\\EA31\";}.ux-icon-chat-circle:before{content:\"\\EA32\";}.ux-icon-check-slim:before{content:\"\\EA33\";}.ux-icon-check:before{content:\"\\EA34\";}.ux-icon-clock:before{content:\"\\EA35\";}.ux-icon-close:before{content:\"\\EA36\";}.ux-icon-collect:before{content:\"\\EA37\";}.ux-icon-combined-shape:before{content:\"\\EA38\";}.ux-icon-comment:before{content:\"\\EA39\";}.ux-icon-continue:before{content:\"\\EA3A\";}.ux-icon-cooperation:before{content:\"\\EA3B\";}.ux-icon-course-content:before{content:\"\\EA3C\";}.ux-icon-course-discuss:before{content:\"\\EA3D\";}.ux-icon-course-intro:before{content:\"\\EA3E\";}.ux-icon-course-manage:before{content:\"\\EA3F\";}.ux-icon-course-slim:before{content:\"\\EA40\";}.ux-icon-create-course:before{content:\"\\EA41\";}.ux-icon-credit-setting:before{content:\"\\EA42\";}.ux-icon-credit:before{content:\"\\EA43\";}.ux-icon-data-interface:before{content:\"\\EA44\";}.ux-icon-data:before{content:\"\\EA45\";}.ux-icon-delete:before{content:\"\\EA46\";}.ux-icon-dialog:before{content:\"\\EA47\";}.ux-icon-discuss:before{content:\"\\EA48\";}.ux-icon-document-small:before{content:\"\\EA49\";}.ux-icon-document:before{content:\"\\EA4A\";}.ux-icon-douban:before{content:\"\\EA4B\";}.ux-icon-download:before{content:\"\\EA4C\";}.ux-icon-edit:before{content:\"\\EA4D\";}.ux-icon-elite:before{content:\"\\EA4E\";}.ux-icon-empty-criterial:before{content:\"\\EA4F\";}.ux-icon-empty-status:before{content:\"\\EA50\";}.ux-icon-empty:before{content:\"\\EA51\";}.ux-icon-enter-fullscreen:before{content:\"\\EA52\";}.ux-icon-error-circle:before{content:\"\\EA53\";}.ux-icon-exam:before{content:\"\\EA54\";}.ux-icon-exchange:before{content:\"\\EA55\";}.ux-icon-exercise:before{content:\"\\EA56\";}.ux-icon-exit-fullscreen:before{content:\"\\EA57\";}.ux-icon-eye:before{content:\"\\EA58\";}.ux-icon-feedback:before{content:\"\\EA59\";}.ux-icon-file-export:before{content:\"\\EA5A\";}.ux-icon-folder:before{content:\"\\EA5B\";}.ux-icon-folder2:before{content:\"\\EA5C\";}.ux-icon-front:before{content:\"\\EA5D\";}.ux-icon-gear:before{content:\"\\EA5E\";}.ux-icon-gift:before{content:\"\\EA5F\";}.ux-icon-halfcircle:before{content:\"\\EA60\";}.ux-icon-hand-down:before{content:\"\\EA61\";}.ux-icon-hand-up:before{content:\"\\EA62\";}.ux-icon-headphone:before{content:\"\\EA63\";}.ux-icon-home:before{content:\"\\EA64\";}.ux-icon-html-canvas-add-image:before{content:\"\\EA65\";}.ux-icon-html-canvas-add-text:before{content:\"\\EA66\";}.ux-icon-hyper-link:before{content:\"\\EA67\";}.ux-icon-icourse:before{content:\"\\EA68\";}.ux-icon-im:before{content:\"\\EA69\";}.ux-icon-key:before{content:\"\\EA6A\";}.ux-icon-learn-content:before{content:\"\\EA6B\";}.ux-icon-learn-select:before{content:\"\\EA6C\";}.ux-icon-list:before{content:\"\\EA6D\";}.ux-icon-live-notify-text:before{content:\"\\EA6E\";}.ux-icon-live-playback-text:before{content:\"\\EA6F\";}.ux-icon-live-text:before{content:\"\\EA70\";}.ux-icon-live-tips:before{content:\"\\EA71\";}.ux-icon-live:before{content:\"\\EA72\";}.ux-icon-lock-circle:before{content:\"\\EA73\";}.ux-icon-lock-ellipse:before{content:\"\\EA74\";}.ux-icon-lock:before{content:\"\\EA75\";}.ux-icon-loop2:before{content:\"\\EA76\";}.ux-icon-management:before{content:\"\\EA77\";}.ux-icon-message:before{content:\"\\EA78\";}.ux-icon-microphone:before{content:\"\\EA79\";}.ux-icon-minus-big:before{content:\"\\EA7A\";}.ux-icon-minus:before{content:\"\\EA7B\";}.ux-icon-mobile-plat:before{content:\"\\EA7C\";}.ux-icon-mobile:before{content:\"\\EA7D\";}.ux-icon-mobileview:before{content:\"\\EA7E\";}.ux-icon-move:before{content:\"\\EA7F\";}.ux-icon-mune-lines:before{content:\"\\EA80\";}.ux-icon-mute:before{content:\"\\EA81\";}.ux-icon-netease:before{content:\"\\EA82\";}.ux-icon-new-label:before{content:\"\\EA83\";}.ux-icon-no-pass-label:before{content:\"\\EA84\";}.ux-icon-no-picture:before{content:\"\\EA85\";}.ux-icon-notice:before{content:\"\\EA86\";}.ux-icon-noword:before{content:\"\\EA87\";}.ux-icon-object-question:before{content:\"\\EA88\";}.ux-icon-order:before{content:\"\\EA89\";}.ux-icon-org-content:before{content:\"\\EA8A\";}.ux-icon-org-content2:before{content:\"\\EA8B\";}.ux-icon-org-test:before{content:\"\\EA8C\";}.ux-icon-org-tutor:before{content:\"\\EA8D\";}.ux-icon-org-utility:before{content:\"\\EA8E\";}.ux-icon-out-of-order:before{content:\"\\EA8F\";}.ux-icon-pack:before{content:\"\\EA90\";}.ux-icon-password:before{content:\"\\EA91\";}.ux-icon-pause:before{content:\"\\EA92\";}.ux-icon-payCard:before{content:\"\\EA93\";}.ux-icon-people:before{content:\"\\EA94\";}.ux-icon-permission-manage:before{content:\"\\EA95\";}.ux-icon-phone-number:before{content:\"\\EA96\";}.ux-icon-phone:before{content:\"\\EA97\";}.ux-icon-phone2:before{content:\"\\EA98\";}.ux-icon-play-1:before{content:\"\\EA99\";}.ux-icon-play-fill:before{content:\"\\EA9A\";}.ux-icon-playback:before{content:\"\\EA9B\";}.ux-icon-playing:before{content:\"\\EA9C\";}.ux-icon-plus-circle:before{content:\"\\EA9D\";}.ux-icon-plus:before{content:\"\\EA9E\";}.ux-icon-popularize:before{content:\"\\EA9F\";}.ux-icon-pre-live:before{content:\"\\EAA0\";}.ux-icon-preview:before{content:\"\\EAA1\";}.ux-icon-qiyemail:before{content:\"\\EAA2\";}.ux-icon-question-answer-v2:before{content:\"\\EAA3\";}.ux-icon-question-circle:before{content:\"\\EAA4\";}.ux-icon-questionnaire-slim:before{content:\"\\EAA5\";}.ux-icon-quiz-slim:before{content:\"\\EAA6\";}.ux-icon-qzone:before{content:\"\\EAA7\";}.ux-icon-recheck:before{content:\"\\EAA8\";}.ux-icon-recommend-label:before{content:\"\\EAA9\";}.ux-icon-recommend:before{content:\"\\EAAA\";}.ux-icon-renren:before{content:\"\\EAAB\";}.ux-icon-reply:before{content:\"\\EAAC\";}.ux-icon-resit:before{content:\"\\EAAD\";}.ux-icon-resource-manage:before{content:\"\\EAAE\";}.ux-icon-richText:before{content:\"\\EAAF\";}.ux-icon-right-slim:before{content:\"\\EAB0\";}.ux-icon-right:before{content:\"\\EAB1\";}.ux-icon-sad:before{content:\"\\EAB2\";}.ux-icon-score:before{content:\"\\EAB3\";}.ux-icon-scorm:before{content:\"\\EAB4\";}.ux-icon-scroll-top:before{content:\"\\EAB5\";}.ux-icon-seal:before{content:\"\\EAB6\";}.ux-icon-search:before{content:\"\\EAB7\";}.ux-icon-secret:before{content:\"\\EAB8\";}.ux-icon-secure-number:before{content:\"\\EAB9\";}.ux-icon-service:before{content:\"\\EABA\";}.ux-icon-share:before{content:\"\\EABB\";}.ux-icon-sign-up:before{content:\"\\EABC\";}.ux-icon-smile:before{content:\"\\EABD\";}.ux-icon-square-close:before{content:\"\\EABE\";}.ux-icon-standard:before{content:\"\\EABF\";}.ux-icon-star:before{content:\"\\EAC0\";}.ux-icon-success-circle-empty:before{content:\"\\EAC1\";}.ux-icon-success-circle:before{content:\"\\EAC2\";}.ux-icon-success:before{content:\"\\EAC3\";}.ux-icon-surprise:before{content:\"\\EAC4\";}.ux-icon-tag:before{content:\"\\EAC5\";}.ux-icon-teach-bussiness:before{content:\"\\EAC6\";}.ux-icon-teach-info:before{content:\"\\EAC7\";}.ux-icon-test-slim:before{content:\"\\EAC8\";}.ux-icon-test:before{content:\"\\EAC9\";}.ux-icon-test2:before{content:\"\\EACA\";}.ux-icon-thin-caret-down:before{content:\"\\EACB\";}.ux-icon-thin-caret-up:before{content:\"\\EACC\";}.ux-icon-trophy:before{content:\"\\EACD\";}.ux-icon-unfold:before{content:\"\\EACE\";}.ux-icon-unknown:before{content:\"\\EACF\";}.ux-icon-upload-clound:before{content:\"\\EAD0\";}.ux-icon-upvote1:before{content:\"\\EAD1\";}.ux-icon-upvote2:before{content:\"\\EAD2\";}.ux-icon-user:before{content:\"\\EAD3\";}.ux-icon-video-camera:before{content:\"\\EAD4\";}.ux-icon-video-text:before{content:\"\\EAD5\";}.ux-icon-video:before{content:\"\\EAD6\";}.ux-icon-volume:before{content:\"\\EAD7\";}.ux-icon-warning-circle-circular:before{content:\"\\EAD8\";}.ux-icon-warning-circle-empty:before{content:\"\\EAD9\";}.ux-icon-warning-circle:before{content:\"\\EADA\";}.ux-icon-warning:before{content:\"\\EADB\";}.ux-icon-wave:before{content:\"\\EADC\";}.ux-icon-wechat-friend:before{content:\"\\EADD\";}.ux-icon-wechat:before{content:\"\\EADE\";}.ux-icon-wechat2:before{content:\"\\EADF\";}.ux-icon-weibo:before{content:\"\\EAE0\";}.ux-icon-wrong-slim:before{content:\"\\EAE1\";}.ux-icon-wrong:before{content:\"\\EAE2\";}.ux-icon-ykt-logo:before{content:\"\\EAE3\";}.ux-icon-OJ-question-after:after{content:\"\\EA01\";}.ux-icon-QQ-after:after{content:\"\\EA02\";}.ux-icon-add-big-after:after{content:\"\\EA03\";}.ux-icon-angle-double-left-after:after{content:\"\\EA04\";}.ux-icon-angle-double-right-after:after{content:\"\\EA05\";}.ux-icon-answer-question-after:after{content:\"\\EA06\";}.ux-icon-arr-right-small-after:after{content:\"\\EA07\";}.ux-icon-arrange-after:after{content:\"\\EA08\";}.ux-icon-arrow-down-after:after{content:\"\\EA09\";}.ux-icon-arrow-left-after:after{content:\"\\EA0A\";}.ux-icon-arrow-top-after:after{content:\"\\EA0B\";}.ux-icon-attachment-after:after{content:\"\\EA0C\";}.ux-icon-attachment2-after:after{content:\"\\EA0D\";}.ux-icon-audio-text-1-after:after{content:\"\\EA0E\";}.ux-icon-audio-text-after:after{content:\"\\EA0F\";}.ux-icon-audio-after:after{content:\"\\EA10\";}.ux-icon-back-after:after{content:\"\\EA11\";}.ux-icon-blank-state-after:after{content:\"\\EA12\";}.ux-icon-blocked-after:after{content:\"\\EA13\";}.ux-icon-book-1-after:after{content:\"\\EA14\";}.ux-icon-book-after:after{content:\"\\EA15\";}.ux-icon-broswer-close-slim-after:after{content:\"\\EA16\";}.ux-icon-broswer-close-after:after{content:\"\\EA17\";}.ux-icon-broswer-max-slim-after:after{content:\"\\EA18\";}.ux-icon-broswer-max-after:after{content:\"\\EA19\";}.ux-icon-broswer-min-slim-after:after{content:\"\\EA1A\";}.ux-icon-broswer-min-after:after{content:\"\\EA1B\";}.ux-icon-broswer-refresh-after:after{content:\"\\EA1C\";}.ux-icon-broswer-setting-after:after{content:\"\\EA1D\";}.ux-icon-calculating-signs-after:after{content:\"\\EA1E\";}.ux-icon-caret-down-after:after{content:\"\\EA1F\";}.ux-icon-caret-left-after:after{content:\"\\EA20\";}.ux-icon-caret-right-after:after{content:\"\\EA21\";}.ux-icon-caret-up-after:after{content:\"\\EA22\";}.ux-icon-cart-after:after{content:\"\\EA23\";}.ux-icon-cart3-after:after{content:\"\\EA24\";}.ux-icon-cash-after:after{content:\"\\EA25\";}.ux-icon-cash2-after:after{content:\"\\EA26\";}.ux-icon-category-forum-after:after{content:\"\\EA27\";}.ux-icon-category-live-after:after{content:\"\\EA28\";}.ux-icon-category-pdf-after:after{content:\"\\EA29\";}.ux-icon-category-replay-after:after{content:\"\\EA2A\";}.ux-icon-category-scorm-after:after{content:\"\\EA2B\";}.ux-icon-category-test-after:after{content:\"\\EA2C\";}.ux-icon-category-text-after:after{content:\"\\EA2D\";}.ux-icon-category-unknown-after:after{content:\"\\EA2E\";}.ux-icon-category-video-after:after{content:\"\\EA2F\";}.ux-icon-cert-manage-after:after{content:\"\\EA30\";}.ux-icon-certification-after:after{content:\"\\EA31\";}.ux-icon-chat-circle-after:after{content:\"\\EA32\";}.ux-icon-check-slim-after:after{content:\"\\EA33\";}.ux-icon-check-after:after{content:\"\\EA34\";}.ux-icon-clock-after:after{content:\"\\EA35\";}.ux-icon-close-after:after{content:\"\\EA36\";}.ux-icon-collect-after:after{content:\"\\EA37\";}.ux-icon-combined-shape-after:after{content:\"\\EA38\";}.ux-icon-comment-after:after{content:\"\\EA39\";}.ux-icon-continue-after:after{content:\"\\EA3A\";}.ux-icon-cooperation-after:after{content:\"\\EA3B\";}.ux-icon-course-content-after:after{content:\"\\EA3C\";}.ux-icon-course-discuss-after:after{content:\"\\EA3D\";}.ux-icon-course-intro-after:after{content:\"\\EA3E\";}.ux-icon-course-manage-after:after{content:\"\\EA3F\";}.ux-icon-course-slim-after:after{content:\"\\EA40\";}.ux-icon-create-course-after:after{content:\"\\EA41\";}.ux-icon-credit-setting-after:after{content:\"\\EA42\";}.ux-icon-credit-after:after{content:\"\\EA43\";}.ux-icon-data-interface-after:after{content:\"\\EA44\";}.ux-icon-data-after:after{content:\"\\EA45\";}.ux-icon-delete-after:after{content:\"\\EA46\";}.ux-icon-dialog-after:after{content:\"\\EA47\";}.ux-icon-discuss-after:after{content:\"\\EA48\";}.ux-icon-document-small-after:after{content:\"\\EA49\";}.ux-icon-document-after:after{content:\"\\EA4A\";}.ux-icon-douban-after:after{content:\"\\EA4B\";}.ux-icon-download-after:after{content:\"\\EA4C\";}.ux-icon-edit-after:after{content:\"\\EA4D\";}.ux-icon-elite-after:after{content:\"\\EA4E\";}.ux-icon-empty-criterial-after:after{content:\"\\EA4F\";}.ux-icon-empty-status-after:after{content:\"\\EA50\";}.ux-icon-empty-after:after{content:\"\\EA51\";}.ux-icon-enter-fullscreen-after:after{content:\"\\EA52\";}.ux-icon-error-circle-after:after{content:\"\\EA53\";}.ux-icon-exam-after:after{content:\"\\EA54\";}.ux-icon-exchange-after:after{content:\"\\EA55\";}.ux-icon-exercise-after:after{content:\"\\EA56\";}.ux-icon-exit-fullscreen-after:after{content:\"\\EA57\";}.ux-icon-eye-after:after{content:\"\\EA58\";}.ux-icon-feedback-after:after{content:\"\\EA59\";}.ux-icon-file-export-after:after{content:\"\\EA5A\";}.ux-icon-folder-after:after{content:\"\\EA5B\";}.ux-icon-folder2-after:after{content:\"\\EA5C\";}.ux-icon-front-after:after{content:\"\\EA5D\";}.ux-icon-gear-after:after{content:\"\\EA5E\";}.ux-icon-gift-after:after{content:\"\\EA5F\";}.ux-icon-halfcircle-after:after{content:\"\\EA60\";}.ux-icon-hand-down-after:after{content:\"\\EA61\";}.ux-icon-hand-up-after:after{content:\"\\EA62\";}.ux-icon-headphone-after:after{content:\"\\EA63\";}.ux-icon-home-after:after{content:\"\\EA64\";}.ux-icon-html-canvas-add-image-after:after{content:\"\\EA65\";}.ux-icon-html-canvas-add-text-after:after{content:\"\\EA66\";}.ux-icon-hyper-link-after:after{content:\"\\EA67\";}.ux-icon-icourse-after:after{content:\"\\EA68\";}.ux-icon-im-after:after{content:\"\\EA69\";}.ux-icon-key-after:after{content:\"\\EA6A\";}.ux-icon-learn-content-after:after{content:\"\\EA6B\";}.ux-icon-learn-select-after:after{content:\"\\EA6C\";}.ux-icon-list-after:after{content:\"\\EA6D\";}.ux-icon-live-notify-text-after:after{content:\"\\EA6E\";}.ux-icon-live-playback-text-after:after{content:\"\\EA6F\";}.ux-icon-live-text-after:after{content:\"\\EA70\";}.ux-icon-live-tips-after:after{content:\"\\EA71\";}.ux-icon-live-after:after{content:\"\\EA72\";}.ux-icon-lock-circle-after:after{content:\"\\EA73\";}.ux-icon-lock-ellipse-after:after{content:\"\\EA74\";}.ux-icon-lock-after:after{content:\"\\EA75\";}.ux-icon-loop2-after:after{content:\"\\EA76\";}.ux-icon-management-after:after{content:\"\\EA77\";}.ux-icon-message-after:after{content:\"\\EA78\";}.ux-icon-microphone-after:after{content:\"\\EA79\";}.ux-icon-minus-big-after:after{content:\"\\EA7A\";}.ux-icon-minus-after:after{content:\"\\EA7B\";}.ux-icon-mobile-plat-after:after{content:\"\\EA7C\";}.ux-icon-mobile-after:after{content:\"\\EA7D\";}.ux-icon-mobileview-after:after{content:\"\\EA7E\";}.ux-icon-move-after:after{content:\"\\EA7F\";}.ux-icon-mune-lines-after:after{content:\"\\EA80\";}.ux-icon-mute-after:after{content:\"\\EA81\";}.ux-icon-netease-after:after{content:\"\\EA82\";}.ux-icon-new-label-after:after{content:\"\\EA83\";}.ux-icon-no-pass-label-after:after{content:\"\\EA84\";}.ux-icon-no-picture-after:after{content:\"\\EA85\";}.ux-icon-notice-after:after{content:\"\\EA86\";}.ux-icon-noword-after:after{content:\"\\EA87\";}.ux-icon-object-question-after:after{content:\"\\EA88\";}.ux-icon-order-after:after{content:\"\\EA89\";}.ux-icon-org-content-after:after{content:\"\\EA8A\";}.ux-icon-org-content2-after:after{content:\"\\EA8B\";}.ux-icon-org-test-after:after{content:\"\\EA8C\";}.ux-icon-org-tutor-after:after{content:\"\\EA8D\";}.ux-icon-org-utility-after:after{content:\"\\EA8E\";}.ux-icon-out-of-order-after:after{content:\"\\EA8F\";}.ux-icon-pack-after:after{content:\"\\EA90\";}.ux-icon-password-after:after{content:\"\\EA91\";}.ux-icon-pause-after:after{content:\"\\EA92\";}.ux-icon-payCard-after:after{content:\"\\EA93\";}.ux-icon-people-after:after{content:\"\\EA94\";}.ux-icon-permission-manage-after:after{content:\"\\EA95\";}.ux-icon-phone-number-after:after{content:\"\\EA96\";}.ux-icon-phone-after:after{content:\"\\EA97\";}.ux-icon-phone2-after:after{content:\"\\EA98\";}.ux-icon-play-1-after:after{content:\"\\EA99\";}.ux-icon-play-fill-after:after{content:\"\\EA9A\";}.ux-icon-playback-after:after{content:\"\\EA9B\";}.ux-icon-playing-after:after{content:\"\\EA9C\";}.ux-icon-plus-circle-after:after{content:\"\\EA9D\";}.ux-icon-plus-after:after{content:\"\\EA9E\";}.ux-icon-popularize-after:after{content:\"\\EA9F\";}.ux-icon-pre-live-after:after{content:\"\\EAA0\";}.ux-icon-preview-after:after{content:\"\\EAA1\";}.ux-icon-qiyemail-after:after{content:\"\\EAA2\";}.ux-icon-question-answer-v2-after:after{content:\"\\EAA3\";}.ux-icon-question-circle-after:after{content:\"\\EAA4\";}.ux-icon-questionnaire-slim-after:after{content:\"\\EAA5\";}.ux-icon-quiz-slim-after:after{content:\"\\EAA6\";}.ux-icon-qzone-after:after{content:\"\\EAA7\";}.ux-icon-recheck-after:after{content:\"\\EAA8\";}.ux-icon-recommend-label-after:after{content:\"\\EAA9\";}.ux-icon-recommend-after:after{content:\"\\EAAA\";}.ux-icon-renren-after:after{content:\"\\EAAB\";}.ux-icon-reply-after:after{content:\"\\EAAC\";}.ux-icon-resit-after:after{content:\"\\EAAD\";}.ux-icon-resource-manage-after:after{content:\"\\EAAE\";}.ux-icon-richText-after:after{content:\"\\EAAF\";}.ux-icon-right-slim-after:after{content:\"\\EAB0\";}.ux-icon-right-after:after{content:\"\\EAB1\";}.ux-icon-sad-after:after{content:\"\\EAB2\";}.ux-icon-score-after:after{content:\"\\EAB3\";}.ux-icon-scorm-after:after{content:\"\\EAB4\";}.ux-icon-scroll-top-after:after{content:\"\\EAB5\";}.ux-icon-seal-after:after{content:\"\\EAB6\";}.ux-icon-search-after:after{content:\"\\EAB7\";}.ux-icon-secret-after:after{content:\"\\EAB8\";}.ux-icon-secure-number-after:after{content:\"\\EAB9\";}.ux-icon-service-after:after{content:\"\\EABA\";}.ux-icon-share-after:after{content:\"\\EABB\";}.ux-icon-sign-up-after:after{content:\"\\EABC\";}.ux-icon-smile-after:after{content:\"\\EABD\";}.ux-icon-square-close-after:after{content:\"\\EABE\";}.ux-icon-standard-after:after{content:\"\\EABF\";}.ux-icon-star-after:after{content:\"\\EAC0\";}.ux-icon-success-circle-empty-after:after{content:\"\\EAC1\";}.ux-icon-success-circle-after:after{content:\"\\EAC2\";}.ux-icon-success-after:after{content:\"\\EAC3\";}.ux-icon-surprise-after:after{content:\"\\EAC4\";}.ux-icon-tag-after:after{content:\"\\EAC5\";}.ux-icon-teach-bussiness-after:after{content:\"\\EAC6\";}.ux-icon-teach-info-after:after{content:\"\\EAC7\";}.ux-icon-test-slim-after:after{content:\"\\EAC8\";}.ux-icon-test-after:after{content:\"\\EAC9\";}.ux-icon-test2-after:after{content:\"\\EACA\";}.ux-icon-thin-caret-down-after:after{content:\"\\EACB\";}.ux-icon-thin-caret-up-after:after{content:\"\\EACC\";}.ux-icon-trophy-after:after{content:\"\\EACD\";}.ux-icon-unfold-after:after{content:\"\\EACE\";}.ux-icon-unknown-after:after{content:\"\\EACF\";}.ux-icon-upload-clound-after:after{content:\"\\EAD0\";}.ux-icon-upvote1-after:after{content:\"\\EAD1\";}.ux-icon-upvote2-after:after{content:\"\\EAD2\";}.ux-icon-user-after:after{content:\"\\EAD3\";}.ux-icon-video-camera-after:after{content:\"\\EAD4\";}.ux-icon-video-text-after:after{content:\"\\EAD5\";}.ux-icon-video-after:after{content:\"\\EAD6\";}.ux-icon-volume-after:after{content:\"\\EAD7\";}.ux-icon-warning-circle-circular-after:after{content:\"\\EAD8\";}.ux-icon-warning-circle-empty-after:after{content:\"\\EAD9\";}.ux-icon-warning-circle-after:after{content:\"\\EADA\";}.ux-icon-warning-after:after{content:\"\\EADB\";}.ux-icon-wave-after:after{content:\"\\EADC\";}.ux-icon-wechat-friend-after:after{content:\"\\EADD\";}.ux-icon-wechat-after:after{content:\"\\EADE\";}.ux-icon-wechat2-after:after{content:\"\\EADF\";}.ux-icon-weibo-after:after{content:\"\\EAE0\";}.ux-icon-wrong-slim-after:after{content:\"\\EAE1\";}.ux-icon-wrong-after:after{content:\"\\EAE2\";}.ux-icon-ykt-logo-after:after{content:\"\\EAE3\";}");
EDU('552aff24b47a4965840d6bd27e21e8c9',function (
    u, v, e,
    setting,
    util,
    directive,
    filter,
    css
){
    // 加载字体文件
    e._$pushCSSText(css);

    /**
     * UI组件基类，组件池的所有组件均扩展于此基类
     *
     * @example
     *
     * NEJ.define([
     *      'pool/component-base/src/base'
     * ],function(
     *      Component
     * ){
     *      var Abc = Component.extends({
     *          config:function(){
     *              this.supr();
     *              // DO
     *          },
     *          init:function(){
     *              this.supr();
     *              // DO
     *          }
     *      });
     *      return Abc;
     * });
     *
     * @class module:pool/component-base/src/base.Component
     *
     * @param  {Object} options      - 组件构造参数
     * @param  {Object} options.data - 与视图关联的数据模型
     */
    var Component = Regular.extend({
        /**
         * 模板编译前用来初始化参数
         *
         * @protected
         * @method  module:pool/component-base/src/base.Component#config
         * @returns {void}
         */
        config: function(){
            // active css text
            e._$dumpCSSText();
            // set default value
            util.extend(this.data, {
                /**
                 * 是否可见
                 *
                 * @member {Boolean}  module:pool/component-base/src/base.Component#visible
                 */
                visible: true
            });
            // ensure use component options first
            this.supr();
        },

        /**
         * 模板编译之后(即活动dom已经产生)被调用, 可以在这里处理一些与dom相关的逻辑
         *
         * @protected
         * @method  module:pool/component-base/src/base.Component#init
         * @returns {void}
         */
        init: function(){
            this.supr();
        },

        /**
         * 组件销毁策略
         *
         * @protected
         * @method  module:pool/component-base/src/base.Component#destroy
         * @returns {void}
         */
        destroy:function(){
            // clear all global event
            u._$forEach(this._tmp_events,function (args) {
                v._$delEvent.apply(v,args);
            });
            delete this._tmp_events;
            this.supr();
        },

        /**
         * 根据配置和权限判断是否可见,用于在html中判断
         * 该方法先用于兼容k12和study教学 后续会抽离
         *
         * @public
         * @method module:pool/component-base/src/base.Component#isShow
         * @param  switcher 业务是否显示的开关
         * @returns {boolean}
         */
        isShow: function(switcher){
            return setting.isShow({
                "switcher": switcher,
                "key": this.settingKey
            });
        },

        /**
         * 设置默认配置信息
         *
         * @private
         * @method module:pool/component-base/src/base.Component#_flushSetting
         * @param   {String} key - 配置键
         * @param   {Object} map - 配置项
         * @returns {void}
         */
        _flushSetting: (function(){
            var kmap = {};
            return function (key, map) {
                if (!kmap[key]){
                    kmap[key] = !0;
                    setting.$default(key,map);
                }
            }
        })(),

        /**
         * 添加全局事件，通过此接口添加的事件在组件 destroy 时自动销毁
         *
         * @example
         *
         * this._addGlobalEvent([
         *      [window, 'scroll', function(event){}],
         *      [Klass, 'change', function(event){}]
         * ]);
         *
         * @protected
         * @method  module:pool/component-base/src/base.Component#_addGlobalEvent
         * @param   {Array} list - 事件列表，每个元素为 [element, type, handler] 数组
         * @returns {void}
         */
        _addGlobalEvent: function (list) {
            var cache = this._tmp_events;
            if (!cache){
                cache = [];
                this._tmp_events = cache;
            }
            u._$forEach(list,function (args) {
                v._$addEvent.apply(v,args);
                cache.push(args);
            });
        }
    }).directive(directive).filter(filter);
    
    /**
     * 组件扩展方法
     *
     * @example
     *
     * NEJ.define([
     *      'pool/component-base/src/base',
     *      'text!./base.css'
     * ],function(
     *      Component,
     *      css
     * ){
     *      var Abc = Component.extends({
     *          css:css,
     *          config:function(data){
     *              this.supr(data);
     *              // DO
     *          },
     *          init:function(){
     *              this.supr();
     *              // DO
     *          }
     *      });
     *      return Abc;
     * });
     *
     * @method  module:pool/component-base/src/base.Component.$extends
     * @param   {Object} options          - 配置信息
     * @param   {String} options.name     - 组件标签名称
     * @param   {String} options.css      - 组件的样式表
     * @param   {String} options.template - 组件的HTML结构
     * @returns {module:pool/component-base/src/base.Component} 组件类
     */
    Component.$extends = function ext(options){
        if(options.hasOwnProperty('bem')){
            options.bemify = options.bem;
        }
        // replace '~'/'&' to 'B'em
        if(options.bemify && options.template){
            options.template = util.bemify(options.template,options.name, options.bemify==='&' );
            //delete options.bemify; // keep it for r-class hook
        }

        // cache css text
        if(typeof options.css==='string'){
            var css = options.css.trim();
            if (!!css){
                e._$pushCSSText(options.css);
            }
            delete options.css;
        }
        // delegate extends api
        var Comp = this.extend(options);
        Comp.$extends = ext;
        // correct component name
        Comp.cname = options.name;
        return Comp;
    };

    return Component;
},'7ae3ddb7d9de859c27d10baa0a62bb74','47c39b82b089936fb18e9e39936c0aea','a331c350177176375a695c1e440929c4','821cd4f505193fea8696661693b64d31','0c384857cb008bb54aaa74334e5a414a','648093738b9aa6baa2e70ea35dcb0b4b','3861cff672ae0d39e4938ea06c9de7f7','d91c3cfca3f5b3a3d453b2963be19e78');
EDU('dfc4f2366e47c48a10d515f65073e85c',".cc{background:url(\"../res/richEditor.png\") no-repeat 4999px 4999px}\n/*# sourceMappingURL=c.css.map */\n");
EDU('43fc640b337cdccb199619a34c7cfaea',function (Component, css) {
	var C = Component.$extends({
		css: css
	});
	return C;
},'552aff24b47a4965840d6bd27e21e8c9','dfc4f2366e47c48a10d515f65073e85c');