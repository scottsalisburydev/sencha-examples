Ext.define('Demo.ux.source.SourceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sourceviewmodel',

    data: {
        
    },

    stores: {
        files: {
            
            groupField: 'folder',

            storeId: 'files',

            fields: [
                'id',
                'title',
                'iconCls',
                'className',
                'xtype',
                'path',
                'folder',
                'file',
                'extension',
                'category',
                'requires',
                'includeInNav',
                'searchable',
            ],

            data: [],

            proxy: {
                type: 'memory',
                reader: 'json'
            }
        }
    }
});