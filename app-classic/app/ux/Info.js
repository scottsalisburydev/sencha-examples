Ext.define('Demo.ux.Info', {
    extend: 'Ext.panel.Panel',
    xtype: 'info',

    ui: 'info',
    html: 'Information',
    frame: true,
    
    config: {
        text: undefined
    },

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            hidden: (me.text ? false : true),
            html:
                '<span class="info-icon x-fa fa-info-circle"></span>' +
                '<div class="info-text">' + me.text + '</div>'
        });
        me.callParent(arguments);
    }
})