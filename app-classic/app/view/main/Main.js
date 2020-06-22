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
        title: 'Demos',
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
            selection: '{currentDemo}',
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
    
    items: [
        {
            xtype: 'container',
            padding: 20, //'0 20px 20px 20px',
            flex: 1,
            minWidth: 500,
            layout: {
                type: 'vbox',
                pack: 'stretch',
                align: 'stretch'
            },
            style: {
                backgroundColor: '#eee'
            },
            items: [
                {
                    dock: 'top',
                    xtype: 'panel',
                    bodyPadding: '0px 10px 5px 10px',
                    margin: '0px 0px 20px 0px',
                    flex: 0,
                    bind: {
                        html: '<h2 style="color: #043f59; font-weight: 400;">{currentDemo.title}</h2><p>{currentDemo.description}</p>'
                    }
                },
                {
                    xtype: 'panel',
                    itemId: 'classicDemo',
                    frame: true,
                    layout: 'fit',
                    flex: 4,
                    items: [
                        //
                        // demo gets added here when a selection is made. 
                        //
                    ]
                }
            ]
        },
        {
            xtype: 'tabpanel',
            itemId: 'demoSource',
            resizable: true,
            collapsible: true,

            responsiveConfig: {
                tall: {
                    height: '50%',
                    collapseDirection: 'bottom',
                },
                wide: {
                    width: '50%',
                    collapseDirection: 'right',
                }
            },

            frame: true,
            titleRotation: 0,
            tabRotation: 0,
            tabBarHeaderPosition: 1,
            tabPosition: 'top',

            tools: [{
                tooltip: 'Copy to Clipboard',
                iconCls: 'x-fa fa-clipboard',
                handler: 'copyToClipboard'
            }],

            title: {
                text: 'Source',
                flex: 0,
                padding: '0 10px'
            },

            iconCls: 'x-fa fa-code',

            tabBar: {
                flex: 3,
                layout: {
                    align: 'stretch',
                    pack: 'stretch',
                    wrap: 'wrap',
                    overflowHandler: 'menu'
                }
            },
            
            defaults: {
                tabConfig: {
                    flex: 0
                }
            },

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
