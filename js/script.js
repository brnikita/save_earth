'use strict';
$(function () {
    var Slide,
        currentSlide,
        $window = $(window),
        $slides = $('.js-slides'),
        $slide6Challenges = $('.js-slide-6-challenges'),
        $tapPlanet = $('.js-tap-planet'),
        slidesList,
        $coalBurning = $('.js-coal-burning'),
        $slideGlobalWarming = $('.js-slide-global-warming'),
        $slideOceanAcidification = $('.js-slide-ocean-acidification'),
        $slideArcticIce = $('.js-slide-arctic-ice'),
        $slideExtremeEvents = $('.js-slide-extreme-events'),
        $slideFlooding = $('.js-slide-flooding'),
        $glacierRetreat = $('.js-slide-glacier-retreat');

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
            600,
            function () {
                var $burnCoal = $('.js-burn-coal', this.$el);

                $burnCoal.removeAttr('style');
            }),
        new Slide(
            $coalBurning,
            400,
            function (scrollPosition) {
                var $burnCoal = $('.js-burn-coal', this.$el),
                    $title = $('.js-title', this.$el);

                $burnCoal.css('opacity', 1 - scrollPosition);
                $title.css('opacity', 1 - scrollPosition);
            }),
        //natural gas
        new Slide(
            $tapPlanet,
            600,
            function (scrollPosition) {
                var $oilTap = $('.js-oil-tap', this.$el),
                    $title = $('.js-title', this.$el),
                    rightPosition;

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.1;
                }

                rightPosition = -900 * (1 - scrollPosition);

                if (rightPosition > -50) {
                    rightPosition = 0;
                }

                $oilTap.css({
                    opacity: scrollPosition,
                    right: rightPosition - 50 + 'px'
                });

                $title.css('opacity', scrollPosition);
            }),
        new Slide(
            $tapPlanet,
            600,
            function () {
                var $oilTap = $('.js-oil-tap', this.$el),
                    $title = $('.js-title', this.$el);

                $oilTap.removeAttr('style');
                $title.removeAttr('style');
            }),
        new Slide(
            $('.js-tap-planet-fade-out'),
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.2;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $('.js-slide-natural-gas-fade-in'),
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.2;
                }

                $title.css('opacity', scrollPosition);
            }),
        new Slide(
            $('.js-slide-natural-gas'),
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
            $slide6Challenges,
            600,
            function (scrollPosition) {
                var $gusBurn = $('.js-gus-burn', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.2;
                }

                if (scrollPosition > 0.8) {
                    scrollPosition = 1;
                }
                $gusBurn.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $slide6Challenges,
            300,
            function (scrollPosition) {
            }),
        new Slide(
            $slide6Challenges,
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $slideGlobalWarming,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', scrollPosition);
                $rectangle.css('opacity', scrollPosition);
            }),
        new Slide(
            $slideGlobalWarming,
            300,
            function () {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                $title.removeAttr('style');
                $rectangle.removeAttr('style');
            }),
        new Slide(
            $slideGlobalWarming,
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $slideOceanAcidification,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', scrollPosition);
                $rectangle.css('opacity', scrollPosition);
            }),
        new Slide(
            $slideOceanAcidification,
            300,
            function () {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                $title.removeAttr('style');
                $rectangle.removeAttr('style');
            }),
        new Slide(
            $slideOceanAcidification,
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $slideArcticIce,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', scrollPosition);
                $rectangle.css('opacity', scrollPosition);
            }),
        new Slide(
            $slideArcticIce,
            300,
            function () {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                $title.removeAttr('style');
                $rectangle.removeAttr('style');
            }),
        new Slide(
            $slideArcticIce,
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $slideExtremeEvents,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', scrollPosition);
                $rectangle.css('opacity', scrollPosition);
            }),
        new Slide(
            $slideExtremeEvents,
            300,
            function () {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                $title.removeAttr('style');
                $rectangle.removeAttr('style');
            }),
        new Slide(
            $slideExtremeEvents,
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $slideFlooding,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', scrollPosition);
                $rectangle.css('opacity', scrollPosition);
            }),
        new Slide(
            $slideFlooding,
            300,
            function () {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                $title.removeAttr('style');
                $rectangle.removeAttr('style');
            }),
        new Slide(
            $slideFlooding,
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', 1 - scrollPosition);
            }),
        new Slide(
            $glacierRetreat,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', scrollPosition);
                $rectangle.css('opacity', scrollPosition);
            }),
        new Slide(
            $glacierRetreat,
            300,
            function () {
                var $rectangle = $('.js-rectangle:last', this.$el),
                    $title = $('.js-title', this.$el);

                $title.removeAttr('style');
                $rectangle.removeAttr('style');
            }),
        new Slide(
            $glacierRetreat,
            400,
            function (scrollPosition) {
                var $title = $('.js-title', this.$el);

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.3;
                }

                $title.css('opacity', 1 - scrollPosition);
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
