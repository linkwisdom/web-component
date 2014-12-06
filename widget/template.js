/**
 * @file webComponent 标签创建
 * - todo 兼容大部分浏览器无registerElement
 * @author Liandong Liu (liuliandong01@baidu.com)
 */
 
define(function (require, exports, module) {
    var etpl = require('etpl');

    // 为了避免在MVC模板内被编译
    var engine = new etpl.Engine(
        {variableOpen: '{{', variableClose: '}}'}
    );

    module.exports = {
        tagName: 'phc-template-tag',
        render: function () {
            this.innerHTML = engine.compile(this.template)(this.context);
        },
        init: function () {
            if (this.templateTarget) {
                this.template = etpl.get(this.templateTarget)
                    || engine.get(this.templateTarget);
            } else if (!this.template) {
                this.template = this.innerHTML;
            }
            this.render();
        },
        bindData: function (name, value) {
            var ems = this.querySelectorAll('[data-field="'+name+'"]');
            [].slice.call(ems).forEach(function (em) {
                em.textContent = value;
            });
        },
        onContextChange: function (changes) {
            var tag = this;

            // 如果定义changeType未render
            if (this.getAttribute('changeType') == 'render') {
                return this.render();
            }

            // 默认局部刷新
            changes.forEach(function (change) {
                tag.bindData(change.name, tag.context[change.name]);
            });
        }
    };
});