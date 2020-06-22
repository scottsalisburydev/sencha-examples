Ext.define('Demo.store.Sales', {
    extend: 'Ext.data.Store',
    alias: 'store.sales',
    model: 'Demo.model.Sale',
    
    autoLoad: true,

    proxy: {
        type: 'ajax',
        nosim: true, // ignored by normal Ajax request

        url: 'data/sales.json',
        reader: {
            type: 'json'
        }
    }
});