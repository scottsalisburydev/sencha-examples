/**
 * https://docs.sencha.com/extjs/7.2.0/modern/Ext.app.ViewModel.html
 */
Ext.define('Demo.view.celloverflowtip.CellOverflowTipViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.cell-overflow-tip-viewmodel',
    stores:{
        companies:{
            model: 'Demo.view.celloverflowtip.CellOverflowTipStoreModel', 
            sorters: {
                property: 'name',
                direction: 'DESC'
            },
            autoLoad: true,
            
            proxy: {
                type: 'ajax',
                url: 'app/view/celloverflowtip/data.json',
                reader: {
                    type: 'json'
                }
            }
        }
    }
});
