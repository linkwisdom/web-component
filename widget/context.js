/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var util = require('../core/main').util;

    exports.bindParentContext = function () {
        var parem = this.parentElement;
        while (parem && !this.parentTag) {
            // 如果parent元素有context属性
            if (parem.context) {
                // 补充拷贝
                util.extends(this.context, parem.context, {addOnly: true});
                this.parentTag = parem;
                break;
            }
            parem = parem.parentElement;
        }

        if (this.parentTag) {
            this.parentTag.addEventListener('contex-change', function (e) {
                var changes = e.detail;
                changes.forEach(function (c) {
                    elm.context[c.name] = c.object[c.name];
                });
            });
        }
    };

    exports.bindChildContext = function () {

    };

    exports.getContext = function () {
        var elm = this;
        // 从原型context中拷贝一份数据
        this.context = util.extends({}, this.context || {});
        // 从数据集合中获取上下文
        util.extends(this.context, this.dataset);

        if (this.bindParentContext) {
            this.bindParentContext();

            // 暂时必需向上绑定，才能产生向下依赖
            if (this.bindChildContext) {
                this.bindChildContext();
            }
        }

        Object.observe(this.context, function (changes) {
            elm.fire('contex-change', changes);
            elm.onContextChange(changes);
        });
        
        return this.context;
    };
});
