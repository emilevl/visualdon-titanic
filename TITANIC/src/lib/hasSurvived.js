import * as d3 from 'd3';
import titanic from '../../data/titanic.csv';

console.log('The test has survived');

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let compteurPassengers = 0
let compteurPassengersSurvived = 0
titanic.forEach(passenger => {
    if (passenger.survived) {
        console.log('Un survivant');
        compteurPassengers += 1;
        compteurPassengersSurvived += 1;
    } else if (!passenger.survived) {
        console.log('Un mort');
        compteurPassengers += 1;
    }
});

console.log('Au total il y a ' + compteurPassengers + ' passagers…');
console.log(compteurPassengersSurvived + ' passagers ont survécu.');

d3.select('body').append('section')