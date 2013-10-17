define(['grid-view'], function(GridView) {

    var imagesPath = 'images/stories/us-shutdown/';

    var items = [
        GridView,
        {
            xtype: 'image',
            src: imagesPath + '1.jpg'
        },{
            xtype: 'image',
            src: imagesPath + '2.jpg'
        },{
            xtype: 'image',
            src: imagesPath + '3.jpg'
        },{
            xtype: 'panel',
            cls: 'card',
            html: '<h1>Summary</h1>' +
                  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non aliquam lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque venenatis neque nunc, ut porttitor felis mollis a. Nulla at purus ut libero rutrum dapibus eget eget velit. Sed sollicitudin elit nec leo lobortis venenatis. Proin a lectus magna. Nam blandit nulla sem, porttitor accumsan lacus porta in. Pellentesque scelerisque ut leo eget condimentum. Nulla congue orci quis aliquet lacinia. Suspendisse luctus est vel dui egestas, eget aliquet lectus mollis.</p>'
        },{
            xtype: 'panel',
            cls: 'card',
            html: '<h1>Summary</h1>' +
                  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non aliquam lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque venenatis neque nunc, ut porttitor felis mollis a. Nulla at purus ut libero rutrum dapibus eget eget velit. Sed sollicitudin elit nec leo lobortis venenatis. Proin a lectus magna. Nam blandit nulla sem, porttitor accumsan lacus porta in. Pellentesque scelerisque ut leo eget condimentum. Nulla congue orci quis aliquet lacinia. Suspendisse luctus est vel dui egestas, eget aliquet lectus mollis.</p>'
        },{
            xtype: 'panel',
            cls: 'card',
            html: '<h1>Summary</h1>' +
                  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non aliquam lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque venenatis neque nunc, ut porttitor felis mollis a. Nulla at purus ut libero rutrum dapibus eget eget velit. Sed sollicitudin elit nec leo lobortis venenatis. Proin a lectus magna. Nam blandit nulla sem, porttitor accumsan lacus porta in. Pellentesque scelerisque ut leo eget condimentum. Nulla congue orci quis aliquet lacinia. Suspendisse luctus est vel dui egestas, eget aliquet lectus mollis.</p>'
        }
    ];


    var Carousel = new Ext.carousel.Carousel({
        ui: 'light',
        direction: 'horizontal',
        directionLock: true,
        items: items
    });


    return Carousel;
});