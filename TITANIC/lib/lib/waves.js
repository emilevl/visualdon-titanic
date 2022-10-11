"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var d3 = _interopRequireWildcard(require("d3"));

var _gsap = require("gsap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { TweenLite, TimelineMax, Linear, Back, Sine } from 'gsap/all';
// vs
// import { TweenLite, TimelineMax, Linear, Back, Sine } from 'gsap';
var waveFg = document.querySelector('#titanic-wave-fg');
var waveBg = document.querySelector('#titanic-wave-bg');
var boat = document.querySelector('#boat');

_gsap.gsap.to(boat, 3.5, {
  rotation: -2.7,
  transformOrigin: 'center',
  ease: "power2.inOut",
  repeat: -1,
  yoyo: true
}, 0);

_gsap.gsap.to(boat, 20, {
  translateX: -600,
  ease: "none",
  repeat: -1,
  yoyo: false
}, 0); // const tl = new TimelineMax()


_gsap.gsap.to(waveFg, 3, {
  x: -323.766,
  ease: "none",
  repeat: -1
}, 0);

_gsap.gsap.from(waveBg, 3, {
  x: -323.766,
  ease: "none",
  repeat: -1
}, 0);