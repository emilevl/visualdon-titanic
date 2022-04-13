import * as d3 from 'd3';
import './lib/luckyNumbers.js';
import './lib/hasSurvived.js';
import './lib/waves.js';
import titanic from '../data/titanic.csv';
import '../src/index.css';

const body = d3.select("body");
const margin = ({
    top: 30,
    right: 10,
    bottom: 30,
    left: 40,
  });

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;
// console.log(maxHeight);