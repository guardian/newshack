define(['gu-toolbar'], function(GuToolbar) {


    return Ext.Panel({
        layout: 'fit',
        id: 'newsnight-cards-2',
        items: [
            GuToolbar,
            Ext.create('HTMLPanel', {
                // this is now `scrollable`, not `scroll`
                //scroll: 'vertical',
                scrollable: 'vertical',
                url: 'latest.html'
            })
        ],
        listeners: {
            activate: function() {
                startModules();
            }
        }

    });
});