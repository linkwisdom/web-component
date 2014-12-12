/**
 * @file 超级编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var etpl = require('etpl');
    require('etpl/tpl!./template.html');
    
    var content = etpl.render('main-content');
    $('#main').html(content);
    window.phc = require('phc');
    return exports;
});
