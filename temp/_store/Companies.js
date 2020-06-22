Ext.define('Demo.store.Companies', {
    extend: 'Ext.data.Store',
    alias: 'store.companies',
    storeId: 'companies',

    model: 'Demo.model.Company',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: 'data/companies.json',
        reader: {
            type: 'json'
        }
    }
});
