'use strict';
$(function () {
    var Slide,
        currentSlide,
        $window = $(window),
        $slides = $('.js-slides'),
        slidesList,
        $coalBurning = $('.js-coal-burning');

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
            $('.js-hand-world'),
            600,
            function (scrollPosition) {
                this.$el.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $('.js-our-beautiful-planet'),
            600,
            function (scrollPosition) {
                this.$el.css('opacity', scrollPosition);
            }),
        new Slide(
            $coalBurning,
            600,
            function (scrollPosition) {
                var $burnCoal = $('.js-burn-coal', this.$el),
                    opacity,
                    topPosition;

                opacity = scrollPosition;
                if (scrollPosition > 0.5) {
                    opacity = scrollPosition + 0.2;
                }

                topPosition = scrollPosition;
                if (scrollPosition > 0.8) {
                    topPosition = 1;
                    opacity = 1;
                }

                topPosition = -900 * (1 - topPosition);
                $burnCoal.css({
                    opacity: opacity,
                    top: topPosition - 164 + 'px'
                });
            }),
        new Slide(
            $coalBurning,
            300,
            function (scrollPosition) {
                var $burnCoal = $('.js-burn-coal', this.$el),
                    $title = $('.js-title', this.$el);

                $burnCoal.css('opacity', 1 - scrollPosition);
                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $('.js-slide-1'),
            600,
            function (scrollPosition) {
                var $oilTap = $('.js-oil-tap', this.$el),
                    $title = $('.js-title', this.$el),
                    rightPosition;

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.1;
                }

                rightPosition = -900 * (1 - scrollPosition);
                $oilTap.css({
                    opacity: scrollPosition,
                    right: rightPosition - 50 + 'px'
                });

                $title.css('opacity', scrollPosition);
            }),
        new Slide(
            $('.js-slide-1-fade-out'),
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.2;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $('.js-slide-2-fade-in'),
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.2;
                }

                $title.css('opacity', scrollPosition);
            }),
        new Slide(
            $('.js-slide-2'),
            600,
            function (scrollPosition) {
                var $oilTap = $('.js-oil-tap', this.$el),
                    $gusBurn = $('.js-gus-burn', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.2;
                }

                $oilTap.css('opacity', 1 - scrollPosition);
                $gusBurn.css('opacity', scrollPosition);
            }),

        new Slide(
            $('.js-slide-3'),
            600,
            function (scrollPosition) {
                var $gusBurn = $('.js-gus-burn', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $gusBurn.css('opacity', 1 - scrollPosition);
            })
    ];

    /**
     * Function returns slide from slidesList and
     * start scrolling position of slide by current scrolling position
     *
     * @function
     * @name getSlideByScrolledArea
     * @param {number} scrolledArea
     * @returns {Object | null}
     */
    function getSlideByScrolledArea(scrolledArea) {
        var scrollingSum = $window.height(),
            newScrollingSum = scrollingSum,
            slide,
            i = 0;

        for (; i < slidesList.length; i++) {
            slide = slidesList[i];
            newScrollingSum += slide.scrollLength;

            if (newScrollingSum >= scrolledArea) {
                return {
                    startScrollPosition: scrollingSum,
                    slide: slide
                };
            }
            scrollingSum = newScrollingSum;
        }

        return {
            startScrollPosition: scrollingSum,
            slide: slide
        };
    }

    /**
     * Function sets full height for slides wrapper
     *
     * @function
     * @name setFullHeightBySlides
     * @returns {undefined}
     */
    function setFullHeightBySlides() {
        var lastSlide,
            slidesTop = $slides.offset().top,
            windowHeight = $window.height(),
            fullHeight = 0;

        if (windowHeight > slidesTop) {
            fullHeight = windowHeight - slidesTop;
        }

        $.each(slidesList, function (index, slide) {
            fullHeight += slide.scrollLength;
            lastSlide = slide;
        });

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
        var slidesTop = $slides.offset().top,
            windowHeight = $window.height(),
            scrolledArea = $window.scrollTop() + windowHeight - slidesTop,
            nextSlideData,
            nextSlide,
            scrollPosition,
            relativeScrollPosition;

        if (scrolledArea < 0) {
            scrolledArea = 0;
        }

        nextSlideData = getSlideByScrolledArea(scrolledArea);
        nextSlide = nextSlideData.slide;
        scrollPosition = scrolledArea - nextSlideData.startScrollPosition;
        scrollPosition = scrollPosition < 0 ? 0 : scrollPosition;
        relativeScrollPosition = scrollPosition / nextSlide.scrollLength;
        nextSlide.slideHandler(relativeScrollPosition);

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
        $window.on('scroll', scrollHandler).
            on('resize', setFullHeightBySlides);
    }

    setFullHeightBySlides();
    addListeners();
    scrollHandler();
});
