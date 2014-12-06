/**
 * @file webComponent import frome linkage
 * 通过外链导入
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
define(function (require, exports) {
    var componentLabel = require('./componentLabel');
    // 通过外部链接导入components
    var linkElements = document.querySelectorAll('link[rel=import][type=component]');
    
    /**
     * 初始化Components
     */
    exports.init = function () {
        // 数组化
        linkElements = [].slice.call(linkElements);
        var components = [];
        linkElements.forEach(function (link) {
            var comps = link.import.querySelectorAll('component');
            comps = [].slice.call(comps);
            components = components.concat(comps);
        });

        // 注册语义化标签
        components.forEach(function (component) {
            return componentLabel.create(component);
        });
    };


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
});
