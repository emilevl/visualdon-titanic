"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTotalScroll = getTotalScroll;
exports.scroll = void 0;
exports.setTotalScroll = setTotalScroll;
exports.stepGap = void 0;
exports.toggleScroll = toggleScroll;
exports.variation = void 0;

var d3 = _interopRequireWildcard(require("d3"));

require("./lib/luckyNumbers.js");

var _steps = require("./lib/steps.js");

require("./lib/waves.js");

var _titanic = _interopRequireDefault(require("../data/titanic.csv"));

require("../src/index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

setTimeout(function () {
  d3.select('#boat').attr('class', '');
}, 500); // const maxWidth = window.innerWidth;
// console.log(maxHeight);

var scroll = true;
exports.scroll = scroll;
var maxHeight = window.innerHeight;
var variation; // console.log(maxHeight)

exports.variation = variation;
var numSteps = 20.0;
var totalScroll = 100000;
var stepGap = 600;
exports.stepGap = stepGap;
var alreadyPositioned = false;
var boxElement;
var prevRatio = 0.0;
boxElement = document.querySelector("#box"); // On met l'ensemble en place.

window.addEventListener("load", function (event) {
  createObserver();
}, false);
/**
 * function that creates the observer
 * @return {void}
 **/

function createObserver() {
  var observer;
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };
  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function buildThresholdList() {
  var thresholds = [];

  for (var i = 1.0; i <= numSteps; i++) {
    var ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach(function (entry) {
    prevRatio = entry.intersectionRatio;

    if (prevRatio >= 0.95) {
      totalScroll = 0;
      exports.scroll = scroll = false;
      toggleScroll();
    }
  });
}

document.getElementById('mouse-scroll').addEventListener('click', function () {
  exports.scroll = scroll = !scroll;
  totalScroll = 0;
  toggleScroll();
  window.scrollTo(0, maxHeight);
  (0, _steps.animate)();
});

function toggleScroll() {
  if (!scroll) {
    // To get the scroll position of current webpage
    // add class "stop-scroll" to box
    boxElement.classList.add('full-screen');
    document.querySelector('body').classList.add('stop-scroll');
  } else {
    document.querySelector('body').classList.remove('stop-scroll');
    boxElement.classList.remove('full-screen');

    if (totalScroll < 0 && !alreadyPositioned) {
      window.scrollTo(0, maxHeight);
      alreadyPositioned = true;
      totalScroll = 100000;
    }
  }
}

document.addEventListener("wheel", function (e) {
  (0, _steps.animate)();
  var TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  var LeftScroll = window.pageXOffset || document.documentElement.scrollLeft; // to make it work on IE or Chrome

  exports.variation = variation = parseInt(e.deltaY);
  totalScroll += variation; // console.log("totalScroll: " + totalScroll);

  if (totalScroll < 0) {
    exports.scroll = scroll = true;
    alreadyPositioned = false;
    toggleScroll();
  }

  return false;
}, true); // Add event listener on arrow keys

document.addEventListener("keydown", function (e) {
  if (!scroll) {
    // If the key is the up arrow or the left arrow
    if (e.keyCode == 38 || e.keyCode == 37) {
      // console.log("UP");
      totalScroll -= stepGap;
      (0, _steps.animate)();

      if (totalScroll < 0) {
        exports.scroll = scroll = true;
        alreadyPositioned = false;
        toggleScroll();
      }
    } else if (e.keyCode === 40 || e.keyCode === 39) {
      // console.log("DOWN");
      totalScroll += stepGap;
      (0, _steps.animate)();

      if (totalScroll < 0) {
        exports.scroll = scroll = true;
        alreadyPositioned = false;
        toggleScroll();
      }
    }
  }
}, true);

function getTotalScroll() {
  return totalScroll;
}

function setTotalScroll(value) {
  totalScroll = value;
}