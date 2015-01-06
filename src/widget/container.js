/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var util = require('../core/util');
    var template = require('./template');

    function bindEvents(tag, eventMap) {
        var events = Object.keys(eventMap).map(function (type) {
            return {
                type: type,
                handler: eventMap[type]
            };
        });
        
        events.forEach(function (evt) {
            tag.addEventListener(evt.type, evt.handler);
        });
    }
    
    exports.initTemplate = function () {
        // 原始的内容作为模板
        this.template = this.innerHTML;

        this.innerHTML =
            '<phc-template>'
            + this.innerHTML
            + '</phc-template>';
    };

    /**
     * 选择容器内的语义标签元素
     */
    exports.queryTags = function (tagType) {
        var cond = tagType ? '=' + util.toCamelCase(tagType) : '';
        return this.querySelectorAll('[phc-type' + cond + ']');
    };

    /**
     * 绑定当前元素的事件
     */
    exports.bindEvents = function (events) {
        bindEvents(this, events);
    };

    /**
     * 绑定符合条件的子元素事件
     */
    exports.bindChildrenEvents = function (prop) {
        for (var selector in prop) {
            var option = prop[selector];
            var tags = [].slice.call(this.querySelector(selector) || []);
            tags.forEach(function (tag) {
                bindEvents(tag, events);
            });
        }
    };
});
