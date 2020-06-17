Ext.define('Demo.view.spreadsheetcheckbox.SpreadSheetCheckboxStore', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetcheckboxstore',
    model: 'Demo.view.spreadsheetcheckbox.SpreadSheetCheckboxStoreModel',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: 'app/view/spreadsheetcheckbox/data.json',
        reader: {
            type: 'json'
        }
    }
});
