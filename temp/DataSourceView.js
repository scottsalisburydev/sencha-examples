Ext.define('Demo.view.advanced.reconfigure.DataSourceView', {
    extend: 'Ext.grid.Panel',
    
    requires: [
        'Demo.view.advanced.reconfigure.DataSourceViewModel',
        'Demo.view.advanced.reconfigure.DataSourceViewController'
    ],
    
    xtype: 'datasourceview',
    viewModel: 'datasourceview',
    controller: 'datasourceview',
    
    title: 'Data Sources',
    
    bind: {
        store: '{dataSources}',
        selection: '{selection}'
    },

    tools: [{
        iconCls: 'x-fa fa-plus',
        handler: 'addDataSource'
    }],

    selModel: 'rowmodel',

    plugins: {
        cellediting: {
            clicksToEdit: 2,
            autoUpdate: true,
            listeners: {
                edit: 'onEdit'
            }
        }
    },

    columns: [
        { dataIndex: 'name', text: 'Name', editor: 'textfield', flex: 1 },
        { dataIndex: 'url', text: 'URL', editor: 'textfield', flex: 3 },
        { dataIndex: 'root', text: 'Root', editor: 'textfield', flex: 1 },
        {
            xtype: 'actioncolumn',
            align: 'center',
            width: 40,
            sortable: false,
            menuDisabled: true,
            items: [{
                xtype: 'button',
                itemId: 'reloadAction',
                iconCls: 'x-fa fa-sync-alt',
                tooltip: 'Test Load',
                handler: 'onLoadDataActionClick'
            }]
        }, {
            xtype: 'actioncolumn',
            align: 'center',
            width: 40,
            sortable: false,
            menuDisabled: true,
            items: [{
                xtype: 'button',
                itemId: 'generateGridAction',
                iconCls: 'x-fa fa-wrench',
                tooltip: 'Generate Grid',
                handler: 'onGenerateGridActionClick',
            }]
        },
        {
            xtype: 'actioncolumn',
            align: 'center',
            width: 40,
            sortable: false,
            menuDisabled: true,
            items: [{
                iconCls: 'x-fa fa-minus',
                tooltip: 'Delete Data Source',
                handler: 'onRemoveDataSource'
            }]
        }
    ]
}); 