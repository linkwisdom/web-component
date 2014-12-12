/**
 * @file webComponent 标签创建
 * - todo 兼容大部分浏览器无registerElement
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 
define(function (require, exports, module) {
    var util = require('../core/util');
    var context = require('./context');

    var etpl = require('etpl');

    // 为了避免在MVC模板内被编译
    var engine = new etpl.Engine(
        {variableOpen: '{{', variableClose: '}}'}
    );

    var proto = {
        render: function () {
            this.innerHTML = engine.compile(this.template)(this.context);
        },
        initTemplate: function () {
            if (this.templateTarget) {
                this.template = etpl.get(this.templateTarget)
                    || engine.get(this.templateTarget);
            } else if (!this.template) {
                this.template = this.innerHTML;
            }
            this.render();
        }
//         onContextChange: function (changes) {
//             var tag = this;

//             // 如果定义changeType未render
//             if (this.getAttribute('changeType') == 'render') {
//                 return this.render();
//             }
//         }
    };
    
    module.exports = util.mix(proto, context);
});