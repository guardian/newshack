define(['config'], function(Config) {

    var storyStore = Ext.create('Ext.data.Store', {
            storeId: 'TopStories',
            fields: ['title', 'thumb', 'id', 'sublink', 'body']
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
                itemTpl: '<img src="{thumb}" class="thumb"> {title} <span class="sublink">{sublink}</span>',
                listeners: {
                    select: function(list, selected) {
                        var selectedId = selected.data.id;

                        if (selectedId === 'us-shutdown') {
                            Ext.getCmp('newsbeat-cards').show();
                            Ext.getCmp('nbnn-container').setActiveItem(0).unlock();
                            Ext.Viewport.animateActiveItem(Ext.getCmp('nbnn-container'), {type: 'slide', direction: 'left'});
                        } else {
                            var articleViewCmp = Ext.getCmp('article-view');
                            console.log(selected.data);
                            articleViewCmp.setData(selected.data);
                            Ext.Viewport.animateActiveItem(articleViewCmp, {type: 'slide', direction: 'left'});
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
       url: 'http://content.guardianapis.com/search?section=world&page-size=10&show-fields=thumbnail,body&api-key=' + Config.apiKey,
       disableCaching: false,
       success: function(response, opts) {
          //console.log(response);

          response.response.results.forEach(function(item) {
             storyStore.add({
                title: item.webTitle,
                thumb: item.fields.thumbnail,
                id: item.id,
                body: item.fields.body
            });
          });

          storyStore.insert(1, {
            title: 'Barack Obama signs bill to end debt crisis after it passes US congress',
            id: 'us-shutdown',
            thumb: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/10/1/1380607422308/9159b1ef-9e2d-4d3b-9943-18396dd47f9a-140x84.jpeg',
            sublink: 'Story: US debt crisis'
          });

       },
       failure: function(response, opts) {
          console.log('server-side failure with status code ' + response.status);
       }
    });

    return storyList;

});