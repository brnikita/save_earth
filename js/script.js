'use strict';
var Slide,
    scrollSlideArea = 600,
    slidesList = [];

/**
 * Constructor of Slide class
 *
 * @constructor
 * @param {jQuery} $slide slide element
 * @param {Array} slidesList List of slides
 * @param {number} slideNumber Position of slide in slides list
 * @param {function} slideHandler Function handles scroll changing for current slide
 * @returns {undefined}
 */
Slide = function ($slide, slidesList, slideNumber, slideHandler) {
    this.$el = $slide;
    this.slidesList = slidesList;
    this.slideNumber = slideNumber;
    this.slideHandler = slideHandler;
};

/**
 * Field contains link to Jquery instance of slide DOM element
 *
 * @field
 * @name Slide#el
 * @type {jQuery | null}
 */
Slide.prototype.$el = null;

/**
 * Field contains link to Array (list of slides)
 *
 * @field
 * @name Slide#slidesList
 * @type {Array | null}
 */
Slide.prototype.slidesList = null;

/**
 * Field contains position of slide in slides list
 *
 * @field
 * @name Slide#slideNumber
 * @type {number | null}
 */
Slide.prototype.slideNumber = null;

/**
 * Field contains function, that handles scroll changing for current slide
 *
 * @field
 * @name Slide#slideHandler
 * @type {Function | null}
 */
Slide.prototype.slideHandler = null;

/**
 * Method returns true if this is first slide in slides list
 *
 * @method
 * @name Slide#isFirst
 * @returns {boolean}
 */
Slide.prototype.isFirst = function () {
    return this.slideNumber === 0;
};

/**
 * Method returns true if this is last slide in slides list
 *
 * @method
 * @name Slide#isLast
 * @returns {boolean}
 */
Slide.prototype.isLast = function () {
    return this.slideNumber === (this.slidesList.length - 1);
};

/**
 * Method returns link to the next slide
 *
 * @function
 * @name Slide#getNext
 * @returns {Slide}
 */
Slide.prototype.getNext = function () {
    if (this.isLast()) {
        return this;
    }

    return this.slidesList[this.slideNumber + 1];
};

/**
 * Method returns link to the previous slide
 *
 * @function
 * @name Slide#getPrevious
 * @returns {Slide}
 */
Slide.prototype.getPrevious = function () {
    if (this.isFirst()) {
        return this;
    }

    return this.slidesList[this.slideNumber - 1];
};