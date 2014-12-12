/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports, module) {
    var phc = module.exports = require('./core/main');
    phc.widget = require('./widget/main');
    phc.component = require('./component/main');
    window.phc = phc;
});
