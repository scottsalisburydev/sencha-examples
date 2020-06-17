/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.tab.Panel.html
 */
Ext.define('Demo.view.main.Main', {
    extend: 'Ext.panel.Panel',

    requires: [
        /**
         * https://docs.sencha.com/extjs/7.2.0/classic/Ext.plugin.Viewport.html
         */
        'Ext.plugin.Viewport',

        'Demo.view.main.MainController',
        'Demo.view.main.MainModel'
    ],

    xtype: 'app-main',
    controller: 'main',
    viewModel: 'main',

    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [{
            text: 'Prev Demo',
            iconCls: 'x-fa fa-arrow-left',
            iconAlign: 'left',
            handler: 'prevDemo'
        }, {
            xtype: 'tbfill',
        }, {
            xtype: 'tbtext',
            html: 'ExtJS Classic'
        }, {
            xtype: 'tbfill',
        }, {
            text: 'Next Demo',
            iconCls: 'x-fa fa-arrow-right',
            iconAlign: 'right',
            handler: 'nextDemo'
        }]
    }, {
        dock: 'left',
        xtype: 'grid',
        frame: true,
        itemId: 'navigation',

        title: 'Examples',
        width: 300,
        collapsible: true,
        collapseDirection: 'left',

        /**
         * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.selection.Rows.html
         */
        selModel: {
            selType: 'rowmodel',
            mode: 'SINGLE'
        },

        bind: {
            /**
             * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.selection.Selection.html
             */
            selection: '{currentExample}',
            /**
             * Reference to store in viewModel
             */
            store: '{nav}'
        },

        /**
         * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.feature.Grouping.html
         */
        features: [{
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: '{name:uppercase}'
        }],

        /**
         * Top docking a texfield to be used for filtering the navigation list.
         */
        tbar: [{
            flex: 1,
            xtype: 'textfield',
            emptyText: 'Search...',
            listeners: {
                change: 'filterNavigation'
            }
        }],

        columns: [
            /**
             * This column is purely for displaying the icon set in the view. 
             */
            {
                dataIndex: 'iconCls',
                width: 40,
                align: 'center',

                /**
                 * Using a renderer to apply the iconCls value to a dom element.
                 */
                renderer: function (val) {
                    return `<span class="${val}"></span>`;
                }
            },
            {
                dataIndex: 'title',
                flex: 1,

                /**
                 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.util.Format.html#method-uppercase
                 */
                renderer: Ext.util.Format.uppercase
            }
        ]
    }],

    responsiveConfig: {
        tall: {
            layout: {
                type: 'box',
                vertical: true,
                pack: 'stretch',
                align: 'stretch'
            }            
        },
        wide: {
            layout: {
                type: 'box',
                vertical: false,
                pack: 'stretch',
                align: 'stretch'
            }            
        }
    },

    // bodyPadding: 10,
    bodyStyle: {
        backgroundColor: '#eee'
    },
    defaults: {
        
    },
    
    items: [
        {
            xtype: 'panel',
            itemId: 'classicExample',
            flex: 1,
            layout: 'fit',
            frame: true,
            margin: 20,
            items: [
                //
                // example gets added here when a selection is made. 
                //
            ]
        },
        {
            xtype: 'tabpanel',
            itemId: 'exampleSource',
            width: 400,
            resizable: true,
            collapsible: true,
            responsiveConfig: {
                tall: {
                    collapseDirection: 'bottom',        
                },
                wide: {
                    collapseDirection: 'right',
                }
            },
            frame: true,
            titleRotation: 0,
            tabRotation: 0,
            tabBarHeaderPosition: 1,

            header: {
                layout: {
                    align: 'stretchmax'
                },
                title: {
                    text: 'Source',
                    flex: 0
                },
                iconCls: 'x-fa fa-code'
            },

            tabBar: {
                flex: 1,
                layout: {
                    align: 'stretch'
                }
            },

            tbar: [{
                xtype: 'tbfill'
            }, {
                xtype: 'button',
                text: 'Copy to Clipboard',
                ui: 'default',
                iconCls: 'x-fa fa-clipboard',
                handler: 'copyToClipboard'
            }],

            items: [
                {
                    xtype: 'code',
                    title: 'Notes',
                    url: 'readme.md'
                }
            ]
        }
    ]
});
