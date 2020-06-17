Ext.define('Demo.view.export.ExportStore', {
    extend: 'Ext.data.Store',
    alias: 'store.exportstore' ,

    model: 'Demo.view.export.ExportStoreModel',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: 'app/view/export/data.json',
        reader: {
            type: 'json'
        }
    }
});
