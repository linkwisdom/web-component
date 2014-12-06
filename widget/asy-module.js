/**
 * @file 异步模块加载
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var connect = require('common/util/connect');

    exports.getController = function (callback) {
        var container = this;
        container.id = container.id
            || 'phc-' + Math.floor(Math.random() * 0XFFFFFF).toString(36);

        this.context.container = container.id;
        if (this.context.modulePath) {
            this.context.modulePath = this.getAttribute('module-path');
        }

        // 加载子模块
        this.loadModule(
            this.context.modulePath,
            this.context
        ).then(function () {
            callback();
        })
    };

    exports.loadModule = function (path, context) {
        return connect(path, context);
    };

    var exports = document.registerElement('phoenix-module', {
        prototype: moduleElement
    });
});
