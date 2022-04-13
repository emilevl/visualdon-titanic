// import { TweenLite, TimelineMax, Linear, Back, Sine } from 'gsap/all';
import * as d3 from 'd3';
import { gsap } from "gsap";

// vs

// import { TweenLite, TimelineMax, Linear, Back, Sine } from 'gsap';
const waveFg = document.querySelector('#titanic-wave-fg')
const waveBg = document.querySelector('#titanic-wave-bg')

const boat = document.querySelector('#boat');

gsap.to(boat, 3, {
    rotation: -2,
    transformOrigin: 'center',
    ease: "power3.inOut",
    repeat: -1,
    yoyo: true
  }, 0)

  gsap.to(boat, 3, {
    rotation: -2,
    scale: 1.05,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
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
