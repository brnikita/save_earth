'use strict';
$(function () {
    var Slide,
        currentSlide,
        $window = $(window),
        $slides = $('.js-slides'),
        $slideHandWorld,
        $slide6Challenges,
        $tapPlanet,
        slidesList,
        $coalBurning,
        $slideGlobalWarming,
        $slideOceanAcidification,
        $slideArcticIce,
        $slideExtremeEvents,
        $slideFlooding,
        $glacierRetreat,
        $rectanglesClickable,
        $firstSixChallenges,
        $slideTurnTheWorld,
        $slideLogo,
        $slideLogo180,
        $naturalResources,
        $slideWater,
        $slideWind,
        $slideSolar,
        $desertEnergy,
        $slideEnergyChoice,
        $slideEnergy40,
        $slideEnergy60,
        $slideEnergy50,
        $slideEnergy50Other,
        $slideEnergy40Hands,
        $slideEnergy60Follow;

    /**
     * Function saves elements of DOM
     *
     * @function
     * @name setElements
     * @returns {undefined}
     */
    function setElements() {
        $slideHandWorld = $('.js-hand-world');
        $slide6Challenges = $('.js-slide-6-challenges');
        $tapPlanet = $('.js-tap-planet');
        $coalBurning = $('.js-coal-burning');
        $slideGlobalWarming = $('.js-slide-global-warming');
        $slideOceanAcidification = $('.js-slide-ocean-acidification');
        $slideArcticIce = $('.js-slide-arctic-ice');
        $slideExtremeEvents = $('.js-slide-extreme-events');
        $slideFlooding = $('.js-slide-flooding');
        $glacierRetreat = $('.js-slide-glacier-retreat');
        $rectanglesClickable = $('.js-slide-rectangles-clickable');
        $firstSixChallenges = $('.js-slide-first-six-challenges');
        $slideTurnTheWorld = $('.js-slide-turn-the-world');
        $slideLogo = $('.js-slide-logo');
        $slideLogo180 = $('.js-slide-logo-180');
        $naturalResources = $('.js-slide-natural-resources');
        $slideWater = $('.js-slide-water');
        $slideWind = $('.js-slide-wind');
        $slideSolar = $('.js-slide-solar');
        $desertEnergy = $('.slide-desert-energy');
        $slideEnergyChoice = $('.slide-energy-choice');
        $slideEnergy40 = $('.js-slide-energy-40');
        $slideEnergy60 = $('.js-slide-energy-60');
        $slideEnergy50 = $('.js-slide-energy-50');
        $slideEnergy50Other = $('.js-slide-energy-50-other');
        $slideEnergy40Hands = $('.js-slide-energy-40-hands');
        $slideEnergy60Follow = $('.js-slide-energy-60-follow');
    }

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
     * Method returns x coordinate of part of line between 2 points
     *
     * @method
     * @name Slide#getXCoordinate
     * @param {number} scrollPosition
     * @param {number} x1
     * @param {number} x2
     * @returns {number}
     */
    Slide.prototype.getXCoordinate = function (scrollPosition, x1, x2) {
        if (scrollPosition < 0.1) {
            scrollPosition = 0;
        }

        if (scrollPosition > 0.9) {
            scrollPosition = 1;
        }

        return (x1 - x2) * scrollPosition + x2;
    };

    /**
     * Method returns y coordinate of part of line between 2 points
     *
     * @method
     * @name Slide#getYCoordinate
     * @param {number} scrollPosition
     * @param {number} y1
     * @param {number} y2
     * @returns {number}
     */
    Slide.prototype.getYCoordinate = function (scrollPosition, y1, y2) {
        if (scrollPosition < 0.1) {
            scrollPosition = 0;
        }

        if (scrollPosition > 0.9) {
            scrollPosition = 1;
        }

        return (y1 - y2) * scrollPosition + y2;
    };

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
        $slides.parents('.container').addClass('fullWidth');
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
            windowScrollTop = $window.scrollTop(),
            scrolledArea = windowScrollTop + windowHeight - slidesTop,
            nextSlideData,
            nextSlide,
            scrollPosition,
            relativeScrollPosition,
            slideTop = 0;

        if (scrolledArea < 0) {
            scrolledArea = 0;
        }

        nextSlideData = getSlideByScrolledArea(scrolledArea);
        nextSlide = nextSlideData.slide;
        scrollPosition = scrolledArea - nextSlideData.startScrollPosition;
        scrollPosition = scrollPosition < 0 ? 0 : scrollPosition;
        relativeScrollPosition = scrollPosition / nextSlide.scrollLength;

        if (windowScrollTop < 152) {
            slideTop = 152 - windowScrollTop;
        }

        nextSlide.$el.css({
            top: slideTop
        });
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

        $('.js-final-form').on('submit', function () {
            return false;
        });
    }


    if ($slides.length) {
        setElements();

        /**
         *
         * List of slides (instances of Slide class)
         *
         * @type {Array}
         */
        slidesList = [
            new Slide(
                $slideHandWorld,
                600,
                function (scrollPosition) {
                    var $earth = $('.js-earth', this.$el);

                    this.fadeIn(scrollPosition, $earth);
                }),
            new Slide(
                $slideHandWorld,
                600,
                function (scrollPosition) {
                    var $handWorld = $('.js-hand-world', this.$el);

                    this.fadeOutTitle(scrollPosition);
                    this.fadeOut(scrollPosition, $handWorld);
                }),
            new Slide(
                $('.js-our-beautiful-planet'),
                600,
                function (scrollPosition) {
                    this.fadeInTitle(scrollPosition);
                }),
            new Slide(
                $coalBurning,
                800,
                function (scrollPosition) {
                    var $burnCoal = $('.js-burn-coal', this.$el),
                        topPosition;

                    this.fadeIn(scrollPosition, $burnCoal);
                    topPosition = -900 * (1 - scrollPosition);
                    $burnCoal.css('top', topPosition - 164 + 'px');
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
                        $gusBurn = $('.js-gus-burn', this.$el),
                        gusBurnOpacity = 0.6 * scrollPosition;

                    this.fadeOut(scrollPosition, $oilTap);
                    $gusBurn.css('opacity', gusBurnOpacity);
                }),
            new Slide(
                $slide6Challenges,
                600,
                function (scrollPosition) {
                    var $gusBurn = $('.js-gus-burn', this.$el),
                        gusBurnOpacity = 0.6 * ( 1 - scrollPosition);

                    $gusBurn.css('opacity', gusBurnOpacity);
                }),
            new Slide(
                $slide6Challenges,
                300,
                function () {
                    var $gusBurn = $('.js-gus-burn', this.$el);

                    $gusBurn.removeAttr('style');
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
                $firstSixChallenges,
                600,
                function (scrollPosition) {
                    this.fadeInTitle(scrollPosition);
                }),
            new Slide(
                $firstSixChallenges,
                300,
                function () {
                    var $title = $('.js-title', this.$el);

                    $title.removeAttr('style');
                }),
            new Slide(
                $firstSixChallenges,
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
                600,
                function (scrollPosition) {
                    var $logo = $('.js-logo', this.$el),
                        $earth = $('.js-earth', this.$el);

                    this.fadeIn(scrollPosition, $logo);
                    $earth.removeAttr('style');
                }),
            new Slide(
                $slideLogo,
                800,
                function (scrollPosition) {
                    var $earth = $('.js-earth', this.$el),
                        rotate;

                    if (scrollPosition > 0.9) {
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
                    var $oceanPower = $('.js-ocean_power', this.$el),
                        $waterLine1 = $('.js-water_line_1', this.$el),
                        $waterLine2 = $('.js-water_line_2', this.$el);

                    this.fadeOut(scrollPosition, $oceanPower);
                    this.fadeOut(scrollPosition, $waterLine1);
                    this.fadeOut(scrollPosition, $waterLine2);

                    var $windPower = $('.js-wind_power', this.$el),
                        $windLine1 = $('.js-wind_line_1', this.$el),
                        $windLine2 = $('.js-wind_line_2', this.$el);

                    this.fadeOut(scrollPosition, $windPower);
                    this.fadeOut(scrollPosition, $windLine1);
                    this.fadeOut(scrollPosition, $windLine2);

                    var $solarPower = $('.js-solar_power', this.$el),
                        $solarLine1 = $('.js-sun_line_1', this.$el),
                        $solarLine2 = $('.js-sun_line_2', this.$el),
                        $solarRectangle = $('.js-solar_rectangle', this.$el);

                    this.fadeOut(scrollPosition, $solarPower);
                    this.fadeOut(scrollPosition, $solarLine1);
                    this.fadeOut(scrollPosition, $solarLine2);
                    this.fadeOut(scrollPosition, $solarRectangle);

                    this.fadeOutTitle(scrollPosition);
                }),
            new Slide(
                $slideEnergy40,
                800,
                function (scrollPosition) {
                    var $earth20 = $('.js-earth_20', this.$el),
                        $earth20Two = $('.js-earth_20_2', this.$el),
                        $earthLInePart40 = $('.js-earth_line_part_40', this.$el),
                        earth20X0 = -3,
                        earth20X1 = 15,
                        earth20Y0 = 247,
                        earth20Y1 = 243,
                        earth20X = this.getXCoordinate(scrollPosition, earth20X1, earth20X0),
                        earth20Y = this.getXCoordinate(scrollPosition, earth20Y1, earth20Y0),
                        earth202X0 = -219,
                        earth202X1 = -201,
                        earth202Y0 = 365,
                        earth202Y1 = 361,
                        earth202X = this.getXCoordinate(scrollPosition, earth202X1, earth202X0),
                        earth202Y = this.getXCoordinate(scrollPosition, earth202Y1, earth202Y0);

                    $earth20.css({
                        'margin-left': earth20X,
                        'top': earth20Y
                    });
                    $earth20Two.css({
                        'margin-left': earth202X,
                        'top': earth202Y
                    });
                    this.fadeInTitle(scrollPosition);
                    this.fadeIn(scrollPosition, $earthLInePart40);
                }),
            new Slide(
                $slideEnergy40,
                400,
                function (scrollPosition) {
                }),
            new Slide(
                $slideEnergy40,
                400,
                function (scrollPosition) {
                    var $earthLInePart40 = $('.js-earth_line_part_40', this.$el);

                    this.fadeOutTitle(scrollPosition);
                    this.fadeOut(scrollPosition, $earthLInePart40);
                }),
            new Slide(
                $slideEnergy60,
                600,
                function (scrollPosition) {
                    var $earthLInePart60 = $('.js-earth_line_part_60', this.$el);

                    this.fadeInTitle(scrollPosition);
                    this.fadeIn(scrollPosition, $earthLInePart60);
                }),
            new Slide(
                $slideEnergy60,
                400,
                function (scrollPosition) {
                }),
            new Slide(
                $slideEnergy60,
                400,
                function (scrollPosition) {
                    var $earthLInePart60 = $('.js-earth_line_part_60', this.$el);

                    this.fadeOutTitle(scrollPosition);
                    this.fadeOut(scrollPosition, $earthLInePart60);
                }),
            new Slide(
                $slideEnergy50,
                800,
                function (scrollPosition) {
                    var $earth20Two = $('.js-earth_20_2', this.$el),
                        $earthLInePart50 = $('.js-earth_line_part_50', this.$el),
                        earth202X0 = 500,
                        earth202X1 = -201,
                        earth202Y0 = 641,
                        earth202Y1 = 361,
                        earth202X = this.getXCoordinate(scrollPosition, earth202X0, earth202X1),
                        earth202Y = this.getXCoordinate(scrollPosition, earth202Y0, earth202Y1);


                    $earth20Two.css({
                        'margin-left': earth202X,
                        'top': earth202Y
                    });
                    this.fadeInTitle(scrollPosition);
                    this.fadeOut(scrollPosition, $earth20Two);
                    this.fadeIn(scrollPosition, $earthLInePart50);
                }),
            new Slide(
                $slideEnergy50,
                400,
                function () {
                }),
            new Slide(
                $slideEnergy50,
                400,
                function (scrollPosition) {
                    var $earthLInePart50 = $('.js-earth_line_part_50');

                    this.fadeOutTitle(scrollPosition);
                    this.fadeOut(scrollPosition, $earthLInePart50);
                }),
            new Slide(
                $slideEnergy50Other,
                800,
                function (scrollPosition) {
                    var $earth20 = $('.js-earth_20', this.$el),
                        $earth20Two = $('.js-earth_20_2', this.$el),
                        $earthLInePart50Other = $('.js-earth_line_part_50_other', this.$el),
                        earth20X0 = 500,
                        earth20X1 = 15,
                        earth20Y0 = -600,
                        earth20Y1 = 243,
                        earth20X = this.getXCoordinate(scrollPosition, earth20X0, earth20X1),
                        earth20Y = this.getXCoordinate(scrollPosition, earth20Y0, earth20Y1),
                        earth202X0 = 500,
                        earth202X1 = -201,
                        earth202Y0 = 600,
                        earth202Y1 = 361,
                        earth202X = this.getXCoordinate(scrollPosition, earth202X1, earth202X0),
                        earth202Y = this.getXCoordinate(scrollPosition, earth202Y1, earth202Y0);

                    $earth20.css({
                        'margin-left': earth20X,
                        'top': earth20Y
                    });
                    $earth20Two.css({
                        'margin-left': earth202X,
                        'top': earth202Y
                    });

                    this.fadeInTitle(scrollPosition);
                    this.fadeOut(scrollPosition, $earth20);
                    this.fadeIn(scrollPosition, $earth20Two);
                    this.fadeIn(scrollPosition, $earthLInePart50Other);
                }),
            new Slide(
                $slideEnergy50Other,
                400,
                function () {
                }),
            new Slide(
                $slideEnergy50Other,
                400,
                function (scrollPosition) {
                    var $earthLInePart50Other = $('.js-earth_line_part_50_other', this.$el);

                    this.fadeOutTitle(scrollPosition);
                    this.fadeOut(scrollPosition, $earthLInePart50Other);
                }),
            new Slide(
                $slideEnergy40Hands,
                600,
                function (scrollPosition) {
                    var $earth20 = $('.js-earth_20', this.$el),
                        $earthPart60 = $('.js-earth_60', this.$el);

                    this.fadeInTitle(scrollPosition);
                    this.fadeIn(scrollPosition, $earth20);
                    this.fadeOut(scrollPosition, $earthPart60);
                }),
            new Slide(
                $slideEnergy40Hands,
                400,
                function (scrollPosition) {
                }),
            new Slide(
                $slideEnergy40Hands,
                400,
                function (scrollPosition) {
                    this.fadeOutTitle(scrollPosition);
                }),
            new Slide(
                $slideEnergy60Follow,
                600,
                function (scrollPosition) {
                    var $earthPart60 = $('.js-earth_60', this.$el);

                    this.fadeInTitle(scrollPosition);
                    this.fadeIn(scrollPosition, $earthPart60);
                }),
            new Slide(
                $slideEnergy60Follow,
                400,
                function (scrollPosition) {
                }),
            new Slide(
                $slideEnergy60Follow,
                400,
                function (scrollPosition) {
                    this.fadeOut(scrollPosition, this.$el);
                }),
            new Slide(
                $('.js-slide-final-text-2'),
                600,
                function (scrollPosition) {
                    var $lastTitle = $('.js-title:last', this.$el);

                    this.fadeIn(scrollPosition, $lastTitle);
                }),
            new Slide(
                $('.js-slide-final-text-3'),
                600,
                function (scrollPosition) {
                    var $lastTitle = $('.js-title:last', this.$el);

                    this.fadeIn(scrollPosition, $lastTitle);
                }),
            new Slide(
                $('.js-slide-final-text-4'),
                600,
                function (scrollPosition) {
                    var $lastTitle = $('.js-title:last', this.$el);

                    this.fadeIn(scrollPosition, $lastTitle);
                }),
            new Slide(
                $('.js-slide-final-text-5'),
                600,
                function (scrollPosition) {
                    var $lastTitle = $('.js-title:last', this.$el);

                    this.fadeIn(scrollPosition, $lastTitle);
                }),
            new Slide(
                $('.js-slide-final-text-6'),
                600,
                function (scrollPosition) {
                    var $lastTitle = $('.js-title:last', this.$el);

                    this.fadeIn(scrollPosition, $lastTitle);
                }),
            new Slide(
                $('.js-slide-final-text-7'),
                600,
                function (scrollPosition) {
                    var $lastTitle = $('.js-title:last', this.$el);

                    this.fadeIn(scrollPosition, $lastTitle);
                }),
            new Slide(
                $('.js-slide-final-form'),
                600,
                function (scrollPosition) {
                    var $finalForm = $('.js-final-form', this.$el),
                        $finalFormLine = $('.js-final-form-line', this.$el);

                    this.fadeIn(scrollPosition, $finalForm);
                    this.fadeIn(scrollPosition, $finalFormLine);
                    $('#email').focus();
                })
        ];

        setFullHeightBySlides();
        addListeners();
        scrollHandler();
    }
});
