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
        'Common.ux.Code',
        'Demo.view.main.MainController',
        'Demo.view.main.MainModel'
    ],

    xtype: 'app-main',
    controller: 'main',
    viewModel: 'main',

    category: 'Meta',
    description: 'The Main view that is used to organize and display the Demos',

    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        itemId: 'mainToolbar',
        items: [{
            text: 'Prev Demo',
            iconCls: 'x-fa fa-arrow-left',
            iconAlign: 'left',
            itemId: 'prevDemo',
            handler: 'prevDemo'
        }, {
            xtype: 'tbfill',
        }, {
            xtype: 'tbtext',
            html: '<h1>ExtJS Classic Grid Demos</h1>'
        }, {
            xtype: 'tbfill',
        }, {
            text: 'Next Demo',
            iconCls: 'x-fa fa-arrow-right',
            iconAlign: 'right',
            itemId: 'nextDemo',
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
            id: 'navGrouping',
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: '{name:uppercase}',
            startCollapsed: true
            // depthToIndent: 40,
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
                width: 60,
                align: 'right',

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
            padding: 20,
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
                    itemId: 'demoDescription',
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
                        {
                            xtype: 'code',
                            title: 'Notes',
                            url: 'readme.md'
                        }
                    ]
                }
            ]
        },
        
        /**
         * The Source Code Panel is not a docked item since it is rearraynged 
         * depending on viewport width.
         */
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

            tools: [
                {
                    tooltip: 'Copy to Clipboard',
                    iconCls: 'x-fa fa-clipboard',
                    handler: 'copyToClipboard'
                }
            ],

            title: {
                flex: 0,
            },

            iconCls: 'x-fa fa-code',

            tabBar: {
                flex: 3,
                layout: {
                    align: 'stretch',
                    pack: 'stretch',
                    wrap: 'wrap',
                    overflowHandler: null
                }
            },
            
            defaults: {
                tabConfig: {
                    flex: 0
                }
            },

            /**
             * Setting some defaults for anyone curious 
             * how the main view is configured.
             */
            items: [
                // {
                //     xtype: 'code',
                //     title: 'Main',
                //     url: 'app/view/main/Main.js'
                // },
                // {
                //     xtype: 'code',
                //     title: 'ViewController',
                //     url: 'app/view/main/MainController.js'
                // },
                // {
                //     xtype: 'code',
                //     title: 'ViewModel',
                //     url: 'app/view/main/MainModel.js'
                // },
                // {
                //     xtype: 'code',
                //     title: 'Code',
                //     url: '../packages/local/common/src/Common/ux/Code.js'
                // },
                // {
                //     xtype: 'code',
                //     title: 'Application.scss',
                //     url: 'app/Application.scss'
                // }
            ]
        }
    ]
});
