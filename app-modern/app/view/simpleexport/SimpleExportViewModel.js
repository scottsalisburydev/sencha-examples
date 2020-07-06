/**
 * https://docs.sencha.com/extjs/7.2.0/modern/Ext.app.ViewModel.html
 */
Ext.define('Demo.view.simpleexport.SimpleExportViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.simple-export-viewmodel',
    stores: {
        companies: {
            model: 'Demo.view.simpleexport.SimpleExportStoreModel',
            sorters: {
                property: 'name',
                direction: 'DESC'
            },
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: 'app/view/simpleexport/data.json',
                reader: {
                    type: 'json'
                }
            }
        }
    }
});
