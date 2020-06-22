Ext.define('Common.ux.DemoPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'demo-panel',

    frame: true,

    defaults: {
        margin: 20,
        frame: true,    
        defaults: {
            margin: 20,
            frame: true
        }
    },

    initComponent: function () {
        var me = this;
        var items = [];

        if (me.info) items.push(this);
        if (me.demo) items.push(this);

        Ext.apply(me, {
            items: []
        });
        me.callParent(arguments);
    }
});