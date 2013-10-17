define([], function() {

    var imagesPath = 'images/stories/us-shutdown/',
        gridHtml = '<ul class="grid">';

    // Build image grid
    for (var i=1; i<=10; i++) {
        var imgSrc = imagesPath + i + '.jpg';
        gridHtml += '<li class="grid__item"><img class="grid__img" src="'+imgSrc+'"></li>';
    }

    gridHtml += '</ul>';


    var Grid = new Ext.Panel({
        cls: 'grid-container',
        html: gridHtml,
        items: [{
            xtype: 'button',
            text: 'Play',
            html: '<img src="images/media-play.png" width="80" />',
            top: '40%',
            left: '40%',
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