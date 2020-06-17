Ext.define('Demo.view.advanced.reconfigure.DataSourceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.datasourceview',

    onLoadDataActionClick: function (grid, rowIndex, colIndex, actionCmp, event, record) {
        Log.event(arguments.callee.name, arguments, this);
        this.getView().fireEvent('loaddata', record);
    },

    onGenerateGridActionClick: function (grid, rowIndex, colIndex, actionCmp, event, record) {
        Log.event(arguments.callee.name, arguments, this);
        this.getView().fireEvent('generategrid', record);
    },

    onRemoveDataSource: function (grid, rowIndex, colIndex, actionCmp, event, record) {
        Log.event(arguments.callee.name, arguments, this);
        record.drop();
    },

    addDataSource: function (event, element, header, tool) {
        Log.event(arguments.callee.name, arguments, this);
        var grid = this.getView();
        var rec = grid.getStore().insert(0, {
            name: null,
            url: null,
            root: null
        });
        grid.findPlugin('cellediting').startEdit(rec[0], 0);
    },

    onEdit: function (editor, context) {
        Log.event(arguments.callee.name, arguments, this);
        context.record.save();
    }
});