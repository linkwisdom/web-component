/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var util = require('../core/util');

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

    exports.tagName = 'phc-container-tag';

    /**
     * 将节点加入上下文
     */
    exports.getViewTags = function (tagType) {
        var cond = tagType ? '=' + util.toCamelCase(tagType) : '';
        this.viewTags = this.querySelectorAll('[phc-type' + cond + ']');
        return this.viewTags;
    };

    exports.bindEvents = function (events) {
        bindEvents(this, events);
    };

    exports.bindChildrenEvents = function (prop) {
        for (var selector in prop) {
            var option = prop[selector];
            var tags = [].slice.call(this.querySelector(selector) || []);
            tags.forEach(function (tag) {
                bindEvents(tag, events);
            });
        }
    };

    exports.init = function () {
        this.bindEvents({
            'click': function () {
                console.dir(this);
            },
            'context-change': function (changes) {
                console.log(changes)
            }
        });
    };
});
