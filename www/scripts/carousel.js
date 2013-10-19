define(['grid-view', 'gu-toolbar'], function(GridView, GuToolbar) {

    var imagesPath = 'images/stories/us-shutdown/';

    var items = [
        GridView,
        {
            docked: 'top',
            xtype: 'label',
            cls: 'image-type',
            id: 'image-type',
            html: '',
            hidden: true
        },
        {
            docked: 'bottom',
            xtype: 'label',
            cls: 'image-detail',
            id: 'image-detail',
            html: 'View details <span class="arrow">▼</span>',
            hidden: true
        },
        {
            xtype: 'image',
            src: imagesPath + '1.jpg',
            id: 'timestamp-0',
            title: 'Latest Update'
        },{
            xtype: 'image',
            src: imagesPath + '2.jpg',
            id: 'timestamp-8',
            title: 'People'
        },{
            xtype: 'image',
            src: imagesPath + '3.jpg',
            id: 'timestamp-13',
            title: 'People',
        },{
            xtype: 'image',
            src: imagesPath + '4.jpg',
            id: 'timestamp-16',
            title: 'Background'
        },{
            xtype: 'image',
            src: imagesPath + '5.jpg',
            id: 'timestamp-21',
            title: 'Background'
        },{
            xtype: 'image',
            src: imagesPath + '6.jpg',
            id: 'timestamp-24',
            title: 'Background'
        },{
            xtype: 'image',
            src: imagesPath + '7.jpg',
            id: 'timestamp-31',
            title: 'Comment'
        },{
            xtype: 'image',
            src: imagesPath + '8.jpg',
            id: 'timestamp-35',
            title: 'Comment'
        },{
            xtype: 'image',
            src: imagesPath + '9.jpg',
            id: 'timestamp-41',
            title: 'Analysis'
        },{
            xtype: 'image',
            src: imagesPath + '10.jpg',
            id: 'timestamp-44',
            title: 'User Contributions'
        }
    ];


    /* Audio */
    var currentSlide = 0;
    var track = [0, 8, 13, 16, 21, 24, 31, 35, 41, 44];
    var audio = new Ext.Audio({
        id: 'audio-player',
        url: 'audio/us-shutdown.m4a',
        listeners: {
            play: function(e) {
                currentSlide += 1;
                Ext.getCmp('newsbeat-cards').animateActiveItem(currentSlide, {type: 'cover'});
            },

            timeupdate: function(e, time) {
                if (e.isPlaying() && parseInt(time) >= track[0]) {
                    currentSlide += 1;
                    var showSlide = track.shift();
                    //console.log(e, track);
                    var cardToShow = Ext.getCmp('timestamp-' + parseInt(time));
                    if (cardToShow) {
                        Ext.getCmp('image-type').setHtml(cardToShow.config.title).show();
                        Ext.getCmp('image-detail').show();
                        Ext.getCmp('newsbeat-cards').animateActiveItem(cardToShow, {type: 'cover', direction: 'down'});
                    }

                }
            }
        }
    });


    //Ext.getCmp('newsbeat-cards').animateActiveItem(3, {type: 'cover'})

    /*var Carousel = new Ext.carousel.Carousel({
        ui: 'light',
        direction: 'horizontal',
        directionLock: true,
        items: items
    });*/

    NewsbeatCards = new Ext.Panel({
        id: 'newsbeat-cards',
        layout: 'card',
        items: items,
        listeners: {
            tap: function() {
                console.log('stop');
                //audio.pause();
                //Ext.getCmp('newsbeat-cards').animateActiveItem(1, {type: 'cover'})
            }
        }
    });




        var HTMLPanel = Ext.create('HTMLPanel', {
            // this is now `scrollable`, not `scroll`
            //scroll: 'vertical',
            scrollable: 'vertical',

            url: 'latest.html'
        });


    NewsNightCards = new Ext.Panel({
        id: 'newsnight-cards',
        layout: 'card',
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
            activate: function(self) {
                //Carousel.lock();
                Ext.Viewport.setActiveItem(Ext.getCmp('newsnight-cards-2'));

                currentSlide = 0;
                audio.setCurrentTime(0);
                audio.pause();
                Ext.getCmp('newsbeat-cards').setActiveItem(0);

                startModules();
            }
        }
    });


    var Carousel = new Ext.LockableCarousel({
        ui: 'light',
        direction: 'vertical',
        directionLock: true,
        indicator: false,
        id: 'nbnn-container',
        items: [
            NewsbeatCards,
            NewsNightCards
        ]
    });

    return Carousel;
});
