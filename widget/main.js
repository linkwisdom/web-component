/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var tag = require('../core/main');
    var TagElement = tag.TagElement;

    exports.dataBind = require('./dataBind');
    exports.context = require('./context');
    exports.template = require('./template');
    exports.container = require('./container');

    exports.mix = function () {
        var widgets = [].map.call(arguments, function (widgetName) {
            return typeof widgetName !== 'string' 
                ? widgetName
                : (exports[widgetName] || {});
        });

        return tag.util.mix.apply({}, widgets);
    };
});
