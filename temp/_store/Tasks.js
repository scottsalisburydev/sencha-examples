Ext.define('Demo.store.Tasks', {
    extend: 'Ext.data.Store',
    model: 'Demo.model.Task',
    alias: 'store.tasks',

    autoLoad: true,

    sorters: { 
        property: 'due', 
        direction: 'ASC' 
    },
    groupField: 'project',
    
    proxy: {
        type: 'ajax',
        nosim: true, // ignored by normal Ajax request

        url: 'data/tasks.json',
        reader: {
            type: 'json'
        }
    }
});