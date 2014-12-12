/**
 * @file web 兼容性适配
 * - 兼容link.import问题
 * - todo 兼容大部分浏览器无registerElement
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var xtag = require('x-tag');

    // -------- polyfill link.import ------
    // 通过外部链接导入components
    var linkElements = document.querySelectorAll('link[rel=import][type=component]');
    if (linkElements.length && !linkElements[0].import) {
        var templates = [];
        linkElements = [].slice.call(linkElements);

        // 暂时依赖一下jquery.ajax
        linkElements.forEach(function (link) {
            $.ajax({
                async: false,
                url: link.href,
                success: function (html) {
                    var template = document.createElement('template');
                    template.innerHTML = html;
                    // polyfill IE template
                    template.style.display = 'none';
                    templates.push(template);
                    // polyfill link.import and IE template.content
                    link.import = template.content || template;
                    document.body.appendChild(template);
                }
            });
        });
        linkElements = templates;
    }

    if (!document.registerElement) {
        document.registerElement = function (tagName, option) {
            return document.register(tagName, option);
        };
    }
});