import * as d3 from 'd3';
import './lib/luckyNumbers.js';
import './lib/hasSurvived.js';
import './lib/waves.js';
import titanic from '../data/titanic.csv';
import '../src/index.css';
import { animate } from './lib/hasSurvived.js';
import { topFunction } from './lib/hasSurvived.js';
// const body = d3.select("body");
// const margin = ({
//     top: 30,
//     right: 10,
//     bottom: 30,
//     left: 40,
//   });

setTimeout(function(){
  d3.select('#boat').attr('class', '')
 }, 500);

// const maxWidth = window.innerWidth;
// console.log(maxHeight);
export let scroll = true;
const maxHeight = window.innerHeight;

// console.log(maxHeight)
let numSteps = 10.0;
let totalScroll = 100000;
export let stepGap = 500;
let alreadyPositioned = false;

let boxElement;
let prevRatio = 0.0;

boxElement = document.querySelector("#box");

// On met l'ensemble en place.
window.addEventListener("load", function (event) {
  createObserver();
  
}, false);

/**
 * function that creates the observer
 * @return {void}
 **/
function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function buildThresholdList() {
  let thresholds = [];

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach(function (entry) {
    prevRatio = entry.intersectionRatio;

    if (prevRatio >= 0.9) {
      totalScroll = 0;
      scroll = false;
      toggleScroll();
    } 
  });
}

export function toggleScroll() {
  if (!scroll) {
    // To get the scroll position of current webpage
    // add class "stop-scroll" to box
    boxElement.classList.add('full-screen');
    document.querySelector('body').classList.add('stop-scroll');
  } else {
    document.querySelector('body').classList.remove('stop-scroll');
    boxElement.classList.remove('full-screen');
    if (totalScroll > -150 && !alreadyPositioned) {
      window.scrollTo(0, maxHeight * 0.88)
      alreadyPositioned = true;
    }
  }
}

document.addEventListener("wheel", function (e) {
  animate();
  let TopScroll = window.pageYOffset || document.documentElement.scrollTop;
  let LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
  // to make it work on IE or Chrome
  let variation = parseInt(e.deltaY);
    totalScroll += variation;

  // console.log("totalScroll: " + totalScroll);
  if (totalScroll < 0) {
    scroll = true;
    alreadyPositioned = false;
    toggleScroll();
  }
  return false;

}, true);

// Add event listener on arrow keys
document.addEventListener("keydown", function (e) {

  // If the key is the up arrow or the left arrow
  if (e.keyCode == 38 || e.keyCode == 37) {
    // console.log("UP");
    totalScroll -= stepGap;
    animate();
    if (totalScroll < 0) {
      scroll = true;
      alreadyPositioned = false;
      toggleScroll();
    }
  } else if (e.keyCode === 40 || e.keyCode === 39) {
    // console.log("DOWN");
    totalScroll += stepGap;
    animate();
    if (totalScroll < 0) {
      scroll = true;
      alreadyPositioned = false;
      toggleScroll();
    }
  }
}, true);

export function getTotalScroll() {
  return totalScroll;
}

export function setTotalScroll(value) {
  totalScroll = value;
}