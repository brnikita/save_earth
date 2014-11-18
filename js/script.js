'use strict';
$(function () {
    var Slide,
        currentSlide,
        $window = $(window),
        slidesList;

    /**
     * Constructor of Slide class
     *
     * @constructor
     * @param {jQuery} $slide slide element
     * @param {number} scrollLength Scrolling length of slide
     * @param {function} slideHandler Function handles scroll changing for current slide
     * @returns {undefined}
     */
    Slide = function ($slide, scrollLength, slideHandler) {
        this.$el = $slide;
        this.scrollLength = scrollLength;
        this.slideHandler = slideHandler;
    };

    /**
     * Field contains scrolling length of slide
     *
     * @field
     * @name Slide#scrollLength
     * @type {jQuery | null}
     */
    Slide.prototype.scrollLength = null;

    /**
     * Field contains link to Jquery instance of slide DOM element
     *
     * @field
     * @name Slide#el
     * @type {jQuery | null}
     */
    Slide.prototype.$el = null;

    /**
     * Field contains function, that handles scroll changing for current slide
     *
     * @field
     * @name Slide#slideHandler
     * @type {Function | null}
     */
    Slide.prototype.slideHandler = null;

    /**
     * Method hides current slide
     *
     * @method
     * @name Slide#hide
     * @returns {undefined}
     */
    Slide.prototype.hide = function () {
        this.$el.addClass('hide');
    };

    /**
     * Method shows current slide
     *
     * @method
     * @name Slide#show
     * @returns {undefined}
     */
    Slide.prototype.show = function () {
        this.$el.removeClass('hide');
    };

    /**
     *
     * List of slides (instances of Slide class)
     *
     * @type {Array}
     */
    slidesList = [
        new Slide(
            $('.js-slide-1'),
            600,
            /**
             * Handler of first slide scrolling
             *
             * @function
             * @name firstSlideHandler
             * @param {number} scrollPosition Scroll position in percents for first slide
             * @returns {undefined}
             */
                function firstSlideHandler(scrollPosition) {
                var $oilTap = $('.js-oil-tap', this.$el),
                    opacityScore = scrollPosition / 100;

                if (scrollPosition > 50) {
                    opacityScore += 0.2;
                }

                $oilTap.css('opacity', opacityScore);
            }),

        new Slide(
            $('.js-slide-2'),
            600,
            /**
             * Handler of first slide scrolling
             *
             * @function
             * @name firstSlideHandler
             * @param {number} scrollPosition Scroll position in percents for first slide
             * @returns {undefined}
             */
                function firstSlideHandler(scrollPosition) {
                var $oilTap = $('.js-oil-tap', this.$el),
                    $gusBurn = $('.js-gus-burn', this.$el),
                    opacityScore = scrollPosition / 100;

                if (scrollPosition > 50) {
                    opacityScore += 0.2;
                }

                $oilTap.css('opacity', 1 - opacityScore);
                $gusBurn.css('opacity', opacityScore);
            }),

        new Slide(
            $('.js-slide-3'),
            600,
            /**
             * Handler of first slide scrolling
             *
             * @function
             * @name firstSlideHandler
             * @param {number} scrollPosition Scroll position in percents for first slide
             * @returns {undefined}
             */
                function firstSlideHandler(scrollPosition) {
                var $gusBurn = $('.js-gus-burn', this.$el),
                    opacityScore = scrollPosition / 100;

                if (scrollPosition > 50) {
                    opacityScore += 0.3;
                }

                $gusBurn.css('opacity', 1 - opacityScore);
            })
    ];

    /**
     * Function returns slide from slidesList and
     * start scrolling position of slide by current scrolling position
     *
     * @function
     * @name getSlideByScrollingPosition
     * @param {number} scrollingPosition
     * @returns {Object}
     */
    function getSlideByScrollingPosition(scrollingPosition) {
        var scrollingSum = 0,
            newScrollingSum = 0,
            slide,
            i = 0;

        for (; i < slidesList.length; i++) {
            slide = slidesList[i];
            newScrollingSum += slide.scrollLength;
            console.log(newScrollingSum, scrollingPosition);
            if (newScrollingSum >= scrollingPosition) {
                return {
                    startScrollPosition: scrollingSum,
                    slide: slide
                };
            }
            scrollingSum = newScrollingSum;
        }
    }

    /**
     * Function sets full height for slides wrapper
     *
     * @function
     * @name setFullHeightBySlides
     * @returns {undefined}
     */
    function setFullHeightBySlides() {
        var $slides = $('.js-slides'),
            lastSlide,
            fullHeight = 0;

        $.each(slidesList, function (index, slide) {
            fullHeight += slide.scrollLength;
            lastSlide = slide;
        });

        fullHeight += lastSlide.scrollLength;
        $slides.height(fullHeight);
    }

    /**
     * Function handles scroll changing
     *
     * @function
     * @name scrollHandler
     * @returns {undefined}
     */
    function scrollHandler() {
        var scrollTop = $window.scrollTop(),
            nextSlideData = getSlideByScrollingPosition(scrollTop),
            nextSlide = nextSlideData.slide,
            scrollPosition = scrollTop - nextSlideData.startScrollPosition,
            scrollPositionPercents = 100 * scrollPosition / nextSlide.scrollLength;

        nextSlide.slideHandler(scrollPositionPercents);

        if (currentSlide !== nextSlide) {
            if (currentSlide instanceof Slide) {
                currentSlide.hide();
            }
            currentSlide = nextSlide;
            currentSlide.show();
        }
    }

    /**
     * Function adds listeners
     *
     * @function
     * @name addListeners
     * @returns {undefined}
     */
    function addListeners() {
        $window.on('scroll', scrollHandler);
    }

    setFullHeightBySlides();
    addListeners();
    scrollHandler();
});
