Ext.define('Demo.view.reconfigure.ReconfigureViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.advanced-reconfigure',

    data: {
        description: 'This example allows you to reconfigure the grid based on a ' + 
        'endpoint of your choice. There are some pre populated to try out. ' + 
        'Select a row from the data source to view how the data is interpreted ' + 
        'and choose a root property for the store\'s proxy reader.',

        rawData: null,

        sampleData: {},

        fieldsData: [],

        selection: {
            name: 'Choose a Data Souce',
            url: 'http://...',
            root: undefined
        }
    }
});
