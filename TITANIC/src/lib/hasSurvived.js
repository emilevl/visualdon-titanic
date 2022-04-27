import * as d3 from 'd3';
import titanic from '../../data/titanic.csv';
import {getTotalScroll, setTotalScroll} from '../index.js';

setTotalScroll(20000);
console.log("SCROOOOLLLL: " + getTotalScroll());

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

// console.log('Au total il y a ' + compteurPassengers + ' passagers…');
// console.log(compteurPassengersSurvived + ' passagers ont survécu.');
// console.log(compteurPassengersDead + ' passagers sont morts.');

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
d3.select('#svg-allPassengers').attr("width", cx * 5).attr("height", cy + 10)

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
d3.select('#svg-PassDeadAndSurv').attr("width", cx2 * 5).attr("height", cy2 + 10)

// Pour survivants vs morts par classe:
let firstClassTotal = 0;
let firstClassAlive = 0;
let firstClassDead = 0;
let secondClassTotal = 0;
let secondClassAlive = 0;
let secondClassDead = 0;
let thirdClassTotal = 0;
let thirdClassAlive = 0;
let thirdClassDead = 0;
let undefinedClass = 0;
titanic.forEach(passenger => {
    if (passenger.pclass === 1) {
        firstClassTotal++;
        if (passenger.survived) {
            firstClassAlive++;
        } else {
            firstClassDead++;
        }
    } else if (passenger.pclass === 2) {
        secondClassTotal++;
        if (passenger.survived) {
            secondClassAlive++;
        } else {
            secondClassDead++;
        }
    } else if (passenger.pclass === 3) {
        thirdClassTotal++;
        if (passenger.survived) {
            thirdClassAlive++;
        } else {
            thirdClassDead++;
        }
    } else {
        // console.log('Classe indéfinie');
        undefinedClass++;
    }
});
// console.log(firstClassTotal + ' firstClass');
// console.log('firstClass : ' + firstClassAlive + ' ont survécu et ' + firstClassDead + ' sont décédés');
// console.log(secondClassTotal + ' secondClass');
// console.log('secondClass : ' + secondClassAlive + ' ont survécu et ' + secondClassDead + ' sont décédés');
// console.log(thirdClassTotal + ' thirdClass');
// console.log('thirdClass : ' + thirdClassAlive + ' ont survécu et ' + thirdClassDead + ' sont décédés');
// console.log(undefinedClass + ' undefinedClass');

let svg3 = d3.select('#step1')
    .append('svg')
    .attr('id', 'svg-PassDeadAndSurvByClass')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
let cx3 = 0
let cy3 = 0
for (let k = 0; k <= compteurPassengers; k++) {
    cx3 = (k % 50) * 20 + 10
    cy3 = Math.floor(k / 50) * 20 + 10

    if (k < compteurPassengersSurvived) {
        if (k < firstClassAlive) {
            svg3.append('circle')
                .attr('class', 'circles-passengers')
                .attr('cx', cx3)
                .attr('cy', cy3)
                .attr('r', 5)
                .attr('fill', 'gold')
                .attr('opacity', '1')
        } else if (firstClassAlive <= k && k < firstClassAlive + secondClassAlive) {
            svg3.append('circle')
                .attr('class', 'circles-passengers')
                .attr('cx', cx3)
                .attr('cy', cy3)
                .attr('r', 5)
                .attr('fill', 'silver')
                .attr('opacity', '0.75')
        } else if (firstClassAlive + secondClassAlive <= k) {
            svg3.append('circle')
                .attr('class', 'circles-passengers')
                .attr('cx', cx3)
                .attr('cy', cy3)
                .attr('r', 5)
                .attr('fill', '#CD7F32')
                .attr('opacity', '0.25')
        }
    } else {
        if (k < compteurPassengersSurvived + firstClassDead) {
            svg3.append('circle')
                .attr('class', 'circles-passengers')
                .attr('cx', cx3)
                .attr('cy', cy3)
                .attr('r', 5)
                .attr('fill', 'red')
                .attr('opacity', '1')
        } else if (compteurPassengersSurvived + firstClassDead <= k && k < compteurPassengersSurvived + firstClassDead + secondClassDead) {
            svg3.append('circle')
                .attr('class', 'circles-passengers')
                .attr('cx', cx3)
                .attr('cy', cy3)
                .attr('r', 5)
                .attr('fill', 'orange')
                .attr('opacity', '1')
        } else if (compteurPassengersSurvived + firstClassDead + secondClassDead <= k) {
            svg3.append('circle')
                .attr('class', 'circles-passengers')
                .attr('cx', cx3)
                .attr('cy', cy3)
                .attr('r', 5)
                .attr('fill', 'yellow')
                .attr('opacity', '1')
        }
    }
}
d3.select('#svg-PassDeadAndSurvByClass').attr("width", cx3 * 5).attr("height", cy3 + 10)