/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Demo.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    data: {
        name: 'ExtJS Grid Examples',
        
        filter: '',

        currentExample: {}
    },

    stores: {
        nav: {
            groupField: 'category',

            // prevent the main view from being included
            // in the navigation grid.
            filters: [{
                property: 'category',
                value: 'main',
                operator: '!='
            }],

            fields: [
                'id',
                'title',
                'slug',
                'iconCls',
                'className',
                'xtype',
                'path',
                'folder',
                'file',
                'extension',
                'category',
                'requires',
                'searchable',
            ],

            data: [],
            
            proxy: {
                type: 'memory',
                reader: 'json'
            }
        },

        files: {

            groupField: 'folder',

            storeId: 'files',

            fields: [
                'file'
            ],

            data: [],

            proxy: {
                type: 'memory',
                reader: 'json'
            }
        }
    }
});
