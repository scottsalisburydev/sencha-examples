/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.clipboard.ClipboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clipboard-clipboardgrid',
    
    init: function () {
        window.addEventListener('copy', this.onClipboardEvent.bind(this));
        window.addEventListener('paste', this.onClipboardEvent.bind(this));
        window.addEventListener('cut', this.onClipboardEvent.bind(this));
    },
    
    onClipboardEvent: function(e) {
        Ext.toast(e.type);
    }

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-bindings
     * 
     * bindings: {}
     */

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-control
     * 
     * control: {}
     */

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-id
     * 
     * id: null
     */

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-listen
     * 
     * listen: {}
     */

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-listeners
     * 
     * listeners: {}
     */ 

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-routes
     * 
     * routes: {}
     */
});