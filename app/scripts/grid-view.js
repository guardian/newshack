define(['gu-toolbar'], function(GuToolbar) {

    var imagesPath = 'images/stories/us-shutdown/',
        gridHtml = '<ul class="grid">';

    // Build image grid
    for (var i=1; i<=12; i++) {
        var imgSrc = imagesPath + i + '.jpg';
        gridHtml += '<li class="grid__item"><img class="grid__img" src="'+imgSrc+'"></li>';
    }

    gridHtml += '</ul>';


    var Grid = new Ext.Panel({
        cls: 'grid-container',
        html: gridHtml,
        items: [
            //GuToolbar,
            {
                xtype: 'label',
                html: '<h1>Story: US debt crisis</h1>',
                centered: true,
                top: 50,
                width: '100%',
                cls: 'story-title'
            },
            {
                xtype: 'button',
                text: '',
                //html: '<img src="images/media-play.png" width="80" />',
                cls: 'play-button',
                centered: true,
                width: 100,
                height: 100,
                listeners: {
                    tap: function() {
                        // Kick off slideshow
                        Ext.getCmp('audio-player').play();
                    }
                }
        }]
    });


    return Grid;
});