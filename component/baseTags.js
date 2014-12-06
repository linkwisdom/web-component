/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var phc = require('../core/main');
    var widget = require('../widget/main');

    exports.phcContext = phc.register(
        'phcContext',
        widget.mix('context')
    );

    exports.phcTemplateTag = phc.register(
        'phcTemplateTag',
        widget.mix('template', 'context')
    );

    var container = widget.mix(
        {
            template: '<div>模板内容</div>'
        },
        'container',
        'context',
        'template',
        'data'
    );

    exports.phcContainer = phc.register(
        'phcContainer', container
    );
});
