/*global define */
define([], function () {
    'use strict';

    Ext.application({

        startupImage: {
            '320x460': 'images/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
            '640x920': 'images/startup/640x920.png', // Retina iPhone and iPod touch
            '640x1096': 'images/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
            '768x1004': 'images/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
            '748x1024': 'images/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
            '1536x2008': 'images/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
            '1496x2048': 'images/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
        },

        isIconPrecomposed: false,
        icon: {
            57: 'images/icons/57x57.png',
            72: 'images/icons/72x72.png',
            114: 'images/icons/114x114.png',
            144: 'images/icons/144x144.png'
        },


        /**
         * The launch method is called when the browser is ready and the application is ready to
         * launch.
         */
        launch: function() {
            //first we define each of the categories we have for each one of the horixontal carousels
            //these images can be found inside resources/photos/{category_name}/*
            var categories = ['Food', 'Animals', 'Cars'],
                itemsCountPerCategory = 3,
                horizontalCarousels = [],
                items, i, j, ln, category;

            //now we loop through each of the categories
            for (i = 0,ln = categories.length; i < ln; i++) {
                items = [];
                category = categories[i];

                for (j = 1; j <= itemsCountPerCategory; j++) {
                    //and push each of the image as an item into the items array
                    //you can see we are using the img xtype which is an image component,
                    //and we just give is a custom cls to style it, and the src
                    //of the image
                    items.push({
                        /*xtype: 'image',
                        cls: 'my-carousel-item-img',
                        //src: 'resources/photos/' + category + '/' + j + '.jpg'
                        html: 'Content here',
                        style: {
                            color: '#fff'
                        }*/
                        xtype: 'carousel',
                        direction: 'vertical',
                        directionLock: true,
                        indicator: true,
                        items: [{
                            xtype: 'panel',
                            //fullscreen: true,
                            layout: 'vbox',
                            items: [{
                                xtype: 'panel',
                                cls: 'panel',
                                height: '100%',
                                style: {
                                    background: '#fff'
                                },
                                html: '<h1>Summary</h1>' +
                                      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non aliquam lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque venenatis neque nunc, ut porttitor felis mollis a. Nulla at purus ut libero rutrum dapibus eget eget velit. Sed sollicitudin elit nec leo lobortis venenatis. Proin a lectus magna. Nam blandit nulla sem, porttitor accumsan lacus porta in. Pellentesque scelerisque ut leo eget condimentum. Nulla congue orci quis aliquet lacinia. Suspendisse luctus est vel dui egestas, eget aliquet lectus mollis.</p>'
                            },{
                                xtype: 'image',
                                src: 'img/photos/' + category + '/1.jpg'
                            },{
                                xtype: 'panel',
                                docked: 'bottom',
                                //flex: 2,
                                //html: 'Left Panel, 1/3rd of total sizexxx',
                                style: 'background-color: #5E99CC; color: #fff;',
                                //top: 0,
                                padding: 0,
                                margin: 0,
                                border: 0,
                                width: '100%'
                            }/*,{
                                xtype: 'map',
                                useCurrentLocation: true,
                                width: 200,
                                height: 200,
                                centered: true
                            }*/]
                        },{
                            xtype: 'image',
                            src: 'img/photos/' + category + '/2.jpg'
                        },{
                            xtype: 'image',
                            src: 'img/photos/' + category + '/3.jpg'
                        }]
                    });
                }

                //now we add the new horizontal carousel for this category
                //horizontalCarousels.push({
            }

                /*setInterval(function() {
                    //hCarousel.next();
                }, 5000);*/
                var hCarousel = new Ext.carousel.Carousel({
                    ui: 'light',
                    direction: 'horizontal',
                    directionLock: true,
                    items: items
                });

                /*audio = new Ext.Audio({
                    url: 'http://download.guardian.co.uk/audio/kip/media/series/mediatalk/1381422536899/4922/gdn.media.131010.leveson.sb.mp3',
                    listeners: {
                        timeupdate: function(e, time) {
                            //console.log(time);
                        }
                    }
                }).play();*/


             Ext.data.JsonP.request({
               url: 'http://content.guardianapis.com/search?q=gallery&tag=type%2Fgallery&show-media=all&page-size=1&api-key=xufdus8ntynnw7un95xqy5bq',
               disableCaching: false,
               success: function(response, opts) {
                  //var obj = Ext.decode(response.responseText);
                  //console.dir(response);
                  var carouselItems = [];
                  response.response.results[0].mediaAssets.forEach(function(item) {
                    //console.log(item.file);
                    carouselItems.push({ xtype: 'image', src: item.file });
                  });

                  console.log(carouselItems);
                  hCarousel.innerItems[0].setItems(carouselItems);
               },
               failure: function(response, opts) {
                  console.log('server-side failure with status code ' + response.status);
               }
            });



            Ext.Viewport.add(hCarousel);
        }
    });
});