/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var util = require('../core/main').util;

    exports.set = function (key, value, option) {
        var oldValue = this.context[key];
        
        // 触发context-change事件
        this.context[key] = value;
        if (!Object.observe) {
            var changes = [{
                name: key,
                object: this.context,
                oldValue: oldValue
            }];
            this.fire('context-change', changes);
        }

        // 如果不指定silten则进行绑定
        if (!option || !option.silent) {
            this.bindData(key, value);
        }
    };

    exports.get = function (key) {
        return this.context[key];
    };

    exports.bindData = function (name, value) {
        var ems = this.querySelectorAll('[data-field="'+name+'"]');
        [].slice.call(ems).forEach(function (em) {
            em.textContent = em.value = value;
        });
    };

    exports.bindParentContext = function () {
        var tag = this;
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
                    // tag.context[c.name] = c.object[c.name];
                    tag.set(c.name, c.object[c.name]);
                });
            });
        }
    };
    
    exports.getContext = function () {
        var elm = this;
        // 从原型context中拷贝一份数据
        this.context = util.extends({}, this.context || {});
        // 从数据集合中获取上下文
        util.extends(this.context, this.dataset);

        if (this.bindParentContext) {
            this.bindParentContext();
        }

        // todo 解决firefox等浏览器无法实现数据观察的问题       
        if (Object.observe) {
            Object.observe(this.context, function (changes) {
                elm.fire('contex-change', changes);
                elm.onContextChange(changes);
            });
        } else {
            // 为了兼容无法observe的浏览器
            // 无法observe的浏览器建议属性直接用set方式设置
            elm.addEventListener('context-change', function (e) {
                var changes = e.detail;
                elm.onContextChange(changes);
            });
        }

        this.fire('context-ready', this.context);
        return this.context;
    };
});
