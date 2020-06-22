Ext.define('Common.ux.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.base-grid',

    title: 'NO TITLE',

    iconCls: 'x-fa fa-cog',

    margin: 20,
    border: true,
    frame: true,
    headerBorders: true,
    gridLines: true,
    columnLines: true,
    
    viewConfig: {
        stripeRows: true
    },
    
    header: {
        tools: [{
            type: 'refresh',
            handler: Ext.emptyFn
        }]
    },

    columns: {
        defaults: {

        },
        items: []
    }
});