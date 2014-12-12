/**
 * @file webComponent 标签创建
 * - todo 兼容大部分浏览器无registerElement
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 
define(function (require, exports, module) {
    var context = require('./context');
    module.exports = {
        bubble: function (changes) {
            var tag = this;
            var parentTag = this.parentTag;
            
            var pre = this.parentElement;
            while (pre && !parentTag) {
                if (pre.context) {
                    parentTag = pre;
                    this.parentTag = pre;
                    break;
                }
                pre = pre.parentElement;
            }

            // 默认局部刷新
            changes.forEach(function (change) {
                // parentTag.context[change.name] = tag.context[change.name];
                parentTag.set(change.name, tag.context[change.name])
            });
        },
        bindContext: function () {
            this.setValue(this.context[this.dataset.field]);
        },
        setValue: function (value) {
            this.textContent = this.value = value || '';
        },
        onContextChange: function (changes) {
            this.bubble(changes);
        }
    };
});