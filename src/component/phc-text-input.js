/**
 * @file 文本编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var phc = require('../core/main');
    var widget = require('../widget/main');
    
    exports.template = '<input>';
    exports.extends = 'input';
    
    var proto = widget.mix(exports, 'context', 'dataBind');

    proto.init = function () {
        this.onkeyup = function (e) {
            this.set('name', this.value);
        };
    };

    proto.onContextChange = function (changes) {
        phc.widget.dataBind.onContextChange.call(this, changes);
    };

    proto.setValue = function (value) {
        this.value = value || this.context.name || '';
    };

    phc.register('phc-text-editor', proto);
});
