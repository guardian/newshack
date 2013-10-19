define([], function() {

    return Ext.Toolbar({
                docked: 'top',
                xtype: 'titlebar',
                //title: 'discover local',
                height: 20,
                cls: 'toolbar',
                items: [{
                    cls: 'gu-logo-button',
                    width: 180,
                    html: '<img src="images/guardian-logo.png" class="guardian-logo" width="140" />',
                    handler: function(){
                        // Back to main menu
                        var startMenu = Ext.getCmp('start-menu');
                        Ext.Viewport.animateActiveItem(startMenu, {type: 'slide', direction: 'right'});
                    }
                }]
            })


})