
Ext.define('Demo.view.property.PropertyView',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Demo.view.property.PropertyViewController',
        'Demo.view.property.PropertyViewModel',
    ],

    xtype: 'property-propertygrid',
    controller: 'property-propertygrid',
    viewModel: {
        type: 'property-propertygrid'
    },

    category: 'Misc.',
    title: 'Property Grid',
    iconCls: 'x-fa fa-table',
    layout: { type: 'vbox', align: 'stretch', pack: 'stretch' },
    defaults: { margin: 10, flex: 1 },
    items: [
        {
            xtype: 'container',
            margin: 0,
            layout: { type: 'hbox', align: 'stretch', pack: 'stretch' },
            defaults: { margin: 20, flex: 1 },
            items: [
                {
                    xtype: 'propertygrid',
                    title: 'Manifest Paths',
                    frame: true,
                    source: Ext.manifest.paths,
                },
                {
                    xtype: 'propertygrid',
                    title: 'Application Classes',
                    frame: true,
                    source: Object.keys(Ext.manifest.classes).filter(cls => !cls.startsWith('Ext.')),
                }
            ]
        }
    ]
});
