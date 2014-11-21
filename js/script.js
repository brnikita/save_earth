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
        $glacierRetreat = $('.js-slide-glacier-retreat'),
        $rectanglesClickable = $('.js-slide-rectangles-clickable'),
        $firstSixChallengaes = $('.js-slide-first-six-challenges'),
        $slideTurnTheWorld = $('.js-slide-turn-the-world'),
        $slideLogo = $('.js-slide-logo'),
        $slideLogo180 = $('.js-slide-logo-180'),
        $naturalResources = $('.js-slide-natural-resources'),
        $slideWater = $('.js-slide-water'),
        $slideWind = $('.js-slide-wind'),
        $slideSolar = $('.js-slide-solar'),
        $desertEnergy = $('.slide-desert-energy'),
        $slideEnergyChoice = $('.slide-energy-choice'),
        $slideEnergy40 = $('.js-slide-energy-40');

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
        this.$el.addClass('hide').removeAttr('style');
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
     * Method fades in element
     *
     * @method
     * @name Slide#fadeInTitle
     * @param {number} opacity
     * @param {jQuery} $el
     * @returns {undefined}
     */
    Slide.prototype.fadeIn = function (opacity, $el) {
        if (opacity > 0.5) {
            opacity += 0.3;
        }

        if (opacity > 0.9) {
            opacity = 1;
        }

        $el.css('opacity', opacity);
    };

    /**
     * Method fades out element
     *
     * @method
     * @name Slide#fadeOutTitle
     * @param {number} opacity
     * @param {jQuery} $el
     * @returns {undefined}
     */
    Slide.prototype.fadeOut = function (opacity, $el) {
        if (opacity > 0.5) {
            opacity += 0.3;
        }

        if (opacity > 0.9) {
            opacity = 1;
        }

        $el.css('opacity', 1 - opacity);
    };

    /**
     * Method fades in element
     *
     * @method
     * @name Slide#fadeInTitle
     * @param {number} opacity
     * @returns {undefined}
     */
    Slide.prototype.fadeInTitle = function (opacity) {
        var $title = $('.js-title', this.$el);

        this.fadeIn(opacity, $title);
    };

    /**
     * Method fades out title
     *
     * @method
     * @name Slide#fadeOutTitle
     * @param {number} opacity
     * @returns {undefined}
     */
    Slide.prototype.fadeOutTitle = function (opacity) {
        var $title = $('.js-title', this.$el);

        this.fadeOut(opacity, $title);
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
                var $burnCoal = $('.js-burn-coal', this.$el);

                this.fadeOutTitle(scrollPosition);
                this.fadeOut(scrollPosition, $burnCoal);
            }),
        //natural gas
        new Slide(
            $tapPlanet,
            600,
            function (scrollPosition) {
                var $oilTap = $('.js-oil-tap', this.$el),
                    rightPosition;

                this.fadeInTitle(scrollPosition);

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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $('.js-slide-natural-gas-fade-in'),
            400,
            function (scrollPosition) {
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $('.js-slide-natural-gas'),
            600,
            function (scrollPosition) {
                var $oilTap = $('.js-oil-tap', this.$el),
                    $gusBurn = $('.js-gus-burn', this.$el);

                this.fadeOut(scrollPosition, $oilTap);
                this.fadeIn(scrollPosition, $gusBurn);
            }),
        new Slide(
            $slide6Challenges,
            600,
            function (scrollPosition) {
                var $gusBurn = $('.js-gus-burn', this.$el);

                this.fadeOut(scrollPosition, $gusBurn);
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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideGlobalWarming,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el);

                this.fadeInTitle(scrollPosition);
                this.fadeIn(scrollPosition, $rectangle);
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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideOceanAcidification,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el);

                this.fadeInTitle(scrollPosition);
                this.fadeIn(scrollPosition, $rectangle);
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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideArcticIce,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el);

                this.fadeInTitle(scrollPosition);
                this.fadeIn(scrollPosition, $rectangle);
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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideExtremeEvents,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el);

                this.fadeInTitle(scrollPosition);
                this.fadeIn(scrollPosition, $rectangle);
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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideFlooding,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el);

                this.fadeInTitle(scrollPosition);
                this.fadeIn(scrollPosition, $rectangle);
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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $glacierRetreat,
            600,
            function (scrollPosition) {
                var $rectangle = $('.js-rectangle:last', this.$el);

                this.fadeInTitle(scrollPosition);
                this.fadeIn(scrollPosition, $rectangle);
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
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $rectanglesClickable,
            600,
            function (scrollPosition) {
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $rectanglesClickable,
            300,
            function () {
                var $title = $('.js-title', this.$el);

                $title.removeAttr('style');
            }),
        new Slide(
            $rectanglesClickable,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $firstSixChallengaes,
            600,
            function (scrollPosition) {
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $firstSixChallengaes,
            300,
            function () {
                var $title = $('.js-title', this.$el);

                $title.removeAttr('style');
            }),
        new Slide(
            $firstSixChallengaes,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideTurnTheWorld,
            600,
            function (scrollPosition) {
                var $rectangles = $('.js-rectangle', this.$el);

                this.fadeInTitle(scrollPosition);
                this.fadeOut(scrollPosition, $rectangles);
            }),
        new Slide(
            $slideTurnTheWorld,
            600,
            function () {
                var $rectangles = $('.js-rectangle', this.$el),
                    $title = $('.js-title', this.$el);

                $title.removeAttr('style');
                $rectangles.css('opacity', 0);
            }),
        new Slide(
            $slideLogo,
            1000,
            function (scrollPosition) {
                var $earth = $('.js-earth', this.$el),
                    rotate;

                if (scrollPosition > 0.5) {
                    scrollPosition += 0.1;
                }

                if (scrollPosition > 0.8) {
                    scrollPosition = 1;
                }


                rotate = 'rotate(' + 180 * scrollPosition + 'deg)';
                $earth.css({
                    '-ms-transform': rotate,
                    '-webkit-transform': rotate,
                    'transform': rotate
                });
            }),
        new Slide(
            $slideLogo180,
            400,
            function (scrollPosition) {
            }),
        new Slide(
            $slideLogo180,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $naturalResources,
            600,
            function (scrollPosition) {
                var $logo180 = $('.js-logo-180', this.$el);

                this.fadeOut(scrollPosition, $logo180);
            }),
        new Slide(
            $naturalResources,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideWater,
            600,
            function (scrollPosition) {
                var $oceanPower = $('.js-ocean_power', this.$el),
                    $waterLine1 = $('.js-water_line_1', this.$el),
                    $waterLine2 = $('.js-water_line_2', this.$el);

                this.fadeIn(scrollPosition, $oceanPower);
                this.fadeIn(scrollPosition, $waterLine1);
                this.fadeIn(scrollPosition, $waterLine2);
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $slideWater,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideWind,
            600,
            function (scrollPosition) {
                var $windPower = $('.js-wind_power', this.$el),
                    $windLine1 = $('.js-wind_line_1', this.$el),
                    $windLine2 = $('.js-wind_line_2', this.$el);

                this.fadeIn(scrollPosition, $windPower);
                this.fadeIn(scrollPosition, $windLine1);
                this.fadeIn(scrollPosition, $windLine2);
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $slideWind,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideSolar,
            600,
            function (scrollPosition) {
                var $solarPower = $('.js-solar_power', this.$el),
                    $solarLine1 = $('.js-sun_line_1', this.$el),
                    $solarLine2 = $('.js-sun_line_2', this.$el),
                    $solarRectangle = $('.js-solar_rectangle', this.$el);

                this.fadeIn(scrollPosition, $solarPower);
                this.fadeIn(scrollPosition, $solarLine1);
                this.fadeIn(scrollPosition, $solarLine2);
                this.fadeIn(scrollPosition, $solarRectangle);
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $slideSolar,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $desertEnergy,
            600,
            function (scrollPosition) {
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $desertEnergy,
            400,
            function (scrollPosition) {
                this.fadeOutTitle(scrollPosition);
            }),
        new Slide(
            $slideEnergyChoice,
            600,
            function (scrollPosition) {
                this.fadeInTitle(scrollPosition);
            }),
        new Slide(
            $slideEnergyChoice,
            600,
            function (scrollPosition) {
                this.fadeOut(scrollPosition, this.$el);
            }),
        new Slide(
            $slideEnergy40,
            600,
            function (scrollPosition) {
                var $earthPart60 = $('.js-earth_60');

                this.fadeInTitle(scrollPosition);
                this.fadeIn(scrollPosition, $earthPart60);
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

        if (typeof currentSlide === 'undefined') {
            currentSlide = nextSlide;
            currentSlide.show();
            return;
        }

        if (currentSlide.$el !== nextSlide.$el) {
            currentSlide.hide();
            nextSlide.show();
        }

        if (currentSlide !== nextSlide) {
            currentSlide = nextSlide;
        }
    }

    /**
     * Function handles click event in links
     *
     * @function
     * @name slideLinkClickHandler
     * @returns {boolean}
     */
    function slideLinkClickHandler() {
        var $this = $(this),
            $slideWrapper = $this.parents('.slide');

        return !$slideWrapper.hasClass('hide');
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
        $('a', $slides).on('click', slideLinkClickHandler);

    }

    setFullHeightBySlides();
    addListeners();
    scrollHandler();
});
