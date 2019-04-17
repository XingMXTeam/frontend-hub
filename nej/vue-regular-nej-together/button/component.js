NEJ.define(['text!./component.html'], function (tpl) {
    var stateClazzMap = {
        disabled: "th-bk-disable",
        primary: "th-bk-main",
        warning: "th-bk-error-gh",
        gh: "th-bk-main-gh",
        buy: "th-bk-help2",
        info: "th-bk-help1",
        error: "th-bk-error",
        deny: "th-bk-error-gh"
    };

    var Button = Regular.extend({
        name: 'ux-button',
        template: tpl,
        // computed properties
        computed: {
            /**
             * 根据State返回样式
             *
             * @member {Boolean} module:pool/component-button/src/button/component.Pager#stateClazz
             */
            stateClazz: {
                get: function () {
                    return stateClazzMap[this.data.state];
                }
            }
        },
        /**
         * 模板编译前用来初始化参数
         *
         * @protected
         * @method  module:pool/component-button/src/button/component.Button#config
         * @returns {void}
         */
        config: function () {
            Object.assign(this.data, {
                /**
                 * 按钮类型
                 * @member {String} module:pool/component-button/src/button/component.Button#state
                 */
                "state": "primary",
                /**
                 * 按钮大小
                 * @member {String} module:pool/component-button/src/button/component.Button#size
                 */
                "size": "",
                /**
                 * 按钮的宽度
                 * @member {String} module:pool/component-button/src/button/component.Button#width
                 */
                "width": "",
                /**
                 * 按钮文字
                 * @member {String} module:pool/component-button/src/button/component.Button#value
                 */
                "value": "",
                /**
                 * @member {String} module:pool/component-button/src/button/component.Button#class
                 */
                "class": "",
                /**
                 * @member {Object} module:pool/component-button/src/button/component.Button#log
                 */
                "log": {}
            });
            this.supr();
        },

        /**
         * 模板编译之后(即活动dom已经产生)处理逻辑，可以在这里处理一些与dom相关的逻辑
         *
         * @protected
         * @method  module:pool/component-button/src/button/component.Button#init
         * @returns {void}
         */
        init: function () {
            this.supr();
        },

        /**
         * 组件销毁策略，如果有使用第三方组件务必在此先销毁第三方组件再销毁自己
         *
         * @protected
         * @method  module:pool/component-button/src/button/component.Button#destroy
         * @returns {void}
         */
        destroy: function () {
            // TODO
            this.supr();
        },

        /**
         * 点击事件
         *
         * @method  module:pool/component-button/src/button/component.Button#click
         * @param {function} $event click回调事件
         * @returns {void}
         */
        click: function ($event) {
            if (this.data.state == 'disabled') { return; }
            this.$emit('click', $event);
        }
    });
})