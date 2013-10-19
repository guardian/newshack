define(['gu-toolbar'], function(GuToolbar) {

    //'http://content.guardianapis.com/search?q=gallery&tag=type%2Fgallery&show-media=all&page-size=1&api-key=xufdus8ntynnw7un95xqy5bq',

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