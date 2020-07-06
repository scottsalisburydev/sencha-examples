/**
 * https://docs.sencha.com/extjs/7.2.0/modern/Ext.app.ViewModel.html
 */
Ext.define('Demo.view.columngroup.ColumnGroupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.column-group-viewmodel',
    stores:{
        companies:{
            model: 'Demo.view.columngroup.ColumnGroupStoreModel', 
            sorters: {
                property: 'name',
                direction: 'DESC'
            },
            autoLoad: true,
            
            proxy: {
                type: 'ajax',
                url: 'app/view/columngroup/data.json',
                reader: {
                    type: 'json'
                }
            }
        }
    }
});
