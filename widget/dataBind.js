/**
 * @file webComponent 标签创建
 * - todo 兼容大部分浏览器无registerElement
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 
define(function (require, exports, module) {
    module.exports = {
        tagName: 'phc-data-bind-tag',
        set: function (key, value) {
            this.context[key] = value;
        },
        get: function (key) {
            return this.context[key];
        },
        onContextChange: function (changes) {
            
        }
    };
});