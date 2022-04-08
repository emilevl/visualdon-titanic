import * as d3 from 'd3';
import * as cloud from 'd3-cloud';
import { scaleLinear } from 'd3';
import titanic from '../../data/titanic.csv';

// const counts = {};
const ticketNumbers = new Array()
const deadPassengers = titanic.filter(elm => !elm.survived)
const nbOccurences = {}

//console.log(deadPassengers);

getTicketValues(deadPassengers);

ticketNumbers.sort();

const uniqueElm = ticketNumbers.filter(onlyUnique);

// Transforming to less numbers, but proportionally
const allNumbersButLess = [];

console.log(uniqueElm)
for (const num of ticketNumbers) {
    nbOccurences[num] = nbOccurences[num] ? nbOccurences[num] + 1 : 1;
}

// array.forEach(element => {
    
// });

// console.log(ticketNumbers);
console.log(uniqueElm.map(function(d) {
    return {text: d, size: nbOccurences[`${d}`]};
  }));
console.log(nbOccurences);

var layout = cloud()
    .size([500, 500])
    .words(uniqueElm.map(function(d) {
      return {text: d, size: nbOccurences[d] / 500 * 100};
    }))
    .padding(5)
    .rotate(0)
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

layout.start();

// ____________________ FUNCTIONS __________________________________

function getTicketValues(data){
    data.forEach(elm => {
        const ticket = elm.ticket
        //console.log(ticket)
        let newData = [];
        if (typeof ticket === 'string'){
            newData = ticket.match(/[a-zA-Z0-9]/g)
            newData = upperCaseAll(newData);
        }else if (Number.isInteger(ticket) ) {
            newData = numberToArray(ticket);
        }
        addDataToArray(newData, ticketNumbers);
    });
    //console.log(ticketNumbers);
    // return ticketNumbers;
}


function numberToArray(number) {
    let array = number.toString().split("");//stringify the number, then make each digit an item in an array
    return array;//convert all the items back into numbers
}

function addDataToArray(data, arrayToPush) {
    data.forEach (elm => {
        arrayToPush.push(elm);
    })
}

function upperCaseAll(data) {
    data.forEach((elm, index) => {
        data[index] = elm.toUpperCase();
    })
    return data;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) == index;
}

// // console.log(smallestValue(Object.values(nbOccurences)));
// console.log(nbOccurences);
  

// Function from the d3-cloud git
function draw(words) {
    d3.select("#step2").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
      .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
  



// ___________________________ GRAPHIQUE ________________________________
// console.log(smallestValue(life, 2021));
const body = d3.select("body");

// Définition des marges

const margin = {top: 20, right: 10, bottom: 60, left: 60};
const width = 1500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Création du graph de base
// d3.select("#step2")
//     .append("div")
//     .attr('id', 'graph')
// let svg = d3.select("#graph")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// Axe X, en fonction du revenu
// let x = d3.scaleLinear()
//     .domain([0, 1200])
//     .range([0, width]);

// Axe Y, en fonction de l'âge
// let y = d3.scalePow()
//     .domain([0, 1200])
//     .range([ height, 0]);

// La taille des bulles --> Log permet de limiter la différence trop élevée des bulles
// let z = d3.scaleSqrt()
//     .domain([smallestValue(Object.values(nbOccurences)), biggestValue(Object.values(nbOccurences))])
//     .range([5, 60]);


// svg.append("g")
//     .call(d3.axisLeft(y));

// svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
// .attr("transform", "translate(-2,10)")

// Add dots
// svg.append('g')
//     .selectAll("dot")
//     .data(Object.values(nbOccurences))
//     .enter()
//     .append("circle")
//     .attr("cx", (d) => x(d))
//     .attr("r", 10)
//     .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
//     .style("opacity", "0.7")
//     .attr("stroke", "black")

// svg.selectAll("circle").data(Object.values(nbOccurences)).join()
//     .attr("cy", (d) => y(d));

// svg.selectAll("circle").data(Object.values(nbOccurences)).join()
//     .attr("cy", (d) => y(d));

// svg.selectAll("circle").data(Object.values(nbOccurences)).join()
//     .attr("r", (d) => z(d));



function biggestValue (data) {
    let biggestValue = 0;
    let number;
    data.forEach(value => {
        number = value;
        if (number > biggestValue && typeof number !== 'undefined' && typeof number !== 'null')
            biggestValue = number;
    });
    return biggestValue;
}

function smallestValue (data) {
    let smallestValue = 0;
    let number;
    data.forEach((value, index) => {
        number = value;
        if ((number < smallestValue && typeof number !== 'undefined' && number !== null) || index == 0) {
            smallestValue = number;
        }
    });
    return smallestValue;
}

function strToNumber(str) {
    let SI = typeof str === 'string' ||str instanceof String ? str.slice(-1) : str;
    
    // Extraire la partie numérique
    let number = typeof str === 'string' || str instanceof String ? parseFloat(str.slice(0,-1)) : str;
    
   // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
        case 'M': {
            return number * Math.pow(10, 6);
            break;
        }
        case 'B': {
            return number * Math.pow(10, 9);
            break;
        }
        case 'k': {
            return number * Math.pow(10, 3);
            break;
        }
        default: {
            return number;
            break;
        }
    }
}

function tabStrToInt(tab) {
    tab.forEach(elm => {
        for (let i = 1800; i < 2050; i++) {
            let number = strToNumber(elm[i]);
            
            if (typeof number === 'undefined' || number === null && (typeof elm[i+1] !== undefined && elm[i+1] !== null)) {
                number = (elm[i-1] + elm[i+1]) / 2;
            }
            elm[i] = number;   
        }
    });
}