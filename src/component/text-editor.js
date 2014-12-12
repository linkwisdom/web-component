/**
 * @file 文本编辑器
 * @author Liandong Liu (liuliandong01@baidu.com)
 */

define(function (require, exports) {
    var phc = require('../core/main');
    var widget = require('../widget/main');
    
    exports.template = '<input>';
    var proto = widget.mix(exports, 'context', 'template', 'dataBind');

    proto.init = function () {
        var container = this;
        this.inputBox = this.querySelector('input');
        this.inputBox.onkeyup = function (e) {
            container.set('name', this.value);
        }
    };

    proto.onContextChange = function (changes) {
        //phc.widget.template.onContextChange.call(this, changes);
        phc.widget.dataBind.onContextChange.call(this, changes);
    };

    proto.setValue = function (value) {
        this.inputBox.value = value || this.context.name || '';
    };

    phc.register('phc-text-editor', proto);
});
