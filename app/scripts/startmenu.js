define(['config'], function(Config) {

    var storyStore = Ext.create('Ext.data.Store', {
            storeId: 'TopStories',
            fields: ['name', 'thumb', 'id']
        });


    var storyList = new Ext.Panel({
        layout: 'fit',
        items: [{
            xtype: 'list',
            cls: 'start-menu',
            title: 'Blog',
            emptyText: 'No Data Loaded',
            store: 'TopStories',
            itemTpl: '<img src="{thumb}" class="thumb"> {name}',
            listeners: {
                select: function(list, selected) {
                    var selectedId = selected.data.id;

                    if (selectedId === 'us-shutdown') {
                        Ext.Viewport.animateActiveItem(1, {type: 'slide', direction: 'left'});
                    }
                }
            }
        }]
    });


    Ext.data.JsonP.request({
       url: 'http://content.guardianapis.com/search?section=world&page-size=10&show-fields=thumbnail&api-key=' + Config.apiKey,
       disableCaching: false,
       success: function(response, opts) {
          //console.log(response);

          response.response.results.forEach(function(item) {
             storyStore.add({
                name: item.webTitle,
                thumb: item.fields.thumbnail,
                id: item.id
            });
          });

          storyStore.insert(1, {
            name: 'US Shutdown',
            id: 'us-shutdown'
          });

       },
       failure: function(response, opts) {
          console.log('server-side failure with status code ' + response.status);
       }
    });

    return storyList;

});