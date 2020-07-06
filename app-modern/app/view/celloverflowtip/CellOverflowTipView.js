/**
 * https://docs.sencha.com/extjs/7.2.0/modern/Ext.grid.Grid.html
 */
Ext.define('Demo.view.celloverflowtip.CellOverflowTipView', {
    extend: 'Ext.grid.Grid',

    requires: [
        'Demo.view.celloverflowtip.CellOverflowTipViewController',
        'Demo.view.celloverflowtip.CellOverflowTipViewModel',
        'Demo.view.celloverflowtip.CellOverflowTipStoreModel',
    ],

    xtype: 'cell-overflow-tip',
    controller: 'celloverflowtip',
    viewModel: {
        type: 'cell-overflow-tip-viewmodel'
    },

    category: 'Row Operations',
    title: 'Overflow Tooltips',
    description:'Hover over a cell to view the full content in a tooltip.',
    iconCls: 'x-fa fa-check',

    columnLines: true,
  
    bind:{
        store:'{companies}'
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
    '>{text}</span>'
});
