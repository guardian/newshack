define([], function() {

    var imagesPath = 'images/stories/us-shutdown/',
        gridHtml = '<ul class="grid">';

    // Build image grid
    for (var i=1; i<=26; i++) {
        var imgSrc = imagesPath + '1.jpg';
        gridHtml += '<li class="grid__item"><img class="grid__img" src="'+imgSrc+'"></li>';
    }

    gridHtml += '</ul>';


    var Grid = new Ext.Panel({
        cls: 'grid-container',
        html: gridHtml
    });


    return Grid;
});