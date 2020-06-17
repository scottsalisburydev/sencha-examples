Ext.define('Demo.view.speadsheetlocking.SpreadsheetLockingStore', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetlockingstore' ,

    model: 'Demo.view.speadsheetlocking.SpreadsheetLockingStoreModel',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: 'app/view/speadsheetlocking/data.json',
        reader: {
            type: 'json'
        }
    }
});
