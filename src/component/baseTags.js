/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var phc = require('../core/main');
    var widget = require('../widget/main');

    exports.phcContext = phc.register(
        'phcContext',
        widget.context
    );

    exports.phcDataBind = phc.register(
        'phcDataBind',
        widget.mix('dataBind', 'context')
    );

    exports.phcTemplateTag = phc.register(
        'phcTemplate',
        widget.template
    );

    var container = widget.mix(
        {
            template: '<div>container</div>'
        },
        'container',
        'template'
    );

    exports.phcContainer = phc.register(
        'phcContainer', container
    );

    exports.phcModule = phc.register(
        'phcModule',
        widget.module
    );
});
