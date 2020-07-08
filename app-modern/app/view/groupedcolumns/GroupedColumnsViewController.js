/**
 * https://docs.sencha.com/extjs/7.2.0/modern/Ext.app.ViewController.html
 */
Ext.define('Demo.view.groupedcolumns.GroupedColumnsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.groupedcolumns',

    renderChange: function (value) {
        return this.renderSign(value, '0.00');
    },

    renderPercent: function (value) {
        return this.renderSign(value, '0.00%');
    },

    renderSign: function (value, format) {
        var text = Ext.util.Format.number(value, format),
            tpl = this.signTpl;

        if (Math.abs(value) > 0.1) {
            if (!tpl) {
                this.signTpl = tpl = this.getView().lookupTpl('signTpl');
            }

            text = tpl.apply({
                text: text,
                value: value
            });
        }

        return text;
    }
});
