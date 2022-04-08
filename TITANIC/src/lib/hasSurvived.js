import * as d3 from 'd3';
import titanic from '../../data/titanic.csv';

// console.log('The test has survived');

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// let svg = d3.select("#graph")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let compteurPassengers = 0
let compteurPassengersSurvived = 0
let compteurPassengersDead = 0
titanic.forEach(passenger => {
    if (passenger.survived) {
        // console.log('Un survivant');
        compteurPassengers += 1;
        compteurPassengersSurvived += 1;
    } else if (!passenger.survived) {
        // console.log('Un mort');
        compteurPassengers += 1;
        compteurPassengersDead += 1;
    }
});

console.log('Au total il y a ' + compteurPassengers + ' passagers…');
console.log(compteurPassengersSurvived + ' passagers ont survécu.');
console.log(compteurPassengersDead + ' passagers sont morts.');

d3.select('#sections').append('section')
    .attr('class', 'step')
    .attr('id', 'step1')
    .attr('flex-direction', 'column')



    let svg1 = d3.select('#step1')
    .append('svg')
    .attr('id', 'svg-allPassengers')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// Pour l'entier des passagers :
let cx = 0
let cy = 0
for (let i = 0; i <= compteurPassengers; i++) {
    cx = (i % 50) * 20 + 10
    // console.log(cx);

    cy = Math.floor(i / 50) * 20 + 10
    // console.log(cy);

    svg1.append('circle')
        .attr('class', 'circles-passengers')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 5)
        .attr('fill', 'black')
}
d3.select('#svg-allPassengers').attr("width", cx*5).attr("height", cy + 10)

// Pour survivants vs morts :
let svg2 = d3.select('#step1')
.append('svg')
.attr('id', 'svg-PassDeadAndSurv')
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

let cx2 = 0
let cy2 = 0
for (let j = 0; j <= compteurPassengers; j++) {
    cx2 = (j % 50) * 20 + 10
    // console.log(cx2);

    cy2 = Math.floor(j / 50) * 20 + 10
    // console.log(cy2);


    if (j >= compteurPassengersSurvived) {
        svg2.append('circle')
        .attr('class', 'circles-passengers')
        .attr('cx', cx2)
        .attr('cy', cy2)
        .attr('r', 5)
        .attr('fill', 'red')
    } else {
        svg2.append('circle')
        .attr('class', 'circles-passengers')
        .attr('cx', cx2)
        .attr('cy', cy2)
        .attr('r', 5)
        .attr('fill', 'blue')
    }
}
d3.select('#svg-PassDeadAndSurv').attr("width", cx2*5).attr("height", cy2 + 10)