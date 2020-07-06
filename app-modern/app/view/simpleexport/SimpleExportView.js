/**
 * https://docs.sencha.com/extjs/7.2.0/modern/Ext.grid.Grid.html
 */
Ext.define('Demo.view.simpleexport.SimpleExportView', {
    extend: 'Ext.grid.Grid',

    requires: [
        'Demo.view.simpleexport.SimpleExportViewController',
        'Demo.view.simpleexport.SimpleExportViewModel',
        'Demo.view.simpleexport.SimpleExportStoreModel',
    ],

    xtype: 'simple-export',
    controller: 'simpleexport',
    viewModel: {
        type: 'simple-export-viewmodel'
    },

    category: 'Rendering and Scrolling',
    title: 'Export Grid Data',
    description: 'Export grid content to your local file system.',
    iconCls: 'x-fa fa-file-export',

    columnLines: true,

    plugins: {
        /**
         * https://docs.sencha.com/extjs/7.2.0/modern/Ext.grid.plugin.Exporter.html
         */
        gridexporter: true
    },

    bind: {
        store: '{companies}'
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/modern/Ext.grid.Grid.html#cfg-columns
     */
    columns: [{
        text: 'Company',
        flex: 1,
        minWidth: 100,
        dataIndex: 'name'
    }, {
        text: 'Price',
        width: 75,
        dataIndex: 'price',
        formatter: 'usMoney'
    }, {
        text: 'Change',
        width: 90,
        dataIndex: 'change',
        renderer: 'renderChange',
        cell: {
            encodeHtml: false
        }
    }, {
        text: '% Change',
        width: 100,
        dataIndex: 'pctChange',
        renderer: 'renderPercent',
        cell: {
            encodeHtml: false
        }
    }, {
        text: 'Description',
        flex: 1,
        minWidth: 100,
        dataIndex: 'desc'
    }],
    signTpl: '<span style="' +
        'color:{value:sign("red", "green")}"' +
        '>{text}</span>',

    items: [{
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            text: 'Export to...',
            docked: 'right',
            arrowAlign: 'right',
            menu: {
                defaults: {
                    handler: 'exportTo'
                },
                items: [{
                    text: 'Excel xlsx',
                    cfg: {
                        type: 'excel07',
                        ext: 'xlsx'
                    }
                }, {
                    text: 'Excel xml',
                    cfg: {
                        type: 'excel03',
                        ext: 'xml'
                    }
                }, {
                    text: 'CSV',
                    cfg: {
                        type: 'csv'
                    }
                }, {
                    text: 'TSV',
                    cfg: {
                        type: 'tsv',
                        ext: 'csv'
                    }
                }, {
                    text: 'HTML',
                    cfg: {
                        type: 'html'
                    }
                }]
            }
        }]
    }]
});
