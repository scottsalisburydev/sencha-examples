Ext.define('Demo.view.rowsummary.RowSummaryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.summary-summarygrid',
    
    groupClick: function () {
        Log.event(arguments.callee.name, arguments, this);
    },

    groupCollapse: function () {
        Log.event(arguments.callee.name, arguments, this);
    },

    groupContextmenu: function () {
        Log.event(arguments.callee.name, arguments, this);
    },

    groupDblclick: function () {
        Log.event(arguments.callee.name, arguments, this);
    },

    groupExpand: function () {
        Log.event(arguments.callee.name, arguments, this);
    },

    toggleSummaryRow: function(btn) {
        Log.event(arguments.callee.name, arguments, this);
        
        btn.up('grid').getView().getFeature('group').toggleSummaryRow();
    }
});
