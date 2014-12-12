/**
 * @file 模块编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require) {
    var util = require('../core/util');
    var controller = require('./controller');

    // 直接继承controller
    var exports = Object.create(controller);

    exports.getController = function (callback) {
        var container = this;
        controller.getController.call(this, callback);

        // 通过module-path 或data-module-path属性获取
        if (!this.context.modulePath) {
            this.context.modulePath = this.getAttribute('module-path');
        }

        if (this.context.modulePath) {
            // 异步模块
            require([container.context.modulePath], function (Action) {
                // 直接是一个拷贝
                container.context.args = util.extends({args: null}, container.context, {addOnly: true});
                container.controller = new Action();
                callback(container.controller);
            });
        }
    };

    return util.extends(exports, controller, {addOnly: true});
});
