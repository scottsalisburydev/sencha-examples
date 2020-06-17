Ext.define('Demo.store.Products', {
    extend: 'Ext.data.Store',
    alias: 'store.products',
    // storedId: 'products',
    model: 'Demo.model.Product',

    proxy: {
        type: 'ajax',
        url: 'data/products.json',
        reader: {
            type: 'json',
            rootProperty: 'data',
            idProperty: 'id',
            totalProperty: 'total'
        }
    },
    remoteSort: false,
    sorters: [{
        property: 'company',
        direction: 'ASC'
    }],
    pageSize: 50
});