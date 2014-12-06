/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var TagElement = require('./TagElement');
    var register = require('./register');

    exports.TagElement = TagElement;
    exports.util = require('./util');

    exports.register = function (tagName, option) {
        return TagElement.register(tagName, option);
    };
    
    exports.getTag = function (tagName) {
        return register.getTag(tagName);
    };
});
