/**
 * @file controller 定义复杂模块控制行为
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var util = require('../core/util');
    var context = require('./context');
    
    exports.getController = function (callback) {
        var container = this;

        // 如果已经绑定控制器，直接执行
        // 绑定this.controller是为了子模块更好地与父模块通信
        if (this.controller) {
            callback(this.controller);
            return;
        }

//         container.id = container.id
//             || 'phc-' + Math.floor(Math.random() * 0XFFFFFF).toString(36);

        this.context.container = container.id;

        // 通过命名注册获取控制器
        if (this.context.controller) {
            this.controller = register.get(this.context.controller);
            callback(this.controller);
            return;
        }
    };

    exports.bindEvent = function () {
        this.controller.on('*', function () {
            this.fire(e)
        });
    };

    return util.extends(exports, context);;
});
