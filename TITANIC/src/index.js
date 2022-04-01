import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const body = d3.select("body");
const margin = ({
    top: 30,
    right: 10,
    bottom: 30,
    left: 40,
  });

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;
console.log(maxHeight);

const titanicWaveBg = document.getElementById('titanic-wave-bg');
const titanicWaves = document.getElementById('titanic-waves');

// titanicWaves.

// const ship = document.querySelector('#titanic-ship')
const waveFg = document.querySelector('#titanic-wave-fg')
const waveBg = document.querySelector('#titanic-wave-bg')

const tl = new TimelineMax()

// tl.to(ship, 3, {
//   rotation: -10,
//   transformOrigin: 'center',
//   ease: Power1.easeInOut,
//   repeat: -1,
//   yoyo: true
// }, 0)

tl.to(waveFg, 3, {
  x: -323.766,
  ease: Power0.easeNone,
  repeat: -1
}, 0)

tl.from(waveBg, 3, {
  x: -323.766,
  ease: Power0.easeNone,
  repeat: -1
}, 0)


