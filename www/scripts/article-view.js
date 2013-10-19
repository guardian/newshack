define(['gu-toolbar'], function(GuToolbar) {

    return Ext.Panel({
        layout: 'fit',
        id: 'article-view',
        items: [
            GuToolbar,
            {
                id: 'article-view-body',
                xtype: 'panel',
                scrollable: 'vertical',
                tpl: '<h1>{title}</h1><article class="article">{body}</article>'
            }
        ],
        listeners: {
            activate: function(self) {
                var data = self.getData();
                Ext.getCmp('article-view-body').setData(data);
            }
        }
    });
});