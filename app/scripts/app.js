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

        requires: ['HTMLPanel'],

        /**
         * The launch method is called when the browser is ready and the application is ready to
         * launch.
         */
        launch: function() {

            require(['startmenu', 'carousel'], function(StartMenu, Carousel) {

                Ext.Viewport.add(StartMenu);
                Ext.Viewport.add(Carousel);

            });
        }
    });


    Ext.define('Ext.LockableCarousel', {
        extend: 'Ext.Carousel',
        id: 'WelcomeCarousel',
        initialize: function () {
           this.onDragOrig = this.onDrag;
           this.onDrag = function (e) { if(!this.locked){this.onDragOrig(e);} }
        },
        locked: false,
        lock: function () { this.locked = true; },
        unlock: function () { this.locked = false; }
    });



});


