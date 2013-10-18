define(['config'], function(Config) {

    var storyStore = Ext.create('Ext.data.Store', {
            storeId: 'TopStories',
            fields: ['name', 'thumb', 'id']
        });


    var storyList = new Ext.Panel({
        id: 'start-menu',
        layout: 'fit',
        //fullscreen: true,
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                //title: 'discover local',
                html: '<img src="images/guardian-logo.png" class="guardian-logo" />',
                cls: 'toolbar',
                height: 30
            },{
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
                            Ext.getCmp('nbnn-container').setActiveItem(0).unlock();
                            Ext.Viewport.animateActiveItem(1, {type: 'slide', direction: 'left'});
                        }

                        // Clear the selection soon
                        setTimeout(function() {
                            list.deselect(selected);
                        },500);
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
            name: 'Barack Obama signs bill to end debt crisis after it passes US congress',
            id: 'us-shutdown',
            thumb: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/10/1/1380607422308/9159b1ef-9e2d-4d3b-9943-18396dd47f9a-140x84.jpeg'
          });

       },
       failure: function(response, opts) {
          console.log('server-side failure with status code ' + response.status);
       }
    });

    return storyList;

});