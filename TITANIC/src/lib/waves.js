// import { TweenLite, TimelineMax, Linear, Back, Sine } from 'gsap/all';
import * as d3 from 'd3';
import { gsap } from "gsap";

// vs

// import { TweenLite, TimelineMax, Linear, Back, Sine } from 'gsap';
const waveFg = document.querySelector('#titanic-wave-fg')
const waveBg = document.querySelector('#titanic-wave-bg')

const boat = document.querySelector('#boat');

gsap.to(boat, 3.5, {
    rotation: -2.7,
    transformOrigin: 'center',
    ease: "power2.inOut",
    repeat: -1,
    yoyo: true
  }, 0) 

  gsap.to(boat, 20, {
    translateX: -600,
    ease: "none",
    repeat: -1,
    yoyo: false
  }, 0)

// const tl = new TimelineMax()

gsap.to(waveFg, 3, {
  x: -323.766,
  ease: "none",
  repeat: -1
}, 0)

gsap.from(waveBg, 3, {
  x: -323.766,
  ease: "none",
  repeat: -1
}, 0)
