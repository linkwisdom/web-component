/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var phc = require('../core/main');
    var widget = require('../widget/main');

    phc.register(
        'phc-module',
        widget.mix('module', 'context')
    );
});
