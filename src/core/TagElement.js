/**
 * @file webComponent 标签创建
 * - todo 兼容大部分浏览器无registerElement
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 
define(function (require, exports, module) {
    var register = require('./register');
    var util = require('./util');

    var domProto = Object.create(HTMLElement.prototype);
    var protoTag = {};

    // attachedCallback（插入 DOM 时的回调）
    protoTag.attachedCallback = function () {
        this.fire('attached');
    };

    /**
     * detachedCallback（从 DOM 中移除时的回调）
     */
    protoTag.detachedCallback = function () {
        if (this.dispose) {
            this.dispose();
        }
        
        this.fire('detached');
    };

    /**
     * attributeChangedCallback（属性改变时的回调）
     * @param {string} name
     * @param {string} oldValue
     * @param {string} newValue
     */
    protoTag.attributeChangedCallback = function (name, oldValue, newValue) {
        if (name.indexOf('data-') == 0) {
            var key = name.substr(5);
            this.context[key] = newValue;
        }
        this.fire('attribute-change', {
            name: name,
            oldValue: oldValue,
            newValue: newValue
        });
    };

    /**
     * fire 只为使用方便
     * - 监听事件用原生addEventLisener
     */
    protoTag.fire = function (name, detail) {
        // console.log(name, detail, this.tagName, this.id);
        this.dispatchEvent(new CustomEvent(name, {detail: detail}));
    };

    /**
     * attributeChangedCallback（属性改变时的回调）
     */
    protoTag.createdCallback = function () {
        var elm = this;
        this.fire('created');

        this.id = this.id || 'phc-' + util.getRandomUId();
        elm.setAttribute('phc-type', util.toCamelCase(this.tagName));

        // 如果需要context, 定义context原型即可
        if (this.getContext) {
            this.getContext();
        }

        if (this.initTemplate) {
            this.initTemplate();
        }

        if (this.init) {
             // 初始化行为和内容
            this.init();
            this.fire('initialized');
        }

        if (this.bindContext) {
            this.bindContext();
        }

        // ui事件无法提前绑定
        if (this.tagEvents) {
            util.extends(this, this.tagEvents);
        }

        // 由指定创建器产生控制器
        if (this.getController) {
            // 为了异步加载控制器，采用回调方式
            this.getController(
                function (controller) {
                    this.controller = controller;
                    this.context.container = this;
                    this.controller.enter(this.context);
                    this.fire('entered');
                }.bind(this)
            );
        }
    };
    
    // interface
    protoTag.onContextChange = function () {};
    protoTag.init = function () {};

    util.extends(domProto, protoTag);
    var TagElement = document.registerElement(
        'phc-tag',
        {prototype: domProto}
    );

    register.register(TagElement);

    TagElement.create = function (proto) {
        if (proto.extends) {
            var $super = register.getTag(proto.extends);
            if ($super) {
                util.extends(proto, $super, {addOnly: true});
                proto.$super = $super;
            }
        } else {
            proto.$super = this;
        }

        return TagElement.register.call(this, proto.tagName, {
            prototype: proto
        });
    };

    TagElement.register = function (tagName, option) {
        if ('object' == typeof tagName && !option) {
            return TagElement.create.call(this, tagName);
        }

        var  domProto = Object.create(this.prototype);

        // 基于当前元素的原型拷贝
        // extends(domProto, this.prototype);
        util.extends(domProto, option);

        tagName = util.toLineCase(tagName);
        var params = { prototype: domProto };

        if (option.extends) {
            params.extends = option.extends;
        }
        
        var newTag = document.registerElement(
            tagName,
            params
        );

        newTag.create = this.create;
        register.register(newTag);
        return newTag;
    };

    window.TagElement = TagElement;
    module.exports = TagElement;
});