/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Demo.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    init: function () {
    
        window.addEventListener('copy', this.onClipboardEvent.bind(this));
        window.addEventListener('paste', this.onClipboardEvent.bind(this));
    },
    
    afterRender: function () {

        var vm = this.getViewModel();
        var store = vm.getStore('nav');
        
        store.setData(this.getFileInfo());
    },

    /**
     * When the data in currentDemo changes call currentSelectionChange
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-bindings
     */
    bindings: {
        currentSelectionChange: '{currentDemo}'
    },

    currentSelectionChange: function (record) {
        
        /**
         * Don't proceed if the record is empty. This is 
         * for initial load most times.
         */
        if (Ext.Object.isEmpty(record)) {
            return;
        }

        var demoContainer = this.getView().down('#classicDemo')
        var demoSource = this.getView().down('#demoSource')
        var demo;

        /**
         * values extracted from the record
         */
        var {
            className, 
            requires, 
            slug
        } = record.getData();
        
        /**
         * Create a new class instance
         */
        demo = Ext.create(className, {
            padding: 0,
            bodyPadding: 0,
            margin: 0,
            frame: false
        });
        
        /**
         * Remove all items from the component but don't destroy as it has a chain reaction for 
         * required classes I think.
         */
        demoContainer.removeAll(false, false)

        /**
         * Add the demo class instance to the panel.
         */
        demoContainer.add(demo)
        
        /**
         * Clear and add the source code tabs to the tabpanel.
         */
        demoSource.removeAll(true)
        
        /**
         * Create a new array of the requires AND the 
         * current view + a data.json file that may or 
         * may not exist in the view package directory.
         */
        var files = requires;

        files.forEach(path => {

            /**
             * If the file path doesn't start with app/ then we want to skip it
             * since it is most likely a framework class and not relevant for 
             * the reader.
             */
            if (!path.startsWith('app/')) return;

            /**
             * For each file in the files array add a new `code`
             * component for displaying the source code.
             */
            demoSource.add(Ext.create({
                xtype: 'code',
                url: path,
                title: path.split('/').pop(),
                language: path.substr(path.lastIndexOf('.') + 1)
            }))
        });
        demoSource.setActiveTab(0);
        
        this.updateNavigationScrollPosition();
        
        this.updateHash(slug);
    },

    routes: {
        '/:slug': 'onRoute'
    },

    onRoute: function (slug) {

        this.slug = slug;

        var grid    = this.getView().down('#navigation');
        var vm      = this.getViewModel();
        var store   = vm.getStore('nav').query('slug', slug);
        var record  = store.first();
        
        if (store.getCount()) {
            grid.setSelection(record);
        } else {
            console.log('demo not found for slug:', slug)
        }
    },
    
    prevDemo: function () {

        var grid = this.getView().down('#navigation');
        var selModel = grid.getSelectionModel();
        var prev = selModel.selectPrevious();
        
        if (!prev) {
            var record = grid.store.last();
            grid.setSelection(record);
        }
    },

    nextDemo: function () {

        var grid = this.getView().down('#navigation');
        var selModel = grid.getSelectionModel();
        var next = selModel.selectNext();

        // if there isn't a next then select the first.
        if (!next) {
            var record = grid.store.first();
            grid.setSelection(record);
        }
    },

    updateHash: function (slug) {
        window.location.hash = '#/' + slug;
    },

    updateNavigationScrollPosition: function () {

        var grid = this.getView().down('#navigation');
        var gridView = grid.getView();
        var selModel = grid.getSelectionModel();

        gridView.getNode(selModel.getCurrentPosition().rowIdx).scrollIntoView();
    },

    copyToClipboard: function () {

        var tabpanel = this.getView().down('#demoSource');
        var activeTab = tabpanel.getActiveTab();
        if (!activeTab) {
            return console.log('No active tab to copy from.')
        }
        var node = activeTab.getEl().dom.querySelector('pre code');
        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);

        document.execCommand("copy");
    },

    onClipboardEvent: function (e) {
        var message = '';
        switch (e.type) {
            case 'copy':
                message = 'Copied to Clipboard';
                break;
            case 'paste':
                message = 'Paste from Clipboard';
                break;
        }
        Ext.toast(message);
    },

    filterNavigation: function (field, newValue, oldValue) {

        var store = this.getViewModel().getStore('nav');

        store.filter({
            disableOnEmpty: true,
            property: 'searchable',
            operator: 'like',
            value: newValue
        });
    },

    /**
     * !!!!!!!!!!!!!!!!!!!! :WARNING: !!!!!!!!!!!!!!!!!!!!
     * This won't really work when building for testing or production 
     * since all files get concatenated and/or minified.
     */
    getFileInfo: function () {
        console.time('build-nav')

        var files = Object.keys(Ext.ClassManager.classes)
            .filter(className => (new RegExp('Demo.view.').test(className) && !new RegExp('(_|Controller|Model|Store|Main|Raw|Code)').test(className)))
            .map((className, index) => {
                var clazz     = Ext.ClassManager.get(className);
                var aliases   = Ext.ClassManager.getAliasesByName(className);
                var config    = clazz && clazz.prototype ? clazz.prototype.config : null;
                
                var title     = config.title || '';
                // where do these come from? The Panel prototype was 
                // modified to add two extra properties.
                var category  = clazz.prototype.category != '' ? clazz.prototype.category : 'Misc.';
                var desc      = clazz.prototype.description != '' ? clazz.prototype.description : title;

                var xtype     = aliases && aliases.length ? aliases[0].replace('widget.', '') : 'no-xtype';
                var slug      = title.toLowerCase().replace(/ +/g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '');
                var iconCls   = config.iconCls || 'x-fa fa-table';
                var filePath  = Ext.Loader.getPath(className);
                var pathParts = filePath.split('/');
                var file      = pathParts.pop();
                var folder    = pathParts.join('/');
                var extension = file.substr(file.lastIndexOf('.') + 1);
                var requires  = [
                    filePath,
                    ...Ext.Loader.requiresMap[className].map(cls => Ext.Loader.getPath(cls)),
                    folder + '/readme.md',
                    folder + '/data.json',
                ];
                
                var record = {
                    id: index,
                    title: title,
                    slug: slug,
                    iconCls: iconCls,
                    className: className,
                    xtype: xtype,
                    path: filePath,
                    folder: folder,
                    file: file,
                    extension: extension,
                    category: category,
                    description: desc,
                    requires: requires,
                    searchable: filePath.split('/').join(' ') + ' ' + title
                };
                
                return record;
            });

        console.timeEnd('build-nav');
        return files;
    },

});
