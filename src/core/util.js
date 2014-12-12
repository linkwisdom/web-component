/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {

    exports.extends = function (target, source, option) {
        option = option || {};
        
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                if (option.addOnly && target.hasOwnProperty(key)) {
                    continue;
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

    exports.getRandomUId = function () {
        return [
            Math.floor(Math.random() * 0xFFFFF).toString(32),
            Math.floor(Math.random() * 0xFFFFF).toString(32)
        ].join('-');
    };

    exports.toCamelCase = function (str) {
        str = str.toLowerCase();
        return str.replace(/-(\w)/g, function (s, t) {
            return t.toUpperCase();
        });
    };

    exports.toLineCase = function (str) {
        str = str.replace(/[a-z]([A-Z]+)/g, function (s, t) {
            return s.replace(t, '-' + t);
        });
        str = str.toLowerCase();
        return str;
    };

    // 注意是不覆盖方式
    exports.mix = function (source) {
        for (var i = 1; i < arguments.length; i++) {
            var destination = arguments[i];
            if (!destination) {
                continue;
            }
            // 这里如果`destination`是字符串的话，会遍历出下标索引来，
            // 认为这是调用者希望的效果，所以不作处理
            for (var key in destination) {
                if (destination.hasOwnProperty(key) 
                    && !source.hasOwnProperty(key)) {
                    source[key] = destination[key];
                }
            }
        }
        return source;
    };
});
